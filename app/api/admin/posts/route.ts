/**
 * Blog Post Creation API
 * 
 * DESIGN PRINCIPLES:
 * - Single responsibility: create blog posts
 * - Hard fail on errors (no retries, no fallbacks)
 * - Uses GitHub Contents API only
 * - Each post is an independent file
 */

import { NextRequest, NextResponse } from 'next/server';
import { saveBlogPost, createBlogPost, BlogPost } from '@/lib/blog-persistence';

// =============================================================================
// ENVIRONMENT VALIDATION
// =============================================================================

function validateEnvironment(): { valid: boolean; error?: string } {
  if (!process.env.GITHUB_TOKEN) {
    return { valid: false, error: 'GITHUB_TOKEN environment variable is not set' };
  }
  if (!process.env.GITHUB_REPO) {
    return { valid: false, error: 'GITHUB_REPO environment variable is not set' };
  }
  return { valid: true };
}

// =============================================================================
// REQUEST VALIDATION
// =============================================================================

interface CreatePostRequest {
  title: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  location?: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  faq?: Array<{ q: string; a: string }>;
  imageFilename?: string;
}

function validateRequest(data: unknown): { valid: boolean; error?: string; request?: CreatePostRequest } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object' };
  }

  const req = data as Record<string, unknown>;

  if (!req.title || typeof req.title !== 'string') {
    return { valid: false, error: 'title is required and must be a string' };
  }

  if (!req.category || typeof req.category !== 'string') {
    return { valid: false, error: 'category is required and must be a string' };
  }

  if (!req.primaryKeyword || typeof req.primaryKeyword !== 'string') {
    return { valid: false, error: 'primaryKeyword is required and must be a string' };
  }

  if (!req.metaTitle || typeof req.metaTitle !== 'string') {
    return { valid: false, error: 'metaTitle is required and must be a string' };
  }

  if (!req.metaDescription || typeof req.metaDescription !== 'string') {
    return { valid: false, error: 'metaDescription is required and must be a string' };
  }

  if (!req.contentHtml || typeof req.contentHtml !== 'string') {
    return { valid: false, error: 'contentHtml is required and must be a string' };
  }

  return {
    valid: true,
    request: {
      title: req.title as string,
      category: req.category as string,
      primaryKeyword: req.primaryKeyword as string,
      secondaryKeywords: Array.isArray(req.secondaryKeywords) ? req.secondaryKeywords : [],
      location: typeof req.location === 'string' ? req.location : 'Kent',
      metaTitle: req.metaTitle as string,
      metaDescription: req.metaDescription as string,
      contentHtml: req.contentHtml as string,
      faq: Array.isArray(req.faq) ? req.faq : [],
      imageFilename: typeof req.imageFilename === 'string' ? req.imageFilename : undefined,
    },
  };
}

// =============================================================================
// POST HANDLER
// =============================================================================

export async function POST(request: NextRequest) {
  // 1. Validate environment
  const envCheck = validateEnvironment();
  if (!envCheck.valid) {
    return NextResponse.json(
      { success: false, error: envCheck.error },
      { status: 500 }
    );
  }

  // 2. Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  // 3. Validate request
  const reqCheck = validateRequest(body);
  if (!reqCheck.valid || !reqCheck.request) {
    return NextResponse.json(
      { success: false, error: reqCheck.error },
      { status: 400 }
    );
  }

  // 4. Create post object
  const post = createBlogPost({
    title: reqCheck.request.title,
    category: reqCheck.request.category,
    primaryKeyword: reqCheck.request.primaryKeyword,
    secondaryKeywords: reqCheck.request.secondaryKeywords || [],
    location: reqCheck.request.location || 'Kent',
    metaTitle: reqCheck.request.metaTitle,
    metaDescription: reqCheck.request.metaDescription,
    contentHtml: reqCheck.request.contentHtml,
    faq: reqCheck.request.faq || [],
    imageFilename: reqCheck.request.imageFilename,
  });

  // 5. Save to GitHub
  const result = await saveBlogPost(post);

  if (!result.success) {
    return NextResponse.json(
      { 
        success: false, 
        error: result.error,
        filePath: result.filePath,
      },
      { status: 500 }
    );
  }

  // 6. Return success
  return NextResponse.json({
    success: true,
    post: {
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.date,
      url: `/blog/${post.slug}`,
    },
    filePath: result.filePath,
    sha: result.sha,
  });
}

// =============================================================================
// GET HANDLER (for listing posts - optional)
// =============================================================================

export async function GET() {
  // This endpoint just confirms the API is working
  // Actual post listing should use the blog-reader module at build time
  return NextResponse.json({
    status: 'ok',
    message: 'Blog posts API is running. Use POST to create a new post.',
  });
}
