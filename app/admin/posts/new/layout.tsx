import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Post | Admin | Police Station Agent',
  description: 'Create a new blog post',
  robots: { index: false, follow: false },
};

export default function NewPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell active="content" adminEmail={email} title="New post" description="Create a blog post.">
          {children}
        </AdminShell>
      )}
    </AdminGate>
  );
}
