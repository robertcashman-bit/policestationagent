/**
 * Validate SEO Authority Pages (Phases 3/6/8 support)
 *
 * This is a lightweight quality gate for the 11 authority pages described in
 * SEO_AUTHORITY_IMPLEMENTATION_REPORT.md.
 *
 * It checks for:
 * - Canonical URL
 * - A snippet-friendly "Quick Answer" section
 * - Practitioner/E-E-A-T language marker ("In my experience")
 * - FAQ structured data (FAQPage JSON-LD via JsonLd component)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const PAGES = [
  "app/custody-time-limits/page.tsx",
  "app/no-comment-interview/page.tsx",
  "app/prepared-statements/page.tsx",
  "app/released-under-investigation/page.tsx",
  "app/adverse-inference/page.tsx",
  "app/police-bail-explained/page.tsx",
  "app/pace-code-c/page.tsx",
  "app/youth-custody-rights/page.tsx",
  "app/appropriate-adult/page.tsx",
  "app/can-police-take-my-phone/page.tsx",
  "app/dna-fingerprints-police-station/page.tsx",
];

function checkFile(relPath) {
  const abs = path.join(ROOT, relPath);
  const text = fs.readFileSync(abs, "utf8");

  const issues = [];
  if (!/alternates:\s*\{\s*canonical:\s*['"`]https:\/\/policestationagent\.com\//.test(text)) {
    issues.push("missing/invalid canonical (expected https://policestationagent.com/...)");
  }
  if (!/Quick Answer:/i.test(text)) {
    issues.push('missing "Quick Answer" snippet box');
  }
  if (!/In my experience/i.test(text)) {
    issues.push('missing E‑E‑A‑T marker ("In my experience")');
  }
  if (!/['"`]@type['"`]\s*:\s*['"`]FAQPage['"`]/.test(text)) {
    issues.push("missing FAQPage schema");
  }
  if (!/JsonLd\s+data=\{faqSchema\}/.test(text)) {
    issues.push("missing JsonLd injection for FAQ schema");
  }

  return issues;
}

function main() {
  const failures = [];

  for (const rel of PAGES) {
    const issues = checkFile(rel);
    if (issues.length) failures.push({ page: rel, issues });
  }

  if (!failures.length) {
    console.log(`SEO authority validation OK (${PAGES.length} pages).`);
    return;
  }

  console.error("SEO authority validation FAILED:\n");
  for (const f of failures) {
    console.error(`- ${f.page}`);
    for (const issue of f.issues) console.error(`  - ${issue}`);
  }
  process.exit(1);
}

if (require.main === module) {
  main();
}
