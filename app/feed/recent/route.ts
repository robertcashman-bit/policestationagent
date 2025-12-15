import { NextResponse } from 'next/server';
import { getPublishedBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/config/site';

// Force dynamic rendering - database not available during build
export const dynamic = 'force-dynamic';

/**
 * Recent Posts RSS Feed - Last 10 Posts
 * RSS 2.0 compliant feed for the most recent blog posts
 */
export async function GET() {
  try {
    const posts = getPublishedBlogPosts();
    
    // Sort by published_at (newest first)
    const sortedPosts = posts.sort((a, b) => {
      const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
      const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
      return dateB - dateA;
    });

    // Limit to 10 most recent posts
    const recentPosts = sortedPosts.slice(0, 10);

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
      <pubDate>${pubDate}</pubDate>${imageTag}
    </item>`;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Police Station Agent - Recent Posts</title>
    <link>${SITE_URL}/blog</link>
    <description>Most recent criminal defence advice and legal guidance from Police Station Agent.</description>
    <language>en-GB</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>30</ttl>
    <atom:link href="${SITE_URL}/feed/recent" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>Police Station Agent - Recent Posts</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('[Recent RSS Feed Error]', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

