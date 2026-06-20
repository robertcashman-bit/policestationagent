import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { auditPostForPublish } from "../scripts/lib/legal-publish-audit.mjs";
import { loadPaceRegistry, loadCaseRegistry } from "../scripts/lib/legal-content-scanner.mjs";
import {
  auditGlobalForbiddenClaims,
  auditPaceCitations,
} from "../scripts/lib/pace-citation-audit.mjs";
import { LEGAL_ACCURACY_SLUGS, auditLegalAccuracy } from "../scripts/audit-blog-legal-accuracy.mjs";

describe("legal accuracy — unfitness post", () => {
  it("published post passes publish audit", () => {
    const file = path.join(
      process.cwd(),
      "data/blog-posts/2026-06-20-unfitness-to-interview-pace-code-c-kent.json",
    );
    const post = JSON.parse(fs.readFileSync(file, "utf-8"));
    const result = auditPostForPublish(post);
    expect(result.ok, result.issues?.join("; ")).toBe(true);
  });

  it("tracks slug in LEGAL_ACCURACY_SLUGS", () => {
    expect(LEGAL_ACCURACY_SLUGS).toContain("unfitness-to-interview-pace-code-c-kent");
  });

  it("auditLegalAccuracy passes for unfitness post", () => {
    const file = path.join(
      process.cwd(),
      "data/blog-posts/2026-06-20-unfitness-to-interview-pace-code-c-kent.json",
    );
    const post = JSON.parse(fs.readFileSync(file, "utf-8"));
    const result = auditLegalAccuracy(post);
    expect(result.ok, result.issues?.join("; ")).toBe(true);
  });
});

describe("PACE reference registry", () => {
  it("every entry has officialUrl and verifiedSummary", () => {
    for (const entry of loadPaceRegistry()) {
      expect(entry.officialUrl, entry.id).toMatch(/^https:\/\//);
      expect(entry.verifiedSummary?.length, entry.id).toBeGreaterThan(10);
    }
  });

  it("flags s.58 weight-of-evidence misquote", () => {
    const bad =
      "The court will consider section 58 of PACE when assessing the weight of that evidence.";
    const issues = auditGlobalForbiddenClaims(bad, "test");
    expect(issues.some((i) => i.severity === "error")).toBe(true);
  });

  it("pace-s58 registry rejects weight-of-evidence claims", () => {
    const bad = "Section 58 of PACE affects the weight of evidence in court.";
    const issues = auditPaceCitations(bad, "test");
    expect(issues.some((i) => i.severity === "error")).toBe(true);
  });
});

describe("blog generator legal tail", () => {
  it("wraps generated HTML with Sources and disclaimer for audit", async () => {
    const { wrapGeneratedBlogHtml } = await import("../scripts/lib/blog-legal-tail.mjs");
    const { auditPostForPublish } = await import("../scripts/lib/legal-publish-audit.mjs");
    const wrapped = wrapGeneratedBlogHtml("<h2>Test topic</h2><p>PACE section 58 rights.</p>", "Test topic");
    const result = auditPostForPublish({
      title: "Test topic",
      slug: "test-topic",
      contentHtml: wrapped,
      faq: [{ q: "Q?", a: "A." }],
    });
    expect(result.ok, result.issues?.join("; ")).toBe(true);
  });
});
  it("every entry has citations and verifiedHolding", () => {
    for (const entry of loadCaseRegistry()) {
      expect(entry.citations?.length, entry.id).toBeGreaterThan(0);
      expect(entry.verifiedHolding?.length, entry.id).toBeGreaterThan(10);
    }
  });
});
