import type { Metadata } from "next";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Support – Get help with Custody Note",
  description:
    "Get help with Custody Note. Access support resources, in-app guides, cloud backup help, and contact our support team directly.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/support` },
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Support
      </h1>
      <p className="mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
        Need help with Custody Note? Here&apos;s how to get in touch and find
        answers.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-custody-accent bg-white p-6 dark:bg-custody-slate/30">
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            Email support
          </h2>
          <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
            Send us an email and we&apos;ll get back to you within one working
            day. For urgent issues, put &ldquo;URGENT&rdquo; in the subject
            line.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 inline-block rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent"
          >
            Email us
          </a>
        </div>

        <div className="rounded-xl border border-custody-slate/15 bg-white p-6 dark:border-custody-light/10 dark:bg-custody-slate/30">
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            In-app help
          </h2>
          <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
            The Custody Note app has a built-in Help section with guides for
            every feature. Open it from the menu inside the app.
          </p>
        </div>

        <div className="rounded-xl border border-custody-slate/15 bg-white p-6 dark:border-custody-light/10 dark:bg-custody-slate/30">
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            Cloud Backup help
          </h2>
          <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
            Learn how cloud backup works, how your data is protected, and how to
            restore from the cloud.
          </p>
          <Link
            href="/cloud-backup"
            className="mt-4 inline-block text-sm font-medium text-custody-blue hover:text-custody-accent"
          >
            Cloud Backup guide &rarr;
          </Link>
        </div>

        <div className="rounded-xl border border-custody-slate/15 bg-white p-6 dark:border-custody-light/10 dark:bg-custody-slate/30">
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            Feature requests
          </h2>
          <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
            Got an idea for an improvement? Email us with your suggestion and
            we&apos;ll consider it for a future update.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Feature%20request`}
            className="mt-4 inline-block text-sm font-medium text-custody-blue hover:text-custody-accent"
          >
            Send feature request &rarr;
          </a>
        </div>
      </div>

      <p className="mt-10">
        <Link
          href="/"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}
