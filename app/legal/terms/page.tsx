import Link from 'next/link';
import { SITE } from '@/lib/site';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Terms of use for the PSR Train platform, including subscription, cancellation, and liability terms.',
  path: '/legal/terms',
});

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Terms of Use</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. About these Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          These Terms of Use form a contract between you and {SITE.legalOperator} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) for your use of the training platform at{' '}
          <a href={SITE.url} className="text-primary hover:underline">{SITE.domain}</a> (the &quot;Service&quot;).
          By creating an account or using the Service you agree to these Terms, our{' '}
          <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>, and our{' '}
          <Link href="/legal/disclaimer" className="text-primary hover:underline">Disclaimer</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Contact: <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a>. {SITE.legalOperatorNote}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. The Service</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Service is an online training platform intended to help candidates prepare for the Police Station Representative Accreditation Scheme (PSRAS) and to support practising representatives. It is a training and study tool only; it does not itself confer accreditation, and it is not legal advice. See our <Link href="/legal/disclaimer" className="text-primary hover:underline">Disclaimer</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. Accounts</h2>
        <p className="text-muted-foreground leading-relaxed">
          You must provide accurate registration details and keep them up to date. You are responsible for the security of your login credentials and for all activity on your account. Accounts are personal to you and must not be shared. We may suspend or terminate accounts that are misused.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">4. Subscriptions, pricing and renewals</h2>
        <p className="text-muted-foreground leading-relaxed">
          Paid plans are shown on the <Link href="/pricing" className="text-primary hover:underline">Pricing</Link> page. {SITE.vatStatus}
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Monthly plan:</strong> billed in advance every month. Renews automatically until cancelled.</li>
          <li><strong>Annual plan:</strong> billed in advance once a year. Renews automatically until cancelled.</li>
          <li>We may change prices with at least 30 days&apos; notice. Any change will apply to your next renewal, not to the period you have already paid for. If you do not want to accept a price change, you can cancel before renewal.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">5. Cancellation and your right to withdraw</h2>
        <p className="text-muted-foreground leading-relaxed">
          You can cancel your subscription at any time from your billing settings or by emailing us. Cancellation stops future renewals; you keep access for the remainder of the period you have already paid for. We do not offer pro-rata refunds for partial periods except where required by law.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, consumers in the UK have a 14-day right to withdraw from a distance contract. If you start using digital content before the end of this period, you lose the right to withdraw. By paying for a subscription and accessing the Service, you acknowledge this and consent to immediate performance.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          See also our <Link href="/legal/refund" className="text-primary hover:underline">Refund Policy</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">6. Acceptable use</h2>
        <p className="text-muted-foreground leading-relaxed">You must not:</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>share your account, or copy, redistribute, resell, or sublicense the training content;</li>
          <li>scrape, crawl, or automate access to the Service beyond ordinary browser use;</li>
          <li>attempt to reverse engineer, interfere with, or disrupt the Service;</li>
          <li>use the Service unlawfully or to infringe anyone&apos;s rights.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">7. Intellectual property</h2>
        <p className="text-muted-foreground leading-relaxed">
          All content on the Service (including text, questions, scenarios, and designs) is owned by us or our licensors. We grant you a personal, limited, non-transferable, non-exclusive licence to access and use the Service for your own training and professional use while your subscription is active.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">8. No legal advice; accreditation</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Service provides training and study guidance only. It does not constitute legal advice to you or to any client. Use of the Service does not confer any professional accreditation, authorisation, or the right to provide police station advice. You are responsible for meeting the requirements of the relevant accreditation scheme and any applicable regulator.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">9. Warranties</h2>
        <p className="text-muted-foreground leading-relaxed">
          We provide the Service with reasonable care and skill. Except as expressly stated, we do not give any other warranties — in particular we do not warrant that content is complete, current, or fit for any specific purpose, that the Service will be uninterrupted, or that you will pass any assessment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">10. Limitation of liability</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nothing in these Terms limits liability for death or personal injury caused by our negligence, for fraud, or for anything that cannot be limited by law. Subject to that, our total liability to you for any loss or damage arising under or in connection with these Terms or the Service is limited to the amounts you have paid to us in the 12 months before the event giving rise to the claim.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We are not liable for indirect or consequential losses, loss of profits, loss of opportunity, or loss of goodwill. We are not liable for any professional decision you make based on the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">11. Suspension and termination</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may suspend or terminate your access if you breach these Terms, if your payment fails, or if we reasonably suspect misuse. On termination, your rights to use the Service end; Sections 7–10 and 12–13 survive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">12. Changes to these Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update these Terms from time to time. Material changes will be notified by email or through the Service. Continued use after changes take effect means you accept the updated Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">13. Complaints, governing law and jurisdiction</h2>
        <p className="text-muted-foreground leading-relaxed">
          If something goes wrong, please tell us first via our{' '}
          <Link href="/legal/complaints" className="text-primary hover:underline">Complaints Procedure</Link>.
          These Terms are governed by {SITE.governingLaw}, and any dispute is subject to the exclusive jurisdiction of {SITE.jurisdiction} (except that consumers resident in Scotland or Northern Ireland may bring proceedings in their own jurisdiction).
        </p>
      </section>
    </div>
  );
}
