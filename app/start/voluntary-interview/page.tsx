import PageShell from "@/components/PageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { VoluntaryInterviewForm } from "@/components/conversion/VoluntaryInterviewForm";
import { ShortVoluntaryRequestForm } from "@/components/conversion/ShortVoluntaryRequestForm";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { PATH_VOLUNTARY_LANDING } from "@/config/enquiry-paths";

export const metadata: Metadata = {
  title: "Request Voluntary Interview Representation | Kent | NOT the Police",
  description: `${SEO_NOT_POLICE} Free solicitor for a forthcoming voluntary police interview under caution in Kent. Short form — defence solicitors, not the police.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/start/voluntary-interview`,
  },
};

export default function VoluntaryInterviewStartPage() {
  return (
    <PageShell forceHidePhone>
      <section className="hero-navy py-10 md:py-12" data-testid="va-start-first-screen">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-light mb-2">
            Defence solicitors · not the police · Kent
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Free solicitor for a voluntary interview under caution
          </h1>
          <p className="text-white/90 mb-2">
            We are independent criminal defence solicitors — not Kent Police. A voluntary interview
            carries the same legal risks as an interview after arrest. Use the short form below to
            request a free solicitor before you attend. For police use 999 or 101.
          </p>
          <p className="text-sm text-white/75">
            Background reading:{" "}
            <Link
              href={PATH_VOLUNTARY_LANDING}
              className="underline font-semibold text-accent-light"
            >
              voluntary interviews overview
            </Link>
            .
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-12 space-y-8">
        <section id="request" className="scroll-mt-24 space-y-4">
          <h2 className="font-display text-xl font-bold text-primary">Short request</h2>
          <ShortVoluntaryRequestForm />
        </section>
        <section id="full-form" className="scroll-mt-24 space-y-4">
          <h2 className="font-display text-xl font-bold text-primary">Full form (optional detail)</h2>
          <VoluntaryInterviewForm reportFormStart={false} />
        </section>
        <PoliceSignposting />
      </div>
    </PageShell>
  );
}
