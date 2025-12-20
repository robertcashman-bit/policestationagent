import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/config/site';
import Script from 'next/script';
import { FAQPage } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Pre‑Charge Advice Kent | Duty Solicitor Support Before Charge",
  description:
    "Pre‑charge advice in Kent from a qualified duty solicitor. Strategic representations to police/CPS before a charging decision. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/pre-charge-advice`,
  },
  openGraph: {
    title: "Pre‑Charge Advice Kent | Duty Solicitor Support Before Charge",
    description:
      "Strategic pre‑charge advice and representations before police/CPS charging decisions. Speak to a qualified duty solicitor in Kent.",
    url: `https://${SITE_DOMAIN}/services/pre-charge-advice`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function PreChargeAdvicePage() {
  const faqItems = [
    {
      question: 'What is pre‑charge advice?',
      answer:
        'Pre‑charge advice is legal advice and representation given before the police or CPS make a charging decision. It often involves reviewing evidence, advising on interview strategy, and making written representations to prevent charge or narrow allegations where appropriate.',
    },
    {
      question: 'When is the best time to get pre‑charge advice?',
      answer:
        'As early as possible—ideally before interview and again after interview while the case is being considered for charge. Early advice can help you avoid unnecessary disclosure, protect your position, and ensure key points are raised at the right time.',
    },
    {
      question: 'Can a solicitor speak to the police or CPS for me before I am charged?',
      answer:
        'Yes. Where appropriate, we can make representations to the investigating officer and, in suitable cases, to the CPS. The aim is to highlight weaknesses in the evidence, point to alternative explanations, and provide relevant mitigation before a charging decision is taken.',
    },
    {
      question: 'Is pre‑charge advice free at the police station?',
      answer:
        'Legal advice at the police station is free under Legal Aid. Some pre‑charge work outside the police station may be privately funded depending on circumstances. If funding is relevant, we will explain your options clearly before any work is done.',
    },
    {
      question: 'Do you cover pre‑charge advice across Kent?',
      answer:
        'Yes. We cover Kent custody suites and voluntary interview locations, including Medway, Maidstone, Canterbury, Gravesend and surrounding areas.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pre‑Charge Advice (Kent)',
    description:
      'Pre‑charge advice and representations before charging decisions. Interview strategy, evidence review, and submissions to police/CPS where appropriate.',
    provider: {
      '@type': 'LegalService',
      name: 'Police Station Agent',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'State',
      name: 'Kent',
    },
    serviceType: 'Pre‑Charge Advice',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Telephone',
      servicePhone: '+441732247427',
      availableLanguage: 'English',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <Script
        id="service-schema-pre-charge"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Pre‑Charge Advice (Kent)</h1>
            <p className="lead text-xl text-slate-700 mb-8">
              Pre‑charge work is often where a case is won or lost. If you have been arrested, invited to a voluntary
              interview, or told a charging decision is pending, early advice can protect your position and help ensure
              the right points are raised at the right time.
            </p>

            <h2>What “pre‑charge” means</h2>
            <p>
              “Pre‑charge” covers the period before the police (or the CPS) decide whether to charge, issue an out of
              court disposal, take no further action, or continue the investigation. It can include advice before
              interview, advice during interview, and representations after interview.
            </p>

            <h2>How we help</h2>
            <ul>
              <li>
                <strong>Interview strategy:</strong> whether to answer questions, provide a prepared statement, or make
                no comment (always case‑specific).
              </li>
              <li>
                <strong>Evidence review:</strong> understanding what the police say they have, and what may be missing.
              </li>
              <li>
                <strong>Representations:</strong> written or oral submissions to highlight evidential issues and legal
                points, and to provide relevant mitigation where appropriate.
              </li>
              <li>
                <strong>Next steps planning:</strong> bail/RUI guidance, conditions challenges, and practical advice on
                what to do (and not do) while the case is ongoing.
              </li>
            </ul>

            <h2>When to contact us</h2>
            <p>
              If the police want to speak to you, do not attend an interview without advice. Call us as soon as you can
              so we can help you prepare and protect your rights.
            </p>

            <div className="not-prose mt-10 rounded-xl border bg-white shadow p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Need urgent advice?</h3>
              <p className="text-slate-700 mb-4">
                If you are due to be interviewed or have been arrested, call now for free police station advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:01732247427"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3"
                >
                  Call 01732 247427
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold px-6 py-3"
                >
                  Use the contact form
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                If you are in a police station or custody suite, ask for a solicitor. Police station advice is free
                under Legal Aid.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
