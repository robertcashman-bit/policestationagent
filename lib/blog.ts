/**
 * AUTHORITATIVE BLOG SYSTEM
 * 
 * This module provides the SINGLE SOURCE OF TRUTH for all blog-related data.
 * All blog pages, API routes, and menu dropdowns MUST use these functions.
 * 
 * Core Principles:
 * 1. The URL is derived, not trusted - slugs are normalized deterministically
 * 2. All queries go directly to the SQL database
 * 3. No static JSON files, no hardcoded arrays
 * 4. Runtime-driven, no rebuild required for new posts
 * 
 * @module lib/blog
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// ============================================================================
// TYPES
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  created_at: string;
}

// ============================================================================
// SLUG NORMALIZATION (CRITICAL)
// ============================================================================

/**
 * Normalizes a slug to ensure it's URL-safe and deterministic.
 * 
 * Rules:
 * - Lowercase
 * - Trim whitespace
 * - Replace spaces & punctuation with hyphens
 * - Collapse multiple hyphens
 * - Remove leading/trailing hyphens
 * 
 * @example
 * normalizeSlug("My First Blog Post!!!") // "my-first-blog-post"
 * normalizeSlug("  HELLO   WORLD  ") // "hello-world"
 * normalizeSlug("What's A Voluntary Police Interview?") // "whats-a-voluntary-police-interview"
 */
export function normalizeSlug(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .toLowerCase()                           // lowercase
    .trim()                                  // trim whitespace
    .normalize('NFD')                        // decompose unicode (é → e + ́)
    .replace(/[\u0300-\u036f]/g, '')         // remove diacritical marks
    .replace(/['']/g, '')                    // remove smart quotes
    .replace(/[^\w\s-]/g, '')                // remove non-word chars except spaces and hyphens
    .replace(/[\s_]+/g, '-')                 // replace spaces and underscores with hyphens
    .replace(/-+/g, '-')                     // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');                // remove leading/trailing hyphens
}

/**
 * Derives a slug from a title if the existing slug is invalid.
 * A slug is considered invalid if it's null, empty, contains spaces,
 * contains uppercase, or has invalid URL characters.
 */
export function deriveSlugIfNeeded(existingSlug: string | null | undefined, title: string): string {
  const isValid = existingSlug && 
    typeof existingSlug === 'string' &&
    existingSlug.length > 0 &&
    !/\s/.test(existingSlug) &&             // no spaces
    existingSlug === existingSlug.toLowerCase() && // all lowercase
    /^[a-z0-9-]+$/.test(existingSlug);      // only valid URL chars

  if (isValid) {
    return existingSlug;
  }

  // Derive from title
  const derived = normalizeSlug(title);
  
  if (!derived) {
    // Fallback: generate from ID would be handled by caller
    return 'untitled';
  }

  return derived;
}

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

let dbInstance: Database.Database | null = null;

/**
 * Get or create the database connection.
 * Handles serverless environments (Vercel) by copying to /tmp if needed.
 */
function getDb(): Database.Database {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database not available during build. Use runtime queries only.');
  }

  if (dbInstance) {
    return dbInstance;
  }

  const sourceDbPath = path.join(process.cwd(), 'data', 'web44ai.db');
  let dbPath = sourceDbPath;

  // Serverless environment handling
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = '/tmp/web44ai.db';
    
    try {
      const sourceExists = fs.existsSync(sourceDbPath);
      const tmpExists = fs.existsSync(tmpDbPath);
      
      // Copy if source exists and tmp doesn't, or source is newer
      if (sourceExists && (!tmpExists || needsCopy(sourceDbPath, tmpDbPath))) {
        fs.copyFileSync(sourceDbPath, tmpDbPath);
        console.log('[blog.ts] Copied database to /tmp for serverless');
      }
      
      if (fs.existsSync(tmpDbPath)) {
        dbPath = tmpDbPath;
      }
    } catch (err) {
      console.warn('[blog.ts] Could not copy database to /tmp:', err);
    }
  }

  try {
    dbInstance = new Database(dbPath, { readonly: true });
    console.log('[blog.ts] Database opened:', dbPath);
  } catch (err) {
    console.error('[blog.ts] Failed to open database:', err);
    throw err;
  }

  return dbInstance;
}

function needsCopy(sourcePath: string, destPath: string): boolean {
  try {
    const sourceStat = fs.statSync(sourcePath);
    const destStat = fs.statSync(destPath);
    return sourceStat.mtimeMs > destStat.mtimeMs;
  } catch {
    return true;
  }
}

// ============================================================================
// AUTHORITATIVE BLOG QUERIES (MANDATORY)
// ============================================================================

/**
 * SINGLE AUTHORITATIVE FUNCTION for fetching published blog posts.
 * 
 * This function MUST be used by:
 * - /blog page
 * - /blog/[slug] page
 * - Blog menu dropdown
 * - Any other component that needs blog data
 * 
 * @returns Array of published blog posts with normalized slugs, sorted by publishedAt DESC
 */
export function getPublishedBlogPosts(): BlogPostSummary[] {
  try {
    const db = getDb();
    
    const posts = db.prepare(`
      SELECT 
        id,
        title,
        slug,
        excerpt,
        published_at,
        created_at
      FROM blog_posts 
      WHERE published = 1
      ORDER BY 
        COALESCE(published_at, created_at) DESC
    `).all() as BlogPostSummary[];

    // Normalize slugs for each post
    const normalizedPosts = posts.map(post => ({
      ...post,
      slug: deriveSlugIfNeeded(post.slug, post.title)
    }));

    console.log(`[blog.ts] getPublishedBlogPosts: Found ${normalizedPosts.length} published posts`);

    if (normalizedPosts.length === 0) {
      console.warn('[blog.ts] WARNING: Zero published blog posts returned!');
    }

    return normalizedPosts;
  } catch (error) {
    console.error('[blog.ts] Error in getPublishedBlogPosts:', error);
    return [];
  }
}

