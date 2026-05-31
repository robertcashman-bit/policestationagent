import { NextResponse } from "next/server";
import { SITE_DOMAIN } from "@/config/site";
import { getAllPosts } from "@/lib/blog-reader";

const INDEXNOW_KEY = "655b1cdbce5c462b9fe51c4e19f92678";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`;

// Important pages to submit for fast indexing (Google, Bing, DuckDuckGo via IndexNow/Bing)
// More URLs = faster discovery; IndexNow accepts up to 10,000 per request
const PRIORITY_URLS = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/blog",
  "/faq",
  "/police-stations",
  "/coverage",
  "/voluntary-interviews",
  "/for-solicitors",
  "/for-clients",
  "/fees",
  "/testimonials",
  "/what-we-do",
  "/why-use-us",
  "/police-custody-rights",
  "/police-interview-rights",
  "/your-rights-in-custody",
  "/pace-code-c",
  "/no-comment-interview",
  "/custody-time-limits",
  "/police-bail-explained",
  "/released-under-investigation",
  "/offences-we-deal-with",
  "/start/in-custody",
  "/start/voluntary-interview",
  "/emergency-police-station-representation",
  "/bluewater-police-station",
  "/medway-police-station",
  "/maidstone-police-station",
  "/canterbury-police-station",
  "/tonbridge-police-station",
  "/folkestone-police-station",
  "/north-kent-gravesend-police-station",
  "/ashford-police-station",
  "/dover-police-station",
  "/sevenoaks-police-station",
  "/sittingbourne-police-station",
  "/tunbridge-wells-police-station",
  "/gravesend-police-station",
  "/canwehelp",
  "/kent-police-custody-resources",
  "/resources",
  "/resources/pace-rights-guide",
  "/link-to-us",
  "/press",
];

function getDefaultIndexNowUrls(): string[] {
  const blogUrls = getAllPosts().map((post) => `/blog/${post.slug}`);
  return Array.from(new Set([...PRIORITY_URLS, ...blogUrls]));
}

/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 */
async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: SITE_DOMAIN,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map((url) => (url.startsWith("http") ? url : `${SITE_URL}${url}`)),
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return { success: true, message: `IndexNow: Submitted ${urls.length} URLs` };
    } else {
      const text = await response.text();
      return { success: false, message: `IndexNow error: ${response.status} - ${text}` };
    }
  } catch (error) {
    return { success: false, message: `IndexNow error: ${error}` };
  }
}

/**
 * Ping Yandex with sitemap URL (faster indexing, some DDG/other engines use multiple sources)
 */
async function pingYandex(): Promise<{ success: boolean; message: string }> {
  try {
    const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
    const response = await fetch(`https://webmaster.yandex.com/ping?sitemap=${sitemapUrl}`);

    if (response.ok) {
      return { success: true, message: "Yandex: Sitemap ping successful" };
    } else {
      return { success: false, message: `Yandex ping error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: `Yandex ping error: ${error}` };
  }
}

/**
 * POST /api/index-now
 * Submits URLs to search engines for indexing
 *
 * Optional body: { urls: string[] } - specific URLs to submit
 * If no body provided, submits priority URLs
 *
 * Query params:
 * - ?secret=YOUR_SECRET - Optional secret for protection
 */
export async function POST(request: Request) {
  // SECURITY: Require secret in production to prevent abuse
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (process.env.NODE_ENV === "production") {
    if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.INDEXNOW_SECRET && secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let urlsToSubmit = getDefaultIndexNowUrls();

  try {
    const body = await request.json();
    if (body.urls && Array.isArray(body.urls)) {
      urlsToSubmit = body.urls;
    }
  } catch {
    // No body or invalid JSON - use default URLs
  }

  const results = await Promise.all([submitToIndexNow(urlsToSubmit), pingYandex()]);

  const allSuccess = results.every((r) => r.success);

  return NextResponse.json(
    {
      success: allSuccess,
      timestamp: new Date().toISOString(),
      urlsSubmitted: urlsToSubmit.length,
      google:
        "Submit /sitemap.xml and /blog-sitemap.xml in Google Search Console; Google no longer provides a public sitemap ping endpoint.",
      bing: "IndexNow submission covers Bing and improves DuckDuckGo discovery.",
      results: results.map((r) => r.message),
    },
    { status: allSuccess ? 200 : 207 }
  );
}

/**
 * GET /api/index-now
 * Returns status and instructions
 */
export async function GET() {
  return NextResponse.json({
    status: "ready",
    indexNowKey: INDEXNOW_KEY,
    keyUrl: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    sitemapUrl: `${SITE_URL}/sitemap.xml`,
    blogSitemapUrl: `${SITE_URL}/blog-sitemap.xml`,
    llmsUrl: `${SITE_URL}/llms.txt`,
    instructions:
      "POST to this endpoint to submit URLs to IndexNow. Submit sitemaps directly in Google Search Console.",
    defaultUrlCount: getDefaultIndexNowUrls().length,
  });
}
