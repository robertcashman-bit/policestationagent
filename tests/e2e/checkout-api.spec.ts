/**
 * Lemon Squeezy checkout API contract tests.
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Checkout API', () => {
  test('POST without auth returns 401', async ({ request }) => {
    const res = await request.post('/api/lemonsqueezy/create-checkout', {
      data: { plan: 'monthly' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
  });

  test('monthly checkout script creates valid lemonsqueezy.com URL in test mode', async () => {
    test.skip(!process.env.LEMON_SQUEEZY_API_KEY, 'Needs LEMON_SQUEEZY_API_KEY');

    const { execSync } = await import('node:child_process');
    const out = execSync('node scripts/test-lemon-checkout.mjs monthly', {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    expect(out).toMatch(/OK — checkout URL created/);
    expect(out).toMatch(/psrtrain\.lemonsqueezy\.com\/checkout/);
    expect(out).toMatch(/plan: monthly/);
  });

  test('billing success and cancel URLs are reachable', async ({ request }) => {
    for (const path of ['/billing?success=true&plan=monthly', '/billing?canceled=true']) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect([200, 307, 308, 302]).toContain(res.status());
    }
  });
});
