/**
 * Redis-based Blog Persistence API (Vercel KV / Upstash)
 * -------------------------------------------------------
 * Replaces GitHub-based persistence with Redis for reliable serverless storage.
 * 
 * Requirements (set in Vercel env vars):
 * - KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel KV)
 *   OR
 * - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash)
 *
 * Endpoints:
 * - POST   /api/blog/redis  { post: {...} }   -> save/update
 * - GET    /api/blog/redis?slug=x             -> get single
 * - GET    /api/blog/redis?limit=50           -> list all
 * - DELETE /api/blog/redis?slug=x             -> delete
 */

import { NextRequest, NextResponse } from 'next/server';

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

// Key design
const KEY_POST = (slug: string) => `blog:post:${slug}`;
const KEY_INDEX = 'blog:index';
const KEY_META = (slug: string) => `blog:meta:${slug}`;

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  location?: string;
  primaryKeyword?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface BlogMeta {
  slug: string;
  title: string;
  category?: string;
  location?: string;
  primaryKeyword?: string;
  createdAt: string;
  updatedAt: string;
}

function toSlug(input: string): string {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function nowIso(): string {
  return new Date().toISOString();
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function redisRequest(path: string, payload: any, attempt = 0): Promise<any> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error(
      'Missing Redis env vars. Set KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV) OR UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash).'
    );
  }

  const url = `${REDIS_URL.replace(/\/$/, '')}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Retry transient errors
  if ((res.status === 429 || res.status >= 500) && attempt < 4) {
    const backoff = 250 * Math.pow(2, attempt) + Math.floor(Math.random() * 200);
    await sleep(backoff);
    return redisRequest(path, payload, attempt + 1);
  }

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || `Redis REST error ${res.status}`;
    const err = new Error(msg) as any;
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function redisPipeline(commands: any[]): Promise<any> {
  return redisRequest('/pipeline', commands);
}

async function savePost(postInput: any): Promise<{ slug: string; post: BlogPost; meta: BlogMeta }> {
  const createdAt = postInput?.createdAt || postInput?.created_at || postInput?.date || nowIso();
  const updatedAt = nowIso();

  const title = String(postInput?.title || postInput?.headline || '').trim();
  const slug = toSlug(postInput?.slug || title || `post-${Date.now()}`);

  const post: BlogPost = {
    ...postInput,
    slug,
    title: postInput?.title || postInput?.headline || title || slug,
    content: postInput?.content || '',
    createdAt,
    updatedAt,
  };

  const meta: BlogMeta = {
    slug,
    title: post.title,
    category: post.category || '',
    location: post.location || postInput?.targetLocation || '',
    primaryKeyword: post.primaryKeyword || postInput?.primarySeoKeyword || '',
    updatedAt,
    createdAt,
  };

  const score = Date.now();

  await redisPipeline([
    ['SET', KEY_POST(slug), JSON.stringify(post)],
    ['HSET', KEY_META(slug), ...Object.entries(meta).flat()],
    ['ZADD', KEY_INDEX, score, slug],
  ]);

  return { slug, post, meta };
}

async function getPost(slug: string): Promise<{ post: BlogPost | null; meta: BlogMeta | null }> {
  const [postResp, metaResp] = await redisPipeline([
    ['GET', KEY_POST(slug)],
    ['HGETALL', KEY_META(slug)],
  ]);

  const postRaw = postResp?.result ?? null;
  const metaArr = metaResp?.result ?? null;

  const post = postRaw ? JSON.parse(postRaw) : null;
  const meta = Array.isArray(metaArr) && metaArr.length > 0
    ? (Object.fromEntries(
        metaArr
          .map((v: string, i: number, a: string[]) => (i % 2 === 0 ? [v, a[i + 1]] : null))
          .filter((entry): entry is [string, string] => entry !== null)
      ) as unknown as BlogMeta)
    : null;

  return { post, meta };
}

async function listPosts(limit = 50): Promise<BlogMeta[]> {
  const zrange = await redisPipeline([
    ['ZREVRANGE', KEY_INDEX, 0, Math.max(0, Number(limit) - 1)],
  ]);

  const slugs: string[] = zrange?.[0]?.result || [];
  if (!slugs.length) return [];

  const metaCmds = slugs.map((s) => ['HGETALL', KEY_META(s)]);
  const metaResps = await redisPipeline(metaCmds);

  return slugs.map((slug, idx) => {
    const arr = metaResps?.[idx]?.result || [];
    const obj: any = Array.isArray(arr) && arr.length > 0
      ? Object.fromEntries(
          arr
            .map((v: string, i: number, a: string[]) => (i % 2 === 0 ? [v, a[i + 1]] : null))
            .filter((entry): entry is [string, string] => entry !== null)
        )
      : {};
    if (!obj.slug) obj.slug = slug;
    return obj;
  });
}

async function deletePost(slug: string): Promise<{ slug: string; deleted: boolean }> {
  await redisPipeline([
    ['DEL', KEY_POST(slug)],
    ['DEL', KEY_META(slug)],
    ['ZREM', KEY_INDEX, slug],
  ]);
  return { slug, deleted: true };
}

// Health check response
function notConfigured() {
  return NextResponse.json(
    {
      ok: false,
      error: 'Redis not configured. Set KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV) OR UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash) in Vercel environment variables.',
      configured: false,
    },
    { status: 500 }
  );
}

export async function GET(request: NextRequest) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return notConfigured();
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    if (slug) {
      const result = await getPost(slug);
      if (!result.post) {
        return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json({ ok: true, ...result });
    }

    const items = await listPosts(limit);
    return NextResponse.json({ ok: true, items, count: items.length });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message, debug: { status: error.status, data: error.data } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return notConfigured();
  }

  try {
    const body = await request.json();
    const postInput = body.post || body;

    const title = String(postInput?.title || postInput?.headline || '').trim();
    if (!title) {
      return NextResponse.json({ ok: false, error: 'Missing post title/headline' }, { status: 400 });
    }

    const content = String(postInput?.content || postInput?.body || '').trim();
    if (!content) {
      return NextResponse.json({ ok: false, error: 'Missing post content/body' }, { status: 400 });
    }

    const saved = await savePost(postInput);
    return NextResponse.json({ ok: true, ...saved, persisted: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message, debug: { status: error.status, data: error.data } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return notConfigured();
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ ok: false, error: 'Missing slug parameter' }, { status: 400 });
    }

    const result = await deletePost(slug);
    return NextResponse.json({ ok: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message, debug: { status: error.status, data: error.data } },
      { status: 500 }
    );
  }
}
