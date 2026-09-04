import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isPhoneAllowlistPath,
  PATHWAY_CARDS,
  PHONE_ALLOWLIST_PATHS,
} from "../config/enquiry-paths";
import { sanitizeAnalyticsParams } from "../lib/analytics";
import { validateUploadFile } from "../lib/enquiry/uploads";
import { createEnquiryReference } from "../lib/enquiry/reference";
import { stripFirmPhonesToContact } from "../lib/seo/strip-firm-phones";
import { normalizeScrapedHtml } from "../lib/scraped-html";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("enquiry funnel routes", () => {
  it("homepage has no generic tel CTA", () => {
    const page = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
    const hero = fs.readFileSync(
      path.join(root, "components/conversion/HomeHeroCover.tsx"),
      "utf8"
    );
    const pathway = fs.readFileSync(
      path.join(root, "components/conversion/HomePathwaySection.tsx"),
      "utf8"
    );
    expect(page).not.toMatch(/tel:\$\{PHONE_TEL\}|tel:01732/);
    expect(hero).not.toMatch(/tel:01732|PHONE_TEL/);
    expect(page).toContain("HomePathwaySection");
    expect(hero).toContain("AudiencePathSelector");
    expect(hero).toContain('id="pathways"');
    // Pathways render in the hero first screen; section export kept for compatibility.
    expect(pathway).toMatch(/return null|HomeHeroCover/);
  });

  it("header and sticky bar hide generic telephone", () => {
    const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
    const sticky = fs.readFileSync(
      path.join(root, "components/conversion/MobileStickyContactBar.tsx"),
      "utf8"
    );
    expect(header).not.toMatch(/tel:01732/);
    expect(sticky).not.toMatch(/tel:01732|PHONE_TEL/);
    expect(sticky).toContain("current-custody");
    expect(sticky).toContain("voluntary-interviews");
    expect(sticky).toContain("for-solicitors");
    // Homepage suppresses sticky chrome so pathway CTAs are unobstructed
    expect(sticky).toContain("HIDE_STICKY_PATHS");
    expect(sticky).toMatch(/"\/"/);
  });

  it("home hero has no competing CTA row and hosts pathways", () => {
    const hero = fs.readFileSync(
      path.join(root, "components/conversion/HomeHeroCover.tsx"),
      "utf8"
    );
    expect(hero).toMatch(/999/);
    expect(hero).toMatch(/101/);
    expect(hero).not.toMatch(/href="tel:101"/);
    expect(hero).toContain("AudiencePathSelector");
    expect(hero).toContain("firstScreen");
    expect(hero).not.toMatch(/Find representation/);
    expect(hero).not.toMatch(/View coverage/);
    expect(hero).not.toMatch(/PATH_CONTACT/);
    // Brand lives in the header — no giant hero wordmark repeat.
    expect(hero).not.toMatch(/>\s*Police Station Agent\s*</);
  });

  it("agency page uses form and Contact pathways without publishing telephone digits", () => {
    const page = fs.readFileSync(path.join(root, "app/for-solicitors/page.tsx"), "utf8");
    expect(page).not.toContain("PHONE_TEL");
    expect(page).not.toContain("PHONE_DISPLAY");
    expect(page).not.toMatch(/tel:01732|01732247427/);
    expect(page).toContain("AgencyInstructionForm");
    expect(page).toMatch(/Contact pathways/);
    expect(page).toMatch(/Solicitor and law-firm instructions/);
  });

  it("custody page uses qualification flow without unguarded tel", () => {
    const page = fs.readFileSync(path.join(root, "app/current-custody/page.tsx"), "utf8");
    expect(page).toContain("CustodyQualificationFlow");
    expect(page).not.toMatch(/tel:01732/);
  });

  it("start/in-custody canonical points to current-custody", () => {
    const page = fs.readFileSync(path.join(root, "app/start/in-custody/page.tsx"), "utf8");
    expect(page).toContain("/current-custody");
    expect(page).toContain("CustodyQualificationFlow");
  });

  it("voluntary landing and start form exist", () => {
    const landing = fs.readFileSync(path.join(root, "app/voluntary-interviews/page.tsx"), "utf8");
    const start = fs.readFileSync(
      path.join(root, "app/start/voluntary-interview/page.tsx"),
      "utf8"
    );
    expect(landing).toContain("VoluntaryInterviewForm");
    expect(landing).not.toMatch(/tel:01732/);
    expect(start).toContain("VoluntaryInterviewForm");
  });

  it("pathway cards cover three audiences", () => {
    expect(PATHWAY_CARDS).toHaveLength(3);
    expect(PATHWAY_CARDS.map((c) => c.id).sort()).toEqual(["agency", "custody", "voluntary"]);
  });

  it("situation picker includes something-else deflection with no call-back", () => {
    const picker = fs.readFileSync(
      path.join(root, "components/conversion/SituationPicker.tsx"),
      "utf8"
    );
    expect(picker).toContain("Something else");
    expect(picker).toContain("situation-other");
    expect(picker).toMatch(
      /do not offer a call-back|do not offer a call-back for these|We do not offer a call-back/i
    );
    expect(picker).toMatch(/101/);
    expect(picker).toContain("kent.police.uk");
    expect(picker).toContain("ShortVoluntaryRequestForm");
    expect(picker).not.toMatch(/tel:01732/);
  });

  it("voluntary landing leads with Kent VA SEO and short form", () => {
    const landing = fs.readFileSync(path.join(root, "app/voluntary-interviews/page.tsx"), "utf8");
    expect(landing).toMatch(/Voluntary Interview Kent/i);
    expect(landing).toContain("ShortVoluntaryRequestForm");
    expect(landing).toContain("reportFormStart={false}");
    expect(landing).toContain("Maidstone");
    expect(landing).toContain("Do not discuss the allegation");
    expect(landing).toContain("PoliceSignposting");
  });

  it("hours page is solicitor availability not police station opening times", () => {
    const hours = fs.readFileSync(path.join(root, "app/hours/page.tsx"), "utf8");
    expect(hours).toMatch(/Solicitor Availability|defence team is available/i);
    expect(hours).toMatch(
      /not Kent Police station opening times|Looking for police station opening times/i
    );
    expect(hours).not.toMatch(/Opening Hours \| Police Station/);
    expect(hours).toContain("PATH_VOLUNTARY_LANDING");
  });

  it("shared police enquiry first gate exists for VA and contact forms", () => {
    const gate = fs.readFileSync(
      path.join(root, "components/conversion/PoliceEnquiryFirstGate.tsx"),
      "utf8"
    );
    expect(gate).toMatch(/reporting a crime or looking for a police number/i);
    expect(gate).toMatch(/101/);
    expect(gate).toContain("police-enquiry-hard-stop");
    const contact = fs.readFileSync(path.join(root, "components/ContactForm.tsx"), "utf8");
    expect(contact).toContain("PoliceEnquiryFirstGate");
    const vai = fs.readFileSync(
      path.join(root, "components/conversion/VoluntaryInterviewForm.tsx"),
      "utf8"
    );
    expect(vai).toContain("PoliceEnquiryFirstGate");
  });

  it("VA aliases redirect to voluntary-interviews", () => {
    const cfg = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
    expect(cfg).toMatch(/source:\s*"\/servicesvoluntaryinterviews"/);
    expect(cfg).toMatch(/source:\s*"\/voluntary-police-interview"/);
    expect(cfg).toMatch(/destination:\s*"\/voluntary-interviews"/);
  });
});

