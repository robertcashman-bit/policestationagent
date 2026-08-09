import PageShell from "@/components/PageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { VoluntaryInterviewForm } from "@/components/conversion/VoluntaryInterviewForm";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { PATH_VOLUNTARY_LANDING } from "@/config/enquiry-paths";

export const metadata: Metadata = {
  title: "Request Voluntary Interview Representation | Kent | NOT the Police",
  description: `${SEO_NOT_POLICE} Request advice and representation before a forthcoming voluntary police interview under caution in Kent.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/start/voluntary-interview`,
  },
};

export default function VoluntaryInterviewStartPage() {
  return (
    <PageShell forceHidePhone>
      <section className="hero-navy py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-light mb-2">
            Voluntary interview pathway
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Request representation before a police interview under caution
          </h1>
          <p className="text-white/90 mb-2">
            A voluntary interview carries the same legal risks as an interview after arrest.
            Complete the form below — do not attend unrepresented if you can help it.
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
        <VoluntaryInterviewForm />
        <PoliceSignposting />
      </div>
    </PageShell>
  );
}
