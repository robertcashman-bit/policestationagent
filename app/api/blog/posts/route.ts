import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
 * Uses static JSON file for Vercel serverless compatibility
 */
export async function GET() {
  try {
    // Use static JSON file - more reliable on Vercel than SQLite
    const jsonPath = path.join(process.cwd(), 'data', 'blog-posts-static.json');
    
    if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath, 'utf-8');
      const allPosts: BlogPost[] = JSON.parse(data);
      const posts = allPosts.slice(0, 10);
      return NextResponse.json({ posts });
    }
    
    // Fallback: try SQLite database
    try {
      const db = (await import('@/lib/db')).default;
      const posts = db.prepare(`
        SELECT id, title, slug, excerpt, published_at, created_at 
        FROM blog_posts 
        WHERE published = 1 
        ORDER BY published_at DESC, created_at DESC
        LIMIT 10
      `).all() as BlogPost[];
      
      return NextResponse.json({ posts });
    } catch (dbError) {
      console.error('Database fallback failed:', dbError);
    }
    
    return NextResponse.json({ posts: [] });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
