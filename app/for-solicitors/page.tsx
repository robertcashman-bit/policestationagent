import PageShell from "@/components/PageShell";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DOMAIN } from "@/config/site";
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
    <PageShell forceHidePhone>
      <PersonSchema />
      <section className="hero-navy py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="inline-flex items-center rounded-md bg-accent text-accent-foreground text-xs font-bold px-3 py-1 mb-4">
            For criminal defence firms
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Police station agency cover for criminal defence firms
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            Reliable police station attendance across Kent and locations within the stated service
            radius of Maidstone, subject to availability, conflicts and formal acceptance of
            instructions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#agency-instructions" className="btn-gold min-h-[48px] px-6">
              Send agency instructions
            </a>
            <Link
              href="/contact"
              data-event="agency_contact_click"
              className="btn-ghost-light min-h-[48px] px-6"
              aria-label="Agency cover via Contact pathways"
            >
              Contact pathways
            </Link>
            <Link
              href="/servicerates"
              className="inline-flex items-center justify-center min-h-[48px] rounded-md border-2 border-white/50 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              View rates and terms
            </Link>
          </div>
          <p className="mt-3 text-sm text-white/75">
            Solicitor and law-firm instructions — use the form below or Contact pathways. Telephone
            and SMS are not published as digits on this page. Not a public legal advice line.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <section aria-labelledby="agency-services-heading">
          <h2 id="agency-services-heading" className="font-display text-2xl font-bold text-primary mb-4">
            Agency services
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {SERVICES.map((item) => (
              <li key={item} className="surface-card px-4 py-3 text-sm text-foreground">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            We do not claim guaranteed attendance or response times. Attendance is subject to
            confirmation. One-off court representation is not offered.
          </p>
        </section>

        <section className="surface-card p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-primary mb-3">Professional credentials</h2>
          <p className="text-muted-foreground mb-3">
            <strong className="text-foreground">Robert Cashman</strong> — solicitor; accredited duty
            solicitor; Higher Rights of Audience (Higher Court Advocate); practising since 2001. Legal
            services are provided through <strong className="text-foreground">Tuckers Solicitors LLP</strong>{" "}
            (SRA ID: 127795). Defence Legal Services Ltd t/a Police Station Agent operates this website
            and agency arrangements; it does not itself provide reserved legal services.
          </p>
        </section>

        <div id="agency-instructions" className="scroll-mt-24">
          <AgencyInstructionForm />
        </div>

        <KentCoverCard />
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/servicerates" className="text-primary font-semibold underline">
            Service rates
          </Link>
          <Link href="/attendanceterms" className="text-primary font-semibold underline">
            Agency terms
          </Link>
          <Link href="/privacy" className="text-primary font-semibold underline">
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
    </PageShell>
  );
}
