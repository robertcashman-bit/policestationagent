import { describe, expect, test } from 'vitest';
import {
  buildChannelText,
  buildTrackingUrl,
  dedupMarker,
} from '../../lib/buffer/copy.ts';
import { runBufferScheduler } from '../../lib/buffer/engine-run.ts';
import { buildPostAssets, metadataForService } from '../../lib/buffer/client.ts';
import type { SchedulablePost } from '../../lib/buffer/types.ts';

const post: SchedulablePost = {
  slug: 'psras-exam-format-pass-mark-2026',
  title: 'PSRAS Exam Format & Pass Mark (2026)',
  description: 'How the PSRAS exam is structured, the pass mark, and how to prepare.',
  url: 'https://psrtrain.com/blog/psras-exam-format-pass-mark-2026',
  published: '2026-06-01',
};

describe('buffer port — copy', () => {
  test('tracking URL carries campaign=slug and per-channel source', () => {
    const url = buildTrackingUrl(post.url, 'linkedin', post.slug);
    expect(url.includes(`utm_campaign=${post.slug}`)).toBeTruthy();
    expect(url.includes('utm_source=linkedin')).toBeTruthy();
  });

  test('dedup marker is contained in the tracking URL', () => {
    const url = buildTrackingUrl(post.url, 'twitter', post.slug);
    expect(url.includes(dedupMarker(post.slug))).toBeTruthy();
  });

  test('twitter copy respects ~270 char budget', () => {
    const url = buildTrackingUrl(post.url, 'twitter', post.slug);
    const text = buildChannelText(post, 'twitter', url);
    expect(text.length <= 290).toBeTruthy();
    expect(text.includes(url)).toBeTruthy();
  });

  test('linkedin/facebook copy include the title and tracking URL', () => {
    for (const svc of ['linkedin', 'facebook'] as const) {
      const url = buildTrackingUrl(post.url, svc, post.slug);
      const text = buildChannelText(post, svc, url);
      expect(text.includes(post.title)).toBeTruthy();
      expect(text.includes(url)).toBeTruthy();
    }
  });
});

describe('buffer port — asset shape (AssetInput OneOf)', () => {
  test('uses image.url + metadata.altText, never __typename/source/alt', () => {
    const assets = buildPostAssets('https://psrtrain.com/x.jpg', 'Alt text');
    expect(assets).toEqual([
      { image: { url: 'https://psrtrain.com/x.jpg', metadata: { altText: 'Alt text' } } },
    ]);
    const json = JSON.stringify(assets);
    expect(!json.includes('__typename')).toBeTruthy();
    expect(!json.includes('"source"')).toBeTruthy();
  });

  test('returns undefined when there is no image', () => {
    expect(buildPostAssets(undefined, 'alt')).toBe(undefined);
  });
});

describe('buffer port — channel metadata', () => {
  test('facebook requires a post type', () => {
    expect(metadataForService('facebook', 'https://psrtrain.com/x')).toEqual({
      facebook: { type: 'post' },
    });
  });

  test('googlebusiness carries a whats_new CTA', () => {
    const meta = metadataForService('googlebusiness', 'https://psrtrain.com/x') as any;
    expect(meta.google.type).toBe('whats_new');
    expect(meta.google.detailsWhatsNew.link).toBe('https://psrtrain.com/x');
  });

  test('linkedin/twitter need no metadata', () => {
    expect(metadataForService('linkedin', 'https://psrtrain.com/x')).toBe(undefined);
    expect(metadataForService('twitter', 'https://psrtrain.com/x')).toBe(undefined);
  });
});

describe('buffer port — config (offline)', () => {
  test('returns a clear reason when Buffer is not configured', async () => {
    delete process.env.BUFFER_ACCESS_TOKEN;
    delete process.env.BUFFER_API_KEY;
    const result = await runBufferScheduler({ dryRun: true });
    expect(result.ok).toBe(false);
    expect(result.reason ?? '').toMatch(/not configured/);
  });
});
