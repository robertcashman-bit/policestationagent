import { PHONE_TEL, SEO_NOT_POLICE } from "@/config/contact";

const INTRO_MARKER = 'data-station-not-police="true"';

const BAD_101_BLOCK =
  /<div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency<\/p><a href="tel:101"[^>]*>Call 101<\/a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters<\/p><\/div>/gi;

const CLEAR_101_BLOCK = `<div class="mt-4 pt-4 border-t border-slate-200" data-police-assistance="true"><p class="text-sm font-semibold text-slate-800 mb-1">Need the police? (official)</p><p class="text-xs text-slate-600 mb-2">This website is NOT Kent Police. For police assistance use official numbers only.</p><p class="text-sm text-slate-700">Emergency <a href="tel:999" class="font-bold text-red-700 underline">999</a> · Non-emergency <a href="tel:101" class="font-bold text-slate-900 underline">101</a></p></div>`;

const INTRO_HTML = `<aside class="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5 mb-6 max-w-4xl mx-auto" ${INTRO_MARKER} aria-label="Not the police"><p class="text-sm md:text-base text-slate-800 leading-relaxed mb-2"><strong class="text-red-900">${SEO_NOT_POLICE}</strong> Independent criminal defence solicitors — we do not operate police stations, cannot transfer calls to police, and do not take crime reports.</p><p class="text-sm text-slate-700">Police assistance: <strong>999</strong> or <strong>101</strong>. Need a solicitor for custody or a booked interview? Use the legal contact options below.</p></aside>`;

const SOLICITOR_HEADING =
  '<p class="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide" data-solicitor-label="true">Need a solicitor? Independent legal advice</p>';

const HERO_SOLICITOR_LABEL =
  '<p class="text-xs font-bold uppercase tracking-wide mb-2 opacity-90" data-solicitor-label="true">Need a solicitor? Independent legal advice</p>';

/**
 * Runtime HTML disambiguation for scraped police-station pages.
 * Separates police contact (999/101) from solicitor phone; injects not-police intro.
 */
export function disambiguateStationHtml(html: string): string {
  if (!looksLikeStationPage(html)) {
    return html;
  }

  let out = html;

  out = out.replace(BAD_101_BLOCK, CLEAR_101_BLOCK);

  if (!out.includes('data-solicitor-label="true"')) {
    out = out.replace(
      /(<div class="rounded-xl border bg-amber-500[^"]*"[^>]*>)/gi,
      `$1${SOLICITOR_HEADING}`,
    );
  }

  // Soften H1 before intro so intro sits under corrected heading
  out = out.replace(
    /(<h1[^>]*>)\s*([A-Za-z][A-Za-z\s'()-]+Police Station)\s*(<\/h1>)/gi,
    (_m, open: string, title: string, close: string) => {
      if (/information|guide|representation|solicitor/i.test(title)) {
        return `${open}${title}${close}`;
      }
      return `${open}${title.trim()} Information${close}`;
    },
  );

  if (!out.includes(INTRO_MARKER)) {
    out = out.replace(/<\/h1>/i, `</h1>${INTRO_HTML}`);
  }

  out = demoteHeroSolicitorTels(out);
  out = addNoSnippetToSolicitorTelsNearStationFacts(out);
  out = addNoSnippetInHeroZone(out);

  return out;
}

function looksLikeStationPage(html: string): boolean {
  return (
    /Police Station Details/i.test(html) ||
    /Kent Police Non-Emergency/i.test(html) ||
    /data-police-assistance="true"/i.test(html) ||
    (/Get Directions/i.test(html) && /Custody/i.test(html)) ||
    (/police station/i.test(html) && new RegExp(`tel:${PHONE_TEL}`, "i").test(html))
  );
}

/**
 * Label and nosnippet solicitor tel links in the hero (first ~1200 chars after H1).
 * Keeps links functional — does not remove them.
 */
function demoteHeroSolicitorTels(html: string): string {
  const h1End = html.search(/<\/h1>/i);
  if (h1End === -1) return html;

  const start = h1End + "</h1>".length;
  const end = Math.min(html.length, start + 1200);
  const before = html.slice(0, start);
  let hero = html.slice(start, end);
  const after = html.slice(end);

  const telHref = new RegExp(`href="tel:${PHONE_TEL}"`, "i");
  if (telHref.test(hero) && !hero.includes('data-solicitor-label="true"')) {
    hero = hero.replace(
      new RegExp(`(<a[^>]*href="tel:${PHONE_TEL}"[^>]*>)`, "i"),
      `${HERO_SOLICITOR_LABEL}$1`,
    );
  }

  hero = hero.replace(
    new RegExp(`href="tel:${PHONE_TEL}"(?![^>]*data-nosnippet)`, "gi"),
    `href="tel:${PHONE_TEL}" data-nosnippet`,
  );

  return before + hero + after;
}

function addNoSnippetInHeroZone(html: string): string {
  const h1End = html.search(/<\/h1>/i);
  if (h1End === -1) return html;
  const start = h1End;
  const end = Math.min(html.length, start + 800);
  const before = html.slice(0, start);
  const zone = html.slice(start, end);
  const after = html.slice(end);
  const patched = zone.replace(
    new RegExp(`href="tel:${PHONE_TEL}"(?![^>]*data-nosnippet)`, "gi"),
    `href="tel:${PHONE_TEL}" data-nosnippet`,
  );
  return before + patched + after;
}

function addNoSnippetToSolicitorTelsNearStationFacts(html: string): string {
  const markers = [
    "Police Station Details",
    "Get Directions",
    'data-police-assistance="true"',
  ];

  let out = html;
  for (const marker of markers) {
    const idx = out.indexOf(marker);
    if (idx === -1) continue;
    const windowEnd = Math.min(out.length, idx + 2500);
    const before = out.slice(0, idx);
    const window = out.slice(idx, windowEnd);
    const after = out.slice(windowEnd);

    const patched = window.replace(
      new RegExp(`href="tel:${PHONE_TEL}"(?![^>]*data-nosnippet)`, "gi"),
      `href="tel:${PHONE_TEL}" data-nosnippet`,
    );
    out = before + patched + after;
  }

  return out;
}
