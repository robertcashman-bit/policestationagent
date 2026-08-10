import { GUIDES } from '@/lib/guides/content';
import { SITE } from '@/lib/site';

const HEADERS: HeadersInit = {
  'Content-Type': 'application/rss+xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
};

const RSS_FEED_URL = `${SITE.url}/feed`;

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
  if (/\.webp(\?|$)/i.test(src)) return 'image/webp';
  if (/\.png(\?|$)/i.test(src)) return 'image/png';
  if (/\.jpe?g(\?|$)/i.test(src)) return 'image/jpeg';
  return 'image/jpeg';
}

/** RSS pub dates from guide metadata (newest first in feed order). */
function guidePubDate(guide: (typeof GUIDES)[number]): Date {
  return new Date(`${guide.published}T12:00:00Z`);
}

/** RSS 2.0 document for PSR Train guides (used by Buffer and aggregators). */
export function buildRssFeedXml(): string {
  const guides = [...GUIDES].sort(
    (a, b) => guidePubDate(b).getTime() - guidePubDate(a).getTime(),
  );

  const items = guides
    .map((guide) => {
      const url = `${SITE.url}/guides/${guide.slug}`;
      const plainExcerpt = guide.summary.trim().slice(0, 400);
      const imageTag = guide.heroImage
        ? `\n      <enclosure url="${escapeXml(`${SITE.url}${guide.heroImage.src}`)}" type="${enclosureMimeType(guide.heroImage.src)}" length="50000" />`
        : '';

      return `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${url}</link>
      <description>${escapeXml(plainExcerpt)}</description>
      <pubDate>${toRFC822(guidePubDate(guide))}</pubDate>
      <guid isPermaLink="true">${url}</guid>
      <category>${escapeXml(guide.category)}</category>${imageTag}
    </item>`;
    })
    .join('\n');

  const lastBuildDate = guides.length > 0 ? toRFC822(guidePubDate(guides[0])) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} — PSR Guides</title>
    <link>${SITE.url}/guides</link>
    <description>PSRAS, PACE, and exam prep guides for police station representatives in England &amp; Wales.</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${RSS_FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE.url}/icon.svg</url>
      <title>${escapeXml(SITE.name)}</title>
      <link>${SITE.url}</link>
    </image>
${items}
  </channel>
</rss>`;
}

export function rssFeedGet(): Response {
  return new Response(buildRssFeedXml(), { headers: HEADERS });
}

export function rssFeedHead(): Response {
  return new Response(null, { headers: HEADERS });
}
