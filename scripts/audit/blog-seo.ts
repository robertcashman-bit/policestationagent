/**
 * Validates blog SEO invariants (CI-safe).
 * Run: npx tsx scripts/audit/blog-seo.ts
 */
import { BLOG_POSTS, getAllBlogSlugs } from '../../lib/blog/content';

const MIN_DESC = 120;
const MAX_DESC = 210;
const MIN_TITLE = 25;
const MAX_TITLE = 65;

function main() {
  const slugs = new Set(getAllBlogSlugs());
  const errors: string[] = [];
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();

  for (const post of BLOG_POSTS) {
    const L = (s: string) => `[${post.slug}] ${s}`;

    if (post.title.length < MIN_TITLE || post.title.length > MAX_TITLE) {
      errors.push(L(`title length ${post.title.length} (want ${MIN_TITLE}-${MAX_TITLE})`));
    }
    if (post.description.length < MIN_DESC || post.description.length > MAX_DESC) {
      errors.push(L(`description length ${post.description.length} (want ${MIN_DESC}-${MAX_DESC})`));
    }
    if (!post.keywords?.length || post.keywords.length < 3) {
      errors.push(L(`expected at least 3 keywords, got ${post.keywords?.length ?? 0}`));
    }
    if (!post.sections || post.sections.length < 3) {
      errors.push(L(`expected at least 3 sections, got ${post.sections?.length ?? 0}`));
    }
    if (!post.relatedSlugs || post.relatedSlugs.length < 2) {
      errors.push(L(`expected at least 2 relatedSlugs, got ${post.relatedSlugs?.length ?? 0}`));
    }
    for (const rel of post.relatedSlugs ?? []) {
      if (!slugs.has(rel)) errors.push(L(`relatedSlug "${rel}" not found`));
    }
    if (!post.heroImage?.src?.match(/\.(jpe?g|png)$/i)) {
      errors.push(L('heroImage must be JPEG or PNG path'));
    }
    if (!post.published) {
      errors.push(L('missing published date'));
    }

    const tKey = post.title.trim().toLowerCase();
    if (titles.has(tKey)) errors.push(L(`duplicate title with ${titles.get(tKey)}`));
    else titles.set(tKey, post.slug);

    const dKey = post.description.trim().toLowerCase();
    if (descs.has(dKey)) errors.push(L(`duplicate description with ${descs.get(dKey)}`));
    else descs.set(dKey, post.slug);
  }

  if (errors.length) {
    console.error('Blog SEO validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log(`Blog SEO OK — ${BLOG_POSTS.length} posts`);
}

main();
