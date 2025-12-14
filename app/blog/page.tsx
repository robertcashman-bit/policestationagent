import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedBlogPosts, formatBlogDate } from '@/lib/blog';
import { SITE_URL } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Police Station Agent",
  description: "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Police Station Agent",
    description: "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
    url: `${SITE_URL}/blog`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function BlogPage() {
  // Get ALL published blog posts - no pagination limit
  // All posts should be visible on the blog index page
  const posts = getPublishedBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Legal Insights & <span className="text-amber-500">Advice</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Expert guidance on police station procedures, your rights in custody, and criminal defence strategies.
              </p>
            </div>

            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block overflow-hidden h-48 relative"
                      >
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-slate-400 font-medium">No Image</span>
                          </div>
                        )}
                      </Link>
                      <div className="flex flex-col flex-grow p-5">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <div className="text-sm text-slate-500 mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
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
                              className="w-3 h-3"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>Robert Cashman</span>
                          </div>
                          {post.published_at && (
                            <span className="text-xs text-slate-400">
                              {formatBlogDate(post.published_at) || 'Published'}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">No blog posts available yet.</p>
                <p className="text-slate-500 text-sm mt-2">Check back soon for updates.</p>
              </div>
            )}

            {/* Search Section */}
            <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden mt-12 rounded-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.2),transparent_70%)]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                  Legal Insights & <span className="text-amber-400">Advice</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Expert guidance on police station procedures, your rights in custody, and criminal defence strategies.
                </p>
                <form className="max-w-xl mx-auto flex gap-2">
                  <div className="relative flex-grow">
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
                      className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input
                      type="search"
                      className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-white/10 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 transition-colors"
                      placeholder="Search articles..."
                    />
                  </div>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
