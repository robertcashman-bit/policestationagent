import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/config/site';
import Script from 'next/script';
import { FAQPage } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Police Station Duty Solicitor Kent | Police Station Representation Solicitor | FREE Legal Advice",
  description: "Police Station Duty Solicitor Kent - Expert police station representation by qualified solicitor. FREE legal advice under Legal Aid at all Kent custody suites. Accredited Duty Solicitor & Higher Court Advocate Robert Cashman. Medway, Maidstone, Canterbury, Gravesend. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/police-station-representation`,
  },
  openGraph: {
    title: "Police Station Duty Solicitor Kent | Duty Solicitor Representation Kent | FREE Advice",
    description: "Police Station Duty Solicitor Kent - Expert representation by qualified solicitor Robert Cashman. Accredited Duty Solicitor & Higher Court Advocate. FREE legal advice under Legal Aid at Medway, Canterbury, Maidstone, Gravesend custody suites.",
    url: `https://${SITE_DOMAIN}/services/police-station-representation`,
    siteName: 'Criminal Defence Kent',
    type: 'website',
  },
};

// Service schema for Police Station Representation
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Police Station Representation",
  "description": "Police Station Duty Solicitor Kent - FREE police station representation by qualified solicitor across all Kent custody suites. Accredited Duty Solicitor available for police interviews, voluntary interviews, and custody matters.",
  "provider": {
    "@type": "LegalService",
    "name": "Criminal Defence Kent",
    "url": SITE_URL
  },
  "areaServed": {
    "@type": "State",
    "name": "Kent"
  },
  "serviceType": "Police Station Representation",
  "category": "Legal Services",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
    "description": "FREE under Legal Aid",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceType": "Telephone",
    "servicePhone": "+441732247427",
    "availableLanguage": "English"
  }
};

export default function PoliceStationRepresentationPage() {
  const faqItems = [
    {
      question: "Are police station solicitors independent of the police?",
      answer: "Yes, absolutely. Your solicitor is completely independent of the police and works only for YOU. We are not employed by, paid by, or connected to the police in any way. Legal Aid funds your representation, not the police. Everything you discuss with your solicitor is confidential and cannot be shared with police without your consent."
    },
    {
      question: "Is police station rep service free in Kent?",
      answer: "Yes. Everyone arrested or invited for a voluntary interview in Kent is entitled to FREE legal advice at the police station under Legal Aid. This is a statutory right under PACE 1984 and is not means-tested."
    },
    {
      question: "How quickly can a duty solicitor attend in Kent?",
      answer: "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability. Our extended hours service covers all Kent police stations including evenings, weekends and bank holidays, ensuring rapid response across all Kent custody suites."
    },
    {
      question: "Which Kent custody suites do you cover as a duty solicitor?",
      answer: "We cover all Kent custody suites including Medway (Gillingham), Maidstone, North Kent (Gravesend), Canterbury, Tonbridge, Folkestone, Ashford, Dartford, Sittingbourne, Sevenoaks, Tunbridge Wells, Margate, Dover, Swanley, and Bluewater. We also cover voluntary interview locations across Kent."
    },
    {
      question: "What's the difference between a qualified solicitor and a police station agent?",
      answer: "A qualified solicitor is a fully trained legal professional who has completed the Legal Practice Course and training contract. A police station agent (accredited representative) is a non-solicitor who has passed the Police Station Qualification. Robert Cashman is a qualified solicitor with 35+ years experience and Higher Court Advocate status — not just an agent — providing expert independent legal advice."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Independent Police Station Solicitor Kent</h1>
            <p className="lead text-xl text-slate-700 mb-8">
              Expert police station representation by qualified solicitor. FREE legal advice under Legal Aid at all Kent custody suites. Independent Defence Solicitor & Higher Court Advocate Robert Cashman - 35+ years experience, 21,000+ cases.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 mb-8">
              <p className="text-green-800 font-medium text-sm m-0">🛡️ <strong>We are completely independent of the police.</strong> Your solicitor works for YOU — not the police, not the CPS. Everything you discuss is confidential.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
