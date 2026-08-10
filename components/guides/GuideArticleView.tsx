import type { Guide } from '@/lib/guides/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  guide: Guide;
  related: Guide[];
  relatedBlog?: import('@/lib/blog/types').BlogPost[];
};

export function GuideArticleView({ guide, related, relatedBlog = [] }: Props) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.description,
    image: [`https://psrtrain.com${guide.heroImage.src}`],
    author: { '@type': 'Organization', name: 'PSR Train', url: 'https://psrtrain.com' },
    publisher: { '@type': 'Organization', name: 'PSR Train', url: 'https://psrtrain.com' },
    about: guide.category,
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#0B3C5D]/70">
          {guide.category} · {guide.readMinutes} min read
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B3C5D] leading-tight">{guide.h1}</h1>
        <div className="bg-[#e8eef5] border-l-4 border-[#0B3C5D] p-4 rounded-r-lg">
          <p className="text-lg text-slate-800 leading-relaxed">{guide.summary}</p>
        </div>
      </header>

      <figure className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        <Image
          src={guide.heroImage.src}
          alt={guide.heroImage.alt}
          width={guide.heroImage.width}
          height={guide.heroImage.height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </figure>

      <div className="prose prose-lg max-w-none space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#0B3C5D]">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {guide.faqs.length > 0 && (
          <section className="space-y-6 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-semibold text-[#0B3C5D]">Frequently asked questions</h2>
            <div className="space-y-4">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-slate-50 p-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedBlog.length > 0 && (
          <section className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-semibold text-[#0B3C5D]">Related blog posts</h2>
            <ul className="space-y-2">
              {relatedBlog.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="font-medium text-[#0B3C5D] underline decoration-slate-300 underline-offset-2 hover:decoration-[#0B3C5D]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-semibold text-[#0B3C5D]">Related guides</h2>
            <ul className="space-y-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="font-medium text-[#0B3C5D] underline decoration-slate-300 underline-offset-2 hover:decoration-[#0B3C5D]"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-xl border border-[#0B3C5D]/15 bg-gradient-to-br from-[#e8eef5] to-white p-6 space-y-3">
          <h2 className="text-xl font-semibold text-[#0B3C5D]">Prepare with PSR Train</h2>
          <p className="text-slate-700 leading-relaxed">
            PSR Train offers timed MCQs, module-based study, Code C–aligned content, and CIT-style
            scenarios to support your PSRAS preparation. Training guidance only — completion does
            not confer accreditation.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-bold text-[#0B3C5D] hover:brightness-95"
            >
              Start free whilst testing
            </Link>
            <Link
              href="/training"
              className="inline-flex items-center rounded-lg border border-[#0B3C5D]/20 px-4 py-2 text-sm font-medium text-[#0B3C5D] hover:bg-white"
            >
              View training overview
            </Link>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-6 text-sm text-slate-600 space-y-2">
          <p>
            This guide is general training information for PSRAS candidates in England and Wales.
            It is not legal advice and does not replace firm supervision, official assessment
            materials, or authorised assessment organisations.
          </p>
          <p>
            <Link href="/guides" className="text-[#0B3C5D] hover:underline">
              ← All PSR guides
            </Link>
          </p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </article>
  );
}
