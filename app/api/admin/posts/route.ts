import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth';
import { normalizeSlug } from '@/lib/blog';
import * as fs from 'fs';
import * as path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'robertdavidcashman-droid/one';
const JSON_FILE_PATH = 'data/blog-posts-full.json';

// Redis configuration (Vercel KV or Upstash)
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

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
 * Save post to Redis (Vercel KV / Upstash) - preferred method for serverless
 */
async function savePostToRedis(post: BlogPostData): Promise<{ success: boolean; error?: string }> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return { success: false, error: 'Redis not configured' };
  }

  try {
    const slug = post.slug;
    const KEY_POST = `blog:post:${slug}`;
    const KEY_INDEX = 'blog:index';
    const KEY_META = `blog:meta:${slug}`;

    const meta = {
      slug,
      title: post.title,
      category: 'Police Station Advice',
      location: post.location || 'Kent',
      primaryKeyword: post.meta_title || '',
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    };

    const score = Date.now();

    // Pipeline commands
    const commands = [
      ['SET', KEY_POST, JSON.stringify(post)],
      ['HSET', KEY_META, ...Object.entries(meta).flat()],
      ['ZADD', KEY_INDEX, score, slug],
    ];

    const url = `${REDIS_URL.replace(/\/$/, '')}/pipeline`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: `Redis error ${res.status}: ${text}` };
    }

    console.log('[posts/route] ✅ Successfully saved to Redis');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: `Redis error: ${error.message}` };
  }
}

