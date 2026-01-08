/**
 * Audit + fix internal blog links across all blog articles.
 *
 * Focuses on INTERNAL links:
 * - /blog/<slug> must match an existing blog slug (new-format or legacy)
 * - /<route> must match an existing Next.js route (static or dynamic)
 *
 * External links (http/https) are reported but not fetched/validated.
 */

const fs = require("fs");
const path = require("path");

const WORKSPACE = process.cwd();
const APP_DIR = path.join(WORKSPACE, "app");
const DATA_DIR = path.join(WORKSPACE, "data");
const NEW_POSTS_DIR = path.join(DATA_DIR, "blog-posts");
const LEGACY_POSTS_PATH = path.join(DATA_DIR, "blog-posts-full.json");

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

function readJson(p) {
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

function listFilesRecursive(dir) {
  /** @type {string[]} */
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    // ignore dot dirs like .next
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

function routeFromPageFile(pageFile) {
  // e.g. /workspace/app/blog/[slug]/page.tsx -> /blog/[slug]
  const rel = path.relative(APP_DIR, pageFile);
  const parts = rel.split(path.sep);
  if (parts[parts.length - 1] !== "page.tsx") return null;
  const dirParts = parts.slice(0, -1);
  const filtered = dirParts.filter((seg) => seg && !seg.startsWith("(") && !seg.endsWith(")"));
  const route = "/" + filtered.join("/");
  return route === "/" ? "/" : route.replace(/\/+$/, "");
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

    if (route.includes("[")) {
      // Convert Next-style dynamic segments to regex.
      // - [slug] matches a single segment
      // - [...slug] matches 1+ segments
      // - [[...slug]] matches 0+ segments
      const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const segments = route.split("/").filter(Boolean);
      const regexParts = segments.map((seg) => {
        if (seg.startsWith("[[...") && seg.endsWith("]]")) return "(?:/(.*))?";
        if (seg.startsWith("[...") && seg.endsWith("]")) return "/(.+)";
        if (seg.startsWith("[") && seg.endsWith("]")) return "/([^/]+)";
        return "/" + esc(seg);
      });
      const regexStr = "^" + regexParts.join("") + "/?$";
      dynamicMatchers.push({ route, regex: new RegExp(regexStr) });
    }
  }

  return { routeSet, dynamicMatchers };
}

function loadAllBlogSlugs() {
  const slugs = new Set();

  // new-format posts
  if (fs.existsSync(NEW_POSTS_DIR)) {
    for (const f of fs.readdirSync(NEW_POSTS_DIR)) {
      if (!f.endsWith(".json")) continue;
      const post = readJson(path.join(NEW_POSTS_DIR, f));
      if (post && post.status === "published" && post.slug) slugs.add(normalizeSlug(post.slug));
    }
  }

  // legacy posts
  if (fs.existsSync(LEGACY_POSTS_PATH)) {
    const legacy = readJson(LEGACY_POSTS_PATH);
    if (Array.isArray(legacy)) {
      for (const p of legacy) {
        if (p && p.published === 1 && p.slug) slugs.add(normalizeSlug(p.slug));
      }
    }
  }

  return slugs;
}

function stripQueryAndHash(href) {
  const idxQ = href.indexOf("?");
  const idxH = href.indexOf("#");
  const cut = [idxQ, idxH].filter((n) => n >= 0).sort((a, b) => a - b)[0];
  return cut === undefined ? href : href.slice(0, cut);
}

function isIgnorableHref(href) {
  if (!href) return true;
  if (href.startsWith("#")) return true;
  const lower = href.toLowerCase();
  return (
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("sms:") ||
    lower.startsWith("javascript:")
  );
}

function validateInternalPath(pathname, routeSet, dynamicMatchers, blogSlugSet) {
  if (!pathname.startsWith("/")) return { ok: true };

  const cleaned = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  // Common non-page assets
  if (
    cleaned.startsWith("/blog-images/") ||
    cleaned.startsWith("/images/") ||
    cleaned.startsWith("/_next/") ||
    cleaned.startsWith("/favicon") ||
    cleaned.startsWith("/robots") ||
    cleaned.startsWith("/sitemap")
  ) {
    return { ok: true };
  }

  if (cleaned === "/blog") return { ok: routeSet.has("/blog") };

  if (cleaned.startsWith("/blog/")) {
    const rest = cleaned.slice("/blog/".length);
    if (!rest || rest.includes("/")) {
      return { ok: false, reason: "blog_path_invalid" };
    }
    const normalized = normalizeSlug(rest);
    return blogSlugSet.has(normalized)
      ? { ok: true }
      : { ok: false, reason: "missing_blog_slug", meta: { slug: rest } };
  }

  if (routeSet.has(cleaned)) return { ok: true };

  for (const m of dynamicMatchers) {
    if (m.regex.test(cleaned)) return { ok: true };
  }

  return { ok: false, reason: "missing_route" };
}

function findBestBlogSlugFix(slug, blogSlugSet) {
  const normalized = normalizeSlug(slug);
  if (blogSlugSet.has(normalized)) return slug;

  // Try remove numeric suffix: foo-1 -> foo
  const stripped = slug.replace(/-\d+$/, "");
  if (stripped !== slug && blogSlugSet.has(normalizeSlug(stripped))) return stripped;

  // Try add common suffixes
  for (const suffix of ["-1", "-2", "-3"]) {
    const candidate = slug + suffix;
    if (blogSlugSet.has(normalizeSlug(candidate))) return candidate;
  }

  return null;
}

function fixHref(href, context) {
  const {
    routeSet,
    dynamicMatchers,
    blogSlugSet,
    replacements,
    changedCounts,
    brokenCounts,
    externalCounts,
  } = context;

  if (isIgnorableHref(href)) return { href, changed: false };

  // Keep protocol-relative URLs as external
  if (href.startsWith("//")) {
    externalCounts.set(href, (externalCounts.get(href) || 0) + 1);
    return { href, changed: false };
  }

  const lower = href.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    externalCounts.set(href, (externalCounts.get(href) || 0) + 1);
    return { href, changed: false };
  }

  if (!href.startsWith("/")) return { href, changed: false };

  const original = href;
  const base = stripQueryAndHash(href);
  const suffix = href.slice(base.length); // keep ?query/#hash if present
  let pathname = base;

  // Apply exact internal replacements on pathname only
  if (replacements[pathname]) {
    const next = replacements[pathname] + suffix;
    changedCounts.set(
      `${pathname} -> ${replacements[pathname]}`,
      (changedCounts.get(`${pathname} -> ${replacements[pathname]}`) || 0) + 1
    );
    return { href: next, changed: true };
  }

  // Fix blog slugs if broken
  if (pathname.startsWith("/blog/")) {
    const rest = pathname.slice("/blog/".length);
    if (rest && !rest.includes("/")) {
      const fixed = findBestBlogSlugFix(rest, blogSlugSet);
      if (fixed && fixed !== rest) {
        const next = `/blog/${fixed}${suffix}`;
        changedCounts.set(
          `/blog/${rest} -> /blog/${fixed}`,
          (changedCounts.get(`/blog/${rest} -> /blog/${fixed}`) || 0) + 1
        );
        return { href: next, changed: true };
      }
    }
  }

  // Validate; if broken, record it
  const res = validateInternalPath(pathname, routeSet, dynamicMatchers, blogSlugSet);
  if (!res.ok) {
    const key = `${res.reason}:${pathname}`;
    brokenCounts.set(key, (brokenCounts.get(key) || 0) + 1);
  }

  return { href: original, changed: false };
}

