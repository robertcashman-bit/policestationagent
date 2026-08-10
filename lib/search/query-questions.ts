import { createClient } from '@/lib/supabase/server';

export type QuestionSearchResult = {
  id: string;
  questionText: string;
  category: string;
};

export async function searchQuestions(query: string, limit = 20): Promise<QuestionSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from('questions')
    .select('id, question_text, category')
    .eq('status', 'approved')
    .ilike('question_text', `%${trimmed.replace(/[%_]/g, '')}%`)
    .limit(limit);

  return (data ?? []).map((row) => ({
    id: row.id as string,
    questionText: row.question_text as string,
    category: row.category as string,
  }));
}
