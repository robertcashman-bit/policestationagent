import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const TOWN_STUB_PAGES = [
  "bromley",
  "chatham",
  "deal",
  "faversham",
  "gillingham",
  "herne-bay",
  "ramsgate",
  "rochester",
  "sandwich",
  "whitstable",
] as const;

describe("live copy defects — 28 Aug 2026", () => {
  it("services police-station-representation FAQ does not list Maidstone as a custody suite", () => {
    const page = fs.readFileSync(
      path.join(root, "app/services/police-station-representation/page.tsx"),
      "utf8"
    );
    expect(page).toContain("Which Kent custody suites do you cover as a duty solicitor?");
    expect(page).toContain("Maidstone (custody closed / VAI only)");
    expect(page).toContain("Medway (Gillingham), North Kent (Gravesend), Canterbury, Tonbridge, Folkestone and Margate");
    expect(page).not.toMatch(
      /We cover all Kent custody suites including Medway \(Gillingham\), Maidstone/
    );
  });

  it("homepage FAQ separates operational custody from VAI stations", () => {
    const page = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
    expect(page).toContain("Maidstone (custody closed / VAI only)");
    expect(page).not.toMatch(
      /custody suites including Medway \(Gillingham\), North Kent \(Gravesend\), Canterbury, Tonbridge, Folkestone, Ashford, Sittingbourne/
    );
  });

  it("ten town landing pages no longer use truncated 45 min away stub", () => {
    for (const slug of TOWN_STUB_PAGES) {
      const page = fs.readFileSync(
        path.join(root, `app/${slug}-solicitor/page.tsx`),
        "utf8"
      );
      expect(page, slug).not.toContain("45 min away");
      expect(page, slug).toContain("within about 45 minutes of Maidstone");
    }
  });

  it("Chatham and Rochester do not claim a local public custody suite", () => {
    for (const slug of ["chatham", "rochester"] as const) {
      const page = fs.readFileSync(
        path.join(root, `app/${slug}-solicitor/page.tsx`),
        "utf8"
      );
      expect(page).toContain("Medway custody");
      expect(page).toContain("Purser Way");
      expect(page).not.toContain("45 min away</strong> to custody suite");
    }
  });

  it("legacy short offence URLs redirect to canonical long slugs", () => {
    const cfg = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
    const rules: Array<[string, string]> = [
      ["/offences", "/offences-we-deal-with"],
      ["/offences/assault", "/offences/assault-abh-gbh"],
      ["/offences/drugs", "/offences/drug-offences"],
      ["/offences/fraud", "/offences/fraud-theft"],
      ["/offences/sexual", "/offences/sexual-offences"],
      ["/offences/domestic", "/offences/domestic-abuse-allegations"],
      ["/offences/harassment", "/offences/harassment-stalking"],
    ];
    for (const [source, destination] of rules) {
      expect(cfg).toContain(`source: "${source}"`);
      expect(cfg).toMatch(
        new RegExp(
          `source:\\s*"${source.replace(/\//g, "\\/")}"[\\s\\S]*?destination:\\s*"${destination.replace(/\//g, "\\/")}"`
        )
      );
    }
  });

  it("offence hubs do not treat Maidstone as an operational custody suite", () => {
    const files = [
      "app/offences-we-deal-with/page.tsx",
      "app/offences/assault-abh-gbh/page.tsx",
      "app/offences/drug-offences/page.tsx",
      "app/offences/fraud-theft/page.tsx",
      "app/offences/sexual-offences/page.tsx",
      "app/offences/domestic-abuse-allegations/page.tsx",
      "app/offences/harassment-stalking/page.tsx",
    ];
    for (const rel of files) {
      const page = fs.readFileSync(path.join(root, rel), "utf8");
      expect(page, rel).not.toContain(
        "including Medway, Maidstone, Canterbury, Gravesend, and other custody suites"
      );
      expect(page, rel).not.toContain(
        "We cover all Kent custody suites, including Medway, Maidstone, Canterbury, Gravesend"
      );
    }
  });
});
