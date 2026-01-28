/**
 * Minimal HTML sanitizers for content blocks that are rendered with
 * `dangerouslySetInnerHTML`.
 *
 * These helpers are intentionally conservative: they only transform specific
 * tags we know can cause SEO/structure issues in our templates.
 */
 
/**
 * Converts all <h1> tags in a HTML string to <h2>.
 *
 * Why: our page templates already render a single H1 (e.g. blog post title).
 * Some content sources include an additional <h1> inside the body HTML which
 * can lead to multiple H1s on the same page.
 */
export function convertH1ToH2(html: string): string {
  if (!html) return html;

  // Preserve any attributes on the opening tag.
  const openConverted = html.replaceAll(/<\s*h1(\s[^>]*)?>/gi, "<h2$1>");
  return openConverted.replaceAll(/<\/\s*h1\s*>/gi, "</h2>");
}

