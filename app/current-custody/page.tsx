import PageShell from "@/components/PageShell";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { CustodyQualificationFlow } from "@/components/conversion/CustodyQualificationFlow";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

export const metadata: Metadata = {
  title: "Current Custody Representation | Kent Police Station | NOT the Police",
  description: `${SEO_NOT_POLICE} Check whether we can help with someone currently detained at a Kent police station. Immediate family may instruct subject to detainee confirmation.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/current-custody`,
  },
  openGraph: {
    title: "Current Custody Representation | Kent | NOT the Police",
    description:
      "Qualification pathway for current Kent police custody representation. Not Kent Police.",
    url: `https://${SITE_DOMAIN}/current-custody`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function CurrentCustodyPage() {
  return (
    <PageShell forceHidePhone>
      <section className="hero-navy py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-light mb-2">
            Current custody pathway
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Someone in custody at a Kent police station?
          </h1>
          <p className="text-white/90">
            Answer a few questions first. The solicitor telephone is only shown if the enquiry
            qualifies for current custody representation.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-12 space-y-8">
        <CustodyQualificationFlow />
        <PoliceSignposting />
      </div>
    </PageShell>
  );
}
