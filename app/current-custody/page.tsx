import PageShell from "@/components/PageShell";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { CustodyQualificationFlow } from "@/components/conversion/CustodyQualificationFlow";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo/page-metadata";

export const metadata: Metadata = {
  title: "Someone in Custody Kent | Check Representation Now — Not the Police",
  description: `${SEO_NOT_POLICE} Someone in custody at a Kent police station? Check whether we can help now. Immediate family may instruct subject to detainee confirmation.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/current-custody`,
  },
  openGraph: {
    title: "Someone in Custody Kent | Check Representation Now — Not the Police",
    description:
      "Someone in custody Kent? Qualification pathway for current police station representation. Not Kent Police.",
    url: `https://${SITE_DOMAIN}/current-custody`,
    siteName: "Police Station Agent",
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Someone in Custody Kent | Check Representation Now — Not the Police",
    description:
      "Someone in custody Kent? Qualification pathway for current police station representation. Not Kent Police.",
    images: [...DEFAULT_TWITTER_IMAGES],
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
