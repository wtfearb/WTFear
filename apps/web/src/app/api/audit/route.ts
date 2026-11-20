import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { LeadTier } from '@wtfear/contracts';
import { createAuditLead } from '@/lib/db';
import { sendAuditEmails } from '@/lib/email/mailer';

const GENERIC_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'disposable-mail.org',
]);

const TECHNICAL_KEYWORDS = [
  'rag',
  'pydantic',
  'latency',
  'postgres',
  'pgvector',
  'llm',
  'agent',
  'sprint',
  'hallucination',
  'hmac',
  'scale',
  'fastapi',
  'next.js',
  'kafka',
  'redis',
  'queue',
  'drizzle',
  'neon',
  'distributed',
  'rls',
];

export async function POST(req: NextRequest): Promise<NextResponse> {
  const traceId = req.headers.get('traceparent') || crypto.randomUUID();

  try {
    const body = await req.json();
    const rawEmail = (body.workEmail || body.email || '') as string;
    const rawBottleneck = (body.bottleneckDescription || body.systemBottleneck || '') as string;
    const rawTimeline = (body.targetTimeline || 'immediate') as 'immediate' | 'month' | 'within_month' | 'exploring';
    const rawDomain = (body.companyDomain || body.organization || '') as string;
    const rawFocusArea = (body.focusArea || body.engagementTrack || body.metadata?.engagementTrack || 'Governed AI & RAG') as string;
    const rawSystemStage = (body.systemStage || 'Production Scaling & Bottleneck Resolution') as string;
    const rawSource = (body.source || (body.metadata ? 'contact' : 'modal')) as 'modal' | 'contact';
    const rawName = (body.name || body.metadata?.name || undefined) as string | undefined;

    const sessionId = (body.sessionId || req.headers.get('x-session-id') || undefined) as string | undefined;
    const calculatorSnapshotJson = (body.calculatorSnapshotJson ||
      (body.calculatorScope ? { scope: body.calculatorScope } : undefined)) as Record<string, unknown> | undefined;

    // 1. Validation Invariants
    if (!rawEmail || !rawEmail.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_EMAIL', message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!rawBottleneck || rawBottleneck.trim().length < 15) {
      return NextResponse.json(
        {
          ok: false,
          error: 'BOTTLENECK_TOO_SHORT',
          message: 'Please provide a technical system bottleneck summary of at least 15 characters.',
        },
        { status: 400 }
      );
    }

    const emailNormalized = rawEmail.trim().toLowerCase();
    const domainFromEmail = emailNormalized.split('@')[1];
    const resolvedDomain = rawDomain?.trim().toLowerCase() || domainFromEmail;

    // 2. Deterministic Lead Scoring & Tier Assignment
    let leadScore = 0;

    // Domain quality (Corporate vs Free/Disposable Webmail)
    const isCorporate = !GENERIC_EMAIL_DOMAINS.has(resolvedDomain);
    if (isCorporate) {
      leadScore += 35;
    } else {
      leadScore += 10;
    }

    // Urgency / Timeline score
    if (rawTimeline === 'immediate') {
      leadScore += 35;
    } else if (rawTimeline === 'within_month' || rawTimeline === 'month') {
      leadScore += 20;
    } else {
      leadScore += 10;
    }

    // Technical depth of bottleneck description
    const lowerBottleneck = rawBottleneck.toLowerCase();
    let keywordHits = 0;
    for (const kw of TECHNICAL_KEYWORDS) {
      if (lowerBottleneck.includes(kw)) keywordHits += 1;
    }
    const depthScore = Math.min(30, keywordHits * 10 + (rawBottleneck.length > 50 ? 10 : 5));
    leadScore += depthScore;

    const leadTier: LeadTier = leadScore >= 70 ? 'TIER_1_FAST_TRACK' : 'TIER_2_NURTURE';
    const leadId = crypto.randomUUID();

    // Generate clean human-readable reference ID
    const refSuffix = crypto.randomUUID().slice(0, 4).toUpperCase();
    const referenceId = `WTFB-${new Date().getFullYear()}-${refSuffix}`;

    // 3. Persist to Neon Postgres or in-memory fallback store
    await createAuditLead({
      id: leadId,
      sessionId,
      workEmail: emailNormalized,
      companyDomain: resolvedDomain,
      targetTimeline: rawTimeline,
      bottleneckDescription: rawBottleneck.trim(),
      calculatorSnapshotJson: calculatorSnapshotJson || {
        referenceId,
        focusArea: rawFocusArea,
        systemStage: rawSystemStage,
        source: rawSource,
      },
      leadScore,
      qualificationTier: leadTier,
      status: 'new',
      adminNotes: `[Ref: ${referenceId}] Focus: ${rawFocusArea} | Stage: ${rawSystemStage} | Lead score: ${leadScore} (Domain: ${isCorporate ? 'Corporate +35' : 'Generic +10'}, Urgency: ${rawTimeline}, Hits: ${keywordHits})`,
      createdAt: new Date(),
    });

    // 4. Two-Way Transactional Email Routing
    const emailDispatch = await sendAuditEmails({
      referenceId,
      email: emailNormalized,
      name: rawName,
      organization: resolvedDomain,
      focusArea: rawFocusArea,
      systemStage: rawSystemStage,
      bottleneckDescription: rawBottleneck.trim(),
      source: rawSource,
    });

    const bookingUrl =
      leadTier === 'TIER_1_FAST_TRACK'
        ? `https://cal.com/wtfear/architecture-audit?email=${encodeURIComponent(
            emailNormalized
          )}&notes=${encodeURIComponent(rawBottleneck.slice(0, 150))}`
        : 'https://cal.com/wtfear/architecture-audit';

    const responsePayload = {
      ok: true,
      success: true,
      referenceId,
      emailDispatched: emailDispatch.emailDispatched,
      leadId,
      leadTier,
      leadScore,
      bookingUrl,
      message:
        leadTier === 'TIER_1_FAST_TRACK'
          ? 'Priority review approved. A Principal Systems Engineer has received your technical brief.'
          : 'Audit intake recorded. Our principal engineers will review your system scope.',
      traceId,
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Lead-Tier': leadTier,
        'X-Trace-Id': traceId,
      },
    });
  } catch (error: unknown) {
    console.error('[API /audit] Processing error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'INGRESS_ERROR',
        message: error instanceof Error ? error.message : 'Internal error processing audit intake.',
      },
      { status: 500 }
    );
  }
}
