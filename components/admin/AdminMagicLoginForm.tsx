'use client';

import { useState } from 'react';

const DEFAULT_ADMIN_EMAIL = 'robertdavidcashman@gmail.com';

type Stage = 'email' | 'otp' | 'checking';

export function AdminMagicLoginForm() {
  const [stage, setStage] = useState<Stage>('email');
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setStage('otp');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const code = otp.trim();
    if (!code || code.length < 6) {
      setError('Please enter the 6-digit code from your email.');
      return;
    }
    setBusy(true);
    setStage('checking');
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Verification failed. Please try again.');
        setStage('otp');
      } else {
        window.location.href = '/admin';
      }
    } catch {
      setError('Verification failed. Please try again.');
      setStage('otp');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Admin</p>
        <h1 className="mt-1 text-2xl font-bold text-[#0A2342]">Sign in to admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your admin email and we&rsquo;ll send a one-time login code.
        </p>

        {stage === 'email' && (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">
                Admin email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/20"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[#0A2342] py-3 text-sm font-semibold text-white hover:bg-[#08192e] disabled:opacity-60"
            >
              {busy ? 'Sending…' : 'Send login code'}
            </button>
          </form>
        )}

        {stage === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm font-medium text-emerald-800">Check your email for a login code.</p>
              <p className="mt-1 text-xs text-emerald-700">
                We sent a 6-digit code to <strong>{email.trim()}</strong>.
              </p>
            </div>
            <div>
              <label htmlFor="admin-otp" className="block text-sm font-medium text-gray-700">
                Login code
              </label>
              <input
                id="admin-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-center font-mono text-lg tracking-[0.3em] outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/20"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[#0A2342] py-3 text-sm font-semibold text-white hover:bg-[#08192e] disabled:opacity-60"
            >
              {busy ? 'Verifying…' : 'Verify code'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStage('email');
                setOtp('');
                setError('');
              }}
              className="w-full text-center text-sm font-medium text-[#0A2342] hover:underline"
            >
              Use a different email
            </button>
          </form>
        )}

        {stage === 'checking' && (
          <div className="mt-6 flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing you in…
          </div>
        )}
      </div>
    </div>
  );
}
