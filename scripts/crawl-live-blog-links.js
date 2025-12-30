/**
 * Deepest practical check: crawl LIVE policestationagent.com blog pages,
 * extract links from rendered HTML, and verify targets via HTTP.
 *
 * This catches issues that static repo checks can't (redirects, deploy drift,
 * missing pages in production, rewrites, CDN issues, etc.).
 *
 * Safe-guards:
 * - conservative concurrency
 * - caps on external checks
 * - timeouts
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://policestationagent.com';
const BLOG_API = `${SITE_ORIGIN}/api/blog/posts`;

const CONCURRENCY = Number(process.env.CRAWL_CONCURRENCY || 6);
const TIMEOUT_MS = Number(process.env.CRAWL_TIMEOUT_MS || 12000);
const MAX_POSTS = Number(process.env.CRAWL_MAX_POSTS || 250);
const MAX_EXTERNAL_UNIQUE = Number(process.env.CRAWL_MAX_EXTERNAL_UNIQUE || 150);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripQueryAndHash(href) {
  const idxQ = href.indexOf('?');
  const idxH = href.indexOf('#');
  const cut = [idxQ, idxH].filter((n) => n >= 0).sort((a, b) => a - b)[0];
  return cut === undefined ? href : href.slice(0, cut);
}

function isIgnorableHref(href) {
  if (!href) return true;
  if (href.startsWith('#')) return true;
  const lower = href.toLowerCase();
  return (
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('sms:') ||
    lower.startsWith('javascript:')
  );
}

function extractHrefsFromHtml(html) {
  /** @type {string[]} */
  const hrefs = [];
  if (!html || typeof html !== 'string') return hrefs;
  const re = /href\s*=\s*(["'])([^"']+)\1/gi;
  let m;
  while ((m = re.exec(html)) !== null) hrefs.push(m[2]);
  return hrefs;
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      ...init,
      headers: {
        'User-Agent': 'policestationagent-link-audit/1.0 (+https://policestationagent.com)',
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson(url) {
  const res = await fetchWithTimeout(url, { method: 'GET' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.json();
}

async function checkUrl(url) {
  try {
    // Try HEAD then GET
    let res = await fetchWithTimeout(url, { method: 'HEAD' });
    if (!res.ok && (res.status === 405 || res.status === 403 || res.status === 400)) {
      res = await fetchWithTimeout(url, { method: 'GET' });
    }
    return { ok: res.ok, status: res.status, finalUrl: res.url };
  } catch (e) {
    return { ok: false, error: e && e.name === 'AbortError' ? 'timeout' : 'network_error' };
  }
}

async function runPool(items, worker, concurrency) {
  let idx = 0;
  /** @type {any[]} */
  const results = [];
  async function runner() {
    while (idx < items.length) {
      const cur = items[idx++];
      results.push(await worker(cur));
      // tiny jitter to be polite
      await sleep(25);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runner()));
  return results;
}

async function main() {
  console.log(`Live crawl target: ${SITE_ORIGIN}`);

  let postsResponse;
  try {
    postsResponse = await fetchJson(BLOG_API);
  } catch (e) {
    console.error(`Failed to fetch blog API at ${BLOG_API}.`);
    console.error(String(e));
    process.exit(1);
  }

  const posts = Array.isArray(postsResponse.posts) ? postsResponse.posts : [];
  const slugs = posts
    .map((p) => (p && p.slug ? String(p.slug) : ''))
    .filter(Boolean)
    .slice(0, MAX_POSTS);

  console.log(`Blog posts from API: ${posts.length}`);
  console.log(`Slugs to crawl (cap ${MAX_POSTS}): ${slugs.length}`);

  /** @type {Map<string, number>} */
  const pageStatusCounts = new Map();
  /** @type {Map<string, number>} */
  const brokenTargets = new Map();
  /** @type {Map<string, number>} */
  const redirectTargets = new Map();
  /** @type {Map<string, number>} */
  const externalTargets = new Map();

  /** @type {{slug:string, url:string, status?:number, ok:boolean, error?:string, hrefs:number}[]} */
  const pageSummaries = [];

  // Crawl each blog page, extract hrefs
  await runPool(
    slugs,
    async (slug) => {
      const url = `${SITE_ORIGIN}/blog/${slug}`;
      let res;
      try {
        res = await fetchWithTimeout(url, { method: 'GET' });
      } catch (e) {
        pageSummaries.push({ slug, url, ok: false, error: e && e.name === 'AbortError' ? 'timeout' : 'network_error', hrefs: 0 });
        pageStatusCounts.set('fetch_error', (pageStatusCounts.get('fetch_error') || 0) + 1);
        return;
      }

      pageStatusCounts.set(String(res.status), (pageStatusCounts.get(String(res.status)) || 0) + 1);
      if (!res.ok) {
        pageSummaries.push({ slug, url, ok: false, status: res.status, hrefs: 0 });
        return;
      }

      const html = await res.text();
      const hrefs = extractHrefsFromHtml(html).filter((h) => !isIgnorableHref(h));
      pageSummaries.push({ slug, url, ok: true, status: res.status, hrefs: hrefs.length });

      for (const href of hrefs) {
        const lower = href.toLowerCase();
        const isExternal = href.startsWith('//') || lower.startsWith('http://') || lower.startsWith('https://');
        if (isExternal) {
          const full = href.startsWith('//') ? `https:${href}` : href;
          externalTargets.set(full, (externalTargets.get(full) || 0) + 1);
          continue;
        }
        if (!href.startsWith('/')) continue;

        const pathname = stripQueryAndHash(href);
        // ignore common assets
        if (pathname.startsWith('/_next/') || pathname.startsWith('/blog-images/') || pathname.startsWith('/images/')) continue;

        // Track internal targets by path
        brokenTargets.set(pathname, (brokenTargets.get(pathname) || 0) + 0); // ensure key exists
      }
    },
    CONCURRENCY
  );

  // Validate internal targets via HTTP
  const internalTargets = Array.from(brokenTargets.keys()).sort();
  console.log(`Unique internal targets to validate: ${internalTargets.length}`);

  const internalResults = await runPool(
    internalTargets,
    async (pathname) => {
      const url = `${SITE_ORIGIN}${pathname}`;
      const r = await checkUrl(url);
      return { pathname, url, ...r };
    },
    CONCURRENCY
  );

  brokenTargets.clear();
  for (const r of internalResults) {
    if (!r.ok) {
      const key = r.error ? `${r.error}:${r.pathname}` : `http_${r.status}:${r.pathname}`;
      brokenTargets.set(key, (brokenTargets.get(key) || 0) + 1);
    } else if (r.finalUrl && r.finalUrl !== r.url) {
      const key = `${r.pathname} -> ${r.finalUrl}`;
      redirectTargets.set(key, (redirectTargets.get(key) || 0) + 1);
    }
  }

  // Validate external targets (cap unique)
  const externalUnique = Array.from(externalTargets.keys()).slice(0, MAX_EXTERNAL_UNIQUE);
  console.log(`Unique external targets to validate (cap ${MAX_EXTERNAL_UNIQUE}): ${externalUnique.length}`);

  const externalResults = await runPool(
    externalUnique,
    async (url) => ({ url, ...(await checkUrl(url)) }),
    Math.min(CONCURRENCY, 4) // be extra gentle to external sites
  );

  /** @type {Map<string, number>} */
  const externalBroken = new Map();
  for (const r of externalResults) {
    if (!r.ok) {
      const key = r.error ? `${r.error}:${r.url}` : `http_${r.status}:${r.url}`;
      externalBroken.set(key, (externalBroken.get(key) || 0) + 1);
    }
  }

  const top = (m, n = 25) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);

  console.log('\n--- Live crawl summary ---');
  console.log('Blog page HTTP statuses (count):');
  for (const [k, v] of top(pageStatusCounts, 50)) console.log(`- ${v}x ${k}`);

  console.log(`\nBroken INTERNAL targets (unique): ${brokenTargets.size}`);
  if (brokenTargets.size) {
    console.log('Top broken internal targets:');
    for (const [k, v] of top(brokenTargets, 30)) console.log(`- ${v}x ${k}`);
  }

  console.log(`\nRedirecting INTERNAL targets (unique): ${redirectTargets.size}`);
  if (redirectTargets.size) {
    console.log('Top redirects (up to 20):');
    for (const [k, v] of top(redirectTargets, 20)) console.log(`- ${v}x ${k}`);
  }

  console.log(`\nExternal targets found (unique): ${externalTargets.size}`);
  console.log(`External targets checked (unique): ${externalUnique.length}`);
  console.log(`Broken external checks (unique): ${externalBroken.size}`);
  if (externalBroken.size) {
    console.log('Top broken external (up to 20):');
    for (const [k, v] of top(externalBroken, 20)) console.log(`- ${v}x ${k}`);
  }

  const report = {
    siteOrigin: SITE_ORIGIN,
    crawledAt: new Date().toISOString(),
    blogApi: BLOG_API,
    postsFromApi: posts.length,
    slugsCrawled: slugs.length,
    pageStatusCounts: Object.fromEntries(pageStatusCounts),
    internalTargetsValidated: internalTargets.length,
    brokenInternal: Object.fromEntries(brokenTargets),
    redirectsInternal: Object.fromEntries(redirectTargets),
    externalTargetsUnique: externalTargets.size,
    externalTargetsChecked: externalUnique.length,
    brokenExternal: Object.fromEntries(externalBroken),
    pageSummaries,
  };

  const outPath = path.join(WORKSPACE, 'playwright-results', 'live-blog-link-audit.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(`\nWrote report: ${outPath}`);

  // Non-zero if internal targets broken
  if (brokenTargets.size) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