/**
 * Get full blog post content by slug.
 * Performs case-insensitive matching and normalizes the incoming slug.
 * 
 * @param slug The URL slug (may be case-variant or malformed)
 * @returns The full blog post or null if not found
 */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!slug || typeof slug !== 'string') {
    console.warn('[blog.ts] getPostBySlug called with invalid slug:', slug);
    return null;
  }

  try {
    const db = getDb();
    
    // Normalize the incoming slug for matching
    const normalizedInputSlug = normalizeSlug(slug);
    
    // Get all published posts
    const posts = db.prepare(`
      SELECT 
        id,
        title,
        slug,
        content,
        excerpt,
        meta_title,
        meta_description,
        published_at,
        created_at,
        updated_at
      FROM blog_posts 
      WHERE published = 1
    `).all() as BlogPost[];

    // Find matching post by normalized slug (case-insensitive)
    const post = posts.find(p => {
      const postNormalizedSlug = deriveSlugIfNeeded(p.slug, p.title);
      return postNormalizedSlug === normalizedInputSlug || 
             normalizeSlug(p.slug) === normalizedInputSlug;
    });

    if (!post) {
      console.log(`[blog.ts] getPostBySlug: No post found for slug "${slug}" (normalized: "${normalizedInputSlug}")`);
      return null;
    }

    // Return with normalized slug
    return {
      ...post,
      slug: deriveSlugIfNeeded(post.slug, post.title)
    };
  } catch (error) {
    console.error('[blog.ts] Error in getPostBySlug:', error);
    return null;
  }
}

/**
 * Get blog post by ID (for admin purposes).
 */
export function getPostById(id: number): BlogPost | null {
  if (!id || typeof id !== 'number') {
    return null;
  }

  try {
    const db = getDb();
    
    const post = db.prepare(`
      SELECT 
        id,
        title,
        slug,
        content,
        excerpt,
        meta_title,
        meta_description,
        published_at,
        created_at,
        updated_at
      FROM blog_posts 
      WHERE id = ?
    `).get(id) as BlogPost | undefined;

    if (!post) {
      return null;
    }

    return {
      ...post,
      slug: deriveSlugIfNeeded(post.slug, post.title)
    };
  } catch (error) {
    console.error('[blog.ts] Error in getPostById:', error);
    return null;
  }
}

// ============================================================================
// SAFE BACKFILL LOGIC (OPTIONAL)
// ============================================================================

interface BackfillResult {
  updated: number;
  skipped: number;
  errors: string[];
}

/**
 * Safely backfills slugs in the database.
 * Only updates posts where the slug is null, empty, or malformed.
 * Does NOT overwrite valid existing slugs.
 * 
 * This should be run as a one-time migration or maintenance task.
 */
export function backfillSlugs(): BackfillResult {
  const result: BackfillResult = { updated: 0, skipped: 0, errors: [] };

  try {
    // Need write access for backfill
    const sourceDbPath = path.join(process.cwd(), 'data', 'web44ai.db');
    const db = new Database(sourceDbPath, { readonly: false });

    const posts = db.prepare(`
      SELECT id, title, slug FROM blog_posts
    `).all() as Array<{ id: number; title: string; slug: string | null }>;

    const usedSlugs = new Set<string>();

    // First pass: collect all valid existing slugs
    for (const post of posts) {
      if (post.slug && deriveSlugIfNeeded(post.slug, post.title) === post.slug) {
        usedSlugs.add(post.slug);
      }
    }

    const updateStmt = db.prepare(`
      UPDATE blog_posts SET slug = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);

    // Second pass: update invalid slugs
    for (const post of posts) {
      const derived = deriveSlugIfNeeded(post.slug, post.title);
      
      // Skip if slug is already valid and matches derived
      if (post.slug === derived) {
        result.skipped++;
        continue;
      }

      // Ensure uniqueness
      let finalSlug = derived;
      let counter = 2;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${derived}-${counter}`;
        counter++;
      }

      try {
        updateStmt.run(finalSlug, post.id);
        usedSlugs.add(finalSlug);
        result.updated++;
        console.log(`[blog.ts] Backfilled slug for ID ${post.id}: "${post.slug}" -> "${finalSlug}"`);
      } catch (err) {
        const msg = `Failed to update ID ${post.id}: ${err}`;
        result.errors.push(msg);
        console.error('[blog.ts]', msg);
      }
    }

    db.close();
    console.log(`[blog.ts] Backfill complete: ${result.updated} updated, ${result.skipped} skipped`);
  } catch (error) {
    const msg = `Backfill failed: ${error}`;
    result.errors.push(msg);
    console.error('[blog.ts]', msg);
  }

  return result;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a date for display.
 */
export function formatBlogDate(dateString: string | null): string | null {
  if (!dateString) return null;
  
  try {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return null;
  }
}

/**
 * Check if the blog system is operational.
 */
export function healthCheck(): { ok: boolean; postCount: number; error?: string } {
  try {
    const posts = getPublishedBlogPosts();
    return { ok: true, postCount: posts.length };
  } catch (error) {
    return { ok: false, postCount: 0, error: String(error) };
  }
}
