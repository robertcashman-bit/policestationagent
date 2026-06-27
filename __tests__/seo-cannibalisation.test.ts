import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

type IndexPost = { slug: string };
type RedirectRule = { from: string; to: string };

function normalizeSlug(input: string): string {
  return (input || "")
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

const index: IndexPost[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, "public", "blog-posts.json"), "utf-8")
);
const redirects: RedirectRule[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, "config", "blog-slug-redirects.json"), "utf-8")
);

const publishedSlugs = new Set(index.map((p) => normalizeSlug(p.slug)));

describe("SEO cannibalisation remediation (PSA blog)", () => {
  it("no redirected slug is still published in the index", () => {
    const offenders = redirects
      .map((r) => r.from)
      .filter((from) => publishedSlugs.has(normalizeSlug(from)));
    expect(offenders).toEqual([]);
  });

  it("every redirect destination is a published canonical page", () => {
    const missing = redirects
      .map((r) => r.to)
      .filter((to) => !publishedSlugs.has(normalizeSlug(to)));
    expect(missing).toEqual([]);
  });

  it("the published index contains no duplicate slugs", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const p of index) {
      const s = normalizeSlug(p.slug);
      if (seen.has(s)) dupes.push(s);
      seen.add(s);
    }
    expect(dupes).toEqual([]);
  });

  it("inventory JSON PSA count matches the published index", () => {
    const inventoryPath = path.join(ROOT, "docs", "seo-inventory.json");
    if (!fs.existsSync(inventoryPath)) return; // optional artifact
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));
    expect(inventory.psa.length).toBe(index.length);
  });
});
