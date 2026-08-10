import Link from 'next/link';
import { SITE } from '@/lib/site';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How PSR Train collects, uses, and protects your personal data under UK GDPR.',
  path: '/legal/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. Who we are</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SITE.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the training platform at{' '}
          <a href={SITE.url} className="text-primary hover:underline">{SITE.domain}</a>.
          We are the data controller for personal data we collect about you through the Service.
          {' '}{SITE.legalOperatorNote}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You can contact us about privacy at{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a>{' '}
          or via the <Link href="/legal/contact" className="text-primary hover:underline">contact page</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. Data we collect</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Account data:</strong> name (if provided), email, hashed password, authentication identifiers.</li>
          <li><strong>Training data:</strong> practice answers, progress, scores, time spent, preferences.</li>
          <li><strong>Billing data:</strong> subscription plan, status, and invoice records. Payment card details are processed by our payment provider and never stored by us.</li>
          <li><strong>Technical data:</strong> IP address, device and browser information, session cookies, and basic usage logs used for security, fraud prevention, and reliability.</li>
          <li><strong>Communications:</strong> messages you send through the contact form or by email.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. Lawful bases (UK GDPR, Article 6)</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Contract</strong> — to provide your account, deliver the training service, process payments, and respond to support requests.</li>
          <li><strong>Legitimate interests</strong> — to keep the Service secure, prevent fraud, debug errors, understand usage (aggregated), and improve the product.</li>
          <li><strong>Legal obligation</strong> — to keep billing and tax records and to respond to lawful requests from authorities.</li>
          <li><strong>Consent</strong> — for any optional communications or cookies that are not strictly necessary. You can withdraw consent at any time.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">4. How we use your data</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>To create and operate your account and deliver the training features you use.</li>
          <li>To track your practice progress and show you personalised statistics.</li>
          <li>To process subscription payments and deal with billing enquiries.</li>
          <li>To send service emails (account verification, password reset, billing, important service changes).</li>
          <li>To protect the Service against abuse, fraud, and unauthorised access.</li>
          <li>To improve the Service in aggregate form. We do not sell your personal data.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">5. Who we share data with (sub-processors)</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use a limited number of trusted third parties to run the Service. Each is bound by a written data-processing agreement and processes data only on our instructions:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          {SITE.subprocessors.map((s) => (
            <li key={s.name}><strong>{s.name}</strong> — {s.purpose}.</li>
          ))}
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Some of these providers may process data outside the UK. Where that is the case, we rely on recognised safeguards such as UK-approved Standard Contractual Clauses or adequacy decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">6. How long we keep data</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Account and training data:</strong> for as long as your account is active, plus up to 12 months after closure (so you can reopen your account and for audit).</li>
          <li><strong>Billing records:</strong> kept for at least 6 years to meet HMRC and accounting requirements.</li>
          <li><strong>Support and contact messages:</strong> up to 24 months, then deleted.</li>
          <li><strong>Server and security logs:</strong> typically up to 90 days.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">7. Your rights</h2>
        <p className="text-muted-foreground leading-relaxed">
          Under UK GDPR you have the right to: access your data; have inaccurate data corrected; ask us to delete data (&quot;right to erasure&quot;) where it applies; restrict or object to processing; port certain data to another provider; and withdraw consent at any time (without affecting earlier processing). To exercise any of these rights, contact{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you are not satisfied with our response you can complain to the UK Information Commissioner&apos;s Office (ICO) at{' '}
          <a href={SITE.ico} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{SITE.ico}</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">8. Security</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use technical and organisational measures appropriate to the risk, including encryption in transit (HTTPS), secure authentication, access controls, and regular patching of our platform providers. No service is 100% secure; please use a strong, unique password.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">9. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use a small number of strictly necessary cookies (for login, session, and security). See our{' '}
          <Link href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">10. Children</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Service is intended for professional adult use. We do not knowingly collect personal data from anyone under 18. If you believe we hold data about a child, contact us and we will delete it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">11. Changes to this policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update this Privacy Policy from time to time. Material changes will be notified by email or a prominent notice on the Service before they take effect.
        </p>
      </section>
    </div>
  );
}
