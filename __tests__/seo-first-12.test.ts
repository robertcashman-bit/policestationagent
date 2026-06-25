import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const data = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "docs", "seo-first-12-articles.json"), "utf-8")
);

// The 12 canonical-owner slugs from docs/seo-cross-site-strategy.md.
const EXPECTED = [
  ["policestationagent", "first-hour-after-arrest-kent"],
  ["policestationagent", "out-of-hours-solicitor-kent-custody"],
  ["policestationagent", "private-police-station-solicitor-cost-kent"],
  ["psrtrain", "psras-exam-format-pass-mark-2026"],
  ["psrtrain", "how-to-pass-critical-incidents-test"],
  ["psrtrain", "free-psras-practice-questions"],
  ["custodynote", "attendance-note-template-guide"],
  ["custodynote", "laa-audit-proof-attendance-notes"],
  ["custodynote", "handwritten-vs-digital-custody-notes"],
  ["policestationrepuk", "how-to-become-police-station-representative-2026"],
  ["policestationrepuk", "freelance-rep-day-rate-2026"],
  ["policestationrepuk", "building-firm-panel-freelance-reps"],
];

describe("first-12 article drafts (Phase 4)", () => {
  it("has exactly 12 drafts matching the cross-site plan", () => {
    expect(data.articles).toHaveLength(12);
    const pairs = data.articles.map((a: any) => [a.site, a.slug]);
    expect(pairs).toEqual(EXPECTED);
  });

  it("every draft is CLEAR (no cannibalising drafts)", () => {
    for (const a of data.articles) expect(a.verdict).toBe("CLEAR");
  });

  it("every draft has complete SEO metadata", () => {
    for (const a of data.articles) {
      expect(a.metaTitle.length).toBeGreaterThan(15);
      expect(a.metaTitle.length).toBeLessThanOrEqual(65);
      expect(a.metaDescription.length).toBeGreaterThanOrEqual(80);
      expect(a.metaDescription.length).toBeLessThanOrEqual(170);
      expect(a.h1.length).toBeGreaterThan(0);
      expect(a.primaryKeyword.length).toBeGreaterThan(0);
      expect(["BlogPosting", "Article"]).toContain(a.schemaType);
    }
  });

  it("every draft has a real body (sections with paragraphs)", () => {
    for (const a of data.articles) {
      expect(a.sections.length).toBeGreaterThanOrEqual(3);
      for (const s of a.sections) {
        expect(s.heading.length).toBeGreaterThan(0);
        expect(s.paragraphs.length).toBeGreaterThan(0);
        for (const p of s.paragraphs) expect(p.length).toBeGreaterThan(40);
      }
    }
  });

  it("every draft has a sources list and a valid disclaimer", () => {
    for (const a of data.articles) {
      expect(a.externalSources.length).toBeGreaterThanOrEqual(2);
      expect(Object.keys(data.disclaimerDefaults)).toContain(a.disclaimerKey);
    }
  });

  it("every draft has Buffer copy for all four platforms; X copy fits", () => {
    for (const a of data.articles) {
      const c = a.bufferCopy;
      for (const k of ["linkedin", "facebook", "twitter", "short"]) {
        expect(typeof c[k]).toBe("string");
        expect(c[k].length).toBeGreaterThan(0);
      }
      expect(c.twitter.length).toBeLessThanOrEqual(280);
    }
  });

  it("draft slugs are unique", () => {
    const slugs = data.articles.map((a: any) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("PSA first-12 slugs exist as published blog JSON files", () => {
    const blogDir = path.join(process.cwd(), "data", "blog-posts");
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
    const psaSlugs = data.articles
      .filter((a: { site: string }) => a.site === "policestationagent")
      .map((a: { slug: string }) => a.slug);
    for (const slug of psaSlugs) {
      const match = files.find((f) => f.includes(slug));
      expect(match, `missing blog JSON for ${slug}`).toBeTruthy();
      const post = JSON.parse(fs.readFileSync(path.join(blogDir, match!), "utf-8"));
      expect(post.status).toBe("published");
      expect(post.slug).toBe(slug);
    }
  });

  it("PSA first-12 slugs appear in blog index", () => {
    const index = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "public", "blog-posts.json"), "utf-8"),
    );
    const psaSlugs = data.articles
      .filter((a: { site: string }) => a.site === "policestationagent")
      .map((a: { slug: string }) => a.slug);
    for (const slug of psaSlugs) {
      expect(index.some((p: { slug: string }) => p.slug === slug), `index missing ${slug}`).toBe(
        true,
      );
    }
  });
});
