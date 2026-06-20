/** Baseline legal content checks: Sources, disclaimer, official links */
import {
  sourcesAtBottom,
  sourcesExternalLinkQuality,
} from "./blog-sources-audit.mjs";
import { isLegalContent } from "./legal-content-scanner.mjs";

const OFFICIAL_DOMAINS = /gov\.uk|legislation\.gov\.uk|cps\.gov\.uk|bailii\.org/i;

const REP_NETWORK_PATTERNS = [
  /how to become a police station rep/i,
  /get paid as a police station/i,
  /register as a police station rep/i,
  /find a police station rep now/i,
  /top 10 tips/i,
  /police station representative directory/i,
];

const FIRM_PATTERNS = [
  /instructing firm/i,
  /criminal defence firm/i,
  /fee earner/i,
  /legal aid billing/i,
  /instruct cover/i,
  /for solicitors/i,
  /when should a solicitor instruct/i,
  /attendance notes.*firm/i,
  /freelance police station agent/i,
  /police station cover for firms/i,
  /instructing a police station representative/i,
  /dscc reference/i,
  /note format/i,
  /billing expectations/i,
];

export function classifyBlogAudience(title, html) {
  const text = `${title} ${html}`;
  if (REP_NETWORK_PATTERNS.some((p) => p.test(text))) return "rep-network";
  const firmHits = FIRM_PATTERNS.filter((p) => p.test(text)).length;
  if (firmHits >= 2) return "firm";
  return "public";
}

export function countOfficialLinks(html) {
  const links = [...(html || "").matchAll(/href="(https?:\/\/[^"]+)"/gi)];
  return links.filter((m) => OFFICIAL_DOMAINS.test(m[1])).length;
}

export function auditBlogBaseline(post) {
  const html = post.contentHtml || "";
  const text = html.replace(/<[^>]+>/g, " ");
  const issues = [];
  const audience = classifyBlogAudience(post.title, html);
  const legal = isLegalContent(text);

  if (audience !== "public" || !legal) {
    return { issues, audience, legal };
  }

  if (!/not kent police/i.test(html)) {
    issues.push({ severity: "error", message: `${post.slug}: missing NOT Kent Police disclaimer` });
  }

  if (!/<h2[^>]*>\s*sources\s*<\/h2>/i.test(html)) {
    issues.push({ severity: "error", message: `${post.slug}: missing Sources section` });
  } else {
    if (!sourcesAtBottom(html)) {
      issues.push({ severity: "error", message: `${post.slug}: Sources not at bottom` });
    }
    const linkCheck = sourcesExternalLinkQuality(html);
    if (!linkCheck.ok) {
      for (const msg of linkCheck.issues) {
        issues.push({ severity: "error", message: `${post.slug}: ${msg}` });
      }
    }
    if (countOfficialLinks(html) < 2) {
      issues.push({
        severity: "error",
        message: `${post.slug}: Sources need at least 2 official links (gov.uk, legislation.gov.uk, cps.gov.uk, bailii.org)`,
      });
    }
  }

  if (!/general information only|not legal advice/i.test(text)) {
    issues.push({ severity: "warn", message: `${post.slug}: missing general-information disclaimer` });
  }

  return { issues, audience, legal };
}

export function auditStaticPageBaseline(page) {
  const content = page.contentHtml || "";
  const issues = [];
  const hasLegalReferences = /LegalReferences|sources:\s*LegalSource\[\]/i.test(content);
  const hasPaceRefs = /PACE|Code C|section \d+|paragraph \d+/i.test(content);

  if (!hasPaceRefs) return { issues, hasLegalReferences };

  if (hasLegalReferences) {
    const hrefs = [...content.matchAll(/href:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
    const official = hrefs.filter((h) => OFFICIAL_DOMAINS.test(h));
    if (official.length === 0) {
      issues.push({
        severity: "error",
        message: `${page.file}: LegalReferences page missing official source URLs`,
      });
    }
  } else if (hasPaceRefs && /dangerouslySetInnerHTML/i.test(content)) {
    issues.push({
      severity: "warn",
      message: `${page.file}: scraped page cites PACE without LegalReferences component`,
    });
  }

  return { issues, hasLegalReferences };
}
