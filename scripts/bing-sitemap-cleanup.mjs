#!/usr/bin/env node
/**
 * Bing Webmaster — clean up stale sitemaps for policestationagent.com.
 *
 * Lists every sitemap ("feed") Bing holds, removes any that no longer return
 * HTTP 200 on the live site, and ensures the two canonical sitemaps are
 * submitted. This clears the "sitemaps with errors" count.
 *
 * Requires a real Bing Webmaster API key:
 *   Bing Webmaster Tools -> Settings (gear) -> API access -> generate key
 *
 * Usage:
 *   BING_WEBMASTER_API_KEY=xxxxx node scripts/bing-sitemap-cleanup.mjs
 *   BING_WEBMASTER_API_KEY=xxxxx node scripts/bing-sitemap-cleanup.mjs --dry-run
 */

const SITE_URL = "https://www.policestationagent.com";
const CANONICAL_SITEMAPS = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/blog-sitemap.xml`,
];
const API = "https://ssl.bing.com/webmaster/api.svc/json";

const apiKey = process.env.BING_WEBMASTER_API_KEY?.trim();
const dryRun = process.argv.includes("--dry-run");

if (!apiKey) {
  console.error("❌ BING_WEBMASTER_API_KEY is not set (or empty).");
  console.error("   Generate one in Bing Webmaster Tools → Settings → API access.");
  process.exit(1);
}

async function bingGet(method, params = {}) {
  const qs = new URLSearchParams({ apikey: apiKey, ...params }).toString();
  const res = await fetch(`${API}/${method}?${qs}`);
  const data = await res.json();
  if (data.ErrorCode) throw new Error(`${method}: ${data.Message} (code ${data.ErrorCode})`);
  return data;
}

async function bingPost(method, body) {
  const res = await fetch(`${API}/${method}?apikey=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    /* some endpoints return empty body on success */
  }
  if (data.ErrorCode) throw new Error(`${method}: ${data.Message} (code ${data.ErrorCode})`);
  return data;
}

async function liveStatus(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "manual" });
    return res.status;
  } catch (e) {
    return 0;
  }
}

async function main() {
  console.log(`🔎 Bing sitemap cleanup for ${SITE_URL}${dryRun ? " (dry-run)" : ""}\n`);

  const feedsResp = await bingGet("GetFeeds", { siteUrl: SITE_URL });
  const feeds = feedsResp.d || [];
  console.log(`Bing currently holds ${feeds.length} sitemap(s):\n`);

  const toRemove = [];
  for (const feed of feeds) {
    const url = feed.Url;
    const status = await liveStatus(url);
    const ok = status === 200;
    console.log(`  ${ok ? "✅" : "🗑️ "} ${status}  ${url}`);
    if (!ok) toRemove.push(url);
  }

  console.log("");
  if (toRemove.length === 0) {
    console.log("No stale sitemaps to remove.");
  } else {
    console.log(`Removing ${toRemove.length} stale sitemap(s)...`);
    for (const url of toRemove) {
      if (dryRun) {
        console.log(`  (dry-run) would RemoveFeed: ${url}`);
        continue;
      }
      try {
        await bingPost("RemoveFeed", { siteUrl: SITE_URL, feedUrl: url });
        console.log(`  ✅ removed: ${url}`);
      } catch (e) {
        console.log(`  ⚠️ failed to remove ${url}: ${e.message}`);
      }
    }
  }

  console.log("");
  const have = new Set(feeds.map((f) => f.Url));
  for (const sm of CANONICAL_SITEMAPS) {
    if (have.has(sm)) {
      console.log(`✓ canonical already submitted: ${sm}`);
      continue;
    }
    if (dryRun) {
      console.log(`  (dry-run) would SubmitFeed: ${sm}`);
      continue;
    }
    try {
      await bingPost("SubmitFeed", { siteUrl: SITE_URL, feedUrl: sm });
      console.log(`✅ submitted canonical: ${sm}`);
    } catch (e) {
      console.log(`⚠️ failed to submit ${sm}: ${e.message}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
