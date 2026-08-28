import { Resend } from 'resend';
import { getKV } from '@/lib/kv';
import {
  listOutreachSentToday,
  type OutreachDomainSource,
  type OutreachSentRecord,
} from './count-today';
import { getCampaignQueueCounts } from './queue-health';
import {
  PSA_OUTREACH_EMAILS_DISABLED_REASON,
  arePsaOutreachOperatorMailDisabled,
} from './outreach-emails-disabled';
import { outreachNotifyEmail } from './outreach/notify-recipient';
import { FIRM_OUTREACH_CAMPAIGN_ID as PSA_CAMPAIGN_ID } from './site-config';

const REPUK_CAMPAIGN_ID = 'whatsapp_invite_v1';

export type CrossDigestPhase = 'morning' | 'evening';

const DEDUP_PREFIX = 'firmoutreach:cross-digest:sent:';

/** Operator digest always uses RepUK branding (never PSA From-name on RepUK domain). */
const DIGEST_FROM_EMAIL =
  process.env.FIRM_OUTREACH_DIGEST_FROM_EMAIL?.trim() ||
  process.env.FIRM_OUTREACH_REPUK_FROM_EMAIL?.trim() ||
  'PoliceStationRepUK <noreply@policestationrepuk.org>';

export const CROSS_DIGEST_WORKSPACES = [
  {
    domain: 'policestationrepuk.org',
    campaignId: REPUK_CAMPAIGN_ID,
    fromEmail: 'PoliceStationRepUK <noreply@policestationrepuk.org>',
    label: 'PoliceStationRepUK',
    liveSend: true as const,
  },
  {
    domain: 'policestationagent.com',
    campaignId: PSA_CAMPAIGN_ID,
    fromEmail: 'Police Station Agent <noreply@policestationagent.com>',
    label: 'Police Station Agent',
    /** PSA Kent-cover firm email is permanently off — not a live send workspace. */
    liveSend: false as const,
  },
] as const;

export interface WorkspaceDigestRow {
  domain: string;
  campaignId: string;
  fromEmail: string;
  label: string;
  liveSend: boolean;
  sentToday: number;
  dailyCap: number;
  remaining: number;
  readyToSend: number;
  sends: OutreachSentRecord[];
}

export interface CrossWorkspaceDigestData {
  date: string;
  phase: CrossDigestPhase;
  phaseLabel: string;
  combined: number;
  workspaces: WorkspaceDigestRow[];
}

export interface CrossWorkspaceDigestResult {
  sent: boolean;
  reason?: string;
  date: string;
  phase: CrossDigestPhase;
  combined: number;
}

export function crossDigestPhaseLabel(phase: CrossDigestPhase): string {
  return phase === 'morning' ? 'Morning status' : 'End of day final';
}

export function crossDigestDedupKey(date: string, phase: CrossDigestPhase): string {
  return `${DEDUP_PREFIX}${date}:${phase}`;
}

export async function wasCrossDigestSent(
  date: string,
  phase: CrossDigestPhase,
): Promise<boolean> {
  const kv = getKV();
  if (!kv) return false;
  return Boolean(await kv.get(crossDigestDedupKey(date, phase)));
}

export async function markCrossDigestSent(date: string, phase: CrossDigestPhase): Promise<void> {
  const kv = getKV();
  if (!kv) return;
  await kv.set(crossDigestDedupKey(date, phase), new Date().toISOString(), {
    ex: 60 * 60 * 24 * 14,
  });
}

function kvCredsFromEnv(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() || process.env.KV_REST_API_URL?.trim() || '';
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || process.env.KV_REST_API_TOKEN?.trim() || '';
  if (!url || !token) return null;
  return { url, token };
}

function touchLabel(step: number): string {
  if (step === 0) return 'Initial invite';
  if (step === 1) return 'Follow-up';
  return `Touch ${step + 1}`;
}

