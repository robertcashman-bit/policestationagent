/**
 * Owner / staff override list. Anyone whose email is in ADMIN_EMAILS
 * is treated as having indefinite paid access — even if no row exists
 * in customer_access. Lets the owner test gated routes without paying
 * themselves through Lemon Squeezy.
 *
 * Comma-separated. Whitespace and case are ignored.
 */
export function getAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.includes('@')),
  );
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().has(email.trim().toLowerCase());
}
