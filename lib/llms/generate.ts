import { SITE } from '@/lib/site';
import { PSRUK_BECOME_REP_HREF, PSRUK_DIRECTORY_HREF, PSRUK_SITE } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_SITE } from '@/lib/custodynote-promo';
import { PSA_SITE } from '@/lib/policestationagent-promo';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog/content';
import { getAllGuideSlugs, getGuide } from '@/lib/guides/content';
import { getAllLegalAdviceArticles, legalAdvicePath } from '@/lib/legal-advice/content';
import { allTrainingSeoSlugs } from '@/lib/training-seo-landings';
import { blogPlainText } from '@/lib/blog/plain-text';
import { guidePlainText } from '@/lib/guides/plain-text';

export function generateLlmsTxt(): string {
  const guideLines = getAllGuideSlugs()
    .map((slug) => {
      const guide = getGuide(slug);
      if (!guide) return null;
      return `- [${guide.h1}](${SITE.url}/guides/${slug})`;
    })
    .filter(Boolean)
    .join('\n');

  const blogLines = getAllBlogSlugs()
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      return `- [${post.h1}](${SITE.url}/blog/${slug})`;
    })
    .filter(Boolean)
    .join('\n');

  const legalAdviceLines = getAllLegalAdviceArticles()
    .map((article) => `- [${article.h1}](${SITE.url}${legalAdvicePath(article)})`)
    .join('\n');

  const trainingSeoLines = allTrainingSeoSlugs()
    .map((slug) => `- [${slug.replace(/-/g, ' ')}](${SITE.url}/${slug})`)
    .join('\n');

  return `# PSR Train — llms.txt
# Police Station Representative training (PSRAS preparation)

> ${SITE.url} — mock exams, MCQs, PACE study, and CIT-style scenarios for accredited rep candidates in England & Wales.

## Core pages
- [Home](${SITE.url}/)
- [Training modules](${SITE.url}/training)
- [Guides & articles](${SITE.url}/guides)
- [Blog](${SITE.url}/blog)
- [Legal advice hub](${SITE.url}/legal-advice)
- [Pricing](${SITE.url}/pricing)
- [Free access](${SITE.url}/register)

## PSR & PSRAS guides
${guideLines}

## Blog
${blogLines}

## Legal advice (general information)
${legalAdviceLines}

## Training landing pages
${trainingSeoLines}

## Sister sites (Defence Legal network)
- [PoliceStationRepUK directory](${PSRUK_DIRECTORY_HREF})
- [How to become a police station rep](${PSRUK_BECOME_REP_HREF})
- [Custody Note](${CUSTODYNOTE_SITE})
- [Police Station Agent](${PSA_SITE})

## Crawling
- Sitemap: ${SITE.url}/sitemap.xml
- Robots: ${SITE.url}/robots.txt
- RSS (guides): ${SITE.url}/feed
- RSS (blog): ${SITE.url}/blog/feed
- Full text export: ${SITE.url}/llms-full.txt

## Contact
- ${SITE.contactEmail}
`;
}

export function generateLlmsFullTxt(): string {
  const sections: string[] = [
    '# PSR Train — llms-full.txt',
    '',
    `Site: ${SITE.url}`,
    '',
  ];

  for (const slug of getAllGuideSlugs()) {
    const guide = getGuide(slug);
    if (!guide) continue;
    sections.push(`## Guide: ${guide.h1}`, '', guidePlainText(guide), '', '---', '');
  }

  for (const slug of getAllBlogSlugs()) {
    const post = getBlogPost(slug);
    if (!post) continue;
    sections.push(`## Blog: ${post.h1}`, '', blogPlainText(post), '', '---', '');
  }

  for (const article of getAllLegalAdviceArticles()) {
    sections.push(
      `## Legal advice: ${article.h1}`,
      '',
      article.shortAnswer,
      '',
      ...article.faqs.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, '']),
      '',
      '---',
      '',
    );
  }

  return sections.join('\n');
}
