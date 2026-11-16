import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const isProduction = process.env.NODE_ENV === 'production';
  const pathname = request.nextUrl.pathname;

  // Build strict Content-Security-Policy that supports Next.js SSG client hydration,
  // Cloudflare Turnstile, Cal.com embeds, and Vercel Analytics/Speed Insights.
  // In production, 'unsafe-eval' is strictly forbidden.
  const scriptSources = [
    "'self'",
    "'unsafe-inline'",
    ...(isProduction ? [] : ["'unsafe-eval'"]),
    'https://challenges.cloudflare.com',
    'https://cal.com',
    'https://va.vercel-scripts.com',
  ].join(' ');

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSources};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://wtfear.agency https://*.vercel.app;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://challenges.cloudflare.com https://cal.com;
    connect-src 'self' https://challenges.cloudflare.com https://cal.com https://vitals.vercel-insights.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Clone request headers, inject CSP and pass x-pathname for telemetry context
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('content-security-policy', cspHeader);
  requestHeaders.set('x-pathname', pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP and security headers on outgoing response
  response.headers.set('content-security-policy', cspHeader);
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (some edge routes may handle headers separately, but we can match everything except static files)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml, llms.txt
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
