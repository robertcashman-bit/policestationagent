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
 */
export async function GET() {
  try {
    // Read from public folder
    const jsonPath = path.join(process.cwd(), 'public', 'blog-posts.json');
    const data = fs.readFileSync(jsonPath, 'utf-8');
    const allPosts: BlogPost[] = JSON.parse(data);
    const posts = allPosts.slice(0, 10);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ posts: [], error: String(error) }, { status: 200 });
  }
}

