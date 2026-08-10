import { promises as fs } from 'node:fs';
import path from 'node:path';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Shield, AlertCircle } from 'lucide-react';

interface CoverageRow {
  ref: string;
  questions: number;
  modules: number;
  scenarios: number;
  total: number;
}

export const dynamic = 'force-dynamic';

async function loadMappingDoc(): Promise<string> {
  const docPath = path.join(process.cwd(), 'docs', 'syllabus-mapping.md');
  try {
    return await fs.readFile(docPath, 'utf8');
  } catch {
    return '';
  }
}

export default async function SyllabusPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login?next=/syllabus');

  const supabase = await createClient();
  const [{ data: coverage }, mapping] = await Promise.all([
    supabase
      .from('v_syllabus_coverage')
      .select('ref,questions,modules,scenarios,total')
      .order('ref', { ascending: true }),
    loadMappingDoc(),
  ]);

  const rows = (coverage ?? []) as CoverageRow[];
  const totals = rows.reduce(
    (acc, r) => {
      acc.questions += r.questions ?? 0;
      acc.modules += r.modules ?? 0;
      acc.scenarios += r.scenarios ?? 0;
      return acc;
    },
    { questions: 0, modules: 0, scenarios: 0 },
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">PSRAS syllabus mapping</h1>
        <p className="text-muted-foreground text-lg">
          How this app aligns with the SRA Police Station Representative Accreditation Scheme
          (updated standards, 29 March 2023).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CoverageStat label="Questions tagged" count={totals.questions} icon={<BookOpen className="w-4 h-4" />} />
        <CoverageStat label="Modules tagged" count={totals.modules} icon={<Shield className="w-4 h-4" />} />
        <CoverageStat
          label="CIT scenarios tagged"
          count={totals.scenarios}
          icon={<AlertCircle className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live coverage by criterion</CardTitle>
          <CardDescription>
            Counts come straight from <code className="font-mono text-xs">v_syllabus_coverage</code>.
            Empty rows are gaps — either the syllabus moved, or this app does not cover the criterion
            yet (some are deliberately out of scope, see below).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No coverage rows. Apply the migration{' '}
              <code className="font-mono bg-muted px-1 py-0.5 rounded">
                supabase/migrations/0002_syllabus_alignment.sql
              </code>{' '}
              and re-run{' '}
              <code className="font-mono bg-muted px-1 py-0.5 rounded">
                npm run generate:questions-sql
              </code>
              .
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4 font-semibold">Criterion</th>
                    <th className="py-2 pr-4 font-semibold text-right">Questions</th>
                    <th className="py-2 pr-4 font-semibold text-right">Modules</th>
                    <th className="py-2 pr-4 font-semibold text-right">CIT</th>
                    <th className="py-2 pr-2 font-semibold text-right">Total</th>
                    <th className="py-2 font-semibold text-right">Practice</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.ref} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-4 font-mono text-xs font-semibold">{r.ref}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{r.questions}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{r.modules}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{r.scenarios}</td>
                      <td className="py-2 pr-2 text-right tabular-nums font-semibold">{r.total}</td>
                      <td className="py-2 text-right">
                        <Link
                          href={`/practice?syllabus=${encodeURIComponent(r.ref)}`}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          Practice <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {mapping && (
        <Card>
          <CardHeader>
            <CardTitle>Mapping document</CardTitle>
            <CardDescription>
              Source of truth lives at <code className="font-mono text-xs">docs/syllabus-mapping.md</code>;
              shown here in plain markdown for reference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/90 font-mono bg-muted/40 p-4 rounded-xl overflow-x-auto">
              {mapping}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CoverageStat({
  label,
  count,
  icon,
}: {
  label: string;
  count: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{count}</p>
    </div>
  );
}
