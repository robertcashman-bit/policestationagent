import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';
import BlogGeneratorClient from '@/components/BlogGeneratorClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog Generator | Admin',
  robots: { index: false, follow: false },
};

export default function BlogGeneratorPage() {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell
          active="blog-generator"
          adminEmail={email}
          title="Blog generator"
          description="Create SEO-optimised blog posts for Police Station Agent."
        >
          <BlogGeneratorClient embedded />
        </AdminShell>
      )}
    </AdminGate>
  );
}
