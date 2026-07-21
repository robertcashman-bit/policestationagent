import { describe, expect, it } from "vitest";
import { scorePageConfusion } from "../lib/seo/police-confusion-score";
import { disambiguateStationHtml } from "../lib/seo/disambiguate-station-html";
import { isPoliceContactIntentPath } from "../lib/seo/station-contact-routes";

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
});

describe("isPoliceContactIntentPath", () => {
  it("flags station URLs and spares solicitor/contact URLs", () => {
    expect(isPoliceContactIntentPath("/maidstone-police-station")).toBe(true);
    expect(isPoliceContactIntentPath("/kent-police-stations")).toBe(true);
    expect(isPoliceContactIntentPath("/police-stations/medway")).toBe(true);
    expect(isPoliceContactIntentPath("/maidstone-solicitor")).toBe(false);
    expect(isPoliceContactIntentPath("/police-station-rep-maidstone")).toBe(false);
    expect(isPoliceContactIntentPath("/contact")).toBe(false);
  });
});
