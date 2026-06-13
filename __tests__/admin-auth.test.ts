import { describe, expect, it, vi, beforeEach } from 'vitest';

describe('admin-auth', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.ADMIN_EMAILS;
    delete process.env.OWNER_EMAIL;
  });

  it('allows the default admin email', async () => {
    const { isAdminEmail, getDefaultAdminEmail } = await import('@/lib/admin-auth');
    expect(getDefaultAdminEmail()).toBe('robertdavidcashman@gmail.com');
    expect(isAdminEmail('robertdavidcashman@gmail.com')).toBe(true);
    expect(isAdminEmail('ROBERTDAVIDCASHMAN@GMAIL.COM')).toBe(true);
  });

  it('rejects unknown emails', async () => {
    const { isAdminEmail } = await import('@/lib/admin-auth');
    expect(isAdminEmail('other@example.com')).toBe(false);
    expect(isAdminEmail(null)).toBe(false);
  });

  it('honours ADMIN_EMAILS env additions', async () => {
    process.env.ADMIN_EMAILS = 'ops@example.com';
    const { isAdminEmail } = await import('@/lib/admin-auth');
    expect(isAdminEmail('ops@example.com')).toBe(true);
    expect(isAdminEmail('robertdavidcashman@gmail.com')).toBe(true);
  });
});

describe('legacy admin login route', () => {
  it('returns 410 for username/password login', async () => {
    const { POST } = await import('@/app/api/admin/login/route');
    const res = await POST();
    expect(res.status).toBe(410);
    const body = await res.json();
    expect(body.error).toMatch(/disabled/i);
  });
});
