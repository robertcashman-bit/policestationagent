import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const KENT_PAGES = [
  '/police-station-rep-maidstone',
  '/police-station-rep-medway',
  '/police-station-rep-canterbury',
  '/police-station-rep-ashford',
  '/police-station-rep-gravesend',
  '/police-station-rep-tonbridge',
  '/police-station-rep-tunbridge-wells',
];

test.describe('Conversion smoke — desktop', () => {
  test('homepage audience selector visible above the fold', async ({ page }) => {
    await page.goto('/');
    const selector = page.getByRole('heading', { name: 'Who are you?' });
    await expect(selector).toBeVisible();
    await expect(page.getByRole('link', { name: /someone is in custody now/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /voluntary interview booked/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /law firm needing cover/i })).toBeVisible();
  });

  test('homepage proof bar and firm section present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Experience and credentials')).toBeVisible();
    await expect(page.getByRole('heading', { name: /kent police station cover for solicitors/i })).toBeVisible();
  });

  test('homepage loads without app console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();

    // Ignore environment-only noise — favicon, Vercel-injected analytics scripts
    // (404/MIME) when the prod build is served off-Vercel, and generic
    // third-party resource-load failures that don't break the app.
    const appConsoleErrors = consoleErrors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('_vercel/speed-insights') &&
        !e.includes('_vercel/insights') &&
        !e.includes('speed-insights/script.js') &&
        !e.includes('Failed to load resource'),
    );
    expect(appConsoleErrors).toHaveLength(0);
  });

  test('for-solicitors firm enquiry form reachable', async ({ page }) => {
    await page.goto('/for-solicitors#firm-enquiry');
    await expect(page.locator('#firm-enquiry')).toBeVisible();
    await expect(page.getByRole('heading', { name: /firm enquiry/i })).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });

  test('firm enquiry form POSTs to /api/contact and shows success', async ({ page }) => {
    // Intercept the contact API so the test never hits real email/storage.
    let postBody: Record<string, unknown> | null = null;
    let postMethod: string | null = null;
    await page.route('**/api/contact', async (route) => {
      const request = route.request();
      postMethod = request.method();
      try {
        postBody = request.postDataJSON();
      } catch {
        postBody = null;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/for-solicitors#firm-enquiry');

    const form = page.locator('#firm-enquiry form');
    await form.locator('#name').fill('Test Solicitor');
    await form.locator('#contactNumber').fill('01732 247427');
    // Solicitor role is the default on this page, so client fields are shown.
    await form.locator('#clientName').fill('Test Client');
    await form.locator('#clientDOB').fill('1990-01-01');
    await form.locator('#policeStation').fill('Maidstone');
    await form.locator('#interviewDate').fill('2030-01-01');
    await form.locator('#interviewTime').fill('10:00');
    await form.locator('#briefDetails').fill('Firm cover request for a scheduled voluntary interview.');
    // Two required confirmation checkboxes (non-urgent + consent).
    await form.locator('input[type="checkbox"]').nth(0).check();
    await form.locator('input[type="checkbox"]').nth(1).check();

    await form.getByRole('button', { name: /submit request/i }).click();

    // The POST must have fired with the firm-instruction defaults intact.
    await expect.poll(() => postMethod).toBe('POST');
    expect(postBody).toMatchObject({
      role: 'solicitor',
      attendanceType: 'solicitor-instruction',
      name: 'Test Solicitor',
      policeStation: 'Maidstone',
    });
    await expect(page.getByText(/your request has been submitted successfully/i)).toBeVisible();
  });

  test('homepage has title and meta description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Kent|Police Station/i);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc?.length).toBeGreaterThan(50);
  });

  for (const path of KENT_PAGES) {
    test(`Kent page loads with CTA: ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      const telLink = page.locator('a[href^="tel:"]').first();
      await expect(telLink).toBeVisible();
    });
  }
});

test.describe('Accessibility (axe — serious/critical only)', () => {
  for (const route of ['/', '/for-solicitors']) {
    test(`no serious/critical a11y violations: ${route}`, async ({ page }) => {
      const res = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(res?.status()).toBeLessThan(400);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .options({ rules: { region: { enabled: false } } })
        .analyze();

      const seriousOrCritical = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      const detail = seriousOrCritical
        .map(
          (v) =>
            `  [${v.impact}] ${v.id}: ${v.help}\n    affected: ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(' > '))
              .join(', ')}`,
        )
        .join('\n');

      expect(seriousOrCritical, `${route} accessibility violations:\n${detail}`).toEqual([]);
    });
  }
});

test.describe('Conversion smoke — mobile viewport', () => {
  test('sticky mobile CTA visible on homepage', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const callBtn = page.locator('a[data-event="call_click"]').last();
    const textBtn = page.locator('a[data-event="sms_click"]').last();
    await expect(callBtn).toBeVisible();
    await expect(textBtn).toBeVisible();
    await expect(callBtn).toHaveText(/call/i);
    await expect(textBtn).toHaveText(/text/i);
  });

  test('audience selector visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Who are you?' })).toBeVisible();
  });
});
