import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  whatsAppTextUrl,
  SEO_NOT_POLICE,
  SERVICE_SCOPE,
  SERVICE_SCOPE_SHORT,
  CTA_WHO_CAN_CALL,
  CTA_OUT_OF_SCOPE,
  STATION_SOLICITOR_CTA,
  STATION_CONTACT_BUTTON,
} from "../config/contact";
import { SCOPE_FAQ_ITEMS, isOutOfScopeEnquiry } from "../config/scope-faqs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("contact config", () => {
  it("includes not-police and scope disclaimers", () => {
    expect(SEO_NOT_POLICE).toMatch(/NOT.*Police/i);
    expect(SERVICE_SCOPE).toMatch(/custody/i);
    expect(SERVICE_SCOPE).toMatch(/voluntary/i);
    expect(SERVICE_SCOPE).toMatch(/immediate family/i);
    expect(SERVICE_SCOPE).toMatch(/general legal advice/i);
  });

  it("CTA copy rejects post-release free advice and police enquiries", () => {
    expect(CTA_WHO_CAN_CALL).toMatch(/custody/i);
    expect(CTA_WHO_CAN_CALL).toMatch(/voluntary/i);
    expect(CTA_OUT_OF_SCOPE).toMatch(/after release/i);
    expect(CTA_OUT_OF_SCOPE).toMatch(/police enquiries/i);
    expect(CTA_OUT_OF_SCOPE).toMatch(/cannot help/i);
    expect(CTA_OUT_OF_SCOPE).toMatch(/NOT the police/i);
    expect(SERVICE_SCOPE_SHORT).toMatch(/post-release/i);
  });

  it("contact page routes into three pathways without generic call CTA", () => {
    const contact = fs.readFileSync(path.join(root, "app/contact/page.tsx"), "utf8");
    expect(contact).toMatch(/Choose the reason for contacting us/);
    expect(contact).toContain("AudiencePathSelector");
    expect(contact).toContain("PoliceSignposting");
    expect(contact).toContain("CONTACT_GETTING_IN_TOUCH");
    expect(contact).toContain("ADMIN_ENQUIRY_CAN");
    expect(contact).toContain("ADMIN_ENQUIRY_CANNOT");
    expect(contact).toContain('variant="admin"');
    expect(contact).not.toMatch(/tel:01732/);
    expect(contact).not.toContain("PHONE_DISPLAY");
    expect(contact).toMatch(/ADMIN_ENQUIRY_HEADING|Non-urgent written/);
  });

  it("FAQ explains why phone is not on every page and offers written enquiry", () => {
    const why = SCOPE_FAQ_ITEMS.find((q) => /phone number on every page/i.test(q.question));
    const email = SCOPE_FAQ_ITEMS.find((q) => /email you instead/i.test(q.question));
    expect(why).toBeTruthy();
    expect(why!.answer).toMatch(/Contact pathways/i);
    expect(why!.answer).not.toMatch(/01732/);
    expect(email).toBeTruthy();
    expect(email!.answer).toMatch(/Contact page/i);
    expect(email!.answer).not.toMatch(/01732/);
  });

  it("ContactForm does not publish firm tel on admin/attendance notice", () => {
    const form = fs.readFileSync(path.join(root, "components/ContactForm.tsx"), "utf8");
    expect(form).toContain("/current-custody");
    expect(form).toContain("/start/voluntary-interview");
    expect(form).not.toMatch(/tel:\$\{PHONE_TEL\}|tel:01732/);
    expect(form).not.toContain("PHONE_DISPLAY");
  });

  it("station CTA copy leads with NOT THE POLICE and has no digits", () => {
    expect(STATION_SOLICITOR_CTA).toMatch(/^NOT THE POLICE/);
    expect(STATION_SOLICITOR_CTA).toMatch(/criminal solicitors/i);
    expect(STATION_SOLICITOR_CTA).toMatch(/forthcoming police interview/i);
    expect(STATION_SOLICITOR_CTA).toMatch(/cannot help/i);
    expect(STATION_SOLICITOR_CTA).not.toMatch(/01732/);
    expect(STATION_CONTACT_BUTTON).toMatch(/what we do/i);
  });

  it("station HTML disambiguation strips firm tel and points to Contact", () => {
    const disambig = fs.readFileSync(
      path.join(root, "lib/seo/disambiguate-station-html.ts"),
      "utf8",
    );
    expect(disambig).toContain("stripFirmTelephoneFromStationHtml");
    expect(disambig).toContain('href="/contact"');
    expect(disambig).toContain("STATION_SOLICITOR_CTA");
  });

  it("FAQ includes already-released free advice rejection", () => {
    const item = SCOPE_FAQ_ITEMS.find((q) =>
      /already been interviewed|released/i.test(q.question),
    );
    expect(item).toBeTruthy();
    expect(item!.answer).toMatch(/No\./);
    expect(item!.answer).toMatch(/booked voluntary|custody/i);
  });

  it("detects already-released free advice enquiries as out of scope", () => {
    expect(isOutOfScopeEnquiry("I've been released and need free advice")).toBe(true);
    expect(isOutOfScopeEnquiry("Someone is in custody right now at Maidstone")).toBe(false);
  });

  it("RUI page CTA does not invite free post-release advice", () => {
    const rui = fs.readFileSync(
      path.join(root, "app/released-under-investigation/page.tsx"),
      "utf8",
    );
    expect(rui).not.toMatch(/free initial consultations/i);
    expect(rui).not.toMatch(/want advice on your case, I can help/i);
    expect(rui).toContain("CTA_WHO_CAN_CALL");
    expect(rui).toContain("CTA_OUT_OF_SCOPE");
  });

  it("WhatsApp URLs open text chat with encoded message", () => {
    const url = whatsAppTextUrl("Hello test");
    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url.includes("text=Hello%20test")).toBe(true);
  });

  it("layout includes sitewide not-police banner and contact guard", () => {
    const layout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");
    expect(layout).toContain("NotPoliceScopeBanner");
    expect(layout).toContain("ContactLinkGuard");
    expect(layout).toMatch(/NOT the Police/);
  });

  it("header uses pathway CTAs not generic legal advice call", () => {
    const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
    expect(header).toMatch(/Get a solicitor/);
    expect(header).toMatch(/For solicitors/);
    expect(header).toMatch(/NOT the police/i);
    expect(header).not.toMatch(/tel:01732/);
    expect(header).not.toMatch(/Call Now for legal advice/i);
  });
});
