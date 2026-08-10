/**
 * Validates guide SEO invariants (CI-safe).
 * Run: npx tsx scripts/audit/guides-seo.ts
 */
import { GUIDES, getAllGuideSlugs } from '../../lib/guides/content';

const MIN_DESC = 120;
const MAX_DESC = 165;
const MIN_TITLE = 25;
const MAX_TITLE = 65;

function main() {
  const slugs = new Set(getAllGuideSlugs());
  const errors: string[] = [];
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();

  for (const g of GUIDES) {
    const L = (s: string) => `[${g.slug}] ${s}`;

    if (g.title.length < MIN_TITLE || g.title.length > MAX_TITLE) {
      errors.push(L(`title length ${g.title.length} (want ${MIN_TITLE}-${MAX_TITLE})`));
    }
    if (g.description.length < MIN_DESC || g.description.length > MAX_DESC) {
      errors.push(L(`description length ${g.description.length} (want ${MIN_DESC}-${MAX_DESC})`));
    }
    if (!g.keywords?.length || g.keywords.length < 3) {
      errors.push(L(`expected at least 3 keywords, got ${g.keywords?.length ?? 0}`));
    }
    if (!g.faqs || g.faqs.length < 3) {
      errors.push(L(`expected at least 3 FAQs, got ${g.faqs?.length ?? 0}`));
    }
    if (!g.sections || g.sections.length < 3) {
      errors.push(L(`expected at least 3 sections, got ${g.sections?.length ?? 0}`));
    }
    if (!g.relatedSlugs || g.relatedSlugs.length < 2) {
      errors.push(L(`expected at least 2 relatedSlugs, got ${g.relatedSlugs?.length ?? 0}`));
    }
    for (const rel of g.relatedSlugs ?? []) {
      if (!slugs.has(rel)) errors.push(L(`relatedSlug "${rel}" not found`));
    }
    if (!g.heroImage?.src?.match(/\.(jpe?g|png)$/i)) {
      errors.push(L('heroImage must be JPEG or PNG path'));
    }

    const tKey = g.title.trim().toLowerCase();
    if (titles.has(tKey)) errors.push(L(`duplicate title with ${titles.get(tKey)}`));
    else titles.set(tKey, g.slug);

    const dKey = g.description.trim().toLowerCase();
    if (descs.has(dKey)) errors.push(L(`duplicate description with ${descs.get(dKey)}`));
    else descs.set(dKey, g.slug);
  }

  if (errors.length) {
    console.error('Guides SEO validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log(`Guides SEO OK — ${GUIDES.length} guides`);
}

main();
