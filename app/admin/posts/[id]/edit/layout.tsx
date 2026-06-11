import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Post | Admin | Police Station Agent',
  description: 'Edit a blog post',
  robots: { index: false, follow: false },
};

export default function EditPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell active="content" adminEmail={email} title="Edit post" description="Update a blog post.">
          {children}
        </AdminShell>
      )}
    </AdminGate>
  );
}
