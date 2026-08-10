'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getErrorMessage } from '@/lib/utils/error-handler';
import { safeInternalNextPath } from '@/lib/auth/safe-next-path';

const MIN_PASSWORD = 10;

function ResetFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const next = safeInternalNextPath(searchParams.get('next'));

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  // The recovery link goes through /auth/callback which exchanges the code
  // and redirects here. By the time we mount, the user should have a session.
  // Verify it; if not, send them back to /auth.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setHasSession(!!data.session);
      setCheckingSession(false);
    })();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { error: updateErr } = await supabase.auth.updateUser({ password });
      if (updateErr) {
        setError(getErrorMessage(updateErr));
        return;
      }
      setDone(true);
      // Small pause so user sees the success state before we navigate.
      setTimeout(() => {
        router.push(next);
        router.refresh();
      }, 800);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-card p-10 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Verifying reset link…</p>
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-card p-8 sm:p-10">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">
              That reset link is no longer valid. Request a fresh one below.
            </span>
          </div>
          <Link
            href="/auth?mode=forgot"
            className="block w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-border shadow-card p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
          Set a new password
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Pick a strong password of at least {MIN_PASSWORD} characters. We&apos;ll
          sign you in straight after.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        {done && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Password updated. Redirecting…</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              New password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder={`At least ${MIN_PASSWORD} characters`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={MIN_PASSWORD}
                className="h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded-md"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirm"
              className="text-sm font-semibold text-foreground"
            >
              Confirm new password
            </Label>
            <Input
              id="confirm"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter the password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={MIN_PASSWORD}
              className="h-11"
            />
          </div>

          <button
            type="submit"
            disabled={loading || done}
            className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Saving…' : done ? 'Saved' : 'Save new password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-border shadow-card p-10 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        </div>
      }
    >
      <ResetFlow />
    </Suspense>
  );
}
