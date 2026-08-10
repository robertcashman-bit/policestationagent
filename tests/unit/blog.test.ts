import { describe, expect, test } from 'vitest';
import { buildBlogRssFeedXml } from '../../lib/blog/rss-feed.ts';
import { BLOG_POSTS } from '../../lib/blog/content.ts';
import { blogPlainText, BUFFER_MIN_CHARS, meetsBufferLength } from '../../lib/blog/plain-text.ts';
import { SITE } from '../../lib/site.ts';
import { EXPECTED_BLOG_POST_COUNT } from '../../lib/blog/image-manifest.ts';
import { isBufferCompatibleHeroSrc } from '../../lib/blog/hero-image.ts';

describe('blog', () => {
  test('has expected post count', () => {
    expect(BLOG_POSTS.length).toBe(EXPECTED_BLOG_POST_COUNT);
  });

  test('first-12 psrtrain slugs are published', () => {
    const first12 = [
      'psras-exam-format-pass-mark-2026',
      'how-to-pass-critical-incidents-test',
      'free-psras-practice-questions',
    ];
    for (const slug of first12) {
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      expect(post).toBeTruthy();
    }
  });

  test('every post meets Buffer minimum character count', () => {
    for (const post of BLOG_POSTS) {
      const len = blogPlainText(post).length;
      expect(meetsBufferLength(post)).toBeTruthy();
    }
  });

  test('every post has a JPEG or PNG hero image', () => {
    for (const post of BLOG_POSTS) {
      expect(isBufferCompatibleHeroSrc(post.heroImage.src)).toBeTruthy();
    }
  });

  test('buildBlogRssFeedXml emits valid RSS with every post', () => {
    const xml = buildBlogRssFeedXml();

    expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(xml).toMatch(/<rss version="2\.0"/);
    expect(xml).toMatch(new RegExp(`<atom:link href="${SITE.url}/blog/feed"`));
    expect(xml).toMatch(/<link>https:\/\/psrtrain\.com\/blog<\/link>/);

    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(BLOG_POSTS.length);

    for (const post of BLOG_POSTS) {
      expect(xml).toMatch(new RegExp(`https://psrtrain\\.com/blog/${post.slug}`));
    }
  });

  test('RSS descriptions are long enough for Buffer syndication', () => {
    const xml = buildBlogRssFeedXml();
    for (const post of BLOG_POSTS) {
      const body = blogPlainText(post);
      const expected = body.length > 4000 ? body.slice(0, 3997) + '…' : body;
      expect(expected.length >= BUFFER_MIN_CHARS).toBeTruthy();
      expect(xml.includes(expected.slice(0, 80).replace(/&/g, '&amp;'))).toBeTruthy();
    }
  });

  test('every RSS item includes a JPEG or PNG enclosure', () => {
    const xml = buildBlogRssFeedXml();
    const itemBlocks = xml.split('<item>').slice(1);
    expect(itemBlocks.length).toBe(BLOG_POSTS.length);
    for (const block of itemBlocks) {
      expect(block).toMatch(/<enclosure url="[^"]+" type="image\/(jpeg|png)" length="\d+" \/>/);
    }
  });
});