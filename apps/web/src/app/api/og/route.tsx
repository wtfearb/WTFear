import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Ship Governed AI Agents & Production Software in Weekly Sprints';
  const badge = searchParams.get('badge') ?? 'PRODUCT & AI ENGINEERING STUDIO';
  const duration = searchParams.get('duration') ?? '2-Week Rapid Sprints · 100% IP Ownership';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0C0D10',
          color: '#F9F9FB',
          padding: '64px',
          border: '2px solid #262932',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#C83E1B', fontSize: 22, letterSpacing: '0.12em', fontWeight: 700 }}>
            {badge}
          </span>
          <span style={{ color: '#9CA3AF', fontSize: 20 }}>wtfear.agency</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '980px' }}>
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #262932',
            paddingTop: '28px',
            fontSize: 22,
            color: '#9CA3AF',
          }}
        >
          <span>{duration}</span>
          <span style={{ color: '#10B981' }}>LCP &lt; 1.2s · Golden Eval Gate · Next.js 15 + FastAPI</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
