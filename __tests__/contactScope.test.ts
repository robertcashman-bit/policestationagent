import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { whatsAppTextUrl, SEO_NOT_POLICE, SERVICE_SCOPE } from "../config/contact";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

test("contact config includes not-police and scope disclaimers", () => {
  assert.match(SEO_NOT_POLICE, /NOT.*Police/i);
  assert.match(SERVICE_SCOPE, /custody/i);
  assert.match(SERVICE_SCOPE, /voluntary/i);
  assert.match(SERVICE_SCOPE, /immediate family/i);
  assert.match(SERVICE_SCOPE, /general legal advice/i);
});

test("WhatsApp URLs open text chat with encoded message", () => {
  const url = whatsAppTextUrl("Hello test");
  assert.ok(url.startsWith("https://wa.me/"));
  assert.ok(url.includes("text=Hello%20test"));
});

test("layout includes sitewide not-police banner and contact guard", () => {
  const layout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");
  assert.ok(layout.includes("NotPoliceScopeBanner"));
  assert.ok(layout.includes("ContactLinkGuard"));
  assert.match(layout, /NOT the Police/);
});

test("header uses custody-scoped phone CTA not generic legal advice", () => {
  const topStrip = fs.readFileSync(path.join(root, "components/header/HeaderTopStrip.tsx"), "utf8");
  assert.ok(topStrip.includes("HEADER_STRAPLINE"));
  assert.doesNotMatch(topStrip, /Call Now for legal advice/i);
});
