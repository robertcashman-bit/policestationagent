/**
 * BLOG POSTS API ENDPOINT
 * 
 * This API uses the authoritative blog query from lib/blog.ts
 * 
 * Used by:
 * - Header component (Blog dropdown menu)
 * - Any other client-side components that need blog data
 * 
 * Key features:
 * - Database-driven (no static JSON)
 * - Normalized slugs
 * - Runtime-driven (no rebuild required)
 */

import { NextResponse } from 'next/server';
import { getPublishedBlogPosts, healthCheck } from '@/lib/blog';

// Force dynamic - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/blog/posts
 * 
 * Returns ALL published blog posts for use in menus and listings.
 * No artificial limits - the frontend handles display/scrolling.
 */
export async function GET() {
  try {
    // Use the SINGLE AUTHORITATIVE query function
    const posts = getPublishedBlogPosts();
    
    console.log(`[API /api/blog/posts] Returning all ${posts.length} posts`);
    
    return NextResponse.json({ 
      posts,
      total: posts.length,
      source: 'database' // Indicates this is from DB, not static JSON
    });
  } catch (error) {
    console.error('[API /api/blog/posts] Error:', error);
    
    // Return empty array with error info, but don't fail completely
    return NextResponse.json({ 
      posts: [], 
      total: 0,
      source: 'error',
      error: String(error) 
    }, { status: 200 }); // 200 so the menu doesn't break
  }
}

/**
 * HEAD /api/blog/posts
 * 
 * Health check endpoint to verify the blog system is operational.
 */
export async function HEAD() {
  const health = healthCheck();
  
  if (health.ok) {
    return new NextResponse(null, { 
      status: 200,
      headers: {
        'X-Blog-Post-Count': String(health.postCount),
        'X-Blog-Status': 'ok'
      }
    });
  } else {
    return new NextResponse(null, { 
      status: 503,
      headers: {
        'X-Blog-Status': 'error',
        'X-Blog-Error': health.error || 'Unknown error'
      }
    });
  }
}



