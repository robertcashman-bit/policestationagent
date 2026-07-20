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

  it("CTA copy rejects post-release free advice", () => {
    expect(CTA_WHO_CAN_CALL).toMatch(/custody/i);
    expect(CTA_WHO_CAN_CALL).toMatch(/voluntary/i);
    expect(CTA_OUT_OF_SCOPE).toMatch(/after release/i);
    expect(SERVICE_SCOPE_SHORT).toMatch(/post-release/i);
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

  it("header uses custody-scoped phone CTA not generic legal advice", () => {
    const topStrip = fs.readFileSync(path.join(root, "components/header/HeaderTopStrip.tsx"), "utf8");
    expect(topStrip).toContain("HEADER_STRAPLINE");
    expect(topStrip).not.toMatch(/Call Now for legal advice/i);
  });
});
