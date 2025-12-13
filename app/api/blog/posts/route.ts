import { NextResponse } from 'next/server';
import db from '@/lib/db';

/**
 * Public API endpoint to fetch published blog posts
 * Used by Header component to display blog links in dropdown
 */
export async function GET() {
  try {
    const posts = db.prepare(`
      SELECT id, title, slug, excerpt, published_at, created_at 
      FROM blog_posts 
      WHERE published = 1 
      ORDER BY published_at DESC, created_at DESC
      LIMIT 10
    `).all() as Array<{
      id: number;
      title: string;
      slug: string;
      excerpt: string | null;
      published_at: string | null;
      created_at: string;
    }>;

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
