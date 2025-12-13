import { NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

/**
 * Public API endpoint to fetch published blog posts
 * Used by Header component to display blog links in dropdown
 */
export async function GET() {
  const debug: string[] = [];
  
  try {
    // Debug info
    const sourceDbPath = path.join(process.cwd(), 'data', 'web44ai.db');
    const tmpDbPath = '/tmp/web44ai.db';
    
    debug.push(`cwd: ${process.cwd()}`);
    debug.push(`VERCEL: ${process.env.VERCEL || 'not set'}`);
    debug.push(`source exists: ${fs.existsSync(sourceDbPath)}`);
    debug.push(`tmp exists: ${fs.existsSync(tmpDbPath)}`);
    
    if (fs.existsSync(sourceDbPath)) {
      debug.push(`source size: ${fs.statSync(sourceDbPath).size}`);
    }
    if (fs.existsSync(tmpDbPath)) {
      debug.push(`tmp size: ${fs.statSync(tmpDbPath).size}`);
    }
    
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

    debug.push(`posts found: ${posts.length}`);
    
    return NextResponse.json({ posts, debug });
  } catch (error) {
    debug.push(`error: ${error instanceof Error ? error.message : String(error)}`);
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [], debug, error: String(error) }, { status: 200 });
  }
}
