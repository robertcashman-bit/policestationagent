import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SMS_DISPLAY,
  SMS_TEL,
} from "@/config/contact";

/** Strip embedded version badges from scraped HTML blobs. */
const VERSION_BADGE_PATTERN =
  /<div[^>]*class="[^"]*fixed[^"]*right-3[^"]*top-4[^"]*"[^>]*aria-hidden="true"[^>]*>v[\d.]+ — \d{1,2}\/\d{1,2}\/\d{4}<\/div>/gi;

const VERSION_BADGE_INLINE_PATTERN =
  /<span[^>]*class="[^"]*text-\[10px\][^"]*text-slate-400[^"]*"[^>]*>v[\d.]+ — \d{1,2}\/\d{1,2}\/\d{4}<\/span>/gi;

const PHONE_TEL_VARIANTS = [
  /tel:01732247427/gi,
  /tel:01732\s*247427/gi,
  /tel:\+441732247427/gi,
];

const PHONE_DISPLAY_VARIANTS = [
  /01732247427/g,
  /01732\s247427/g,
  /01732-247427/g,
  /Call:\s*01732\s247427/gi,
  /Call 01732 247427/gi,
];

const SMS_TEL_VARIANTS = [/sms:07535494446/gi, /sms:07535\s494446/gi];

const SMS_DISPLAY_VARIANTS = [/07535494446/g, /07535\s494446/g, /SMS:\s*07535\s494446/gi];

/**
 * Normalize scraped HTML: remove version badges and centralize contact links.
 */
export function normalizeScrapedHtml(html: string): string {
  let out = html;
  out = out.replaceAll(VERSION_BADGE_PATTERN, "");
  out = out.replaceAll(VERSION_BADGE_INLINE_PATTERN, "");

  for (const pattern of PHONE_TEL_VARIANTS) {
    out = out.replaceAll(pattern, `tel:${PHONE_TEL}`);
  }

  for (const pattern of PHONE_DISPLAY_VARIANTS) {
    out = out.replaceAll(pattern, (match) => {
      if (/^call/i.test(match.trim())) {
        return `Call: ${PHONE_DISPLAY}`;
      }
      return PHONE_DISPLAY;
    });
  }

  for (const pattern of SMS_TEL_VARIANTS) {
    out = out.replaceAll(pattern, `sms:${SMS_TEL}`);
  }

  for (const pattern of SMS_DISPLAY_VARIANTS) {
    out = out.replaceAll(pattern, (match) => {
      if (/^sms/i.test(match.trim())) {
        return `SMS: ${SMS_DISPLAY}`;
      }
      return SMS_DISPLAY;
    });
  }

  // Legacy scraped pages embed green WhatsApp buttons — convert to readable call/text CTAs.
  out = out.replace(/href="https:\/\/wa\.me\/[^"]*"/gi, `href="sms:${SMS_TEL}"`);
  out = out.replace(/href='https:\/\/wa\.me\/[^']*'/gi, `href='sms:${SMS_TEL}'`);
  out = out.replace(/bg-green-600/gi, "bg-red-600");
  out = out.replace(/bg-green-500/gi, "bg-red-600");
  out = out.replace(/hover:bg-green-700/gi, "hover:bg-red-700");
  out = out.replace(/hover:bg-green-600/gi, "hover:bg-red-700");
  out = out.replace(/text-green-100/gi, "text-white");
  out = out.replace(/WhatsApp text message only/gi, `Text ${SMS_DISPLAY}`);
  out = out.replace(/>\s*WhatsApp\s*</gi, `>Text ${SMS_DISPLAY}<`);

  return out;
}
