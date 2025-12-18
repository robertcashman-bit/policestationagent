import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth';
import * as fs from 'fs';
import * as path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'robertdavidcashman-droid/one';
const JSON_FILE_PATH = 'data/blog-posts-full.json';

interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author_id: number | null;
  published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  faq_content: string | null;
  location: string;
  image?: string | null;
  schema_json?: string | null;
}

/**
 * Save post to JSON file via GitHub API (for Vercel) or locally (for dev)
 */
async function savePostToJsonFile(post: BlogPostData): Promise<{ success: boolean; error?: string }> {
  try {
    // Try local filesystem first (works in development)
    const localJsonPath = path.join(process.cwd(), 'data', 'blog-posts-full.json');
    
    if (fs.existsSync(localJsonPath)) {
      try {
        const existingData = fs.readFileSync(localJsonPath, 'utf-8');
        const posts: BlogPostData[] = JSON.parse(existingData);
        
        // Check if post already exists (by slug)
        const existingIndex = posts.findIndex(p => p.slug === post.slug);
        if (existingIndex >= 0) {
          posts[existingIndex] = post; // Update existing
        } else {
          posts.unshift(post); // Add new at start
        }
        
        // Try to write locally
        try {
          fs.writeFileSync(localJsonPath, JSON.stringify(posts, null, 2), 'utf-8');
          console.log('[posts/route] Saved post to local JSON file');
          return { success: true };
        } catch (writeError) {
          // Local write failed (likely Vercel read-only filesystem)
          console.log('[posts/route] Local write failed, trying GitHub API');
        }
      } catch (parseError) {
        console.error('[posts/route] Failed to parse JSON file:', parseError);
      }
    }

    // Try GitHub API (for Vercel production)
    if (GITHUB_TOKEN) {
      return await savePostViaGitHub(post);
    }

    return { 
      success: false, 
      error: 'Cannot persist post: No write access to JSON file and no GITHUB_TOKEN configured' 
    };
  } catch (error) {
    console.error('[posts/route] Error saving to JSON:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Commit post to GitHub repository
 */
async function savePostViaGitHub(post: BlogPostData): Promise<{ success: boolean; error?: string }> {
  try {
    const [owner, repo] = GITHUB_REPO.split('/');
    
    // 1. Get current file content and SHA
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${JSON_FILE_PATH}`;
    const getResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!getResponse.ok) {
      const error = await getResponse.json();
      console.error('[posts/route] GitHub GET error:', error);
      return { success: false, error: `GitHub API error: ${error.message}` };
    }

    const fileData = await getResponse.json();
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const posts: BlogPostData[] = JSON.parse(currentContent);

    // 2. Add or update post
    const existingIndex = posts.findIndex(p => p.slug === post.slug);
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
    } else {
      posts.unshift(post);
    }

    // 3. Commit updated file
    const newContent = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64');
    const updateResponse = await fetch(getFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add blog post: ${post.title}`,
        content: newContent,
        sha: fileData.sha,
        branch: 'master',
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      console.error('[posts/route] GitHub PUT error:', error);
      return { success: false, error: `GitHub commit failed: ${error.message}` };
    }

    console.log('[posts/route] Successfully committed post to GitHub');
    return { success: true };
  } catch (error) {
    console.error('[posts/route] GitHub API error:', error);
    return { success: false, error: String(error) };
  }
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = db.prepare(`
    SELECT id, title, slug, excerpt, published, published_at, created_at, updated_at
    FROM blog_posts
    ORDER BY created_at DESC
  `).all();

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, content, excerpt, published, meta_title, meta_description, image, schema } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, published, published_at, author_id, meta_title, meta_description, image, schema_json, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const publishedAt = published ? new Date().toISOString() : null;
    const schemaJson = schema ? JSON.stringify(schema) : null;
    
    const result = stmt.run(
      title,
      slug,
      content,
      excerpt || null,
      published ? 1 : 0,
      publishedAt,
      1, // Default author_id since session doesn't have userId
      meta_title || null,
      meta_description || null,
      image || null,
      schemaJson
    );

    const postId = Number(result.lastInsertRowid);

    // Also save to JSON file for persistence on Vercel
    let jsonSaveResult: { success: boolean; error?: string } = { success: false, error: 'Not attempted' };
    if (published) {
      const postData: BlogPostData = {
        id: postId,
        title,
        slug,
        content,
        excerpt: excerpt || null,
        author_id: 1,
        published: 1,
        published_at: publishedAt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        faq_content: null,
        location: 'Kent',
        image: image || null,
        schema_json: schemaJson,
      };
      jsonSaveResult = await savePostToJsonFile(postData);
      console.log('[posts/route] JSON save result:', jsonSaveResult);
    }

    return NextResponse.json({
      success: true,
      id: postId,
      slug,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com'}/blog/${slug}`,
      jsonPersisted: jsonSaveResult.success,
      jsonError: jsonSaveResult.error,
      note: jsonSaveResult.success 
        ? 'Post saved and will be live after Vercel redeploys (1-2 minutes)' 
        : 'Post saved to database but may not persist. Set GITHUB_TOKEN for permanent storage.',
    });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

