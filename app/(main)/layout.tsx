import { redirect } from 'next/navigation';
import { getAuthStatus } from '@/lib/auth';
import AppSidebar from '@/components/layout/AppSidebar';
import { InactivityTimeout } from '@/components/auth/InactivityTimeout';
import { SessionTracker } from '@/components/auth/SessionTracker';
import { AuthUnavailable } from '@/components/system/AuthUnavailable';

/** Session is read from cookies — never statically prerender protected shell. */
export const dynamic = 'force-dynamic';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthStatus();

  if (auth.status === 'unavailable') {
    // Don't redirect to /auth — that page can't sign anyone in either
    // when the provider is down. Show a clear maintenance screen.
    return <AuthUnavailable reason={auth.reason} />;
  }
  if (auth.status === 'unauthenticated') redirect('/auth');

  return (
    <div className="min-h-screen flex app-shell-bg">
      <SessionTracker />
      <InactivityTimeout />
      <AppSidebar />
      <main id="main-content" className="flex-1 min-h-screen pl-0 pt-16 lg:pt-0 lg:pl-64">
        <div className="p-5 lg:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
