/** Police Confusion Score — on-page signals that search engines may treat us as the police. */

export type ConfusionFlag =
  | "title_police_entity"
  | "h1_police_entity"
  | "meta_call_near_station"
  | "schema_telephone_on_station_address"
  | "phone_under_station_facts"
  | "missing_not_police"
  | "police_intent_dominant"
  | "opening_starts_with_call"
  | "title_contains_firm_phone"
  | "sms_near_station"
  | "misleading_call_cta"
  | "alt_associates_with_police"
  | "notice_missing_before_number"
  | "snippet_reads_as_police_contact";

export interface PageSignals {
  path: string;
  title?: string;
  h1?: string;
  metaDescription?: string;
  openingParagraph?: string;
  bodyText?: string;
  jsonLd?: string;
  html?: string;
  imageAlts?: string;
}

export interface ConfusionResult {
  path: string;
  score: number;
  policeIntent: number;
  legalIntent: number;
  flags: ConfusionFlag[];
  recommendations: string[];
  snippetCandidate?: string;
}

const POLICE_INTENT = [
  "police station number",
  "kent police",
  "call 101",
  "report a crime",
  "custody telephone",
  "police switchboard",
  "contact police",
  "official police",
];

const LEGAL_INTENT = [
  "solicitor",
  "criminal defence",
  "legal representation",
  "legal aid",
  "duty solicitor",
  "independent",
  "not the police",
  "not kent police",
  "voluntary interview",
];

export const FIRM_PHONE_RE = /01732\s*247427|\+441732247427|tel:01732247427/i;
export const FIRM_SMS_RE = /07535\s*494446|\+447535494446|sms:07535494446/i;

export function scorePageConfusion(signals: PageSignals): ConfusionResult {
  const flags: ConfusionFlag[] = [];
  const recommendations: string[] = [];
  let score = 0;

  const title = signals.title || "";
  const h1 = signals.h1 || "";
  const meta = signals.metaDescription || "";
  const opening = signals.openingParagraph || "";
  const body = signals.bodyText || signals.html || "";
  const jsonLd = signals.jsonLd || "";
  const alts = signals.imageAlts || "";
  const combined = `${title}\n${h1}\n${meta}\n${opening}\n${body}`.toLowerCase();

  const policeIntent = countMatches(combined, POLICE_INTENT);
  const legalIntent = countMatches(combined, LEGAL_INTENT);

  const snippetCandidate = buildSnippetCandidate(signals);

  if (FIRM_PHONE_RE.test(title) || FIRM_SMS_RE.test(title)) {
    flags.push("title_contains_firm_phone");
    score += 40;
    recommendations.push("Remove private solicitor numbers from page titles");
  }

  if (/^kent police stations?$/i.test(h1.trim()) || /^[a-z\s]+ police station$/i.test(h1.trim())) {
    flags.push("h1_police_entity");
    score += 25;
    recommendations.push("Rewrite H1 to include Information / Independent Guide / Legal Representation");
  }

  if (
    /kent police stations?/i.test(title) &&
    !/independent|solicitor|defence|information|guide/i.test(title)
  ) {
    flags.push("title_police_entity");
    score += 20;
    recommendations.push("Title should lead with independent solicitor framing");
  }

  if (
    (FIRM_PHONE_RE.test(meta) || /call\s*01732/i.test(meta)) &&
    /police station|address|located at|custody|tonbridge|gravesend|maidstone/i.test(meta)
  ) {
    flags.push("meta_call_near_station");
    score += 25;
    recommendations.push("Remove Call 01732 from meta descriptions that mention station/town/custody");
  }

  if (
    /"@type"\s*:\s*"LocalBusiness"/i.test(jsonLd) &&
    FIRM_PHONE_RE.test(jsonLd) &&
    /streetAddress|openingHours/i.test(jsonLd)
  ) {
    flags.push("schema_telephone_on_station_address");
    score += 35;
    recommendations.push("Never put firm telephone on LocalBusiness with station streetAddress");
  }

  if (/"@type"\s*:\s*"PoliceStation"/i.test(jsonLd) || /"@type"\s*:\s*"GovernmentOrganization"/i.test(jsonLd)) {
    flags.push("schema_telephone_on_station_address");
    score += 40;
    recommendations.push("Do not publish PoliceStation or GovernmentOrganization schema owned by this site");
  }

  if (hasPhoneUnderStationFacts(signals.html || body)) {
    flags.push("phone_under_station_facts");
    score += 25;
    recommendations.push("Move solicitor phone under Need a solicitor / Independent legal advice");
  }

  if (FIRM_SMS_RE.test(body) && /Police Station Details|Station Details|Get Directions/i.test(body)) {
    flags.push("sms_near_station");
    score += 20;
    recommendations.push("Do not publish SMS digits beside station address blocks");
  }

  if (
    />(Call now|Contact the station|Station contact|Tonbridge telephone)</i.test(signals.html || "") ||
    (/Call now/i.test(h1) && /police station/i.test(h1))
  ) {
    flags.push("misleading_call_cta");
    score += 15;
    recommendations.push("Rename CTAs to solicitor-focused wording");
  }

  if (/police contact|station telephone|kent police number/i.test(alts)) {
    flags.push("alt_associates_with_police");
    score += 15;
    recommendations.push("Rewrite image alt text to solicitor representation framing");
  }

  if (
    (FIRM_PHONE_RE.test(body) || FIRM_SMS_RE.test(body)) &&
    !/not (kent )?police|independent (criminal|legal|defence)/i.test(combined)
  ) {
    flags.push("notice_missing_before_number");
    score += 20;
    recommendations.push("Add explicit NOT the police notice before private numbers");
  }

  if (!/not (kent )?police|independent (criminal|legal|defence)/i.test(combined)) {
    flags.push("missing_not_police");
    score += 15;
    recommendations.push("Add explicit NOT the police / independent solicitor disclaimer");
  }

  if (/^\s*call\s*01732/i.test(opening.trim())) {
    flags.push("opening_starts_with_call");
    score += 15;
    recommendations.push("Opening paragraph must not begin with Call 01732");
  }

  if (snippetReadsAsPoliceContact(snippetCandidate)) {
    flags.push("snippet_reads_as_police_contact");
    score += 30;
    recommendations.push("Rewrite title/meta/H1 so snippets cannot read as police contact numbers");
  }

  if (policeIntent > legalIntent && policeIntent > 0) {
    flags.push("police_intent_dominant");
    score += 10;
    recommendations.push("Increase legal-intent language (solicitor, Legal Aid, independent)");
  }

  return {
    path: signals.path,
    score: Math.min(100, score),
    policeIntent,
    legalIntent,
    flags,
    recommendations,
    snippetCandidate,
  };
}

