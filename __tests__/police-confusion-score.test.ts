import { createRequire } from "module";
import { describe, expect, it } from "vitest";
import {
  scorePageConfusion,
  snippetReadsAsPoliceContact,
  buildSnippetCandidate,
} from "../lib/seo/police-confusion-score";
import { disambiguateStationHtml } from "../lib/seo/disambiguate-station-html";
import { isPoliceContactIntentPath } from "../lib/seo/station-contact-routes";
import { LOCAL_COVER_PAGES } from "../lib/seo/local-cover-data";

const require = createRequire(import.meta.url);
const { LEGACY_LOCAL_REDIRECTS } = require("../config/legacy-local-redirects.js") as {
  LEGACY_LOCAL_REDIRECTS: { source: string; destination: string }[];
};

describe("police confusion score", () => {
  it("flags LocalBusiness telephone bound to station streetAddress", () => {
    const result = scorePageConfusion({
      path: "/police-stations/medway",
      title: "Medway Police Station",
      h1: "Medway Police Station",
      metaDescription: "Located at Purser Way. Call 01732 247427.",
      jsonLd: JSON.stringify({
        "@type": "LocalBusiness",
        telephone: "+441732247427",
        streetAddress: "Purser Way",
        openingHours: "Mo-Su 00:00-23:59",
      }),
      html: "",
    });
    expect(result.flags).toContain("schema_telephone_on_station_address");
    expect(result.flags).toContain("meta_call_near_station");
    expect(result.score).toBeGreaterThanOrEqual(40);
  });

  it("flags firm phone in title", () => {
    const result = scorePageConfusion({
      path: "/home",
      title: "Duty Solicitor Kent | 01732 247427 | FREE Advice",
      metaDescription: "Independent solicitor — NOT Kent Police.",
      h1: "Kent Duty Solicitor",
    });
    expect(result.flags).toContain("title_contains_firm_phone");
  });

  it("fails snippet simulation when number reads as police contact", () => {
    const snippet = buildSnippetCandidate({
      path: "/x",
      title: "Tonbridge Police Station telephone number",
      metaDescription: "Call 01732 247427 for Tonbridge custody.",
      h1: "Tonbridge Police Station",
    });
    expect(snippetReadsAsPoliceContact(snippet)).toBe(true);
  });

  it("passes snippet simulation for solicitor-framed Tonbridge cover", () => {
    const cfg = LOCAL_COVER_PAGES.tonbridge;
    const snippet = buildSnippetCandidate({
      path: "/police-station-rep-tonbridge",
      title: cfg.title,
      metaDescription: cfg.metaDescription,
      h1: cfg.h1,
    });
    expect(snippetReadsAsPoliceContact(snippet)).toBe(false);
    expect(cfg.title).not.toMatch(/01732/);
    expect(cfg.metaDescription).not.toMatch(/01732|07535/);
    expect(cfg.metaDescription).toMatch(/not Kent Police/i);
    expect(cfg.h1).toMatch(/Independent Solicitor/i);
  });

  it("scores low when Place has no telephone and solicitor CTA is labelled", () => {
    const result = scorePageConfusion({
      path: "/coverage/police-stations/medway",
      title: "Medway Police Station Information | Independent Criminal Defence Solicitors",
      h1: "Medway Police Station Information",
      metaDescription:
        "Private defence solicitor website — NOT Kent Police. Independent legal representation.",
      openingParagraph: "Independent legal representation for Kent custody.",
      jsonLd: JSON.stringify({ "@type": "Place", name: "Medway Police Station" }),
      html: `
        <div>Police Station Details</div>
        <div>Get Directions</div>
        <h2>Need a solicitor?</h2>
        <a href="/contact">See Contact — what we do & don't do</a>
        NOT Kent Police independent criminal defence solicitor Legal Aid
      `,
    });
    expect(result.flags).not.toContain("schema_telephone_on_station_address");
    expect(result.score).toBeLessThan(40);
  });
});

