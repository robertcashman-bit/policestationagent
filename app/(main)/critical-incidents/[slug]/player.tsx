'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
  Award,
  BookOpen,
} from 'lucide-react';

export interface CitChoice {
  id: string;
  label: string;
  next: string;
  feedback: string;
  score: number;
}

export interface CitNode {
  prompt: string;
  choices?: CitChoice[];
  terminal?: boolean;
  outcome?: 'good' | 'mixed' | 'bad';
  summary?: string;
}

export interface CitBranches {
  start: string;
  nodes: Record<string, CitNode>;
}

export interface CitScenario {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syllabus_refs: string[];
  setup: string;
  branches: CitBranches;
  learning_points: string[];
  source_refs: string[];
}

interface RecordedStep {
  nodeId: string;
  prompt: string;
  choiceId: string;
  choiceLabel: string;
  feedback: string;
  score: number;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced: 'bg-red-50 text-red-700',
};

const OUTCOME_BADGE: Record<string, string> = {
  good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  mixed: 'bg-amber-50 text-amber-800 border-amber-200',
  bad: 'bg-red-50 text-red-700 border-red-200',
};

export function CitPlayer({ scenario }: { scenario: CitScenario }) {
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.branches.start);
  const [history, setHistory] = useState<RecordedStep[]>([]);
  const [persistedSessionId, setPersistedSessionId] = useState<string | null>(null);
  const [persistError, setPersistError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const node = scenario.branches.nodes[currentNodeId];
  const isTerminal = !!node?.terminal;
  const totalScore = useMemo(
    () => history.reduce((acc, s) => acc + s.score, 0),
    [history],
  );

  const handleChoice = useCallback(
    (choice: CitChoice) => {
      setHistory((prev) => [
        ...prev,
        {
          nodeId: currentNodeId,
          prompt: node?.prompt ?? '',
          choiceId: choice.id,
          choiceLabel: choice.label,
          feedback: choice.feedback,
          score: choice.score,
        },
      ]);
      setCurrentNodeId(choice.next);
    },
    [currentNodeId, node?.prompt],
  );

  const handleRestart = useCallback(() => {
    setCurrentNodeId(scenario.branches.start);
    setHistory([]);
    setPersistedSessionId(null);
    setPersistError(null);
  }, [scenario.branches.start]);

  // Persist a row on terminal nodes (once per finish)
  useEffect(() => {
    let cancelled = false;
    if (!isTerminal || persistedSessionId) return;

    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await supabase
          .from('scenario_sessions')
          .insert({
            user_id: user.id,
            scenario_data: {
              source: 'cit_scenarios',
              scenario_id: scenario.id,
              slug: scenario.slug,
              title: scenario.title,
              category: scenario.category,
              difficulty: scenario.difficulty,
              syllabus_refs: scenario.syllabus_refs,
            },
            responses: history,
            feedback: {
              terminal_node: currentNodeId,
              outcome: node?.outcome ?? null,
              summary: node?.summary ?? null,
              total_score: totalScore,
              learning_points: scenario.learning_points,
              source_refs: scenario.source_refs,
            },
            completed: true,
          })
          .select('id')
          .single();
        if (cancelled) return;
        if (error) {
          setPersistError(error.message);
          return;
        }
        if (data?.id) setPersistedSessionId(data.id);
      } catch (err) {
        if (cancelled) return;
        setPersistError(err instanceof Error ? err.message : 'Could not save run');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isTerminal,
    persistedSessionId,
    supabase,
    scenario,
    history,
    currentNodeId,
    node?.outcome,
    node?.summary,
    totalScore,
  ]);

  if (!node) {
    return (
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 text-center">
        <p className="font-semibold text-red-600">Scenario data is malformed.</p>
        <Link
          href="/critical-incidents"
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          ← Back to scenarios
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Link
        href="/critical-incidents"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> All scenarios
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {scenario.category}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
              DIFFICULTY_BADGE[scenario.difficulty] ?? 'bg-muted text-muted-foreground'
            }`}
          >
            {scenario.difficulty}
          </span>
          {scenario.syllabus_refs.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-foreground">{scenario.title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{scenario.setup}</p>
      </div>

      {/* Decision card */}
      {!isTerminal && (
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Decision point {history.length + 1}
            </p>
            <p className="text-foreground font-medium leading-relaxed">{node.prompt}</p>
          </div>
          <div className="p-6 space-y-3">
            {node.choices?.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => handleChoice(c)}
                className="answer-option answer-option-idle w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {String.fromCodePoint(65 + idx)}
                  </div>
                  <span className="flex-1 font-medium text-[0.9375rem]">{c.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal outcome */}
      {isTerminal && (
        <div
          className={`rounded-2xl border-2 p-6 ${
            OUTCOME_BADGE[node.outcome ?? 'mixed']
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-lg mb-2">
            {node.outcome === 'good' && <CheckCircle2 className="w-5 h-5" />}
            {node.outcome === 'mixed' && <AlertTriangle className="w-5 h-5" />}
            {node.outcome === 'bad' && <AlertCircle className="w-5 h-5" />}
            <span>
              {node.outcome === 'good' && 'Outcome: PSRAS standard met'}
              {node.outcome === 'mixed' && 'Outcome: partial / could be stronger'}
              {node.outcome === 'bad' && 'Outcome: PSRAS standard not met'}
            </span>
            <span className="ml-auto text-xs font-semibold bg-white/70 px-2 py-0.5 rounded-full">
              Score {totalScore}
            </span>
          </div>
          {node.prompt && (
            <p className="text-foreground/90 mb-2 leading-relaxed">{node.prompt}</p>
          )}
          {node.summary && (
            <p className="text-sm text-foreground/80 leading-relaxed">{node.summary}</p>
          )}
        </div>
      )}

      {/* History timeline */}
      {history.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            Decisions so far
          </p>
          <ol className="space-y-3">
            {history.map((step, i) => (
              <li
                key={`${step.nodeId}-${i}`}
                className="border-l-2 border-border pl-3 text-sm"
              >
                <p className="text-xs text-muted-foreground mb-0.5">
                  Step {i + 1} · {step.score >= 0 ? `+${step.score}` : step.score} pts
                </p>
                <p className="text-foreground font-medium">{step.choiceLabel}</p>
                <p className="text-xs text-muted-foreground mt-1 italic">{step.feedback}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Learning points + actions on terminal */}
      {isTerminal && (
        <>
          {scenario.learning_points.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Learning points
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground">
                {scenario.learning_points.map((lp) => (
                  <li key={lp}>{lp}</li>
                ))}
              </ul>
            </div>
          )}

          {scenario.source_refs.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Sources
                </p>
              </div>
              <p className="text-sm text-foreground/80">{scenario.source_refs.join(' · ')}</p>
            </div>
          )}

          {persistError && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
              Couldn&apos;t save your run: {persistError}
            </div>
          )}
          {persistedSessionId && (
            <div className="text-xs text-muted-foreground">Run saved.</div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try again
            </Button>
            <Link
              href="/critical-incidents"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/60"
            >
              Back to scenarios
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
