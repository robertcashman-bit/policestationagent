import { BLOG_POSTS } from '@/lib/blog/content';
import { GUIDES } from '@/lib/guides/content';
import type { BlogPost } from '@/lib/blog/types';
import type { Guide } from '@/lib/guides/types';

const GUIDE_TO_BLOG_CATEGORY: Record<Guide['category'], BlogPost['category'][]> = {
  PSRAS: ['PSRAS Prep'],
  PACE: ['PACE'],
  Career: ['Career'],
  Exams: ['PSRAS Prep', 'CIT'],
};

const BLOG_TO_GUIDE_CATEGORY: Record<BlogPost['category'], Guide['category'][]> = {
  'PSRAS Prep': ['PSRAS', 'Exams'],
  PACE: ['PACE'],
  CIT: ['Exams', 'PSRAS'],
  Career: ['Career'],
};

export function getRelatedGuidesForBlogPost(slug: string, limit = 3): Guide[] {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return [];

  const categories = BLOG_TO_GUIDE_CATEGORY[post.category] ?? [];
  return GUIDES.filter((g) => categories.includes(g.category)).slice(0, limit);
}

export function getRelatedBlogPostsForGuide(slug: string, limit = 3): BlogPost[] {
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return [];

  const categories = GUIDE_TO_BLOG_CATEGORY[guide.category] ?? [];
  return BLOG_POSTS.filter(
    (p) => categories.includes(p.category) && p.slug !== slug,
  ).slice(0, limit);
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, limit);
}

/** Curated high-value guides for homepage discovery. */
export function getFeaturedGuides(limit = 3): Guide[] {
  const slugs = [
    'what-is-psras',
    'pace-code-c-guide',
    'critical-incidents-test-psras',
    'psras-exam-preparation-tips',
    'how-to-become-a-police-station-representative',
  ];
  const picked = slugs
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter((g): g is Guide => Boolean(g));
  return picked.slice(0, limit);
}
