import type { MetadataRoute } from 'next';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog/content';
import { getAllGuideSlugs, getGuide } from '@/lib/guides/content';
import { getAllLegalAdviceArticles, legalAdvicePath } from '@/lib/legal-advice/content';
import { allTrainingSeoSlugs } from '@/lib/training-seo-landings';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psrtrain.com';
const STATIC_FALLBACK = new Date('2026-01-01');

function parsePublished(value: string | undefined): Date {
  if (!value) return STATIC_FALLBACK;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? STATIC_FALLBACK : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date }[] = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/pricing', priority: 0.9, freq: 'monthly' },
    { path: '/features', priority: 0.8, freq: 'monthly' },
    { path: '/training', priority: 0.8, freq: 'monthly' },
    { path: '/legal/about', priority: 0.7, freq: 'monthly' },
    { path: '/legal/faq', priority: 0.8, freq: 'monthly' },
    { path: '/legal/contact', priority: 0.6, freq: 'monthly' },
    { path: '/legal/about-the-role', priority: 0.7, freq: 'monthly' },
    { path: '/legal/accreditation-process', priority: 0.7, freq: 'monthly' },
    { path: '/legal/how-our-training-helps', priority: 0.7, freq: 'monthly' },
    { path: '/legal/course-content', priority: 0.7, freq: 'monthly' },
    { path: '/legal/who-this-is-for', priority: 0.7, freq: 'monthly' },
    { path: '/legal/disclaimer', priority: 0.5, freq: 'yearly' },
    { path: '/legal/terms', priority: 0.5, freq: 'yearly' },
    { path: '/legal/privacy', priority: 0.5, freq: 'yearly' },
    { path: '/legal/cookies', priority: 0.4, freq: 'yearly' },
    { path: '/legal/refund', priority: 0.4, freq: 'yearly' },
    { path: '/legal/complaints', priority: 0.4, freq: 'yearly' },
    { path: '/legal-advice', priority: 0.8, freq: 'monthly' },
    { path: '/guides', priority: 0.85, freq: 'weekly' },
    { path: '/blog', priority: 0.85, freq: 'weekly' },
  ];

  const guideRoutes = getAllGuideSlugs().map((slug) => ({
    path: `/guides/${slug}`,
    priority: 0.75,
    freq: 'monthly' as const,
    lastModified: parsePublished(getGuide(slug)?.published),
  }));

  const blogRoutes = getAllBlogSlugs().map((slug) => ({
    path: `/blog/${slug}`,
    priority: 0.75,
    freq: 'monthly' as const,
    lastModified: parsePublished(getBlogPost(slug)?.published),
  }));

  const trainingSeoRoutes = allTrainingSeoSlugs().map((slug) => ({
    path: `/${slug}`,
    priority: 0.72,
    freq: 'monthly' as const,
  }));

  const legalAdviceRoutes = getAllLegalAdviceArticles().map((article) => ({
    path: legalAdvicePath(article),
    priority: 0.7,
    freq: 'monthly' as const,
    lastModified: parsePublished(article.published),
  }));

  const allRoutes = [...routes, ...guideRoutes, ...blogRoutes, ...legalAdviceRoutes, ...trainingSeoRoutes];

  return allRoutes.map(({ path, priority, freq, lastModified }: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date }) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModified ?? STATIC_FALLBACK,
    changeFrequency: freq,
    priority,
  }));
}
