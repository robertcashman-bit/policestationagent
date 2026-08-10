/**
 * Ensures at least MIN_PER_MONTH guides were published in each of the last LOOKBACK months.
 * Run: npx tsx scripts/audit/guides-publishing-pace.ts
 */
import { GUIDES } from '../../lib/guides/content';

const MIN_PER_MONTH = 2;
const LOOKBACK_MONTHS = 3;

function monthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function parsePublished(value: string, slug: string): Date {
  const d = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid published date "${value}" on guide "${slug}"`);
  }
  return d;
}

const now = new Date();
const months: string[] = [];
for (let i = 0; i < LOOKBACK_MONTHS; i++) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
  months.push(monthKey(d));
}

const counts = new Map<string, number>(months.map((m) => [m, 0]));

for (const guide of GUIDES) {
  if (!guide.published) {
    console.error(`Guide "${guide.slug}" missing published date`);
    process.exit(1);
  }
  const key = monthKey(parsePublished(guide.published, guide.slug));
  if (counts.has(key)) {
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
}

const failures: string[] = [];
for (const month of months) {
  const count = counts.get(month) ?? 0;
  if (count < MIN_PER_MONTH) {
    failures.push(`${month}: ${count}/${MIN_PER_MONTH} guides`);
  }
}

if (failures.length > 0) {
  console.error('Guides publishing pace below target:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  JSON.stringify({
    ok: true,
    minPerMonth: MIN_PER_MONTH,
    lookbackMonths: LOOKBACK_MONTHS,
    counts: Object.fromEntries(months.map((m) => [m, counts.get(m)])),
  }),
);
