import { ensureDsccRegisterCache } from '@/lib/dscc-register-lookup';
import { readLaaCrimeJson } from '@/lib/legal-directory/laa-fetch';
import { enrichBatchSize } from '../constants';
import { buildCrimeRegistry, resolveStatusWithQualification } from '../qualification';
import type { CrimeRegistry } from '../qualification';
import { resolveProspectWebsite } from './resolve-prospect-website';
import { isActiveCampaignProspect } from '../campaign-scope';
import {
  CURSOR_ENRICH,
  getCursor,
  getProspect,
  isDuplicateInitialSend,
  listProspectIdsByRecordStatus,
  saveProspect,
  setCursor,
} from '../storage';
import type { EnrichmentRunStats, FirmProspect } from '../types';
import {
  enrichCandidateScore,
  MAX_ENRICH_ATTEMPTS,
  shouldEnrichProspect,
} from './enrich-candidates';
import { crawlEmailsForProspect } from './email-crawler';
import { paidEnrichEmails } from './paid-enrichment';
import { domainFromUrl } from '../normalize';
import { websiteIndicatesCrimePractice } from '../crime-website-verify';
import { isPlausibleOutreachEmail } from './validator';

function pickDeliverableEmail(
  best: { address: string; confidence: FirmProspect['emailConfidence']; score: number } | null,
  alternatives: Array<{ address: string; confidence: FirmProspect['emailConfidence']; score: number }>,
): typeof best {
  if (best && isPlausibleOutreachEmail(best.address)) return best;
  return alternatives.find((a) => isPlausibleOutreachEmail(a.address)) ?? null;
}

async function enrichOne(prospect: FirmProspect, registry: CrimeRegistry): Promise<FirmProspect> {
  const now = new Date().toISOString();
  prospect.status = 'enriching';
  prospect.lastEnrichAttemptAt = now;
  prospect.enrichAttempts += 1;
  prospect.updatedAt = now;

  // SRA register lookup THEN Serper homepage discovery when the register has no
  // website. Without the Serper step, firms/solicitors with no SRA-listed site
  // (notably DSCC-only solicitors) never get a website to crawl → no email.
  await resolveProspectWebsite(prospect);
  if (prospect.excludedReason === 'sra_not_authorised') {
    prospect.status = 'excluded';
    prospect.updatedAt = new Date().toISOString();
    return prospect;
  }

  if (!prospect.email || !isPlausibleOutreachEmail(prospect.email)) {
    if (prospect.email && !isPlausibleOutreachEmail(prospect.email)) {
      prospect.email = undefined;
      prospect.emailConfidence = undefined;
      prospect.emailScore = undefined;
    }

    const crawled = await crawlEmailsForProspect(prospect);
    prospect.websiteUrl = crawled.websiteUrl ?? prospect.websiteUrl;
    const chosen = pickDeliverableEmail(crawled.best, crawled.alternatives);
    if (chosen) {
      prospect.email = chosen.address;
      prospect.emailConfidence = chosen.confidence;
      prospect.emailScore = chosen.score;
      prospect.alternativeEmails = crawled.alternatives.filter(
        (a) => a.address !== chosen.address && isPlausibleOutreachEmail(a.address),
      );
    } else {
      const domain = domainFromUrl(prospect.websiteUrl);
      const paid = await paidEnrichEmails({
        firmName: prospect.firmName,
        domain: domain ?? undefined,
        postcode: prospect.postcode,
      });
      const paidOk = paid.find((e) => isPlausibleOutreachEmail(e.address));
      if (paidOk) {
        prospect.email = paidOk.address;
        prospect.emailConfidence = paidOk.confidence;
        prospect.emailScore = paidOk.score;
        prospect.alternativeEmails = paid.filter(
          (e) => e.address !== paidOk.address && isPlausibleOutreachEmail(e.address),
        );
      }
    }
  }

  prospect.enrichedAt = new Date().toISOString();
  prospect.updatedAt = prospect.enrichedAt;

  if (
    !prospect.crimeWebsiteVerified &&
    prospect.websiteUrl &&
    prospect.sources.includes('archive')
  ) {
    prospect.crimeWebsiteVerified = await websiteIndicatesCrimePractice(prospect.websiteUrl);
  }

  if (prospect.email && isPlausibleOutreachEmail(prospect.email)) {
    prospect.status = resolveStatusWithQualification(
      { ...prospect, status: 'discovered' },
      'ready_to_send',
      registry,
    );
    if (
      prospect.status === 'ready_to_send' &&
      (await isDuplicateInitialSend(prospect.email, prospect.id))
    ) {
      prospect.status = 'excluded';
      prospect.excludedReason = 'duplicate_email';
    }
  } else if (prospect.enrichAttempts >= 3) {
    prospect.status = 'no_email';
  } else {
    prospect.status = 'discovered';
  }

  return prospect;
}

