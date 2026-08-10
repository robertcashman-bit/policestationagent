/**
 * Mobile viewport regression: login + Get Started must remain clickable.
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { expectActionable } from './helpers/clickability';
import { collectPageErrors } from './helpers/page-errors';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.use({ viewport: { width: 390, height: 844 } });

test.describe('Mobile clicks (Stephanie reports)', () => {
  test('mobile homepage: Log in in menu works with cookie banner present', async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const login = page.getByRole('link', { name: 'Log in' });
    await expectActionable(login);
    await login.click({ force: false });

    await expect(page).toHaveURL(/\/auth/);
    expect(errors).toEqual([]);
  });

  test('mobile pricing: Get Started opens auth signup flow', async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto('/pricing');

    const getStarted = page.getByRole('link', { name: 'Get started' }).first();
    await expectActionable(getStarted);
    await getStarted.click();

    await expect(page).toHaveURL(/\/auth/);
    expect(errors).toEqual([]);
  });
});
