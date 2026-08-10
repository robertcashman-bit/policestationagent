/**
 * User-journey E2E: logged-out login click (Stephanie report #2).
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { suppressCookieBanner } from './helpers/cookies';
import { expectActionable } from './helpers/clickability';
import { collectPageErrors } from './helpers/page-errors';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Logged-out login', () => {
  test('homepage loads, login visible and enabled, opens auth without console errors', async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const res = await page.goto('/');
    expect(res?.ok()).toBeTruthy();

    const isMobile = testInfo.project.name === 'chromium-mobile';
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
    } else {
      await suppressCookieBanner(page);
    }

    const login = page.getByRole('link', { name: 'Log in' }).first();
    await expectActionable(login);
    await login.click({ force: false });

    await expect(page).toHaveURL(/\/auth/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({
      timeout: 15_000,
    });
    expect(errors).toEqual([]);
  });

  test('/login redirects to auth (not 404)', async ({ page }) => {
    const res = await page.goto('/login');
    expect(res?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/auth/);
  });
});
