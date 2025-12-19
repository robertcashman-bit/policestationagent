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
 * Commit post to GitHub repository
 */
/**
 * Save post via GitHub Git Data API (supports large files >1MB)
 * The Contents API has a 1MB limit, so for large files we use the Git Data API:
 * 1. Fetch current file content
 * 2. Update the posts array
 * 3. Create a new blob with the updated content
 * 4. Get the current commit
 * 5. Create a new tree with the updated blob
 * 6. Create a new commit
 * 7. Update the branch reference
 */
async function savePostViaGitHub(post: BlogPostData): Promise<{ success: boolean; error?: string }> {
  try {
    const [owner, repo] = GITHUB_REPO.split('/');
    const branch = 'master';
    
    if (!owner || !repo) {
      return { success: false, error: `Invalid GITHUB_REPO format: "${GITHUB_REPO}" - expected "owner/repo"` };
    }

    const headers = {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
    
    // 1. Fetch current file content from raw URL (fastest for large files)
    console.log('[posts/route] Step 1: Fetching current file content');
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${JSON_FILE_PATH}`;
    const rawResponse = await fetch(rawUrl);
    if (!rawResponse.ok) {
      return { success: false, error: `Failed to fetch current file: ${rawResponse.status}` };
    }
    const currentContent = await rawResponse.text();
    const posts: BlogPostData[] = JSON.parse(currentContent);
    
    // 2. Update the posts array
    console.log('[posts/route] Step 2: Updating posts array');
    const existingIndex = posts.findIndex(p => p.slug === post.slug);
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
    } else {
      posts.unshift(post);
    }
    const updatedContent = JSON.stringify(posts, null, 2);
    console.log(`  - Posts count: ${posts.length}, Content size: ${updatedContent.length} bytes`);

    // 3. Get the current branch reference (to get the latest commit SHA)
    console.log('[posts/route] Step 3: Getting branch reference');
    const refUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`;
    const refResponse = await fetch(refUrl, { headers });
    if (!refResponse.ok) {
      const error = await refResponse.json();
      return { success: false, error: `Failed to get branch ref: ${error.message}` };
    }
    const refData = await refResponse.json();
    const latestCommitSha = refData.object.sha;
    console.log(`  - Latest commit: ${latestCommitSha}`);

    // 4. Get the current commit to find the tree
    console.log('[posts/route] Step 4: Getting current commit tree');
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`;
    const commitResponse = await fetch(commitUrl, { headers });
    if (!commitResponse.ok) {
      const error = await commitResponse.json();
      return { success: false, error: `Failed to get commit: ${error.message}` };
    }
    const commitData = await commitResponse.json();
    const treeSha = commitData.tree.sha;
    console.log(`  - Tree SHA: ${treeSha}`);

    // 5. Create a new blob with the updated content
    console.log('[posts/route] Step 5: Creating new blob');
    const blobUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
    const blobResponse = await fetch(blobUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        content: updatedContent,
        encoding: 'utf-8',
      }),
    });
    if (!blobResponse.ok) {
      const error = await blobResponse.json();
      return { success: false, error: `Failed to create blob: ${error.message}` };
    }
    const blobData = await blobResponse.json();
    console.log(`  - New blob SHA: ${blobData.sha}`);

    // 6. Create a new tree with the updated file
    console.log('[posts/route] Step 6: Creating new tree');
    const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees`;
    const treeResponse = await fetch(treeUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: treeSha,
        tree: [{
          path: JSON_FILE_PATH,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha,
        }],
      }),
    });
    if (!treeResponse.ok) {
      const error = await treeResponse.json();
      return { success: false, error: `Failed to create tree: ${error.message}` };
    }
    const treeData = await treeResponse.json();
    console.log(`  - New tree SHA: ${treeData.sha}`);

    // 7. Create a new commit
    console.log('[posts/route] Step 7: Creating new commit');
    const newCommitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits`;
    const newCommitResponse = await fetch(newCommitUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: `Add blog post: ${post.title}`,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    });
    if (!newCommitResponse.ok) {
      const error = await newCommitResponse.json();
      return { success: false, error: `Failed to create commit: ${error.message}` };
    }
    const newCommitData = await newCommitResponse.json();
    console.log(`  - New commit SHA: ${newCommitData.sha}`);

    // 8. Update the branch reference to point to the new commit
    console.log('[posts/route] Step 8: Updating branch reference');
    const updateRefResponse = await fetch(refUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: false,
      }),
    });
    if (!updateRefResponse.ok) {
      const error = await updateRefResponse.json();
      return { success: false, error: `Failed to update branch: ${error.message}` };
    }

    console.log('[posts/route] Successfully committed post to GitHub via Git Data API!');
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
      manualJsonData = postData;
    }

    return NextResponse.json({
      success: true,
      id: postId,
      slug,
      url: `${baseUrl}/blog/${slug}`,
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

