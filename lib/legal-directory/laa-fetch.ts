/**
 * Fetch and parse the published LAA "Directory of legal aid providers" spreadsheet.
 * Shared by directory seeding and firm-outreach discovery.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import ExcelJS from 'exceljs';
import * as cheerio from 'cheerio';
import { dedupeLaaProviderRecords } from './laa-dedupe';
import { isCrimeRelatedLaaCategory, LAA_DIRECTORY_URL, type LaaProviderRecord } from './laa-seed';

const LAA_FETCH_UA =
  'PoliceStationAgent/1.0 (+https://policestationagent.com; laa-fetch)';

export const DEFAULT_LAA_CRIME_JSON_PATH = resolve(
  process.cwd(),
  'data/laa-crime-providers.json',
);

const LAA_STALE_MS = 7 * 24 * 60 * 60 * 1000;

export type LaaWorkbook = ExcelJS.Workbook;

function yes(val: unknown): boolean {
  return String(val ?? '').trim().toLowerCase() === 'yes';
}

function cellValueToString(value: ExcelJS.CellValue): string {
  if (value == null) return '';
  if (typeof value === 'object') {
    if ('result' in value && value.result != null) return String(value.result).trim();
    if ('text' in value && value.text != null) return String(value.text).trim();
    if ('richText' in value && Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text).join('').trim();
    }
    if (value instanceof Date) return value.toISOString();
  }
  return String(value).trim();
}

function sheetToRows(sheet: ExcelJS.Worksheet): string[][] {
  const rows: string[][] = [];
  sheet.eachRow({ includeEmpty: false }, (row) => {
    const vals: string[] = [];
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      while (vals.length < colNumber - 1) vals.push('');
      vals[colNumber - 1] = cellValueToString(cell.value);
    });
    if (vals.some((v) => v.length > 0)) rows.push(vals);
  });
  return rows;
}

export function parseSummarySheet(wb: LaaWorkbook): LaaProviderRecord[] {
  const sheet = wb.getWorksheet('Summary');
  if (!sheet) return [];

  const raw = sheetToRows(sheet);
  let headerIdx = -1;
  for (let i = 0; i < raw.length; i++) {
    const row = raw[i];
    if (row[1]?.trim() === 'Provider Name') {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx < 0) return [];

  const headers = raw[headerIdx].map((h) => String(h).trim());
  const col = (name: string) => headers.findIndex((h) => h.toLowerCase() === name.toLowerCase());

  const iName = col('Provider Name');
  const iCity = col('City');
  const iCounty = col('County');
  const iPostcode = col('Postcode');
  const iPhone = col('Telephone Number');
  const iCrime = col('Crime');
  const iPrison = col('Prison Law');

  const records: LaaProviderRecord[] = [];
  for (let r = headerIdx + 1; r < raw.length; r++) {
    const row = raw[r];
    const firmName = String(row[iName] ?? '').trim();
    if (!firmName) continue;

    const crime = iCrime >= 0 && yes(row[iCrime]);
    const prison = iPrison >= 0 && yes(row[iPrison]);
    if (!crime && !prison) continue;

    records.push({
      firmName,
      category: prison && !crime ? 'Prison Law' : crime ? 'Crime' : 'Prison Law',
      town: iCity >= 0 ? String(row[iCity] ?? '').trim() || undefined : undefined,
      county: iCounty >= 0 ? String(row[iCounty] ?? '').trim() || undefined : undefined,
      postcode: iPostcode >= 0 ? String(row[iPostcode] ?? '').trim() || undefined : undefined,
      phone: iPhone >= 0 ? String(row[iPhone] ?? '').trim() || undefined : undefined,
    });
  }
  return records;
}

export function parseCrimeProvidersSheet(wb: LaaWorkbook): LaaProviderRecord[] {
  const sheet = wb.getWorksheet('2025 Crime Providers');
  if (!sheet) return [];

  const raw = sheetToRows(sheet);
  let headerIdx = -1;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i][0]?.trim() === 'Provider Name') {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx < 0) return [];

  const records: LaaProviderRecord[] = [];
  for (let r = headerIdx + 1; r < raw.length; r++) {
    const row = raw[r];
    const firmName = String(row[0] ?? '').trim();
    const postcode = String(row[1] ?? '').trim();
    const prison = yes(row[4]);
    if (!firmName) continue;
    records.push({
      firmName,
      category: prison ? 'Prison Law' : 'Crime',
      postcode: postcode || undefined,
    });
  }
  return records;
}

export async function resolveLaaXlsxUrl(explicitUrl?: string): Promise<string> {
  if (explicitUrl) return explicitUrl;
  const res = await fetch(LAA_DIRECTORY_URL, { headers: { 'User-Agent': LAA_FETCH_UA } });
  if (!res.ok) throw new Error(`Publication page returned ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  let link: string | undefined;
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (!link && /\.(xlsx|xls|ods)(\?|$)/i.test(href)) link = href;
  });
  if (!link) throw new Error('No spreadsheet link found on the publication page.');
  return link.startsWith('http') ? link : new URL(link, 'https://www.gov.uk').toString();
}

export async function downloadLaaWorkbook(opts?: {
  url?: string;
  localFile?: string;
}): Promise<LaaWorkbook> {
  const wb = new ExcelJS.Workbook();
  if (opts?.localFile) {
    await wb.xlsx.readFile(resolve(process.cwd(), opts.localFile));
    return wb;
  }
  const url = await resolveLaaXlsxUrl(opts?.url);
  const res = await fetch(url, { headers: { 'User-Agent': LAA_FETCH_UA } });
  if (!res.ok) throw new Error(`Spreadsheet download returned ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await wb.xlsx.load(buf);
  return wb;
}

export function parseLaaCrimeRecords(wb: LaaWorkbook, limit = 0): LaaProviderRecord[] {
  const fromSummary = parseSummarySheet(wb).filter((r) => isCrimeRelatedLaaCategory(r.category));
  const fromCrimeSheet = parseCrimeProvidersSheet(wb).filter((r) =>
    isCrimeRelatedLaaCategory(r.category),
  );
  const { records } = dedupeLaaProviderRecords(fromSummary, fromCrimeSheet);
  return limit ? records.slice(0, limit) : records;
}

export function laaJsonIsStale(path = DEFAULT_LAA_CRIME_JSON_PATH, maxAgeMs = LAA_STALE_MS): boolean {
  try {
    const st = statSync(path);
    return Date.now() - st.mtimeMs > maxAgeMs;
  } catch {
    return true;
  }
}

export function readLaaCrimeJson(path = DEFAULT_LAA_CRIME_JSON_PATH): LaaProviderRecord[] {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as LaaProviderRecord[];
  } catch {
    return [];
  }
}

export async function fetchLaaCrimeProviders(opts?: {
  writePath?: string;
  limit?: number;
  url?: string;
  localFile?: string;
  force?: boolean;
}): Promise<{ records: LaaProviderRecord[]; refreshed: boolean; source: 'cache' | 'govuk' }> {
  const writePath = opts?.writePath ?? DEFAULT_LAA_CRIME_JSON_PATH;
  const stale = laaJsonIsStale(writePath);
  const cached = readLaaCrimeJson(writePath);

  if (!opts?.force && !stale && cached.length > 0) {
    return { records: cached, refreshed: false, source: 'cache' };
  }

  const wb = await downloadLaaWorkbook({ url: opts?.url, localFile: opts?.localFile });
  const records = parseLaaCrimeRecords(wb, opts?.limit ?? 0);

  try {
    mkdirSync(dirname(writePath), { recursive: true });
    writeFileSync(writePath, JSON.stringify(records, null, 2));
  } catch (err) {
    console.warn(
      '[laa-fetch] Cache write skipped:',
      err instanceof Error ? err.message : err,
    );
  }

  return { records, refreshed: true, source: 'govuk' };
}
