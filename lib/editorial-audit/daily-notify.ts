import { getKV } from "@/lib/kv";
import type { AuditFinding } from "./types";

const BUCKET_PREFIX = "editorial-audit:daily:";
const NOTIFY_TIMEZONE = process.env.EDITORIAL_AUDIT_NOTIFY_TIMEZONE?.trim() || "Europe/London";
/**
 * Cron is `0 6 * * 1-5` UTC (06:00 GMT / 07:00 BST). Threshold must be 6 so the
 * digest still sends in winter GMT — not only during BST when London is UTC+1.
 */
const SEND_AFTER_HOUR = Number(process.env.EDITORIAL_AUDIT_NOTIFY_SEND_HOUR ?? 6);

export interface DailyAuditBucket {
  date: string;
  findings: AuditFinding[];
  unitsScanned: number;
  notifiedAt?: string;
}

function localDateInTimezone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

function bucketKey(date: string): string {
  return `${BUCKET_PREFIX}${date}`;
}

export function dailyAuditDate(now = new Date()): string {
  return localDateInTimezone(now, NOTIFY_TIMEZONE);
}

export function shouldSendDailyAudit(now = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: NOTIFY_TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(now)
  );
  return hour >= SEND_AFTER_HOUR;
}

export async function getDailyAuditBucket(date: string): Promise<DailyAuditBucket | null> {
  const kv = getKV();
  if (!kv) return null;
  return (await kv.get<DailyAuditBucket>(bucketKey(date))) ?? null;
}

function dedupeFindings(existing: AuditFinding[], incoming: AuditFinding[]): AuditFinding[] {
  const map = new Map<string, AuditFinding>();
  for (const f of existing) map.set(f.fingerprint, f);
  for (const f of incoming) map.set(f.fingerprint, f);
  return [...map.values()];
}

export async function addToDailyAuditBucket(
  date: string,
  findings: AuditFinding[],
  unitsScanned: number
): Promise<DailyAuditBucket> {
  const kv = getKV();
  const existing = kv ? await getDailyAuditBucket(date) : null;
  const merged: DailyAuditBucket = {
    date,
    findings: dedupeFindings(existing?.findings ?? [], findings),
    unitsScanned: (existing?.unitsScanned ?? 0) + unitsScanned,
    notifiedAt: existing?.notifiedAt,
  };

  if (kv) {
    await kv.set(bucketKey(date), merged, { ex: 60 * 60 * 24 * 14 });
  }
  return merged;
}

export async function markDailyAuditSent(date: string): Promise<void> {
  const kv = getKV();
  if (!kv) return;
  const bucket = await getDailyAuditBucket(date);
  if (!bucket) return;
  await kv.set(
    bucketKey(date),
    { ...bucket, notifiedAt: new Date().toISOString() },
    { ex: 60 * 60 * 24 * 14 }
  );
}
