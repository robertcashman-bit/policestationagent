/**
 * Notify IndexNow-compatible search engines of new/changed URLs.
 * Tracks last-submitted timestamps in Supabase (seo_submission_state).
 * Optionally submits sitemap via Google Search Console API.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   INDEXNOW_FULL=1 node scripts/submit-indexnow.mjs   # force all URLs
 */
const HOST = process.env.INDEXNOW_HOST?.trim() || 'psrtrain.com';
const KEY = '5bd5aa8ba2968b564c6d20e264ba07ce';
const BASE = `https://${HOST}`;
const FORCE_FULL = process.env.INDEXNOW_FULL === '1';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const GSC_SITE_URL = process.env.GSC_SITE_URL?.trim() || 'sc-domain:psrtrain.com';

async function getSitemapEntries() {
  const res = await fetch(`${BASE}/sitemap.xml`, { headers: { 'User-Agent': 'indexnow-submit' } });
  if (!res.ok) throw new Error(`Could not fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const entries = [];
  const urlBlocks = xml.split('<url>').slice(1);
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const modMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (locMatch) {
      entries.push({
        url: locMatch[1].trim(),
        lastModified: modMatch?.[1]?.trim() ?? null,
      });
    }
  }
  return entries;
}

async function verifyKeyFile() {
  const res = await fetch(`${BASE}/${KEY}.txt`, { headers: { 'User-Agent': 'indexnow-submit' } });
  if (!res.ok) {
    throw new Error(`IndexNow key file not reachable (${res.status}). Deploy may not be live yet.`);
  }
  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error('IndexNow key file content mismatch.');
  }
}

async function loadSubmissionState() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.warn('Supabase not configured — submitting all URLs (no delta tracking).');
    return {};
  }
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/seo_submission_state?id=eq.default&select=url_timestamps`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    },
  );
  if (!res.ok) {
    console.warn(`Could not load seo_submission_state (${res.status}) — submitting all URLs.`);
    return {};
  }
  const rows = await res.json();
  return rows[0]?.url_timestamps ?? {};
}

async function saveSubmissionState(urlTimestamps) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/seo_submission_state?id=eq.default`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ url_timestamps: urlTimestamps, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) {
    console.warn(`Could not save seo_submission_state (${res.status}).`);
  }
}

function selectDeltaUrls(entries, previous) {
  if (FORCE_FULL) return entries.map((e) => e.url);
  const delta = [];
  for (const entry of entries) {
    const prev = previous[entry.url];
    const mod = entry.lastModified ?? '';
    if (!prev || prev !== mod) delta.push(entry.url);
  }
  return delta;
}

async function submitIndexNow(urlList) {
  if (urlList.length === 0) {
    console.log('No new/changed URLs to submit.');
    return;
  }

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow…`);
  const endpoints = ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow'];
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList,
  };

  let failures = 0;
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const ok = res.ok || res.status === 202;
      console.log(`${endpoint} → ${res.status} ${res.statusText}${ok ? '' : ' (failed)'}`);
      if (!ok) failures += 1;
    } catch (err) {
      console.error(`${endpoint} → error:`, err.message);
      failures += 1;
    }
  }

  if (failures > 0) {
    throw new Error(`IndexNow submission failed for ${failures} endpoint(s).`);
  }
}

async function submitGscSitemap() {
  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!saJson) {
    console.log('GSC sitemap submit skipped (GOOGLE_SERVICE_ACCOUNT_JSON not set).');
    return;
  }

  try {
    const { submitGscSitemap } = await import('./lib/google-gsc.mjs');
    const result = await submitGscSitemap(GSC_SITE_URL, `${BASE}/sitemap.xml`, saJson);
    if (result.ok) {
      console.log('GSC sitemap submitted via Search Console API.');
    } else {
      console.warn(`GSC sitemap submit: ${result.error}`);
    }
  } catch (err) {
    console.warn('GSC sitemap submit error:', err.message);
  }
}

await verifyKeyFile();

const entries = await getSitemapEntries();
const previous = await loadSubmissionState();
const urlList = selectDeltaUrls(entries, previous);

console.log(`Sitemap: ${entries.length} URLs, delta: ${urlList.length}${FORCE_FULL ? ' (full resubmit)' : ''}`);

await submitIndexNow(urlList);

if (urlList.length > 0 || FORCE_FULL) {
  const nextState = { ...previous };
  for (const entry of entries) {
    nextState[entry.url] = entry.lastModified ?? new Date().toISOString();
  }
  await saveSubmissionState(nextState);
}

await submitGscSitemap();
console.log('\nDone. IndexNow accepts 200 or 202 as success.');
