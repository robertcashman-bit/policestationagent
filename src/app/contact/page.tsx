import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Custody Note",
  description:
    "Contact Custody Note for sales enquiries, technical support, or general questions. We respond within one working day.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
        Got a question about Custody Note? Fill in the form below or send us an
        email and we&apos;ll get back to you as soon as we can.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
            <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
              Email
            </h2>
            <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
              For sales, support, and general enquiries:
            </p>
            <a
              href="mailto:support@custodynote.com"
              className="mt-3 inline-block text-sm font-medium text-custody-blue hover:text-custody-accent"
            >
              support@custodynote.com
            </a>
          </div>

          <div className="rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
            <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
              Response time
            </h2>
            <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
              We aim to respond within one working day. For urgent issues, put
              &ldquo;URGENT&rdquo; in the subject line.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10">
        <Link
          href="/support"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          See all support options &rarr;
        </Link>
      </p>
    </div>
  );
}
