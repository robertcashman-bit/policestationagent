import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog-reader";
import { SITE_URL } from "@/config/site";
import { categoryOrder } from "@/data/blogIndex";

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
 * Category RSS Feeds
 * RSS 2.0 compliant feeds for each blog category
 */
export async function GET(request: Request, props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  try {
    const categorySlug = decodeURIComponent(params.category);

    // Normalize category name - convert slug back to category name
    const categoryMap: { [key: string]: string } = {
      "police-interview-procedure": "Police Interview & Procedure",
      "police-bail-custody": "Police Bail & Custody",
      "your-legal-rights": "Your Legal Rights",
      "criminal-defence-guidance": "Criminal Defence Guidance",
      "duty-solicitor-representation": "Duty Solicitor & Representation",
      "police-station-advice": "Police Station Advice",
      "updates-commentary": "Updates & Commentary",
    };

    // Also check direct category name match
    const categoryName =
      categoryMap[categorySlug] || (categoryOrder.includes(categorySlug) ? categorySlug : null);

    if (!categoryName) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Get all published posts (new-format + legacy), then filter by category
    const allPosts = getAllPosts();
    const categoryPosts = allPosts.filter((post) => post.category === categoryName);

    // Sort by date (newest first)
    const sortedPosts = categoryPosts.slice().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Limit to 20 most recent posts
    const recentPosts = sortedPosts.slice(0, 20);

    const buildDate = new Date().toUTCString();

    const rssItems = recentPosts
      .map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();

        const title = escapeXml(post.title);
        const desc = escapeXml(post.metaDescription || "");

        // Get image if available
        const imageUrl = toAbsoluteUrl(post.featuredImage);
        const imageTag = imageUrl
          ? `\n      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />`
          : "";

        return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(categoryName)}</category>${imageTag}
    </item>`;
      })
      .join("\n");

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
    <atom:link href="${SITE_URL}/feed/${categorySlug}" rel="self" type="application/rss+xml" />
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
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[Category RSS Feed Error]", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
