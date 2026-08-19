import PageShell from "@/components/PageShell";
import { AnswerFirstBlock } from "@/components/conversion/AnswerFirstBlock";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitors: Police Station Agent Cover | Within 45 mins of Maidstone",
  description:
    "Police station agent cover for solicitors — attendance within about 45 minutes of Maidstone. Custody and voluntary interview attendances. Competitive rates.",
  alternates: {
    canonical: "https://policestationagent.com/start/solicitors-agent-cover",
  },
};

export default function SolicitorsAgentCoverPage() {
  return (
    <PageShell forceHidePhone={false}>
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <section className="hero-navy py-14 md:py-16 rounded-[var(--radius-lg)] mb-8" aria-labelledby="page-title">
              <div className="max-w-3xl mx-auto text-center px-4">
                <h1 id="page-title" className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
                  Solicitors: Police Station Agent Cover
                </h1>
                <p className="text-xl text-white/90 mb-2">
                  Agency attendance at police stations within about 45 minutes of Maidstone.
                </p>
              </div>
            </section>

            <AnswerFirstBlock>
              In brief: criminal defence firms instruct Robert Cashman for police station agency
              attendance within about 45 minutes of Maidstone — custody and voluntary interviews.
              Send client name, station, custody record number, DSCC reference, interview time and
              allegation summary. See our{" "}
              <Link href="/dscc-and-custody-record-support" className="text-primary font-semibold hover:underline">
                DSCC and custody record guide
              </Link>
              .
            </AnswerFirstBlock>

            <section className="surface-card p-6 md:p-8 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">Services:</h2>
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
                    className="text-accent flex-shrink-0 mt-0.5"
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
                    className="text-accent flex-shrink-0 mt-0.5"
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
                    className="text-accent flex-shrink-0 mt-0.5"
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
                    className="text-accent flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Bail advice and follow-up communication</span>
                </li>
              </ul>
            </section>

            {/* Booking Information Section */}
            <section className="surface-card border-accent/40 bg-accent/5 p-6 md:p-8 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
                To Book Attendance, Please Send:
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Client name + DOB</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Police station / custody suite</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Interview time / custody status</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Allegation(s)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Officer in the case + contact number</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Any disclosure received</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>
                    Preferred outcome (attendance only / full report / follow-up)
                  </span>
                </li>
              </ul>
            </section>

            <section className="text-center space-y-4">
              <ConversionCTAGroup layout="stacked" className="justify-center items-center" />
            </section>
      </div>
    </PageShell>
  );
}
