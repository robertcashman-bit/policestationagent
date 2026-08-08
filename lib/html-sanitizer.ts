/**
 * Minimal HTML sanitizers for content blocks that are rendered with
 * `dangerouslySetInnerHTML`.
 */

import sanitizeHtml from 'sanitize-html';

const CONTENT_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'figure',
    'figcaption',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class'],
    a: ['href', 'name', 'target', 'rel', 'class'],
    div: ['class', 'id'],
    span: ['class'],
    p: ['class'],
    h1: ['class', 'id'],
    h2: ['class', 'id'],
    h3: ['class', 'id'],
    h4: ['class', 'id'],
    h5: ['class', 'id'],
    h6: ['class', 'id'],
    figure: ['class'],
    figcaption: ['class'],
    ul: ['class'],
    ol: ['class'],
    li: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    img: ['http', 'https'],
  },
};

/**
 * Converts all <h1> tags in a HTML string to <h2>.
 */
export function convertH1ToH2(html: string): string {
  if (!html) return html;

  const openConverted = html.replaceAll(/<\s*h1(\s[^>]*)?>/gi, '<h2$1>');
  return openConverted.replaceAll(/<\/\s*h1\s*>/gi, '</h2>');
}

/** Sanitize blog HTML for public render (strips scripts, event handlers, etc.). */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return html;
  const withoutH1 = convertH1ToH2(html);
  return sanitizeHtml(withoutH1, CONTENT_SANITIZE_OPTIONS);
}

/** Sanitize scraped legacy HTML blobs before `dangerouslySetInnerHTML`. */
export function sanitizeScrapedHtml(html: string): string {
  if (!html) return html;
  return sanitizeHtml(html, CONTENT_SANITIZE_OPTIONS);
}