/**
 * Save post to JSON file via GitHub API (for Vercel) or locally (for dev)
 * Now tries Redis FIRST, then falls back to GitHub/local
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
    debugInfo.push(`REDIS configured: ${!!(REDIS_URL && REDIS_TOKEN)}`);
    
    // On Vercel, try Redis FIRST (most reliable), then fall back to GitHub
    if (process.env.VERCEL) {
      // Try Redis first - this is the most reliable method
      if (REDIS_URL && REDIS_TOKEN) {
        debugInfo.push('Trying Redis persistence (preferred)');
        const redisResult = await savePostToRedis(post);
        if (redisResult.success) {
          return { success: true, method: 'redis' };
        }
        debugInfo.push(`Redis failed: ${redisResult.error}`);
      }

      // Fall back to GitHub if Redis not configured or failed
      debugInfo.push('Falling back to GitHub API');
      if (GITHUB_TOKEN) {
        const result = await savePostViaGitHub(post);
        return { ...result, method: 'github', error: result.error ? `${result.error} | Debug: ${debugInfo.join(', ')}` : undefined };
      } else {
        return { 
          success: false, 
          error: `Neither Redis nor GitHub configured on Vercel | Debug: ${debugInfo.join(', ')}`,
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
  // #region agent log - Debug instrumentation
  const debugLog: string[] = [];
  const logDebug = (msg: string) => {
    debugLog.push(`[${new Date().toISOString()}] ${msg}`);
    console.log('[posts/route]', msg);
  };
  // #endregion

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

  // #region agent log - Log config
  logDebug(`GitHub Config: owner=${owner}, repo=${repo}, branch=${branch}, filePath=${filePath}`);
  logDebug(`Token prefix: ${GITHUB_TOKEN.substring(0, 10)}...`);
  // #endregion

  // GitHub Contents API - use Bearer (more modern) instead of token
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // #region agent log - Pre-flight check: verify repo permissions AND token scopes
  try {
    const repoCheckUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const repoResponse = await fetch(repoCheckUrl, { headers });
    
    // Check OAuth scopes from response headers - this tells us what the token can actually do
    const oauthScopes = repoResponse.headers.get('x-oauth-scopes');
    const acceptedScopes = repoResponse.headers.get('x-accepted-oauth-scopes');
    logDebug(`Token OAuth scopes: ${oauthScopes || 'NONE'}`);
    logDebug(`Required scopes for this endpoint: ${acceptedScopes || 'NONE'}`);
    
    // Check if token has 'repo' scope (required for writing to private repos)
    if (oauthScopes) {
      const scopes = oauthScopes.split(',').map(s => s.trim());
      const hasRepoScope = scopes.includes('repo') || scopes.includes('public_repo');
      logDebug(`Has repo/public_repo scope: ${hasRepoScope}`);
      if (!hasRepoScope) {
        return { 
          success: false, 
          error: `Token lacks 'repo' scope. Current scopes: [${oauthScopes}]. Please regenerate the GITHUB_TOKEN with 'repo' scope enabled. | Debug: ${debugLog.join(' | ')}` 
        };
      }
    } else {
      logDebug('WARNING: Could not determine token scopes from headers');
    }
    
    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      logDebug(`Repo check: ${repoData.full_name}, default_branch=${repoData.default_branch}, permissions=${JSON.stringify(repoData.permissions)}, private=${repoData.private}`);
      if (!repoData.permissions?.push) {
        return { success: false, error: `Token does not have push permission to ${GITHUB_REPO}. Permissions: ${JSON.stringify(repoData.permissions)} | Debug: ${debugLog.join(' | ')}` };
      }
    } else {
      const errData = await repoResponse.json();
      logDebug(`Repo check failed: ${repoResponse.status} - ${errData.message}`);
    }
  } catch (e: any) {
    logDebug(`Repo check error: ${e.message}`);
  }
  // #endregion

  try {
    // Step 1: GET file contents with explicit ref=master
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    // #region agent log - GET request
    logDebug(`GET URL: ${getFileUrl}`);
    // #endregion
    
    const getResponse = await fetch(getFileUrl, { headers });
    // #region agent log - GET response
    logDebug(`GET Response: status=${getResponse.status}, ok=${getResponse.ok}`);
    // #endregion

    let existingPosts: BlogPostData[] = [];
    let fileSha: string | null = null;

    if (getResponse.status === 404) {
      // File doesn't exist - create with empty array
      logDebug('File not found (404), will create new file with []');
      existingPosts = [];
      fileSha = null;
    } else if (!getResponse.ok) {
      const error = await getResponse.json();
      const errorMsg = `Failed to GET file (${getResponse.status}): ${error.message}`;
      logDebug(`GET ERROR: ${errorMsg}`);
      return { success: false, error: `${errorMsg} | Debug: ${debugLog.join(' | ')}` };
    } else {
      // File exists - parse content
      const fileData = await getResponse.json();
      fileSha = fileData.sha;
      // #region agent log - File metadata
      logDebug(`File SHA: ${fileSha}`);
      logDebug(`File size from API: ${fileData.size} bytes`);
      logDebug(`Has content: ${!!fileData.content}, Has download_url: ${!!fileData.download_url}`);
      // #endregion

      // Handle large files (>1MB) - GitHub doesn't include content inline
      let fileContent: string;
      if (fileData.content) {
        // Small file - content is base64 encoded inline
        fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
        logDebug('Content decoded from inline base64');
      } else if (fileData.download_url) {
        // Large file - fetch from download_url
        logDebug(`Large file detected, fetching from download_url: ${fileData.download_url}`);
        const downloadResponse = await fetch(fileData.download_url);
        if (!downloadResponse.ok) {
          return { success: false, error: `Failed to download large file: ${downloadResponse.status} | Debug: ${debugLog.join(' | ')}` };
        }
        fileContent = await downloadResponse.text();
        logDebug(`Downloaded ${fileContent.length} bytes from download_url`);
      } else {
        // Fallback: fetch from raw GitHub URL
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
        logDebug(`Fetching from raw GitHub URL: ${rawUrl}`);
        const rawResponse = await fetch(rawUrl);
        if (!rawResponse.ok) {
          return { success: false, error: `Failed to fetch raw file: ${rawResponse.status} | Debug: ${debugLog.join(' | ')}` };
        }
        fileContent = await rawResponse.text();
        logDebug(`Fetched ${fileContent.length} bytes from raw URL`);
      }

      try {
        existingPosts = JSON.parse(fileContent);
        logDebug(`Parsed ${existingPosts.length} existing posts`);
      } catch (parseError: any) {
        const errorMsg = `Failed to parse existing JSON file: ${parseError.message}`;
        logDebug(`PARSE ERROR: ${errorMsg}`);
        return { success: false, error: `${errorMsg} | Debug: ${debugLog.join(' | ')}` };
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
    // #region agent log - PUT request details
    logDebug(`PUT URL: ${putFileUrl}`);
    logDebug(`PUT body: message="${`Add blog post: ${post.title}`}", branch=${branch}, sha=${fileSha || 'null (new file)'}`);
    logDebug(`PUT content size: ${contentSizeMB.toFixed(2)}MB, base64 length: ${contentBase64.length}`);
    // #endregion

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

    // #region agent log - PUT response
    logDebug(`PUT Response: status=${putResponse.status}, ok=${putResponse.ok}`);
    // #endregion

    if (putResponse.ok) {
      logDebug('✅ Successfully committed to GitHub via Contents API');
      return { success: true };
    }

    const errorData = await putResponse.json();
    logDebug(`PUT ERROR (Contents API): ${JSON.stringify(errorData)}`);

    // If Contents API fails (often due to file size > 1MB), fall back to Git Data API
    if (putResponse.status === 404 || putResponse.status === 422) {
      logDebug('Contents API failed, falling back to Git Data API for large file');
      
      try {
        // Step 1: Create a blob with the new content
        const blobUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
        logDebug(`Creating blob at: ${blobUrl}`);
        
        const blobResponse = await fetch(blobUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            content: updatedContent,
            encoding: 'utf-8',
          }),
        });

        if (!blobResponse.ok) {
          const blobError = await blobResponse.json();
          logDebug(`Blob creation failed: ${JSON.stringify(blobError)}`);
          return { success: false, error: `Failed to create blob: ${blobError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        const blobData = await blobResponse.json();
        const newBlobSha = blobData.sha;
        logDebug(`Created blob with SHA: ${newBlobSha}`);

        // Step 2: Get the current commit SHA for master branch
        const refUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`;
        logDebug(`Getting ref: ${refUrl}`);
        
        const refResponse = await fetch(refUrl, { headers });
        if (!refResponse.ok) {
          const refError = await refResponse.json();
          logDebug(`Get ref failed: ${JSON.stringify(refError)}`);
          return { success: false, error: `Failed to get branch ref: ${refError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        const refData = await refResponse.json();
        const currentCommitSha = refData.object.sha;
        logDebug(`Current commit SHA: ${currentCommitSha}`);

        // Step 3: Get the current commit to find the tree SHA
        const commitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits/${currentCommitSha}`;
        const commitResponse = await fetch(commitUrl, { headers });
        if (!commitResponse.ok) {
          const commitError = await commitResponse.json();
          logDebug(`Get commit failed: ${JSON.stringify(commitError)}`);
          return { success: false, error: `Failed to get commit: ${commitError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        const commitData = await commitResponse.json();
        const baseTreeSha = commitData.tree.sha;
        logDebug(`Base tree SHA: ${baseTreeSha}`);

        // Step 4: Create a new tree with the updated file
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees`;
        logDebug(`Creating tree at: ${treeUrl}`);
        
        const treeResponse = await fetch(treeUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            base_tree: baseTreeSha,
            tree: [{
              path: filePath,
              mode: '100644',
              type: 'blob',
              sha: newBlobSha,
            }],
          }),
        });

        if (!treeResponse.ok) {
          const treeError = await treeResponse.json();
          logDebug(`Tree creation failed: ${JSON.stringify(treeError)}`);
          return { success: false, error: `Failed to create tree: ${treeError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        const treeData = await treeResponse.json();
        const newTreeSha = treeData.sha;
        logDebug(`Created tree with SHA: ${newTreeSha}`);

        // Step 5: Create a new commit
        const newCommitUrl = `https://api.github.com/repos/${owner}/${repo}/git/commits`;
        logDebug(`Creating commit at: ${newCommitUrl}`);
        
        const newCommitResponse = await fetch(newCommitUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: `Add blog post: ${post.title}`,
            tree: newTreeSha,
            parents: [currentCommitSha],
          }),
        });

        if (!newCommitResponse.ok) {
          const newCommitError = await newCommitResponse.json();
          logDebug(`Commit creation failed: ${JSON.stringify(newCommitError)}`);
          return { success: false, error: `Failed to create commit: ${newCommitError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        const newCommitData = await newCommitResponse.json();
        const newCommitSha = newCommitData.sha;
        logDebug(`Created commit with SHA: ${newCommitSha}`);

        // Step 6: Update the branch reference to point to the new commit
        logDebug(`Updating ref: ${refUrl}`);
        
        const updateRefResponse = await fetch(refUrl, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            sha: newCommitSha,
            force: false,
          }),
        });

        if (!updateRefResponse.ok) {
          const updateRefError = await updateRefResponse.json();
          logDebug(`Update ref failed: ${JSON.stringify(updateRefError)}`);
          return { success: false, error: `Failed to update branch: ${updateRefError.message} | Debug: ${debugLog.join(' | ')}` };
        }

        logDebug('✅ Successfully committed to GitHub via Git Data API');
        return { success: true };

      } catch (gitDataError: any) {
        logDebug(`Git Data API error: ${gitDataError.message}`);
        return { success: false, error: `Git Data API failed: ${gitDataError.message} | Debug: ${debugLog.join(' | ')}` };
      }
    }

    const errorMsg = `GitHub PUT failed (${putResponse.status}): ${errorData.message}. File size: ${contentSizeMB.toFixed(2)}MB`;
    return { success: false, error: `${errorMsg} | Debug: ${debugLog.join(' | ')}` };

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

