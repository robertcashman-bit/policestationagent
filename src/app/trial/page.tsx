import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrialSignupForm } from "@/components/TrialSignupForm";

export const metadata: Metadata = {
  title: "30-day free trial – Try Custody Note free",
  description:
    "Start a 30-day free trial of Custody Note. No credit card required. Get a licence key instantly to activate the full desktop app for freelance police station reps.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/trial` },
};

export default function TrialPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Try Custody Note free for 30 days
      </h1>
      <p className="mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
        No credit card required. Enter your email below to get a licence key
        that activates the full app for 30 days.
      </p>

      <div className="mt-8">
        <TrialSignupForm />
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-custody-slate/15 dark:border-custody-light/10">
        <div className="flex items-center gap-2 border-b border-custody-slate/10 bg-custody-light/60 px-4 py-2 dark:bg-custody-slate/50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-2 text-xs text-custody-slate/60">Custody Note</span>
        </div>
        <div className="relative aspect-video w-full bg-custody-navy/30">
          <Image src="/screenshots/home.png" alt="Custody Note home screen" fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 512px" />
        </div>
        <p className="p-3 text-center text-xs text-custody-slate/60 dark:text-custody-light/50">
          Your trial unlocks the full app — all features, no restrictions.
        </p>
      </div>

      <div className="mt-8 space-y-3 text-sm text-custody-slate dark:text-custody-light/70">
        <p>The trial includes all features with no restrictions.</p>
        <p>
          After 30 days,{" "}
          <Link
            href="/pricing"
            className="text-custody-blue hover:text-custody-accent"
          >
            subscribe
          </Link>{" "}
          to keep using Custody Note. Your data is preserved.
        </p>
      </div>

      <p className="mt-8">
        <Link
          href="/pricing"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          See pricing &rarr;
        </Link>
      </p>
    </div>
  );
}
