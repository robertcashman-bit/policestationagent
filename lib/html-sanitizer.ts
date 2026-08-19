/**
 * Minimal HTML sanitizers for content blocks that are rendered with
 * `dangerouslySetInnerHTML`.
 */

import sanitizeHtml from 'sanitize-html';

/** Safe presentational SVG subset — scraped pages use Lucide icons inline. */
const SVG_TAGS = [
  'svg',
  'path',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'g',
  'defs',
  'clipPath',
  'use',
  'title',
  'desc',
] as const;

const CLASS_ID_TAGS = [
  'div',
  'span',
  'p',
  'section',
  'article',
  'header',
  'footer',
  'nav',
  'aside',
  'main',
  'button',
  'ul',
  'ol',
  'li',
  'figure',
  'figcaption',
  'blockquote',
  'strong',
  'em',
  'time',
  'address',
] as const;

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

const CONTENT_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    ...HEADING_TAGS,
    'figure',
    'figcaption',
    'section',
    'article',
    'header',
    'footer',
    'nav',
    'aside',
    'main',
    'button',
    ...SVG_TAGS,
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class', 'decoding'],
    a: ['href', 'name', 'target', 'rel', 'class', 'aria-label', 'title'],
    ...Object.fromEntries(CLASS_ID_TAGS.map((tag) => [tag, ['class', 'id', 'role', 'aria-label', 'aria-hidden']])),
    ...Object.fromEntries(HEADING_TAGS.map((tag) => [tag, ['class', 'id']])),
    button: ['class', 'type', 'aria-label', 'disabled'],
    svg: [
      'xmlns',
      'width',
      'height',
      'viewBox',
      'viewbox',
      'fill',
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-linejoin',
      'class',
      'aria-hidden',
      'role',
      'focusable',
    ],
    path: ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'class'],
    circle: ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width', 'class'],
    rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', 'stroke-width', 'class'],
    line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', 'class'],
    polyline: ['points', 'fill', 'stroke', 'stroke-width', 'class'],
    polygon: ['points', 'fill', 'stroke', 'stroke-width', 'class'],
    g: ['fill', 'stroke', 'transform', 'class'],
    use: ['href', 'xlink:href', 'x', 'y', 'width', 'height'],
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
