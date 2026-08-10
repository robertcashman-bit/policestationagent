/**
 * Crawl internal links from key public pages on psrtrain.com (or PLAYWRIGHT_BASE_URL).
 * Usage: node scripts/qa-link-crawl.mjs
 */
const base = (process.env.PLAYWRIGHT_BASE_URL || 'https://psrtrain.com').replace(/\/$/, '');

const SEED_PATHS = [
  '/',
  '/pricing',
  '/training',
  '/features',
  '/legal/about',
  '/legal/contact',
  '/legal/faq',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer',
  '/legal-advice',
  '/auth',
];

function normalizeHref(href, pageUrl) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  try {
    const u = new URL(href, pageUrl);
    if (u.origin !== new URL(base).origin) return null;
    return u.pathname + u.search;
  } catch {
    return null;
  }
}

function extractLinks(html, pageUrl) {
  const links = [];
  const re = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const path = normalizeHref(m[1], pageUrl);
    if (!path) continue;
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
    links.push({ path, text: text || m[1] });
  }
  return links;
}

async function fetchPath(path) {
  const url = `${base}${path}`;
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  return { path, url: res.url, status: res.status, html };
}

async function main() {
  const checked = new Map();
  const broken = [];
  const queue = [...SEED_PATHS];
  const seen = new Set(SEED_PATHS);

  while (queue.length > 0) {
    const path = queue.shift();
    if (checked.has(path)) continue;
    let page;
    try {
      page = await fetchPath(path);
    } catch (e) {
      broken.push({ source: '(fetch)', link: path, target: path, status: 'ERR', result: String(e.message) });
      checked.set(path, { status: 'ERR' });
      continue;
    }
    checked.set(path, { status: page.status, finalUrl: page.url });

    if (page.status >= 400) {
      broken.push({ source: '(seed)', link: path, target: path, status: page.status, result: 'seed page failed' });
      continue;
    }

    const links = extractLinks(page.html, page.url);
    for (const { path: target, text } of links) {
      if (!target.startsWith('/')) continue;
      if (!seen.has(target) && !target.startsWith('/api') && !target.startsWith('/admin')) {
        seen.add(target);
        if (seen.size < 80) queue.push(target);
      }
      if (checked.has(target)) {
        const c = checked.get(target);
        if (c.status >= 400) {
          broken.push({ source: path, link: text, target, status: c.status, result: 'broken' });
        }
        continue;
      }
      try {
        const t = await fetch(`${base}${target}`, { redirect: 'follow', method: 'HEAD' });
        let status = t.status;
        if (status === 405) {
          const g = await fetch(`${base}${target}`, { redirect: 'follow' });
          status = g.status;
        }
        checked.set(target, { status, finalUrl: t.url });
        if (status >= 400) {
          broken.push({ source: path, link: text, target, status, result: status === 404 ? 'not found' : 'error' });
        }
      } catch (e) {
        broken.push({ source: path, link: text, target, status: 'ERR', result: e.message });
        checked.set(target, { status: 'ERR' });
      }
    }
  }

  console.log(JSON.stringify({ base, pagesChecked: checked.size, broken }, null, 2));
  process.exit(broken.length ? 1 : 0);
}

main();
