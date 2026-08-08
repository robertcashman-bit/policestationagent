import { stripFirmPhonesToContact } from "@/lib/seo/strip-firm-phones";
import { disambiguateStationHtml } from "@/lib/seo/disambiguate-station-html";
import { sanitizeScrapedHtml } from "@/lib/html-sanitizer";

/** Strip embedded version badges from scraped HTML blobs. */
const VERSION_BADGE_PATTERN =
  /<div[^>]*class="[^"]*fixed[^"]*right-3[^"]*top-4[^"]*"[^>]*aria-hidden="true"[^>]*>v[\d.]+ — \d{1,2}\/\d{1,2}\/\d{4}<\/div>/gi;

const VERSION_BADGE_INLINE_PATTERN =
  /<span[^>]*class="[^"]*text-\[10px\][^"]*text-slate-400[^"]*"[^>]*>v[\d.]+ — \d{1,2}\/\d{1,2}\/\d{4}<\/span>/gi;

export type NormalizeScrapedOptions = {
  /** When true, keep firm tel/sms (agency pages only). Default strips to pathways. */
  preserveFirmPhone?: boolean;
};

/**
 * Normalize scraped HTML: remove version badges and strip firm phone CTAs by default.
 */
export function normalizeScrapedHtml(
  html: string,
  options: NormalizeScrapedOptions = {},
): string {
  let out = html;
  out = out.replaceAll(VERSION_BADGE_PATTERN, "");
  out = out.replaceAll(VERSION_BADGE_INLINE_PATTERN, "");

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

  if (!options.preserveFirmPhone) {
    out = stripFirmPhonesToContact(out, "pathways");
  }

  // Separate police contact (999/101) from solicitor phone; inject not-police intro.
  out = disambiguateStationHtml(out);

  return sanitizeScrapedHtml(out);
}
