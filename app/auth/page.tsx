'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Mail,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  COOLDOWN_SECONDS,
  clearCooldown,
  getRemainingCooldown,
  startCooldown,
} from '@/lib/auth/cooldown';
import { getErrorMessage } from '@/lib/utils/error-handler';
import { safeInternalNextPath } from '@/lib/auth/safe-next-path';
import { PSRUK_REGISTER_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';

type Mode = 'signin' | 'signup' | 'forgot' | 'code';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 10;
const inFlightRequest = { current: false };

/** Cleared on every successful auth so InactivityTimeout cannot fire immediately after login. */
const LAST_ACTIVITY_KEY = 'psr_last_activity';

function navigateAfterAuth(next: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    } catch {
      /* ignore */
    }
  }
  const dest = next.startsWith('/') ? next : `/${next}`;
  // Full navigation so the next document request always carries Supabase cookies;
  // client-side router.push alone can race the server layout / middleware.
  window.location.assign(dest);
}

function formatRemaining(seconds: number): string {
  if (seconds <= 60) return `${seconds}s`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

function AuthFlow() {
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const next = safeInternalNextPath(searchParams.get('next'));
  const initialError = searchParams.get('error');
  const initialDetail = searchParams.get('detail');
  const initialMode = (searchParams.get('mode') as Mode) ?? 'signin';
  const timeoutParam = searchParams.get('timeout');
  const wasIdleSignedOut = timeoutParam === '1' || timeoutParam === 'true';

  const [mode, setMode] = useState<Mode>(
    ['signin', 'signup', 'forgot', 'code'].includes(initialMode)
      ? initialMode
      : 'signin',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [info, setInfo] = useState<string>(() =>
    wasIdleSignedOut
      ? 'You were signed out due to inactivity. Sign back in to continue.'
      : '',
  );
  const [error, setError] = useState<string>(() => {
    switch (initialError) {
      case 'auth_callback_error':
        return `That login link did not work${initialDetail ? ` (${initialDetail})` : ''}. Sign in with your password below, or request a new code.`;
      case 'expired':
        return 'That login link has expired. Sign in below, or request a new code.';
      case 'missing_token':
        return 'No sign-in token in that link. Sign in below.';
      case 'not_configured':
        return 'Sign-in is temporarily unavailable. Please try again in a minute.';
      default:
        return '';
    }
  });
  const [remaining, setRemaining] = useState(0);
  const codeInputRef = useRef<HTMLInputElement | null>(null);

  // Tick countdown every second whenever we're on the code step.
  useEffect(() => {
    if (mode !== 'code') return;
    const id = setInterval(() => {
      setRemaining(getRemainingCooldown(email));
    }, 1000);
    setRemaining(getRemainingCooldown(email));
    return () => clearInterval(id);
  }, [mode, email]);

  useEffect(() => {
    if (mode === 'code') {
      codeInputRef.current?.focus();
    }
  }, [mode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
    setInfo('');
  };

  // ──────────────────────────────────────────────────────────────────
  // Password sign-in (no email is sent, so the rate limit can't fire).
  // ──────────────────────────────────────────────────────────────────
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Enter your password.');
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');
    try {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: trimmed,
        password,
      });
      if (signInErr) {
        setError(getErrorMessage(signInErr));
        return;
      }
      navigateAfterAuth(next);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // Create account (no email is sent if Supabase autoconfirm is on).
  // ──────────────────────────────────────────────────────────────────
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');
    try {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: trimmed,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (signUpErr) {
        setError(getErrorMessage(signUpErr));
        return;
      }

      // If email confirmation is OFF, signUp returns a session and we're in.
      if (data.session) {
        navigateAfterAuth(next);
        return;
      }

      // If email confirmation is ON, signUp returns no session and Supabase
      // sent a confirm email. Show "check your inbox" state so the user
      // doesn't think nothing happened.
      setInfo(
        `We sent a confirmation email to ${trimmed}. Click the link to finish creating your account, then return here to sign in.`,
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // Forgot password — sends an email (uses Supabase's sender, so this
  // path can be rate-limited; rare in normal use).
  // ──────────────────────────────────────────────────────────────────
  const handleForgot = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');
    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
        trimmed,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/auth/reset')}`,
        },
      );
      if (resetErr) {
        setError(getErrorMessage(resetErr));
        return;
      }
      setInfo(
        `If an account exists for ${trimmed}, we just sent a password-reset link. Check your inbox.`,
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // Magic-link / OTP fallback — kept for users who don't want a
  // password. Goes through our /api/auth/request-code rate-limit guard.
  // ──────────────────────────────────────────────────────────────────
  const requestCode = useCallback(
    async (targetEmail: string) => {
      const trimmed = targetEmail.trim().toLowerCase();
      if (!EMAIL_RE.test(trimmed)) {
        setError('Enter a valid email address.');
        return false;
      }
      if (inFlightRequest.current) return false;

      const localRemaining = getRemainingCooldown(trimmed);
      if (localRemaining > 0) {
        setRemaining(localRemaining);
        setError(
          `Please wait ${formatRemaining(localRemaining)} before requesting another code.`,
        );
        return false;
      }

      inFlightRequest.current = true;
      setLoading(true);
      setError('');
      setInfo('');

      try {
        const res = await fetch('/api/auth/request-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, next }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          retryAfter?: number;
          ok?: boolean;
        };

        if (!res.ok) {
          if (res.status === 429 && data.retryAfter) {
            startCooldown(trimmed, data.retryAfter);
            setRemaining(data.retryAfter);
          }
          setError(data.error || 'We could not send the code. Please try again.');
          return false;
        }

        startCooldown(trimmed, data.retryAfter ?? COOLDOWN_SECONDS);
        setRemaining(data.retryAfter ?? COOLDOWN_SECONDS);
        setEmail(trimmed);
        setMode('code');
        return true;
      } catch (err) {
        setError(getErrorMessage(err));
        return false;
      } finally {
        setLoading(false);
        inFlightRequest.current = false;
      }
    },
    [next],
  );

  const handleResend = async () => {
    if (remaining > 0) return;
    await requestCode(email);
  };

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (verifying) return;
    const token = code.replace(/\D/g, '');
    if (token.length !== 6) {
      setError('Enter the 6-digit code from your email.');
      return;
    }

    setVerifying(true);
    setError('');
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      if (verifyError) {
        setError(getErrorMessage(verifyError));
        return;
      }
      clearCooldown(email);
      navigateAfterAuth(next);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setVerifying(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────

  if (mode === 'code') {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-elevated ring-1 ring-black/[0.03] p-8 sm:p-10">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </button>

          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
            <Mail className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
            Check your email
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We sent a 6-digit code and a one-click sign-in link to{' '}
            <strong className="text-foreground font-semibold">{email}</strong>.
            Enter the code below, or just click the link from your email on any
            device.
          </p>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="otp" className="text-sm font-semibold text-foreground">
                6-digit code
              </Label>
              <Input
                ref={codeInputRef}
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(digits);
                }}
                className="h-12 text-center text-lg tracking-[0.5em] font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={verifying || code.length !== 6}
              className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {verifying ? 'Verifying…' : 'Verify and sign in'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border space-y-3">
            <button
              type="button"
              onClick={handleResend}
              disabled={remaining > 0 || loading}
              className="w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {remaining > 0
                ? `Resend code in ${formatRemaining(remaining)}`
                : loading
                  ? 'Sending…'
                  : 'Resend code'}
            </button>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Tip: the email also contains a button labelled <em>“Sign in”</em>.
              Clicking it works on the same device or any other browser — no
              code needed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'forgot') {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-elevated ring-1 ring-black/[0.03] p-8 sm:p-10">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </button>

          <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
            Reset your password
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Enter your email and we&apos;ll send a link to set a new password.
          </p>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {info && (
            <div
              role="status"
              aria-live="polite"
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5"
            >
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{info}</span>
            </div>
          )}

          <form onSubmit={handleForgot} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // signin or signup
  const isSignUp = mode === 'signup';

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-border shadow-elevated ring-1 ring-black/[0.03] p-8 sm:p-10">
        {/* Tab toggle */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors ${
              !isSignUp
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 h-9 rounded-lg text-sm font-semibold transition-colors ${
              isSignUp
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Create account
          </button>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {isSignUp
            ? `Pick a strong password (at least ${MIN_PASSWORD} characters).`
            : 'Enter your email and password to continue.'}
        </p>

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        {info && (
          <div
            role="status"
            aria-live="polite"
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl mb-5 flex items-start gap-2.5"
          >
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{info}</span>
          </div>
        )}

        <form
          onSubmit={isSignUp ? handleSignUp : handleSignIn}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-foreground"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </Label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                placeholder={isSignUp ? `At least ${MIN_PASSWORD} characters` : 'Your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isSignUp ? MIN_PASSWORD : undefined}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {isSignUp ? 'Creating account…' : 'Signing in…'}
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                {isSignUp ? 'Create account' : 'Sign in'}
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-border">
          <details className="group">
            <summary className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer list-none flex items-center justify-center gap-1.5">
              <span>No password? Use a sign-in code instead</span>
              <span className="text-muted-foreground/60 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => requestCode(email)}
                disabled={loading}
                className="text-sm font-medium text-primary hover:underline transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Email me a 6-digit code'}
              </button>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                Slower than signing in with a password — we&apos;ll email you
                a fresh code each time.
              </p>
            </div>
          </details>
        </div>

        <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
          <strong className="text-foreground">Partner:</strong> Accredited reps can{' '}
          <a
            href={PSRUK_REGISTER_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            register free on PoliceStationRepUK
          </a>{' '}
          while building their practice.{' '}
          <a
            href={CUSTODYNOTE_TRIAL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Custody Note
          </a>{' '}
          offers structured attendance notes — 30-day free trial.
        </p>

        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          By continuing you agree to our{' '}
          <Link href="/legal/terms" className="underline hover:text-foreground">
            terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="underline hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-border shadow-card p-10 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading sign-in…</p>
          </div>
        </div>
      }
    >
      <AuthFlow />
    </Suspense>
  );
}
