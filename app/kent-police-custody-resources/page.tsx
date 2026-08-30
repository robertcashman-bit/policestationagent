import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DOMAIN } from "@/config/site";
import { RESOURCE_HUB_PATH, RESOURCE_HUB_URL } from "@/config/link-authority";
import {
  AUTHORITY_RESOURCE_LINKS,
  KENT_OPERATIONAL_CUSTODY_STATIONS,
  KENT_VAI_STATIONS,
} from "@/lib/kent-custody-stations";
import LinkToUsPanel from "@/components/LinkToUsPanel";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { RIGHTS_HUB, INTERVIEW_HUB } from "@/config/internal-link-hubs";

const LAST_UPDATED = "2026-05-30";

export const metadata: Metadata = {
  title: "Kent Custody Rights Resource Hub | Defence Solicitor Guide (NOT the Police)",
  description:
    "Independent criminal defence resource hub — NOT Kent Police. Free, sourced guides on PACE rights, custody time limits, RUI and voluntary interviews in Kent. Not a custody suite contact directory.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}${RESOURCE_HUB_PATH}`,
  },
  openGraph: {
    title: "Kent Custody Rights Resource Hub | NOT the Police",
    description:
      "Defence solicitor explainer hub for Kent custody rights — PACE, time limits, RUI, and family guidance. Not a police contact page.",
    url: RESOURCE_HUB_URL,
    type: "website",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kent Custody Rights Resource Hub — Independent Defence Solicitors",
  description:
    "Independent criminal defence guide to police station rights and procedures in Kent. Not affiliated with Kent Police.",
  url: RESOURCE_HUB_URL,
  dateModified: LAST_UPDATED,
  inLanguage: "en-GB",
  isPartOf: { "@type": "WebSite", name: "Police Station Agent", url: `https://${SITE_DOMAIN}` },
};

export default function KentPoliceCustodyResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <JsonLd data={webPageSchema} />
      <Header />
      <main className="flex-grow" id="main-content">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm text-slate-500 mb-2">Last updated: {LAST_UPDATED}</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Kent Custody Rights Resource Hub
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-950 mb-1">
              Independent defence solicitors — NOT Kent Police
            </p>
            <p className="text-sm text-red-950 leading-relaxed">
              This is not a custody suite contact directory. We cannot supply custody telephone
              numbers, emails, or FP/DNA chase contacts for police officers. For police assistance
              use 101 or 999.
            </p>
          </div>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            A free index of explainers about police station rights and procedures in Kent, written
            for detainees, families and defence practitioners. Sources include{" "}
            <a
              href="https://www.gov.uk/arrested-your-rights"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              GOV.UK
            </a>{" "}
            and{" "}
            <a
              href="https://www.legislation.gov.uk/ukpga/1984/60/contents"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              PACE 1984
            </a>
            . This hub is maintained by Robert Cashman, accredited duty solicitor (Kent).
          </p>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Core guides</h2>
            <ul className="space-y-2">
              {AUTHORITY_RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-blue-700 font-semibold hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Kent police station map</h2>
            <p className="text-slate-700 mb-4">
              Interactive map of custody suites and major stations from our West Kingsdown base,
              with approximate distances and drive times.
            </p>
            <Link
              href="/resources/kent-police-station-map"
              className="inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Open the Kent station map
            </Link>
            <span className="mx-2 text-slate-400">·</span>
            <Link href="/coverage" className="text-sm font-semibold text-blue-700 hover:underline">
              Full coverage page
            </Link>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kent custody suites</h2>
            <p className="text-slate-700 mb-4">
              Operational public custody suites linked from this hub (general information only — not
              live custody status):
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {KENT_OPERATIONAL_CUSTODY_STATIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-blue-300 hover:bg-blue-50"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-2">
              Voluntary interview stations
            </h3>
            <p className="text-slate-700 mb-4">
              These stations are not public custody suites. Maidstone custody is closed — voluntary
              interviews only.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {KENT_VAI_STATIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-blue-300 hover:bg-blue-50"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Link to this resource</h2>
            <p className="text-slate-600 mb-4 text-sm">
              Councils, law societies, blogs, and training providers may link to this page.
            </p>
            <LinkToUsPanel />
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Need defence representation?</h2>
            <p className="text-slate-700 text-sm mb-3">
              Immediate custody and scheduled voluntary interviews only — immediate family may
              instruct. Not for past arrests, police/OIC enquiries, or general advice.{" "}
              <Link href="/faq#immediate-custody-only" className="text-blue-600 underline">
                Read scope FAQ
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm font-semibold">
              <Link href="/current-custody" className="text-blue-800 underline">
                Someone in custody now
              </Link>
              <Link href="/start/voluntary-interview#request" className="text-blue-800 underline">
                Booked interview — request representation
              </Link>
              <Link href="/for-solicitors" className="text-blue-800 underline">
                Solicitors — agency cover
              </Link>
            </div>
          </section>

          <div className="mt-10 space-y-8">
            <InternalLinkHub title={RIGHTS_HUB.title} links={RIGHTS_HUB.links} />
            <InternalLinkHub title={INTERVIEW_HUB.title} links={INTERVIEW_HUB.links} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
