import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DOMAIN } from "@/config/site";
import { REPUK_DIRECTORY_KENT_HREF } from "@/lib/policestationrepuk-promo";
import { StandardPaceSources } from "@/components/legal/StandardPaceSources";

const PATH = "/free-police-station-advice-kent";
const LAST_UPDATED = "2026-06-18";

export const metadata: Metadata = {
  title: "Free Police Station Advice Kent | Duty Solicitor",
  description:
    "Free Legal Aid advice at Kent police stations — not means-tested for most interviews. PACE s.58 rights, duty solicitor scheme, and how to request Robert Cashman at custody or voluntary interviews.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}${PATH}`,
  },
  openGraph: {
    title: "Free Police Station Advice in Kent",
    description:
      "Legal Aid-funded advice at Kent custody suites — what to expect and how to instruct a solicitor.",
    url: `https://${SITE_DOMAIN}${PATH}`,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is police station advice free in Kent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advice at the police station under the Legal Aid scheme is typically free to the detainee in that context, subject to LAA rules and scheme availability.",
      },
    },
    {
      "@type": "Question",
      name: "Who provides free advice at the police station?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accredited duty solicitors and their representatives provide advice under the Legal Aid scheme. Police Station Agent is an independent solicitor practice — not the police.",
      },
    },
  ],
};

export default function FreePoliceStationAdviceKentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <JsonLd data={faqSchema} />
      <Header />
      <main className="flex-grow" id="main-content">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm text-slate-500 mb-2">Last updated: {LAST_UPDATED}</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Free Police Station Advice in Kent
          </h1>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            If someone is in Kent police custody or has a scheduled voluntary interview, they are
            entitled to free legal advice under the Legal Aid scheme at the police station. This
            page explains how that works — it is general information, not advice on a specific case.
          </p>

          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Your PACE rights</h2>
            <p className="text-slate-700 mb-4">
              Under PACE Code C, a detainee may consult a solicitor privately and free of charge at
              the police station. You can ask the custody sergeant to contact the duty solicitor
              scheme or name a firm you prefer.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Advice is independent of the police investigation.</li>
              <li>You may choose your own solicitor if they can attend in time.</li>
              <li>Interviews should not proceed without reasonable opportunity to take advice.</li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">When Police Station Agent can help</h2>
            <p className="text-slate-700 text-sm mb-3">
              Robert Cashman is an accredited duty solicitor covering Kent custody suites. Services
              are for immediate custody and scheduled voluntary interviews only — not past arrests or
              general enquiries.
            </p>
            <Link href="/faq#immediate-custody-only" className="text-blue-700 font-semibold hover:underline">
              Read scope and eligibility →
            </Link>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Related resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/kent-police-custody-resources" className="text-blue-700 font-semibold hover:underline">
                  Kent Police Custody &amp; Interview Resources
                </Link>
              </li>
              <li>
                <Link href="/police-station-solicitor" className="text-blue-700 font-semibold hover:underline">
                  Police station solicitor — what they do
                </Link>
              </li>
              <li>
                <a
                  href={REPUK_DIRECTORY_KENT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Find accredited reps in Kent (PoliceStationRepUK directory)
                </a>
              </li>
            </ul>
          </section>

          <StandardPaceSources />
        </div>
      </main>
      <Footer />
    </div>
  );
}
