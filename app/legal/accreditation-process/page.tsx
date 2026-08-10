import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, BookOpen, Users } from 'lucide-react';
import { PSRAS_ACCREDITATION_TEXT } from '@/lib/legalCopy';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Accreditation process',
  description:
    'Factual explanation of the Police Station Representative Accreditation Scheme (PSRAS), pathway, portfolio, and assessments.',
  path: '/legal/accreditation-process',
});

export default function AccreditationProcessPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 prose-clear">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">Accreditation process</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A factual overview of how Police Station Representative accreditation works in England and Wales. For authoritative, up-to-date requirements, always refer to the Legal Aid Agency and the authorised assessment providers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-primary" />
            What is the PSRAS?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>{PSRAS_ACCREDITATION_TEXT} Accreditation is administered through the Legal Aid Agency&apos;s contracting arrangements, which maintain the register of accredited representatives.</p>
          <p>
            PSRAS is an accreditation framework—it assesses competence. It is not a single training course but a process that typically includes portfolio submission, a Critical Incidents Test (CIT), and a written examination. Assessment components are delivered by authorised providers. Cardiff Law School and Datalaw are examples of organisations that have provided PSRAS-related assessments; check the current position directly with each provider, as formats and arrangements can change.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Typical pathway to accreditation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Candidates usually work under supervision while building experience and completing the required components. These typically include: a portfolio demonstrating competence; the Critical Incidents Test (a practical scenario-based assessment); and a written examination. Solicitors may have alternative routes (e.g. through the Law Society&apos;s Criminal Litigation Accreditation Scheme).
          </p>
          <p>
            Requirements and formats can change. You must check the current rules and guidance published by the Legal Aid Agency and the assessment organisations before relying on this overview.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Role of supervising solicitors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Before and during the accreditation process, candidates are typically supervised by solicitors or other authorised persons. Supervisors support development and may sign off on portfolio or other elements. Accreditation must be obtained through the recognised scheme and appropriate supervision—not through this or any other standalone training platform.
          </p>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-muted/50 border border-border p-6">
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Disclaimer:</strong> This page is for general information only. It does not constitute advice on your eligibility or how to apply. For the official accreditation process, requirements, and application, consult the{' '}
          <a href="https://www.gov.uk/government/organisations/legal-aid-agency" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Legal Aid Agency</a>{' '}
          and the authorised assessment providers. This platform does not grant accreditation.
        </p>
      </div>

      <p className="text-base text-muted-foreground">
        <Link href="/legal/how-our-training-helps" className="text-primary hover:underline">How our training helps</Link> prepare for the PSRAS.
      </p>
    </div>
  );
}
