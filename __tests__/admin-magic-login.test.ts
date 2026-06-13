import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('POST /api/auth/send-code', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test';
    vi.doMock('@/lib/kv', () => ({
      getKV: () => ({ set: vi.fn(), get: vi.fn() }),
    }));
    vi.doMock('@/lib/contact-guards', () => ({
      getClientIp: () => '127.0.0.1',
      rateLimitOk: async () => ({ ok: true }),
    }));
  });

  afterEach(() => {
    vi.resetModules();
    vi.doUnmock('@/lib/kv');
    vi.doUnmock('@/lib/contact-guards');
    vi.doUnmock('@/lib/email');
  });

  it('returns 503 when magic code email fails to send', async () => {
    vi.doMock('@/lib/email', () => ({
      sendMagicCode: vi.fn(async () => ({ success: false, error: 'domain not verified' })),
      magicCodeSendErrorMessage: (err?: string) => err ?? 'send failed',
    }));
    vi.doMock('@/lib/admin-session', () => ({
      storeMagicCode: vi.fn(),
    }));

    const { POST } = await import('@/app/api/auth/send-code/route');
    const res = await POST(
      new Request('http://localhost/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'robertdavidcashman@gmail.com' }),
      }),
    );

    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toMatch(/domain not verified/i);
  });

  it('stores code only after email sends successfully', async () => {
    const storeMagicCode = vi.fn();
    vi.doMock('@/lib/email', () => ({
      sendMagicCode: vi.fn(async () => ({ success: true })),
    }));
    vi.doMock('@/lib/admin-session', () => ({
      storeMagicCode,
    }));

    const { POST } = await import('@/app/api/auth/send-code/route');
    const res = await POST(
      new Request('http://localhost/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'robertdavidcashman@gmail.com' }),
      }),
    );

    expect(res.status).toBe(200);
    expect(storeMagicCode).toHaveBeenCalledOnce();
  });

  it('returns ok without sending for non-admin emails', async () => {
    const sendMagicCode = vi.fn();
    vi.doMock('@/lib/email', () => ({ sendMagicCode }));
    vi.doMock('@/lib/admin-session', () => ({
      storeMagicCode: vi.fn(),
    }));

    const { POST } = await import('@/app/api/auth/send-code/route');
    const res = await POST(
      new Request('http://localhost/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'stranger@example.com' }),
      }),
    );

    expect(res.status).toBe(200);
    expect(sendMagicCode).not.toHaveBeenCalled();
  });
});

describe('sendMagicCode', () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.ADMIN_MAGIC_FROM_EMAIL;
    delete process.env.RESEND_MAGIC_PREFER_CUSTOM;
  });

  it('returns error when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('admin@example.com', '123456');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/RESEND_API_KEY/i);
  });

  it('returns error when RESEND_API_KEY has invalid format', async () => {
    process.env.RESEND_API_KEY = '98765445';
    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('admin@example.com', '123456');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/starting with re_/i);
  });

  it('maps send errors to user-facing messages', async () => {
    const { magicCodeSendErrorMessage } = await import('@/lib/email');
    expect(magicCodeSendErrorMessage('RESEND_API_KEY not set')).toMatch(/not configured/i);
    expect(magicCodeSendErrorMessage('Resend API key rejected: Invalid API key')).toMatch(
      /rejected the API key/i,
    );
  });

  it('sends via onboarding@resend.dev first by default', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'Police Station Agent <noreply@policestationagent.com>';

    const send = vi.fn().mockResolvedValue({ data: { id: 'msg_123' }, error: null });
    const listDomains = vi.fn().mockResolvedValue({ data: [], error: null });

    vi.doMock('resend', () => ({
      Resend: class MockResend {
        emails = { send };
        domains = { list: listDomains };
        constructor(_key: string) {}
      },
    }));

    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('robertdavidcashman@gmail.com', '654321');

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0].from).toContain('onboarding@resend.dev');

    vi.doUnmock('resend');
  });

  it('retries custom sender when onboarding fails', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'Police Station Agent <noreply@policestationagent.com>';

    const send = vi
      .fn()
      .mockResolvedValueOnce({
        data: null,
        error: { message: 'You can only send testing emails to your own email address' },
      })
      .mockResolvedValueOnce({ data: { id: 'msg_123' }, error: null });
    const listDomains = vi.fn().mockResolvedValue({ data: [], error: null });

    vi.doMock('resend', () => ({
      Resend: class MockResend {
        emails = { send };
        domains = { list: listDomains };
        constructor(_key: string) {}
      },
    }));

    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('robertdavidcashman@gmail.com', '654321');

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0].from).toContain('onboarding@resend.dev');
    expect(send.mock.calls[1][0].from).toContain('policestationagent.com');

    vi.doUnmock('resend');
  });

  it('retries onboarding when custom sender fails with non-domain error', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.RESEND_MAGIC_PREFER_CUSTOM = 'true';
    process.env.CONTACT_FROM_EMAIL = 'Police Station Agent <noreply@policestationagent.com>';

    const send = vi
      .fn()
      .mockResolvedValueOnce({
        data: null,
        error: { message: 'API key is invalid' },
      })
      .mockResolvedValueOnce({ data: { id: 'msg_123' }, error: null });
    const listDomains = vi.fn().mockResolvedValue({ data: [], error: null });

    vi.doMock('resend', () => ({
      Resend: class MockResend {
        emails = { send };
        domains = { list: listDomains };
        constructor(_key: string) {}
      },
    }));

    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('robertdavidcashman@gmail.com', '654321');

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][0].from).toContain('onboarding@resend.dev');

    vi.doUnmock('resend');
    delete process.env.RESEND_MAGIC_PREFER_CUSTOM;
  });
});
