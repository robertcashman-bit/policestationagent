import { test, expect } from '@playwright/test';

const BANNED_PHRASES = [
  '45-minute response time',
  'we can provide immediate representation',
  'Immediate FREE legal representation',
  'FREE 24/7',
];

test.describe('Site smoke tests', () => {
  test('homepage loads with main content', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('homepage avoids banned compliance phrases', async ({ page }) => {
    await page.goto('/');
    const body = await page.locator('body').innerText();
    for (const phrase of BANNED_PHRASES) {
      expect(body.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });

  test('location page avoids banned compliance phrases', async ({ page }) => {
    await page.goto('/police-station-rep-maidstone');
    const body = await page.locator('body').innerText();
    for (const phrase of BANNED_PHRASES) {
      expect(body.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });

  test('legacy login endpoint is disabled', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { username: 'admin', password: 'Secure123!' },
    });
    expect(response.status()).toBe(410);
  });

  test('admin API requires authentication', async ({ request }) => {
    const response = await request.get('/api/admin/firm-outreach');
    expect(response.status()).toBe(401);
  });

  test('admin page redirects unauthenticated users', async ({ page }) => {
    await page.goto('/admin/content');
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toMatch(/\/admin/);
    await expect(page.getByRole('heading', { name: /sign in to admin/i })).toBeVisible();
  });
});
