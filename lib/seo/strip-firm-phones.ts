import { STATION_CONTACT_BUTTON } from "@/config/contact";

const CONTACT_CTA_HTML = `<a href="/contact" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-8 bg-white text-red-600 hover:bg-red-50" data-solicitor-contact="true" data-nosnippet>${STATION_CONTACT_BUTTON}</a>`;

const FIRM_TEL_HREF =
  /href=["']tel:(?:\+44)?0?1732[\s\-]?247[\s\-]?427["']/gi;
const FIRM_SMS_HREF =
  /href=["']sms:(?:\+44)?0?7535[\s\-]?494[\s\-]?446[^"']*["']/gi;
const FIRM_TEL_ANCHOR =
  /<a\b[^>]*href=["']tel:(?:\+44)?0?1732\s*247427["'][^>]*>[\s\S]*?<\/a>/gi;
const FIRM_SMS_ANCHOR =
  /<a\b[^>]*href=["']sms:(?:\+44)?0?7535\s*494446[^"']*["'][^>]*>[\s\S]*?<\/a>/gi;
const FIRM_PHONE_TEXT =
  /(?:Call:?\s*|Text:?\s*|SMS:?\s*)?(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427/gi;
const FIRM_SMS_TEXT =
  /(?:Call:?\s*|Text:?\s*|SMS:?\s*)?(?:\+44\s*)?0?7535[\s\-]?494[\s\-]?446/gi;

/**
 * Replace firm voice/SMS digits and tel:/sms: CTAs with /contact links.
 * Used on station HTML and station-risk blog bodies so crawlers/AI cannot
 * quote 01732/07535 next to custody language.
 */
export function stripFirmPhonesToContact(html: string): string {
  if (!html) return html;

  let out = html;

  out = out.replace(FIRM_TEL_ANCHOR, () => CONTACT_CTA_HTML);
  out = out.replace(FIRM_SMS_ANCHOR, () => CONTACT_CTA_HTML);
  out = out.replace(
    FIRM_TEL_HREF,
    'href="/contact" data-solicitor-contact="true" data-nosnippet',
  );
  out = out.replace(
    FIRM_SMS_HREF,
    'href="/contact" data-solicitor-contact="true" data-nosnippet',
  );

  out = out.replace(FIRM_PHONE_TEXT, (match, offset: number, full: string) => {
    const before = full.slice(Math.max(0, offset - 80), offset);
    if (/data-solicitor-contact/i.test(before)) return match;
    if (/tel:/i.test(before)) return match;
    return "criminal solicitors (see Contact)";
  });

  out = out.replace(FIRM_SMS_TEXT, (match, offset: number, full: string) => {
    const before = full.slice(Math.max(0, offset - 80), offset);
    if (/data-solicitor-contact/i.test(before)) return match;
    if (/sms:/i.test(before)) return match;
    return "solicitor SMS via Contact";
  });

  return out;
}

export { CONTACT_CTA_HTML };
