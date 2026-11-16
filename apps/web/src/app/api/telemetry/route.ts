/**
 * @file Telemetry Ingestion API Route
 * @description Ingests visitor session telemetry, geolocational metadata from Vercel headers, and user activity events.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { upsertVisitorSession, recordActivityEvent } from '@/lib/db';

export interface TelemetryRequestBody {
  sessionToken: string;
  entryPath?: string;
  currentPath: string;
  referrer?: string;
  utmSource?: string;
  deviceType?: string;
  event?: {
    eventType:
      | 'page_view'
      | 'blueprint_inspect'
      | 'sandbox_change'
      | 'calculator_change'
      | 'project_click'
      | 'cta_click';
    targetLabel?: string;
    payloadJson?: Record<string, unknown>;
  };
}

async function sha256Hash(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as TelemetryRequestBody;
    const { sessionToken, entryPath, currentPath, referrer, utmSource, deviceType, event } = body;

    if (!sessionToken || !currentPath) {
      return NextResponse.json(
        { error: 'BAD_REQUEST', message: 'sessionToken and currentPath are required.' },
        { status: 400 }
      );
    }

    // Extract Vercel / Cloudflare edge metadata headers
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry') || undefined;
    const city = req.headers.get('x-vercel-ip-city') || undefined;
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;

    // Cryptographically hash IP for GDPR/privacy compliance
    const ipHash = await sha256Hash(rawIp);

    // 1. Upsert Visitor Session
    const session = await upsertVisitorSession({
      id: crypto.randomUUID(),
      sessionToken,
      ipHash,
      country,
      city,
      deviceType: deviceType || 'desktop',
      userAgent,
      referrer: referrer || null,
      utmSource: utmSource || null,
      entryPath: entryPath || currentPath,
      lastPath: currentPath,
      pageViewsCount: 1,
      startedAt: new Date(),
      lastSeenAt: new Date(),
    });

    // 2. Record Event (if attached)
    let recordedEvent = null;
    if (event?.eventType) {
      recordedEvent = await recordActivityEvent({
        id: crypto.randomUUID(),
        sessionId: session.id,
        eventType: event.eventType,
        path: currentPath,
        targetLabel: event.targetLabel || null,
        payloadJson: event.payloadJson || null,
        createdAt: new Date(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        eventId: recordedEvent?.id,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: unknown) {
    console.error('[API /telemetry] Ingestion error:', error);
    return NextResponse.json(
      {
        error: 'INGRESS_ERROR',
        message: error instanceof Error ? error.message : 'Internal telemetry ingestion failure.',
      },
      { status: 500 }
    );
  }
}
