import { cleanEnvValue } from '@/lib/env';

function readFreeAccessConfig() {
  return {
    until: cleanEnvValue(process.env.FREE_ACCESS_UNTIL),
    enabled: cleanEnvValue(process.env.FREE_ACCESS_ENABLED) === 'true',
  };
}

/** ISO date at end of free period, e.g. 2026-07-01 (exclusive: free through 30 June) */
export function isFreeAccessPeriodActive(): boolean {
  const { enabled, until } = readFreeAccessConfig();
  if (!enabled) return false;
  if (!until) return true;
  const end = new Date(until);
  if (Number.isNaN(end.getTime())) return false;
  return new Date() < end;
}

export function freeAccessEndsLabel(): string | null {
  const { until } = readFreeAccessConfig();
  if (!until) return null;
  const end = new Date(until);
  if (Number.isNaN(end.getTime())) return null;
  return end.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Use wherever paid subscription is required. */
export function hasTrainingAccess(opts: {
  subscriptionActive?: boolean;
  isAdmin?: boolean;
}): boolean {
  if (opts.isAdmin) return true;
  if (isFreeAccessPeriodActive()) return true;
  return Boolean(opts.subscriptionActive);
}
