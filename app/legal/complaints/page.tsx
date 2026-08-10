import Link from 'next/link';
import { SITE } from '@/lib/site';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Complaints',
  description:
    'How to make a complaint about PSR Train and what happens next.',
  path: '/legal/complaints',
});

export default function ComplaintsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Complaints Procedure</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. Making a complaint</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you are unhappy with the service you have received from {SITE.name}, please contact us first at{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a>{' '}
          or via our <Link href="/legal/contact" className="text-primary hover:underline">contact page</Link>. Please set out your complaint clearly and include the date, what happened, and what you would like us to do.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. What we will do</h2>
        <p className="text-muted-foreground leading-relaxed">
          We aim to acknowledge complaints within 3 working days and respond substantively within 14 working days. If we need more time, we will explain why and give you a revised date.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. Escalation</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you are not satisfied with our response, you can ask us to review the matter. We will explain how we have considered your concerns and any remaining options.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If your complaint relates to how we handle personal data, you can also complain to the Information Commissioner&apos;s Office at{' '}
          <a href={SITE.ico} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{SITE.ico}</a>.
        </p>
      </section>
    </div>
  );
}
