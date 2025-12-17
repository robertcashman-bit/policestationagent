import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import BlogGeneratorClient from '@/components/BlogGeneratorClient';

export const metadata = {
  title: 'Blog Generator | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogGeneratorPage() {
  // Check simple password-based session
  const session = await getAdminSession();

  if (!session) {
    // Redirect to simple login page
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogGeneratorClient />
    </div>
  );
}
