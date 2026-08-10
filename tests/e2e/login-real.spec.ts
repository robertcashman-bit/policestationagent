/**
 * REAL end-to-end login test against psrtrain.com production.
 * Requires QA_EMAIL and QA_PASSWORD in the environment — never commit credentials.
 */
import { test, expect } from '@playwright/test';

const SITE = 'https://psrtrain.com';

test.use({ baseURL: SITE });

function qaEmail() {
  return process.env.QA_EMAIL || process.env.E2E_TEST_EMAIL;
}
function qaPassword() {
  return process.env.QA_PASSWORD || process.env.E2E_TEST_PASSWORD;
}

test.describe('Production login + session', () => {
  test.beforeEach(() => {
    test.skip(
      !qaEmail() || !qaPassword(),
      'Set QA_EMAIL and QA_PASSWORD (or E2E_TEST_EMAIL and E2E_TEST_PASSWORD) to run production login tests.',
    );
  });

  test('apex sign-in lands on dashboard and survives refresh', async ({ page }) => {
    const EMAIL = qaEmail() as string;
    const PASSWORD = qaPassword() as string;
    const consoleErrors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text());
    });

    await page.goto('/auth');
    await expect(page).toHaveURL(/\/auth/);

    await page.getByRole('textbox', { name: 'Email address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);

    await Promise.all([
      page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 15_000 }),
      page.locator('form button[type="submit"]').click(),
    ]);

    expect(page.url()).toContain('/dashboard');

    // Refresh — session must survive.
    await page.reload();
    expect(page.url()).toContain('/dashboard');

    // Open another protected page directly.
    await page.goto('/practice');
    expect(page.url()).toContain('/practice');

    if (consoleErrors.length) {
      console.log('Console errors during flow:\n' + consoleErrors.join('\n'));
    }
  });

  test('wrong password shows visible error, no loop', async ({ page }) => {
    const EMAIL = qaEmail() as string;
    await page.goto('/auth');
    await page.getByRole('textbox', { name: 'Email address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill('definitely-wrong');
    await page.locator('form button[type="submit"]').click();

    // Error visible, still on /auth.
    await expect(page.getByText(/email and password don.t match|invalid|wrong/i)).toBeVisible({ timeout: 10_000 });
    expect(page.url()).toContain('/auth');
  });

  test('www.psrtrain.com vs psrtrain.com cookie sharing', async ({ context, page }) => {
    const EMAIL = qaEmail() as string;
    const PASSWORD = qaPassword() as string;
    await page.goto(`${SITE}/auth`);
    await page.getByRole('textbox', { name: 'Email address' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    await page.locator('form button[type="submit"]').click();
    await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 15_000 });

    const apexCookies = await context.cookies(SITE);
    const wwwCookies = await context.cookies('https://www.psrtrain.com');
    console.log('apex auth cookies:', apexCookies.filter((c) => c.name.startsWith('sb-')).map((c) => `${c.name}@${c.domain}`));
    console.log('www auth cookies :', wwwCookies.filter((c) => c.name.startsWith('sb-')).map((c) => `${c.name}@${c.domain}`));

    // Now visit www and confirm whether session still holds.
    await page.goto('https://www.psrtrain.com/dashboard');
    console.log('www /dashboard final url:', page.url());
  });
});
