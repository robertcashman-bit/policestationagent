import type { Metadata } from "next";
import Link from "next/link";
import { AppScreenshots } from "@/components/AppScreenshots";

export const metadata: Metadata = {
  title: "How it works – Custody Note step-by-step walkthrough",
  description:
    "See how Custody Note works step by step. From the first call to billing and PDF export — a complete walkthrough for freelance police station representatives and criminal solicitors.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/how-it-works` },
};

const steps = [
  {
    step: 1,
    title: "Get the call",
    subtitle: "Quick Capture",
    description:
      "When a firm calls with a custody visit, open Custody Note and hit Quick Capture. Enter the client name, station, offence, and instructing firm in seconds. You can fill in the details later\u2014capture the essentials while you\u2019re on the phone.",
  },
  {
    step: 2,
    title: "Attend the station",
    subtitle: "Full Attendance Record",
    description:
      "At the station, open the attendance and fill in the full details: client information, disclosure, OIC details, offence (with type-ahead search), PACE review times, welfare checks, and your structured notes. Everything is in one place.",
  },
  {
    step: 3,
    title: "Record your time",
    subtitle: "Time Recording",
    description:
      "Log your time as you work. Track travel time, waiting time, and attendance time separately. Custody Note calculates the totals and aligns with LAA fee codes automatically.",
  },
  {
    step: 4,
    title: "Complete the case",
    subtitle: "Outcome and Compliance",
    description:
      "When the case concludes, record the LAA outcome code, stage reached, and any relevant notes. Custody Note ensures your record meets LAA audit requirements.",
  },
  {
    step: 5,
    title: "Export and bill",
    subtitle: "PDF Export and Firm Billing",
    description:
      "Generate a professional PDF of the attendance note with one click. Custody Note tracks which firm instructed the case, so you can bill each firm separately with accurate time and disbursement records.",
  },
  {
    step: 6,
    title: "Back up your data",
    subtitle: "Encrypted Backups",
    description:
      "Local encrypted backups run every 2 minutes. With a Cloud Backup subscription, your database is also uploaded to AWS with AES-256 encryption and Object Lock protection\u2014so you can never lose your records.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-custody-slate/10 bg-gradient-to-b from-custody-light/80 to-white py-16 dark:from-custody-slate/50 dark:to-custody-navy sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl lg:text-5xl">
            How Custody Note works
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-custody-slate dark:text-custody-light/80">
            From the moment you get the call to billing the firm &mdash; here&apos;s
            how Custody Note fits into your workflow.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map(({ step, title, subtitle, description }) => (
              <div
                key={step}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-custody-blue text-xl font-bold text-white dark:bg-custody-accent">
                    {step}
                  </span>
                  {step < steps.length && (
                    <div className="mt-2 h-full w-px bg-custody-slate/15 dark:bg-custody-light/10" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-custody-accent">
                    {subtitle}
                  </span>
                  <h2 className="mt-1 text-xl font-semibold text-custody-navy dark:text-white">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-custody-slate dark:text-custody-light/80">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-t border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            See the app
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            Real screenshots from Custody Note — home, Quick Capture, attendance form, records, and reports.
          </p>
          <div className="mt-12">
            <AppScreenshots />
          </div>
        </div>
      </section>

      {/* Day in the life */}
      <section className="border-t border-custody-slate/10 bg-custody-light/30 py-16 dark:border-custody-light/10 dark:bg-custody-slate/20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            A day in the life of a freelance rep
          </h2>
          <div className="mt-8 rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
            <div className="space-y-4 text-sm leading-relaxed text-custody-slate dark:text-custody-light/80">
              <p>
                <strong className="text-custody-navy dark:text-white">
                  7:30 AM &mdash;
                </strong>{" "}
                You get a call from Smith &amp; Jones Solicitors. A client has
                been arrested at Central Police Station for ABH. You open
                Custody Note and Quick Capture the details in 30 seconds.
              </p>
              <p>
                <strong className="text-custody-navy dark:text-white">
                  8:15 AM &mdash;
                </strong>{" "}
                You arrive at the station. Open the attendance, enter the
                disclosure notes, OIC details, and start your time recording.
              </p>
              <p>
                <strong className="text-custody-navy dark:text-white">
                  9:00 AM &mdash;
                </strong>{" "}
                First PACE review due. Custody Note shows you the due time and
                you record the actual review time and your notes.
              </p>
              <p>
                <strong className="text-custody-navy dark:text-white">
                  10:45 AM &mdash;
                </strong>{" "}
                Interview complete. You record the outcome, stop the timer,
                select the LAA fee code, and export the PDF.
              </p>
              <p>
                <strong className="text-custody-navy dark:text-white">
                  11:00 AM &mdash;
                </strong>{" "}
                Back in the car, you get another call &mdash; this time from
                Harris Law. You Quick Capture the new case while driving
                details are still fresh.
              </p>
              <p>
                <strong className="text-custody-navy dark:text-white">
                  End of month &mdash;
                </strong>{" "}
                You open Reports, filter by firm, and generate a billing
                summary for Smith &amp; Jones and Harris Law separately.
                Everything is tracked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-custody-blue py-16 dark:bg-custody-slate sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to try it?
          </h2>
          <p className="mt-4 text-custody-light/90">
            Download Custody Note and start your 30-day free trial. No credit
            card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="rounded-lg bg-white px-6 py-3 text-base font-medium text-custody-blue hover:bg-custody-light"
            >
              Download now
            </Link>
            <Link
              href="/trial"
              className="rounded-lg border border-white/40 px-6 py-3 text-base font-medium text-white hover:bg-white/10"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
