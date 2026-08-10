import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_VERSION } from "@/lib/config";

export const metadata: Metadata = {
  title: "Download Custody Note for Windows",
  description:
    "Download Custody Note for Windows 10 and 11. The desktop app for freelance police station representatives and criminal solicitors. LAA-compliant custody notes, time recording, and PDF export.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/download` },
};

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Download Custody Note
      </h1>
      <p className="mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
        Get the desktop app and start recording attendances in minutes.
      </p>

      {/* Download card */}
      <div className="mt-8 max-w-lg rounded-xl border-2 border-custody-accent bg-white p-8 shadow-sm dark:bg-custody-slate/30">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-custody-accent/10 dark:bg-custody-accent/20">
            <svg
              className="h-6 w-6 text-custody-blue dark:text-custody-accent"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
              Windows Installer
            </h2>
            <p className="text-sm text-custody-slate dark:text-custody-light/60">
              Version {APP_VERSION} &middot; ~90 MB
            </p>
          </div>
        </div>
        <a
          href="#"
          className="mt-6 block rounded-lg bg-custody-blue px-5 py-3 text-center text-base font-medium text-white hover:bg-custody-accent"
        >
          Download for Windows
        </a>
        <p className="mt-3 text-center text-xs text-custody-slate dark:text-custody-light/50">
          Windows 10 or later required
        </p>
      </div>

      {/* App preview */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-custody-navy dark:text-white">
          What you&apos;ll get
        </h2>
        <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
          Custody Note opens to a command centre with Tel Advice, Quick Capture, and New Attendance — everything in one place.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-custody-slate/15 shadow-lg dark:border-custody-light/10">
          <div className="flex items-center gap-2 border-b border-custody-slate/10 bg-custody-light/60 px-4 py-2.5 dark:bg-custody-slate/50">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />
            <span className="ml-2 text-xs text-custody-slate/60 dark:text-custody-light/40">Custody Note</span>
          </div>
          <div className="relative aspect-video w-full bg-custody-navy/50">
            <Image
              src="/screenshots/home.png"
              alt="Custody Note home screen with action cards"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      </div>

      {/* System requirements */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-custody-navy dark:text-white">
          System requirements
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-custody-slate dark:text-custody-light/80">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-custody-accent">&#10003;</span>
            Windows 10 or Windows 11
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-custody-accent">&#10003;</span>
            4 GB RAM minimum (8 GB recommended)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-custody-accent">&#10003;</span>
            200 MB free disk space
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-custody-accent">&#10003;</span>
            Internet required only for licence validation and cloud backup
          </li>
        </ul>
      </div>

      {/* Installation steps */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-custody-navy dark:text-white">
          Installation
        </h2>
        <ol className="mt-4 space-y-6">
          {[
            {
              step: 1,
              title: "Download and run the installer",
              description:
                'Click the download button above. When the download completes, run the .exe file. If Windows SmartScreen appears, click "More info" then "Run anyway".',
            },
            {
              step: 2,
              title: "Follow the setup wizard",
              description:
                "Accept the licence agreement and choose an install location (the default is fine for most users). Click Install.",
            },
            {
              step: 3,
              title: "Launch Custody Note",
              description:
                "The app will launch automatically after installation. You can also find it in your Start menu.",
            },
            {
              step: 4,
              title: "Enter your licence key",
              description:
                "When prompted, enter the licence key you received by email. If you don\u2019t have one yet, start a free trial below.",
            },
          ].map(({ step, title, description }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-custody-accent/15 text-sm font-bold text-custody-blue dark:bg-custody-accent/25 dark:text-custody-accent">
                {step}
              </span>
              <div>
                <h3 className="font-medium text-custody-navy dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-custody-slate dark:text-custody-light/80">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-custody-slate/15 bg-custody-light/30 p-6 dark:border-custody-light/10 dark:bg-custody-slate/20">
        <h3 className="font-semibold text-custody-navy dark:text-white">
          Don&apos;t have a licence key?
        </h3>
        <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
          Start a 30-day free trial &mdash; no credit card required. All
          features are unlocked.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/trial"
            className="rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent"
          >
            Start free trial
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-custody-slate/30 px-5 py-2.5 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
          >
            See pricing
          </Link>
        </div>
      </div>

      <p className="mt-8">
        <Link
          href="/changelog"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          See what&apos;s new in version {APP_VERSION} &rarr;
        </Link>
      </p>
    </div>
  );
}
