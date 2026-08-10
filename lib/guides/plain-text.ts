import type { Guide } from './types';

/** Full plain-text body for RSS, llms-full.txt, and syndication checks. */
export function guidePlainText(guide: Guide): string {
  const parts: string[] = [guide.summary];
  for (const section of guide.sections) {
    parts.push(section.heading);
    if (section.paragraphs) parts.push(...section.paragraphs);
    if (section.bullets) parts.push(...section.bullets);
  }
  for (const faq of guide.faqs) {
    parts.push(faq.question, faq.answer);
  }
  return parts.join('\n\n');
}
