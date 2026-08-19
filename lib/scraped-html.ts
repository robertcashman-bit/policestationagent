import { stripFirmPhonesToContact } from "@/lib/seo/strip-firm-phones";
import { disambiguateStationHtml } from "@/lib/seo/disambiguate-station-html";
import { sanitizeScrapedHtml } from "@/lib/html-sanitizer";

/** Strip embedded version badges from scraped HTML blobs. */
const VERSION_BADGE_PATTERN =
  /<div[^>]*class="[^"]*fixed[^"]*right-3[^"]*top-4[^"]*"[^>]*aria-hidden="true"[^>]*>v[\d.]+(?:\s*[—–-]\s*)\d{1,2}\/\d{1,2}\/\d{4}<\/div>/gi;

const VERSION_BADGE_INLINE_PATTERN =
  /<(?:span|p)[^>]*(?:text-\[10px\]|text-xs)[^>]*text-(?:slate|gray)-[45]00[^>]*>\s*v[\d.]+(?:\s*[—–-]\s*)\d{1,2}\/\d{1,2}\/\d{4}\s*<\/(?:span|p)>/gi;

/** Footer / body version stamps such as `v5.0.0 - 12/12/2025` */
const VERSION_STAMP_LOOSE_PATTERN =
  /<(?:p|span|div)[^>]*>\s*v\d+(?:\.\d+)+(?:\s*[—–-]\s*)\d{1,2}\/\d{1,2}\/\d{4}\s*<\/(?:p|span|div)>/gi;

/**
 * Rewrite legacy blue/purple/amber utility classes to navy/gold design-system classes.
 * Stronger than CSS alone because Tailwind `important: true` can beat attribute selectors.
 */
const DESIGN_CLASS_REMAPS: Array<[RegExp, string]> = [
  // Hero gradients → hero-navy
  [/bg-gradient-to-br\s+from-blue-900\s+via-slate-900\s+to-slate-800/gi, "hero-navy"],
  [/bg-gradient-to-br\s+from-blue-900\s+via-blue-800\s+to-indigo-900/gi, "hero-navy"],
  [/bg-gradient-to-br\s+from-slate-800\s+via-blue-900\s+to-slate-900/gi, "hero-navy"],
  [/bg-gradient-to-r\s+from-blue-900\s+via-slate-900\s+to-slate-800/gi, "hero-navy"],
  [/bg-gradient-to-br\s+from-indigo-900\s+via-blue-900\s+to-slate-900/gi, "hero-navy"],
  [/bg-gradient-to-br\s+from-purple-900\s+via-indigo-900\s+to-blue-900/gi, "hero-navy"],
  // Mid-blue CTA/card gradients → navy
  [/bg-gradient-to-r\s+from-blue-600\s+to-blue-700/gi, "bg-primary"],
  [/bg-gradient-to-br\s+from-blue-600\s+to-blue-700/gi, "bg-primary"],
  [/bg-gradient-to-r\s+from-blue-700\s+to-blue-800/gi, "bg-primary"],
  [/bg-gradient-to-r\s+from-indigo-600\s+to-blue-700/gi, "bg-primary"],
  [/bg-gradient-to-r\s+from-blue-500\s+to-indigo-600/gi, "bg-primary"],
  [/from-blue-600/gi, "from-primary"],
  [/to-blue-700/gi, "to-primary"],
  [/from-blue-700/gi, "from-primary"],
  [/to-blue-800/gi, "to-primary-dark"],
  [/to-blue-600/gi, "to-primary"],
  // Page backgrounds
  [/bg-gradient-to-br\s+from-slate-50\s+to-blue-50/gi, "bg-background"],
  [/bg-gradient-to-br\s+from-slate-50\s+via-blue-50\s+to-white/gi, "bg-background"],
  [/min-h-screen\s+bg-background/gi, "bg-background"],
  // Amber CTA badges / buttons → gold
  [/bg-amber-400(\s+text-slate-900)?/gi, "bg-accent text-accent-foreground"],
  [/bg-amber-500/gi, "bg-accent"],
  [/hover:bg-amber-400/gi, "hover:bg-accent-light"],
  [/hover:bg-amber-600/gi, "hover:bg-accent-dark"],
  [/text-amber-400/gi, "text-accent-light"],
  [/text-amber-500/gi, "text-accent"],
  // Blue/indigo/purple CTAs → navy
  [/bg-blue-600/gi, "bg-primary"],
  [/bg-blue-700/gi, "bg-primary"],
  [/bg-blue-800/gi, "bg-primary"],
  [/bg-indigo-600/gi, "bg-primary"],
  [/bg-indigo-700/gi, "bg-primary"],
  [/bg-purple-600/gi, "bg-primary"],
  [/bg-purple-700/gi, "bg-primary"],
  [/hover:bg-blue-700/gi, "hover:bg-primary-light"],
  [/hover:bg-blue-800/gi, "hover:bg-primary-light"],
  [/hover:bg-indigo-700/gi, "hover:bg-primary-light"],
  [/hover:bg-purple-700/gi, "hover:bg-primary-light"],
  // Blue text → navy (light blues on dark heroes become soft white)
  [/text-blue-100/gi, "text-white"],
  [/text-blue-200/gi, "text-white"],
  [/text-blue-300/gi, "text-white"],
  [/text-blue-600/gi, "text-primary"],
  [/text-blue-700/gi, "text-primary"],
  [/text-blue-800/gi, "text-primary"],
  [/text-blue-900/gi, "text-primary"],
  [/text-indigo-600/gi, "text-primary"],
  [/text-indigo-700/gi, "text-primary"],
  [/text-purple-600/gi, "text-primary"],
  [/text-purple-700/gi, "text-primary"],
  // Soft blue surfaces → secondary
  [/bg-blue-50/gi, "bg-secondary"],
  [/bg-blue-100/gi, "bg-secondary"],
  [/bg-indigo-50/gi, "bg-secondary"],
  [/border-blue-200/gi, "border-border"],
  [/border-blue-300/gi, "border-border"],
  [/border-blue-600/gi, "border-primary"],
  [/border-blue-800/gi, "border-primary"],
  [/hover:border-blue-300/gi, "hover:border-primary"],
  [/hover:border-blue-400/gi, "hover:border-primary"],
  [/hover:bg-blue-50/gi, "hover:bg-secondary"],
];

export type NormalizeScrapedOptions = {
  /** When true, keep firm tel/sms (agency pages only). Default strips to pathways. */
  preserveFirmPhone?: boolean;
};

/**
 * Normalize scraped HTML: remove version badges, remap legacy colours, strip firm phone CTAs.
 */
export function normalizeScrapedHtml(
  html: string,
  options: NormalizeScrapedOptions = {},
): string {
  let out = html;
  out = out.replaceAll(VERSION_BADGE_PATTERN, "");
  out = out.replaceAll(VERSION_BADGE_INLINE_PATTERN, "");
  out = out.replaceAll(VERSION_STAMP_LOOSE_PATTERN, "");

  // Legacy scraped pages embed green WhatsApp buttons — convert away from WA
  out = out.replace(/href="https:\/\/wa\.me\/[^"]*"/gi, 'href="/contact"');
  out = out.replace(/href='https:\/\/wa\.me\/[^']*'/gi, "href='/contact'");
  out = out.replace(/bg-green-600/gi, "bg-red-600");
  out = out.replace(/bg-green-500/gi, "bg-red-600");
  out = out.replace(/hover:bg-green-700/gi, "hover:bg-red-700");
  out = out.replace(/hover:bg-green-600/gi, "hover:bg-red-700");
  out = out.replace(/text-green-100/gi, "text-white");
  out = out.replace(/WhatsApp text message only/gi, "Contact pathways");
  out = out.replace(/>\s*WhatsApp\s*</gi, ">Get a solicitor<");

  // Garbled hero copy from legacy bulk replace (solicitor landing pages).
  out = out.replace(
    /We're We aim to respond promptly\. Attendance times depend on location, custody demand and solicitor availability\./gi,
    "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
  );
  out = out.replace(
    /solicitor We aim to respond promptly\. Attendance times depend on location, custody demand and solicitor availability\./gi,
    "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
  );

  for (const [pattern, replacement] of DESIGN_CLASS_REMAPS) {
    out = out.replace(pattern, replacement);
  }

  if (!options.preserveFirmPhone) {
    out = stripFirmPhonesToContact(out, "pathways");
  }

  // Separate police contact (999/101) from solicitor phone; inject not-police intro.
  out = disambiguateStationHtml(out);

  return sanitizeScrapedHtml(out);
}
