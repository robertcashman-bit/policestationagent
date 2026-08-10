import { createClient } from '@/lib/supabase/server';

export type TrainingStats = {
  questionsAnswered: number;
  correctCount: number;
  accuracyPct: number | null;
  citScenariosCompleted: number;
  hasMockExamAttempt: boolean;
  lastPracticeAt: string | null;
  weakSyllabusTag: string | null;
  weakSyllabusAccuracy: number | null;
};

export async function getUserTrainingStats(userId: string): Promise<TrainingStats> {
  const supabase = await createClient();

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('question_id, answered_correctly, timestamp')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  const rows = progressRows ?? [];
  const questionsAnswered = rows.length;
  const correctCount = rows.filter((r) => r.answered_correctly).length;
  const accuracyPct =
    questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : null;
  const lastPracticeAt = rows[0]?.timestamp ?? null;

  const questionIds = [...new Set(rows.map((r) => r.question_id))];
  const syllabusStats = new Map<string, { total: number; correct: number }>();

  if (questionIds.length > 0) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, syllabus_refs')
      .in('id', questionIds);

    const refsById = new Map(
      (questions ?? []).map((q) => [q.id as string, (q.syllabus_refs as string[]) ?? []]),
    );

    for (const row of rows) {
      for (const tag of refsById.get(row.question_id) ?? []) {
        const unit = /^U[1-9]/.exec(tag)?.[0];
        if (!unit) continue;
        const cur = syllabusStats.get(unit) ?? { total: 0, correct: 0 };
        cur.total += 1;
        if (row.answered_correctly) cur.correct += 1;
        syllabusStats.set(unit, cur);
      }
    }
  }

  const [{ count: scenariosCount }, { count: mockExamCount }] = await Promise.all([
    supabase
      .from('scenario_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
    supabase
      .from('mock_exam_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
  ]);

  let weakSyllabusTag: string | null = null;
  let weakSyllabusAccuracy: number | null = null;
  for (const [unit, stats] of syllabusStats) {
    if (stats.total < 3) continue;
    const acc = stats.correct / stats.total;
    if (weakSyllabusAccuracy === null || acc < weakSyllabusAccuracy) {
      weakSyllabusTag = unit;
      weakSyllabusAccuracy = acc;
    }
  }

  return {
    questionsAnswered,
    correctCount,
    accuracyPct,
    citScenariosCompleted: scenariosCount ?? 0,
    hasMockExamAttempt: (mockExamCount ?? 0) > 0,
    lastPracticeAt,
    weakSyllabusTag,
    weakSyllabusAccuracy:
      weakSyllabusAccuracy !== null ? Math.round(weakSyllabusAccuracy * 100) : null,
  };
}
