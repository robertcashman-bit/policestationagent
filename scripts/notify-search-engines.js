#!/usr/bin/env node
/**
 * Notify search engines after deploy (IndexNow, Bing Webmaster, Yandex).
 *
 * Sites: policestationagent.com + policestationrepuk.org
 *
 * Usage:
 *   node scripts/notify-search-engines.js
 *   npm run notify:search-engines
 */

const fs = require("fs");
const path = require("path");
const { REP_INDEXNOW_PATHS } = require("./rep-town-paths.cjs");
const { SEARCH_ENGINE_SITES } = require("./search-engine-sites.cjs");

const BING_BATCH_SIZE = 500;

const PRIORITY_URLS = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/blog",
  "/faq",
  "/police-stations",
  "/locations",
  "/kent-police-stations",
  "/medway-police-station",
  "/maidstone-police-station",
  "/tonbridge-police-station",
  "/canterbury-police-station",
  "/folkestone-police-station",
  "/north-kent-gravesend-police-station",
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
  "/",
  "/released-under-investigation",
  "/offences-we-deal-with",
  "/start/in-custody",
  "/start/voluntary-interview",
  "/emergency-police-station-representation",
  "/free-police-station-advice-kent",
  "/kent-police-custody-resources",
  "/resources",
  "/resources/pace-rights-guide",
  "/link-to-us",
  "/press",
  "/canwehelp",
  "/blog/is-police-station-legal-advice-free-kent",
  "/blog/police-station-rep-near-me-kent",
  "/blog/tonbridge-police-station-custody-and-interviews",
  "/blog/north-kent-gravesend-custody-legal-advice",
  "/blog/dartford-voluntary-interview-legal-advice-kent",
  "/blog/swanley-police-station-interview-advice-kent",
  "/tonbridge-police-station",
  ...REP_INDEXNOW_PATHS,
];

function normalizeSlug(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPublishedBlogSlugs() {
  const root = process.cwd();
  const slugs = new Set();
  const postsDir = path.join(root, "data", "blog-posts");
  const legacyPath = path.join(root, "data", "blog-posts-full.json");

  if (fs.existsSync(postsDir)) {
    for (const file of fs.readdirSync(postsDir)) {
      if (!file.endsWith(".json")) continue;
      try {
        const post = JSON.parse(fs.readFileSync(path.join(postsDir, file), "utf8"));
        if (post.status === "published" && post.slug) {
          slugs.add(normalizeSlug(post.slug));
        }
      } catch (error) {
        console.log(`⚠️ Could not read blog post ${file}: ${error.message}`);
      }
    }
  }

  if (fs.existsSync(legacyPath)) {
    try {
      const legacyPosts = JSON.parse(fs.readFileSync(legacyPath, "utf8"));
      for (const post of legacyPosts) {
        if (post.published === 1) {
          const slug = normalizeSlug(post.slug || post.title);
          if (slug) slugs.add(slug);
        }
      }
    } catch (error) {
      console.log(`⚠️ Could not read legacy blog posts: ${error.message}`);
    }
  }

  return Array.from(slugs).sort();
}

function getPsaUrls(siteUrl) {
  const blogUrls = getPublishedBlogSlugs().map((slug) => `/blog/${slug}`);
  return Array.from(new Set([...PRIORITY_URLS, ...blogUrls])).map((url) =>
    url.startsWith("http") ? url : `${siteUrl}${url}`,
  );
}

async function fetchSitemapUrls(sitemapUrl, maxUrls = 1000) {
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`sitemap HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null && urls.length < maxUrls) {
    urls.push(match[1].trim());
  }
  return urls;
}

async function resolveSiteUrls(site) {
  if (site.useSitemap) {
    try {
      const urls = await fetchSitemapUrls(site.sitemapUrl, site.maxSitemapUrls ?? 1000);
      console.log(`  ${site.id}: fetched ${urls.length} URLs from sitemap`);
      return urls;
    } catch (error) {
      console.log(`  ⚠️ ${site.id}: sitemap fetch failed (${error.message}) — using homepage only`);
      return [site.siteUrl];
    }
  }
  const urls = getPsaUrls(site.siteUrl);
  console.log(`  ${site.id}: ${urls.length} curated URLs`);
  return urls;
}

async function pingYandexForSite(site) {
  try {
    const response = await fetch(
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(site.sitemapUrl)}`,
    );
    if (response.ok) {
      console.log(`  ✅ Yandex: ${site.id} sitemap ping OK`);
      return true;
    }
    console.log(`  ⚠️ Yandex ${site.id}: HTTP ${response.status}`);
    return false;
  } catch (error) {
    console.log(`  ❌ Yandex ${site.id}: ${error.message}`);
    return false;
  }
}

