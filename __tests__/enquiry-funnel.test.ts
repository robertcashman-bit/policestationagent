import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isPhoneAllowlistPath, PATHWAY_CARDS } from "../config/enquiry-paths";
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
      "utf8",
    );
    const pathway = fs.readFileSync(
      path.join(root, "components/conversion/HomePathwaySection.tsx"),
      "utf8",
    );
    expect(page).not.toMatch(/tel:\$\{PHONE_TEL\}|tel:01732/);
    expect(hero).not.toMatch(/tel:01732|PHONE_TEL/);
    expect(page).toContain("HomePathwaySection");
    expect(pathway).toContain("AudiencePathSelector");
  });

  it("header and sticky bar hide generic telephone", () => {
    const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
    const sticky = fs.readFileSync(
      path.join(root, "components/conversion/MobileStickyContactBar.tsx"),
      "utf8",
    );
    expect(header).not.toMatch(/tel:01732/);
    expect(sticky).not.toMatch(/tel:01732|PHONE_TEL/);
    expect(sticky).toContain("current-custody");
    expect(sticky).toContain("voluntary-interview");
    expect(sticky).toContain("for-solicitors");
  });

  it("agency page shows professional telephone", () => {
    const page = fs.readFileSync(path.join(root, "app/for-solicitors/page.tsx"), "utf8");
    expect(page).toContain("PHONE_TEL");
    expect(page).toContain("AgencyInstructionForm");
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
      "utf8",
    );
    expect(landing).toContain("VoluntaryInterviewForm");
    expect(landing).not.toMatch(/tel:01732/);
    expect(start).toContain("VoluntaryInterviewForm");
  });

  it("pathway cards cover three audiences", () => {
    expect(PATHWAY_CARDS).toHaveLength(3);
    expect(PATHWAY_CARDS.map((c) => c.id).sort()).toEqual(["agency", "custody", "voluntary"]);
  });
});

describe("phone allowlist", () => {
  it("allows agency paths and hides general pages", () => {
    expect(isPhoneAllowlistPath("/for-solicitors")).toBe(true);
    expect(isPhoneAllowlistPath("/servicerates")).toBe(true);
    expect(isPhoneAllowlistPath("/")).toBe(false);
    expect(isPhoneAllowlistPath("/blog/foo")).toBe(false);
    expect(isPhoneAllowlistPath("/voluntary-interviews")).toBe(false);
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
      "utf8",
    );
    expect(src).toContain("QualifiedPhoneReveal");
    expect(src).toContain('relationship === "friend"');
    expect(src).toContain("enquiryOutOfScope");
  });
});
