import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { isAdminEmail } from '@/lib/auth/admin-emails';
import { hasTrainingAccess } from '@/lib/free-access-promo';

function subscriptionGrantsAccess(row: {
  is_paid?: boolean | null;
  access_status?: string | null;
} | null): boolean {
  return Boolean(
    row?.is_paid &&
      (row.access_status === 'active' || row.access_status === 'grace'),
  );
}

export type AccessSnapshot = {
  isAuthenticated: boolean;
  hasPaidAccess: boolean;
  email: string | null;
  userId: string | null;
  /** True when access is granted via ADMIN_EMAILS, not a paid subscription. */
  isAdmin: boolean;
};

/**
 * Single source of truth for "can this user use the paid app?".
 * Reads the SSR Supabase session and looks up customer_access by
 * user_id (or email fallback for legacy rows).
 */
export async function getAccessSnapshot(): Promise<AccessSnapshot> {
  if (!isSupabaseConfigured()) {
    return { isAuthenticated: false, hasPaidAccess: false, email: null, userId: null, isAdmin: false };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { isAuthenticated: false, hasPaidAccess: false, email: null, userId: null, isAdmin: false };
  }

  const email = user.email ?? null;
  const userId = user.id;
  const admin = isAdminEmail(email);

  // Owner / staff override — bypass paywall + DB check entirely.
  if (admin) {
    return { isAuthenticated: true, hasPaidAccess: true, email, userId, isAdmin: true };
  }

  const { data, error } = await supabase
    .from('customer_access')
    .select('is_paid, access_status, user_id, email')
    .or(
      [
        `user_id.eq.${userId}`,
        email ? `email.eq.${email.toLowerCase()}` : null,
      ]
        .filter(Boolean)
        .join(','),
    )
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    // If the table doesn't exist yet (pre-migration) treat as unpaid
    // rather than throwing — keeps the site usable.
    return { isAuthenticated: true, hasPaidAccess: false, email, userId, isAdmin: false };
  }

  const hasPaidAccess = hasTrainingAccess({
    subscriptionActive: subscriptionGrantsAccess(data),
    isAdmin: false,
  });
  return { isAuthenticated: true, hasPaidAccess, email, userId, isAdmin: false };
}
