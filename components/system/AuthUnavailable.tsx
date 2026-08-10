'use client';

import Link from 'next/link';

/**
 * Shown when our auth provider (Supabase) is unreachable. Used by
 * protected layouts so the user gets a clear "we're temporarily down,
 * here's what you can do" screen instead of a silent redirect to /auth
 * (which would also be broken for the same reason).
 */
export function AuthUnavailable({
  reason,
}: {
  reason: 'not_configured' | 'network';
}) {
  const isConfig = reason === 'not_configured';
  return (
    <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-card p-8 sm:p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-5 text-xl font-semibold">
          !
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
          Sign-in temporarily unavailable
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {isConfig
            ? 'The platform is missing its auth configuration. The team has been notified.'
            : "We can't reach our sign-in provider right now. Your account and progress are safe \u2014 this is almost always a brief network issue. Please try again in a minute."}
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
          >
            Return to homepage
          </Link>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') window.location.reload();
            }}
            className="inline-flex items-center justify-center h-11 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Try again
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          Status: <code className="font-mono">{reason}</code>
        </p>
      </div>
    </main>
  );
}
