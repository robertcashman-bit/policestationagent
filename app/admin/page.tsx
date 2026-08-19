import { AdminGate } from '@/components/admin/AdminGate';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { AdminShell } from '@/components/admin/AdminShell';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin overview — firm outreach, content, and blog tools.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell
          active="overview"
          adminEmail={email}
          title="Overview"
          description="System health, outreach snapshot, and quick links to all admin tools."
        >
          <AdminOverview />
        </AdminShell>
      )}
    </AdminGate>
  );
}
