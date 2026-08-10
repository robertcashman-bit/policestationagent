/**
 * Full authenticated screen audit.
 *
 * Signs in once with QA_EMAIL / QA_PASSWORD (a temporary admin-enabled test
 * user) and walks every screen in the app — public, gated, and admin —
 * capturing a screenshot and recording page errors, console errors, the final
 * URL, and whether an error boundary rendered. Writes a JSON + Markdown report
 * to test-results/screen-audit/.
 *
 * Run locally (dev server auto-starts): npx playwright test full-screen-audit --project=chromium-desktop
 */
import { test, expect } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'test-results', 'screen-audit');

const EMAIL = process.env.QA_EMAIL || process.env.E2E_TEST_EMAIL;
const PASSWORD = process.env.QA_PASSWORD || process.env.E2E_TEST_PASSWORD;

// Every fixed route in the app. Dynamic routes (critical-incident scenarios)
// are discovered at runtime from their index page.
const PUBLIC_ROUTES = [
  '/',
  '/pricing',
  '/features',
  '/training',
  '/auth',
  '/auth/reset',
  '/auth/confirm',
  '/login',
  '/signup',
  '/reset-password',
  '/update-password',
  '/gate',
  '/legal/about',
  '/legal/about-the-role',
  '/legal/accreditation-process',
  '/legal/how-our-training-helps',
  '/legal/course-content',
  '/legal/who-this-is-for',
  '/legal/faq',
  '/legal/contact',
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
  '/guides/what-is-psras',
  '/guides/how-to-become-a-police-station-representative',
  '/guides/pace-code-c-guide',
  '/guides/critical-incidents-test-psras',
];

const GATED_ROUTES = [
  '/dashboard',
  '/practice',
  '/modules',
  '/syllabus',
  '/progress',
  '/certificates',
  '/critical-incidents',
  '/settings',
  '/billing',
];

const ADMIN_ROUTES = ['/admin/users', '/admin/live', '/admin/analytics', '/admin/questions'];

type Result = {
  route: string;
  group: 'public' | 'gated' | 'admin';
  finalUrl: string;
  status: 'ok' | 'redirected-to-auth' | 'error-boundary' | 'page-error';
  pageErrors: string[];
  consoleErrors: string[];
  screenshot: string;
};

// Use the system-installed Google Chrome instead of Playwright's bundled
// Chromium (avoids a large browser download on locked-down networks).
test.use({ channel: 'chrome' });

