import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import {
  LEGAL_ACCURACY_SLUGS,
  auditLegalAccuracy,
} from "../scripts/audit-blog-legal-accuracy.mjs";
import { sourcesAtBottom } from "../scripts/lib/blog-sources-audit.mjs";

describe("blog legal accuracy — unfitness to interview", () => {
  it("published post passes required sources and distinctions", () => {
    const file = path.join(
      process.cwd(),
      "data/blog-posts/2026-06-20-unfitness-to-interview-pace-code-c-kent.json",
    );
    const post = JSON.parse(fs.readFileSync(file, "utf-8"));
    const result = auditLegalAccuracy(post);
    expect(result.ok, result.issues?.join("; ")).toBe(true);
  });

  it("tracks slug in LEGAL_ACCURACY_SLUGS", () => {
    expect(LEGAL_ACCURACY_SLUGS).toContain("unfitness-to-interview-pace-code-c-kent");
  });

  it("places Sources section after main content and CTA", () => {
    const file = path.join(
      process.cwd(),
      "data/blog-posts/2026-06-20-unfitness-to-interview-pace-code-c-kent.json",
    );
    const post = JSON.parse(fs.readFileSync(file, "utf-8"));
    const html = post.contentHtml;
    expect(sourcesAtBottom(html)).toBe(true);
    const ctaIdx = html.indexOf("advert-cta");
    const sourcesIdx = html.search(/<h2[^>]*>Sources<\/h2>/i);
    const conclusionIdx = html.search(/<h2[^>]*>Conclusion<\/h2>/i);
    expect(sourcesIdx).toBeGreaterThan(conclusionIdx);
    expect(sourcesIdx).toBeGreaterThan(ctaIdx);
  });
});
