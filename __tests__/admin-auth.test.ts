import { describe, expect, it, vi, beforeEach } from 'vitest';

describe('admin-auth', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.ADMIN_EMAILS;
    delete process.env.OWNER_EMAIL;
  });

  it('allows emails from ADMIN_EMAILS env', async () => {
    process.env.ADMIN_EMAILS = 'admin@example.com,ops@example.com';
    const { isAdminEmail, getDefaultAdminEmail } = await import('@/lib/admin-auth');
    expect(getDefaultAdminEmail()).toBe('admin@example.com');
    expect(isAdminEmail('admin@example.com')).toBe(true);
    expect(isAdminEmail('OPS@EXAMPLE.COM')).toBe(true);
  });

  it('rejects unknown emails', async () => {
    process.env.ADMIN_EMAILS = 'admin@example.com';
    const { isAdminEmail } = await import('@/lib/admin-auth');
    expect(isAdminEmail('other@example.com')).toBe(false);
    expect(isAdminEmail(null)).toBe(false);
  });

  it('honours OWNER_EMAIL when ADMIN_EMAILS is unset', async () => {
    process.env.OWNER_EMAIL = 'owner@example.com';
    const { isAdminEmail } = await import('@/lib/admin-auth');
    expect(isAdminEmail('owner@example.com')).toBe(true);
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
