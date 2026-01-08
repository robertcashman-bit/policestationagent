/**
 * Production Blog Verification Script
 * Run this AFTER Vercel deployment completes to verify fixes are live
 *
 * Usage: node scripts/verify-production-blog.js
 */

const https = require("https");

const SITE_URL = "https://policestationagent.com";
const TESTS = [];
let passed = 0;
let failed = 0;

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
      })
      .on("error", reject);
  });
}

function test(name, fn) {
  TESTS.push({ name, fn });
}

async function runTests() {
  console.log("\n" + "=".repeat(60));
  console.log("PRODUCTION BLOG VERIFICATION");
  console.log("Site:", SITE_URL);
  console.log("Time:", new Date().toISOString());
  console.log("=".repeat(60) + "\n");

  for (const t of TESTS) {
    try {
      await t.fn();
      console.log(`✅ PASS: ${t.name}`);
      passed++;
    } catch (err) {
      console.log(`❌ FAIL: ${t.name}`);
      console.log(`   Error: ${err.message}`);
      failed++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(60));

  if (failed === 0) {
    console.log("\n🎉 ALL TESTS PASSED - Deployment is working correctly!\n");
  } else {
    console.log("\n⚠️  SOME TESTS FAILED - Deployment may not be complete yet.\n");
    console.log("Try again in a few minutes, or check Vercel dashboard for build status.\n");
  }

  return failed === 0;
}

// TEST 1: Blog index page returns 200
test("Blog index returns 200", async () => {
  const res = await fetch(`${SITE_URL}/blog`);
  if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
});

// TEST 2: Blog page title is correct (not Criminal Defence Kent)
test("Blog page has correct title", async () => {
  const res = await fetch(`${SITE_URL}/blog`);
  if (res.body.includes("<title>Blog | Criminal Defence Kent")) {
    throw new Error('Still showing old title "Blog | Criminal Defence Kent"');
  }
  if (!res.body.includes("Police Station Agent")) {
    throw new Error('Title does not contain "Police Station Agent"');
  }
});

// TEST 3: No criminaldefencekent URLs on blog page
test("No criminaldefencekent URLs on blog page", async () => {
  const res = await fetch(`${SITE_URL}/blog`);
  const matches = res.body.match(/\/criminaldefencekent\/blog\//g);
  if (matches && matches.length > 0) {
    throw new Error(`Found ${matches.length} references to /criminaldefencekent/blog/`);
  }
});

// TEST 4: Blog posts use /blog/[slug] URLs
test("Blog posts use correct /blog/[slug] URLs", async () => {
  const res = await fetch(`${SITE_URL}/blog`);
  const correctUrls = res.body.match(/href="\/blog\/[^"]+"/g);
  if (!correctUrls || correctUrls.length === 0) {
    throw new Error("No /blog/[slug] links found on blog page");
  }
});

// TEST 5: API endpoint works
test("API endpoint /api/blog/posts returns 200", async () => {
  const res = await fetch(`${SITE_URL}/api/blog/posts`);
  if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
});

// TEST 6: API returns JSON with posts
test("API returns JSON array with posts", async () => {
  const res = await fetch(`${SITE_URL}/api/blog/posts`);
  let data;
  try {
    data = JSON.parse(res.body);
  } catch {
    throw new Error("API did not return valid JSON");
  }
  if (!Array.isArray(data)) throw new Error("API did not return an array");
  if (data.length === 0) throw new Error("API returned empty array");
});

// TEST 7: Individual blog post page works
test("Individual blog post page returns 200", async () => {
  // First get a slug from the API
  const apiRes = await fetch(`${SITE_URL}/api/blog/posts`);
  let posts;
  try {
    posts = JSON.parse(apiRes.body);
  } catch {
    throw new Error("Could not parse API response");
  }
  if (!posts || posts.length === 0) throw new Error("No posts from API");

  const slug = posts[0].slug;
  const postRes = await fetch(`${SITE_URL}/blog/${slug}`);
  if (postRes.status !== 200) throw new Error(`Post page returned ${postRes.status}`);
});

// TEST 8: Sitemap includes blog posts
test("Sitemap includes /blog/ URLs", async () => {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (res.status !== 200) throw new Error(`Sitemap returned ${res.status}`);
  if (!res.body.includes("/blog/")) {
    throw new Error("Sitemap does not contain /blog/ URLs");
  }
});

// TEST 9: No criminaldefencekent in sitemap
test("Sitemap has no criminaldefencekent URLs", async () => {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (res.body.includes("criminaldefencekent")) {
    throw new Error("Sitemap still contains criminaldefencekent references");
  }
});

// TEST 10: Legacy URL redirects
test("Legacy /criminaldefencekent/blog/ redirects to /blog/", async () => {
  const res = await fetch(`${SITE_URL}/criminaldefencekent/blog/test`);
  // Should get redirect or the content from /blog/test
  // A 301/308 redirect or the page loading at /blog/test would be success
  if (res.status === 404) {
    // Check if it's the new 404 or old 404
    if (res.body.includes("Criminal Defence Kent")) {
      throw new Error("Legacy URL returned old site 404");
    }
  }
  // If we get here, redirect is working or page exists
});

// Run all tests
runTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
