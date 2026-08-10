import type { BufferEngineAdapter, SchedulablePost } from '@robertcashman/buffer-engine';
import { getSchedulablePosts as getLocalPosts } from '@/lib/buffer/feed';
import { SITE_URL } from '@/lib/buffer/config';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_ID = 'psrtrain';
const OVERRIDES_PATH = join(process.cwd(), 'data', 'buffer-image-overrides.json');
/** Buffer API cannot fetch dimensions from psrtrain.com images; use shared RepUK asset. */
const HOSTED_BUFFER_IMAGE = 'https://policestationrepuk.org/images/buffer/gbp/psrtrain-default.jpg';

function bufferImageUrl(slug: string, raw: string | undefined, overrides: Record<string, string>): string {
  const override = overrides[slug];
  if (override?.includes('policestationrepuk.org/images/buffer/')) return override;
  return HOSTED_BUFFER_IMAGE;
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

export function createPsrtrainBufferAdapter(): BufferEngineAdapter {
  return {
    siteId: SITE_ID,
    siteUrl: SITE_URL,
    kv: null,
    mediaFallbackImageUrl: HOSTED_BUFFER_IMAGE,
    getSchedulablePosts(): SchedulablePost[] {
      const overrides = loadImageOverrides();
      return getLocalPosts().map((p) => ({
        feedId: SITE_ID,
        slug: p.slug,
        title: p.title,
        excerpt: p.description,
        url: p.url,
        imageUrl: bufferImageUrl(p.slug, p.imageUrl, overrides),
        imageAlt: p.imageAlt,
      }));
    },
    async correctSourceImage(input) {
      saveImageOverride(input.slug, input.publicUrl);
    },
  };
}
