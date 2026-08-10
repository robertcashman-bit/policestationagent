'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

type Option = { key: string; text: string };

const QUESTION = {
  category: 'PACE · Code C',
  difficulty: 'Exam-level',
  stem: 'Your client is detained for an indictable offence. Under PACE, access to legal advice may be delayed only when:',
  options: [
    { key: 'A', text: 'The custody officer believes the solicitor will advise the client to stay silent.' },
    {
      key: 'B',
      text: 'An officer of at least superintendent rank has reasonable grounds to believe it would interfere with evidence or lead to harm to others.',
    },
    { key: 'C', text: 'The client has previously been arrested for a similar offence.' },
    { key: 'D', text: 'The interviewing officer decides the case is urgent.' },
  ] as Option[],
  correct: 'B',
  explanation:
    'Under s.58 PACE, a delay in access to legal advice can only be authorised for an indictable offence by an officer of at least superintendent rank, on reasonable grounds (e.g. interference with evidence or harm to others). It can never be delayed because of the advice a solicitor might give.',
};

export function TryQuestionWidget({ questionStat }: { questionStat: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === QUESTION.correct;

  const optionState = (key: string) => {
    if (!answered) return 'idle';
    if (key === QUESTION.correct) return 'correct';
    if (key === selected) return 'incorrect';
    return 'dimmed';
  };

  return (
    <div className="gradient-border glow-navy mx-auto max-w-2xl">
      <div className="rounded-[1.25rem] bg-white p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-[#0B3C5D]">
              {QUESTION.category}
            </span>
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
              {QUESTION.difficulty}
            </span>
          </div>
          {answered && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B3C5D] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>

        <p className="text-lg font-semibold leading-snug text-slate-900">{QUESTION.stem}</p>

        <div className="mt-5 space-y-2.5">
          {QUESTION.options.map((opt) => {
            const state = optionState(opt.key);
            return (
              <button
                key={opt.key}
                type="button"
                disabled={answered}
                onClick={() => setSelected(opt.key)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200 ${
                  state === 'idle'
                    ? 'border-slate-200 bg-white hover:border-[#0B3C5D]/40 hover:bg-primary-50/40 cursor-pointer'
                    : ''
                } ${state === 'correct' ? 'border-emerald-500 bg-emerald-50' : ''} ${
                  state === 'incorrect' ? 'border-red-400 bg-red-50' : ''
                } ${state === 'dimmed' ? 'border-slate-200 bg-slate-50 opacity-55' : ''}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    state === 'correct'
                      ? 'bg-emerald-500 text-white'
                      : state === 'incorrect'
                        ? 'bg-red-400 text-white'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {state === 'correct' ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : state === 'incorrect' ? (
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : (
                    opt.key
                  )}
                </span>
                <span className="font-medium text-slate-800">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-5 animate-fade-in-up rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p
              className={`flex items-center gap-2 text-sm font-bold ${
                isCorrect ? 'text-emerald-700' : 'text-[#0B3C5D]'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              {isCorrect ? 'Correct — well reasoned.' : 'Not quite — here’s the rule.'}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{QUESTION.explanation}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[#0B3C5D]">
                {questionStat} more questions like this inside.
              </p>
              <Link
                href="/signup"
                data-testid="try-question-cta"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-[#0B3C5D]"
              >
                Start training free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        )}

        {!answered && (
          <p className="mt-5 text-center text-xs font-medium text-slate-500">
            Pick an answer to see the worked explanation — no sign-up needed.
          </p>
        )}
      </div>
    </div>
  );
}