async function submitIndexNowForSite(site, urls) {
  if (!site.indexNow) {
    console.log(`  ⏭️  IndexNow ${site.id}: no key on host — skipped`);
    return true;
  }
  try {
    const host = new URL(site.siteUrl).hostname;
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key: site.indexNow.key,
        keyLocation: site.indexNow.keyLocation,
        urlList: urls,
      }),
    });
    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`  ✅ IndexNow ${site.id}: ${urls.length} URLs`);
      return true;
    }
    const text = await response.text();
    console.log(`  ⚠️ IndexNow ${site.id}: HTTP ${response.status} - ${text.slice(0, 200)}`);
    return false;
  } catch (error) {
    console.log(`  ❌ IndexNow ${site.id}: ${error.message}`);
    return false;
  }
}

async function submitBingForSite(site, urls, apiKey) {
  const siteUrl = site.bingSiteUrl || site.siteUrl;
  const capped = site.maxBingUrls ? urls.slice(0, site.maxBingUrls) : urls;
  if (site.maxBingUrls && urls.length > site.maxBingUrls) {
    console.log(`  ℹ️  Bing ${site.id}: capped to ${site.maxBingUrls} URLs (daily quota)`);
  }
  let ok = true;
  for (let i = 0; i < capped.length; i += BING_BATCH_SIZE) {
    const batch = capped.slice(i, i + BING_BATCH_SIZE);
    try {
      const response = await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({ siteUrl, urlList: batch }),
        },
      );
      if (response.ok) {
        console.log(`  ✅ Bing ${site.id}: batch ${Math.floor(i / BING_BATCH_SIZE) + 1} (${batch.length} URLs)`);
      } else {
        const text = await response.text();
        console.log(`  ⚠️ Bing ${site.id}: HTTP ${response.status} - ${text.slice(0, 200)}`);
        ok = false;
      }
    } catch (error) {
      console.log(`  ❌ Bing ${site.id}: ${error.message}`);
      ok = false;
    }
  }
  return ok;
}

async function notifySite(site, apiKey) {
  console.log(`\n📍 ${site.id.toUpperCase()} (${site.siteUrl})`);
  const urls = await resolveSiteUrls(site);
  const results = [
    await pingYandexForSite(site),
    await submitIndexNowForSite(site, urls),
  ];
  if (apiKey) {
    results.push(await submitBingForSite(site, urls, apiKey));
  } else {
    console.log(`  ⏭️  Bing ${site.id}: no BING_WEBMASTER_API_KEY`);
    results.push(true);
  }
  return results.every(Boolean);
}

async function main() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY?.trim();
  console.log("");
  console.log("🔔 Notifying Search Engines (multi-site)");
  console.log("========================================");
  console.log(`Sites: ${SEARCH_ENGINE_SITES.map((s) => s.id).join(", ")}`);
  console.log(
    apiKey
      ? "Bing Webmaster API: configured"
      : "Bing Webmaster API: not set (IndexNow/Yandex still run)",
  );
  console.log("Google: submit sitemaps in Search Console (no public ping API).");
  console.log("");

  const siteResults = [];
  for (const site of SEARCH_ENGINE_SITES) {
    siteResults.push(await notifySite(site, apiKey));
  }

  console.log("");
  console.log("==========================================");
  const ok = siteResults.filter(Boolean).length;
  console.log(`${ok}/${siteResults.length} sites notified successfully`);
  console.log("");
}

main().catch(console.error);
