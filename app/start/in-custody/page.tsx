import PageShell from "@/components/PageShell";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { CustodyQualificationFlow } from "@/components/conversion/CustodyQualificationFlow";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

export const metadata: Metadata = {
  title: "Someone in Custody? | NOT the Police | Arrange Representation Kent",
  description: `${SEO_NOT_POLICE} Check whether we can help with someone currently detained at a Kent police station. Immediate family may instruct subject to detainee confirmation.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/current-custody`,
  },
};

export default function InCustodyPage() {
  return (
    <PageShell forceHidePhone>
      <section className="hero-navy py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-light mb-2">
            Current custody pathway
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Has someone been arrested and taken to a police station?
          </h1>
          <p className="text-white/90">
            This page uses the same qualification pathway as{" "}
            <Link href="/current-custody" className="font-semibold text-accent-light underline">
              /current-custody
            </Link>
            . The solicitor telephone is only shown after you qualify.
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
