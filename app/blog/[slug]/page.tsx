import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogArticleView } from '@/components/blog/BlogArticleView';
import { getAllBlogSlugs, getRelatedBlogPosts, getBlogPost } from '@/lib/blog/content';
import { getRelatedGuidesForBlogPost } from '@/lib/content-crosslinks';
import { pageMetadata } from '@/lib/page-metadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: [
        {
          url: post.heroImage.src,
          width: post.heroImage.width,
          height: post.heroImage.height,
          alt: post.heroImage.alt,
        },
      ],
    },
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(slug);
  const relatedGuides = getRelatedGuidesForBlogPost(slug);

  return <BlogArticleView post={post} related={related} relatedGuides={relatedGuides} />;
}
