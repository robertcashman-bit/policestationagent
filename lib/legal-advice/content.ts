import type { LegalAdviceArticle, LegalAdviceCategoryLabel } from './types';

/**
 * Central registry for legal-advice hub pages.
 *
 * To add a new article:
 * 1. Append an entry to LEGAL_ADVICE_ARTICLES (metadata + FAQs below).
 * 2. Add body component in lib/legal-advice/views/{slug}.tsx exporting ArticleBody.
 * 3. Register the view in lib/legal-advice/views/index.ts.
 * 4. Sitemap, hub, llms.txt, and editorial audit pick it up automatically.
 */
export const LEGAL_ADVICE_ARTICLES: LegalAdviceArticle[] = [
  {
    slug: 'do-i-have-to-answer-police-questions',
    categorySlug: 'police-interviews',
    categoryLabel: 'Police Interviews',
    published: '2026-01-15',
    title: 'Do I Have to Answer Police Questions? | Police Station Legal Advice',
    h1: 'Do I Have to Answer Police Questions?',
    description:
      'Understand your rights regarding police questioning in England and Wales, including when you must provide information and the implications of remaining silent.',
    keywords: ['police questions', 'right to silence', 'PACE', 'police interview', 'police station', 'legal rights', 'UK law'],
    shortAnswer:
      'In England and Wales, you are not legally required to answer most police questions. You have the right to remain silent, though you may need to provide your name and address in certain situations. However, remaining silent can have legal implications if you later rely on information in court that you did not mention during questioning.',
    relatedSlugs: [
      'can-police-interview-me-without-a-solicitor',
      'can-i-leave-a-voluntary-police-interview',
      'is-legal-advice-free-at-a-police-station',
    ],
    legalSources: [
      'Police and Criminal Evidence Act 1984 (PACE)',
      'PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers (paragraph 10.5)',
      'Criminal Justice and Public Order Act 1994 (sections 34-38)',
      'Police Reform Act 2002 (section 50)',
      'Road Traffic Act 1988',
    ],
    faqs: [
      {
        question: 'Do I have to answer police questions?',
        answer:
          'In England and Wales, you are not legally required to answer most police questions. You have the right to remain silent, though you may need to provide your name and address in certain situations. However, remaining silent can have legal implications if you later rely on information in court that you did not mention during questioning.',
      },
      {
        question: 'Do I have to answer police questions during a stop and search?',
        answer:
          'No, you are not legally required to answer questions during a stop and search. However, the police officer should explain why you are being searched. You may be asked for your name and address, but there is generally no legal requirement to provide this information during a standard stop and search.',
      },
      {
        question: 'Can remaining silent during a police interview affect my case?',
        answer:
          'Yes, choosing to remain silent can lead to inferences being drawn against you in court, especially if you later present information that you did not disclose during the interview. The Criminal Justice and Public Order Act 1994 allows courts to draw adverse inferences in specific circumstances, such as when you fail to mention facts during questioning that you later rely on in your defence.',
      },
      {
        question: "What should I do if I'm unsure about answering police questions?",
        answer:
          "It's highly advisable to consult with a solicitor before answering any questions. You have the right to free, independent legal advice at the police station, funded by legal aid. A solicitor can help you understand the implications of answering or remaining silent and advise you on the best approach for your specific situation.",
      },
      {
        question: 'Is legal advice free at a police station?',
        answer:
          'Yes, everyone has the right to free, independent legal advice at the police station in England and Wales, regardless of their financial circumstances. This is funded through legal aid. Ask the custody officer to arrange the duty solicitor or your own solicitor.',
      },
      {
        question: "If I remain silent, does that mean I'm guilty?",
        answer:
          'No, this is not true. The right to silence is a fundamental legal protection available to everyone, regardless of guilt or innocence. Exercising this right does not indicate guilt, and the court cannot infer guilt solely from your decision to remain silent. However, the court may draw inferences in specific circumstances outlined in legislation.',
      },
    ],
  },
  {
    slug: 'can-police-interview-me-without-a-solicitor',
    categorySlug: 'police-interviews',
    categoryLabel: 'Police Interviews',
    published: '2026-01-15',
    title: 'Can Police Interview Me Without a Solicitor? | Police Station Legal Advice',
    h1: 'Can Police Interview Me Without a Solicitor?',
    description:
      'Learn about your right to legal advice and when the police must wait for your solicitor to arrive.',
    keywords: ['police interview', 'solicitor', 'legal advice', 'PACE Code C', 'police station', 'UK law'],
    shortAnswer:
      'No, the police cannot normally interview you without a solicitor if you have requested one. Under PACE 1984, Code C, you have the right to free legal advice, and the police must wait a reasonable time for your solicitor to arrive. However, in exceptional circumstances, such as urgent interviews to prevent harm or property loss, the police may proceed without waiting.',
    relatedSlugs: [
      'do-i-have-to-answer-police-questions',
      'can-i-leave-a-voluntary-police-interview',
      'is-legal-advice-free-at-a-police-station',
    ],
    legalSources: [
      'Police and Criminal Evidence Act 1984 (PACE)',
      'PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers (paragraph 6.1, Annex B)',
    ],
    faqs: [
      {
        question: 'Can police interview me without a solicitor?',
        answer:
          'No, the police cannot normally interview you without a solicitor if you have requested one. Under PACE 1984, Code C, you have the right to free legal advice, and the police must wait a reasonable time for your solicitor to arrive. However, in exceptional circumstances, such as urgent interviews to prevent harm or property loss, the police may proceed without waiting.',
      },
      {
        question: 'When can the police interview me without waiting for a solicitor?',
        answer:
          'The police may proceed without waiting for a solicitor only in exceptional circumstances, such as when delay would lead to interference with evidence, harm to others, or alerting other suspects. This requires authorisation by an officer of at least inspector rank and is strictly limited.',
      },
      {
        question: 'Do I have the right to legal advice during a voluntary interview?',
        answer:
          'Yes, even if you attend a police station voluntarily, you still have the right to free legal advice. The police should inform you of this right before the interview begins, and you can request legal advice at any point.',
      },
    ],
  },
  {
    slug: 'can-i-leave-a-voluntary-police-interview',
    categorySlug: 'police-interviews',
    categoryLabel: 'Police Interviews',
    published: '2026-01-15',
    title: 'Can I Leave a Voluntary Police Interview? | Police Station Legal Advice',
    h1: 'Can I Leave a Voluntary Police Interview?',
    description:
      'Understand your rights during voluntary interviews and what happens if you decide to leave.',
    keywords: ['voluntary interview', 'police interview', 'PACE', 'police station', 'legal rights', 'UK law'],
    shortAnswer:
      'Yes, you can generally leave a voluntary police interview at any time because you are not under arrest. However, if the police have sufficient grounds, they may arrest you to continue the interview. It is advisable to seek legal advice before attending a voluntary interview and to inform the police if you wish to leave.',
    relatedSlugs: [
      'do-i-have-to-answer-police-questions',
      'can-police-interview-me-without-a-solicitor',
      'is-legal-advice-free-at-a-police-station',
    ],
    legalSources: [
      'Police and Criminal Evidence Act 1984 (PACE)',
      'PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers',
    ],
    faqs: [
      {
        question: 'Can I leave a voluntary police interview?',
        answer:
          'Yes, you can generally leave a voluntary police interview at any time because you are not under arrest. However, if the police have sufficient grounds, they may arrest you to continue the interview. It is advisable to seek legal advice before attending a voluntary interview and to inform the police if you wish to leave.',
      },
      {
        question: 'What happens if I leave a voluntary police interview?',
        answer:
          'If you leave a voluntary interview, the interview ends and you are free to leave. However, the police investigation continues, and the police may arrest you later if they have sufficient grounds. Leaving does not end the investigation.',
      },
      {
        question: 'Do I need a solicitor for a voluntary interview?',
        answer:
          'Yes, it is highly advisable to have a solicitor present for a voluntary interview. You have the right to free legal advice, and voluntary interviews are conducted under the same caution as interviews following arrest. Anything you say can be used as evidence.',
      },
    ],
  },
  {
    slug: 'is-legal-advice-free-at-a-police-station',
    categorySlug: 'legal-rights',
    categoryLabel: 'Legal Rights',
    published: '2026-01-15',
    title: 'Is Legal Advice Free at a Police Station? | Police Station Legal Advice',
    h1: 'Is Legal Advice Free at a Police Station?',
    description:
      'General information about free legal advice at police stations in England and Wales under the duty solicitor scheme.',
    keywords: ['free legal advice', 'duty solicitor', 'police station', 'legal aid', 'PACE', 'UK law'],
    shortAnswer:
      'Yes, legal advice is free at police stations in England and Wales for everyone, regardless of your financial circumstances. This right is protected under PACE 1984 (Police and Criminal Evidence Act 1984) and is funded through the legal aid system. You can access free advice through the duty solicitor scheme, which operates 24 hours a day, or by contacting your own solicitor.',
    relatedSlugs: [
      'do-i-have-to-answer-police-questions',
      'can-police-interview-me-without-a-solicitor',
      'can-i-leave-a-voluntary-police-interview',
    ],
    legalSources: [
      'Police and Criminal Evidence Act 1984 (PACE)',
      'PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers (paragraph 6.1)',
      'Legal Aid, Sentencing and Punishment of Offenders Act 2012',
    ],
    faqs: [
      {
        question: 'Is legal advice free at a police station?',
        answer:
          'Yes, legal advice is free at police stations in England and Wales for everyone, regardless of your financial circumstances. This right is protected under PACE 1984 (Police and Criminal Evidence Act 1984) and is funded through the legal aid system. You can access free advice through the duty solicitor scheme, which operates 24 hours a day.',
      },
      {
        question: 'Do I have to pay for a solicitor at the police station?',
        answer:
          'No, you do not have to pay for a solicitor at the police station. Legal advice is free for everyone, whether you use the duty solicitor or your own solicitor. The costs are covered by legal aid, and there is no means test for police station advice.',
      },
      {
        question: 'How do I access free legal advice at a police station?',
        answer:
          'You can request free legal advice by telling the custody officer that you want legal advice and asking for the duty solicitor or your own solicitor. You can request legal advice at any time, even if you initially declined it.',
      },
      {
        question: 'Is the duty solicitor independent of the police?',
        answer:
          'Yes, the duty solicitor is completely independent of the police. They are qualified solicitors who work solely in your interests and are funded through legal aid, not by the police. They have professional obligations to act solely for you.',
      },
    ],
  },
];

