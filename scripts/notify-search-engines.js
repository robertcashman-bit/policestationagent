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
  "/medway-police-station",
  "/maidstone-police-station",
  "/canterbury-police-station",
  "/ashford-police-station",
  "/tonbridge-police-station",
  "/folkestone-police-station",
  "/sevenoaks-police-station",
  "/gravesend-police-station",
  "/north-kent-gravesend-police-station",
];

async function pingGoogle() {
  console.log("📍 Pinging Google...");
  try {
    const sitemapFull = `${SITE_URL}/sitemap.xml`;
    const response = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapFull)}`);
    if (response.ok) {
      console.log("✅ Google: Sitemap ping successful");
      return true;
    } else {
      console.log(`⚠️ Google ping returned: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Google ping error: ${error.message}`);
    return false;
  }
}

async function pingBing() {
  console.log("📍 Pinging Bing (helps DuckDuckGo)...");
  try {
    const sitemapFull = `${SITE_URL}/sitemap.xml`;
    const response = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapFull)}`);
    if (response.ok) {
      console.log("✅ Bing: Sitemap ping successful");
      return true;
    } else {
      console.log(`⚠️ Bing ping returned: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Bing ping error: ${error.message}`);
    return false;
  }
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
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: PRIORITY_URLS.map((url) => `${SITE_URL}${url}`),
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow: Submitted ${PRIORITY_URLS.length} URLs`);
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
  console.log(`URLs to submit: ${PRIORITY_URLS.length}`);
  console.log("");

  const results = await Promise.all([pingGoogle(), pingBing(), pingYandex(), submitToIndexNow()]);

  console.log("");
  console.log("==========================================");

  const successCount = results.filter(Boolean).length;
  if (successCount === results.length) {
    console.log("✅ All search engines notified successfully!");
  } else {
    console.log(`⚠️ ${successCount}/${results.length} notifications succeeded`);
  }

  console.log("");
}

main().catch(console.error);
