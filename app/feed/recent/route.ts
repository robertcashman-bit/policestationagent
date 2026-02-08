import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog-reader";
import { SITE_URL } from "@/config/site";

// Force dynamic rendering - database not available during build
export const dynamic = "force-dynamic";

function escapeXml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${SITE_URL}${url}`;
  return `${SITE_URL}/${url}`;
}

/**
 * Recent Posts RSS Feed - Last 10 Posts
 * RSS 2.0 compliant feed for the most recent blog posts
 */
export async function GET() {
  try {
    const posts = getAllPosts();

    // Sort by date (newest first)
    const sortedPosts = posts.slice().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Limit to 10 most recent posts
    const recentPosts = sortedPosts.slice(0, 10);

    const buildDate = new Date().toUTCString();

    const rssItems = recentPosts
      .map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();

        const title = escapeXml(post.title);
        const desc = escapeXml(post.metaDescription || "");

        // Get image if available - RSS 2.0 requires url, type, and length attributes
        const imageUrl = toAbsoluteUrl(post.featuredImage);
        // Use default length of 50000 bytes for images (RSS 2.0 requirement)
        const imageLength = 50000;
        // Use both enclosure (RSS 2.0) and media:content (Media RSS) for maximum compatibility
        const imageTag = imageUrl
          ? `\n      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" length="${imageLength}" />
      <media:content url="${escapeXml(imageUrl)}" type="image/jpeg" medium="image" />
      <media:thumbnail url="${escapeXml(imageUrl)}" />`
          : "";

        return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author || "Robert Cashman")}</dc:creator>${imageTag}
    </item>`;
      })
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
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
      <url>${SITE_URL}/blog-images/blog-listing-0.jpg</url>
      <title>Police Station Agent - Recent Posts</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <dc:creator>Robert Cashman</dc:creator>
    <dc:rights>Copyright ${new Date().getFullYear()} Police Station Agent</dc:rights>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("[Recent RSS Feed Error]", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
