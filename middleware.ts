/**
 * CANONICAL DOMAIN MIDDLEWARE
 *
 * Handles:
 * - Apex and legacy domains → configured canonical domain
 * - Preserves full paths and query strings
 * - Uses 301 (permanent) redirects for SEO
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LEGACY_DOMAINS, SITE_DOMAIN } from "@/config/site";

// Extra legacy domains not listed in config/site.ts.
const REDIRECT_DOMAINS = new Set([
  ...LEGACY_DOMAINS,
  "policestationagent.net",
  "policestationagent.org",
  "policestationrepkent.co.uk",
]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // CRITICAL: Allow Vercel SSL verification paths through without any redirects
  // Vercel needs access to /.well-known/acme-challenge/* for certificate issuance
  if (pathname.startsWith("/.well-known/")) {
    return NextResponse.next();
  }

  // Remove port if present (e.g., "localhost:3000" → "localhost")
  const host = hostname.split(":")[0].toLowerCase();

  // Skip redirect if already on the configured canonical domain
  if (host === SITE_DOMAIN) {
    return NextResponse.next();
  }

  // Skip redirect for localhost/development
  if (
    host === "localhost" ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("192.168.") ||
    host.startsWith("10.0.")
  ) {
    return NextResponse.next();
  }

  // Skip redirect for Vercel preview deployments
  if (host.includes(".vercel.app") || host.includes(".vercel.dev")) {
    return NextResponse.next();
  }

  if (REDIRECT_DOMAINS.has(host)) {
    // Get the full path including query string
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = SITE_DOMAIN;

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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
