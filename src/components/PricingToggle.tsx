"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Standard",
    slug: "standard",
    monthlyPrice: 29,
    annualPrice: 290,
    description:
      "Full access to Custody Note with local encrypted backups. Your data stays on your machine.",
    features: [
      "Unlimited attendances and telephone advice",
      "LAA-compliant notes, time recording, billing",
      "PDF export, firm management, reports",
      "Local encrypted backups (every 2 minutes)",
      "Off-site folder backup (OneDrive, Dropbox)",
      "Priority email support",
    ],
    cta: "Subscribe",
    highlight: false,
  },
  {
    name: "Standard + Cloud Backup",
    slug: "cloud",
    monthlyPrice: 39,
    annualPrice: 390,
    description:
      "Everything in Standard, plus automatic incorruptible cloud backup on AWS for total peace of mind.",
    features: [
      "Everything in Standard",
      "Automatic encrypted cloud backup to AWS",
      "Incorruptible for 90 days (Object Lock)",
      "Restore from cloud on any machine",
      "Per-subscriber isolation (SRA-compliant)",
      "UK data centre (London)",
      "AES-256 client-side + server-side encryption",
    ],
    cta: "Subscribe with Cloud Backup",
    highlight: true,
  },
];

const comparisonRows = [
  { feature: "Unlimited attendances", standard: true, cloud: true },
  { feature: "Telephone advice (INVB)", standard: true, cloud: true },
  { feature: "Quick Capture", standard: true, cloud: true },
  { feature: "LAA compliance (outcome codes, fee codes)", standard: true, cloud: true },
  { feature: "PACE reviews and custody record", standard: true, cloud: true },
  { feature: "Firm tracking and billing", standard: true, cloud: true },
  { feature: "PDF export", standard: true, cloud: true },
  { feature: "Reports (monthly, by firm, by station)", standard: true, cloud: true },
  { feature: "Local encrypted backup (every 2 min)", standard: true, cloud: true },
  { feature: "Off-site folder backup (OneDrive etc.)", standard: true, cloud: true },
  { feature: "Works fully offline", standard: true, cloud: true },
  { feature: "Priority email support", standard: true, cloud: true },
  { feature: "Automatic cloud backup to AWS", standard: false, cloud: true },
  { feature: "Incorruptible backups (90-day Object Lock)", standard: false, cloud: true },
  { feature: "Restore from cloud on any machine", standard: false, cloud: true },
  { feature: "Per-subscriber data isolation (SRA)", standard: false, cloud: true },
  { feature: "UK data centre (London)", standard: false, cloud: true },
];

export function PricingToggle() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-sm font-medium ${!annual ? "text-custody-navy dark:text-white" : "text-custody-slate dark:text-custody-light/60"}`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${annual ? "bg-custody-accent" : "bg-custody-slate/30 dark:bg-custody-light/20"}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
        <span
          className={`text-sm font-medium ${annual ? "text-custody-navy dark:text-white" : "text-custody-slate dark:text-custody-light/60"}`}
        >
          Annual{" "}
          <span className="text-xs font-normal text-green-600 dark:text-green-400">
            (save 2 months)
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        {plans.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          const interval = annual ? "/yr" : "/mo";
          return (
            <div
              key={plan.slug}
              className={`rounded-xl border-2 bg-white p-8 shadow-sm dark:bg-custody-slate/30 ${
                plan.highlight
                  ? "border-custody-accent"
                  : "border-custody-slate/15 dark:border-custody-light/10"
              }`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-block rounded-full bg-custody-accent/10 px-3 py-1 text-xs font-semibold text-custody-blue dark:bg-custody-accent/20 dark:text-custody-accent">
                  Recommended
                </span>
              )}
              <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
                {plan.name}
              </h2>
              <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
                {plan.description}
              </p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-custody-navy dark:text-white">
                  &pound;{price}
                </span>
                <span className="text-base font-normal text-custody-slate dark:text-custody-light/60">
                  {interval}
                </span>
              </p>
              {annual && (
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                  &pound;{Math.round(plan.annualPrice / 12)}/mo billed annually
                </p>
              )}
              <Link
                href={`/buy?plan=${plan.slug}`}
                className={`mt-6 block rounded-lg px-5 py-2.5 text-center text-sm font-medium ${
                  plan.highlight
                    ? "bg-custody-blue text-white hover:bg-custody-accent"
                    : "border border-custody-slate/30 text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-custody-slate dark:text-custody-light/80"
                  >
                    <span className="mt-0.5 shrink-0 text-custody-accent">
                      &#10003;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-center text-xl font-semibold text-custody-navy dark:text-white">
          Feature comparison
        </h3>
        <div className="mt-6 overflow-hidden rounded-xl border border-custody-slate/15 dark:border-custody-light/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-custody-slate/10 bg-custody-light/50 dark:border-custody-light/5 dark:bg-custody-slate/40">
                <th className="px-4 py-3 text-left font-medium text-custody-navy dark:text-white">
                  Feature
                </th>
                <th className="px-4 py-3 text-center font-medium text-custody-navy dark:text-white">
                  Standard
                </th>
                <th className="px-4 py-3 text-center font-medium text-custody-accent">
                  + Cloud Backup
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-custody-slate/20"
                      : "bg-custody-light/30 dark:bg-custody-slate/30"
                  }
                >
                  <td className="px-4 py-2.5 text-custody-slate dark:text-custody-light/80">
                    {row.feature}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {row.standard ? (
                      <span className="text-green-600 dark:text-green-400">
                        &#10003;
                      </span>
                    ) : (
                      <span className="text-custody-slate/30 dark:text-custody-light/20">
                        &mdash;
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {row.cloud ? (
                      <span className="text-green-600 dark:text-green-400">
                        &#10003;
                      </span>
                    ) : (
                      <span className="text-custody-slate/30 dark:text-custody-light/20">
                        &mdash;
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
