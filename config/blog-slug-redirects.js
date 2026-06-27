/**
 * Phase 2 SEO — legacy blog-slug cannibalisation remediation.
 *
 * Single source of truth for blog posts that should 301 to a canonical owner.
 * No content is deleted: the underlying legacy data file is untouched. These
 * slugs are (a) 301-redirected in next.config.js and (b) excluded from the
 * published index / sitemap / static params via lib/blog-reader.ts, so search
 * engines only ever see the canonical URL.
 *
 * See docs/seo-content-strategy.md §2 for the duplication triage.
 */
const fs = require("fs");
const path = require("path");

/** @type {{ from: string; to: string }[]} */
const BLOG_SLUG_REDIRECTS = JSON.parse(
  fs.readFileSync(path.join(__dirname, "blog-slug-redirects.json"), "utf-8"),
);

/** Next.js redirect rules (301) for next.config.js `redirects()`. */
const BLOG_REDIRECT_NEXT_RULES = BLOG_SLUG_REDIRECTS.map(({ from, to }) => ({
  source: `/blog/${from}`,
  destination: `/blog/${to}`,
  permanent: true,
}));

/** Set of source slugs to exclude from the published index/sitemap/static params. */
const BLOG_REDIRECTED_SLUGS = BLOG_SLUG_REDIRECTS.map((r) => r.from);

module.exports = {
  BLOG_SLUG_REDIRECTS,
  BLOG_REDIRECT_NEXT_RULES,
  BLOG_REDIRECTED_SLUGS,
};
