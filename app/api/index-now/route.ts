import { NextResponse } from "next/server";
import { SITE_DOMAIN } from "@/config/site";

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
  "/bluewater-police-station",
];

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
 * Ping Google with sitemap URL
 */
async function pingGoogle(): Promise<{ success: boolean; message: string }> {
  try {
    const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
    const response = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);

    if (response.ok) {
      return { success: true, message: "Google: Sitemap ping successful" };
    } else {
      return { success: false, message: `Google ping error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: `Google ping error: ${error}` };
  }
}

/**
 * Ping Bing with sitemap URL (Bing index feeds DuckDuckGo)
 */
async function pingBing(): Promise<{ success: boolean; message: string }> {
  try {
    const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
    const response = await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`);

    if (response.ok) {
      return { success: true, message: "Bing: Sitemap ping successful" };
    } else {
      return { success: false, message: `Bing ping error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: `Bing ping error: ${error}` };
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
  // Optional: Add secret protection
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // If INDEXNOW_SECRET is set in env, require it
  if (process.env.INDEXNOW_SECRET && secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let urlsToSubmit = PRIORITY_URLS;

  try {
    const body = await request.json();
    if (body.urls && Array.isArray(body.urls)) {
      urlsToSubmit = body.urls;
    }
  } catch {
    // No body or invalid JSON - use default URLs
  }

  const results = await Promise.all([
    submitToIndexNow(urlsToSubmit),
    pingGoogle(),
    pingBing(),
    pingYandex(),
  ]);

  const allSuccess = results.every((r) => r.success);

  return NextResponse.json(
    {
      success: allSuccess,
      timestamp: new Date().toISOString(),
      urlsSubmitted: urlsToSubmit.length,
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
    instructions: "POST to this endpoint to submit URLs to search engines",
    priorityUrlCount: PRIORITY_URLS.length,
  });
}
