import Link from "next/link";

export default function BuyCancelPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Checkout cancelled
      </h1>
      <p className="mt-4 text-custody-slate dark:text-custody-light/80">
        Your checkout was cancelled. You can try again or start a free trial
        below.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/buy"
          className="rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent"
        >
          Back to Buy
        </Link>
        <Link
          href="/trial"
          className="rounded-lg border border-custody-slate/30 px-5 py-2.5 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
        >
          Start 30-day free trial
        </Link>
      </div>
    </div>
  );
}