describe("phone allowlist", () => {
  it("never allowlists public paths for firm telephone digits", () => {
    expect(isPhoneAllowlistPath("/for-solicitors")).toBe(false);
    expect(isPhoneAllowlistPath("/servicerates")).toBe(false);
    expect(isPhoneAllowlistPath("/")).toBe(false);
    expect(isPhoneAllowlistPath("/blog/foo")).toBe(false);
    expect(isPhoneAllowlistPath("/voluntary-interviews")).toBe(false);
    expect(PHONE_ALLOWLIST_PATHS).toHaveLength(0);
  });
});

describe("analytics PII sanitisation", () => {
  it("strips personal data keys", () => {
    const cleaned = sanitizeAnalyticsParams({
      reason_code: "friend",
      name: "Jane Doe",
      email: "a@b.com",
      phone: "01732",
      allegation: "theft",
      placement: "home",
    });
    expect(cleaned).toEqual({ reason_code: "friend", placement: "home" });
  });
});

describe("upload validation", () => {
  it("accepts PDF magic bytes", () => {
    const buf = Buffer.from("%PDF-1.4 mock");
    const result = validateUploadFile({
      originalName: "letter.pdf",
      mimeType: "application/pdf",
      buffer: buf,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.attachment.filename).toMatch(/^enquiry-.*\.pdf$/);
  });

  it("rejects exe extension", () => {
    const result = validateUploadFile({
      originalName: "x.exe",
      mimeType: "application/octet-stream",
      buffer: Buffer.from([0x4d, 0x5a]),
    });
    expect(result.ok).toBe(false);
  });
});

describe("enquiry reference", () => {
  it("creates prefixed reference", () => {
    expect(createEnquiryReference("VAI")).toMatch(/^VAI-\d{6}-[A-Z0-9]+$/);
  });
});

describe("scraped HTML phone strip", () => {
  it("normalizeScrapedHtml strips firm tel by default", () => {
    const html = `<a href="tel:01732247427">Call 01732 247427</a>`;
    const out = normalizeScrapedHtml(html);
    expect(out).not.toMatch(/href="tel:01732247427"/);
  });

  it("stripFirmPhones replaces emergency call labels", () => {
    const out = stripFirmPhonesToContact(`<p>Emergency Call: 01732 247427</p>`);
    expect(out).not.toMatch(/01732/);
  });
});

describe("blog posts never publish firm phone", () => {
  it("no published blog JSON contains firm voice/SMS digits", () => {
    const dir = path.join(root, "data/blog-posts");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files.length).toBeGreaterThan(10);
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      expect(raw, file).not.toMatch(/01732|07535|247427|494446/);
    }
  });

  it("blog post page always strips phones at render", () => {
    const page = fs.readFileSync(path.join(root, "app/blog/[slug]/page.tsx"), "utf8");
    expect(page).toContain("stripFirmPhonesToContact");
    expect(page).toContain("stripFirmPhonePlainText");
    expect(page).toContain("forceHidePhone");
    expect(page).not.toMatch(/isStationRiskBlogSlug/);
  });
});

describe("custody qualification component", () => {
  it("does not reveal phone until qualified logic in source", () => {
    const src = fs.readFileSync(
      path.join(root, "components/conversion/CustodyQualificationFlow.tsx"),
      "utf8"
    );
    expect(src).toContain("QualifiedPhoneReveal");
    expect(src).toContain('relationship === "friend"');
    expect(src).toContain("enquiryOutOfScope");
  });
});
