import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';
import AdminDashboard from '@/components/AdminDashboard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Content | Admin',
  description: 'Manage blog posts, police stations, and site content.',
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell
          active="content"
          adminEmail={email}
          title="Content"
          description="Blog posts, police stations, services, imports, and SEO tools."
        >
          <AdminDashboard embedded />
        </AdminShell>
      )}
    </AdminGate>
  );
}
