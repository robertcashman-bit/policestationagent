import Link from 'next/link';
import { SITE } from '@/lib/site';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Cookie Policy',
  description:
    'How PSR Train uses cookies and similar technologies.',
  path: '/legal/cookies',
});

export default function CookiesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Cookie Policy</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. What cookies are</h2>
        <p className="text-muted-foreground leading-relaxed">
          Cookies are small text files stored on your device when you visit a website. They are widely used to make sites work, remember preferences, and understand how the site is used.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. Cookies we use</h2>
        <p className="text-muted-foreground leading-relaxed">
          We use a small number of <strong>strictly necessary</strong> cookies that do not require consent under PECR. In particular:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>authentication and session cookies (so you stay signed in);</li>
          <li>security cookies (to prevent cross-site request forgery and abuse);</li>
          <li>a preference cookie to remember choices such as the access-gate state.</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          We do not use advertising or cross-site tracking cookies. If we introduce analytics or optional cookies in future, we will ask for your consent first via a banner.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. Managing cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          You can control or delete cookies through your browser settings. If you block strictly necessary cookies, parts of the Service (such as signing in) may not work.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">4. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Questions? Email <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">{SITE.contactEmail}</a> or use our <Link href="/legal/contact" className="text-primary hover:underline">contact page</Link>.
        </p>
      </section>
    </div>
  );
}
