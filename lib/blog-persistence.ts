/**
 * Blog Persistence Module
 *
 * DESIGN PRINCIPLES:
 * - Each blog post is stored as its own file
 * - Uses ONLY GitHub Contents API (no blob API)
 * - Never overwrites existing files
 * - Hard fails on any error (no retries, no fallbacks)
 * - Deterministic behavior only
 */

// =============================================================================
// TYPES
// =============================================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  location: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  contentHtml: string;
  faq: Array<{ q: string; a: string }>;
  author: string;
  status: "published" | "draft";
}

export interface PersistenceResult {
  success: boolean;
  error?: string;
  filePath?: string;
  sha?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

function getConfig(): { token: string; repo: string; owner: string } {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  if (!repo) {
    throw new Error("GITHUB_REPO environment variable is not set");
  }

  const [owner, repoName] = repo.split("/");
  if (!owner || !repoName) {
    throw new Error('GITHUB_REPO must be in format "owner/repo"');
  }

  return { token, repo: repoName, owner };
}

// =============================================================================
// SLUG GENERATION
// =============================================================================

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

export function generatePostId(date: string, slug: string): string {
  return `${date}-${slug}`;
}

export function generateFilePath(date: string, slug: string): string {
  return `data/blog-posts/${date}-${slug}.json`;
}

// =============================================================================
// FILE EXISTENCE CHECK
// =============================================================================

async function fileExists(filePath: string): Promise<{ exists: boolean; sha?: string }> {
  const { token, repo, owner } = getConfig();

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (response.status === 404) {
    return { exists: false };
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error checking file existence: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return { exists: true, sha: data.sha };
}

// =============================================================================
// FILE CREATION (THE ONLY WRITE OPERATION)
// =============================================================================

async function createFile(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<{ sha: string }> {
  const { token, repo, owner } = getConfig();

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  // Encode content as base64
  const contentBase64 = Buffer.from(content, "utf-8").toString("base64");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: contentBase64,
      branch: "master",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error creating file: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return { sha: data.content.sha };
}

// =============================================================================
// MAIN PERSISTENCE FUNCTION
// =============================================================================

export async function saveBlogPost(post: BlogPost): Promise<PersistenceResult> {
  try {
    // Validate required fields
    if (!post.id) throw new Error("Post ID is required");
    if (!post.title) throw new Error("Post title is required");
    if (!post.slug) throw new Error("Post slug is required");
    if (!post.date) throw new Error("Post date is required");
    if (!post.contentHtml) throw new Error("Post content is required");

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
      throw new Error("Post date must be in YYYY-MM-DD format");
    }

    // Generate file path
    const filePath = generateFilePath(post.date, post.slug);

    // Check if file already exists
    const { exists } = await fileExists(filePath);
    if (exists) {
      return {
        success: false,
        error: `Post already exists at ${filePath}. Cannot overwrite.`,
        filePath,
      };
    }

    // Serialize to JSON
    const content = JSON.stringify(post, null, 2);

    // Check file size (must be < 100KB)
    const sizeBytes = Buffer.byteLength(content, "utf-8");
    if (sizeBytes > 100 * 1024) {
      return {
        success: false,
        error: `Post content too large: ${sizeBytes} bytes. Maximum is 100KB.`,
        filePath,
      };
    }

    // Create the file
    const { sha } = await createFile(filePath, content, `Add blog post: ${post.title}`);

    return {
      success: true,
      filePath,
      sha,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// =============================================================================
// UTILITY: CREATE POST OBJECT
// =============================================================================

export function createBlogPost(params: {
  title: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  location: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  faq: Array<{ q: string; a: string }>;
  imageFilename?: string;
}): BlogPost {
  const today = new Date().toISOString().split("T")[0];
  const slug = generateSlug(params.title);
  const id = generatePostId(today, slug);

  return {
    id,
    title: params.title,
    slug,
    date: today,
    category: params.category,
    primaryKeyword: params.primaryKeyword,
    secondaryKeywords: params.secondaryKeywords,
    location: params.location,
    metaTitle: params.metaTitle,
    metaDescription: params.metaDescription,
    featuredImage: params.imageFilename
      ? `/blog-images/${params.imageFilename}`
      : "/blog-images/blog-listing-0.jpg",
    contentHtml: params.contentHtml,
    faq: params.faq,
    author: "Robert Cashman",
    status: "published",
  };
}
