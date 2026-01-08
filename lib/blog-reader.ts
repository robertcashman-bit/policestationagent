/**
 * Blog Reader Module
 *
 * DESIGN PRINCIPLES:
 * - Read-only operations
 * - Works at build time and runtime
 * - Primary source: individual JSON files in /data/blog-posts/
 * - Backward compatible: also reads from legacy SQLite/JSON sources
 * - No mutations, no writes
 */

import fs from "fs";
import path from "path";
import { BlogPost } from "./blog-persistence";

// =============================================================================
// LEGACY IMPORTS (for backward compatibility)
// =============================================================================

// Legacy blog post interface (from SQLite/old JSON)
interface LegacyBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  image: string | null;
  schema_json: string | null;
}

// =============================================================================
// TYPES
// =============================================================================

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  author: string;
}

// =============================================================================
// DIRECTORY CONFIGURATION
// =============================================================================

const BLOG_POSTS_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_JSON_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

// =============================================================================
// ENSURE DIRECTORY EXISTS
// =============================================================================

function ensureDirectoryExists(): void {
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
  }
}

// =============================================================================
// NORMALIZE SLUG (for matching)
// =============================================================================

function normalizeSlug(input: string): string {
  if (!input || typeof input !== "string") return "";

  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// =============================================================================
// READ NEW-FORMAT POSTS (individual JSON files)
// =============================================================================

function getNewFormatPosts(): BlogPost[] {
  ensureDirectoryExists();

  const files = fs.readdirSync(BLOG_POSTS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const posts: BlogPost[] = [];

  for (const file of jsonFiles) {
    try {
      const filePath = path.join(BLOG_POSTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const post = JSON.parse(content) as BlogPost;

      // Only include published posts
      if (post.status === "published") {
        posts.push(post);
      }
    } catch (error) {
      console.error(`[blog-reader] Error reading ${file}:`, error);
    }
  }

  return posts;
}

// =============================================================================
// READ LEGACY POSTS (from JSON file)
// =============================================================================

function getLegacyPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(LEGACY_JSON_PATH)) {
      return [];
    }

    const content = fs.readFileSync(LEGACY_JSON_PATH, "utf-8");
    const legacyPosts = JSON.parse(content) as LegacyBlogPost[];

    // Convert legacy format to new format
    return legacyPosts
      .filter((p) => p.published === 1)
      .map((p) => ({
        id: `legacy-${p.id}`,
        title: p.title || "Untitled",
        slug: normalizeSlug(p.slug || p.title),
        date: (p.published_at || p.created_at || new Date().toISOString()).split("T")[0],
        category: "Police Station Advice",
        primaryKeyword: "",
        secondaryKeywords: [],
        location: "Kent",
        metaTitle: p.meta_title || p.title || "Untitled",
        metaDescription: p.meta_description || p.excerpt || "",
        // Cycle through available blog images based on post ID for variety
        featuredImage:
          p.image || `/blog-images/blog-listing-${p.id % 8}.${p.id % 8 === 0 ? "jpg" : "png"}`,
        contentHtml: p.content || "",
        faq: [],
        author: "Robert Cashman",
        status: "published" as const,
      }));
  } catch (error) {
    console.error("[blog-reader] Error reading legacy JSON:", error);
    return [];
  }
}

// =============================================================================
// READ ALL POSTS (new + legacy, deduplicated)
// =============================================================================

export function getAllPosts(): BlogPost[] {
  const newPosts = getNewFormatPosts();
  const legacyPosts = getLegacyPosts();

  // Build a map of slugs to posts (new format takes precedence)
  const postMap = new Map<string, BlogPost>();

  // Add legacy posts first
  for (const post of legacyPosts) {
    postMap.set(normalizeSlug(post.slug), post);
  }

  // Add new posts (overwrite legacy if same slug)
  for (const post of newPosts) {
    postMap.set(normalizeSlug(post.slug), post);
  }

  // Convert map to array
  const posts = Array.from(postMap.values());

  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.log(
    `[blog-reader] Found ${newPosts.length} new posts, ${legacyPosts.length} legacy posts, ${posts.length} total unique`
  );

  return posts;
}

// =============================================================================
// GET POST SUMMARIES (for index page)
// =============================================================================

export function getPostSummaries(): BlogPostSummary[] {
  const posts = getAllPosts();

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    featuredImage: post.featuredImage,
    author: post.author,
  }));
}

// =============================================================================
// GET SINGLE POST BY SLUG
// =============================================================================

export function getPostBySlug(slug: string): BlogPost | null {
  const normalizedInput = normalizeSlug(slug);
  const posts = getAllPosts();

  const post = posts.find((p) => normalizeSlug(p.slug) === normalizedInput);

  if (post) {
    console.log(`[blog-reader] Found post: ${post.slug}`);
    return post;
  }

  console.log(`[blog-reader] No post found for slug: ${slug}`);
  return null;
}

// =============================================================================
// GET ALL SLUGS (for static generation)
// =============================================================================

export function getAllSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.slug);
}

// =============================================================================
// GET POSTS BY CATEGORY
// =============================================================================

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

// =============================================================================
// GET RECENT POSTS
// =============================================================================

export function getRecentPosts(count: number = 5): BlogPost[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}

// =============================================================================
// GET ALL CATEGORIES
// =============================================================================

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

// =============================================================================
// UTILITY: Generate excerpt from HTML
// =============================================================================

export function generateExcerpt(html: string, maxLength: number = 160): string {
  const textOnly = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (textOnly.length <= maxLength) {
    return textOnly;
  }

  const truncated = textOnly.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

// =============================================================================
// UTILITY: Format date for display
// =============================================================================

export function formatBlogDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
