import { describe, expect, it, vi, afterEach } from 'vitest';
import { isCronAuthorized } from '@/lib/cron-auth';
import { isAllowedEnquiryOrigin } from '@/lib/enquiry/origin';
import { sanitizeBlogHtml, sanitizeScrapedHtml } from '@/lib/html-sanitizer';

/** NODE_ENV is typed read-only on ProcessEnv; Reflect.set keeps test env switching valid. */
function setNodeEnv(value: string | undefined) {
  Reflect.set(process.env, 'NODE_ENV', value);
}

describe('sendMagicCode email subject', () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.ADMIN_MAGIC_FROM_EMAIL;
    delete process.env.RESEND_MAGIC_PREFER_CUSTOM;
  });

  it('does not include the OTP code in the email subject', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const code = '482913';
    const send = vi.fn().mockResolvedValue({ data: { id: 'msg_123' }, error: null });

    vi.doMock('resend', () => ({
      Resend: class MockResend {
        emails = { send };
        constructor(_key: string) {}
      },
    }));

    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('admin@example.com', code);

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
    const subject = send.mock.calls[0][0].subject as string;
    expect(subject).not.toContain(code);
    expect(subject).toMatch(/admin login code/i);

    vi.doUnmock('resend');
  });
});

describe('cron timing-safe auth', () => {
  const prevSecret = process.env.CRON_SECRET;
  const prevNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.CRON_SECRET = prevSecret;
    setNodeEnv(prevNodeEnv);
  });

  it('denies when CRON_SECRET is missing in production', () => {
    delete process.env.CRON_SECRET;
    setNodeEnv('production');
    const req = new Request('http://localhost/api/cron/firm-outreach-status', {
      headers: { Authorization: 'Bearer anything' },
    });
    expect(isCronAuthorized(req)).toBe(false);
  });

  it('rejects near-miss secrets without accepting them', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    setNodeEnv('production');
    const req = new Request('http://localhost/api/cron/firm-outreach-status', {
      headers: { Authorization: 'Bearer test-cron-secre' },
    });
    expect(isCronAuthorized(req)).toBe(false);
  });

  it('accepts exact Bearer secret', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    setNodeEnv('production');
    const req = new Request('http://localhost/api/cron/firm-outreach-status', {
      headers: { Authorization: 'Bearer test-cron-secret' },
    });
    expect(isCronAuthorized(req)).toBe(true);
  });

  it('accepts exact x-cron-secret header', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    setNodeEnv('production');
    const req = new Request('http://localhost/api/cron/firm-outreach-status', {
      headers: { 'x-cron-secret': 'test-cron-secret' },
    });
    expect(isCronAuthorized(req)).toBe(true);
  });
});

describe('enquiry origin checks', () => {
  const prevNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    setNodeEnv(prevNodeEnv);
  });

  it('rejects missing Origin and Referer in production', () => {
    setNodeEnv('production');
    const req = new Request('https://www.policestationagent.com/api/contact', {
      method: 'POST',
    });
    expect(isAllowedEnquiryOrigin(req)).toBe(false);
  });

  it('allows trusted production Origin', () => {
    setNodeEnv('production');
    const req = new Request('https://www.policestationagent.com/api/contact', {
      method: 'POST',
      headers: { Origin: 'https://www.policestationagent.com' },
    });
    expect(isAllowedEnquiryOrigin(req)).toBe(true);
  });

  it('allows trusted apex production Origin', () => {
    setNodeEnv('production');
    const req = new Request('https://www.policestationagent.com/api/contact', {
      method: 'POST',
      headers: { Origin: 'https://policestationagent.com' },
    });
    expect(isAllowedEnquiryOrigin(req)).toBe(true);
  });

  it('allows missing Origin in non-production', () => {
    setNodeEnv('development');
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
    });
    expect(isAllowedEnquiryOrigin(req)).toBe(true);
  });

  it('rejects untrusted production Origin', () => {
    setNodeEnv('production');
    const req = new Request('https://www.policestationagent.com/api/contact', {
      method: 'POST',
      headers: { Origin: 'https://evil.example' },
    });
    expect(isAllowedEnquiryOrigin(req)).toBe(false);
  });
});

describe('HTML sanitizer', () => {
  it('strips script tags and onerror handlers from blog HTML', () => {
    const dirty =
      '<p>Hello</p><script>alert(1)</script><img src="/x.png" onerror="alert(1)" alt="x" />';
    const clean = sanitizeBlogHtml(dirty);
    expect(clean).not.toMatch(/<script/i);
    expect(clean).not.toMatch(/onerror/i);
    expect(clean).toContain('Hello');
  });

  it('strips inline style attributes and data: image URLs', () => {
    const dirty =
      '<div style="background:red"><img src="data:image/png;base64,abc" alt="x" /></div>';
    const clean = sanitizeScrapedHtml(dirty);
    expect(clean).not.toMatch(/style=/i);
    expect(clean).not.toMatch(/data:image/i);
    expect(clean).toContain('<div');
  });

  it('preserves class-based blog markup without inline styles', () => {
    const dirty =
      '<div class="key-takeaways"><h2 class="key-takeaways-heading">Key takeaways</h2><ul><li>One</li></ul></div>';
    const clean = sanitizeBlogHtml(dirty);
    expect(clean).toContain('class="key-takeaways"');
    expect(clean).toContain('Key takeaways');
  });
});

describe('index-now GET recon strip', () => {
  const prevSecret = process.env.CRON_SECRET;
  const prevNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    vi.resetModules();
    process.env.CRON_SECRET = prevSecret;
    setNodeEnv(prevNodeEnv);
  });

  it('returns minimal payload without CRON_SECRET', async () => {
    process.env.CRON_SECRET = 'index-now-secret';
    setNodeEnv('production');
    const { GET } = await import('@/app/api/index-now/route');
    const res = await GET(new Request('http://localhost/api/index-now'));
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });
});

describe('contact health GET recon strip', () => {
  const prevSecret = process.env.CRON_SECRET;
  const prevNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    vi.resetModules();
    process.env.CRON_SECRET = prevSecret;
    setNodeEnv(prevNodeEnv);
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FORM_TO_EMAIL;
  });

  it('returns minimal payload without CRON_SECRET', async () => {
    process.env.CRON_SECRET = 'health-check-secret';
    setNodeEnv('production');
    const { GET } = await import('@/app/api/contact/health/route');
    const res = await GET(new Request('http://localhost/api/contact/health'));
    const body = await res.json();
    expect(body).toEqual({ ok: false });
    expect(body).not.toHaveProperty('hasResendApiKey');
  });
});
