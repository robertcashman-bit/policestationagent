import { BLOG_POSTS } from '@/lib/blog/content';
import { SITE_URL } from './config';
import type { SchedulablePost } from './types';

/** Local blog posts mapped to Buffer-schedulable items (newest first). */
export function getSchedulablePosts(): SchedulablePost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      imageUrl: post.heroImage?.src ? `${SITE_URL}${post.heroImage.src}` : undefined,
      imageAlt: post.heroImage?.alt,
      published: post.published,
    }));
}
