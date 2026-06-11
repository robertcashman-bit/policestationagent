import Link from 'next/link';
import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/admin-auth';
import { getKV } from '@/lib/kv';
import { AdminMagicLoginForm } from '@/components/admin/AdminMagicLoginForm';

export async function AdminGate({
  children,
}: {
  children: (auth: { email: string }) => ReactNode;
}) {
  if (process.env.NODE_ENV === 'production' && !getKV()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration required</h1>
          <p className="text-gray-700 mb-2">
            Admin login needs Upstash Redis. Add it from the Vercel dashboard (Storage → Upstash).
          </p>
          <p className="text-sm text-gray-500">
            Set <code className="text-xs">UPSTASH_REDIS_REST_URL</code> and{' '}
            <code className="text-xs">UPSTASH_REDIS_REST_TOKEN</code>, plus{' '}
            <code className="text-xs">RESEND_API_KEY</code> for login codes.
          </p>
        </div>
      </div>
    );
  }

  const auth = await requireAdmin();

  if (!auth.ok && auth.status === 401) {
    return <AdminMagicLoginForm />;
  }

  if (!auth.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-3 text-sm text-gray-600">{auth.error}</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return <>{children({ email: auth.email })}</>;
}
