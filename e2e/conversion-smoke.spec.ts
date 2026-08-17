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
    await expect(page.getByRole('heading', { name: 'Choose your pathway' })).toBeVisible();
    await expect(page.getByRole('link', { name: /someone is in custody now/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /voluntary interview booked/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /solicitor needing agent cover/i })).toBeVisible();
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

  test('for-solicitors agency instructions form reachable', async ({ page }) => {
    await page.goto('/for-solicitors#agency-instructions');
    await expect(page.locator('#agency-instructions')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Send agency instructions|agency/i }).first()).toBeVisible();
    await expect(page.locator('#agency-instructions form')).toBeVisible();
    await expect(page.locator('a[href="tel:01732247427"]').first()).toBeVisible();
  });

  test('agency instructions form POSTs to /api/enquiry/agency and shows success', async ({ page }) => {
    let postMethod: string | null = null;
    let postedFirm = '';
    await page.route('**/api/enquiry/agency', async (route) => {
      const request = route.request();
      postMethod = request.method();
      const data = request.postDataBuffer();
      postedFirm = data?.toString('utf8') ?? '';
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, reference: 'AGY-SMOKE' }),
      });
    });

    await page.goto('/for-solicitors#agency-instructions');
    const form = page.locator('#agency-instructions form');
    await form.getByLabel(/Firm name/i).fill('Smoke Test LLP');
    await form.getByLabel(/Instructing solicitor/i).fill('Test Solicitor');
    await form.getByLabel(/Work email/i).fill('smoke@example-llp.co.uk');
    await form.getByLabel(/Direct telephone/i).fill('02071234567');
    await form.getByRole('button', { name: 'Continue' }).click();
    await form.getByLabel(/Client name/i).fill('Test Client');
    await form.getByLabel(/Police station/i).fill('Maidstone');
    await form.getByLabel(/Alleged offence/i).fill('Smoke agency cover request.');
    await form.getByRole('button', { name: 'Continue' }).click();
    for (const label of [
      /firm has authority to provide this information/i,
      /subject to conflict and availability checks/i,
      /No attendance is accepted until expressly confirmed/i,
      /responsible for funding authority/i,
      /Rates and terms have been reviewed/i,
    ]) {
      await form.getByText(label).click();
    }
    await form.getByRole('button', { name: /Send instructions/i }).click();

    await expect.poll(() => postMethod).toBe('POST');
    expect(postedFirm).toMatch(/Smoke Test LLP/);
    expect(postedFirm).toMatch(/Maidstone/);
    await expect(page.getByText(/Instructions received for review/i)).toBeVisible();
  });

  test('homepage shows pathway selector before secondary marketing content', async ({ page }) => {
    await page.goto('/');
    const pathway = page.getByRole('heading', { name: 'Choose your pathway' });
    await expect(pathway).toBeVisible();
    // Pathway block should appear in the first viewport / hero — not buried below the fold only.
    const box = await pathway.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.y).toBeLessThan(900);
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
    test(`Kent page loads with contact/pathway CTA (no firm tel): ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      const main = page.locator('#main-content');
      await expect(main).toBeVisible();
      // Local covers must not publish the firm voice line — route via Contact.
      await expect(page.locator('a[href="tel:01732247427"]')).toHaveCount(0);
      await expect(main.getByRole('link', { name: /Contact|what we do/i }).first()).toBeVisible();
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
  test('sticky mobile pathway bar visible on homepage', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const bar = page.getByLabel('Enquiry pathways');
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: /Voluntary/i })).toBeVisible();
    await expect(bar.getByRole('link', { name: /Custody/i })).toBeVisible();
    await expect(bar.getByRole('link', { name: /Solicitors/i })).toBeVisible();
    await expect(bar.locator('a[href^="tel:"]')).toHaveCount(0);
    await expect(bar.locator('a[href^="sms:"]')).toHaveCount(0);
  });

  test('sticky mobile pathways link to canonical routes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const bar = page.getByLabel('Enquiry pathways');
    await expect(bar.getByRole('link', { name: /Voluntary/i })).toHaveAttribute(
      'href',
      '/start/voluntary-interview#request',
    );
    await expect(bar.getByRole('link', { name: /Custody/i })).toHaveAttribute(
      'href',
      '/current-custody',
    );
    await expect(bar.getByRole('link', { name: /Solicitors/i })).toHaveAttribute(
      'href',
      '/for-solicitors',
    );
  });

  test('audience selector visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Choose your pathway' })).toBeVisible();
  });
});
