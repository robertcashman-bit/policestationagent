'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/utils/error-handler';
import { AlertCircle, ChevronRight, Clock, RotateCcw, Target } from 'lucide-react';

const EXAM_NAME = 'PSRAS MCQ Mock Exam';
const TOTAL_QUESTIONS = 50;
const TIME_LIMIT_MINUTES = 90;

interface Question {
  id: string;
  question_text: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  options: Record<string, unknown>;
  correct_answer: string[];
}

type Phase = 'landing' | 'exam' | 'results';

function optionText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    return (v.text as string) || (v.label as string) || JSON.stringify(value);
  }
  return String(value);
}

function normaliseKeys(q: Question, raw: string[]): string[] {
  const keys = Object.keys(q.options);
  const letterToIndex: Record<string, string> = { A: '0', B: '1', C: '2', D: '3', a: '0', b: '1', c: '2', d: '3' };
  const indexToLetter: Record<string, string> = { '0': 'a', '1': 'b', '2': 'c', '3': 'd' };
  const usesNumeric = keys.some((k) => /^\d+$/.test(k));
  const usesLetter = keys.some((k) => /^[a-dA-D]$/.test(k));
  return raw.map((a) => {
    const s = String(a).trim();
    if (usesNumeric && letterToIndex[s]) return letterToIndex[s];
    if (usesLetter && /^\d+$/.test(s) && indexToLetter[s]) return indexToLetter[s];
    return s;
  });
}

function answersMatch(q: Question, selected: string[]): boolean {
  const normCorrect = normaliseKeys(q, q.correct_answer);
  const normSelected = selected.map((a) => String(a).trim());
  return (
    normSelected.length === normCorrect.length &&
    normSelected.every((a) => normCorrect.includes(a)) &&
    normCorrect.every((a) => normSelected.includes(a))
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MockExamClient() {
  const supabase = createClient();
  const [phase, setPhase] = useState<Phase>('landing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT_MINUTES * 60);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentQuestion = questions[currentIndex];
  const selected = currentQuestion ? answers[currentQuestion.id] ?? [] : [];

  const finishExam = useCallback(
    async (finalAnswers: Record<string, string[]>) => {
      let correct = 0;
      for (const q of questions) {
        if (answersMatch(q, finalAnswers[q.id] ?? [])) correct += 1;
      }
      const total = questions.length;
      const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
      setScore({ correct, total });
      setPhase('results');

      if (sessionId) {
        try {
          await supabase
            .from('mock_exam_sessions')
            .update({
              completed_at: new Date().toISOString(),
              answers: finalAnswers,
              score: correct,
              percentage,
              status: 'completed',
            })
            .eq('id', sessionId);
        } catch {
          /* session save is best-effort */
        }
        void fetch('/api/certificates/check', { method: 'POST' }).catch(() => undefined);
      }
    },
    [questions, sessionId, supabase],
  );

  useEffect(() => {
    if (phase !== 'exam') return;
    if (secondsLeft <= 0) {
      finishExam(answers);
      return;
    }
    const timer = globalThis.setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => globalThis.clearInterval(timer);
  }, [phase, secondsLeft, answers, finishExam]);

  const startExam = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be signed in to start a mock exam.');

      const { data: sessionRow, error: sessionError } = await supabase
        .from('mock_exam_sessions')
        .insert({
          user_id: user.id,
          exam_name: EXAM_NAME,
          total_questions: TOTAL_QUESTIONS,
          time_limit_minutes: TIME_LIMIT_MINUTES,
          status: 'in_progress',
        })
        .select('id')
        .single();
      if (sessionError) throw sessionError;

      const { data, error: queryError } = await supabase
        .from('questions')
        .select('id, question_text, category, difficulty, options, correct_answer')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(TOTAL_QUESTIONS);
      if (queryError) throw queryError;
      if (!data?.length) throw new Error('No approved questions available for a mock exam.');

      const shuffled = [...data].sort(() => Math.random() - 0.5) as Question[];
      setSessionId(sessionRow.id);
      setQuestions(shuffled);
      setAnswers({});
      setCurrentIndex(0);
      setSecondsLeft(TIME_LIMIT_MINUTES * 60);
      setPhase('exam');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (key: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const existing = prev[currentQuestion.id] ?? [];
      const isMultiple = currentQuestion.correct_answer.length > 1;
      const next = isMultiple
        ? existing.includes(key)
          ? existing.filter((a) => a !== key)
          : [...existing, key]
        : [key];
      return { ...prev, [currentQuestion.id]: next };
    });
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const submitExam = () => finishExam(answers);

  if (phase === 'landing') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <p className="section-label mb-1">Mock Exam</p>
          <h1 className="text-3xl font-bold text-navy-800 mb-2">Timed PSRAS MCQ Mock</h1>
          <p className="text-muted-foreground">
            Simulate assessment conditions with a full timed paper. Answers are scored at the end — no
            instant feedback during the exam.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Target className="w-5 h-5 text-primary flex-shrink-0" />
            <span>
              <strong>{TOTAL_QUESTIONS} questions</strong> drawn from the approved question bank
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <span>
              <strong>{TIME_LIMIT_MINUTES} minutes</strong> time limit (auto-submit when time expires)
            </span>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            For CIT-style decision-making practice, use the{' '}
            <Link href="/critical-incidents" className="text-primary hover:underline font-medium">
              Critical Incidents
            </Link>{' '}
            module separately.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <Button onClick={startExam} disabled={loading} className="w-full h-11 gap-2">
          {loading ? 'Preparing exam…' : 'Start mock exam'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (phase === 'results') {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <div className="bg-card rounded-2xl border border-border shadow-card p-10">
          <p className="section-label mb-2">Exam complete</p>
          <p className="text-5xl font-bold text-foreground mb-1">{pct}%</p>
          <p className="text-muted-foreground mb-6">
            {score.correct} of {score.total} correct
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => { setPhase('landing'); setError(null); }} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Take another mock
            </Button>
            <Button variant="outline" asChild>
              <Link href="/practice">Review in practice mode</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto text-center p-16">
        <p className="text-muted-foreground">Loading exam…</p>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);
  const answeredCount = Object.keys(answers).filter((id) => (answers[id]?.length ?? 0) > 0).length;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="section-label mb-1">Mock Exam</p>
          <p className="text-muted-foreground text-sm">
            Question {currentIndex + 1} of {questions.length} · {answeredCount} answered
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-lg font-bold ${
            secondsLeft <= 300 ? 'border-red-300 bg-red-50 text-red-700' : 'border-border bg-card'
          }`}
        >
          <Clock className="w-5 h-5" />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-border">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {currentQuestion.category}
          </span>
          <p className="text-[1.0625rem] font-semibold text-foreground leading-relaxed mt-3">
            {currentQuestion.question_text}
          </p>
        </div>

        <div className="p-6 space-y-3">
          {Object.entries(currentQuestion.options).map(([key, value], idx) => {
            const isSelected = selected.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectAnswer(key)}
                className={isSelected ? 'answer-option answer-option-selected' : 'answer-option answer-option-idle'}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {String.fromCodePoint(65 + idx)}
                  </div>
                  <span className="flex-1 text-left font-medium text-[0.9375rem]">{optionText(value)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="flex-1">
          Previous
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button onClick={goNext} className="flex-1 gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={submitExam} className="flex-1">
            Submit exam
          </Button>
        )}
      </div>
    </div>
  );
}
