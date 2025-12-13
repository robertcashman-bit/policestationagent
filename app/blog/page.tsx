import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: "Blog | Police Station Agent",
  description: "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/blog`,
  },
  openGraph: {
    title: "Blog | Police Station Agent",
    description: "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
    url: `https://${SITE_DOMAIN}/blog`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  created_at: string;
};

function getBlogPosts(): BlogPost[] {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'blog-posts.json');
    const data = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(data) as BlogPost[];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export default function Page() {
  const posts = getBlogPosts();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Police Station Agent Blog
              </h1>
              <p className="text-xl text-slate-600">
                Expert insights on police station representation, criminal defence, and your legal rights
              </p>
            </div>

            {/* Essential Guide Banner */}
            <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-slate-700 leading-relaxed mb-2">
                <strong>Essential Guide:</strong> Before reading our blog articles, make sure you understand your fundamental rights. Read our authoritative guide:{' '}
                <Link href="/police-station-interviews-kent-rights" className="text-blue-700 hover:underline font-semibold">
                  Police Station Interviews in Kent: Your Rights and What to Expect
                </Link>
                {' '}- covering PACE 1984, the interview process, and the role of a solicitor.
              </p>
            </div>

            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block overflow-hidden h-48 relative bg-gradient-to-br from-slate-100 to-slate-200"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-400"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                    </Link>
                    <div className="flex flex-col flex-grow p-5">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      {post.excerpt && (
                        <div className="text-sm text-slate-500 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt.replace(/<[^>]+>/g, '')}
                        </div>
                      )}
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user w-3 h-3"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span>Robert Cashman</span>
                        </div>
                        {post.published_at && (
                          <span className="text-xs text-slate-400">
                            {formatDate(post.published_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No blog posts available yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
