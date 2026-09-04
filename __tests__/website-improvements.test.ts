import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LOCAL_COVER_PAGES } from "@/lib/seo/local-cover-data";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("SEO robots and sitemap improvements", () => {
  it("sitemap includes loved-one guide and excludes christmas/join", () => {
    const sitemap = fs.readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain("${baseUrl}/what-to-do-if-a-loved-one-is-arrested");
    expect(sitemap).not.toContain("${baseUrl}/christmashours");
    expect(sitemap).not.toContain("${baseUrl}/join");
    expect(sitemap).toContain("${baseUrl}/hours");
  });

  it("join is noindex,follow", () => {
    const page = fs.readFileSync(path.join(root, "app/join/page.tsx"), "utf8");
    expect(page).toMatch(/robots:\s*\{[\s\S]*index:\s*false[\s\S]*follow:\s*true/);
  });

  it("christmashours redirects permanently to /hours", () => {
    const nextConfig = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
    expect(nextConfig).toMatch(/source:\s*"\/christmashours"/);
    expect(nextConfig).toMatch(/destination:\s*"\/hours"/);
    expect(nextConfig).toMatch(/permanent:\s*true/);
  });

  it("christmashours page metadata is noindex as defense-in-depth", () => {
    const page = fs.readFileSync(path.join(root, "app/christmashours/page.tsx"), "utf8");
    expect(page).toMatch(/robots:\s*\{[\s\S]*index:\s*false[\s\S]*follow:\s*true/);
  });
});

describe("station cover pathway CTAs", () => {
  it("every local cover page declares a primary pathway", () => {
    for (const [key, config] of Object.entries(LOCAL_COVER_PAGES)) {
      expect(
        config.primaryPathway === "voluntary" || config.primaryPathway === "custody",
        `${key} missing primaryPathway`,
      ).toBe(true);
    }
  });

  it("Maidstone is explicit VAI-only in title/h1/meta", () => {
    const m = LOCAL_COVER_PAGES.maidstone;
    expect(m.title).toMatch(/VAI only/i);
    expect(m.h1).toMatch(/VAI only/i);
    expect(m.metaDescription).toMatch(/not a (public )?custody suite/i);
    expect(m.primaryPathway).toBe("voluntary");
  });

  it("LocalCoverPage routes VAI to voluntary-interviews and custody to current-custody", () => {
    const src = fs.readFileSync(
      path.join(root, "components/local/LocalCoverPage.tsx"),
      "utf8",
    );
    expect(src).toContain('/voluntary-interviews#request');
    expect(src).toContain('/current-custody');
    expect(src).toContain('/for-solicitors');
    expect(src).not.toMatch(/Solicitor SMS \(Contact\)/);
    expect(src).not.toMatch(/Telephone and instructions/);
  });

  it("ConversionContactOnlyCTA and SolicitorContactBlock drop SMS phone labels", () => {
    const cta = fs.readFileSync(
      path.join(root, "components/conversion/ConversionContactOnlyCTA.tsx"),
      "utf8",
    );
    const block = fs.readFileSync(
      path.join(root, "components/compliance/SolicitorContactBlock.tsx"),
      "utf8",
    );
    expect(cta).not.toMatch(/Solicitor SMS/);
    expect(block).not.toMatch(/Solicitor SMS/);
    expect(cta).toContain("/for-solicitors");
    expect(block).toContain("/for-solicitors");
  });
});

describe("voluntary interview PACE cite", () => {
  it("FAQ cites PACE s.58 and Code C 3.21A", () => {
    const page = fs.readFileSync(
      path.join(root, "app/voluntary-police-interview/page.tsx"),
      "utf8",
    );
    expect(page).toMatch(/PACE section 58/);
    expect(page).toMatch(/Code C paragraph 3\.21A/);
  });
});

describe("cookie banner safe area", () => {
  it("globals.css pads body when cookie bar is visible", () => {
    const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
    expect(css).toMatch(/body\.cookie-bar-visible\s*\{/);
    expect(css).toMatch(/padding-bottom:\s*calc\(4\.25rem/);
  });
});

describe("stale Google phone snippet reindex list", () => {
  it("notify + IndexNow priority lists include worst stale-snippet URLs", () => {
    const notify = fs.readFileSync(
      path.join(root, "scripts/notify-search-engines.js"),
      "utf8",
    );
    const indexNow = fs.readFileSync(
      path.join(root, "app/api/index-now/route.ts"),
      "utf8",
    );
    for (const url of [
      "/blog/immediate-family-instruct-police-station-solicitor",
      "/preparing-for-police-interview",
      "/services/pre-charge-advice",
    ]) {
      expect(notify).toContain(url);
      expect(indexNow).toContain(url);
    }
  });
});
