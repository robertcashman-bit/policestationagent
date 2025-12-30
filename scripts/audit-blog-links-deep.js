/**
 * Deep blog link audit (read-only).
 *
 * Scans:
 * - New-format posts: /data/blog-posts/*.json (contentHtml)
 * - Legacy posts: /data/blog-posts-full*.json (content)
 * - Public mirrors (if present): /public/blog-posts*.json
 * - Static snapshots: /data/blog-posts-static.json (if it contains content)
 *
 * Reports:
 * - Broken INTERNAL links (routes missing, blog slugs missing)
 * - External link health (optional network check; best-effort)
 *
 * Notes:
 * - Network may be restricted in some environments; external checks may show as "network_error".
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const APP_DIR = path.join(WORKSPACE, 'app');
const DATA_DIR = path.join(WORKSPACE, 'data');
const PUBLIC_DIR = path.join(WORKSPACE, 'public');

const NEW_POSTS_DIR = path.join(DATA_DIR, 'blog-posts');
const LEGACY_CANDIDATES = [
  path.join(DATA_DIR, 'blog-posts-full.json'),
  path.join(DATA_DIR, 'blog-posts-full-restored.json'),
  path.join(DATA_DIR, 'blog-posts-static.json'),
  path.join(DATA_DIR, 'blog-posts.json'),
];
const PUBLIC_CANDIDATES = [
  path.join(PUBLIC_DIR, 'blog-posts.json'),
  path.join(PUBLIC_DIR, 'blog-posts-full.json'),
  path.join(PUBLIC_DIR, 'blog-posts-full-restored.json'),
];

function normalizeSlug(input) {
  if (!input || typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readJsonSafe(p) {
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function listFilesRecursive(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

function routeFromPageFile(pageFile) {
  const rel = path.relative(APP_DIR, pageFile);
  const parts = rel.split(path.sep);
  if (parts[parts.length - 1] !== 'page.tsx') return null;
  const dirParts = parts.slice(0, -1);
  const filtered = dirParts.filter((seg) => seg && !seg.startsWith('(') && !seg.endsWith(')'));
  const route = '/' + filtered.join('/');
  return route === '/' ? '/' : route.replace(/\/+$/, '');
}

function buildRouteMatchers() {
  const pageFiles = listFilesRecursive(APP_DIR).filter((f) => f.endsWith(`${path.sep}page.tsx`));
  const routeSet = new Set();
  /** @type {{route:string, regex:RegExp}[]} */
  const dynamicMatchers = [];

  for (const f of pageFiles) {
    const route = routeFromPageFile(f);
    if (!route) continue;
    routeSet.add(route);

    if (route.includes('[')) {
      const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const segments = route.split('/').filter(Boolean);
      const regexParts = segments.map((seg) => {
        if (seg.startsWith('[[...') && seg.endsWith(']]')) return '(?:/(.*))?';
        if (seg.startsWith('[...') && seg.endsWith(']')) return '/(.+)';
        if (seg.startsWith('[') && seg.endsWith(']')) return '/([^/]+)';
        return '/' + esc(seg);
      });
      dynamicMatchers.push({ route, regex: new RegExp('^' + regexParts.join('') + '/?$') });
    }
  }

  return { routeSet, dynamicMatchers };
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

function validateInternalPath(pathname, routeSet, dynamicMatchers, blogSlugSet) {
  if (!pathname.startsWith('/')) return { ok: true, kind: 'not_internal' };

  const cleaned = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  // Allow common asset paths
  if (
    cleaned.startsWith('/blog-images/') ||
    cleaned.startsWith('/images/') ||
    cleaned.startsWith('/_next/') ||
    cleaned.startsWith('/favicon') ||
    cleaned.startsWith('/robots') ||
    cleaned.startsWith('/sitemap') ||
    cleaned.startsWith('/manifest')
  ) {
    return { ok: true, kind: 'asset' };
  }

  if (cleaned === '/blog') return { ok: routeSet.has('/blog'), kind: 'route' };

  if (cleaned.startsWith('/blog/')) {
    const rest = cleaned.slice('/blog/'.length);
    if (!rest || rest.includes('/')) return { ok: false, kind: 'blog', reason: 'blog_path_invalid' };
    const normalized = normalizeSlug(rest);
    return blogSlugSet.has(normalized)
      ? { ok: true, kind: 'blog' }
      : { ok: false, kind: 'blog', reason: 'missing_blog_slug', meta: { slug: rest } };
  }

  if (routeSet.has(cleaned)) return { ok: true, kind: 'route' };
  for (const m of dynamicMatchers) if (m.regex.test(cleaned)) return { ok: true, kind: 'route_dynamic' };

  return { ok: false, kind: 'route', reason: 'missing_route' };
}

