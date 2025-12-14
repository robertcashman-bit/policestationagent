/**
 * BLOG POST PAGE
 * 
 * This page uses the authoritative blog query from lib/blog.ts
 * 
 * Key features:
 * - Server-side rendering (no caching)
 * - Database-driven (no static JSON)
 * - Case-insensitive slug matching
 * - Normalized slugs (derived if missing)
 * - Dynamic on every request
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import BlogPromotionalBlock from '@/components/BlogPromotionalBlock';
import { SITE_URL, SITE_DOMAIN } from '@/config/site';
import { getPostBySlug, formatBlogDate } from '@/lib/blog';

// Force dynamic rendering - no caching until correctness is proven
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Disable static params generation - fully dynamic
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Police Station Agent',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const description = post.meta_description || post.excerpt || post.title;
  
  return {
    title: post.meta_title || `${post.title} | Police Station Agent`,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'Police Station Agent',
      type: 'article',
      publishedTime: post.published_at || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    console.log(`[/blog/${resolvedParams.slug}] Post not found, returning 404`);
    notFound();
  }

  console.log(`[/blog/${resolvedParams.slug}] Rendering post ID ${post.id}: "${post.title}"`);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: 'Robert Cashman',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Police Station Agent',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <JsonLd data={blogPostingSchema} />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16" aria-labelledby="article-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-5 h-5">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Blog
              </Link>
              <h1 id="article-title" className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
              {post.published_at && (
                <div className="flex items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-4 h-4">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="text-sm">Robert Cashman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span className="text-sm">
                      {formatBlogDate(post.published_at)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
                className="prose prose-lg max-w-none"
              />
              {/* Promotional Block - Mandatory on all blog posts */}
              <BlogPromotionalBlock />
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
