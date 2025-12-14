/**
 * CANONICAL DOMAIN MIDDLEWARE
 * 
 * ROOT CAUSE FIX: Apex domain (policestationagent.com) is pointed to Vercel via A record.
 * Middleware was redirecting apex to www, causing conflicts. Fixed to allow apex domain.
 * 
 * Handles:
 * - Legacy domains → policestationagent.com (canonical apex)
 * - www subdomain → policestationagent.com (apex is canonical)
 * - Preserves full paths and query strings
 * - Uses 301 (permanent) redirects for SEO
 * 
 * Canonical domain: https://policestationagent.com (apex, not www)
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Canonical domain is the apex (policestationagent.com) - matches DNS A record configuration
const CANONICAL_DOMAIN = 'policestationagent.com';

// Domains that should redirect to canonical apex domain
const REDIRECT_DOMAINS = [
  'www.policestationagent.com',  // www → apex
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
  
  // TEMPORARILY DISABLED: Redirect logic causing loop with Wix DNS
  // TODO: Re-enable after DNS is properly configured and redirect loop is resolved
  // The redirect loop is likely caused by Wix DNS redirects conflicting with middleware redirects
  
  // Check if this domain should redirect to canonical apex
  // Only redirect legacy/alternative domains, not the apex itself
  const shouldRedirect = REDIRECT_DOMAINS.includes(host);
  
  if (shouldRedirect) {
    // CRITICAL: Check if we're already being redirected to prevent loops
    const referer = request.headers.get('referer');
    const isRedirectLoop = referer && referer.includes(CANONICAL_DOMAIN);
    
    if (isRedirectLoop) {
      // If we detect a potential loop, just allow the request through
      console.warn(`Redirect loop detected for ${host}, allowing request through`);
      return NextResponse.next();
    }
    
    // Get the full path including query string
    const url = request.nextUrl.clone();
    url.host = CANONICAL_DOMAIN;
    // Preserve original protocol (http/https) to allow Vercel SSL verification
    // Vercel needs HTTP access during certificate issuance
    // Protocol will be upgraded to HTTPS by Vercel after certificate is issued
    
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


