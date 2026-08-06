import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
          <header>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">
              Voluntary interview — not the police
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              Request representation before a police interview under caution
            </h1>
            <p className="text-slate-700 mb-2">
              A voluntary interview carries the same legal risks as an interview after arrest.
              Complete the form below — do not attend unrepresented if you can help it.
            </p>
            <p className="text-sm text-slate-600">
              Background reading:{" "}
              <Link href={PATH_VOLUNTARY_LANDING} className="underline font-semibold text-blue-800">
                voluntary interviews overview
              </Link>
              .
            </p>
          </header>
          <VoluntaryInterviewForm />
          <PoliceSignposting />
        </div>
      </main>
      <Footer />
    </div>
  );
}