describe("legacy redirects", () => {
  it("redirects tonbridge psa and police-station duplicates to rep cover", () => {
    const map = Object.fromEntries(
      LEGACY_LOCAL_REDIRECTS.map((r) => [r.source, r.destination]),
    );
    expect(map["/tonbridge-psa-station"]).toBe("/police-station-rep-tonbridge");
    expect(map["/tonbridge-police-station"]).toBe("/police-station-rep-tonbridge");
    expect(map["/tonbridge-solicitor"]).toBe("/police-station-rep-tonbridge");
  });
});

describe("disambiguateStationHtml", () => {
  it("rewrites adjacent 101 block, injects not-police intro, strips firm tel digits", () => {
    const input = `
      <h1>Medway Police Station</h1>
      <div>Police Station Details</div>
      <a>Get Directions</a><div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency</p><a href="tel:101" class="text-lg font-bold text-blue-600 hover:underline">Call 101</a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters</p></div>
      <div class="rounded-xl border bg-amber-500 text-blue-900 shadow-lg text-center p-6"><a href="tel:01732247427">01732 247427</a></div>
    `;
    const out = disambiguateStationHtml(input);
    expect(out).toContain("data-station-not-police");
    expect(out).toContain("Need the police? (official)");
    expect(out).toContain("NOT THE POLICE");
    expect(out).toContain("criminal solicitors");
    expect(out).toContain('href="/contact"');
    expect(out).toContain("data-solicitor-contact");
    expect(out).not.toMatch(/href="tel:01732247427"/);
    expect(out).toContain("/contact");
  });

  it("replaces hero tel:01732 with Contact link", () => {
    const input = `
      <h1>Police Station Rep Medway Custody</h1>
      <p class="text-lg">URGENT: Police Station Help</p>
      <a href="tel:01732247427" class="bg-red-600">Call 01732 247427</a>
      <div>Police Station Details</div>
      <a>Get Directions</a>
    `;
    const out = disambiguateStationHtml(input);
    expect(out).toContain("data-station-not-police");
    expect(out).toContain('href="/contact"');
    expect(out).not.toMatch(/href="tel:01732247427"/);
    expect(out).toMatch(/Urgent solicitor representation|Contact criminal solicitors/i);
    expect(out).toMatch(/forthcoming police interview/i);
  });

  it("keeps firm tel on solicitor landing HTML without station details", () => {
    const input = `
      <h1>Medway Police Station Solicitor</h1>
      <a href="tel:01732247427" class="bg-red-600">Call 01732 247427</a>
    `;
    const out = disambiguateStationHtml(input);
    expect(out).toMatch(/href="tel:01732247427"/);
    expect(out).not.toContain("data-solicitor-contact");
  });
});

describe("isPoliceContactIntentPath", () => {
  it("flags station URLs and spares solicitor/contact URLs", () => {
    expect(isPoliceContactIntentPath("/maidstone-police-station")).toBe(true);
    expect(isPoliceContactIntentPath("/maidstone-police-station/")).toBe(true);
    expect(isPoliceContactIntentPath("/kent-police-stations")).toBe(true);
    expect(isPoliceContactIntentPath("/police-stations/medway")).toBe(true);
    expect(isPoliceContactIntentPath("/police-station-rep-maidstone")).toBe(true);
    expect(isPoliceContactIntentPath("/police-station-rep-medway")).toBe(true);
    expect(isPoliceContactIntentPath("/kent-police-station-reps")).toBe(true);
    expect(isPoliceContactIntentPath("/maidstone-solicitor")).toBe(false);
    expect(isPoliceContactIntentPath("/police-station-agent-medway")).toBe(false);
    expect(isPoliceContactIntentPath("/contact")).toBe(false);
  });
});

describe("metadata safeguards", () => {
  it("no indexable title in local covers contains firm phone", () => {
    for (const cfg of Object.values(LOCAL_COVER_PAGES)) {
      expect(cfg.title).not.toMatch(/01732|07535/);
      expect(cfg.metaDescription).not.toMatch(/01732|07535/);
    }
  });
});
