import { describe, expect, test } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BLOG_POSTS } from '../../lib/blog/content.ts';
import { EXPECTED_BLOG_POST_COUNT } from '../../lib/blog/image-manifest.ts';
import { isBufferCompatibleHeroSrc } from '../../lib/blog/hero-image.ts';

describe('blog hero images', () => {
  test('blog has expected post count', () => {
    expect(BLOG_POSTS.length).toBe(EXPECTED_BLOG_POST_COUNT);
  });

  test('every post has a unique JPEG or PNG hero on disk', () => {
    const hashes = new Map<string, string>();

    for (const post of BLOG_POSTS) {
      expect(post.heroImage).toBeTruthy();
      expect(isBufferCompatibleHeroSrc(post.heroImage.src)).toBeTruthy();
      const path = join(process.cwd(), 'public', post.heroImage.src.replace(/^\//, ''));
      expect(existsSync(path)).toBeTruthy();

      const hash = createHash('sha256').update(readFileSync(path)).digest('hex');
      const duplicate = hashes.get(hash);
      expect(!duplicate).toBeTruthy();
      hashes.set(hash, post.slug);
    }

    expect(hashes.size).toBe(EXPECTED_BLOG_POST_COUNT);
  });
});
