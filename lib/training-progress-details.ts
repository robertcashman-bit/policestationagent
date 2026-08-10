import { createClient } from '@/lib/supabase/server';

export type SyllabusUnitStat = {
  unit: string;
  total: number;
  correct: number;
  accuracyPct: number | null;
};

export type MockExamHistoryRow = {
  id: string;
  examName: string;
  completedAt: string;
  score: number | null;
  totalQuestions: number;
  percentage: number | null;
};

export type RecentActivityRow = {
  timestamp: string;
  answeredCorrectly: boolean;
};

export type DetailedTrainingProgress = {
  syllabusUnits: SyllabusUnitStat[];
  recentActivity: RecentActivityRow[];
  mockExamHistory: MockExamHistoryRow[];
  certificatesEarned: number;
};

function buildSyllabusStats(
  rows: { question_id: string; answered_correctly: boolean }[],
  refsById: Map<string, string[]>,
): SyllabusUnitStat[] {
  const syllabusStats = new Map<string, { total: number; correct: number }>();

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

  return [...syllabusStats.entries()]
    .map(([unit, stats]) => ({
      unit,
      total: stats.total,
      correct: stats.correct,
      accuracyPct: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null,
    }))
    .sort((a, b) => a.unit.localeCompare(b.unit));
}

export async function getDetailedTrainingProgress(
  userId: string,
): Promise<DetailedTrainingProgress> {
  const supabase = await createClient();

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('question_id, answered_correctly, timestamp')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  const rows = progressRows ?? [];
  const questionIds = [...new Set(rows.map((r) => r.question_id))];
  const refsById = new Map<string, string[]>();

  if (questionIds.length > 0) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, syllabus_refs')
      .in('id', questionIds);

    for (const q of questions ?? []) {
      refsById.set(q.id as string, (q.syllabus_refs as string[]) ?? []);
    }
  }

  const [{ data: mockSessions }, { count: certCount }] = await Promise.all([
    supabase
      .from('mock_exam_sessions')
      .select('id, exam_name, completed_at, score, total_questions, percentage')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(3),
    supabase
      .from('certificates')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
  ]);

  return {
    syllabusUnits: buildSyllabusStats(rows, refsById),
    recentActivity: rows.slice(0, 5).map((r) => ({
      timestamp: r.timestamp as string,
      answeredCorrectly: r.answered_correctly as boolean,
    })),
    mockExamHistory: (mockSessions ?? []).map((s) => ({
      id: s.id as string,
      examName: s.exam_name as string,
      completedAt: s.completed_at as string,
      score: s.score as number | null,
      totalQuestions: s.total_questions as number,
      percentage: s.percentage != null ? Number(s.percentage) : null,
    })),
    certificatesEarned: certCount ?? 0,
  };
}
