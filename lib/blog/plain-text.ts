import type { BlogPost } from './types';

/** Full plain-text body for RSS syndication and Buffer character checks. */
export function blogPlainText(post: BlogPost): string {
  const parts: string[] = [post.summary];
  for (const section of post.sections) {
    parts.push(section.heading);
    if (section.paragraphs) parts.push(...section.paragraphs);
    if (section.bullets) parts.push(...section.bullets);
  }
  return parts.join('\n\n');
}

export const BUFFER_MIN_CHARS = 2000;

export function meetsBufferLength(post: BlogPost): boolean {
  return blogPlainText(post).length >= BUFFER_MIN_CHARS;
}