export function buildSnippetCandidate(signals: PageSignals): string {
  const parts = [
    signals.title || "",
    signals.metaDescription || "",
    signals.h1 || "",
    (signals.openingParagraph || "").slice(0, 200),
  ];
  return parts.filter(Boolean).join(" — ").replace(/\s+/g, " ").trim();
}

export function snippetReadsAsPoliceContact(snippet: string): boolean {
  if (!snippet) return false;
  const hasFirmNumber = FIRM_PHONE_RE.test(snippet) || FIRM_SMS_RE.test(snippet) || /call\s*01732/i.test(snippet);
  if (!hasFirmNumber) return false;
  const hasPoliceEntity =
    /police station|kent police|custody (suite|number|telephone)|station (phone|telephone|contact|number)/i.test(
      snippet,
    );
  const hasSolicitorClear =
    /independent solicitor|criminal defence solicitor|not (kent )?police|legal (advice|representation)/i.test(
      snippet,
    );
  return hasPoliceEntity && !hasSolicitorClear;
}

function countMatches(text: string, phrases: string[]): number {
  let n = 0;
  for (const p of phrases) {
    if (text.includes(p)) n += 1;
  }
  return n;
}

function hasPhoneUnderStationFacts(html: string): boolean {
  if (!FIRM_PHONE_RE.test(html)) return false;
  const stationIdx = html.search(/Police Station Details|Station Details|Get Directions/i);
  if (stationIdx === -1) return false;
  const window = html.slice(stationIdx, stationIdx + 1800);
  const hasPhone = FIRM_PHONE_RE.test(window);
  const hasSolicitorHeading = /Need a solicitor|Independent legal advice|Criminal Defence|Independent solicitor contact/i.test(
    window,
  );
  return hasPhone && !hasSolicitorHeading;
}

export const CONFUSION_THRESHOLD = 40;