export async function advanceEnrichCursor(
  cursor: number,
  processedCount: number,
  needEnrichLength: number,
): Promise<number> {
  if (needEnrichLength === 0) {
    await setCursor(CURSOR_ENRICH, 0);
    return 0;
  }
  if (processedCount <= 0) {
    if (cursor >= needEnrichLength) {
      await setCursor(CURSOR_ENRICH, 0);
      return 0;
    }
    return cursor;
  }
  const next = cursor + processedCount;
  const wrapped = next >= needEnrichLength ? 0 : next;
  await setCursor(CURSOR_ENRICH, wrapped);
  return wrapped;
}

async function loadEnrichRegistry(): Promise<CrimeRegistry> {
  const laa = readLaaCrimeJson();
  const dscc = await ensureDsccRegisterCache();
  return buildCrimeRegistry(laa, dscc?.entries ?? []);
}

export async function runFirmEnrichment(opts?: {
  limit?: number;
  maxElapsedMs?: number;
}): Promise<EnrichmentRunStats> {
  const started = Date.now();
  const limit = opts?.limit ?? enrichBatchSize();
  const registry = await loadEnrichRegistry();

  const discoveredIds = await listProspectIdsByRecordStatus('discovered');
  const noEmailIds = await listProspectIdsByRecordStatus('no_email');
  const pool = [...discoveredIds, ...noEmailIds];

  let cursor = await getCursor(CURSOR_ENRICH);
  if (cursor >= pool.length && pool.length > 0) {
    cursor = 0;
    await setCursor(CURSOR_ENRICH, 0);
  }

  // Score a sliding window — avoid loading thousands of prospects every cron tick.
  const scanWindow = Math.min(Math.max(limit * 4, 40), 120);
  const windowIds = pool.slice(cursor, cursor + scanWindow);
  const candidates: { id: string; score: number }[] = [];
  let stoppedEarly = false;
  let scannedInWindow = 0;

  for (const id of windowIds) {
    if (opts?.maxElapsedMs != null && Date.now() - started >= opts.maxElapsedMs) {
      stoppedEarly = true;
      break;
    }
    scannedInWindow++;
    const p = await getProspect(id);
    if (!p || !shouldEnrichProspect(p)) continue;
    candidates.push({ id, score: enrichCandidateScore(p) });
  }

  candidates.sort((a, b) => b.score - a.score);
  const batch = candidates.slice(0, limit).map((c) => c.id);

  let emailsFound = 0;
  let readyToSend = 0;
  let persistedReady = 0;
  let noEmail = 0;
  let errors = 0;
  let processedCount = 0;

  for (const id of batch) {
    if (opts?.maxElapsedMs != null && Date.now() - started >= opts.maxElapsedMs) {
      stoppedEarly = true;
      break;
    }

    try {
      const p = await getProspect(id);
      if (!p || !shouldEnrichProspect(p)) continue;
      const prevStatus = p.status;
      const enriched = await enrichOne(p, registry);
      await saveProspect(enriched, prevStatus);
      const saved = await getProspect(id);
      processedCount++;
      if (enriched.email) emailsFound++;
      if (enriched.status === 'ready_to_send') readyToSend++;
      if (saved?.status === 'ready_to_send' && isActiveCampaignProspect(saved)) persistedReady++;
      if (enriched.status === 'no_email') noEmail++;
    } catch (err) {
      errors++;
      console.warn('[firm-outreach enrich]', id, err);
    }
  }

  if (scannedInWindow > 0) {
    await advanceEnrichCursor(cursor, scannedInWindow, pool.length);
  }

  return {
    processed: processedCount,
    emailsFound,
    readyToSend,
    persistedReady,
    noEmail,
    errors,
    elapsedMs: Date.now() - started,
    stoppedEarly: stoppedEarly || undefined,
  };
}

export { shouldEnrichProspect, enrichCandidateScore, MAX_ENRICH_ATTEMPTS } from './enrich-candidates';
