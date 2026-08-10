import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Custody Note terms of use and licence: acceptable use, licence grant, and limitations.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl">
        Terms of use
      </h1>
      <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-8 text-custody-slate dark:text-custody-light/80">
        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            1. Agreement
          </h2>
          <p className="mt-2">
            By using the Custody Note website or desktop application you agree to these terms. If you are using them on behalf of an organisation, you confirm you have authority to bind that organisation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            2. Licence
          </h2>
          <p className="mt-2">
            Subject to payment (where required) and these terms, we grant you a limited, non-exclusive, non-transferable licence to use Custody Note for your own professional use. Trial use is subject to the trial terms communicated at sign-up (e.g. 30-day period, one trial per user/email). You may not redistribute, sublicense, or reverse-engineer the software except as permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            3. Acceptable use
          </h2>
          <p className="mt-2">
            You must use Custody Note only for lawful purposes and in line with your professional obligations. You are responsible for the accuracy and legality of the data you enter. We are not responsible for how you use the software in your practice or for any outcomes arising from its use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            4. Payment and refunds
          </h2>
          <p className="mt-2">
            Fees for purchase or subscription are as stated at checkout. Refunds are handled in accordance with our refund policy (e.g. within 14 days for first purchase where applicable). Subscription renewals may be cancelled before the renewal date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            5. Disclaimers
          </h2>
          <p className="mt-2">
            Custody Note is provided &quot;as is&quot;. We do not guarantee uninterrupted or error-free operation. We are not liable for any indirect, consequential, or special loss arising from use of the software or website, to the maximum extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            6. Changes and termination
          </h2>
          <p className="mt-2">
            We may change these terms or the product from time to time. Continued use after changes constitutes acceptance. We may suspend or terminate access for breach of these terms or for other good cause.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-custody-navy dark:text-white">
            7. Contact
          </h2>
          <p className="mt-2">
            For questions about these terms, see the Contact or Support page.
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
