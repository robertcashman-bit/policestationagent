'use client';

import { useState } from 'react';
import Link from 'next/link';

type Plan = 'monthly' | 'annual';

/**
 * Pricing page "Get started" CTA. Behaviour depends on the visitor's state
 * so the click always leads somewhere useful instead of just linking to
 * account creation and dead-ending:
 *  - logged out            -> /signup?plan=<plan> (account creation, then
 *                              auto-continues into checkout — see billing page)
 *  - logged in, unpaid     -> starts Lemon Squeezy checkout immediately
 *  - logged in, already paid -> nothing to buy, go straight to the dashboard
 */
export function GetStartedButton({
  plan,
  isAuthenticated,
  hasPaidAccess,
  className,
  children = 'Get started',
}: Readonly<{
  plan: Plan;
  isAuthenticated: boolean;
  hasPaidAccess: boolean;
  className: string;
  children?: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <Link href={`/signup?plan=${plan}`} className={className}>
        {children}
      </Link>
    );
  }

  if (hasPaidAccess) {
    return (
      <Link href="/dashboard" className={className}>
        Go to dashboard
      </Link>
    );
  }

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/lemonsqueezy/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to start checkout');
      if (!data.url) throw new Error('Checkout did not return a redirect link. Please try again.');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong starting checkout.');
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? 'Redirecting to checkout…' : children}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </>
  );
}
