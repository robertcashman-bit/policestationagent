import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckoutButtons } from "@/components/CheckoutButtons";

export const metadata: Metadata = {
  title: "Buy Custody Note",
  description:
    "Subscribe to Custody Note. Secure checkout. 30-day free trial available.",
  robots: { index: true, follow: true },
};

export default function BuyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Subscribe to Custody Note
      </h1>
      <p className="mt-4 text-custody-slate dark:text-custody-light/80">
        Subscribe below. You&apos;ll receive a licence key by email to activate
        the desktop app.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-lg bg-custody-light/50 dark:bg-custody-slate/20" />
          }
        >
          <CheckoutButtons />
        </Suspense>
      </div>
      <p className="mt-6">
        <Link
          href="/trial"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          Try free for 30 days first &rarr;
        </Link>
      </p>
      <p className="mt-4">
        <Link
          href="/pricing"
          className="text-sm text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          See pricing details
        </Link>
      </p>
    </div>
  );
}
