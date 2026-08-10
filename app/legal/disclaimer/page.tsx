import { SITE } from '@/lib/site';
import { CPD_REPLACEMENT_WORDING, POLICE_STATION_HELP_TEXT } from '@/lib/legalCopy';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Legal Disclaimer',
  description:
    'Disclaimer for the PSR Train platform — training purposes only, not legal advice.',
  path: '/legal/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-navy">Legal Disclaimer</h1>
      <p className="text-muted-foreground">Last updated: {SITE.legalUpdated}</p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">1. Training purposes only</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SITE.name} is a training and educational platform. Its content is intended to help candidates prepare for the Police Station Representative Accreditation Scheme (PSRAS) and to support practising representatives in their ongoing study.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Completion of training on this platform does not confer PSRAS accreditation, authorisation to attend police stations, or any right to provide legally aided advice. Accreditation must be obtained through the recognised scheme and appropriate supervision.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">2. Not legal advice</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nothing on this platform constitutes legal advice to you or to any client. If you need legal advice in a real case, you (or your client) should consult a qualified solicitor. {POLICE_STATION_HELP_TEXT}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">3. Accuracy and updates</h2>
        <p className="text-muted-foreground leading-relaxed">
          We take reasonable care to keep content accurate and current, but laws, codes, and procedures change. We do not guarantee that any material is complete or up to date. Always verify the current position with primary sources before relying on it professionally.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">4. No warranty of outcome</h2>
        <p className="text-muted-foreground leading-relaxed">
          We make no warranty, express or implied, about the results you will obtain from using the platform. We do not guarantee that you will pass any PSRAS component or any other assessment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-navy">5. Professional responsibility</h2>
        <p className="text-muted-foreground leading-relaxed">
          Users are responsible for meeting all requirements for police station representative accreditation, for any professional standards set by the Solicitors Regulation Authority or other applicable regulator, and for complying with their supervisor&apos;s requirements. This platform is a study aid, not a substitute for formal training, supervision, or {CPD_REPLACEMENT_WORDING}.
        </p>
      </section>
    </div>
  );
}
