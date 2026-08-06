import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DOMAIN } from "@/config/site";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";
import { AgencyInstructionForm } from "@/components/conversion/AgencyInstructionForm";
import { AuthorBio } from "@/components/E-E-A-T/AuthorBio";
import { RegulatoryReferences } from "@/components/E-E-A-T/RegulatoryReferences";
import { ServiceDisclaimer } from "@/components/E-E-A-T/ServiceDisclaimer";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { KentCoverCard } from "@/components/conversion/KentCoverCard";

export const metadata: Metadata = {
  title: "Police Station Agency Cover for Solicitors | Kent",
  description:
    "Professional custody and voluntary interview attendance for criminal defence firms across Kent and the stated Maidstone service area, subject to availability.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/for-solicitors`,
  },
  openGraph: {
    title: "Police Station Agency Cover for Solicitors | Kent",
    description:
      "Professional custody and voluntary interview attendance for criminal defence firms across Kent and the stated Maidstone service area, subject to availability.",
    type: "website",
    url: `https://${SITE_DOMAIN}/for-solicitors`,
    siteName: "Police Station Agent",
  },
};

const SERVICES = [
  "Custody attendances",
  "Voluntary interviews",
  "Police station interviews under caution",
  "Pre-interview consultation",
  "Disclosure review",
  "Attendance notes",
  "Post-attendance reporting",
  "Bail and release information where within the agreed instruction",
  "Prison suspect interviews where offered",
  "Geographic coverage within about 45 minutes of Maidstone",
  "Availability subject to confirmation",
  "Conflicts and professional obligations",
];

export default function ForSolicitorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <PersonSchema />
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
          <section className="text-center">
            <p className="inline-flex items-center rounded-md bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 mb-4">
              For criminal defence firms
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Police station agency cover for criminal defence firms
            </h1>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
              Reliable police station attendance across Kent and locations within the stated service
              radius of Maidstone, subject to availability, conflicts and formal acceptance of
              instructions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#agency-instructions"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-amber-500 px-6 py-3 font-bold text-slate-900 hover:bg-amber-400"
              >
                Send agency instructions
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                data-event="agency_phone_click"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md border-2 border-slate-800 px-6 py-3 font-bold text-slate-900 hover:bg-white"
                aria-label={`Call agency line ${PHONE_DISPLAY}`}
              >
                Call agency line
              </a>
              <Link
                href="/servicerates"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md border-2 border-blue-800 px-6 py-3 font-bold text-blue-900 hover:bg-blue-50"
              >
                View rates and terms
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Solicitor and law-firm instructions — {PHONE_DISPLAY}. Not a public legal advice line.
            </p>
          </section>

          <section aria-labelledby="agency-services-heading">
            <h2 id="agency-services-heading" className="text-2xl font-black text-slate-900 mb-4">
              Agency services
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              We do not claim guaranteed attendance or response times. Attendance is subject to
              confirmation. One-off court representation is not offered.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Professional credentials</h2>
            <p className="text-slate-700 mb-3">
              <strong>Robert Cashman</strong> — solicitor; accredited duty solicitor; Higher Rights
              of Audience (Higher Court Advocate); practising since 2001. Legal services are provided
              through <strong>Tuckers Solicitors LLP</strong> (SRA ID: 127795). Defence Legal Services
              Ltd t/a Police Station Agent operates this website and agency arrangements; it does not
              itself provide reserved legal services.
            </p>
          </section>

          <div id="agency-instructions" className="scroll-mt-24">
            <AgencyInstructionForm />
          </div>

          <KentCoverCard />
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/servicerates" className="text-blue-800 font-semibold underline">
              Service rates
            </Link>
            <Link href="/attendanceterms" className="text-blue-800 font-semibold underline">
              Agency terms
            </Link>
            <Link href="/privacy" className="text-blue-800 font-semibold underline">
              Privacy notice
            </Link>
          </div>

          <AuthorBio showFull className="mb-6" />
          <RegulatoryReferences className="mb-6" />
          <ServiceDisclaimer
            whoNotFor={[
              "One-off court representation (we focus exclusively on police station work)",
              "Members of the public seeking free general legal advice by telephone",
            ]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