function rewriteHtmlHrefs(html, context) {
  if (!html || typeof html !== "string") return { html, changed: 0 };
  let changed = 0;

  const out = html.replace(/href\s*=\s*(["'])([^"']+)\1/gi, (match, quote, href) => {
    const fixed = fixHref(href, context);
    if (fixed.changed) {
      changed += 1;
      return `href=${quote}${fixed.href}${quote}`;
    }
    return match;
  });

  return { html: out, changed };
}

function main() {
  if (!fs.existsSync(LEGACY_POSTS_PATH)) {
    console.error(`Missing legacy blog file: ${LEGACY_POSTS_PATH}`);
    process.exit(1);
  }

  const { routeSet, dynamicMatchers } = buildRouteMatchers();
  const blogSlugSet = loadAllBlogSlugs();

  // High-confidence fixes only. (No guessing.)
  const replacements = {
    "/duty-solicitor": "/services/police-station-representation",
    "/voluntary-interview": "/voluntary-interviews",
  };

  const legacy = readJson(LEGACY_POSTS_PATH);
  if (!Array.isArray(legacy)) {
    console.error("Legacy blog JSON is not an array.");
    process.exit(1);
  }

  const changedCounts = new Map();
  const brokenCounts = new Map();
  const externalCounts = new Map();

  let postsScanned = 0;
  let hrefChanges = 0;

  for (const post of legacy) {
    if (!post || post.published !== 1) continue;
    postsScanned += 1;

    const ctx = {
      routeSet,
      dynamicMatchers,
      blogSlugSet,
      replacements,
      changedCounts,
      brokenCounts,
      externalCounts,
    };
    const before = post.content;
    const { html: after, changed } = rewriteHtmlHrefs(before, ctx);
    if (changed) {
      post.content = after;
      hrefChanges += changed;
    }
  }

  // Write back ONLY if we changed something
  if (hrefChanges > 0) {
    fs.writeFileSync(LEGACY_POSTS_PATH, JSON.stringify(legacy, null, 2) + "\n", "utf8");
  }

  // Print summary
  const top = (m, n = 20) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);

  console.log("--- Blog link audit & fix ---");
  console.log(`Posts scanned (published): ${postsScanned}`);
  console.log(`Internal hrefs changed: ${hrefChanges}`);

  if (changedCounts.size) {
    console.log("\nTop automatic fixes:");
    for (const [k, v] of top(changedCounts, 20)) console.log(`- ${v}x ${k}`);
  }

  if (brokenCounts.size) {
    console.log("\nRemaining broken INTERNAL links (top 30):");
    for (const [k, v] of top(brokenCounts, 30)) console.log(`- ${v}x ${k}`);
    console.log("\nNOTE: Remaining broken links were not auto-fixed (no safe mapping).");
    process.exitCode = 2;
  } else {
    console.log("\nRemaining broken INTERNAL links: 0");
  }

  // External links are just counted, not validated
  console.log(`\nExternal links seen (unique): ${externalCounts.size}`);
}

main();
