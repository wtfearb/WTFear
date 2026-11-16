import { NextResponse } from 'next/server';
import { getTelemetryMetrics, getVisitorSessions } from '@/lib/db';

export async function GET(): Promise<NextResponse> {
  try {
    const [metrics, sessions] = await Promise.all([
      getTelemetryMetrics(),
      getVisitorSessions(30),
    ]);

    return NextResponse.json({
      metrics,
      sessions,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch telemetry metrics' },
      { status: 500 }
    );
  }
}
