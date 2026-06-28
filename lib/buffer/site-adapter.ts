import type { BufferEngineAdapter, SchedulablePost } from '@robertcashman/buffer-engine';
import { getAllPosts } from '@/lib/blog-reader';
import { SITE_URL } from '@/config/site';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_ID = 'policestationagent';
const OVERRIDES_PATH = join(process.cwd(), 'data', 'buffer-image-overrides.json');

function absImage(src: string | null | undefined): string | undefined {
  if (!src?.trim()) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith('//')) return `https:${src}`;
  return `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
}

function loadImageOverrides(): Record<string, string> {
  try {
    if (!existsSync(OVERRIDES_PATH)) return {};
    return JSON.parse(readFileSync(OVERRIDES_PATH, 'utf-8')) as Record<string, string>;
  } catch {
    return {};
  }
}

function saveImageOverride(slug: string, publicUrl: string): void {
  const overrides = loadImageOverrides();
  overrides[slug] = publicUrl;
  mkdirSync(join(process.cwd(), 'data'), { recursive: true });
  writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2));
}

export function createPsaBufferAdapter(): BufferEngineAdapter {
  return {
    siteId: SITE_ID,
    siteUrl: SITE_URL,
    kv: null,
    getSchedulablePosts(): SchedulablePost[] {
      const overrides = loadImageOverrides();
      return getAllPosts().map((post) => ({
        feedId: SITE_ID,
        slug: post.slug,
        title: post.title,
        excerpt: (post.metaDescription ?? '').trim(),
        url: `${SITE_URL}/blog/${post.slug}`,
        imageUrl: overrides[post.slug] ?? absImage(post.featuredImage),
        imageAlt: post.featuredImageAlt ?? post.title,
      }));
    },
    async correctSourceImage(input) {
      saveImageOverride(input.slug, input.publicUrl);
    },
  };
}
