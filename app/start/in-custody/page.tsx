import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
          <header>
            <p className="text-xs font-bold uppercase tracking-wide text-red-700 mb-2">
              Current custody — not the police
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              Has someone been arrested and taken to a police station?
            </h1>
            <p className="text-slate-700">
              This page uses the same qualification pathway as{" "}
              <a href="/current-custody" className="font-semibold text-blue-800 underline">
                /current-custody
              </a>
              . The solicitor telephone is only shown after you qualify.
            </p>
          </header>
          <CustodyQualificationFlow />
          <PoliceSignposting />
        </div>
      </main>
      <Footer />
    </div>
  );
}
