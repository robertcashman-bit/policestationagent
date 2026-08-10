import { describe, expect, test } from 'vitest';
import {
  resolveAuthEntryRedirect,
  splitPathAndSearch,
  buildAuthNextFromRequest,
} from '../../lib/auth/resolve-auth-entry-redirect.ts';

describe('resolveAuthEntryRedirect', () => {
  test('prefers a safe next= param', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams('next=/practice'))).toBe('/practice');
    expect(resolveAuthEntryRedirect(new URLSearchParams('next=/billing?plan=annual'))).toBe(
      '/billing?plan=annual',
    );
  });

  test('falls back to plan= when next is missing (the confirmed "Get started" bug)', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams('plan=monthly'))).toBe(
      '/billing?plan=monthly',
    );
    expect(resolveAuthEntryRedirect(new URLSearchParams('plan=annual'))).toBe(
      '/billing?plan=annual',
    );
  });

  test('ignores an invalid plan value', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams('plan=lifetime'))).toBe('/dashboard');
  });

  test('next= takes priority over plan= when both are present', () => {
    expect(
      resolveAuthEntryRedirect(new URLSearchParams('next=/settings&plan=monthly')),
    ).toBe('/settings');
  });

  test('defaults to /dashboard with no params', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams(''))).toBe('/dashboard');
  });

  test('sanitizes an unsafe next= value via safeInternalNextPath', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams('next=//evil.com/phish'))).toBe(
      '/dashboard',
    );
  });

  test('respects a custom fallback', () => {
    expect(resolveAuthEntryRedirect(new URLSearchParams(''), '/practice')).toBe('/practice');
  });
});

describe('buildAuthNextFromRequest', () => {
  test('preserves query string when redirecting unauthenticated users to /auth', () => {
    expect(buildAuthNextFromRequest('/billing', '?plan=monthly')).toBe('/billing?plan=monthly');
  });

  test('returns pathname only when there is no query string', () => {
    expect(buildAuthNextFromRequest('/billing', '')).toBe('/billing');
  });
});

describe('splitPathAndSearch', () => {
  test('splits a destination containing a query string', () => {
    expect(splitPathAndSearch('/billing?plan=monthly')).toEqual({
      pathname: '/billing',
      search: '?plan=monthly',
    });
  });

  test('handles a plain path with no query string', () => {
    expect(splitPathAndSearch('/dashboard')).toEqual({ pathname: '/dashboard', search: '' });
  });

  test('never percent-encodes "?" or "=" into the pathname (the confirmed 404 bug)', () => {
    const { pathname } = splitPathAndSearch('/billing?plan=monthly');
    expect(pathname).not.toContain('%3F');
    expect(pathname).not.toContain('%3D');
    expect(pathname).toBe('/billing');
  });
});
