import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Custody Note privacy policy: how we collect, use, and protect your data on the website and in the app.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-custody-slate dark:text-custody-light/80">
        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            1. Who we are
          </h2>
          <p className="mt-2">
            Custody Note (&quot;we&quot;, &quot;us&quot;) provides a desktop application and this website for custody notes and legal aid workflows. This policy describes how we handle your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            2. Data we collect
          </h2>
          <p className="mt-2">
            We may collect: (a) information you give us (e.g. email for trial or purchase, name if provided); (b) usage and technical data from this website (e.g. IP address, browser, pages visited); (c) payment-related data processed by our payment provider (e.g. Stripe); (d) data you enter or create in the Custody Note desktop app, which is stored locally on your device unless you choose to sync or export it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            3. How we use it
          </h2>
          <p className="mt-2">
            We use your data to: provide the service and trial; process payments; send transactional or licence-related communications; improve the product and website; and comply with legal obligations. We do not sell your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            4. Legal basis and retention
          </h2>
          <p className="mt-2">
            We process data on the basis of contract, consent, or legitimate interest as appropriate. We retain data only as long as needed for those purposes or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            5. Your rights
          </h2>
          <p className="mt-2">
            Depending on where you live, you may have rights to access, correct, delete, or restrict use of your data, or to object to processing. Contact us (see Contact page) to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            6. Cookies and similar tech
          </h2>
          <p className="mt-2">
            This site may use essential cookies and similar technologies for operation and analytics. You can control non-essential cookies via your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            7. Changes
          </h2>
          <p className="mt-2">
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change. Continued use of the site or app after changes constitutes acceptance.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="rounded-lg text-custody-slate hover:text-custody-accent dark:text-custody-light/80 dark:hover:text-custody-accent"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