function extractHrefsFromHtml(html) {
  /** @type {string[]} */
  const hrefs = [];
  if (!html || typeof html !== 'string') return hrefs;

  const re = /href\s*=\s*(["'])([^"']+)\1/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    hrefs.push(m[2]);
  }
  return hrefs;
}

function loadBlogSlugSetFromAllSources() {
  const slugs = new Set();

  // New-format posts
  if (fs.existsSync(NEW_POSTS_DIR)) {
    for (const f of fs.readdirSync(NEW_POSTS_DIR)) {
      if (!f.endsWith('.json')) continue;
      const post = readJsonSafe(path.join(NEW_POSTS_DIR, f));
      if (post && post.status === 'published' && post.slug) slugs.add(normalizeSlug(post.slug));
    }
  }

  // Legacy candidates
  for (const p of [...LEGACY_CANDIDATES, ...PUBLIC_CANDIDATES]) {
    if (!fs.existsSync(p)) continue;
    const json = readJsonSafe(p);
    if (!json) continue;
    if (Array.isArray(json)) {
      for (const post of json) {
        if (!post) continue;
        const published = post.published === 1 || post.status === 'published';
        if (!published) continue;
        if (post.slug) slugs.add(normalizeSlug(post.slug));
      }
    } else if (json && Array.isArray(json.posts)) {
      for (const post of json.posts) {
        if (!post) continue;
        if (post.slug) slugs.add(normalizeSlug(post.slug));
      }
    }
  }

  return slugs;
}

function collectBlogDocs() {
  /** @type {{source:string, id:string, slug?:string, html:string}[]} */
  const docs = [];

  // New-format posts
  if (fs.existsSync(NEW_POSTS_DIR)) {
    for (const f of fs.readdirSync(NEW_POSTS_DIR)) {
      if (!f.endsWith('.json')) continue;
      const full = path.join(NEW_POSTS_DIR, f);
      const post = readJsonSafe(full);
      if (!post || post.status !== 'published') continue;
      docs.push({
        source: path.relative(WORKSPACE, full),
        id: String(post.id || f),
        slug: post.slug,
        html: String(post.contentHtml || ''),
      });
    }
  }

  // Legacy + public candidates
  for (const p of [...LEGACY_CANDIDATES, ...PUBLIC_CANDIDATES]) {
    if (!fs.existsSync(p)) continue;
    const json = readJsonSafe(p);
    if (!json) continue;

    if (Array.isArray(json)) {
      for (const post of json) {
        const published = post && (post.published === 1 || post.status === 'published');
        if (!published) continue;
        const html = post.contentHtml || post.content || '';
        if (typeof html !== 'string') continue;
        docs.push({
          source: path.relative(WORKSPACE, p),
          id: String(post.id ?? post.slug ?? 'unknown'),
          slug: post.slug,
          html,
        });
      }
    } else if (json && Array.isArray(json.posts)) {
      for (const post of json.posts) {
        const html = post && (post.contentHtml || post.content || '');
        if (typeof html !== 'string') continue;
        docs.push({
          source: path.relative(WORKSPACE, p),
          id: String(post.id ?? post.slug ?? 'unknown'),
          slug: post.slug,
          html,
        });
      }
    }
  }

  return docs;
}

async function checkExternalUrls(urls, opts) {
  const timeoutMs = opts.timeoutMs ?? 12000;
  const concurrency = opts.concurrency ?? 10;
  const maxToCheck = opts.maxToCheck ?? 300;

  const unique = Array.from(new Set(urls));
  const sliced = unique.slice(0, maxToCheck);
  const skipped = unique.length - sliced.length;

  /** @type {Map<string, {ok:boolean, status?:number, finalUrl?:string, error?:string}>} */
  const results = new Map();

  let idx = 0;
  async function worker() {
    while (idx < sliced.length) {
      const current = sliced[idx++];
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        // Try HEAD first; fall back to GET if HEAD fails (some sites block HEAD).
        let res = await fetch(current, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
        if (!res.ok && (res.status === 405 || res.status === 403 || res.status === 400)) {
          res = await fetch(current, { method: 'GET', redirect: 'follow', signal: controller.signal });
        }
        results.set(current, {
          ok: res.ok,
          status: res.status,
          finalUrl: res.url,
        });
      } catch (e) {
        results.set(current, { ok: false, error: e && e.name === 'AbortError' ? 'timeout' : 'network_error' });
      } finally {
        clearTimeout(t);
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, sliced.length) }, () => worker());
  await Promise.all(workers);

  return { results, skipped };
}

async function main() {
  const { routeSet, dynamicMatchers } = buildRouteMatchers();
  const blogSlugSet = loadBlogSlugSetFromAllSources();
  const docs = collectBlogDocs();

  /** @type {Map<string, number>} */
  const brokenInternal = new Map();
  /** @type {Map<string, number>} */
  const internalKinds = new Map();
  /** @type {string[]} */
  const externalUrls = [];

  let totalDocs = 0;
  let totalHrefs = 0;
  let internalHrefs = 0;
  let externalHrefs = 0;

  for (const doc of docs) {
    totalDocs += 1;
    const hrefs = extractHrefsFromHtml(doc.html);
    totalHrefs += hrefs.length;

    for (const href of hrefs) {
      if (isIgnorableHref(href)) continue;

      const lower = href.toLowerCase();
      if (href.startsWith('//') || lower.startsWith('http://') || lower.startsWith('https://')) {
        externalHrefs += 1;
        externalUrls.push(href.startsWith('//') ? `https:${href}` : href);
        continue;
      }

      if (href.startsWith('/')) {
        internalHrefs += 1;
        const pathname = stripQueryAndHash(href);
        const res = validateInternalPath(pathname, routeSet, dynamicMatchers, blogSlugSet);
        internalKinds.set(res.kind, (internalKinds.get(res.kind) || 0) + 1);
        if (!res.ok) {
          const key = `${res.reason}:${pathname}`;
          brokenInternal.set(key, (brokenInternal.get(key) || 0) + 1);
        }
      }
    }
  }

  // External checks (best-effort)
  const uniqueExternal = Array.from(new Set(externalUrls));
  const externalCheck = await checkExternalUrls(uniqueExternal, {
    timeoutMs: 12000,
    concurrency: 10,
    maxToCheck: 300,
  });

  const extOk = [];
  const extBadStatus = [];
  const extTimeout = [];
  const extNetwork = [];

  for (const [url, r] of externalCheck.results.entries()) {
    if (r.ok) extOk.push(url);
    else if (r.error === 'timeout') extTimeout.push(url);
    else if (r.error) extNetwork.push(url);
    else extBadStatus.push(url);
  }

  const top = (m, n = 25) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);

  console.log('--- Deep blog link audit ---');
  console.log(`Documents scanned: ${totalDocs}`);
  console.log(`Total hrefs found: ${totalHrefs}`);
  console.log(`Internal hrefs: ${internalHrefs}`);
  console.log(`External hrefs: ${externalHrefs}`);

  console.log('\nInternal link classification:');
  for (const [k, v] of top(internalKinds, 50)) console.log(`- ${v}x ${k}`);

  console.log(`\nBroken INTERNAL hrefs (unique): ${brokenInternal.size}`);
  if (brokenInternal.size) {
    console.log('Top broken internal targets:');
    for (const [k, v] of top(brokenInternal, 30)) console.log(`- ${v}x ${k}`);
  }

  console.log('\nExternal link health (best-effort):');
  console.log(`- Unique external URLs found: ${uniqueExternal.length}`);
  if (externalCheck.skipped > 0) console.log(`- Skipped external checks (cap): ${externalCheck.skipped}`);
  console.log(`- OK (2xx): ${extOk.length}`);
  console.log(`- Bad HTTP status: ${extBadStatus.length}`);
  console.log(`- Timeout: ${extTimeout.length}`);
  console.log(`- Network error (DNS/block/etc.): ${extNetwork.length}`);

  if (extBadStatus.length) {
    console.log('\nTop external bad-status URLs (up to 20):');
    for (const u of extBadStatus.slice(0, 20)) {
      const r = externalCheck.results.get(u);
      console.log(`- ${r && r.status ? r.status : 'status?'} ${u}`);
    }
  }
  if (extTimeout.length) {
    console.log('\nTop external timeouts (up to 20):');
    for (const u of extTimeout.slice(0, 20)) console.log(`- timeout ${u}`);
  }
  if (extNetwork.length) {
    console.log('\nTop external network errors (up to 20):');
    for (const u of extNetwork.slice(0, 20)) console.log(`- network_error ${u}`);
  }

  // Exit code indicates whether broken internals were found
  if (brokenInternal.size) process.exitCode = 2;
}

main().catch((e) => {
  console.error('Audit failed:', e);
  process.exit(1);
});

