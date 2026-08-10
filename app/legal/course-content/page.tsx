import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, AlertTriangle, BarChart3 } from 'lucide-react';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Course content',
  description:
    'Overview of PSR Train content: learning modules, practice questions, critical incidents practice, and progress tracking.',
  path: '/legal/course-content',
});

export default function CourseContentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 prose-clear">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">Course content</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          An overview of the types of content and tools available on the platform. Content is for preparation and study only; it does not replace the official PSRAS assessments or supervision.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Learning modules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Topic-based modules cover areas relevant to police station work and the PSRAS, such as PACE and codes of practice, custody procedures, rights of suspects, disclosure, and interview advice. They are designed to support your study and revision. Module content is for guidance only and does not constitute legal advice or official syllabus material—always refer to the SRA and assessment bodies for current requirements.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Practice questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            The platform includes practice questions across core topics. These help you test your knowledge and identify gaps. They are not past or official exam questions and do not guarantee coverage of any particular assessment. Timed practice can help you get used to working under time pressure.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            Critical incidents–style practice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            Scenario-based exercises are designed to help you think through critical issues that can arise at the police station. They are for preparation and confidence-building only. They do not replicate the official Critical Incidents Test (CIT) or any other PSRAS assessment. The real CIT is administered by authorised assessment bodies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Progress and tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
          <p>
            You can track your progress through modules and practice. This is for your own study planning and motivation. It does not form part of any formal assessment or accreditation process.
          </p>
        </CardContent>
      </Card>

      <p className="text-base text-muted-foreground">
        <Link href="/legal/how-our-training-helps" className="text-primary hover:underline">How our training helps</Link> and <Link href="/legal/who-this-is-for" className="text-primary hover:underline">who this is for</Link>.
      </p>
    </div>
  );
}
