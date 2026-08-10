/**
 * Crawls public routes and navigation targets so internal links do not 404.
 * Run against production: PLAYWRIGHT_BASE_URL=https://psrtrain.com npx playwright test tests/e2e/site-inventory.spec.ts
 */
import { test, expect } from '@playwright/test';
import { edgeAuthRedirectsApply } from './helpers/auth';

/** Matches app/sitemap.ts plus auth/legal entry points and assets. */
const PUBLIC_PAGE_PATHS = [
  '/',
  '/pricing',
  '/features',
  '/training',
  '/login',
  '/signup',
  '/reset-password',
  '/update-password',
  '/gate',
  '/auth',
  '/auth/reset',
  '/auth/confirm',
  '/legal/about',
  '/legal/faq',
  '/legal/contact',
  '/legal/about-the-role',
  '/legal/accreditation-process',
  '/legal/how-our-training-helps',
  '/legal/course-content',
  '/legal/who-this-is-for',
  '/legal/disclaimer',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cookies',
  '/legal/refund',
  '/legal/complaints',
  '/legal-advice',
  '/legal-advice/legal-rights/is-legal-advice-free-at-a-police-station',
  '/legal-advice/police-interviews/do-i-have-to-answer-police-questions',
  '/legal-advice/police-interviews/can-police-interview-me-without-a-solicitor',
  '/legal-advice/police-interviews/can-i-leave-a-voluntary-police-interview',
  '/guides',
  '/blog',
  '/guides/what-is-psras',
  '/guides/pace-code-c-guide',
  '/guides/critical-incidents-test-psras',
  '/blog/first-week-psras-revision-plan',
  '/blog/code-c-first-hour-custody-checklist',
  '/blog/cit-scenario-mistakes-to-avoid',
];

const STATIC_ASSETS = ['/sitemap.xml', '/robots.txt', '/icon.svg'];

function authForm(page: import('@playwright/test').Page) {
  return page.locator('form').filter({ has: page.getByLabel('Password', { exact: true }) });
}

PUBLIC_PAGE_PATHS.forEach((path) => {
  test(`HTTP GET ${path} succeeds (no 4xx/5xx)`, async ({ request }) => {
    const res = await request.get(path, { maxRedirects: 15 });
    expect(
      res.status(),
      `${path} returned ${res.status()}`,
    ).toBeLessThan(400);
  });
});

STATIC_ASSETS.forEach((path) => {
  test(`asset ${path} is reachable`, async ({ request }) => {
    const res = await request.get(path, { maxRedirects: 10 });
    expect(res.status(), path).toBeLessThan(400);
  });
});

test.describe('Forms & auth UX', () => {
  test('contact: empty submit does not succeed (native validation and/or API error)', async ({
    page,
  }) => {
    await page.goto('/legal/contact');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page).toHaveURL(/\/legal\/contact/);
    const nameInvalid = await page.locator('#name').evaluate((el: HTMLInputElement) => !el.validity.valid);
    const alertVisible = await page.getByRole('alert').isVisible().catch(() => false);
    // Native validation (preferred), or legacy noValidate path → API 400 + alert
    expect(nameInvalid || alertVisible).toBe(true);
  });

  test('sign-in: empty submit does not leave /auth (browser validation)', async ({ page }) => {
    await page.goto('/auth');
    await authForm(page).getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/auth/);
    const invalid = await page.locator('input[type="email"]').evaluate(
      (el: HTMLInputElement) => !el.validity.valid,
    );
    expect(invalid).toBe(true);
  });
});

test.describe('Protected areas (unauthenticated)', () => {
  test.beforeEach(() => {
    test.skip(
      !edgeAuthRedirectsApply(),
      'Needs NEXT_PUBLIC_SUPABASE_* for local middleware, or PLAYWRIGHT_BASE_URL=https://psrtrain.com',
    );
  });

  test('GET /dashboard ends on /auth with 200', async ({ request }) => {
    const res = await request.get('/dashboard', { maxRedirects: 15 });
    expect(res.status()).toBe(200);
    const url = res.url();
    expect(url).toMatch(/\/auth/);
  });

  test('GET /admin/analytics ends on /auth (not public)', async ({ request }) => {
    const res = await request.get('/admin/analytics', { maxRedirects: 15 });
    expect(res.status()).toBe(200);
    expect(res.url()).toMatch(/\/auth/);
  });
});

test.describe('Main pages: no critical console errors', () => {
  const urls = ['/', '/pricing', '/training', '/auth', '/legal/contact'];

  for (const path of urls) {
    test(`no pageerror on ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));

      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');

      expect(errors, errors.join('\n')).toEqual([]);
    });
  }
});
