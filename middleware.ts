/**
 * CANONICAL DOMAIN MIDDLEWARE
 * 
 * ROOT CAUSE FIX: Vercel is currently enforcing www as the primary domain.
 * If our middleware redirects www → apex while Vercel redirects apex → www,
 * the site becomes unreachable due to a redirect loop.
 * 
 * Handles:
 * - Legacy domains → www.policestationagent.com (canonical)
 * - Apex domain → www.policestationagent.com (canonical)
 * - Preserves full paths and query strings
 * - Uses 301 (permanent) redirects for SEO
 * 
 * Canonical domain: https://www.policestationagent.com
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Canonical domain is www (matches current Vercel primary-domain redirects)
const CANONICAL_DOMAIN = 'www.policestationagent.com';

// Domains that should redirect to canonical apex domain
const REDIRECT_DOMAINS = [
  'policestationagent.com', // apex → www (also prevents loops if Vercel setting changes)
  'policestationagent.net',
  'policestationagent.org',
  'policestationrepkent.co.uk',
  'criminaldefencekent.co.uk',
  'www.criminaldefencekent.co.uk',
];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // CRITICAL: Allow Vercel SSL verification paths through without any redirects
  // Vercel needs access to /.well-known/acme-challenge/* for certificate issuance
  if (pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }
  
  // Remove port if present (e.g., "localhost:3000" → "localhost")
  const host = hostname.split(':')[0].toLowerCase();
  
  // Skip redirect if already on canonical apex domain
  if (host === CANONICAL_DOMAIN) {
    return NextResponse.next();
  }
  
  // Skip redirect for localhost/development
  if (host === 'localhost' || host.startsWith('127.0.0.1') || host.startsWith('192.168.') || host.startsWith('10.0.')) {
    return NextResponse.next();
  }
  
  // Skip redirect for Vercel preview deployments
  if (host.includes('.vercel.app') || host.includes('.vercel.dev')) {
    return NextResponse.next();
  }
  
  // Redirect to canonical apex domain for known aliases (www + legacy domains).
  // Loop-proof: only redirect when the target host differs.
  const shouldRedirect = REDIRECT_DOMAINS.includes(host);
  
  if (shouldRedirect) {
    // Get the full path including query string
    const url = request.nextUrl.clone();
    url.host = CANONICAL_DOMAIN;
    // Preserve original protocol (http/https); SSL verification paths are excluded above.
    const forwardedProto = request.headers.get('x-forwarded-proto');
    if (forwardedProto === 'http' || forwardedProto === 'https') {
      url.protocol = forwardedProto;
    }
    
    // Preserve path and query string
    const redirectUrl = url.toString();
    
    // 301 Permanent Redirect (SEO-friendly)
    return NextResponse.redirect(redirectUrl, 301);
  }
  
  // Allow request to proceed if no redirect needed
  return NextResponse.next();
}

// Match all paths except static files and API routes that don't need redirects
// CRITICAL: .well-known paths are included to allow SSL verification
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * 
     * NOTE: .well-known paths ARE matched (for SSL verification) but allowed through
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};


