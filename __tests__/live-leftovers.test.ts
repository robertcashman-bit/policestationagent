import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("live leftovers — hub + chrome fixes", () => {
  it("footer Can we help points at canonical /canwehelp", () => {
    const footer = fs.readFileSync(path.join(root, "components/Footer.tsx"), "utf8");
    expect(footer).toContain('href: "/canwehelp"');
    expect(footer).not.toContain('href: "/can-we-help"');
  });

  it("next.config consolidates overlapping hubs to /coverage", () => {
    const cfg = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
    for (const source of [
      "/locations",
      "/police-stations",
      "/kent-police-stations",
      "/kent-police-station-reps",
      "/areas",
      "/coverage/police-stations",
    ]) {
      expect(cfg).toContain(`source: "${source}"`);
    }
    expect(cfg).toMatch(/source:\s*"\/locations"[\s\S]*?destination:\s*"\/coverage"/);
    expect(cfg).toMatch(
      /source:\s*"\/kent-police-station-reps"[\s\S]*?destination:\s*"\/coverage"/,
    );
  });

  it("sitemap keeps /coverage and omits redirected hub indexes", () => {
    const sitemap = fs.readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain("${baseUrl}/coverage");
    expect(sitemap).not.toContain("${baseUrl}/locations");
    expect(sitemap).not.toContain("${baseUrl}/kent-police-station-reps");
    expect(sitemap).not.toContain("${baseUrl}/kent-police-stations");
    expect(sitemap).not.toContain("${baseUrl}/areas");
    expect(sitemap).not.toContain("${baseUrl}/coverage/police-stations");
    // Exact hub path only — leaf /police-stations/${slug} from DB may remain
    expect(sitemap).not.toMatch(/\$\{baseUrl\}\/police-stations`/);
  });

  it("24-7 blog slug redirects to extended-hours owner", () => {
    const redirects = JSON.parse(
      fs.readFileSync(path.join(root, "config/blog-slug-redirects.json"), "utf8"),
    ) as Array<{ from: string; to: string }>;
    const rule = redirects.find(
      (r) => r.from === "kent-police-stations-legal-representation-24-7",
    );
    expect(rule?.to).toBe("kent-police-stations-legal-representation-extended-hours");
    const index = JSON.parse(
      fs.readFileSync(path.join(root, "public/blog-posts.json"), "utf8"),
    ) as Array<{ slug: string }>;
    expect(index.some((p) => p.slug.includes("24-7"))).toBe(false);
    expect(
      index.some((p) => p.slug === "kent-police-stations-legal-representation-extended-hours"),
    ).toBe(true);
  });

  it("cover card copy no longer claims telephone is on Contact HTML", () => {
    const card = fs.readFileSync(
      path.join(root, "components/conversion/KentCoverCard.tsx"),
      "utf8",
    );
    expect(card).toMatch(/not listed publicly/i);
    expect(card).not.toMatch(/Telephone and SMS are on the/);
  });
});
