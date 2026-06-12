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
  const auth = await requireAdmin();

  if (!auth.ok && auth.status === 401) {
    return <AdminMagicLoginForm kvConfigured={Boolean(getKV())} />;
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
