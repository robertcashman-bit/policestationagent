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

  it("footer Network/tools pairs Microsoft Store and Mac download for Custody Note", () => {
    const footer = fs.readFileSync(path.join(root, "components/Footer.tsx"), "utf8");
    expect(footer).toContain("CUSTODYNOTE_MICROSOFT_STORE_HREF");
    expect(footer).toContain("CUSTODYNOTE_MICROSOFT_STORE_CTA");
    expect(footer).toContain("CUSTODYNOTE_MAC_DOWNLOAD_HREF");
    expect(footer).toContain("CUSTODYNOTE_MAC_DOWNLOAD_CTA");
    expect(footer).toContain("CUSTODYNOTE_DOWNLOAD_HREF");
    expect(footer).toContain("CUSTODYNOTE_DOWNLOAD_CTA");
    expect(footer).toContain("CUSTODYNOTE_STORE_WINDOWS_NOTE");
    expect(footer).toContain('data-cn-store-cta="footer"');
    expect(footer).toContain('data-cn-mac-cta="footer"');
    expect(footer).toContain("FOOTER_RIGHTS_GUIDES");
    expect(footer).toContain("FOOTER_STATION_HUBS");
    expect(footer).toContain("FOOTER_ADVICE_PAGES");
    expect(footer).toContain("FOOTER_NETWORK_LINKS");
    expect(footer).toContain("isBlockedRepUkUrl");
    expect(footer).toContain("FooterCollapsibleSection");

    // Firm phones must stay out of always-on chrome HTML
    expect(footer).not.toMatch(/01732|07535|tel:/i);
    expect(footer).not.toMatch(/Mac App Store|Mac Store/i);

    const promo = fs.readFileSync(path.join(root, "lib/custodynote-promo.ts"), "utf8");
    expect(promo).toContain("apps.microsoft.com/detail/9nfsrvt3t45v?hl=en-GB&gl=GB");
    expect(promo).toContain("custodyNoteStoreUrl");
    expect(promo).toContain("psa-footer");
    expect(promo).toContain("Get it on Microsoft Store");
    expect(promo).toContain("Download for Mac");
    expect(promo).toContain("cnDownloadHref");
    expect(promo).not.toMatch(/coming.?soon/i);
    expect(promo).not.toMatch(/certif/i);
    expect(promo).not.toMatch(/Mac App Store/i);

    const network = fs.readFileSync(path.join(root, "config/footer-links.ts"), "utf8");
    const networkBlock = network.slice(network.indexOf("FOOTER_NETWORK_LINKS"));
    const storeIdx = networkBlock.indexOf("href: CUSTODYNOTE_MICROSOFT_STORE_HREF");
    const macIdx = networkBlock.indexOf("href: CUSTODYNOTE_MAC_DOWNLOAD_HREF");
    const downloadIdx = networkBlock.indexOf("href: CUSTODYNOTE_DOWNLOAD_HREF");
    expect(storeIdx).toBeGreaterThan(-1);
    expect(macIdx).toBeGreaterThan(storeIdx);
    expect(downloadIdx).toBeGreaterThan(macIdx);

    const owned = fs.readFileSync(path.join(root, "config/link-authority.ts"), "utf8");
    expect(owned).toContain("url: CUSTODYNOTE_MICROSOFT_STORE_HREF");
    expect(owned).toContain("url: CUSTODYNOTE_MAC_DOWNLOAD_HREF");
    expect(owned).not.toMatch(/OWNED_NETWORK_SITES[\s\S]*CUSTODYNOTE_SITE/);
  });

  it("homepage has no CN body promos; header has no CN; footer keeps Store/Mac; fuller nav", () => {
    const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
    expect(home).not.toContain("CustodyNoteStorePromo");
    expect(home).not.toContain('campaign="homepage"');
    expect(home).toContain("HomeAuthorityStrip");
    expect(home).toContain("HomeAuthorityBio");
    expect(home.indexOf("HomeAuthorityStrip")).toBeLessThan(home.indexOf("HomeAuthorityBio"));
    expect(home).toContain("HomeHeroCover");

    const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
    expect(header).not.toContain("CustodyNoteStorePromo");
    expect(header).not.toContain("CUSTODYNOTE_MICROSOFT_STORE_HREF");
    expect(header).not.toContain("CUSTODYNOTE_MICROSOFT_STORE_CTA");
    expect(header).not.toContain('cnDownloadHref("header")');
    expect(header).not.toContain("CUSTODYNOTE_MAC_DOWNLOAD_CTA");
    expect(header).not.toContain('data-cn-mac-cta="mobile-nav"');
    expect(header).not.toContain('data-cn-store-cta');
    expect(header).toContain("NAV_GROUPS");
    expect(header).toContain("NAV_PRIMARY_CTA");
    expect(header).not.toMatch(/01732|07535/);
    expect(header).not.toMatch(/Mac App Store/i);
    expect(header).not.toMatch(/tel:/i);

    const nav = fs.readFileSync(path.join(root, "config/nav.ts"), "utf8");
    expect(nav).toContain("PATH_AGENCY");
    expect(nav).toContain("PATH_VOLUNTARY_LANDING");
    expect(nav).toContain("PATH_CUSTODY");
    expect(nav).toContain("PATH_CONTACT");
    expect(nav).toContain("/police-custody-rights");
    expect(nav).toContain("/canwehelp");
    expect(nav).toContain("/coverage");
    expect(nav).toContain("FOOTER_STATION_HUBS");
    expect(nav).toContain("FOOTER_RIGHTS_GUIDES");
    expect(nav).toContain("FOOTER_ADVICE_PAGES");
    expect(nav).not.toContain("CUSTODYNOTE");
    expect(nav).not.toContain("PSRTRAIN");
    expect(nav).not.toContain("REPUK");
    expect(nav).not.toMatch(/01732|07535|tel:/i);

    const promoUi = fs.readFileSync(
      path.join(root, "components/CustodyNoteStorePromo.tsx"),
      "utf8"
    );
    expect(promoUi).toContain("custodyNoteStoreUrl");
    expect(promoUi).toContain('psa-for-solicitors');
    expect(promoUi).toContain("CUSTODYNOTE_MICROSOFT_STORE_CTA");
    expect(promoUi).toContain("CUSTODYNOTE_MAC_DOWNLOAD_CTA");
    expect(promoUi).toContain("cnDownloadHref");
    expect(promoUi).toContain("CUSTODYNOTE_STORE_WINDOWS_NOTE");
    expect(promoUi).toMatch(/not on any store/i);
    expect(promoUi).not.toMatch(/coming.?soon/i);
    expect(promoUi).not.toMatch(/Mac App Store/i);
    // Panel: Store and Mac are equal-weight btn-gold; backup is tertiary text
    const panelBlock = promoUi.slice(promoUi.indexOf('data-cn-store-cta="panel"'));
    const panelStore = panelBlock.indexOf("CUSTODYNOTE_MICROSOFT_STORE_CTA");
    const panelMac = panelBlock.indexOf("CUSTODYNOTE_MAC_DOWNLOAD_CTA");
    const panelDownload = panelBlock.indexOf("CUSTODYNOTE_DOWNLOAD_CTA");
    expect(panelStore).toBeGreaterThan(-1);
    expect(panelMac).toBeGreaterThan(panelStore);
    expect(panelDownload).toBeGreaterThan(panelMac);
    expect(promoUi).toContain('data-cn-mac-cta="panel"');
    expect(promoUi).toContain('data-cn-mac-cta="strip"');
    expect(promoUi).toContain('data-cn-mac-cta="chrome"');

    const solicitors = fs.readFileSync(path.join(root, "app/for-solicitors/page.tsx"), "utf8");
    expect(solicitors).toContain("CustodyNoteStorePromo");
    expect(solicitors).toContain('campaign="for-solicitors"');

    const authority = fs.readFileSync(
      path.join(root, "components/conversion/HomeAuthorityStrip.tsx"),
      "utf8"
    );
    expect(authority).toMatch(/30 years plus/i);
    expect(authority).toContain("Tuckers Solicitors LLP");
    expect(authority).toContain("SRA 127795");
    expect(authority).toMatch(/Extended hours/i);
    expect(authority).toMatch(/not the police/i);
    expect(authority).not.toMatch(/tel:|01732|07535|href=|button|Request|Call /i);
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
