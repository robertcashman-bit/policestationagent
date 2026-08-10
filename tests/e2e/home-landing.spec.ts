import { test, expect } from '@playwright/test';

test.describe('Homepage (PSR Train landing)', () => {
  test('loads within reasonable time', async ({ page }) => {
    const start = Date.now();
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();
    const ms = Date.now() - start;
    expect(ms).toBeLessThan(8000);
  });

  test('has single h1 and main landmark (accessibility structure)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('hero primary CTA is above the fold on desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop viewport only');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
    const cta = page.locator('#main-content').getByTestId('hero-cta-start-training');
    await expect(cta).toHaveCount(1);
    await expect(cta).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(cta).toBeInViewport();
  });

  // /signup is a server redirect to the unified /auth page,
  // so the final URL after every "Start training" CTA is /auth.
  const signInUrlPattern = /\/(auth|signup)(\?|$)/;

  test('Start training navigates to sign-in', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('hero-cta-start-training').click();
    await expect(page).toHaveURL(signInUrlPattern);
  });

  test('View modules links to training page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('hero-cta-view-modules').click();
    await expect(page).toHaveURL(/\/training/);
  });

  test('sticky header CTA is visible on desktop and links to sign-in', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop viewport only');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const headerCta = page.getByTestId('header-cta-start-training');
    await expect(headerCta).toBeVisible();
    await headerCta.click();
    await expect(page).toHaveURL(signInUrlPattern);
  });

  test('mobile: open menu and reach Start training', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'Mobile viewport only');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByTestId('header-cta-start-training-mobile').click();
    await expect(page).toHaveURL(signInUrlPattern);
  });

  test('bottom CTA Begin training works', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('footer-cta-begin-training').click();
    await expect(page).toHaveURL(signInUrlPattern);
  });

  test('WCAG-friendly contrast on hero headline (computed color)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
    const heading = page.locator('#main-content h1').first();
    await expect(heading).toBeVisible();
    const color = await heading.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBeTruthy();
    const rgb = color.match(/\d+/g)?.map(Number) ?? [];
    expect(rgb.length).toBeGreaterThanOrEqual(3);
    const [r, g, b] = rgb;
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    expect(luminance).toBeLessThan(0.45);
  });
});
