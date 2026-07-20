import { PHONE_TEL, SEO_NOT_POLICE } from "@/config/contact";

const INTRO_MARKER = 'data-station-not-police="true"';

const BAD_101_BLOCK =
  /<div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency<\/p><a href="tel:101"[^>]*>Call 101<\/a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters<\/p><\/div>/gi;

const CLEAR_101_BLOCK = `<div class="mt-4 pt-4 border-t border-slate-200" data-police-assistance="true"><p class="text-sm font-semibold text-slate-800 mb-1">Need the police? (official)</p><p class="text-xs text-slate-600 mb-2">This website is NOT Kent Police. For police assistance use official numbers only.</p><p class="text-sm text-slate-700">Emergency <a href="tel:999" class="font-bold text-red-700 underline">999</a> · Non-emergency <a href="tel:101" class="font-bold text-slate-900 underline">101</a></p></div>`;

const INTRO_HTML = `<aside class="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5 mb-6 max-w-4xl mx-auto" ${INTRO_MARKER} aria-label="Not the police"><p class="text-sm md:text-base text-slate-800 leading-relaxed mb-2"><strong class="text-red-900">${SEO_NOT_POLICE}</strong> Independent criminal defence solicitors — we do not operate police stations, cannot transfer calls to police, and do not take crime reports.</p><p class="text-sm text-slate-700">Police assistance: <strong>999</strong> or <strong>101</strong>. Need a solicitor for custody or a booked interview? Use the legal contact options below.</p></aside>`;

const SOLICITOR_HEADING =
  '<p class="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Need a solicitor? Independent legal advice</p>';

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

  if (!out.includes("Need a solicitor? Independent legal advice")) {
    out = out.replace(
      /(<div class="rounded-xl border bg-amber-500[^"]*"[^>]*>)/gi,
      `$1${SOLICITOR_HEADING}`,
    );
  }

  out = addNoSnippetToSolicitorTelsNearStationFacts(out);

  if (!out.includes(INTRO_MARKER)) {
    out = out.replace(/<\/h1>/i, `</h1>${INTRO_HTML}`);
  }

  out = out.replace(
    /(<h1[^>]*>)\s*([A-Za-z][A-Za-z\s'()-]+Police Station)\s*(<\/h1>)/gi,
    (_m, open: string, title: string, close: string) => {
      if (/information|guide|representation|solicitor/i.test(title)) {
        return `${open}${title}${close}`;
      }
      return `${open}${title.trim()} Information${close}`;
    },
  );

  return out;
}

function looksLikeStationPage(html: string): boolean {
  return (
    /Police Station Details/i.test(html) ||
    /Kent Police Non-Emergency/i.test(html) ||
    (/Get Directions/i.test(html) && /Custody/i.test(html))
  );
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
