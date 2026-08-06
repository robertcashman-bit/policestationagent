import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { VoluntaryInterviewForm } from "@/components/conversion/VoluntaryInterviewForm";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { PATH_VOLUNTARY } from "@/config/enquiry-paths";

export const metadata: Metadata = {
  title: "Voluntary Police Interview Solicitor in Kent",
  description:
    "Invited to a voluntary police interview under caution in Kent? Request advice and representation before attending.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/voluntary-interviews`,
  },
  openGraph: {
    title: "Voluntary Police Interview Solicitor in Kent",
    description: `${SEO_NOT_POLICE} Request representation before a voluntary interview under caution.`,
    url: `https://${SITE_DOMAIN}/voluntary-interviews`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function VoluntaryInterviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-10">
          <header className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
              Voluntary interviews — not the police
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900">
              Voluntary police interview solicitor in Kent
            </h1>
            <p className="text-lg text-slate-700">
              If the police have invited you to an interview under caution, you are entitled to
              independent legal advice before you attend. Representation at the police station may
              be available under Legal Aid where you qualify — we do not offer free general legal
              advice by telephone.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#request"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
              >
                Request representation
              </a>
              <a
                href="#what-you-need"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              >
                What information will I need?
              </a>
            </div>
          </header>

          <section className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="text-lg font-bold text-red-950 mb-2">Do not attend unrepresented</h2>
            <p className="text-sm text-red-900">
              A voluntary interview is under caution. Anything you say can be used in evidence.
              Obtain advice before agreeing a date and time where possible.
            </p>
          </section>

          <section id="what-you-need" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-xl font-black text-slate-900 mb-3">What information will I need?</h2>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1.5">
              <li>Police station or proposed interview location</li>
              <li>Date and time if already booked</li>
              <li>Officer name and contact details if known</li>
              <li>Crime reference number if known</li>
              <li>A brief description of the allegation</li>
              <li>A copy of any invitation letter or email (optional upload)</li>
              <li>Your name, date of birth and a contact number</li>
            </ul>
            <p className="mt-3 text-sm text-slate-600">
              Prefer the dedicated form page?{" "}
              <Link href={`${PATH_VOLUNTARY}#request`} className="underline font-semibold text-blue-800">
                Open the voluntary interview request form
              </Link>
              .
            </p>
          </section>

          <VoluntaryInterviewForm />
          <PoliceSignposting />
        </div>
      </main>
      <Footer />
    </div>
  );
}
