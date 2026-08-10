import Link from 'next/link';
import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import type { TrainingSeoLanding } from '@/lib/training-seo-landings';

export function TrainingSeoLandingView({ page }: { page: TrainingSeoLanding }) {
  const faqSchema =
    page.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <>
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <MarketingHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-emerald-400">
        <h1>{page.h1}</h1>
        <p className="text-lg text-slate-300">{page.lede}</p>
        <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        {page.faq.length > 0 && (
          <>
            <h2>FAQ</h2>
            {page.faq.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </>
        )}
        {page.relatedLinks.length > 0 && (
          <>
            <h2>Related</h2>
            <ul>
              {page.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="not-prose mt-10">
          <Link
            href="/register"
            className="inline-flex rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-emerald-500"
          >
            Register interest — free account
          </Link>
        </p>
      </article>
      </main>
      <Footer />
    </>
  );
}
