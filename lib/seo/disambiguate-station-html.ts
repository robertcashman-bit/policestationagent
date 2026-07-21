import {
  STATION_CONTACT_BUTTON,
  STATION_PHONE_LABEL,
  STATION_SOLICITOR_CTA,
} from "@/config/contact";

const INTRO_MARKER = 'data-station-not-police="true"';

const BAD_101_BLOCK =
  /<div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency<\/p><a href="tel:101"[^>]*>Call 101<\/a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters<\/p><\/div>/gi;

const CLEAR_101_BLOCK = `<div class="mt-4 pt-4 border-t border-slate-200" data-police-assistance="true"><p class="text-sm font-semibold text-slate-800 mb-1">Need the police? (official)</p><p class="text-xs text-slate-600 mb-2">This website is NOT Kent Police. For police assistance use official numbers only.</p><p class="text-sm text-slate-700">Emergency <a href="tel:999" class="font-bold text-red-700 underline">999</a> · Non-emergency <a href="tel:101" class="font-bold text-slate-900 underline">101</a></p></div>`;

const INTRO_HTML = `<aside class="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5 mb-6 max-w-4xl mx-auto" ${INTRO_MARKER} aria-label="Not the police"><p class="text-sm md:text-base text-slate-800 leading-relaxed mb-2"><strong class="text-red-900">NOT THE POLICE.</strong> We are <strong>criminal solicitors</strong> serving this station.</p><p class="text-sm text-slate-700 mb-2">${STATION_SOLICITOR_CTA}</p><p class="text-sm text-slate-700">Police assistance: <strong>999</strong> or <strong>101</strong>. <a href="/contact" class="font-semibold underline text-blue-800">${STATION_CONTACT_BUTTON}</a> — solicitor telephone is last on that page.</p></aside>`;

const SOLICITOR_HEADING = `<p class="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide" data-solicitor-label="true">${STATION_PHONE_LABEL}</p><p class="text-xs text-slate-800 mb-3" data-solicitor-scope="true">${STATION_SOLICITOR_CTA}</p>`;

const CONTACT_CTA_HTML = `<a href="/contact" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-8 bg-white text-red-600 hover:bg-red-50" data-solicitor-contact="true" data-nosnippet>${STATION_CONTACT_BUTTON}</a>`;

const FIRM_PHONE_TEXT = /(?:Call:?\s*)?(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427/gi;

/**
 * Runtime HTML disambiguation for scraped police-station pages.
 * Removes firm telephone digits; points to /contact (phone last, after do/don't).
 */
export function disambiguateStationHtml(html: string): string {
  // Solicitor / about landings mention "police station" but must keep the firm number.
  if (isSolicitorIntentHtml(html) || !looksLikeStationPage(html)) {
    return html;
  }

  let out = html;

  out = out.replace(BAD_101_BLOCK, CLEAR_101_BLOCK);

  // Soften "URGENT: Police Station Help" toward solicitor framing
  out = out.replace(
    /URGENT:\s*Police Station Help/gi,
    "Urgent solicitor representation — NOT the police",
  );
  out = out.replace(
    /Need Expert Police Representation\?/gi,
    "Need urgent police station representation?",
  );

  if (!out.includes('data-solicitor-label="true"')) {
    out = out.replace(
      /(<div class="rounded-xl border bg-amber-500[^"]*"[^>]*>)/gi,
      `$1${SOLICITOR_HEADING}`,
    );
  }

  out = out.replace(
    /(<h1[^>]*>)\s*([A-Za-z][A-Za-z\s'()-]+Police Station)\s*(<\/h1>)/gi,
    (_m, open: string, title: string, close: string) => {
      if (/information|guide|representation|solicitor/i.test(title)) {
        return `${open}${title}${close}`;
      }
      return `${open}${title.trim()} Information — Criminal Solicitors (NOT the police)${close}`;
    },
  );

  if (!out.includes(INTRO_MARKER)) {
    out = out.replace(/<\/h1>/i, `</h1>${INTRO_HTML}`);
  }

  out = stripFirmTelephoneFromStationHtml(out);

  return out;
}

/**
 * Solicitor / agent / about pages: keep tel digits.
 * Station-directory pages (Details / 101 / directions) always strip.
 */
export function isSolicitorIntentHtml(html: string): boolean {
  if (
    /Police Station Details/i.test(html) ||
    /Kent Police Non-Emergency/i.test(html) ||
    /data-police-assistance="true"/i.test(html) ||
    (/Get Directions/i.test(html) && /Custody/i.test(html))
  ) {
    return false;
  }

  const h1 = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (/\bSolicitor\b/i.test(h1) || /\bDuty Solicitor\b/i.test(h1)) return true;
  if (/^About\b/i.test(h1)) return true;
  if (/\bPolice Station Agent\b/i.test(h1)) return true;

  return false;
}

function looksLikeStationPage(html: string): boolean {
  return (
    /Police Station Details/i.test(html) ||
    /Kent Police Non-Emergency/i.test(html) ||
    /data-police-assistance="true"/i.test(html) ||
    (/Get Directions/i.test(html) && /Custody/i.test(html))
  );
}

/**
 * Replace every firm tel: CTA and visible 01732 digits with a /contact link.
 */
export function stripFirmTelephoneFromStationHtml(html: string): string {
  let out = html;

  out = out.replace(
    /<a\b[^>]*href=["']tel:(?:\+44)?0?1732\s*247427["'][^>]*>[\s\S]*?<\/a>/gi,
    () => CONTACT_CTA_HTML,
  );

  out = out.replace(
    /href=["']tel:(?:\+44)?0?1732\s*247427["']/gi,
    'href="/contact" data-solicitor-contact="true" data-nosnippet',
  );

  out = out.replace(FIRM_PHONE_TEXT, (match, offset: number, full: string) => {
    const before = full.slice(Math.max(0, offset - 80), offset);
    if (/data-solicitor-contact/i.test(before)) return match;
    if (/tel:/i.test(before)) return match;
    return "criminal solicitors (see Contact)";
  });

  if (/bg-amber-500/i.test(out) && !/data-solicitor-contact="true"/i.test(out)) {
    out = out.replace(
      /(<div class="rounded-xl border bg-amber-500[^"]*"[^>]*>)/i,
      `$1${SOLICITOR_HEADING}${CONTACT_CTA_HTML}`,
    );
  }

  return out;
}
