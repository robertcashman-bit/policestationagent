/** PACE citation and misquote checks against pace-reference-registry.json */
import { loadPaceRegistry } from "./legal-content-scanner.mjs";

/** Shared helpers for forbidden-claim detection (allows negated forms). */
export function matchesForbiddenClaim(text, pattern) {
  const re = new RegExp(pattern, "gi");
  let match;
  while ((match = re.exec(text)) !== null) {
    const before = text.slice(Math.max(0, match.index - 30), match.index);
    if (/(?:does|do|did|will|would|can|could|shall|should|must)\s+not\s+$/i.test(before)) {
      continue;
    }
    if (/\bnot\s+$/i.test(before)) {
      continue;
    }
    return true;
  }
  return false;
}


const PACE_SECTION_RE =
  /(?:PACE|Police and Criminal Evidence Act(?: 1984)?)[^.]{0,40}?(?:section|s\.?)\s*(\d+[A-Za-z]?)/gi;
const CODE_C_PARA_RE = /(?:Code C|PACE Code C)[^.]{0,60}?(?:paragraph|para\.?)\s*([\d.]+[A-Za-z]?)/gi;
const STANDALONE_S58_RE = /section 58 of PACE|PACE section 58|s\.?\s*58 of PACE/gi;

export function extractPaceReferences(text) {
  const refs = [];
  let m;
  while ((m = PACE_SECTION_RE.exec(text)) !== null) {
    refs.push({ type: "pace-section", id: `pace-s${m[1].toLowerCase()}`, match: m[0] });
  }
  while ((m = CODE_C_PARA_RE.exec(text)) !== null) {
    const para = m[1].replace(/\./g, "").toLowerCase();
    refs.push({ type: "code-c-paragraph", id: `code-c-${para}`, match: m[0] });
  }
  if (STANDALONE_S58_RE.test(text)) {
    refs.push({ type: "pace-section", id: "pace-s58", match: "section 58" });
  }
  return refs;
}

export function auditPaceCitations(content, contextLabel) {
  const registry = loadPaceRegistry();
  const byId = new Map(registry.map((e) => [e.id, e]));
  const text = content.replace(/<[^>]+>/g, " ");
  const issues = [];

  for (const entry of registry) {
    for (const pattern of entry.forbiddenClaimPatterns || []) {
      if (!pattern) continue;
      if (matchesForbiddenClaim(text, pattern)) {
        const nearPace =
          /pace|code c|section \d+|paragraph \d+/i.test(text) ||
          entry.id === "pace-s58";
        if (nearPace) {
          issues.push({
            severity: "error",
            message: `${contextLabel}: forbidden PACE claim matching /${pattern}/ (registry: ${entry.id})`,
          });
        }
      }
    }
  }

  const refs = extractPaceReferences(text);
  for (const ref of refs) {
    if (!byId.has(ref.id)) continue;
    const entry = byId.get(ref.id);
    const hasOfficialLink =
      entry.officialUrl && content.includes(entry.officialUrl.split("/").slice(-2).join("/"));
    const hasGovLink = /gov\.uk|legislation\.gov\.uk/i.test(content);
    if (refs.length > 0 && !hasGovLink && content.length > 500) {
      issues.push({
        severity: "warn",
        message: `${contextLabel}: cites ${ref.id} but no official gov.uk/legislation link in content`,
      });
    }
    void hasOfficialLink;
  }

  return issues;
}

export function auditGlobalForbiddenClaims(content, contextLabel) {
  const text = content.replace(/<[^>]+>/g, " ");
  const issues = [];
  const globalForbidden = [
    /assessing the weight of that evidence/i,
    /always inadmissible/i,
    /guaranteed to be excluded/i,
    /automatically excluded.*code c breach/i,
    /police must never interview/i,
  ];
  for (const re of globalForbidden) {
    if (re.test(text)) {
      issues.push({
        severity: "error",
        message: `${contextLabel}: forbidden legal claim matching ${re}`,
      });
    }
  }
  if (matchesForbiddenClaim(text, "automatically exclude") && /pace|code c/i.test(text)) {
    issues.push({
      severity: "error",
      message: `${contextLabel}: forbidden legal claim matching /automatically exclude/`,
    });
  }
  return issues;
}
