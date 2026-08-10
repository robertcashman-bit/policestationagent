import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GuideArticleView } from '@/components/guides/GuideArticleView';
import { getAllGuideSlugs, getGuide, GUIDES } from '@/lib/guides/content';
import { getRelatedBlogPostsForGuide } from '@/lib/content-crosslinks';
import { pageMetadata } from '@/lib/page-metadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${slug}`,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.relatedSlugs
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const relatedBlog = getRelatedBlogPostsForGuide(slug);

  return <GuideArticleView guide={guide} related={related} relatedBlog={relatedBlog} />;
}
