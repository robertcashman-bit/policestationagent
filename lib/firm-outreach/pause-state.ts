import { getKV } from '@/lib/kv';
import { outreachEnabled } from './constants';
import {
  PSA_OUTREACH_EMAILS_DISABLED_REASON,
  arePsaOutreachEmailsDisabled,
} from './outreach-emails-disabled';

const ADMIN_PAUSE_KEY = 'firmoutreach:settings:admin_paused';

export async function getAdminPauseState(): Promise<boolean | null> {
  const kv = getKV();
  if (!kv || typeof kv.get !== 'function') return null;
  const value = await kv.get<boolean>(ADMIN_PAUSE_KEY);
  return value ?? null;
}

export async function setAdminPauseState(paused: boolean): Promise<void> {
  const kv = getKV();
  if (!kv || typeof kv.set !== 'function') throw new Error('KV not configured');
  if (!paused && arePsaOutreachEmailsDisabled()) {
    throw new Error(PSA_OUTREACH_EMAILS_DISABLED_REASON);
  }
  await kv.set(ADMIN_PAUSE_KEY, paused);
}

/** Permanent kill-switch, env pause, OR admin KV pause. */
export async function isOutreachPaused(): Promise<boolean> {
  if (arePsaOutreachEmailsDisabled()) return true;
  if (process.env.FIRM_OUTREACH_PAUSED === 'true') return true;
  const adminPaused = await getAdminPauseState();
  return adminPaused === true;
}

/** Whether automated/cron (or gated) sends may run. */
export async function isOutreachSendAllowed(): Promise<boolean> {
  if (arePsaOutreachEmailsDisabled()) return false;
  if (!outreachEnabled()) return false;
  if (process.env.FIRM_OUTREACH_SEND_ENABLED === 'false') return false;
  return !(await isOutreachPaused());
}

export async function getOutreachPauseSummary(): Promise<{
  envPaused: boolean;
  adminPaused: boolean | null;
  effectivePaused: boolean;
  permanentlyDisabled: boolean;
  permanentlyDisabledReason: string | null;
}> {
  const permanentlyDisabled = arePsaOutreachEmailsDisabled();
  const envPaused = process.env.FIRM_OUTREACH_PAUSED === 'true';
  const adminPaused = await getAdminPauseState();
  return {
    envPaused,
    adminPaused,
    effectivePaused: permanentlyDisabled || envPaused || adminPaused === true,
    permanentlyDisabled,
    permanentlyDisabledReason: permanentlyDisabled
      ? PSA_OUTREACH_EMAILS_DISABLED_REASON
      : null,
  };
}
