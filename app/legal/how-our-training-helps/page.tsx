import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, MessageSquare, Lightbulb } from 'lucide-react';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'How our training helps',
  description:
    'What PSR Train provides: structured study guidance, knowledge resources, scenario-based learning, and interview preparation.',
  path: '/legal/how-our-training-helps',
});

export default function HowOurTrainingHelpsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 prose-clear">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">How our training helps</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We provide guidance and preparation resources to support your preparation for the PSRAS. We do not grant accreditation or guarantee any outcome.
        </p>
      </div>

      <div className="rounded-lg border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-6">
        <p className="text-navy font-medium leading-relaxed">
          This platform provides training guidance and preparation materials only. It does not itself grant Police Station Representative accreditation. Accreditation must be obtained through the recognised scheme and appropriate supervision.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Structured study guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            We offer structured modules and materials that cover areas relevant to police station work and the knowledge and skills assessed in the PSRAS. This can help you organise your study and identify areas to strengthen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Knowledge resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Our resources include practice questions, PACE code references, and topic-based learning. They are designed to support your understanding of procedure, rights, and practice—not to replace formal training or supervision.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Scenario-based learning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Scenario and interview-style practice can help you think through situations you might face at the police station. This is for preparation and confidence-building only; it does not replicate or replace the official Critical Incidents Test or any other assessment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            Practical insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Our materials are designed to reflect practical aspects of police station work and criminal defence practice. They are for educational purposes only and do not constitute legal advice or any form of official certification.
          </p>
        </CardContent>
      </Card>

      <p className="text-base text-muted-foreground">
        <Link href="/legal/course-content" className="text-primary hover:underline">View course content</Link> and <Link href="/legal/who-this-is-for" className="text-primary hover:underline">who this is for</Link>.
      </p>
    </div>
  );
}
