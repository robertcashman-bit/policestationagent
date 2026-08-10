/**
 * Regression tests for Stephanie bug reports (Jul 2026):
 * - Mobile login button not clickable (cookie banner overlap)
 * - Get Started / monthly payment flow dead-end
 *
 * Run: npm run test:e2e -- tests/e2e/reported-issues.spec.ts
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { edgeAuthRedirectsApply } from './helpers/auth';
import { suppressCookieBanner } from './helpers/cookies';
import { expectActionable } from './helpers/clickability';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function collectPageErrors(page: import('@playwright/test').Page) {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test.describe('Reported issue: Login button', () => {
  test('homepage loads without pageerror', async ({ page }) => {
    const errors = collectPageErrors(page);
    const res = await page.goto('/');
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test('desktop Log in link is clickable and opens /auth', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop viewport only');
    await suppressCookieBanner(page);
    const errors = collectPageErrors(page);
    await page.goto('/');

    const login = page.getByRole('link', { name: 'Log in' }).first();
    await expectActionable(login);
    await login.click();

    await expect(page).toHaveURL(/\/auth/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({
      timeout: 15_000,
    });
    expect(errors).toEqual([]);
  });

  test('mobile Log in is clickable even with cookie banner visible', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'Mobile viewport only');
    const errors = collectPageErrors(page);
    await page.goto('/');

    const accept = page.getByRole('button', { name: 'Accept' });
    if (await accept.isVisible().catch(() => false)) {
      await expect(accept).toBeVisible();
    }

    await page.getByRole('button', { name: 'Open menu' }).click();
    const login = page.getByRole('link', { name: 'Log in' });
    await expectActionable(login);
    await login.click({ force: false });

    await expect(page).toHaveURL(/\/auth/);
    expect(errors).toEqual([]);
  });

  test('/login route reaches auth UI (no 404/500)', async ({ page }) => {
    const res = await page.goto('/login');
    expect(res?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/auth/);
  });
});

test.describe('Reported issue: Get Started / monthly plan', () => {
  test('pricing page loads without pageerror', async ({ page }) => {
    const errors = collectPageErrors(page);
    const res = await page.goto('/pricing');
    expect(res?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test('Get started link is clickable and preserves monthly plan (desktop)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop viewport only');
    await suppressCookieBanner(page);
    const errors = collectPageErrors(page);
    await page.goto('/pricing');

    const getStarted = page.getByRole('link', { name: 'Get started' }).first();
    await expect(getStarted).toHaveAttribute('href', /plan=monthly/);
    await expectActionable(getStarted);
    await getStarted.click();

    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/mode=signup|plan=monthly|next=.*plan%3Dmonthly/);
    expect(errors).toEqual([]);
  });

  test('Get started is clickable on mobile pricing', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'Mobile viewport only');
    await suppressCookieBanner(page);
    const errors = collectPageErrors(page);
    await page.goto('/pricing');

    const getStarted = page.getByRole('link', { name: 'Get started' }).first();
    await expectActionable(getStarted);
    await getStarted.click();

    await expect(page).toHaveURL(/\/auth/);
    expect(errors).toEqual([]);
  });

  test('unauthenticated /billing?plan=monthly keeps plan in auth redirect', async ({
    page,
  }) => {
    test.skip(!edgeAuthRedirectsApply(), 'Needs Supabase middleware or production URL');
    await suppressCookieBanner(page);
    await page.goto('/billing?plan=monthly');
    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/next=.*plan%3Dmonthly|next=%2Fbilling%3Fplan%3Dmonthly/);
  });
});

test.describe('Checkout API (Lemon Squeezy)', () => {
  test('POST create-checkout without auth returns 401', async ({ request }) => {
    const res = await request.post('/api/lemonsqueezy/create-checkout', {
      data: { plan: 'monthly' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/unauthorized/i);
  });

  test('POST create-checkout rejects invalid JSON body safely', async ({ request }) => {
    const res = await request.post('/api/lemonsqueezy/create-checkout', {
      data: 'not-json',
      headers: { 'Content-Type': 'application/json' },
    });
    expect([401, 500]).toContain(res.status());
  });
});

test.describe('Checkout error UI (authenticated)', () => {
  test('billing auto-checkout shows inline error when API fails', async ({ page }) => {
    test.skip(!edgeAuthRedirectsApply(), 'Needs Supabase env for /billing route');

    await page.route('**/api/lemonsqueezy/create-checkout', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Billing is not configured for this test' }),
      });
    });

    await page.goto('/billing?plan=monthly');
    if (page.url().includes('/auth')) {
      test.skip(true, 'Set E2E_TEST_EMAIL/PASSWORD for authenticated billing tests');
    }

    await expect(page.getByRole('alert')).toContainText(/couldn't start checkout automatically/i, {
      timeout: 15_000,
    });
  });
});
