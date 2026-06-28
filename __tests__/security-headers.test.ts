/**
 * Security headers regression test.
 *
 * Ensures the next.config.js headers() function returns the required security
 * headers for every HTTP response. This prevents accidental removal of the
 * Content-Security-Policy, X-Frame-Options, HSTS, and other critical headers.
 */
import { describe, it, expect } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextConfig = require('../next.config.js');

const REQUIRED_HEADERS: Record<string, RegExp | string> = {
  'X-Frame-Options': /SAMEORIGIN|DENY/i,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': /camera=\(\)/,
  'Strict-Transport-Security': /max-age=\d+/,
  'Content-Security-Policy': /default-src/,
};

describe('security headers regression', () => {
  it('next.config.js exports a headers() function', async () => {
    const config =
      typeof nextConfig === 'object' && nextConfig.__esModule
        ? nextConfig.default
        : nextConfig;
    const fn = config.headers ?? nextConfig.headers;
    expect(typeof fn).toBe('function');
  });

  it('catch-all rule includes all required security headers', async () => {
    // Get the underlying config (handles Sentry withSentryConfig wrapper)
    const config =
      typeof nextConfig === 'object' && nextConfig.__esModule
        ? nextConfig.default
        : nextConfig;
    const headersFn = config.headers ?? nextConfig.headers;
    if (typeof headersFn !== 'function') return;

    const rules: Array<{ source: string; headers: Array<{ key: string; value: string }> }> =
      await headersFn();

    // Find the catch-all rule (source === "/(.*)" or "/:path*")
    const catchAll = rules.find((r) => r.source === '(.*)' || r.source === '/(.*)'  || r.source === '/:path*');
    expect(catchAll, 'catch-all header rule missing').toBeTruthy();
    if (!catchAll) return;

    const headerMap = Object.fromEntries(catchAll.headers.map((h) => [h.key, h.value]));

    for (const [key, expected] of Object.entries(REQUIRED_HEADERS)) {
      expect(headerMap[key], `${key} header missing`).toBeTruthy();
      if (expected instanceof RegExp) {
        expect(headerMap[key]).toMatch(expected);
      } else {
        expect(headerMap[key]).toBe(expected);
      }
    }
  });
});
