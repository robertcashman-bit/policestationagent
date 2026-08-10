import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

type TitleInput = string | { absolute: string };

type PageMetaInput = {
  title: TitleInput;
  description: string;
  path: string;
  keywords?: string[];
  openGraph?: Partial<NonNullable<Metadata['openGraph']>>;
  robots?: Metadata['robots'];
};

function normalisePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/** Per-page SEO metadata with correct canonical URL and Open Graph url. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  openGraph,
  robots,
}: PageMetaInput): Metadata {
  const canonicalPath = normalisePath(path);
  const titleValue = typeof title === 'string' ? title : title;
  const titleText = typeof title === 'string' ? title : title.absolute;
  const ogImages = openGraph?.images;

  return {
    title: titleValue,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: titleText,
      description,
      url: canonicalPath,
      siteName: SITE.name,
      locale: 'en_GB',
      type: 'website',
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      ...(ogImages ? { images: ogImages as NonNullable<Metadata['twitter']>['images'] } : {}),
    },
    ...(robots ? { robots } : {}),
  };
}
