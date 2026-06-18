/**
 * Validate SEO Authority Pages (Phases 3/6/8 support)
 *
 * Lightweight quality gate for the 11 authority pages in SEO_AUTHORITY_IMPLEMENTATION_REPORT.md.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_DOMAIN = "www.policestationagent.com";

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

const CANONICAL_RE = new RegExp(
  `alternates:\\s*\\{\\s*canonical:\\s*['"\`]https://${SITE_DOMAIN.replace(/\./g, "\\.")}/`,
);

function checkFile(relPath) {
  const abs = path.join(ROOT, relPath);
  const text = fs.readFileSync(abs, "utf8");

  const issues = [];
  if (
    !CANONICAL_RE.test(text) &&
    !/canonical:\s*`https:\/\/\$\{SITE_DOMAIN\}\//.test(text)
  ) {
    issues.push(`missing/invalid canonical (expected https://${SITE_DOMAIN}/...)`);
  }
  if (!/Quick Answer:/i.test(text) && !/AnswerFirstBlock/.test(text)) {
    issues.push('missing snippet block ("Quick Answer" or AnswerFirstBlock)');
  }
  if (!/In my experience|In practice|As a duty solicitor|practising as|Robert Cashman/i.test(text)) {
    issues.push("missing E‑E‑A‑T practitioner marker");
  }
  if (
    !/['"`]@type['"`]\s*:\s*['"`]FAQPage['"`]/.test(text) &&
    !/<FAQPage\s/.test(text)
  ) {
    issues.push("missing FAQPage schema");
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
