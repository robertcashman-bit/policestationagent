import { describe, expect, test } from 'vitest';
import { getRequestOrigin } from '../../lib/auth/request-origin.ts';

describe('getRequestOrigin', () => {
  test('uses x-forwarded-host when present', () => {
    const req = new Request('http://internal-host/auth/callback', {
      headers: {
        'x-forwarded-host': 'psrtrain.com',
        'x-forwarded-proto': 'https',
      },
    });
    expect(getRequestOrigin(req)).toBe('https://psrtrain.com');
  });

  test('falls back to request URL origin', () => {
    const req = new Request('http://127.0.0.1:3000/auth/callback');
    expect(getRequestOrigin(req)).toBe('http://127.0.0.1:3000');
  });
});
