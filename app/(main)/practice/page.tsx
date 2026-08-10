'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { getErrorMessage, isConnectionError } from '@/lib/utils/error-handler';
import {
  Target,
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  BookOpen,
  AlertCircle,
  Keyboard,
  Filter,
} from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  options: Record<string, unknown>;
  correct_answer: string[];
  explanation: string | null;
  source_refs: string[] | null;
  syllabus_refs: string[] | null;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced: 'bg-red-50 text-red-700',
};

type SessionAnswer = {
  questionId: string;
  questionText: string;
  selected: string[];
  correct: boolean;
  explanation: string | null;
};

function PracticePageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSyllabus = searchParams.get('syllabus') || 'all';
  const initialLimit = searchParams.get('limit');
  const initialPreset = searchParams.get('preset');
  const initialDifficulty = searchParams.get('difficulty');
  const isExamPreset = initialPreset === 'exam' || searchParams.get('mode') === 'exam';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    category: initialCategory,
    difficulty: isExamPreset ? 'advanced' : initialDifficulty || 'all',
    syllabus: initialSyllabus,
  });
  const [excludeSeen, setExcludeSeen] = useState(searchParams.get('excludeSeen') === '1');
  const [delayedFeedback, setDelayedFeedback] = useState(isExamPreset);
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(isExamPreset);
  const supabase = createClient();
  const router = useRouter();

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('category')
        .eq('status', 'approved');

      const categories = Array.from(new Set(allQuestions?.map((q) => q.category) || []));
      setAvailableCategories(categories);

      const validCategory =
        filter.category === 'all' || categories.includes(filter.category)
          ? filter.category
          : 'all';

      if (validCategory !== filter.category) {
        setFilter((f) => ({ ...f, category: validCategory }));
      }

      const sessionLimit = isExamPreset
        ? 30
        : initialLimit
          ? Number.parseInt(initialLimit, 10)
          : 20;

      let query = supabase
        .from('questions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(excludeSeen ? Math.min(sessionLimit * 4, 200) : sessionLimit);

      if (validCategory !== 'all') query = query.eq('category', validCategory);
      if (filter.difficulty !== 'all') query = query.eq('difficulty', filter.difficulty);
      if (filter.syllabus && filter.syllabus !== 'all') {
        query = query.overlaps('syllabus_refs', [filter.syllabus]);
      }

      const { data, error: queryError } = await query;
      if (queryError) throw queryError;

      if (data) {
        let pool = data as Question[];

        if (excludeSeen) {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            const { data: seenRows } = await supabase
              .from('user_progress')
              .select('question_id')
              .eq('user_id', user.id);
            const seenIds = new Set((seenRows ?? []).map((r) => r.question_id));
            pool = pool.filter((q) => !seenIds.has(q.id));
          }
        }

        const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, sessionLimit);
        setQuestions(shuffled);
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setShowFeedback(false);
        setShowSummary(false);
        setSessionAnswers([]);
        setStats({ correct: 0, total: 0 });
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuestions(); }, [filter, excludeSeen]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentQuestion = questions[currentIndex];

  /* ── Answer key normalisation helpers ── */
  const letterToIndex: Record<string, string> = { A: '0', B: '1', C: '2', D: '3', a: '0', b: '1', c: '2', d: '3' };
  const indexToLetter: Record<string, string> = { '0': 'a', '1': 'b', '2': 'c', '3': 'd' };

  function normaliseKeys(q: Question, raw: string[]): string[] {
    const keys = Object.keys(q.options);
    const usesNumeric = keys.some((k) => /^\d+$/.test(k));
    const usesLetter = keys.some((k) => /^[a-dA-D]$/.test(k));
    return raw.map((a) => {
      const s = String(a).trim();
      if (usesNumeric && letterToIndex[s]) return letterToIndex[s];
      if (usesLetter && /^\d+$/.test(s) && indexToLetter[s]) return indexToLetter[s];
      return s;
    });
  }

  const handleAnswerSelect = useCallback(
    (key: string) => {
      if (showFeedback) return;
      setSelectedAnswers((prev) => {
        if (prev.includes(key)) return prev.filter((a) => a !== key);
        const isMultiple = currentQuestion?.correct_answer.length > 1;
        return isMultiple ? [...prev, key] : [key];
      });
    },
    [showFeedback, currentQuestion],
  );

  const handleSubmit = useCallback(async () => {
    if (!currentQuestion || selectedAnswers.length === 0) return;

    const normCorrect = normaliseKeys(currentQuestion, currentQuestion.correct_answer);
    const normSelected = selectedAnswers.map((a) => String(a).trim());

    const isCorrect =
      normSelected.length === normCorrect.length &&
      normSelected.every((a) => normCorrect.includes(a)) &&
      normCorrect.every((a) => normSelected.includes(a));

    const saveProgress = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('user_progress').insert({
            user_id: user.id,
            question_id: currentQuestion.id,
            answered_correctly: isCorrect,
            selected_answer: selectedAnswers,
          });
          try {
            await supabase.rpc('update_user_xp', { user_uuid: user.id, xp_gained: isCorrect ? 10 : 2 });
            await supabase.rpc('update_daily_streak', { user_uuid: user.id });
          } catch {
            /* XP functions may not exist yet */
          }
        }
      } catch (err: unknown) {
        if (!isConnectionError(err)) console.error('Progress save error:', err);
      }
    };

    void saveProgress().then(() => {
      if (stats.total > 0 && (stats.total + 1) % 25 === 0) {
        void fetch('/api/certificates/check', { method: 'POST' }).catch(() => undefined);
      }
    });

    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (delayedFeedback) {
      setSessionAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question_text,
          selected: [...selectedAnswers],
          correct: isCorrect,
          explanation: currentQuestion.explanation,
        },
      ]);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswers([]);
      } else {
        setShowSummary(true);
      }
      return;
    }

    setShowFeedback(true);
  }, [currentQuestion, selectedAnswers, supabase, delayedFeedback, currentIndex, questions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
    } else {
      router.push('/practice');
    }
  }, [currentIndex, questions.length, router]);

  useEffect(() => {
    if (!currentQuestion) return;
    const handler = (e: KeyboardEvent) => {
      if (showFeedback) {
        if (e.key === 'Enter' || e.key === ' ') handleNext();
      } else {
        const optionKeys = Object.keys(currentQuestion.options || {});
        if (e.key >= '1' && e.key <= '4') {
          const k = optionKeys[Number.parseInt(e.key) - 1];
          if (k) handleAnswerSelect(k);
        } else if (e.key >= 'a' && e.key <= 'd') {
          const k = optionKeys[(e.key.codePointAt(0) ?? 0) - 97];
          if (k) handleAnswerSelect(k);
        }
        if (e.key === 'Enter' && selectedAnswers.length > 0) handleSubmit();
      }
    };
        globalThis.addEventListener('keydown', handler);
    return () => globalThis.removeEventListener('keydown', handler);
  }, [showFeedback, selectedAnswers, currentQuestion, handleNext, handleAnswerSelect, handleSubmit]);

  /* ── States ── */
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <p className="font-semibold text-foreground">Loading questions…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Error loading questions</h2>
          <p className="text-muted-foreground mb-6 text-sm">{error}</p>
          <Button onClick={loadQuestions} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Try again
          </Button>
        </div>
      </div>
    );
  }

  if (showSummary) {
    const summaryAccuracy =
      stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="bg-card rounded-2xl border border-border shadow-card p-8 text-center">
          <p className="section-label mb-2">Exam prep complete</p>
          <h2 className="text-2xl font-bold text-foreground mb-1">{summaryAccuracy}% accuracy</h2>
          <p className="text-muted-foreground text-sm mb-6">
            {stats.correct} of {stats.total} correct — review explanations below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => loadQuestions()} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try another set
            </Button>
            <Button variant="outline" onClick={() => router.push('/progress')}>
              View progress
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {sessionAnswers.map((row, idx) => (
            <div
              key={`${row.questionId}-${idx}`}
              className={`rounded-xl border p-5 ${row.correct ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'}`}
            >
              <p className="text-xs font-semibold text-muted-foreground mb-1">Question {idx + 1}</p>
              <p className="font-medium text-foreground text-sm mb-2">{row.questionText}</p>
              {row.explanation && (
                <p className="text-sm text-muted-foreground leading-relaxed">{row.explanation}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No questions available</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            {excludeSeen
              ? 'No unseen questions match your filters — try turning off “exclude seen” or broaden filters.'
              : 'No questions match your current filters.'}
          </p>
          <Button
            onClick={() => {
              setExcludeSeen(false);
              setFilter({ category: 'all', difficulty: 'all', syllabus: 'all' });
            }}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset filters
          </Button>
        </div>
      </div>
    );
  }

  /* ── Rendering helpers ── */
  const normCorrect = normaliseKeys(currentQuestion, currentQuestion.correct_answer);
  const normSelected = selectedAnswers.map((a) => String(a).trim());
  const isCorrect =
    showFeedback &&
    normSelected.length === normCorrect.length &&
    normSelected.every((a) => normCorrect.includes(a)) &&
    normCorrect.every((a) => normSelected.includes(a));

  const categories =
    availableCategories.length > 0
      ? availableCategories
      : Array.from(new Set(questions.map((q) => q.category)));

  const accuracy =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null;

  /* Progress bar */
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in-up">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="section-label mb-1">
            {delayedFeedback ? 'Exam prep mode' : 'Practice Mode'}
          </p>
          <p className="text-muted-foreground text-sm">
            Question {currentIndex + 1} of {questions.length}
            {delayedFeedback && ' · feedback at end'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Accuracy badge */}
          {stats.total > 0 && (
            <div className="bg-card border border-border rounded-xl px-4 py-2 text-center min-w-[100px]">
              <p className="text-xs text-muted-foreground font-medium">Accuracy</p>
              <p className="text-2xl font-bold text-foreground leading-none mt-0.5">{accuracy}%</p>
              <p className="text-[10px] text-muted-foreground">
                {stats.correct}/{stats.total}
              </p>
            </div>
          )}

          {/* Filter toggle */}
          {currentIndex === 0 && (
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="progress-bar-fill-thin"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Filters panel */}
      {currentIndex === 0 && showFilters && (
        <div className="bg-card rounded-2xl border border-border p-5 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-foreground mb-1.5 block">Category</Label>
              <Select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground mb-1.5 block">Difficulty</Label>
              <Select
                value={filter.difficulty}
                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
              >
                <option value="all">All difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                Syllabus criterion
              </Label>
              <Select
                value={filter.syllabus}
                onChange={(e) => setFilter({ ...filter, syllabus: e.target.value })}
              >
                <option value="all">All syllabus criteria</option>
                <optgroup label="Unit 1 — Underpinning knowledge">
                  <option value="U1.AO1.A">U1.AO1.A — Authority to act</option>
                  <option value="U1.AO1.B">U1.AO1.B — Role / ethics / immigration</option>
                  <option value="U1.AO1.C">U1.AO1.C — Vulnerabilities</option>
                  <option value="U1.AO1.D">U1.AO1.D — Inappropriate police behaviour</option>
                  <option value="U1.AO1.E">U1.AO1.E — Ethics, conflicts</option>
                  <option value="U1.AO1.F">U1.AO1.F — Records</option>
                  <option value="U1.AO4.C">U1.AO4.C — Interview strategy / inferences</option>
                  <option value="U1.AO4.D">U1.AO4.D — Legal professional privilege</option>
                  <option value="U1.AO4.E">U1.AO4.E — Confession / s.78</option>
                  <option value="U1.AO5.B">U1.AO5.B — Key PACE/Code provisions</option>
                  <option value="U1.AO5.C">U1.AO5.C — Consequences of breach</option>
                </optgroup>
                <optgroup label="Unit 2 — Skills">
                  <option value="U2.AO1">U2.AO1 — Communicate</option>
                  <option value="U2.AO2">U2.AO2 — Negotiate</option>
                  <option value="U2.AO3">U2.AO3 — Elicit information</option>
                </optgroup>
                <optgroup label="Unit 3 — Request to attend">
                  <option value="U3.AO1.A">U3.AO1.A — Initial info</option>
                  <option value="U3.AO1.D">U3.AO1.D — Recording</option>
                </optgroup>
                <optgroup label="Unit 4 — Consulting officers">
                  <option value="U4.AO1.B">U4.AO1.B — Information sought</option>
                  <option value="U4.AO1.C">U4.AO1.C — Custody record</option>
                  <option value="U4.AO1.D">U4.AO1.D — Private consultation</option>
                </optgroup>
                <optgroup label="Unit 5 — Consult with the client">
                  <option value="U5.AO1.A">U5.AO1.A — Build trust</option>
                  <option value="U5.AO1.C">U5.AO1.C — Fitness for interview</option>
                  <option value="U5.AO2.A">U5.AO2.A — Inform of offence</option>
                  <option value="U5.AO2.B">U5.AO2.B — Take instructions</option>
                  <option value="U5.AO2.C">U5.AO2.C — Ethics during instruction</option>
                  <option value="U5.AO2.D">U5.AO2.D — Reasoned advice</option>
                </optgroup>
                <optgroup label="Unit 6 — Advising during interview">
                  <option value="U6.AO1.A">U6.AO1.A — Opening / privilege</option>
                  <option value="U6.AO1.B">U6.AO1.B — Interview compliance</option>
                  <option value="U6.AO2.B">U6.AO2.B — Advise without stopping</option>
                  <option value="U6.AO2.C">U6.AO2.C — Stop for advice</option>
                  <option value="U6.AO2.D">U6.AO2.D — Intervene against improper conduct</option>
                </optgroup>
                <optgroup label="Unit 7 — Vulnerability">
                  <option value="U7.AO1.A">U7.AO1.A — Identify vulnerability</option>
                  <option value="U7.AO1.B">U7.AO1.B — Police action</option>
                  <option value="U7.AO1.C">U7.AO1.C — Advise on AA / interpreter</option>
                  <option value="U7.AO2.A">U7.AO2.A — AA understands role</option>
                </optgroup>
                <optgroup label="Unit 8 — Identification">
                  <option value="U8.AO1.A">U8.AO1.A — First description</option>
                  <option value="U8.AO1.B">U8.AO1.B — Photo-shows</option>
                  <option value="U8.AO2.A">U8.AO2.A — Procedure compliance</option>
                </optgroup>
                <optgroup label="Unit 9 — Post-interview">
                  <option value="U9.AO1.A">U9.AO1.A — Charge / release reps</option>
                  <option value="U9.AO2.A">U9.AO2.A — Charge representations</option>
                  <option value="U9.AO2.B">U9.AO2.B — Bail representations</option>
                  <option value="U9.AO3.A">U9.AO3.A — Explain decisions</option>
                </optgroup>
              </Select>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={excludeSeen}
                onChange={(e) => setExcludeSeen(e.target.checked)}
                className="rounded border-border"
              />
              Exclude questions I&apos;ve already seen
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={delayedFeedback}
                onChange={(e) => setDelayedFeedback(e.target.checked)}
                className="rounded border-border"
              />
              Delay feedback until end of set
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFilter((f) => ({ ...f, difficulty: 'advanced' }));
                setDelayedFeedback(true);
                setShowFilters(false);
              }}
            >
              Exam prep preset
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Keyboard className="w-3.5 h-3.5" />
            <span>
              <strong className="text-foreground">Keyboard shortcuts:</strong> 1–4 or A–D to select · Enter to submit · Enter to advance
            </span>
          </div>
        </div>
      )}

      {/* Question card */}
      <div className="app-panel shadow-card">
        {/* Card header */}
        <div className="px-6 pt-6 pb-5 border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                {currentQuestion.category}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                  DIFFICULTY_COLORS[currentQuestion.difficulty] || 'bg-muted text-muted-foreground'
                }`}
              >
                {currentQuestion.difficulty}
              </span>
              {currentQuestion.syllabus_refs?.map((tag) => (
                <span
                  key={tag}
                  title="PSRAS syllabus criterion"
                  className="text-[11px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {currentQuestion.correct_answer.length > 1 && (
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Multiple answers
              </span>
            )}
          </div>
          <p className="text-[1.0625rem] font-semibold text-foreground leading-relaxed">
            {currentQuestion.question_text}
          </p>
        </div>

        {/* Answer options */}
        <div className="p-6 space-y-3">
          {Object.entries(currentQuestion.options).map(([key, value], idx) => {
            const isSelected = selectedAnswers.includes(key);
            const isCorrectAns = normCorrect.includes(String(key));

            let optionText: string;
            if (typeof value === 'string') {
              optionText = value;
            } else if (value && typeof value === 'object') {
              const v = value as Record<string, unknown>;
              optionText = (v.text as string) || (v.label as string) || JSON.stringify(value);
            } else {
              optionText = String(value);
            }

            /* Button style */
            let btnStyle = 'answer-option answer-option-idle';
            let labelStyle = 'bg-muted text-muted-foreground';

            if (showFeedback) {
              if (isCorrectAns) {
                btnStyle = 'answer-option answer-option-correct';
                labelStyle = 'bg-emerald-500 text-white';
              } else if (isSelected) {
                btnStyle = 'answer-option answer-option-incorrect';
                labelStyle = 'bg-red-500 text-white';
              } else {
                btnStyle = 'answer-option answer-option-dimmed';
              }
            } else if (isSelected) {
              btnStyle = 'answer-option answer-option-selected';
              labelStyle = 'bg-primary text-white';
            }

            return (
              <button
                key={key}
                onClick={() => handleAnswerSelect(key)}
                disabled={showFeedback}
                className={btnStyle}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${labelStyle}`}
                  >
                    {(() => {
                      if (showFeedback && isCorrectAns) return <CheckCircle className="w-4 h-4" />;
                      if (showFeedback && isSelected) return <XCircle className="w-4 h-4" />;
                      return String.fromCodePoint(65 + idx);
                    })()}
                  </div>
                  <span className="flex-1 text-left font-medium text-[0.9375rem]">{optionText}</span>
                  {showFeedback ? null : (
                    <span className="text-xs text-muted-foreground flex-shrink-0 opacity-60">
                      ({idx + 1})
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`rounded-xl p-5 border-2 animate-slide-up ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-base mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">Correct!</span>
                    <span className="ml-auto text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      +10 XP
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">Incorrect</span>
                    <span className="ml-auto text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      +2 XP
                    </span>
                  </>
                )}
              </div>
              {currentQuestion.explanation && (
                <p className="text-foreground text-sm leading-relaxed mb-2">
                  {currentQuestion.explanation}
                </p>
              )}
              {currentQuestion.source_refs && currentQuestion.source_refs.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Source:</strong>{' '}
                  {currentQuestion.source_refs.join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Action */}
          <div className="pt-2">
            {!showFeedback ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswers.length === 0}
                className="w-full h-11 gap-2"
              >
                Submit answer{' '}
                <span className="text-xs opacity-60">(Enter)</span>
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full h-11 gap-2">
                {currentIndex < questions.length - 1 ? 'Next question' : 'Finish practice'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-card p-16 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Loading…</p>
          </div>
        </div>
      }
    >
      <PracticePageContent />
    </Suspense>
  );
}
