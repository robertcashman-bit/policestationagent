import { redirect } from 'next/navigation';
import { getAuthStatus } from '@/lib/auth';
import { isAdminEmail } from '@/lib/auth/admin-emails';
import { AuthUnavailable } from '@/components/system/AuthUnavailable';
import { AdminNav } from '@/components/admin/AdminNav';
import { SessionTracker } from '@/components/auth/SessionTracker';

/**
 * Server-side guard for /admin/*. Three layers of defence:
 *   1. proxy.ts middleware blocks unauthenticated requests at the edge.
 *   2. This layout double-checks the email is in ADMIN_EMAILS, in case
 *      middleware is bypassed (e.g. a future config change).
 *   3. If the auth provider is unreachable we show a maintenance screen
 *      rather than redirect-looping the user through /auth.
 */
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthStatus();
  if (auth.status === 'unavailable') {
    return <AuthUnavailable reason={auth.reason} />;
  }
  if (auth.status === 'unauthenticated') redirect('/auth?next=/admin');
  if (!isAdminEmail(auth.user.email)) redirect('/dashboard?error=admin_required');
  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <SessionTracker />
      <div className="p-5 lg:p-8 max-w-6xl mx-auto">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
