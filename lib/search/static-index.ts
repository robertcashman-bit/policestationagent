import { BLOG_POSTS } from '@/lib/blog/content';
import { GUIDES } from '@/lib/guides/content';

export type StaticSearchResult = {
  type: 'guide' | 'blog' | 'page';
  title: string;
  href: string;
  summary: string;
};

const STATIC_PAGES: StaticSearchResult[] = [
  {
    type: 'page',
    title: 'Training overview',
    href: '/training',
    summary: 'Course structure, modules, and PSRAS-aligned preparation.',
  },
  {
    type: 'page',
    title: 'Pricing',
    href: '/pricing',
    summary: 'Subscription plans for PSR Train.',
  },
  {
    type: 'page',
    title: 'Platform features',
    href: '/features',
    summary: 'Mock exams, scenarios, progress tracking, and certificates.',
  },
  {
    type: 'page',
    title: 'FAQ',
    href: '/legal/faq',
    summary: 'Common questions about PSR Train and PSRAS preparation.',
  },
];

function normalise(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function searchStaticContent(query: string, limit = 15): StaticSearchResult[] {
  const q = normalise(query);
  if (!q) return [];

  const pool: StaticSearchResult[] = [
    ...STATIC_PAGES,
    ...GUIDES.map((g) => ({
      type: 'guide' as const,
      title: g.title,
      href: `/guides/${g.slug}`,
      summary: g.summary,
    })),
    ...BLOG_POSTS.map((p) => ({
      type: 'blog' as const,
      title: p.title,
      href: `/blog/${p.slug}`,
      summary: p.summary,
    })),
  ];

  return pool
    .filter((item) => {
      const haystack = normalise(`${item.title} ${item.summary}`);
      return haystack.includes(q) || q.split(' ').every((word) => haystack.includes(word));
    })
    .slice(0, limit);
}
