import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnswerFirstBlock } from "@/components/conversion/AnswerFirstBlock";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitors: Police Station Attendance Cover Across Kent | Agent Services",
  description:
    "Attendance cover for solicitors across Kent custody suites and police stations. Custody and voluntary interview attendances. Competitive rates. Call 01732 247427.",
  alternates: {
    canonical: "https://policestationagent.com/start/solicitors-agent-cover",
  },
};

export default function SolicitorsAgentCoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <section
              className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto text-center px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-black mb-6 text-white">
                  Solicitors: Police Station Attendance Cover Across Kent
                </h1>
                <p className="text-xl text-amber-100 mb-8">
                  Attendance cover for solicitors across Kent custody suites/police stations.
                </p>
              </div>
            </section>

            <AnswerFirstBlock>
              In brief: criminal defence firms instruct Robert Cashman for police station attendance
              cover across Kent custody suites and voluntary interviews. Send client name, station,
              custody record number, DSCC reference, interview time and allegation summary. See our{" "}
              <Link href="/dscc-and-custody-record-support" className="text-blue-700 font-semibold hover:underline">
                DSCC and custody record guide
              </Link>
              .
            </AnswerFirstBlock>

            {/* Services Section */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">Services:</h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Custody and voluntary interview attendances</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Pre-interview advice and preparation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Written post-interview report if required</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Bail advice and follow-up communication</span>
                </li>
              </ul>
            </section>

            {/* Booking Information Section */}
            <section className="bg-amber-50 rounded-xl border-2 border-amber-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                To Book Attendance, Please Send:
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Client name + DOB</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Police station / custody suite</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Interview time / custody status</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Allegation(s)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Officer in the case + contact number</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Any disclosure received</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>
                    Preferred outcome (attendance only / full report / follow-up)
                  </span>
                </li>
              </ul>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-4">
              <ConversionCTAGroup layout="stacked" className="justify-center items-center" />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
