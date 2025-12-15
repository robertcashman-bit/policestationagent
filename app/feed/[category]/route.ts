import { NextResponse } from 'next/server';
import { getPublishedBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/config/site';
import { blogPosts, categoryOrder } from '@/data/blogIndex';

/**
 * Category RSS Feeds
 * RSS 2.0 compliant feeds for each blog category
 */
export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categorySlug = decodeURIComponent(params.category);
    
    // Normalize category name - convert slug back to category name
    const categoryMap: { [key: string]: string } = {
      'police-interview-procedure': 'Police Interview & Procedure',
      'police-bail-custody': 'Police Bail & Custody',
      'your-legal-rights': 'Your Legal Rights',
      'criminal-defence-guidance': 'Criminal Defence Guidance',
      'duty-solicitor-representation': 'Duty Solicitor & Representation',
      'police-station-advice': 'Police Station Advice',
      'updates-commentary': 'Updates & Commentary',
    };

    // Also check direct category name match
    const categoryName = categoryMap[categorySlug] || 
      (categoryOrder.includes(categorySlug) ? categorySlug : null);

    if (!categoryName) {
      return new NextResponse('Category not found', { status: 404 });
    }

    // Get all published posts
    const allPosts = getPublishedBlogPosts();
    
    // Filter posts by category using the blogIndex
    const categoryPosts = allPosts.filter(post => {
      const indexEntry = blogPosts.find(
        bp => bp.slug === post.slug || bp.slug === `/${post.slug}`
      );
      return indexEntry?.category === categoryName;
    });

    // Sort by published_at (newest first)
    const sortedPosts = categoryPosts.sort((a, b) => {
      const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
      const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
      return dateB - dateA;
    });

    // Limit to 20 most recent posts
    const recentPosts = sortedPosts.slice(0, 20);

    const buildDate = new Date().toUTCString();
    
    const rssItems = recentPosts.map(post => {
      const postUrl = `${SITE_URL}${post.slug.startsWith('/') ? post.slug : `/${post.slug}`}`;
      const pubDate = post.published_at 
        ? new Date(post.published_at).toUTCString() 
        : new Date(post.created_at).toUTCString();
      
      // Escape XML special characters
      const escapeXml = (str: string | null): string => {
        if (!str) return '';
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };

      const title = escapeXml(post.title);
      const desc = escapeXml(post.excerpt || '');
      
      // Get image if available
      const imageUrl = post.image;
      const imageTag = imageUrl 
        ? `\n      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />`
        : '';

      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(categoryName)}</category>${imageTag}
    </item>`;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Police Station Agent - ${categoryName}</title>
    <link>${SITE_URL}/blog</link>
    <description>${categoryName} - Expert criminal defence advice and legal guidance from Police Station Agent.</description>
    <language>en-GB</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed/${categorySlug}.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>Police Station Agent - ${categoryName}</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[Category RSS Feed Error]', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

