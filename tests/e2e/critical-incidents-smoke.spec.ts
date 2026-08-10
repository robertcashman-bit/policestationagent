import { test, expect } from '@playwright/test';
import { edgeAuthRedirectsApply } from './helpers/auth';

/**
 * Smoke test for the Critical Incidents Test (CIT) area.
 *
 * The /critical-incidents and /critical-incidents/[slug] routes are protected,
 * so unauthenticated visits redirect to /auth. This smoke verifies that the
 * routes exist and that protection works — full interactive playthrough lives
 * in the unit test for the scenario JSON validator.
 */
test.describe('CIT routes (smoke)', () => {
  test.beforeEach(() => {
    test.skip(
      !edgeAuthRedirectsApply(),
      'Needs NEXT_PUBLIC_SUPABASE_* for local middleware, or PLAYWRIGHT_BASE_URL=https://psrtrain.com',
    );
  });

  test('/critical-incidents is protected and redirects to /auth', async ({ page }) => {
    const response = await page.goto('/critical-incidents', {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/(auth|signup)(\?|$)/);
  });

  test('a CIT scenario slug page is reachable (and protected)', async ({ page }) => {
    const response = await page.goto('/critical-incidents/dscc-third-party', {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.ok()).toBeTruthy();
    // We expect the redirect to login because the route is in the (main) shell.
    await expect(page).toHaveURL(/\/(auth|signup)(\?|$)/);
  });

  test('/syllabus is protected and redirects to /auth', async ({ page }) => {
    const response = await page.goto('/syllabus', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/(auth|signup)(\?|$)/);
  });
});
