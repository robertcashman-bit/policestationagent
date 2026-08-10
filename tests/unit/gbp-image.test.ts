import { describe, expect, test } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_URL } from '../../lib/buffer/config.ts';
import {
  GBP_BRAND_FALLBACK_PATH,
  gbpSafeImageUrl,
  isGbpSafeImageUrl,
} from '../../lib/buffer/gbp-image.ts';
import { buildPostAssets } from '../../lib/buffer/client.ts';
import { getSchedulablePosts } from '../../lib/buffer/feed.ts';

describe('gbp-image', () => {
  test('rejects webp and accepts jpeg/png', () => {
    expect(isGbpSafeImageUrl('https://psrtrain.com/x.webp')).toBe(false);
    expect(isGbpSafeImageUrl('https://psrtrain.com/x.jpg')).toBe(true);
  });

  test('passes through existing jpg heroes for GBP', () => {
    const post = getSchedulablePosts().find((p) => p.imageUrl?.endsWith('.jpg'));
    expect(post?.imageUrl).toBeTruthy();
    const resolved = gbpSafeImageUrl(post!.imageUrl);
    expect(resolved).toBe(post!.imageUrl);
  });

  test('buildPostAssets never sends webp to googlebusiness', () => {
    const assets = buildPostAssets('https://psrtrain.com/x.webp', 'alt', 'googlebusiness');
    expect(assets).toBeTruthy();
    expect(assets![0].image.url).toMatch(/\.jpg(\?|$)/i);
    expect(assets![0].image.url).not.toMatch(/\.webp/i);
  });

  test('brand fallback exists on disk', () => {
    expect(existsSync(join(process.cwd(), 'public', GBP_BRAND_FALLBACK_PATH))).toBeTruthy();
    expect(gbpSafeImageUrl(`${SITE_URL}/opengraph-image`)).toBe(`${SITE_URL}${GBP_BRAND_FALLBACK_PATH}`);
  });
});
