'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { clearTrackedSession } from '@/components/auth/SessionTracker';
import { isSupabaseConfigured } from '@/lib/supabase/config';

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const WARNING_LEAD_MS = 2 * 60 * 1000; // show warning 2 minutes before logout
const ACTIVITY_KEY = 'psr_last_activity';

/**
 * Idle-logout for authenticated routes.
 *
 * IMPORTANT — do NOT log the user out on mount based purely on a stale
 * `psr_last_activity` value left in localStorage from a previous tab/session.
 * A valid Supabase cookie can outlive that localStorage timestamp by days,
 * and the `(main)` layout has already verified the server-side session
 * before this component renders. Doing so caused login loops:
 *   /auth/callback (magic link) → /dashboard → mount → instant signOut()
 *   → /login?timeout=true → /auth → user logs in again → loop.
 *
 * Instead, treat every mount as fresh activity and start the in-tab timers
 * from there. Real inactivity within the open tab still triggers logout.
 */
export function InactivityTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    Math.floor(WARNING_LEAD_MS / 1000),
  );
  const supabaseRef = useRef(createClient());
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    warningTimerRef.current = null;
    logoutTimerRef.current = null;
    countdownRef.current = null;
  }, []);

  const performLogout = useCallback(async () => {
    clearAllTimers();
    setShowWarning(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(ACTIVITY_KEY);
      } catch {
        /* ignore */
      }
    }
    if (isSupabaseConfigured()) {
      clearTrackedSession();
      try {
        await supabaseRef.current.auth.signOut();
      } catch (error) {
        console.warn('Inactivity sign-out failed:', error);
      }
    }
    if (typeof window !== 'undefined') {
      // Full navigation so cookies cleared by signOut() are reflected on
      // the next request and middleware sees an unauthenticated user.
      window.location.assign('/auth?timeout=1');
    }
  }, [clearAllTimers]);

  const startCountdown = useCallback(() => {
    setSecondsLeft(Math.floor(WARNING_LEAD_MS / 1000));
    setShowWarning(true);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
  }, []);

  const scheduleTimers = useCallback(() => {
    clearAllTimers();
    warningTimerRef.current = setTimeout(() => {
      startCountdown();
      logoutTimerRef.current = setTimeout(() => {
        void performLogout();
      }, WARNING_LEAD_MS);
    }, INACTIVITY_TIMEOUT_MS - WARNING_LEAD_MS);
  }, [clearAllTimers, performLogout, startCountdown]);

  const recordActivity = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
      } catch {
        /* ignore quota / private mode */
      }
    }
    setShowWarning(false);
    scheduleTimers();
  }, [scheduleTimers]);

  const stayLoggedIn = useCallback(() => {
    recordActivity();
  }, [recordActivity]);

  useEffect(() => {
    // Treat mount as fresh activity; never auto-logout from a stale
    // localStorage value (see comment at top of file).
    recordActivity();

    const events = [
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click',
    ] as const;

    let throttle: ReturnType<typeof setTimeout> | null = null;
    const onUserActivity = () => {
      if (throttle) return;
      throttle = setTimeout(() => {
        throttle = null;
      }, 1000);
      recordActivity();
    };

    events.forEach((e) =>
      document.addEventListener(e, onUserActivity, { passive: true }),
    );
    window.addEventListener('focus', onUserActivity);

    // If another tab records recent activity, reset our timer too.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ACTIVITY_KEY || !e.newValue) return;
      const ts = parseInt(e.newValue, 10);
      if (!Number.isFinite(ts)) return;
      if (Date.now() - ts < 5000) {
        setShowWarning(false);
        scheduleTimers();
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearAllTimers();
      if (throttle) clearTimeout(throttle);
      events.forEach((e) =>
        document.removeEventListener(e, onUserActivity, true),
      );
      window.removeEventListener('focus', onUserActivity);
      window.removeEventListener('storage', onStorage);
    };
    // recordActivity / scheduleTimers / clearAllTimers are stable
    // (empty-dep useCallbacks); listing them keeps eslint happy without
    // causing the effect to re-run.
  }, [recordActivity, scheduleTimers, clearAllTimers]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Still there?</h2>
          <p className="text-muted-foreground mb-6">
            You&apos;ll be logged out in{' '}
            <span className="font-bold text-amber-600 dark:text-amber-400 text-xl">
              {secondsLeft}
            </span>{' '}
            seconds due to inactivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={stayLoggedIn}
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Stay Logged In
            </button>
            <button
              onClick={() => {
                void performLogout();
              }}
              className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground font-semibold rounded-xl transition-all"
            >
              Logout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
