'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const MODULE_VIEWED_KEY = 'psr_module_viewed';

type Props = {
  hasPracticed: boolean;
  hasMockExamAttempt: boolean;
};

export function FirstVisitChecklist({ hasPracticed, hasMockExamAttempt }: Props) {
  const [hasVisitedModules, setHasVisitedModules] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHasVisitedModules(localStorage.getItem(MODULE_VIEWED_KEY) === '1');
  }, []);

  const items = [
    { done: true, label: 'Create your account', href: '/dashboard' },
    { done: hasPracticed, label: 'Answer your first practice question', href: '/practice' },
    { done: hasVisitedModules, label: 'Browse a learning module', href: '/modules' },
    { done: hasMockExamAttempt, label: 'Try a timed mock exam', href: '/mock-exam' },
  ];

  const pending = items.filter((i) => !i.done).length;
  if (pending === 0) return null;

  return (
    <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 via-white to-gold/5 p-6 shadow-sm">
      <h2 className="font-semibold text-foreground mb-1">Getting started</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {pending} step{pending === 1 ? '' : 's'} left to get the most from PSR Train.
      </p>
      <ul className="space-y-2">
        {items.map(({ done, label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
              )}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { MODULE_VIEWED_KEY };
