import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth';
import { normalizeSlug } from '@/lib/blog';
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
async function savePostToJsonFile(post: BlogPostData): Promise<{ success: boolean; error?: string; method?: string }> {
  const debugInfo: string[] = [];
  
  try {
    // Try local filesystem first (works in development)
    const localJsonPath = path.join(process.cwd(), 'data', 'blog-posts-full.json');
    debugInfo.push(`Local path: ${localJsonPath}`);
    debugInfo.push(`File exists: ${fs.existsSync(localJsonPath)}`);
    debugInfo.push(`GITHUB_TOKEN set: ${!!GITHUB_TOKEN}`);
    debugInfo.push(`GITHUB_REPO: ${GITHUB_REPO}`);
    debugInfo.push(`Is Vercel: ${!!process.env.VERCEL}`);
    
    // On Vercel, skip local write attempt and go straight to GitHub
    if (process.env.VERCEL) {
      debugInfo.push('Vercel detected - skipping local write, using GitHub API');
      if (GITHUB_TOKEN) {
        const result = await savePostViaGitHub(post);
        return { ...result, method: 'github', error: result.error ? `${result.error} | Debug: ${debugInfo.join(', ')}` : undefined };
      } else {
        return { 
          success: false, 
          error: `GITHUB_TOKEN not configured on Vercel | Debug: ${debugInfo.join(', ')}`,
          method: 'none'
        };
      }
    }
    
    // Local development - try filesystem
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
          return { success: true, method: 'local' };
        } catch (writeError: any) {
          debugInfo.push(`Local write error: ${writeError.message}`);
          console.log('[posts/route] Local write failed, trying GitHub API');
        }
      } catch (parseError: any) {
        debugInfo.push(`Parse error: ${parseError.message}`);
        console.error('[posts/route] Failed to parse JSON file:', parseError);
      }
    }

    // Try GitHub API as fallback
    if (GITHUB_TOKEN) {
      debugInfo.push('Trying GitHub API fallback');
      const result = await savePostViaGitHub(post);
      return { ...result, method: 'github', error: result.error ? `${result.error} | Debug: ${debugInfo.join(', ')}` : undefined };
    }

    return { 
      success: false, 
      error: `Cannot persist: No local write access and no GITHUB_TOKEN | Debug: ${debugInfo.join(', ')}`,
      method: 'none'
    };
  } catch (error: any) {
    console.error('[posts/route] Error saving to JSON:', error);
    return { success: false, error: `${error.message} | Debug: ${debugInfo.join(', ')}`, method: 'error' };
  }
}

/**
 * Save post to GitHub using Contents API (preferred) or Git Data API (for large files)
 * 
 * REQUIRED:
 * - GITHUB_TOKEN must be set (fails loudly if missing)
 * - GITHUB_REPO must be set (fails loudly if missing)
 * - All operations target master branch explicitly
 * - File path: data/blog-posts-full.json (repo-relative, no leading slash)
 * - Authentication: token <TOKEN> (not Bearer)
 */
