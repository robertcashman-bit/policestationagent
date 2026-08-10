import { describe, test, expect } from 'vitest';
import { signGateToken, verifyGateToken } from '../../lib/gate-token.ts';

describe('gate token HMAC signing', () => {
  test('verifies a freshly signed token when GATE_SECRET is set', async () => {
    process.env.GATE_SECRET = 'test-secret-key-for-unit-tests';
    const token = await signGateToken();
    expect(token).toMatch(/^v1\.\d+\.[0-9a-f]+$/);
    const valid = await verifyGateToken(token);
    expect(valid).toBe(true);
    delete process.env.GATE_SECRET;
  });

  test('rejects plain "1" when GATE_SECRET is set', async () => {
    process.env.GATE_SECRET = 'test-secret-key-for-unit-tests';
    const valid = await verifyGateToken('1');
    expect(valid).toBe(false);
    delete process.env.GATE_SECRET;
  });

  test('rejects tampered token', async () => {
    process.env.GATE_SECRET = 'test-secret-key-for-unit-tests';
    const token = await signGateToken();
    const tampered = token.slice(0, -4) + 'ffff';
    const valid = await verifyGateToken(tampered);
    expect(valid).toBe(false);
    delete process.env.GATE_SECRET;
  });

  test('accepts plain "1" when no GATE_SECRET (dev mode)', async () => {
    delete process.env.GATE_SECRET;
    const token = await signGateToken();
    expect(token).toBe('1');
    const valid = await verifyGateToken('1');
    expect(valid).toBe(true);
  });

  test('rejects undefined cookie value', async () => {
    const valid = await verifyGateToken(undefined);
    expect(valid).toBe(false);
  });
});
