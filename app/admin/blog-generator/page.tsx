import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BlogGeneratorClient from '@/components/BlogGeneratorClient';

export const metadata = {
  title: 'Blog Generator | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogGeneratorPage() {
  // Check Google OAuth session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Redirect to Google OAuth sign-in
    redirect('/api/auth/signin?callbackUrl=/admin/blog-generator');
  }

  // Verify authorized email
  const authorizedEmail = process.env.AUTHORIZED_GOOGLE_EMAIL || 'robertcashman@defencelegalservices.co.uk';
  if (session.user.email?.toLowerCase() !== authorizedEmail.toLowerCase()) {
    // Unauthorized user - redirect to homepage
    redirect('/?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogGeneratorClient />
    </div>
  );
}

