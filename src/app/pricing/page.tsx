import type { Metadata } from "next";
import Link from "next/link";
import { PricingToggle } from "@/components/PricingToggle";
import { JsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing – Custody Note subscription for freelance reps",
  description:
    "Custody Note subscription for freelance police station reps and solicitors. 30-day free trial included. From \u00a329/month with optional encrypted cloud backup.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/pricing` },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com";

const pricingFaqs = [
  {
    q: "Can I switch between plans?",
    a: "Yes. You can upgrade to Cloud Backup or downgrade to Standard at any time. Changes take effect at your next billing date.",
  },
  {
    q: "What happens after the 30-day trial?",
    a: "Your data is preserved in the app. You just need to subscribe to continue using it. If you don\u2019t subscribe, the app becomes read-only until you do.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. There are no lock-in periods. Cancel from your Stripe dashboard and your subscription ends at the current billing period.",
  },
  {
    q: "Is my data safe during the trial?",
    a: "Yes. Local encrypted backups run every 2 minutes during the trial. Cloud backup is only available on the paid plan.",
  },
  {
    q: "Do I need internet to use the app?",
    a: "No. Custody Note works fully offline. Internet is only needed for cloud backup uploads and licence validation.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(pricingFaqs)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", url: siteUrl }, { name: "Pricing", url: `${siteUrl}/pricing` }])} />
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-custody-slate dark:text-custody-light/80">
          One subscription. No per-seat charges, no hidden fees. Add cloud
          backup for incorruptible, SRA-compliant off-site protection.
        </p>
      </div>

      <div className="mt-12">
        <PricingToggle />
      </div>

      <div className="mt-12 rounded-xl border border-amber-300/50 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-950/20">
        <h3 className="font-semibold text-amber-900 dark:text-amber-200">
          Why cloud backup matters
        </h3>
        <p className="mt-2 text-sm text-amber-800 dark:text-amber-300/80">
          Without cloud backup, your entire database is stored only on your
          computer. If your hard drive fails, is stolen, or is damaged, your
          records could be permanently lost with no chance of recovery. Cloud
          backup provides an incorruptible copy in a secure UK data centre that
          nobody &mdash; not even us &mdash; can tamper with or delete.
        </p>
        <Link
          href="/cloud-backup"
          className="mt-3 inline-block text-sm font-medium text-amber-900 underline hover:text-amber-700 dark:text-amber-200 dark:hover:text-amber-100"
        >
          Learn more about cloud backup &rarr;
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <h3 className="text-center text-xl font-semibold text-custody-navy dark:text-white">
          Frequently asked questions
        </h3>
        <dl className="mt-6 space-y-4">
          {pricingFaqs.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-lg border border-custody-slate/15 bg-white p-5 dark:border-custody-light/10 dark:bg-custody-slate/30"
            >
              <dt className="font-medium text-custody-navy dark:text-white">
                {q}
              </dt>
              <dd className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 text-center">
        <p className="text-custody-slate dark:text-custody-light/80">
          Not sure yet? Try it free for 30 days &mdash; no credit card required.
        </p>
        <Link
          href="/trial"
          className="mt-4 inline-block rounded-lg border border-custody-slate/30 px-5 py-2.5 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
        >
          Start 30-day free trial
        </Link>
      </div>
    </div>
    </>
  );
}
