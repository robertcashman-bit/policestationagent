import { getKV } from '@/lib/kv';
import { approvalEmailKey } from './campaign-scope';
import { getOutreachConfigStatus } from './config-status';
import { buildOutreachActivityReport } from './outreach/activity-report';
import {
  outreachApprovalDate,
  wasOutreachApprovalEmailSent,
} from './outreach/send-approval-token';
import { getOutreachPauseSummary } from './pause-state';
import { getDailySendCount, listAllSends } from './storage';

function startOfUtcDay(isoDate: string): number {
  return Date.parse(`${isoDate}T00:00:00.000Z`);
}

export interface OutreachTodayAudit {
  utcDate: string;
  londonDate: string;
  config: Awaited<ReturnType<typeof getOutreachConfigStatus>>;
  pause: Awaited<ReturnType<typeof getOutreachPauseSummary>>;
  readyToSend: number;
  sentTodayReport: number;
  sentTodayKv: number;
  sentLast7Days: number;
  approvalEmailSentToday: boolean;
  approvalEmailSentAt: string | null;
  todaySends: Array<{
    sentAt: string;
    firmName: string;
    email: string;
    sequenceStep: number;
    subject: string;
  }>;
  interpretation: string;
}

export async function buildOutreachTodayAudit(): Promise<OutreachTodayAudit> {
  const utcDate = new Date().toISOString().slice(0, 10);
  const londonDate = outreachApprovalDate();
  const sinceMs = startOfUtcDay(utcDate);

  const [config, pause, { report, prospectCounts }, allSends, sentTodayKv, approvalSent] =
    await Promise.all([
      getOutreachConfigStatus(),
      getOutreachPauseSummary(),
      buildOutreachActivityReport(),
      listAllSends(),
      getDailySendCount(utcDate),
      wasOutreachApprovalEmailSent(londonDate),
    ]);

  const kv = getKV();
  const approvalSentAt = kv ? await kv.get<string>(approvalEmailKey(londonDate)) : null;

  const todaySends = allSends
    .filter((s) => s.sentAt && Date.parse(s.sentAt) >= sinceMs)
    .sort((a, b) => (a.sentAt ?? '').localeCompare(b.sentAt ?? ''))
    .map((s) => ({
      sentAt: s.sentAt!,
      firmName: s.firmName,
      email: s.email,
      sequenceStep: s.sequenceStep,
      subject: s.subject,
    }));

  let interpretation: string;
  if (todaySends.length === 0 && approvalSent) {
    interpretation =
      'Owner approval email was sent today; no firm outreach emails in KV for UTC today until Confirm is clicked.';
  } else if (todaySends.length > 0) {
    interpretation = 'Firm outreach emails were sent today (see todaySends).';
  } else if (config.requireApproval) {
    interpretation = 'Approval mode is on; no approval marker and no sends recorded today.';
  } else {
    interpretation = 'Autosend mode; no sends recorded today (queue empty, paused, or cap reached).';
  }

  return {
    utcDate,
    londonDate,
    config,
    pause,
    readyToSend: prospectCounts.ready_to_send ?? report.summary.readyToSend,
    sentTodayReport: report.summary.sentToday,
    sentTodayKv,
    sentLast7Days: report.summary.sentLast7Days,
    approvalEmailSentToday: approvalSent,
    approvalEmailSentAt: approvalSentAt ?? null,
    todaySends,
    interpretation,
  };
}
