/** Case law citation checks against legal-case-registry.json */
import { loadCaseRegistry } from "./legal-content-scanner.mjs";

const CASE_PATTERNS = [
  /\*?\s*R\s+v\s+[A-Z][A-Za-z]+/g,
  /\[\d{4}\]\s*EWCA\s*Crim\s*\d+/gi,
  /\(\d{4}\)\s*\d+\s*Cr\s*App\s*R\s*\d+/gi,
];

export function extractCaseCitations(text) {
  const found = new Set();
  for (const re of CASE_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      found.add(m[0].replace(/\*/g, "").trim());
    }
  }
  return [...found];
}

function matchesRegistry(citation, registry) {
  const lower = citation.toLowerCase();
  return registry.some((entry) =>
    entry.citations.some((c) => lower.includes(c.toLowerCase()) || c.toLowerCase().includes(lower)),
  );
}

export function auditCaseCitations(content, contextLabel) {
  const registry = loadCaseRegistry();
  const text = content.replace(/<[^>]+>/g, " ");
  const citations = extractCaseCitations(text);
  const issues = [];

  for (const cite of citations) {
    const inRegistry = matchesRegistry(cite, registry);
    const hasBailii = /bailii\.org/i.test(content);
    const hasCpsPace = /cps\.gov\.uk.*pace/i.test(content);

    if (!inRegistry && !hasBailii) {
      issues.push({
        severity: "error",
        message: `${contextLabel}: unverified case citation "${cite}" — add BAILII link or registry entry`,
      });
    } else if (inRegistry) {
      const entry = registry.find((e) => matchesRegistry(cite, [e]));
      const hasSourceComponent = /LegalReferences|StandardPaceSources|ScrapedHtmlPage/i.test(content);
      if (hasSourceComponent) {
        continue;
      }
      if (entry?.bailiiUrl && !content.includes("bailii.org")) {
        issues.push({
          severity: "warn",
          message: `${contextLabel}: case "${cite}" should link to BAILII when available`,
        });
      }
      if (entry && !entry.bailiiUrl && !hasCpsPace && !content.includes(entry.officialUrl)) {
        issues.push({
          severity: "warn",
          message: `${contextLabel}: case "${cite}" should link to official guidance`,
        });
      }
    }
  }

  return issues;
}
