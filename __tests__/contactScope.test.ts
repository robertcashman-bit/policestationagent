import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { whatsAppTextUrl, SEO_NOT_POLICE, SERVICE_SCOPE } from "../config/contact";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("contact config", () => {
  it("includes not-police and scope disclaimers", () => {
    expect(SEO_NOT_POLICE).toMatch(/NOT.*Police/i);
    expect(SERVICE_SCOPE).toMatch(/custody/i);
    expect(SERVICE_SCOPE).toMatch(/voluntary/i);
    expect(SERVICE_SCOPE).toMatch(/immediate family/i);
    expect(SERVICE_SCOPE).toMatch(/general legal advice/i);
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
