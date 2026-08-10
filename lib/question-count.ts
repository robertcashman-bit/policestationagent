import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/** Approved MCQ count for marketing stats (homepage, audit). */
export async function getApprovedQuestionCount(): Promise<number | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'approved');

  if (error) return null;
  return count ?? null;
}

/** Display string e.g. "290+" or "500+" for homepage stat pills. */
export function formatQuestionCountStat(count: number | null): string {
  if (count == null) return '290+';
  if (count >= 500) return '500+';
  if (count >= 280) return `${count}+`;
  return '290+';
}
