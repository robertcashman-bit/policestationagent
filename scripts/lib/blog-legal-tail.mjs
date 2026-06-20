/** Wrap generated blog HTML with mandatory legal tail for audit compliance. */
import { LEGAL_ACCURACY_DISCLAIMER_HTML } from "./legal-accuracy-disclaimer-html.mjs";

export const STANDARD_SOURCES_HTML = `
<h2>Sources</h2>
<ul>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023 (accessible text)</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/58" rel="noopener noreferrer">PACE 1984, section 58</a> — right to legal advice at the police station</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/76" rel="noopener noreferrer">PACE 1984, section 76</a> — exclusion of confessions</li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>
${LEGAL_ACCURACY_DISCLAIMER_HTML}`;

export function wrapGeneratedBlogHtml(bodyHtml, title) {
  const inner = (bodyHtml || "").trim();
  const hasDisclaimer = /not kent police/i.test(inner);
  const disclaimer = hasDisclaimer
    ? ""
    : `<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>`;

  const hasConclusion = /<h2[^>]*>\s*conclusion\s*<\/h2>/i.test(inner);
  const conclusion = hasConclusion
    ? ""
    : `<h2>Conclusion</h2><p>${title} — general information about police station attendance in Kent. If you need advice for a specific case, contact a solicitor before interview.</p>`;

  const hasSources = /<h2[^>]*>\s*sources\s*<\/h2>/i.test(inner);
  const sources = hasSources ? "" : STANDARD_SOURCES_HTML;

  return `<div class="blog-content">\n${disclaimer}\n${inner}\n${conclusion}\n${sources}\n</div>`;
}
