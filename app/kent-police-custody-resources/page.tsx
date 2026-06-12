import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DOMAIN } from "@/config/site";
import { RESOURCE_HUB_PATH, RESOURCE_HUB_URL } from "@/config/link-authority";
import {
  AUTHORITY_RESOURCE_LINKS,
  KENT_CUSTODY_STATIONS,
} from "@/lib/kent-custody-stations";
import LinkToUsPanel from "@/components/LinkToUsPanel";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { RIGHTS_HUB, INTERVIEW_HUB } from "@/config/internal-link-hubs";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";

const LAST_UPDATED = "2026-05-30";

export const metadata: Metadata = {
  title: "Kent Police Custody & Interview Resources | Free Guide",
  description:
    "Free, sourced guide to police station rights in Kent: PACE Code C, custody limits, RUI, voluntary interviews, and what to do if someone is arrested. Link-friendly resource hub.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}${RESOURCE_HUB_PATH}`,
  },
  openGraph: {
    title: "Kent Police Custody & Interview Resources",
    description:
      "Neutral explainer hub for Kent custody rights — PACE, time limits, RUI, and family guidance.",
    url: RESOURCE_HUB_URL,
    type: "website",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kent Police Custody & Interview Resources",
  description:
    "Free guide to police station rights and procedures in Kent, with links to detailed explainers.",
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
            Kent Police Custody &amp; Interview Resources
          </h1>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            A free, neutral index of explainers about police station rights and procedures in Kent.
            Sources include{" "}
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

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kent custody suites</h2>
            <p className="text-slate-700 mb-4">
              Station-specific pages on this site (general information only — not live custody status):
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {KENT_CUSTODY_STATIONS.map((s) => (
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
            <h2 className="text-lg font-bold text-slate-900 mb-2">Need representation now?</h2>
            <p className="text-slate-700 text-sm mb-3">
              Immediate custody and scheduled voluntary interviews only — immediate family may
              instruct. Not for past arrests or general enquiries.{" "}
              <Link href="/faq#immediate-custody-only" className="text-blue-600 underline">
                Read scope FAQ
              </Link>
              .
            </p>
            <a href={`tel:${PHONE_TEL}`} className="font-bold text-blue-800">
              {PHONE_DISPLAY}
            </a>
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
