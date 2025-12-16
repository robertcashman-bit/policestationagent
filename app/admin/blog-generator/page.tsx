import { redirect } from 'next/navigation';
import { auth, AUTHORIZED_EMAIL } from '@/auth';
import BlogGeneratorClient from '@/components/BlogGeneratorClient';

export const metadata = {
  title: 'Blog Generator | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogGeneratorPage() {
  // Check Google OAuth session using next-auth v5 auth()
  const session = await auth();

  if (!session || !session.user) {
    // Redirect to Google OAuth sign-in
    redirect('/api/auth/signin?callbackUrl=/admin/blog-generator');
  }

  // Verify authorized email
  if (session.user.email?.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
    // Unauthorized user - redirect to homepage
    redirect('/?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogGeneratorClient />
    </div>
  );
}