test.describe('Full authenticated screen audit', () => {
  test.skip(!EMAIL || !PASSWORD, 'Set QA_EMAIL and QA_PASSWORD to run the full screen audit.');
  test.setTimeout(180_000);

  test('walk every screen, screenshot, and report', async ({ page }) => {
    mkdirSync(OUT_DIR, { recursive: true });
    const results: Result[] = [];

    const visit = async (route: string, group: Result['group']) => {
      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];
      const onPageError = (e: Error) => pageErrors.push(e.message);
      const onConsole = (m: import('@playwright/test').ConsoleMessage) => {
        if (m.type() === 'error') consoleErrors.push(m.text());
      };
      page.on('pageerror', onPageError);
      page.on('console', onConsole);

      let finalUrl = route;
      try {
        await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30_000 });
        await page.waitForLoadState('load', { timeout: 30_000 }).catch(() => {});
        await page.waitForTimeout(400);
        finalUrl = page.url();
      } catch (err) {
        pageErrors.push(`navigation: ${(err as Error).message}`);
      }

      const safeName = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
      const screenshot = path.join(OUT_DIR, `${group}__${safeName}.png`);
      await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});

      // Did Next render an error boundary?
      const bodyText = (await page.textContent('body').catch(() => '')) ?? '';
      const hasErrorBoundary =
        /Application error|something went wrong|Internal Server Error|Unhandled Runtime Error|This page could not be found/i.test(
          bodyText,
        );

      const redirectedToAuth = /\/auth(\?|$)/.test(new URL(finalUrl).pathname + new URL(finalUrl).search);

      let status: Result['status'] = 'ok';
      if (group !== 'public' && redirectedToAuth) status = 'redirected-to-auth';
      else if (hasErrorBoundary) status = 'error-boundary';
      else if (pageErrors.length) status = 'page-error';

      results.push({
        route,
        group,
        finalUrl,
        status,
        pageErrors,
        consoleErrors,
        screenshot: path.relative(process.cwd(), screenshot),
      });

      page.off('pageerror', onPageError);
      page.off('console', onConsole);
    };

    // ---- 1. Public routes (no auth) ----
    for (const r of PUBLIC_ROUTES) await visit(r, 'public');

    // ---- 2. Sign in with password ----
    await page.goto('/auth', { waitUntil: 'load' });
    const emailField = page.getByRole('textbox', { name: 'Email address' });
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    // Wait for React hydration: the submit button must be interactive before we
    // type, otherwise the controlled inputs get reset and the email is lost.
    const submit = page.locator('form button[type="submit"]').first();
    await expect(submit).toBeVisible();
    await page.waitForTimeout(800);
    // Fill and verify (refill if a late hydration pass cleared the value).
    for (let attempt = 0; attempt < 3; attempt++) {
      await emailField.fill(EMAIL as string);
      await passwordField.fill(PASSWORD as string);
      const ev = await emailField.inputValue();
      const pv = await passwordField.inputValue();
      if (ev === EMAIL && pv === PASSWORD) break;
      await page.waitForTimeout(400);
    }
    await expect(emailField).toHaveValue(EMAIL as string);
    await Promise.all([
      page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 20_000 }),
      submit.click(),
    ]);
    expect(page.url(), 'should leave /auth after sign-in').not.toContain('/auth');

    // ---- 3. Gated routes ----
    for (const r of GATED_ROUTES) await visit(r, 'gated');

    // ---- 3b. One real critical-incident scenario (dynamic slug) ----
    await page.goto('/critical-incidents', { waitUntil: 'domcontentloaded' }).catch(() => {});
    const firstScenario = await page
      .locator('a[href^="/critical-incidents/"]')
      .first()
      .getAttribute('href')
      .catch(() => null);
    if (firstScenario && firstScenario !== '/critical-incidents') {
      await visit(firstScenario, 'gated');
    }

    // ---- 4. Admin routes ----
    for (const r of ADMIN_ROUTES) await visit(r, 'admin');

    // ---- 5. Reports ----
    const summary = {
      generatedAt: new Date().toISOString(),
      total: results.length,
      ok: results.filter((r) => r.status === 'ok').length,
      problems: results.filter((r) => r.status !== 'ok'),
      results,
    };
    writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(summary, null, 2));

    const md = [
      `# Screen audit — ${summary.generatedAt}`,
      ``,
      `**${summary.ok}/${summary.total} screens OK**`,
      ``,
      `| Status | Group | Route | Final URL | Console errors |`,
      `|--------|-------|-------|-----------|----------------|`,
      ...results.map(
        (r) =>
          `| ${r.status === 'ok' ? 'OK' : '⚠ ' + r.status} | ${r.group} | \`${r.route}\` | \`${new URL(r.finalUrl).pathname}\` | ${r.consoleErrors.length} |`,
      ),
    ].join('\n');
    writeFileSync(path.join(OUT_DIR, 'report.md'), md + '\n');

    // Console log a compact summary for the terminal.
    console.log(`\nScreen audit: ${summary.ok}/${summary.total} OK`);
    for (const p of summary.problems) {
      console.log(`  ⚠ [${p.group}] ${p.route} -> ${p.status} (${new URL(p.finalUrl).pathname})`);
      for (const e of p.pageErrors.slice(0, 2)) console.log(`      pageerror: ${e}`);
    }

    // The audit itself should not have any gated route bounce to /auth, and no
    // error boundaries. Console errors are reported but not hard-failed.
    const hardFailures = results.filter(
      (r) => r.status === 'redirected-to-auth' || r.status === 'error-boundary' || r.status === 'page-error',
    );
    expect(
      hardFailures.map((f) => `${f.route}:${f.status}`),
      'screens with hard failures',
    ).toEqual([]);
  });
});
