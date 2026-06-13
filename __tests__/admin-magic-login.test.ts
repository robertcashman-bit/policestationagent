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
    expect(body.error).toMatch(/could not send/i);
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
  });

  it('returns error when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('admin@example.com', '123456');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/RESEND_API_KEY/i);
  });

  it('retries with onboarding sender when custom from fails domain verification', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'Police Station Agent <noreply@policestationagent.com>';

    const send = vi
      .fn()
      .mockResolvedValueOnce({
        data: null,
        error: { message: 'The policestationagent.com domain is not verified' },
      })
      .mockResolvedValueOnce({ data: { id: 'msg_123' }, error: null });

    vi.doMock('resend', () => ({
      Resend: class MockResend {
        emails = { send };
        constructor(_key: string) {}
      },
    }));

    const { sendMagicCode } = await import('@/lib/email');
    const result = await sendMagicCode('robertdavidcashman@gmail.com', '654321');

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][0].from).toContain('onboarding@resend.dev');

    vi.doUnmock('resend');
  });
});
