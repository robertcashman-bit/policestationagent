import { NextResponse } from 'next/server';
import blogPostsData from '@/data/blog-posts-static.json';

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  created_at: string;
};

/**
 * Public API endpoint to fetch published blog posts
 * Uses statically imported JSON data for Vercel compatibility
 */
export async function GET() {
  try {
    const allPosts = blogPostsData as BlogPost[];
    const posts = allPosts.slice(0, 10);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
