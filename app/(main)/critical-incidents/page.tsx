import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface CitScenarioRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syllabus_refs: string[] | null;
  setup: string | null;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced: 'bg-red-50 text-red-700',
};

export default async function CriticalIncidentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login?next=/critical-incidents');

  const supabase = await createClient();
  const { data: scenarios, error } = await supabase
    .from('cit_scenarios')
    .select('id,slug,title,category,difficulty,syllabus_refs,setup')
    .eq('status', 'approved')
    .order('category', { ascending: true })
    .order('title', { ascending: true });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Critical Incidents Test (CIT)</h1>
        <p className="text-muted-foreground text-lg">
          Branching scenarios approximating the SRA PSRAS Critical Incidents Test content.
        </p>
        <p className="text-xs text-muted-foreground mt-2 max-w-2xl">
          The live SRA assessment is an oral role-play and is not replicated here. These
          scenarios train the same decision points and give written feedback against PSRAS
          syllabus criteria.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> What is the CIT?
          </CardTitle>
          <CardDescription>
            Why these scenarios matter for accreditation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-foreground space-y-2">
          <p>
            The Critical Incidents Test (CIT) is a mandatory live role-play assessment in
            the Police Station Representatives Accreditation Scheme (PSRAS). It evaluates
            handling of complex situations under pressure: vulnerability, oppressive
            interviewers, identification disputes, charging pushes, and ethics.
          </p>
          <p>
            The branching scenarios below put you through the same decision points with
            written feedback. Each scenario is tagged against the SRA syllabus, so you can
            see which criteria you have covered.
          </p>
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium pt-1"
          >
            See full syllabus mapping <ArrowRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200">
          <CardContent className="py-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700">Couldn&apos;t load scenarios</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!error && (!scenarios || scenarios.length === 0) && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground text-sm">
            No CIT scenarios are seeded yet. Run{' '}
            <code className="font-mono bg-muted px-1 py-0.5 rounded">
              npm run generate:questions-sql
            </code>{' '}
            and apply{' '}
            <code className="font-mono bg-muted px-1 py-0.5 rounded">
              scripts/ALL_CONTENT_COMBINED.sql
            </code>{' '}
            against the database.
          </CardContent>
        </Card>
      )}

      {scenarios && scenarios.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {scenarios.map((s: CitScenarioRow) => (
            <Link
              key={s.id}
              href={`/critical-incidents/${s.slug}`}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-xs font-semibold text-primary">{s.category}</div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                    DIFFICULTY_BADGE[s.difficulty] ?? 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1 group-hover:text-primary">
                {s.title}
              </h3>
              {s.setup && (
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{s.setup}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {(s.syllabus_refs ?? []).slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {(s.syllabus_refs ?? []).length > 5 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{(s.syllabus_refs ?? []).length - 5} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
