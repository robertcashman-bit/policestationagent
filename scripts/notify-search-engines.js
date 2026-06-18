#!/usr/bin/env node
/**
 * Notify Search Engines Script
 *
 * This script pings Google and Bing with the sitemap URL and submits
 * priority URLs to IndexNow after deployment.
 *
 * Usage:
 *   node scripts/notify-search-engines.js
 *   npm run notify:search-engines
 *
 * Can also be called via Vercel deploy hook or GitHub Actions.
 */

const fs = require("fs");
const path = require("path");
const { REP_INDEXNOW_PATHS } = require("./rep-town-paths.cjs");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.policestationagent.com";
const INDEXNOW_KEY = "655b1cdbce5c462b9fe51c4e19f92678";

// Priority URLs for fast indexing (Google, Bing, DuckDuckGo via Bing/IndexNow)
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
    "/free-police-station-advice-kent",
    "/kent-police-custody-resources",
  "/resources",
  "/resources/pace-rights-guide",
  "/link-to-us",
    "/press",
    "/canwehelp",
    "/blog/is-police-station-legal-advice-free-kent",
    "/blog/police-station-rep-near-me-kent",
    "/blog/dartford-voluntary-interview-legal-advice-kent",
    "/blog/swanley-police-station-interview-advice-kent",
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

function getIndexNowUrls() {
  const blogUrls = getPublishedBlogSlugs().map((slug) => `/blog/${slug}`);
  return Array.from(new Set([...PRIORITY_URLS, ...blogUrls]));
}

async function pingYandex() {
  console.log("📍 Pinging Yandex...");
  try {
    const sitemapFull = `${SITE_URL}/sitemap.xml`;
    const response = await fetch(`https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapFull)}`);
    if (response.ok) {
      console.log("✅ Yandex: Sitemap ping successful");
      return true;
    } else {
      console.log(`⚠️ Yandex ping returned: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Yandex ping error: ${error.message}`);
    return false;
  }
}

async function submitToIndexNow() {
  console.log("📍 Submitting to IndexNow...");
  try {
    const host = new URL(SITE_URL).hostname;
    const urls = getIndexNowUrls();
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map((url) => `${SITE_URL}${url}`),
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow: Submitted ${urls.length} URLs`);
      return true;
    } else {
      const text = await response.text();
      console.log(`⚠️ IndexNow returned: ${response.status} - ${text}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ IndexNow error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("");
  console.log("🔔 Notifying Search Engines of Site Update");
  console.log("==========================================");
  console.log(`Site URL: ${SITE_URL}`);
  console.log(`Sitemap: ${SITE_URL}/sitemap.xml`);
  console.log(`Blog sitemap: ${SITE_URL}/blog-sitemap.xml`);
  console.log(`LLMs file: ${SITE_URL}/llms.txt`);
  console.log(`URLs to submit: ${getIndexNowUrls().length}`);
  console.log("Google: submit sitemap.xml and blog-sitemap.xml in Search Console (no public ping API).");
  console.log("Bing: IndexNow submission covers Bing and helps DuckDuckGo discovery.");
  console.log("");

  const results = await Promise.all([pingYandex(), submitToIndexNow()]);

  console.log("");
  console.log("==========================================");

  const successCount = results.filter(Boolean).length;
  if (successCount === results.length) {
    console.log("✅ IndexNow/Yandex notifications completed successfully!");
  } else {
    console.log(`⚠️ ${successCount}/${results.length} notifications succeeded`);
  }

  console.log("");
}

main().catch(console.error);
