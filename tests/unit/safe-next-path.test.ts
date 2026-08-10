import { describe, expect, test } from 'vitest';
import { safeInternalNextPath } from '../../lib/auth/safe-next-path.ts';

describe('safeInternalNextPath', () => {
  test('allows normal app paths', () => {
    expect(safeInternalNextPath('/dashboard')).toBe('/dashboard');
    expect(safeInternalNextPath('/practice')).toBe('/practice');
    expect(safeInternalNextPath('/billing?x=1')).toBe('/billing?x=1');
  });

  test('blocks protocol-relative URLs', () => {
    expect(safeInternalNextPath('//evil.com/phish')).toBe('/dashboard');
  });

  test('blocks colon in path (e.g. javascript: pseudo-path)', () => {
    expect(safeInternalNextPath('/javascript:alert(1)')).toBe('/dashboard');
  });

  test('uses fallback for empty or external-looking values', () => {
    expect(safeInternalNextPath(null, '/practice')).toBe('/practice');
    expect(safeInternalNextPath('')).toBe('/dashboard');
    expect(safeInternalNextPath('https://x.com')).toBe('/dashboard');
  });
});
