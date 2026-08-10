import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { CitPlayer } from './player';

interface ScenarioRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syllabus_refs: string[] | null;
  setup: string;
  branches: unknown;
  learning_points: string[] | null;
  source_refs: string[] | null;
}

export default async function CitScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getCurrentUser();
  const { slug } = await params;
  if (!user) redirect(`/auth/login?next=/critical-incidents/${slug}`);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cit_scenarios')
    .select('id,slug,title,category,difficulty,syllabus_refs,setup,branches,learning_points,source_refs')
    .eq('status', 'approved')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 text-center">
        <p className="font-semibold text-red-600">Couldn&apos;t load scenario</p>
        <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
      </div>
    );
  }
  if (!data) notFound();

  const row = data as ScenarioRow;

  return (
    <CitPlayer
      scenario={{
        id: row.id,
        slug: row.slug,
        title: row.title,
        category: row.category,
        difficulty: row.difficulty,
        syllabus_refs: row.syllabus_refs ?? [],
        setup: row.setup,
        // branches stored as jsonb; cast at the boundary
        branches: row.branches as never,
        learning_points: row.learning_points ?? [],
        source_refs: row.source_refs ?? [],
      }}
    />
  );
}
