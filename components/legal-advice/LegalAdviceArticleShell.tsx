import type { LegalAdviceArticle } from '@/lib/legal-advice/types';
import type { ReactNode } from 'react';

type Props = {
  article: LegalAdviceArticle;
  children: ReactNode;
};

export function LegalAdviceArticleShell({ article, children }: Props) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{article.h1}</h1>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-lg text-gray-800 leading-relaxed">{article.shortAnswer}</p>
        </div>
      </header>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </article>
  );
}
