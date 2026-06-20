import { getKV } from '@/lib/kv';
import { isActiveCampaignSend } from '../campaign-scope';
import { loadBrochureAttachment } from '../brochure/load-attachment';
import {
  getProspect,
  isSuppressed,
  listAllSends,
} from '../storage';
import type { FirmOutreachSend, OutreachRunStats } from '../types';
import { sendKentCorrectionEmail } from './send-kent-correction';
import { isLegacyNationwideInitialSubject } from './templates';

const KENT_CORRECTION_SENT_PREFIX = 'firmoutreach:kent_correction:';

export async function wasKentCorrectionSent(prospectId: string): Promise<boolean> {
  const kv = getKV();
  if (!kv) return false;
  const sent = await kv.get<string>(KENT_CORRECTION_SENT_PREFIX + prospectId);
  return Boolean(sent);
}

async function markKentCorrectionSent(prospectId: string): Promise<void> {
  const kv = getKV();
  if (!kv) return;
  await kv.set(KENT_CORRECTION_SENT_PREFIX + prospectId, new Date().toISOString());
}

function isEligibleLegacyInitialSend(send: FirmOutreachSend): boolean {
  if (send.sequenceStep !== 0) return false;
  if (send.status === 'bounced' || send.status === 'queued') return false;
  if (!send.sentAt) return false;
  if (!isActiveCampaignSend(send)) return false;
  return isLegacyNationwideInitialSubject(send.subject);
}

/** One correction per prospect — newest qualifying initial send wins. */
export async function listProspectsNeedingKentCorrection(): Promise<
  Array<{ prospectId: string; email: string; firmName: string; originalSubject: string }>
> {
  const sends = await listAllSends();
  const byProspect = new Map<
    string,
    { prospectId: string; email: string; firmName: string; originalSubject: string; sentAt: string }
  >();

  for (const send of sends) {
    if (!isEligibleLegacyInitialSend(send)) continue;
    const existing = byProspect.get(send.prospectId);
    const sentAt = send.sentAt ?? send.createdAt;
    if (!existing || sentAt.localeCompare(existing.sentAt) > 0) {
      byProspect.set(send.prospectId, {
        prospectId: send.prospectId,
        email: send.email,
        firmName: send.firmName,
        originalSubject: send.subject,
        sentAt,
      });
    }
  }

  const out: Array<{ prospectId: string; email: string; firmName: string; originalSubject: string }> =
    [];
  for (const row of byProspect.values()) {
    if (await wasKentCorrectionSent(row.prospectId)) continue;
    out.push({
      prospectId: row.prospectId,
      email: row.email,
      firmName: row.firmName,
      originalSubject: row.originalSubject,
    });
  }

  return out.sort((a, b) => a.firmName.localeCompare(b.firmName));
}

export async function runKentCorrectionEmails(opts?: {
  dryRun?: boolean;
  limit?: number;
}): Promise<
  OutreachRunStats & {
    candidates: number;
    corrected: number;
    samples: Array<{ firmName: string; email: string }>;
  }
> {
  const started = Date.now();
  const stats = {
    queued: 0,
    sent: 0,
    skipped: 0,
    suppressed: 0,
    errors: 0,
    elapsedMs: 0,
    candidates: 0,
    corrected: 0,
    samples: [] as Array<{ firmName: string; email: string }>,
  };

  const candidates = await listProspectsNeedingKentCorrection();
  stats.candidates = candidates.length;
  const limit = opts?.limit ?? candidates.length;

  for (const row of candidates) {
    if (stats.sent >= limit) break;

    const prospect = await getProspect(row.prospectId);
    if (!prospect?.email?.trim()) {
      stats.skipped++;
      continue;
    }
    if (prospect.status === 'unsubscribed' || prospect.status === 'joined_whatsapp') {
      stats.skipped++;
      continue;
    }
    if (await isSuppressed(prospect.email)) {
      stats.suppressed++;
      continue;
    }

    stats.queued++;
    const result = await sendKentCorrectionEmail({ prospect, dryRun: opts?.dryRun });
    if (!result.ok) {
      stats.errors++;
      continue;
    }

    if (!opts?.dryRun && process.env.FIRM_OUTREACH_DRY_RUN !== 'true') {
      await markKentCorrectionSent(row.prospectId);
    }
    stats.sent++;
    stats.corrected++;
    if (stats.samples.length < 10) {
      stats.samples.push({ firmName: row.firmName, email: row.email });
    }
  }

  stats.elapsedMs = Date.now() - started;
  return stats;
}

/** True when brochure PDF is present for attachment on step-0 and correction sends. */
export function kentBrochureAttachmentReady(): boolean {
  return loadBrochureAttachment() !== null;
}
