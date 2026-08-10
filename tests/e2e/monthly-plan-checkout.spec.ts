/**
 * User-journey E2E: monthly Get Started → signup auth with plan preserved.
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { suppressCookieBanner } from './helpers/cookies';
import { expectActionable } from './helpers/clickability';
import { collectPageErrors } from './helpers/page-errors';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Monthly plan checkout journey (logged out)', () => {
  test('pricing loads; Get Started is enabled and opens signup auth with monthly plan', async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    const res = await page.goto('/pricing');
    expect(res?.ok()).toBeTruthy();

    const getStarted = page.getByRole('link', { name: 'Get started' }).first();
    await expect(getStarted).toHaveAttribute('href', /plan=monthly/);
    await expectActionable(getStarted);
    await getStarted.click();

    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/mode=signup|next=.*plan%3Dmonthly/);
    expect(errors).toEqual([]);
  });

  test('Lemon Squeezy checkout page opens for monthly plan (API smoke URL)', async ({ page }) => {
    test.skip(
      !process.env.LEMON_SQUEEZY_API_KEY,
      'Set LEMON_SQUEEZY_API_KEY locally to verify checkout UI opens',
    );

    const { execSync } = await import('node:child_process');
    const out = execSync('node scripts/test-lemon-checkout.mjs monthly', {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    const match = out.match(/URL: (https:\/\/[^\s]+)/);
    expect(match?.[1]).toBeTruthy();

    const res = await page.goto(match![1]);
    expect(res?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/PSR Train.*Monthly.*Checkout/i);
    await expect(page.getByText('£11.50 billed every month')).toBeVisible({ timeout: 15_000 });
  });
});
