import { BLOG_POSTS } from '@/lib/blog/content';
import { blogPlainText } from '@/lib/blog/plain-text';
import { SITE } from '@/lib/site';
import { statSync } from 'node:fs';
import { join } from 'node:path';

const HEADERS: HeadersInit = {
  'Content-Type': 'application/rss+xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
};

const RSS_FEED_URL = `${SITE.url}/blog/feed`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRFC822(date: Date): string {
  return date.toUTCString();
}

function enclosureMimeType(src: string): string {
  if (/\.png(\?|$)/i.test(src)) return 'image/png';
  if (/\.jpe?g(\?|$)/i.test(src)) return 'image/jpeg';
  return 'image/jpeg';
}

function heroEnclosureLength(src: string): number {
  try {
    return statSync(join(process.cwd(), 'public', src.replace(/^\//, ''))).size;
  } catch {
    return 50000;
  }
}

function postPubDate(post: (typeof BLOG_POSTS)[number]): Date {
  return new Date(`${post.published}T12:00:00Z`);
}

/** RSS 2.0 for blog posts — Buffer-ready descriptions (2000+ chars). */
export function buildBlogRssFeedXml(): string {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => postPubDate(b).getTime() - postPubDate(a).getTime(),
  );

  const items = posts
    .map((post) => {
      const url = `${SITE.url}/blog/${post.slug}`;
      const body = blogPlainText(post);
      const description = body.length > 4000 ? `${body.slice(0, 3997)}…` : body;
      const imageTag = post.heroImage
        ? `\n      <enclosure url="${escapeXml(`${SITE.url}${post.heroImage.src}`)}" type="${enclosureMimeType(post.heroImage.src)}" length="${heroEnclosureLength(post.heroImage.src)}" />`
        : '';

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${toRFC822(postPubDate(post))}</pubDate>
      <guid isPermaLink="true">${url}</guid>
      <category>${escapeXml(post.category)}</category>${imageTag}
    </item>`;
    })
    .join('\n');

  const lastBuildDate =
    posts.length > 0 ? toRFC822(postPubDate(posts[0])) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} — Blog</title>
    <link>${SITE.url}/blog</link>
    <description>PSRAS, PACE, and career articles for police station representatives — syndicated for Buffer and RSS readers.</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${RSS_FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE.url}/icon.svg</url>
      <title>${escapeXml(SITE.name)}</title>
      <link>${SITE.url}/blog</link>
    </image>
${items}
  </channel>
</rss>`;
}

export function blogRssFeedGet(): Response {
  return new Response(buildBlogRssFeedXml(), { headers: HEADERS });
}

export function blogRssFeedHead(): Response {
  return new Response(null, { headers: HEADERS });
}