function escapeHtml(value: string | undefined): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSendsTable(rows: OutreachSentRecord[]): string {
  if (rows.length === 0) {
    return '<p>No outreach emails sent yet today for this workspace.</p>';
  }

  const body = rows
    .map(
      (r) =>
        `<tr>
          <td>${escapeHtml(r.sentAt.slice(11, 19))}</td>
          <td>${escapeHtml(r.firmName)}</td>
          <td>${escapeHtml(r.email)}</td>
          <td>${escapeHtml(touchLabel(r.sequenceStep))}</td>
          <td>${escapeHtml(r.subject)}</td>
        </tr>`,
    )
    .join('');

  return `
    <table border="1" cellpadding="6" style="border-collapse:collapse;font-size:13px;width:100%;margin-bottom:20px">
      <thead>
        <tr style="background:#f1f5f9">
          <th>Time (UTC)</th>
          <th>Firm</th>
          <th>Email</th>
          <th>Touch</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

export function buildCrossWorkspaceDigestSubject(data: CrossWorkspaceDigestData): string {
  const phaseShort = data.phase === 'morning' ? 'Morning' : 'End of day';
  const live = data.workspaces.filter((w) => w.liveSend);
  if (data.combined > 0) {
    return `[Outreach digest] ${phaseShort} — PoliceStationRepUK ${data.combined} sent — ${data.date}`;
  }
  if (live[0] && live[0].readyToSend > 0) {
    return `[Outreach digest] ${phaseShort} — PoliceStationRepUK ${live[0].readyToSend} ready — ${data.date}`;
  }
  return `[Outreach digest] ${phaseShort} — PoliceStationRepUK — ${data.date}`;
}

function formatCap(cap: number): string {
  return !Number.isFinite(cap) || cap >= 10_000 ? 'unlimited' : String(cap);
}

export function buildCrossWorkspaceDigestHtml(data: CrossWorkspaceDigestData): string {
  const live = data.workspaces.filter((w) => w.liveSend);
  const disabled = data.workspaces.filter((w) => !w.liveSend);

  const summaryRows = live
    .map(
      (w) =>
        `<tr>
          <td>${escapeHtml(w.label)}</td>
          <td>${escapeHtml(w.domain)}</td>
          <td>${escapeHtml(w.fromEmail)}</td>
          <td>${w.sentToday}</td>
          <td>${escapeHtml(formatCap(w.dailyCap))}</td>
          <td>${escapeHtml(formatCap(w.remaining))}</td>
          <td>${w.readyToSend}</td>
        </tr>`,
    )
    .join('');

  const workspaceSections = live
    .map(
      (w) => `
      <h3>${escapeHtml(w.label)} (${escapeHtml(w.domain)}) — ${w.sentToday} sent today</h3>
      <p style="margin:0 0 8px;color:#64748b">From: ${escapeHtml(w.fromEmail)}</p>
      ${renderSendsTable(w.sends)}
    `,
    )
    .join('');

  const capsNote = live.map((w) => `${w.label}: ${formatCap(w.dailyCap)}`).join(' · ');

  const disabledNote = disabled
    .map(
      (w) =>
        `<p style="margin:0 0 8px;color:#64748b;font-size:13px;">
          <strong>${escapeHtml(w.label)}</strong> email send is permanently disabled
          (not a live send workspace — no cap / ready queue reported).
        </p>`,
    )
    .join('');

  return `
    <div style="font-family:system-ui,sans-serif;color:#0f172a;max-width:800px">
      <h2 style="margin:0 0 8px">PoliceStationRepUK firm outreach digest</h2>
      <p style="margin:0 0 16px;line-height:1.5">
        <strong>${escapeHtml(data.phaseLabel)}</strong> · ${escapeHtml(data.date)} (UTC)
      </p>
      <ul style="margin:0 0 20px;padding-left:20px;line-height:1.6">
        <li><strong>RepUK sent today:</strong> ${data.combined}</li>
        <li><strong>Daily cap:</strong> ${escapeHtml(capsNote || 'unlimited')}</li>
      </ul>
      ${disabledNote}
      <h3 style="margin:0 0 8px">Live send workspace</h3>
      <table border="1" cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%;margin-bottom:24px">
        <thead>
          <tr style="background:#f1f5f9">
            <th>Workspace</th>
            <th>Domain</th>
            <th>From</th>
            <th>Sent today</th>
            <th>Cap</th>
            <th>Remaining</th>
            <th>Ready queue</th>
          </tr>
        </thead>
        <tbody>${summaryRows}</tbody>
      </table>
      <h3 style="margin:0 0 12px">Recipients today</h3>
      ${workspaceSections}
      <p style="margin-top:16px;font-size:12px;color:#64748b">
        <a href="https://policestationrepuk.org/admin/firm-outreach">REPUK admin</a>
      </p>
    </div>
  `;
}

export async function buildCrossWorkspaceDigestData(
  phase: CrossDigestPhase,
  now: Date = new Date(),
): Promise<CrossWorkspaceDigestData> {
  const { date } = { date: now.toISOString().slice(0, 10) };
  const creds = kvCredsFromEnv();
  // RepUK soft-cap is unlimited (unset/0). Never project a PSA env cap onto RepUK.
  const repukCap = Number.MAX_SAFE_INTEGER;

  const kv = getKV();
  const queueCounts = kv ? await getCampaignQueueCounts(kv) : [];
  const readyByCampaign = Object.fromEntries(
    queueCounts.map((row) => [row.campaignId, row.byStatus.ready_to_send ?? 0]),
  );

  const workspaces: WorkspaceDigestRow[] = [];

  for (const ws of CROSS_DIGEST_WORKSPACES) {
    if (!ws.liveSend) {
      workspaces.push({
        domain: ws.domain,
        campaignId: ws.campaignId,
        fromEmail: ws.fromEmail,
        label: ws.label,
        liveSend: false,
        sentToday: 0,
        dailyCap: 0,
        remaining: 0,
        readyToSend: 0,
        sends: [],
      });
      continue;
    }

    const source: OutreachDomainSource = creds
      ? { domain: ws.domain, ...creds, campaignId: ws.campaignId }
      : { domain: ws.domain, url: '', token: '', campaignId: ws.campaignId };

    const sends = creds ? await listOutreachSentToday(source, now) : [];
    const sentToday = sends.length;

    workspaces.push({
      domain: ws.domain,
      campaignId: ws.campaignId,
      fromEmail: ws.fromEmail,
      label: ws.label,
      liveSend: true,
      sentToday,
      dailyCap: repukCap,
      remaining: Math.max(0, repukCap - sentToday),
      readyToSend: readyByCampaign[ws.campaignId] ?? 0,
      sends,
    });
  }

  const combined = workspaces.filter((w) => w.liveSend).reduce((sum, w) => sum + w.sentToday, 0);

  return {
    date,
    phase,
    phaseLabel: crossDigestPhaseLabel(phase),
    combined,
    workspaces,
  };
}

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (resend) return resend;
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  resend = new Resend(key);
  return resend;
}

export async function sendCrossWorkspaceOutreachDigest(opts: {
  phase: CrossDigestPhase;
  force?: boolean;
  now?: Date;
}): Promise<CrossWorkspaceDigestResult> {
  const now = opts.now ?? new Date();
  const date = now.toISOString().slice(0, 10);
  const phase = opts.phase;

  // Permanent stop: morning/evening "[Outreach digest] … PoliceStationRepUK"
  // must never leave this app. force= does not override.
  if (arePsaOutreachOperatorMailDisabled()) {
    console.info('[cross-workspace digest blocked]', PSA_OUTREACH_EMAILS_DISABLED_REASON);
    return {
      sent: false,
      reason: 'psa_outreach_emails_disabled',
      date,
      phase,
      combined: 0,
    };
  }

  if (!opts.force && (await wasCrossDigestSent(date, phase))) {
    return { sent: false, reason: 'already_sent', date, phase, combined: 0 };
  }

  const data = await buildCrossWorkspaceDigestData(phase, now);
  const subject = buildCrossWorkspaceDigestSubject(data);
  const html = buildCrossWorkspaceDigestHtml(data);

  const client = getResend();
  if (!client) {
    console.info('[cross-workspace digest]', subject, {
      combined: data.combined,
      phase,
      workspaces: data.workspaces.map((w) => ({ domain: w.domain, sent: w.sentToday, live: w.liveSend })),
    });
    return { sent: false, reason: 'no_resend', date, phase, combined: data.combined };
  }

  try {
    await client.emails.send({
      from: DIGEST_FROM_EMAIL,
      to: outreachNotifyEmail(),
      subject,
      html,
    });
    await markCrossDigestSent(date, phase);
    return { sent: true, date, phase, combined: data.combined };
  } catch (err) {
    console.warn('[cross-workspace digest]', err);
    return { sent: false, reason: 'send_failed', date, phase, combined: data.combined };
  }
}
