import { describe, expect, test } from 'vitest';
import { BLOG_POSTS } from '../../lib/blog/content.ts';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '../../lib/blog/article-schema.ts';

describe('blog schema (Phase 2 tech-SEO)', () => {
  test('BlogPosting has a named Person author (E-E-A-T)', () => {
    for (const post of BLOG_POSTS) {
      const ld = buildArticleJsonLd(post);
      expect(ld['@type']).toBe('BlogPosting');
      expect(ld.author['@type']).toBe('Person');
      expect(ld.author.name.length > 0).toBeTruthy();
      expect(ld.publisher['@type']).toBe('Organization');
      expect(ld.url.startsWith('https://psrtrain.com/blog/')).toBeTruthy();
    }
  });

  test('BreadcrumbList is Home → Blog → post', () => {
    for (const post of BLOG_POSTS) {
      const bc = buildBreadcrumbJsonLd(post);
      expect(bc['@type']).toBe('BreadcrumbList');
      expect(bc.itemListElement.length).toBe(3);
      expect(bc.itemListElement[0].name).toBe('Home');
      expect(bc.itemListElement[1].name).toBe('Blog');
      expect(bc.itemListElement[2].item).toBe(`https://psrtrain.com/blog/${post.slug}`);
    }
  });
});
