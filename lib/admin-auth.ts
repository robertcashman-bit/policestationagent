import { redirect } from 'next/navigation';
import { getSessionEmail } from '@/lib/admin-session';
import { getKV } from '@/lib/kv';

function parseAdminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS || process.env.OWNER_EMAIL || '')
      .split(/[,;]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

function getAdminEmails(): Set<string> {
  const emails = parseAdminEmails();
  if (process.env.NODE_ENV === 'production' && emails.size === 0) {
    console.error('[admin-auth] ADMIN_EMAILS or OWNER_EMAIL must be set in production');
  }
  return emails;
}

export interface AdminSession {
  role: 'admin';
  email: string;
}

export type AdminCheckResult =
  | { ok: true; email: string }
  | { ok: false; status: 401 | 403; error: string };

/** Whether KV is available for admin sessions (required in production). */
export function isAdminAuthConfigured(): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  return Boolean(getKV());
}

/** @deprecated Use isAdminAuthConfigured */
export function isJWTSecretConfigured(): boolean {
  return isAdminAuthConfigured();
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().has(email.toLowerCase());
}

export function getDefaultAdminEmail(): string {
  const first = [...getAdminEmails()][0];
  return first ?? '';
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const email = await getSessionEmail();
  if (!email || !isAdminEmail(email)) return null;
  return { role: 'admin', email };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}

export async function requireAdmin(): Promise<AdminCheckResult> {
  const email = await getSessionEmail();
  if (!email) return { ok: false, status: 401, error: 'Not authenticated' };

  if (process.env.NODE_ENV === 'production' && !getKV()) {
    return { ok: false, status: 403, error: 'Admin login not configured (Upstash Redis required)' };
  }

  if (!isAdminEmail(email)) {
    return { ok: false, status: 403, error: 'Not authorised' };
  }
  return { ok: true, email };
}

export async function requireAdminAuth(): Promise<AdminSession> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    redirect('/admin');
  }
  return { role: 'admin', email: auth.email };
}

export type AdminApiCheckResult =
  | { ok: true; session: AdminSession }
  | { ok: false; status: 401 | 403; error: string };

export async function requireAdminApi(): Promise<AdminApiCheckResult> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return { ok: false, status: auth.status, error: auth.error };
  }
  return { ok: true, session: { role: 'admin', email: auth.email } };
}
