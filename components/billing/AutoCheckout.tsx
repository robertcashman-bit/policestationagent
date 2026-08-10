'use client';

import { useEffect, useRef, useState } from 'react';

type Plan = 'monthly' | 'annual';

/**
 * Renders on `/billing?plan=monthly|annual` (the destination after a
 * logged-out visitor clicks pricing's "Get started" and completes signup).
 * Immediately starts Lemon Squeezy checkout for that plan instead of
 * leaving the user to notice and click a separate "Subscribe" button —
 * that extra, easy-to-miss step is why "Get started" felt broken.
 * Falls back to a visible inline error (the manual Subscribe cards stay
 * rendered below as a retry path) if checkout can't be started.
 */
export function AutoCheckout({ plan }: Readonly<{ plan: Plan }>) {
  const [status, setStatus] = useState<'pending' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        const res = await fetch('/api/lemonsqueezy/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Failed to start checkout');
        if (!data.url) {
          throw new Error('Checkout did not return a redirect link. Please choose a plan below.');
        }
        window.location.href = data.url;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong starting checkout.');
        setStatus('error');
      }
    })();
  }, [plan]);

  if (status === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">We couldn&apos;t start checkout automatically.</p>
        <p className="mt-1">{error} Choose a plan below to try again.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
      <span
        aria-hidden
        className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
      />
      Redirecting you to checkout for the {plan} plan…
    </div>
  );
}
