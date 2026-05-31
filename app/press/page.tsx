import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { AUTHORITY_NAP, RESOURCE_HUB_URL } from "@/config/link-authority";

export const metadata: Metadata = {
  title: "Press & Media | Police Station Agent",
  description:
    "Robert Cashman — accredited duty solicitor, Kent police station representation. Expert commentary on PACE, custody, and voluntary interviews.",
  alternates: { canonical: `https://${SITE_DOMAIN}/press` },
};

const topics = [
  "PACE Code C and rights in police custody",
  "Custody time limits and detention reviews",
  "Released under investigation (RUI)",
  "Voluntary police interviews",
  "What immediate family can do when someone is arrested",
  "Police station representation vs unregulated agents",
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16" id="main-content">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Press &amp; media</h1>
        <p className="text-lg text-slate-700 mb-8">
          Robert Cashman is an accredited duty solicitor with over 35 years&apos; criminal law
          experience, providing police station representation in Kent via Tuckers Solicitors LLP
          (SRA ID 127795).
        </p>

        <section className="bg-white rounded-xl border p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-3">Commentary topics</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3">Resource for journalists</h2>
          <p className="text-slate-700 mb-3">
            Neutral, sourced explainer hub (free to link):
          </p>
          <Link href="/kent-police-custody-resources" className="text-blue-700 font-semibold underline">
            {RESOURCE_HUB_URL}
          </Link>
        </section>

        <section className="space-y-2 text-slate-700">
          <p>
            <strong>Telephone:</strong>{" "}
            <a href={`tel:${AUTHORITY_NAP.phoneTel}`}>{AUTHORITY_NAP.phone}</a> (custody /
            interviews only)
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${AUTHORITY_NAP.email}`} className="text-blue-600 underline">
              {AUTHORITY_NAP.email}
            </a>
          </p>
          <p className="text-sm text-slate-600 pt-4">
            Not Kent Police. Independent defence solicitor website.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
