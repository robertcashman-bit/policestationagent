import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalAdviceArticleShell } from '@/components/legal-advice/LegalAdviceArticleShell';
import {
  LEGAL_ADVICE_ARTICLES,
  getLegalAdviceArticle,
  legalAdvicePath,
} from '@/lib/legal-advice/content';
import { LEGAL_ADVICE_VIEW_MAP } from '@/lib/legal-advice/views';
import { pageMetadata } from '@/lib/page-metadata';

type PageProps = {
  params: Promise<{ categorySlug: string; slug: string }>;
};

export function generateStaticParams() {
  return LEGAL_ADVICE_ARTICLES.map((article) => ({
    categorySlug: article.categorySlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const article = getLegalAdviceArticle(categorySlug, slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.description,
    path: legalAdvicePath(article),
    keywords: article.keywords,
    openGraph: {
      title: article.h1,
      description: article.description,
      type: 'article',
    },
  });
}

export default async function LegalAdviceArticlePage({ params }: PageProps) {
  const { categorySlug, slug } = await params;
  const article = getLegalAdviceArticle(categorySlug, slug);
  if (!article) notFound();

  const Body = LEGAL_ADVICE_VIEW_MAP[slug];
  if (!Body) notFound();

  return (
    <LegalAdviceArticleShell article={article}>
      <Body />
    </LegalAdviceArticleShell>
  );
}
