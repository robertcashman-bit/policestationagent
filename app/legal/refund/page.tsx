import Link from 'next/link';
import { SITE } from '@/lib/site';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Refund Policy',
  description:
    'Refund and cancellation policy for PSR Train subscriptions.',
  path: '/legal/refund',
});

export default function RefundPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Refund and Cancellation Policy</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. How cancellation works</h2>
        <p className="text-muted-foreground leading-relaxed">
          You can cancel your subscription at any time from your billing settings or by emailing{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a>.
          Cancellation stops future renewals.
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Monthly plan:</strong> access continues until the end of the month you have already paid for. No further charges are taken after that.</li>
          <li><strong>Annual plan:</strong> access continues until the end of the year you have already paid for. No further charges are taken at the next renewal.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. Refunds</h2>
        <p className="text-muted-foreground leading-relaxed">
          We do not offer pro-rata refunds for unused time on a subscription you have chosen to cancel, except where required by law.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, consumers have a 14-day right to withdraw from a distance contract. Because {SITE.name} is a digital service that you can start using immediately, you lose this right once you begin using the Service after checkout, and you consent to this by starting to use it.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you believe you have been charged in error, charged twice, or charged after cancellation, contact us within 30 days and we will investigate and correct the billing.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. How to request a refund</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please use our <Link href="/legal/contact" className="text-primary hover:underline">contact page</Link> and include the email on your account, the date of the charge, and a short explanation. We aim to respond within a few working days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">4. Complaints</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you are unhappy with our response, see our <Link href="/legal/complaints" className="text-primary hover:underline">Complaints Procedure</Link>.
        </p>
      </section>
    </div>
  );
}
