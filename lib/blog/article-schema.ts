import type { BlogPost } from './types';

const SITE = 'https://psrtrain.com';

/** BlogPosting JSON-LD with a named Person author (E-E-A-T) + Organization publisher. */
export function buildArticleJsonLd(post: BlogPost) {
  const postUrl = `${SITE}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.h1,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    image: [`${SITE}${post.heroImage.src}`],
    author: {
      '@type': 'Person',
      name: 'Robert Cashman',
      description:
        'Criminal defence solicitor and police station representative trainer.',
      url: `${SITE}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PSR Train',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    inLanguage: 'en-GB',
    keywords: post.keywords,
    articleSection: post.category,
  };
}

/** BreadcrumbList JSON-LD: Home → Blog → post. */
export function buildBreadcrumbJsonLd(post: BlogPost) {
  const postUrl = `${SITE}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };
}
