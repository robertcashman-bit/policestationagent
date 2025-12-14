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
  
  // Check if this domain should redirect to canonical apex
  // Only redirect legacy/alternative domains, not the apex itself
  const shouldRedirect = REDIRECT_DOMAINS.includes(host);
  
  if (shouldRedirect) {
    // Get the full path including query string
    const url = request.nextUrl.clone();
    url.host = CANONICAL_DOMAIN;
    url.protocol = 'https';
    
    // Preserve path and query string
    const redirectUrl = url.toString();
    
    // 301 Permanent Redirect (SEO-friendly)
    return NextResponse.redirect(redirectUrl, 301);
  }
  
  // Allow request to proceed if no redirect needed
  return NextResponse.next();
}

// Match all paths except static files and API routes that don't need redirects
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};


