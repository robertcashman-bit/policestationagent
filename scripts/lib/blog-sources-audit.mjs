/** Shared blog Sources-section checks for audit scripts and tests. */

export function sourcesSectionIndex(html) {
  return html.search(/<h2[^>]*>\s*sources\s*<\/h2>/i);
}

export function sourcesAtBottom(html) {
  const sourcesIdx = sourcesSectionIndex(html);
  if (sourcesIdx < 0) return false;

  const conclusionIdx = html.search(/<h2[^>]*>\s*conclusion\s*<\/h2>/i);
  const ctaIdx = html.indexOf("advert-cta");
  const anchorIdx = Math.max(conclusionIdx, ctaIdx);

  if (anchorIdx >= 0) return sourcesIdx > anchorIdx;

  // Fallback: Sources in the final third of the HTML
  return sourcesIdx > html.length * 0.66;
}

export function sourcesExternalLinkQuality(html) {
  const sourcesIdx = sourcesSectionIndex(html);
  if (sourcesIdx < 0) return { ok: false, issues: ["missing Sources section"] };

  const tail = html.slice(sourcesIdx);
  const issues = [];

  const externalLinks = [...tail.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)];
  if (externalLinks.length === 0) {
    issues.push("Sources section has no external https links");
  }

  for (const match of externalLinks) {
    const tag = match[0];
    if (!/rel="[^"]*noopener/i.test(tag)) {
      issues.push(`external link missing rel="noopener noreferrer": ${match[1]}`);
    }
  }

  return { ok: issues.length === 0, issues };
}
