/**
 * Pricing page checkout wiring + mobile login click path.
 * Run: npm run test:e2e -- tests/e2e/pricing-checkout.spec.ts
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { edgeAuthRedirectsApply } from './helpers/auth';
import { suppressCookieBanner } from './helpers/cookies';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Pricing checkout wiring', () => {
  test('logged-out Get started (monthly) reaches signup auth with plan preserved', async ({
    page,
  }) => {
    await suppressCookieBanner(page);
    await page.goto('/pricing');

    await page.getByRole('link', { name: 'Get started' }).first().click();

    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/mode=signup/);
    await expect(page).toHaveURL(/plan=monthly|next=.*plan%3Dmonthly/);
  });

  test('checkout API error shows inline message on billing auto-checkout', async ({ page }) => {
    test.skip(
      !edgeAuthRedirectsApply(),
      'Needs Supabase env for authenticated /billing route',
    );

    await page.route('**/api/lemonsqueezy/create-checkout', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Billing is not configured for this test' }),
      });
    });

    await page.goto('/billing?plan=monthly');
    if (page.url().includes('/auth')) {
      test.skip(true, 'Not signed in — set E2E_TEST_EMAIL/PASSWORD for authenticated billing tests');
    }

    await expect(page.getByRole('alert')).toContainText(/couldn't start checkout automatically/i, {
      timeout: 15_000,
    });
    await expect(page.getByText(/Billing is not configured for this test/i)).toBeVisible();
  });
});

test.describe('Mobile login click path', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Log in in mobile menu navigates to /auth', async ({ page }) => {
    await suppressCookieBanner(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Log in' }).click({ force: false });

    await expect(page).toHaveURL(/\/auth/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({
      timeout: 15_000,
    });
  });
});
