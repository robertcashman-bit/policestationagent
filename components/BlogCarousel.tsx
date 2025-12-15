'use client';

/**
 * BLOG CAROUSEL COMPONENT
 * 
 * Dynamic, auto-rotating carousel that displays recent blog posts.
 * Uses the authoritative blog API endpoint.
 * 
 * Key features:
 * - Fetches from /api/blog/posts (same data source as menu)
 * - Auto-rotates every 5 seconds
 * - Manual navigation controls
 * - Fully responsive
 * - Non-blocking (graceful error handling)
 * - Isolated styling (no global CSS impact)
 * - Uses Next.js Image component with fixed aspect ratio
 * - Keyboard accessible
 * - Touch/swipe enabled on mobile
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  created_at: string;
  image: string | null;
}

interface BlogCarouselProps {
  maxPosts?: number;
  autoRotateInterval?: number;
  showNavigation?: boolean;
  className?: string;
}

export default function BlogCarousel({
  maxPosts = 6,
  autoRotateInterval = 5000,
  showNavigation = true,
  className = '',
}: BlogCarouselProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Fetch blog posts from the authoritative API - lazy load after initial render
  useEffect(() => {
    // Delay fetch slightly to avoid blocking initial page render
    const timeoutId = setTimeout(() => {
      async function fetchPosts() {
        try {
          const res = await fetch('/api/blog/posts', {
            // Add cache headers for better performance
            next: { revalidate: 300 }, // Revalidate every 5 minutes
          });
          const data = await res.json();
          
          if (data.posts && Array.isArray(data.posts)) {
            setPosts(data.posts.slice(0, maxPosts));
          } else {
            setPosts([]);
          }
        } catch (err) {
          console.error('[BlogCarousel] Error fetching posts:', err);
          setError('Unable to load blog posts');
          setPosts([]);
        } finally {
          setIsLoading(false);
        }
      }

      fetchPosts();
    }, 100); // Small delay to prioritize critical content

    return () => clearTimeout(timeoutId);
  }, [maxPosts]);

  // Auto-rotate carousel
  useEffect(() => {
    if (posts.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [posts.length, autoRotateInterval, isPaused]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch/swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNext, goToPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselRef.current && document.activeElement?.closest('[role="region"]') === carouselRef.current) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const formatDate = (dateString: string | null): string | null => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-white py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 mb-4">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Blog Posts
            </h2>
            <div className="animate-pulse flex justify-center">
              <div className="h-64 w-full max-w-2xl bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error or no posts state - render nothing (non-blocking)
  if (error || posts.length === 0) {
    return null;
  }

  const currentPost = posts[currentIndex];

  return (
    <section 
      ref={carouselRef}
      className={`py-16 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Blog posts carousel"
      role="region"
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              From Our Blog
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            View all articles
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
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image/Placeholder - Fixed 16:9 aspect ratio */}
              <div className="relative aspect-[16/9] md:aspect-[4/3] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center overflow-hidden">
                {currentPost.image ? (
                  <Image
                    src={currentPost.image}
                    alt={currentPost.title || 'Blog post image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentIndex === 0}
                    loading={currentIndex === 0 ? undefined : 'lazy'}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50"
                      aria-hidden="true"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {currentPost.published_at && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <time>{formatDate(currentPost.published_at)}</time>
                  </div>
                )}

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 line-clamp-2">
                  {currentPost.title}
                </h3>

                {currentPost.excerpt && (
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {currentPost.excerpt.replace(/<[^>]+>/g, '')}
                  </p>
                )}

                <Link
                  href={`/blog/${currentPost.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-fit"
                >
                  Read Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {showNavigation && posts.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Previous post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Next post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {posts.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            View all articles
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
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}







