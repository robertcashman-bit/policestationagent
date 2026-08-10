/**
 * End-to-end auth behaviour. Point at local dev (default) or production:
 *   PLAYWRIGHT_BASE_URL=https://psrtrain.com npx playwright test tests/e2e/auth-flow.spec.ts
 *
 * Full sign-in / session / logout tests require:
 *   E2E_TEST_EMAIL
 *   E2E_TEST_PASSWORD
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { edgeAuthRedirectsApply } from './helpers/auth';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const E2E_EMAIL = process.env.E2E_TEST_EMAIL;
const E2E_PASSWORD = process.env.E2E_TEST_PASSWORD;

/** Primary submit on the /auth form (avoids the "Sign in" tab toggle). */
function authForm(page: import('@playwright/test').Page) {
  return page.locator('form').filter({ has: page.getByLabel('Password', { exact: true }) });
}

test.describe('Auth flow', () => {
  test('login page loads with sign-in UI', async ({ page }) => {
    await page.goto('/auth');
    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible({ timeout: 20_000 });
  });

  test('unauthenticated user visiting /dashboard is redirected to /auth with next', async ({
    page,
  }) => {
    test.skip(
      !edgeAuthRedirectsApply(),
      'Needs NEXT_PUBLIC_SUPABASE_* (see .env.example) for local middleware, or PLAYWRIGHT_BASE_URL=https://psrtrain.com',
    );
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/next=%2Fdashboard|next=\/dashboard/);
  });

  test('unauthenticated user visiting /practice is redirected to login', async ({ page }) => {
    test.skip(
      !edgeAuthRedirectsApply(),
      'Needs NEXT_PUBLIC_SUPABASE_* for local middleware or PLAYWRIGHT_BASE_URL=https://psrtrain.com',
    );
    await page.goto('/practice');
    await expect(page).toHaveURL(/\/auth/);
  });

  test('login → sign-in form shows error for bad credentials', async ({ page }) => {
    await page.goto('/auth');
    await page.getByRole('textbox', { name: 'Email address' }).fill('e2e-invalid@psrtrain.invalid');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123456789!');
    await authForm(page).getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 20_000 });
  });

  test('auth callback without token lands on /auth with recoverable error', async ({
    page,
  }) => {
    await page.goto('/auth/callback');
    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/error=missing_token/);
  });

  test('www host redirects to apex (cookie scope)', async ({ request }) => {
    const res = await request.get('https://www.psrtrain.com/auth', { maxRedirects: 0 });
    expect([301, 302, 303, 307, 308]).toContain(res.status());
    const loc = res.headers()['location'] ?? '';
    expect(loc).toMatch(/psrtrain\.com\/auth/);
    expect(loc).not.toMatch(/www\.psrtrain\.com/);
  });
});

test.describe('Auth flow (credentials required)', () => {
  test.beforeEach(() => {
    test.skip(
      !E2E_EMAIL || !E2E_PASSWORD,
      'Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD for sign-in, refresh, and logout tests.',
    );
  });

  test('successful login leaves /auth and reaches app or pricing', async ({ page }) => {
    const email = E2E_EMAIL as string;
    const password = E2E_PASSWORD as string;
    await page.goto('/auth');
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await authForm(page).getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 35_000 });
    const path = new URL(page.url()).pathname;
    expect(['/dashboard', '/pricing', '/gate', '/billing']).toContain(path);

    if (path === '/dashboard') {
      await page.reload();
      await expect(page).toHaveURL(/\/dashboard/);
    }
  });

  test('logged-in user opening /auth is redirected off sign-in', async ({ page }) => {
    const email = E2E_EMAIL as string;
    const password = E2E_PASSWORD as string;
    await page.goto('/auth?next=/dashboard');
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await authForm(page).getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 35_000 });

    await page.goto('/auth');
    await expect(page).not.toHaveURL(/\/auth$/);
  });

  test('logout from app shell clears session (paid dashboard only)', async ({ page }) => {
    const email = E2E_EMAIL as string;
    const password = E2E_PASSWORD as string;
    await page.goto('/auth');
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await authForm(page).getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 35_000 });

    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    if (!page.url().includes('/dashboard')) {
      test.skip(true, 'Test account does not land on /dashboard (may need paid access).');
    }

    await page.getByRole('button', { name: 'Log out' }).click();
    await expect(page).toHaveURL(/psrtrain\.com\/?$|127\.0\.0\.1:\d+\/?$|localhost:\d+\/?$/i, {
      timeout: 20_000,
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/auth/);
  });
});
