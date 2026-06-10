import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DOMAIN } from "@/config/site";

const PATH = "/police-station-solicitor";
const LAST_UPDATED = "2026-06-06";

export const metadata: Metadata = {
  title: "Police Station Solicitor | Kent Criminal Defence Cover",
  description:
    "What a criminal defence solicitor does at the police station in Kent: Legal Aid advice, interview representation, PACE safeguards, and agency cover for law firms.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}${PATH}`,
  },
  openGraph: {
    title: "Police Station Solicitor — Kent",
    description:
      "Solicitor-led police station representation under Legal Aid and private schemes in Kent.",
    url: `https://${SITE_DOMAIN}${PATH}`,
    type: "website",
  },
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Police Station Agent — police station solicitor services",
  url: `https://${SITE_DOMAIN}${PATH}`,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kent",
  },
  provider: {
    "@type": "Attorney",
    name: "Robert Cashman",
    url: `https://${SITE_DOMAIN}/about`,
  },
  serviceType: "Police station criminal defence representation",
};

export default function PoliceStationSolicitorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <JsonLd data={legalServiceSchema} />
      <Header />
      <main className="flex-grow" id="main-content">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm text-slate-500 mb-2">Last updated: {LAST_UPDATED}</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Police Station Solicitor
          </h1>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            A police station solicitor is a qualified criminal defence lawyer accredited to advise
            and represent clients in custody and at voluntary interviews. In Kent, Robert Cashman
            provides solicitor-led attendance at custody suites and scheduled voluntary interviews.
          </p>

          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What a solicitor does at the station</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Advises on PACE rights, disclosure, and interview strategy.</li>
              <li>Represents the client during interview under caution.</li>
              <li>Challenges unlawful detention or procedural breaches where appropriate.</li>
              <li>Advises on bail, release under investigation, and next steps.</li>
            </ul>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Legal Aid at the police station</h2>
            <p className="text-slate-700 text-sm">
              Advice at the police station under the Legal Aid scheme is typically free to the
              client in that context. Eligibility follows LAA rules.{" "}
              <Link href="/free-police-station-advice-kent" className="text-blue-700 font-semibold hover:underline">
                Read our Kent free-advice guide
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">For law firms</h2>
            <p className="text-slate-700 mb-3">
              Police Station Agent also provides agency cover for criminal defence firms needing Kent
              attendance.
            </p>
            <Link href="/for-solicitors" className="text-blue-700 font-semibold hover:underline">
              Agent cover for solicitors →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
