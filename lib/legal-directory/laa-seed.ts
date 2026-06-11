/**
 * LAA provider record types and helpers for firm-outreach discovery and laa-fetch.
 * Directory seeding stubs are not used on policestationagent.
 */

/** Source publication for the seeded data. */
export const LAA_DIRECTORY_URL =
  'https://www.gov.uk/government/publications/directory-of-legal-aid-providers';

/** A single firm row distilled from the LAA directory spreadsheet. */
export interface LaaProviderRecord {
  firmName: string;
  /** LAA category of law, e.g. "Crime" or "Prison Law". */
  category: string;
  town?: string;
  county?: string;
  postcode?: string;
  phone?: string;
  /** LAA account number, when present. */
  accountNumber?: string;
}

const LAA_CRIME_CATEGORIES = ['crime', 'prison law'];

function slugifyLegalDirectory(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'listing'
  );
}

export function isCrimeRelatedLaaCategory(category: string): boolean {
  const c = category.trim().toLowerCase();
  return LAA_CRIME_CATEGORIES.some((k) => c.includes(k));
}

/** Map an LAA category of law to one of our directory category slugs. */
export function categorySlugFromLaaCategory(category: string): string {
  const c = category.trim().toLowerCase();
  if (c.includes('prison')) return 'prison-law';
  return 'solicitors';
}

/** Stable key (and slug/id basis) for a provider, so re-runs are idempotent. */
export function laaProviderKey(record: LaaProviderRecord): string {
  const parts = [record.firmName, record.town, record.postcode]
    .map((p) => slugifyLegalDirectory(p ?? ''))
    .filter(Boolean);
  return parts.join('-').slice(0, 120) || 'laa-provider';
}

/** Normalised office key for cross-sheet dedupe (firm + postcode; town excluded). */
export function laaOfficeKey(record: LaaProviderRecord): string {
  const parts = [record.firmName, record.postcode]
    .map((p) => slugifyLegalDirectory(p ?? ''))
    .filter(Boolean);
  return parts.join('-').slice(0, 120) || 'laa-office';
}

/** Richness score for choosing the canonical row when merging duplicates. */
export function laaRecordRichness(record: LaaProviderRecord): number {
  let score = 0;
  if (record.town?.trim()) score += 4;
  if (record.county?.trim()) score += 2;
  if (record.phone?.trim()) score += 1;
  if (record.accountNumber?.trim()) score += 1;
  return score;
}

/**
 * When the LAA Summary sheet lists conflicting towns for the same firm + postcode,
 * keep the canonical town (verified against postcode geography).
 */
export const LAA_MULTI_TOWN_RESOLUTIONS: Record<string, string> = {
  'orison-solicitors-llp-ls12-3hn': 'Leeds',
};

/** Merge two LAA rows for the same office; never overwrite non-empty with empty. */
export function mergeLaaProviderRecords(
  a: LaaProviderRecord,
  b: LaaProviderRecord,
): LaaProviderRecord {
  const pick = (x?: string, y?: string) => (x?.trim() ? x : y?.trim() ? y : undefined);
  return {
    firmName: a.firmName || b.firmName,
    category: a.category || b.category,
    town: pick(a.town, b.town),
    county: pick(a.county, b.county),
    postcode: pick(a.postcode, b.postcode),
    phone: pick(a.phone, b.phone),
    accountNumber: pick(a.accountNumber, b.accountNumber),
  };
}

/** Pick the canonical Summary row when multiple rows share an office key. */
export function pickCanonicalLaaRecord(records: LaaProviderRecord[]): LaaProviderRecord {
  if (records.length === 1) return records[0];
  const officeKey = laaOfficeKey(records[0]);
  const preferredTown = LAA_MULTI_TOWN_RESOLUTIONS[officeKey];
  if (preferredTown) {
    const match = records.find((r) => r.town?.trim().toLowerCase() === preferredTown.toLowerCase());
    if (match) return match;
  }
  return records.reduce((best, cur) =>
    laaRecordRichness(cur) > laaRecordRichness(best) ? cur : best,
  );
}
