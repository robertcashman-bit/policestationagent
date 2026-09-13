import { getKV } from "@/lib/kv";

/** Upstash key prefix for voluntary interview enquiry snapshots. */
export const VOLUNTARY_ENQUIRY_KEY_PREFIX = "enquiry:voluntary:";

/** Retention: ~90 days. */
export const VOLUNTARY_ENQUIRY_TTL_SECONDS = 90 * 24 * 60 * 60;

export type VoluntaryEnquiryRecord = {
  reference: string;
  storedAt: string;
  formMode: "full" | "short";
  enquiryType: string;
  policeForce: string;
  policeStation: string;
  town: string;
  inKent: string;
  interviewDate: string;
  interviewTime: string;
  officerName: string;
  officerRank: string;
  officerPhone: string;
  officerEmail: string;
  crimeReference: string;
  allegation: string;
  receivedLetter: string;
  fullName: string;
  dateOfBirth: string;
  telephone: string;
  email: string;
  postcode: string;
  preferredContact: string;
  enquirerRole: string;
  otherSolicitor: string;
  otherSolicitorDetails: string;
  landingPage: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  /** Attachment metadata only — not file bytes. */
  attachmentCount: number;
  attachmentNames: string[];
  emailNotified: boolean;
  businessBody: string;
};

function keyFor(reference: string): string {
  return `${VOLUNTARY_ENQUIRY_KEY_PREFIX}${reference.trim().toUpperCase()}`;
}

/**
 * Persist a voluntary enquiry snapshot for ops lookup by reference.
 * Never throws — email remains primary; failures are logged.
 */
export async function persistVoluntaryEnquiry(
  record: VoluntaryEnquiryRecord,
): Promise<{ ok: boolean; reason?: string }> {
  const kv = getKV();
  if (!kv) {
    console.warn("[voluntary-store] KV not configured — skipping persist", record.reference);
    return { ok: false, reason: "no_kv" };
  }
  try {
    await kv.set(keyFor(record.reference), record, { ex: VOLUNTARY_ENQUIRY_TTL_SECONDS });
    return { ok: true };
  } catch (err) {
    console.error("[voluntary-store] persist failed", record.reference, err);
    return { ok: false, reason: "error" };
  }
}

/** Admin lookup by VAI reference. Returns null if missing or KV unavailable. */
export async function getVoluntaryEnquiryByReference(
  reference: string,
): Promise<VoluntaryEnquiryRecord | null> {
  const trimmed = reference.trim();
  if (!trimmed) return null;
  const kv = getKV();
  if (!kv) return null;
  try {
    const raw = await kv.get<VoluntaryEnquiryRecord>(keyFor(trimmed));
    if (!raw || typeof raw !== "object") return null;
    return raw;
  } catch (err) {
    console.error("[voluntary-store] lookup failed", trimmed, err);
    return null;
  }
}
