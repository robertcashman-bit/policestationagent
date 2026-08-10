'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SESSION_KEY = 'psr_session_id';
const PRESENCE_INTERVAL_MS = 30_000;

async function ensureSessionId(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  try {
    const res = await fetch('/api/auth/login-track', { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (data.sessionId) {
      sessionStorage.setItem(SESSION_KEY, data.sessionId);
      return data.sessionId as string;
    }
  } catch {
    /* non-fatal */
  }
  return null;
}

async function sendPresence(sessionId: string, path: string) {
  try {
    await fetch('/api/auth/presence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, path }),
    });
  } catch {
    /* non-fatal */
  }
}

/** Starts login session tracking and periodic presence pings for admin live view. */
export function SessionTracker() {
  const pathname = usePathname() ?? '/dashboard';
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    void (async () => {
      const id = await ensureSessionId();
      if (cancelled || !id) return;
      sessionIdRef.current = id;
      await sendPresence(id, pathname);

      interval = setInterval(() => {
        if (sessionIdRef.current) {
          void sendPresence(sessionIdRef.current, pathname);
        }
      }, PRESENCE_INTERVAL_MS);
    })();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [pathname]);

  useEffect(() => {
    if (sessionIdRef.current) {
      void sendPresence(sessionIdRef.current, pathname);
    }
  }, [pathname]);

  return null;
}

export function clearTrackedSession() {
  if (typeof window === 'undefined') return;
  const sessionId = sessionStorage.getItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  if (sessionId) {
    void fetch('/api/auth/logout-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
  }
}
