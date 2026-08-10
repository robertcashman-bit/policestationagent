/**
 * Client-side per-email cooldown for OTP / magic link requests.
 * Persists across reloads via localStorage so spam-clicks across
 * refreshes still respect the limit. Server enforces the same
 * window via httpOnly cookie in /api/auth/request-code.
 */

const STORAGE_KEY = 'psr_auth_cooldowns_v1';
export const COOLDOWN_SECONDS = 60;

type Store = Record<string, number>; // email → epoch-ms when cooldown ends

function readStore(): Store {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object') return parsed as Store;
    return {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

function key(email: string): string {
  return email.trim().toLowerCase();
}

export function getRemainingCooldown(email: string): number {
  if (!email) return 0;
  const store = readStore();
  const until = store[key(email)] ?? 0;
  const remaining = Math.ceil((until - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
}

export function startCooldown(email: string, seconds: number = COOLDOWN_SECONDS) {
  if (!email) return;
  const store = readStore();
  store[key(email)] = Date.now() + seconds * 1000;
  writeStore(store);
}

export function clearCooldown(email: string) {
  if (!email) return;
  const store = readStore();
  delete store[key(email)];
  writeStore(store);
}
