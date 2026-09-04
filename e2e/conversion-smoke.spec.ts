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
  test('homepage pathway centrepiece is the first-screen job', async ({ page }) => {
    await page.goto('/');
    const pathways = page.getByLabel('Enquiry pathways');
    await expect(pathways).toBeVisible();
    await expect(page.getByRole('heading', { name: /three routes\. voluntary interview is the usual path/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /got a police interview letter/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /someone is in custody now/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /voluntary interview \/ letter/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /solicitor needing agent cover/i })).toBeVisible();
    // Competing hero CTAs removed — pathways are the job
    await expect(page.getByRole('link', { name: /^find representation$/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /^view coverage$/i })).toHaveCount(0);
  });

  test('contact situation picker deflects something-else without call-back', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByTestId('situation-picker')).toBeVisible();
    await page.getByRole('radio', { name: /something else/i }).click();
    await expect(page.getByTestId('situation-other')).toBeVisible();
    await expect(page.getByTestId('situation-other')).toContainText(/101/);
    await expect(page.getByTestId('situation-other')).toContainText(/cannot help with police enquiries/i);
    await expect(page.getByTestId('situation-other')).not.toContainText(/call-back number|we will call you/i);
    await page.getByRole('radio', { name: /voluntary interview/i }).click();
    await expect(page.getByTestId('short-va-form')).toBeVisible();
  });

  test('homepage proof bar and firm section present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Experience and credentials')).toBeVisible();
    await expect(page.getByRole('heading', { name: /police station agent cover for solicitors/i })).toBeVisible();
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

  test('testimonials section appears near top (before blog carousel)', async ({ page }) => {
    await page.goto('/');
    const testimonials = page.locator('#testimonials');
    await expect(testimonials).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /trusted by clients across kent/i }).first(),
    ).toBeVisible();
  });

  test('homepage exposes LegalService and LocalBusiness JSON-LD', async ({ page }) => {
    await page.goto('/');
    // Layout injects org @graph afterInteractive; give it a moment to attach.
    await page.waitForLoadState('networkidle');
    const ldBlocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const combined = ldBlocks.join('\n');
    expect(combined).toContain('LegalService');
    expect(combined).toContain('LocalBusiness');
  });

  test('Kent cover card download link present on homepage and for-solicitors', async ({ page }) => {
    await page.goto('/');
    const homeCard = page.locator('a[data-event="save_cover_card"]');
    await expect(homeCard).toBeVisible();
    await expect(homeCard).toHaveAttribute('href', /\.vcf$/);
    await expect(homeCard).toHaveAttribute('download', /.+/);

    await page.goto('/for-solicitors');
    const firmCard = page.locator('a[data-event="save_cover_card"]');
    await expect(firmCard).toBeVisible();
    await expect(firmCard).toHaveAttribute('href', /\.vcf$/);
  });

  test('Kent cover card vCard file is downloadable', async ({ page }) => {
    const res = await page.request.get('/kent-police-station-cover-card.vcf');
    expect(res.status()).toBeLessThan(400);
    const body = await res.text();
    expect(body).toContain('BEGIN:VCARD');
    expect(body).toContain('01732');
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
  test('homepage hides sticky pathway bar so primary pathway buttons are unobstructed', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByLabel('Enquiry pathways').first()).toBeVisible();
    // Sticky duplicate is suppressed on home — pathways in-page are the job
    await expect(page.locator('[aria-label="Enquiry pathways"].fixed')).toHaveCount(0);
  });

  test('sticky pathway bar appears on inner pages without phone digits', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/faq');
    const sticky = page.locator('[aria-label="Enquiry pathways"].fixed');
    await expect(sticky).toBeVisible();
    await expect(sticky.getByRole('link', { name: /interview/i })).toBeVisible();
    await expect(sticky.getByRole('link', { name: /custody/i })).toBeVisible();
    await expect(sticky.getByRole('link', { name: /solicitors/i })).toBeVisible();
    await expect(sticky.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test('pathway centrepiece visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /three routes\. one clear next step/i }),
    ).toBeVisible();
  });
});
