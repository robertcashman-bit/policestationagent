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

  it("footer Network/tools promotes Microsoft Store first for Custody Note", () => {
    const footer = fs.readFileSync(path.join(root, "components/Footer.tsx"), "utf8");
    expect(footer).toContain("CUSTODYNOTE_MICROSOFT_STORE_HREF");
    expect(footer).toContain("CUSTODYNOTE_MICROSOFT_STORE_CTA");
    expect(footer).toContain("CUSTODYNOTE_DOWNLOAD_HREF");
    expect(footer).toContain("CUSTODYNOTE_DOWNLOAD_CTA");
    expect(footer).toMatch(/Microsoft Store is Windows only/i);
    // Firm phones must stay out of always-on chrome HTML
    expect(footer).not.toMatch(/01732|07535|tel:/i);

    const promo = fs.readFileSync(path.join(root, "lib/custodynote-promo.ts"), "utf8");
    expect(promo).toContain("apps.microsoft.com/detail/9NFSRVT3T45V");

    const network = fs.readFileSync(path.join(root, "config/footer-links.ts"), "utf8");
    const storeIdx = network.indexOf("CUSTODYNOTE_MICROSOFT_STORE_HREF");
    const downloadIdx = network.indexOf("CUSTODYNOTE_DOWNLOAD_HREF");
    expect(storeIdx).toBeGreaterThan(-1);
    expect(downloadIdx).toBeGreaterThan(storeIdx);

    const owned = fs.readFileSync(path.join(root, "config/link-authority.ts"), "utf8");
    expect(owned).toContain("CUSTODYNOTE_MICROSOFT_STORE_HREF");
    expect(owned).not.toMatch(/OWNED_NETWORK_SITES[\s\S]*CUSTODYNOTE_SITE/);
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
      /source:\s*"\/kent-police-station-reps"[\s\S]*?destination:\s*"\/coverage"/
    );
    // Leaf station pages must remain reachable (area hubs link to them)
    expect(cfg).not.toContain('source: "/coverage/police-stations/:slug*"');
  });

  it("coverage hub links avoid redirected paths and mounts nearest finder", () => {
    const page = fs.readFileSync(path.join(root, "app/coverage/page.tsx"), "utf8");
    expect(page).toContain("NearestStationFinder");
    expect(page).toContain('href="#custody-suites"');
    expect(page).toContain('href="/outofarea"');
    expect(page).not.toContain('href="/coverage/police-stations"');
    expect(page).not.toContain('href="/areas"');
    expect(page).not.toContain('href="/psastations"');
  });

  it("sitemap keeps /coverage and omits redirected hub indexes", () => {
    const sitemap = fs.readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain("${baseUrl}/coverage");
    expect(sitemap).not.toContain("${baseUrl}/locations");
    expect(sitemap).not.toContain("${baseUrl}/kent-police-station-reps");
    expect(sitemap).not.toContain("${baseUrl}/kent-police-stations");
    expect(sitemap).not.toContain("${baseUrl}/areas");
    // Hub index omitted; leaf /coverage/police-stations/${slug} remain
    expect(sitemap).not.toMatch(/\$\{baseUrl\}\/coverage\/police-stations`/);
    expect(sitemap).toContain("${baseUrl}/coverage/police-stations/${slug}");
    // Exact hub path only — leaf /police-stations/${slug} from DB may remain
    expect(sitemap).not.toMatch(/\$\{baseUrl\}\/police-stations`/);
  });

  it("24-7 blog slug redirects to extended-hours owner", () => {
    const redirects = JSON.parse(
      fs.readFileSync(path.join(root, "config/blog-slug-redirects.json"), "utf8")
    ) as Array<{ from: string; to: string }>;
    const rule = redirects.find((r) => r.from === "kent-police-stations-legal-representation-24-7");
    expect(rule?.to).toBe("kent-police-stations-legal-representation-extended-hours");
    const index = JSON.parse(
      fs.readFileSync(path.join(root, "public/blog-posts.json"), "utf8")
    ) as Array<{ slug: string }>;
    expect(index.some((p) => p.slug.includes("24-7"))).toBe(false);
    expect(
      index.some((p) => p.slug === "kent-police-stations-legal-representation-extended-hours")
    ).toBe(true);
  });

  it("cover card copy no longer claims telephone is on Contact HTML", () => {
    const card = fs.readFileSync(
      path.join(root, "components/conversion/KentCoverCard.tsx"),
      "utf8"
    );
    expect(card).toMatch(/not listed publicly/i);
    expect(card).not.toMatch(/Telephone and SMS are on the/);
  });
});
