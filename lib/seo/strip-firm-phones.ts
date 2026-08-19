import { STATION_CONTACT_BUTTON } from "@/config/contact";

const PATHWAY_CTA_HTML = `<div class="flex flex-col sm:flex-row gap-2 justify-center my-2" data-solicitor-contact="true" data-nosnippet>
<a href="/start/voluntary-interview#request" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-blue-800 text-white hover:bg-blue-900">Request representation</a>
<a href="/current-custody" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-red-700 text-white hover:bg-red-800">Current custody check</a>
<a href="/for-solicitors" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-amber-500 text-slate-900 hover:bg-amber-400">Agency cover</a>
</div>`;

const CONTACT_CTA_HTML = `<a href="/contact" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-8 bg-white text-red-600 hover:bg-red-50" data-solicitor-contact="true" data-nosnippet>${STATION_CONTACT_BUTTON}</a>`;

const FIRM_TEL_HREF =
  /href=["']tel:(?:\+44)?0?1732[\s\-]?247[\s\-]?427["']/gi;
const FIRM_SMS_HREF =
  /href=["']sms:(?:\+44)?0?7535[\s\-]?494[\s\-]?446[^"']*["']/gi;
const FIRM_TEL_ANCHOR =
  /<a\b[^>]*href=["']tel:(?:\+44)?0?1732\s*247427["'][^>]*>[\s\S]*?<\/a>/gi;
const FIRM_SMS_ANCHOR =
  /<a\b[^>]*href=["']sms:(?:\+44)?0?7535\s*494446[^"']*["'][^>]*>[\s\S]*?<\/a>/gi;
const FIRM_PHONE_MARKUP =
  /<(?:strong|b|em|span)[^>]*>\s*(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427\s*<\/(?:strong|b|em|span)>/gi;
const FIRM_SMS_MARKUP =
  /<(?:strong|b|em|span)[^>]*>\s*(?:\+44\s*)?0?7535[\s\-]?494[\s\-]?446\s*<\/(?:strong|b|em|span)>/gi;
const FIRM_PHONE_TEXT =
  /(?:Call:?\s*|Text:?\s*|SMS:?\s*|Telephone:?\s*|Emergency Call:?\s*)?(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427/gi;
const FIRM_SMS_TEXT =
  /(?:Call:?\s*|Text:?\s*|SMS:?\s*|Telephone:?\s*)?(?:\+44\s*)?0?7535[\s\-]?494[\s\-]?446/gi;

/** Leftover plain-text labels from earlier strip passes (must not remain as fake “numbers”). */
const LEGACY_PATHWAY_LABEL_BLOB =
  /(?:use\s+)?Request representation(?:\s*,)?\s*Current custody check(?:\s*,)?\s*(?:or\s+)?Agency cover(?:\s*\(Contact pathways\))?/gi;
const LEGACY_SMS_PATHWAY_LABEL_BLOB =
  /(?:use\s+)?Current custody check(?:\s+or\s+|\s*,\s*)Request representation(?:\s*\(Contact pathways\))?/gi;

/** Plain-text stand-in — must NOT contain the CTA label sequence (avoids re-matching). */
const PATHWAY_PLAIN = "our Contact pathways";
const SMS_PATHWAY_PLAIN = "our Contact pathways";
const PATHWAY_INLINE_HTML = `<a href="/contact" class="font-semibold underline text-blue-800" data-solicitor-contact="true" data-nosnippet>Contact pathways</a>`;

/**
 * Strip firm voice/SMS digits from plain text (FAQ answers, meta, titles).
 */
export function stripFirmPhonePlainText(text: string): string {
  if (!text) return text;
  let out = text;
  // Clean leftover label blobs from earlier strip passes first
  out = out.replace(LEGACY_PATHWAY_LABEL_BLOB, PATHWAY_PLAIN);
  out = out.replace(LEGACY_SMS_PATHWAY_LABEL_BLOB, SMS_PATHWAY_PLAIN);
  out = out.replace(
    /Call\s+(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427\s+for current custody or a booked voluntary interview\.?/gi,
    "Use Current custody check if someone is detained now, or Request representation for a booked voluntary interview.",
  );
  out = out.replace(
    /Call\s+(?:\+44\s*)?0?1732[\s\-]?247[\s\-]?427\s+before your interview date[^.]+\.?/gi,
    "Use Request representation before your interview date with the time, date, and station details.",
  );
  out = out.replace(
    /Text\s+(?:\+44\s*)?0?7535[\s\-]?494[\s\-]?446[^.]*\.?/gi,
    "Use Current custody check with the detainee's details if you cannot use the voluntary pathway.",
  );
  out = out.replace(FIRM_PHONE_TEXT, PATHWAY_PLAIN);
  out = out.replace(FIRM_SMS_TEXT, SMS_PATHWAY_PLAIN);
  out = out.replace(/\s{2,}/g, " ").trim();
  return out;
}

/**
 * Replace firm voice/SMS digits and tel:/sms: CTAs with pathway or /contact links.
 */
export function stripFirmPhonesToContact(html: string, mode: "pathways" | "contact" = "pathways"): string {
  if (!html) return html;

  const replacement = mode === "contact" ? CONTACT_CTA_HTML : PATHWAY_CTA_HTML;
  let out = html;

  out = out.replace(FIRM_TEL_ANCHOR, () => replacement);
  out = out.replace(FIRM_SMS_ANCHOR, () => replacement);
  out = out.replace(
    FIRM_TEL_HREF,
    'href="/contact" data-solicitor-contact="true" data-nosnippet',
  );
  out = out.replace(
    FIRM_SMS_HREF,
    'href="/contact" data-solicitor-contact="true" data-nosnippet',
  );

  // Standalone marked-up digits → pathway CTA buttons (not button-label prose)
  out = out.replace(FIRM_PHONE_MARKUP, () => replacement);
  out = out.replace(FIRM_SMS_MARKUP, () => replacement);

  out = out.replace(FIRM_PHONE_TEXT, (match, offset: number, full: string) => {
    const before = full.slice(Math.max(0, offset - 80), offset);
    if (/data-solicitor-contact/i.test(before)) return match;
    if (/tel:/i.test(before)) return match;
    // Inside a large display paragraph (typical scraped “big number” blocks) → CTA row
    const nearbyOpen = before.lastIndexOf("<");
    const nearbyTag = nearbyOpen >= 0 ? before.slice(nearbyOpen) : "";
    if (/<(?:p|div|h[1-6]|td|li|span)\b[^>]*(?:text-(?:2xl|3xl|4xl|5xl)|font-(?:black|bold))/i.test(nearbyTag)) {
      return replacement;
    }
    return PATHWAY_INLINE_HTML;
  });

  out = out.replace(FIRM_SMS_TEXT, (match, offset: number, full: string) => {
    const before = full.slice(Math.max(0, offset - 80), offset);
    if (/data-solicitor-contact/i.test(before)) return match;
    if (/sms:/i.test(before)) return match;
    const nearbyOpen = before.lastIndexOf("<");
    const nearbyTag = nearbyOpen >= 0 ? before.slice(nearbyOpen) : "";
    if (/<(?:p|div|h[1-6]|td|li|span)\b[^>]*(?:text-(?:2xl|3xl|4xl|5xl)|font-(?:black|bold))/i.test(nearbyTag)) {
      return replacement;
    }
    return PATHWAY_INLINE_HTML;
  });

  // Soften telephone "free advice" CTAs in scraped blobs
  out = out.replace(/Call for free advice/gi, "Request police-station Legal Aid representation");
  out = out.replace(/Call for Advice:/gi, "Request representation:");
  out = out.replace(/Call Now/gi, "Get a solicitor");
  out = out.replace(/Emergency Call:/gi, "Legal representation enquiries:");
  out = out.replace(/Call our extended hours Emergency Line/gi, "Use the current-custody qualification");

  // Clean leftover label prose from earlier strip passes
  out = out.replace(LEGACY_PATHWAY_LABEL_BLOB, () =>
    mode === "pathways" ? PATHWAY_CTA_HTML : PATHWAY_INLINE_HTML,
  );
  out = out.replace(LEGACY_SMS_PATHWAY_LABEL_BLOB, () =>
    mode === "pathways" ? PATHWAY_CTA_HTML : PATHWAY_INLINE_HTML,
  );
  out = out.replace(
    /Telephone\s+(?:use\s+)?(?:the\s+)?Contact pathways/gi,
    "Use the Contact pathways",
  );
  out = out.replace(
    /Call\s+(?:use\s+)?(?:the\s+)?Contact pathways/gi,
    "Use the Contact pathways",
  );
  out = out.replace(
    /(?:Call|Text)\s+use Current custody/gi,
    "Use Current custody",
  );
  out = out.replace(
    /Telephone\s+use Request representation/gi,
    "Use Request representation",
  );
  out = out.replace(
    /Call\s+use Request representation/gi,
    "Use Request representation",
  );

  return out;
}

export { CONTACT_CTA_HTML, PATHWAY_CTA_HTML };
