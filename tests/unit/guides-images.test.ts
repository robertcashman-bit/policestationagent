import { describe, expect, test } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GUIDES } from '../../lib/guides/content.ts';
import { EXPECTED_GUIDE_COUNT, GUIDE_IMAGE_MANIFEST } from '../../lib/guides/image-manifest.ts';

describe('guide hero images', () => {
  test('guides have expected count', () => {
    expect(GUIDES.length).toBe(EXPECTED_GUIDE_COUNT);
  });

  test('manifest covers every guide slug', () => {
    for (const guide of GUIDES) {
      expect(GUIDE_IMAGE_MANIFEST[guide.slug]).toBeTruthy();
    }
    expect(Object.keys(GUIDE_IMAGE_MANIFEST).length).toBe(EXPECTED_GUIDE_COUNT);
  });

  test('every guide has a unique JPEG or PNG hero on disk', () => {
    const hashes = new Map<string, string>();

    for (const guide of GUIDES) {
      expect(guide.heroImage).toBeTruthy();
      const src = guide.heroImage.src;
      expect(src).toMatch(/\.(jpg|png)$/i);
      const path = join(process.cwd(), 'public', src.replace(/^\//, ''));
      expect(existsSync(path)).toBeTruthy();

      const hash = createHash('sha256').update(readFileSync(path)).digest('hex');
      const duplicate = hashes.get(hash);
      expect(!duplicate).toBeTruthy();
      hashes.set(hash, guide.slug);
    }

    expect(hashes.size).toBe(EXPECTED_GUIDE_COUNT);
  });
});