async function savePostViaGitHub(post: BlogPostData): Promise<{ success: boolean; error?: string }> {
  // Fail loudly if required env vars are missing
  if (!GITHUB_TOKEN) {
    const error = 'GITHUB_TOKEN environment variable is required but not set';
    console.error('[posts/route] FATAL:', error);
    return { success: false, error };
  }

  if (!GITHUB_REPO) {
    const error = 'GITHUB_REPO environment variable is required but not set';
    console.error('[posts/route] FATAL:', error);
    return { success: false, error };
  }

  const [owner, repo] = GITHUB_REPO.split('/');
  if (!owner || !repo) {
    const error = `Invalid GITHUB_REPO format: "${GITHUB_REPO}" - expected "owner/repo"`;
    console.error('[posts/route] FATAL:', error);
    return { success: false, error };
  }

  const branch = 'master'; // Explicitly use master, never main
  const filePath = JSON_FILE_PATH; // data/blog-posts-full.json (repo-relative)

  // Log before writing
  console.log('[posts/route] GitHub persistence:', {
    repo: GITHUB_REPO,
    branch: 'master',
    path: 'data/blog-posts-full.json',
  });

  // GitHub Contents API requires 'token' not 'Bearer'
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // Step 1: GET file contents with explicit ref=master
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    console.log('[posts/route] GET file:', getFileUrl);
    
    const getResponse = await fetch(getFileUrl, { headers });

    let existingPosts: BlogPostData[] = [];
    let fileSha: string | null = null;

    if (getResponse.status === 404) {
      // File doesn't exist - create with empty array
      console.log('[posts/route] File not found (404), will create new file with []');
      existingPosts = [];
      fileSha = null;
    } else if (!getResponse.ok) {
      const error = await getResponse.json();
      const errorMsg = `Failed to GET file (${getResponse.status}): ${error.message}`;
      console.error('[posts/route]', errorMsg);
      return { success: false, error: errorMsg };
    } else {
      // File exists - parse content
      const fileData = await getResponse.json();
      fileSha = fileData.sha;

      // Handle large files (>1MB) - GitHub doesn't include content inline
      let fileContent: string;
      if (fileData.content) {
        // Small file - content is base64 encoded inline
        fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      } else if (fileData.download_url) {
        // Large file - fetch from download_url
        console.log('[posts/route] Large file detected, fetching from download_url');
        const downloadResponse = await fetch(fileData.download_url);
        if (!downloadResponse.ok) {
          return { success: false, error: `Failed to download large file: ${downloadResponse.status}` };
        }
        fileContent = await downloadResponse.text();
      } else {
        // Fallback: fetch from raw GitHub URL
        console.log('[posts/route] Fetching from raw GitHub URL');
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
        const rawResponse = await fetch(rawUrl);
        if (!rawResponse.ok) {
          return { success: false, error: `Failed to fetch raw file: ${rawResponse.status}` };
        }
        fileContent = await rawResponse.text();
      }

      try {
        existingPosts = JSON.parse(fileContent);
      } catch (parseError: any) {
        const errorMsg = `Failed to parse existing JSON file: ${parseError.message}`;
        console.error('[posts/route]', errorMsg);
        return { success: false, error: errorMsg };
      }
    }

    // Step 2: Update posts array
    const existingIndex = existingPosts.findIndex(p => p.slug === post.slug);
    if (existingIndex >= 0) {
      existingPosts[existingIndex] = post;
      console.log('[posts/route] Updated existing post:', post.slug);
    } else {
      existingPosts.unshift(post);
      console.log('[posts/route] Added new post:', post.slug);
    }

    // Step 3: Prepare updated content
    const updatedContent = JSON.stringify(existingPosts, null, 2);
    const contentBase64 = Buffer.from(updatedContent).toString('base64');
    const contentSizeMB = updatedContent.length / (1024 * 1024);

    console.log(`[posts/route] Content size: ${contentSizeMB.toFixed(2)}MB, Posts: ${existingPosts.length}`);

    // Step 4: PUT file using Contents API
    // For files >1MB, Contents API may fail, but we'll try it first
    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    console.log('[posts/route] PUT file:', putFileUrl);

    const putBody: any = {
      message: `Add blog post: ${post.title}`,
      content: contentBase64,
      branch: branch, // Explicitly set branch to master
    };

    // Only include sha if file exists (for updates)
    if (fileSha) {
      putBody.sha = fileSha;
    }

    const putResponse = await fetch(putFileUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(putBody),
    });

    if (putResponse.ok) {
      console.log('[posts/route] ✅ Successfully committed to GitHub via Contents API');
      return { success: true };
    }

    // If Contents API fails due to size, we could fall back to Git Data API
    // But for now, fail loudly with error details
    const errorData = await putResponse.json();
    const errorMsg = `GitHub PUT failed (${putResponse.status}): ${errorData.message}. File size: ${contentSizeMB.toFixed(2)}MB`;
    console.error('[posts/route]', errorMsg);
    return { success: false, error: errorMsg };

  } catch (error: any) {
    const errorMsg = `GitHub API error: ${error.message || String(error)}`;
    console.error('[posts/route]', errorMsg);
    return { success: false, error: errorMsg };
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
    
    // Get the origin from the request to return correct URL
    const origin = request.headers.get('origin') || request.headers.get('host') || '';
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const baseUrl = isLocalhost 
      ? `http://${origin.includes('://') ? origin.split('://')[1] : origin}`
      : (process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com');

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // CRITICAL FIX: Normalize slug to ensure consistency with read-side
    const normalizedSlug = normalizeSlug(slug || title);

    const stmt = db.prepare(`
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, published, published_at, author_id, meta_title, meta_description, image, schema_json, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const publishedAt = published ? new Date().toISOString() : null;
    const schemaJson = schema ? JSON.stringify(schema) : null;
    
    const result = stmt.run(
      title,
      normalizedSlug, // Use normalized slug
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
    let jsonSaveResult: { success: boolean; error?: string; method?: string } = { success: false, error: 'Not attempted', method: 'none' };
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

    // If GitHub commit failed, provide the post data for manual addition
    let manualJsonData = null;
    if (published && !jsonSaveResult.success) {
      const postData: BlogPostData = {
        id: postId,
        title,
        slug: normalizedSlug, // Use normalized slug
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
      manualJsonData = postData;
    }

    return NextResponse.json({
      success: true,
      id: postId,
      slug: normalizedSlug, // Return normalized slug
      url: `${baseUrl}/blog/${normalizedSlug}`,
      jsonPersisted: jsonSaveResult.success,
      jsonMethod: jsonSaveResult.method,
      jsonError: jsonSaveResult.error,
      manualJsonData: manualJsonData, // Post data if GitHub commit failed
      debug: {
        isVercel: !!process.env.VERCEL,
        hasGithubToken: !!GITHUB_TOKEN,
        githubRepo: GITHUB_REPO,
      },
      note: jsonSaveResult.success 
        ? 'Post saved and will be live after Vercel redeploys (1-2 minutes)' 
        : `Post saved to database. GitHub commit failed: ${jsonSaveResult.error || 'Unknown error'}. Post will not persist until added to JSON file.`,
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

