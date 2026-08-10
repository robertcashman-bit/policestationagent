import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Purchase successful",
  description: "Your Custody Note subscription is active.",
  robots: { index: false, follow: false },
};

export default function BuySuccessPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          &#10003;
        </span>
        <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
          Thank you for subscribing
        </h1>
      </div>
      <p className="mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
        Your payment was successful and your subscription is now active. You
        will receive an email with your licence key shortly.
      </p>

      <div className="mt-8 max-w-lg rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
        <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
          Your licence key
        </h2>
        <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
          Check your email for your licence key. If it hasn&apos;t arrived
          within a few minutes, check your spam folder or{" "}
          <Link
            href="/contact"
            className="text-custody-blue hover:text-custody-accent"
          >
            contact us
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-custody-slate/15 bg-custody-light/30 p-6 dark:border-custody-light/10 dark:bg-custody-slate/20">
        <h3 className="font-semibold text-custody-navy dark:text-white">
          What to do next
        </h3>
        <ol className="mt-4 space-y-4">
          {[
            {
              step: 1,
              title: "Download Custody Note",
              description: "If you haven\u2019t already, download and install the desktop app.",
              link: { href: "/download", label: "Download now" },
            },
            {
              step: 2,
              title: "Enter your licence key",
              description:
                "Open Custody Note, go to Settings, and enter the licence key from your email.",
            },
            {
              step: 3,
              title: "Start recording",
              description:
                "You\u2019re all set. Create your first attendance or Quick Capture a new case.",
            },
          ].map(({ step, title, description, link }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-custody-accent/15 text-sm font-bold text-custody-blue dark:bg-custody-accent/25 dark:text-custody-accent">
                {step}
              </span>
              <div>
                <h4 className="font-medium text-custody-navy dark:text-white">
                  {title}
                </h4>
                <p className="mt-1 text-sm text-custody-slate dark:text-custody-light/80">
                  {description}
                </p>
                {link && (
                  <Link
                    href={link.href}
                    className="mt-2 inline-block text-sm font-medium text-custody-blue hover:text-custody-accent"
                  >
                    {link.label} &rarr;
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent"
        >
          Back to home
        </Link>
        <Link
          href="/support"
          className="rounded-lg border border-custody-slate/30 px-5 py-2.5 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
        >
          Need help?
        </Link>
      </div>
    </div>
  );
}
