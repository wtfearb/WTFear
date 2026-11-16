import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  // Generate a random 16-byte base64 nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build strict Content-Security-Policy with per-request nonce
  // Allowing Turnstile (challenges.cloudflare.com) and Cal.com embed if used
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com https://cal.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://wtfear.agency;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://challenges.cloudflare.com https://cal.com;
    connect-src 'self' https://challenges.cloudflare.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Clone request headers and inject nonce & CSP
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP on outgoing response headers
  response.headers.set('content-security-policy', cspHeader);

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
