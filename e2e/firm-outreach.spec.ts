import { test, expect } from '@playwright/test';

const CRON_ROUTES = [
  '/api/cron/firm-outreach-pipeline/maintain',
  '/api/cron/firm-outreach-enrich',
  '/api/cron/firm-outreach-pipeline/full',
  '/api/cron/firm-outreach-digest',
  '/api/cron/firm-outreach-status',
  '/api/cron/firm-outreach-send',
];

test.describe('Firm outreach smoke tests', () => {
  test('brochure PDF is publicly accessible', async ({ request }) => {
    const response = await request.get('/outreach/police-station-agent-kent-brochure.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/pdf/i);
  });

  test('outreach brochure page loads', async ({ request }) => {
    const response = await request.get('/outreach/brochure');
    expect(response.status()).toBeLessThan(400);
    const html = await response.text();
    expect(html.length).toBeGreaterThan(100);
  });

  for (const route of CRON_ROUTES) {
    test(`cron route ${route} requires authorization`, async ({ request }) => {
      const response = await request.get(route);
      expect(response.status()).toBe(401);
    });
  }

  test('admin firm-outreach API requires authentication', async ({ request }) => {
    const response = await request.get('/api/admin/firm-outreach');
    expect(response.status()).toBe(401);
  });

  test('firm-outreach admin page shows login when unauthenticated', async ({ request }) => {
    const response = await request.get('/admin/firm-outreach');
    expect(response.status()).toBeLessThan(400);
    const html = await response.text();
    expect(html.toLowerCase()).toMatch(/sign in to admin/);
  });

  test('resend webhook rejects unsigned POST', async ({ request }) => {
    const response = await request.post('/api/webhooks/resend', {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(401);
  });

  test('invalid unsubscribe token shows error state', async ({ request }) => {
    const response = await request.get('/outreach/unsubscribe/not-a-valid-token');
    expect(response.status()).toBeLessThan(500);
    const html = await response.text();
    expect(html.length).toBeGreaterThan(20);
  });

  test('admin send-code endpoint responds when KV is configured', async ({ request }) => {
    const response = await request.post('/api/auth/send-code', {
      data: { email: 'not-an-admin@example.com' },
    });
    // 503 when Upstash is not configured (local CI); 200 on production.
    expect([200, 503]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(body.ok).toBe(true);
    }
  });
});
