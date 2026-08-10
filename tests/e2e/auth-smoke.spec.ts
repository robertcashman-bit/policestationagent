import { test, expect } from '@playwright/test';

/**
 * Smoke tests that run against local dev (default) or PLAYWRIGHT_BASE_URL.
 * No real credentials required.
 */
test.describe('Auth pages', () => {
  test('/auth shows sign-in UI', async ({ page }) => {
    await page.goto('/auth');
    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible({ timeout: 15_000 });
  });

  test('/login redirects into unified /auth flow', async ({ page }) => {
    await page.goto('/login?next=/dashboard');
    await expect(page).toHaveURL(/\/auth/);
  });
});
