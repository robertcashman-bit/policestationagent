import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
      <p className="text-6xl font-bold text-custody-blue dark:text-custody-accent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-custody-navy dark:text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-custody-slate dark:text-custody-light/80">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-custody-blue px-6 py-3 text-base font-medium text-white hover:bg-custody-accent"
        >
          Go to home
        </Link>
        <Link
          href="/pricing"
          className="rounded-lg border border-custody-slate/30 px-5 py-3 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
        >
          Pricing
        </Link>
        <Link
          href="/support"
          className="rounded-lg border border-custody-slate/30 px-5 py-3 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
        >
          Support
        </Link>
      </div>
    </div>
  );
}
