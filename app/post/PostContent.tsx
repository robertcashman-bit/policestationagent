'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PostContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug');

  useEffect(() => {
    // If we have a slug, redirect to the canonical blog URL
    if (slug) {
      router.replace(`/blog/${slug}`);
    }
  }, [slug, router]);

  // If slug exists, show a loading state while redirecting
  if (slug) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-slate-600 mt-4">Redirecting to blog post...</p>
      </div>
    );
  }

  // No slug provided - show helpful message with link to blog
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-slate-900">Looking for a Blog Post?</h1>
      <p className="text-lg text-slate-600 mb-8">
        Please visit our blog to browse all available articles.
      </p>
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        View All Blog Posts
      </Link>
    </div>
  );
}
