import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIRM = /01732\s*247\s*427|01732247427|07535\s*494446|07535494446|\+441732247427|\+447535494446/i;

const ALLOW = new Set([
  "config/contact.ts",
  "lib/seo/strip-firm-phones.ts",
  "lib/seo/police-confusion-score.ts",
  "lib/seo/police-confusion-safe-heal.ts",
  "lib/seo/external-confusion-monitors.ts",
  "lib/seo/disambiguate-station-html.ts",
  "components/conversion/QualifiedPhoneReveal.tsx", // post-pathway client reveal only
]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", "archive", "police-confusion-reports"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts|mdx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

describe("no firm phone digits in public pages/components", () => {
  it("app and public components do not embed firm voice/SMS digits", () => {
    const files = [
      ...walk(path.join(root, "app")),
      ...walk(path.join(root, "components")),
    ];
    const offenders: string[] = [];
    for (const file of files) {
      const rel = path.relative(root, file);
      if (ALLOW.has(rel)) continue;
      // Regex filters that mention digits for scrubbing are OK
      if (rel.includes("RouteAwarePhoneLink") || rel.includes("ContactLinkGuard")) continue;
      const src = fs.readFileSync(file, "utf8");
      if (FIRM.test(src)) offenders.push(rel);
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("public downloadable vCard does not publish firm voice/SMS digits", () => {
    const vcf = path.join(root, "public", "kent-police-station-cover-card.vcf");
    expect(fs.existsSync(vcf)).toBe(true);
    const src = fs.readFileSync(vcf, "utf8");
    expect(src).not.toMatch(FIRM);
    expect(src).not.toMatch(/TEL;/i);
    expect(src).toMatch(/URL:https:\/\/www\.policestationagent\.com\/contact/);
  });
});
