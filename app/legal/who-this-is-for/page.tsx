import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, XCircle } from 'lucide-react';
import { CPD_REPLACEMENT_WORDING, POLICE_STATION_HELP_TEXT_SHORT } from '@/lib/legalCopy';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Who this is for',
  description:
    'Who PSR Train is for: trainees, accreditation candidates, practising PSRs. Who it is not for.',
  path: '/legal/who-this-is-for',
});

export default function WhoThisIsForPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 prose-clear">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">Who this is for</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          PSR Train is aimed at people preparing for or working in the police station representative role. It is not a substitute for accreditation or legal advice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Who it is for
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-semibold text-navy mb-2">Trainees and aspiring PSRs</h3>
            <p>
              Anyone who is building knowledge and skills with a view to becoming a Police Station Representative or sitting the PSRAS assessments. Our materials can support structured study and practice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-2">Accreditation candidates</h3>
            <p>
              Those who are in the process of completing the PSRAS portfolio, Critical Incidents Test, or written examination. We provide preparation resources only; accreditation is granted by the recognised scheme.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-2">Practising PSRs</h3>
            <p>
              Accredited representatives who want to refresh their knowledge of PACE, custody procedures, and interview practice. Our platform is for ongoing learning and refresher study, not as a replacement for {CPD_REPLACEMENT_WORDING}.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-2">Legal teams and firms</h3>
            <p>
              Firms may use the platform as a supplementary training tool for staff who are training to become or already are PSRs. It does not replace in-house training, supervision, or the official accreditation process.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-navy">
            <XCircle className="w-6 h-6 text-amber-600" />
            Who it is not for
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            This platform is <strong>not</strong> for members of the public seeking legal advice. {POLICE_STATION_HELP_TEXT_SHORT} We do not provide legal advice to clients.
          </p>
          <p>
            Our training does <strong>not</strong> by itself qualify you to attend police stations or provide legally aided advice. You must complete the official PSRAS process and be accredited and registered accordingly.
          </p>
        </CardContent>
      </Card>

      <p className="text-base text-muted-foreground">
        <Link href="/legal/how-our-training-helps" className="text-primary hover:underline">How our training helps</Link> and <Link href="/legal/course-content" className="text-primary hover:underline">course content</Link>.
      </p>
    </div>
  );
}