export function legalAdvicePath(article: Pick<LegalAdviceArticle, 'categorySlug' | 'slug'>): string {
  return `/legal-advice/${article.categorySlug}/${article.slug}`;
}

export function getLegalAdviceArticle(
  categorySlug: string,
  slug: string,
): LegalAdviceArticle | undefined {
  return LEGAL_ADVICE_ARTICLES.find((a) => a.categorySlug === categorySlug && a.slug === slug);
}

export function getAllLegalAdviceArticles(): LegalAdviceArticle[] {
  return [...LEGAL_ADVICE_ARTICLES];
}

export function getAllLegalAdvicePaths(): string[] {
  return LEGAL_ADVICE_ARTICLES.map((a) => legalAdvicePath(a));
}

export function getLegalAdviceArticlesByCategory(): Record<LegalAdviceCategoryLabel, LegalAdviceArticle[]> {
  const map = {
    'Police Interviews': [] as LegalAdviceArticle[],
    'Legal Rights': [] as LegalAdviceArticle[],
  };
  for (const article of LEGAL_ADVICE_ARTICLES) {
    map[article.categoryLabel].push(article);
  }
  return map;
}

export function getRelatedLegalAdviceArticles(slug: string): LegalAdviceArticle[] {
  const article = LEGAL_ADVICE_ARTICLES.find((a) => a.slug === slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((s) => LEGAL_ADVICE_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is LegalAdviceArticle => Boolean(a));
}

/** Plain text for editorial audit units. */
export function legalAdviceAuditText(article: LegalAdviceArticle): string {
  const parts = [
    article.h1,
    article.shortAnswer,
    article.description,
    ...article.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  return parts.join('\n');
}
