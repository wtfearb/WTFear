import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type {
  AuditSubmissionRequest,
  AuditSubmissionResponse,
  LeadTier,
  TargetTimeline,
} from '@wtfear/contracts';

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
];

export async function POST(req: NextRequest): Promise<NextResponse<AuditSubmissionResponse | { error: string; message: string }>> {
  const traceId = req.headers.get('traceparent') || crypto.randomUUID();

  try {
    const body = (await req.json()) as AuditSubmissionRequest;
    const { email, companyDomain, systemBottleneck, targetTimeline } = body;

    // 1. Validation Invariants
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'INVALID_EMAIL', message: 'A valid corporate or engineering work email is required.' },
        { status: 400 }
      );
    }

    if (!systemBottleneck || systemBottleneck.trim().length < 15) {
      return NextResponse.json(
        {
          error: 'BOTTLENECK_TOO_SHORT',
          message: 'Please provide a technical system bottleneck summary of at least 15 characters.',
        },
        { status: 400 }
      );
    }

    const emailNormalized = email.trim().toLowerCase();
    const domainFromEmail = emailNormalized.split('@')[1];
    const resolvedDomain = companyDomain?.trim().toLowerCase() || domainFromEmail;

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
    if (targetTimeline === 'immediate') {
      leadScore += 35;
    } else if (targetTimeline === 'month') {
      leadScore += 20;
    } else {
      leadScore += 10;
    }

    // Technical depth of bottleneck description
    const lowerBottleneck = systemBottleneck.toLowerCase();
    let keywordHits = 0;
    for (const kw of TECHNICAL_KEYWORDS) {
      if (lowerBottleneck.includes(kw)) keywordHits += 1;
    }
    const depthScore = Math.min(30, keywordHits * 10 + (systemBottleneck.length > 50 ? 10 : 5));
    leadScore += depthScore;

    const leadTier: LeadTier = leadScore >= 70 ? 'TIER_1_FAST_TRACK' : 'TIER_2_NURTURE';
    const leadId = crypto.randomUUID();

    const bookingUrl =
      leadTier === 'TIER_1_FAST_TRACK'
        ? `https://cal.com/wtfear/15min-architecture-audit?email=${encodeURIComponent(
            emailNormalized
          )}&notes=${encodeURIComponent(systemBottleneck.slice(0, 150))}`
        : 'https://cal.com/wtfear/15min-architecture-audit';

    const responsePayload: AuditSubmissionResponse = {
      success: true,
      leadId,
      leadTier,
      leadScore,
      bookingUrl,
      message:
        leadTier === 'TIER_1_FAST_TRACK'
          ? 'Fast-track priority approved. A Principal Systems Engineer is reserved for your technical diagnosis.'
          : 'Audit intake recorded. You may select any open timeslot on Cal.com.',
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
    return NextResponse.json(
      {
        error: 'INGRESS_ERROR',
        message: error instanceof Error ? error.message : 'Internal edge error processing audit intake.',
      },
      { status: 500 }
    );
  }
}
