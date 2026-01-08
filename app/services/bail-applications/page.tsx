import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN, SITE_URL } from "@/config/site";
import Script from "next/script";
import { FAQPage } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Bail Applications Kent | Police Bail, Court Bail & Variations",
  description:
    "Bail applications in Kent: advice on police bail, court bail, conditions, and variations. Speak to a qualified duty solicitor. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/bail-applications`,
  },
  openGraph: {
    title: "Bail Applications Kent | Police Bail, Court Bail & Variations",
    description:
      "Advice and representation for bail applications and bail conditions across Kent custody suites and courts.",
    url: `https://${SITE_DOMAIN}/services/bail-applications`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function BailApplicationsPage() {
  const faqItems = [
    {
      question: "What is police bail?",
      answer:
        "Police bail is when you are released from the police station while the investigation continues, usually with conditions and a return date. If conditions are unreasonable, they may be challenged.",
    },
    {
      question: "What is a bail application?",
      answer:
        "A bail application is a request for release on bail—either from the police or the court—often with proposed conditions. It can also include applications to vary or remove conditions.",
    },
    {
      question: "Can bail conditions be changed?",
      answer:
        "Yes. Depending on the stage of the case, conditions can sometimes be varied or removed. The right approach depends on whether you are on police bail, court bail, or subject to other restrictions.",
    },
    {
      question: "What if I am released under investigation (RUI) instead of bail?",
      answer:
        "RUI means there may be no bail conditions and no fixed return date, but the investigation continues. You still need strategic advice about evidence, interviews, and any future steps by police or CPS.",
    },
    {
      question: "Do you cover bail work across Kent?",
      answer:
        "Yes. We advise on bail and bail conditions connected to Kent custody suites and courts, including Medway, Maidstone, Canterbury, Gravesend and surrounding areas.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bail Applications (Kent)",
    description:
      "Advice and representation for police bail, court bail applications, bail conditions, and variations across Kent.",
    provider: {
      "@type": "LegalService",
      name: "Police Station Agent",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "State",
      name: "Kent",
    },
    serviceType: "Bail Applications",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "Telephone",
      servicePhone: "+441732247427",
      availableLanguage: "English",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <Script
        id="service-schema-bail"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Bail Applications (Kent)</h1>
            <p className="lead text-xl text-slate-700 mb-8">
              Bail decisions and bail conditions can have an immediate impact on your life—where you
              can go, who you can contact, and what you must do next. We provide clear advice and
              practical representation to protect your position and challenge unreasonable
              restrictions where appropriate.
            </p>

            <h2>Common bail situations</h2>
            <ul>
              <li>
                <strong>Police bail:</strong> release from the police station with conditions and a
                return date.
              </li>
              <li>
                <strong>Court bail:</strong> release pending court proceedings, sometimes with
                stricter conditions.
              </li>
              <li>
                <strong>Variations:</strong> applications to change or remove conditions (for
                example, contact or address restrictions).
              </li>
              <li>
                <strong>RUI (Released Under Investigation):</strong> no bail conditions, but the
                investigation continues.
              </li>
            </ul>

            <h2>How we approach bail</h2>
            <p>
              The right strategy depends on the facts of the case and the evidence. We focus on
              practical, persuasive proposals—addressing risk factors, proposing workable
              conditions, and ensuring you understand the consequences of breach.
            </p>

            <div className="not-prose mt-10 rounded-xl border bg-white shadow p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Need advice about bail or conditions?
              </h3>
              <p className="text-slate-700 mb-4">
                If you have been bailed, given a return date, or you are unsure what you can and
                cannot do, call us for urgent guidance.
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
                If you are at a police station, ask for a solicitor. Police station advice is free
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
