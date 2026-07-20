/** Police Confusion Score — on-page signals that search engines may treat us as the police. */

export type ConfusionFlag =
  | "title_police_entity"
  | "h1_police_entity"
  | "meta_call_near_station"
  | "schema_telephone_on_station_address"
  | "phone_under_station_facts"
  | "missing_not_police"
  | "police_intent_dominant"
  | "opening_starts_with_call";

export interface PageSignals {
  path: string;
  title?: string;
  h1?: string;
  metaDescription?: string;
  openingParagraph?: string;
  bodyText?: string;
  jsonLd?: string;
  html?: string;
}

export interface ConfusionResult {
  path: string;
  score: number;
  policeIntent: number;
  legalIntent: number;
  flags: ConfusionFlag[];
  recommendations: string[];
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

const FIRM_PHONE = /01732\s*247427|\+441732247427|tel:01732247427/i;

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
  const combined = `${title}\n${h1}\n${meta}\n${opening}\n${body}`.toLowerCase();

  const policeIntent = countMatches(combined, POLICE_INTENT);
  const legalIntent = countMatches(combined, LEGAL_INTENT);

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

  if (/call\s*01732/i.test(meta) && /police station|address|located at/i.test(meta)) {
    flags.push("meta_call_near_station");
    score += 20;
    recommendations.push("Remove Call 01732 from meta descriptions that mention station address");
  }

  if (
    /"@type"\s*:\s*"LocalBusiness"/i.test(jsonLd) &&
    FIRM_PHONE.test(jsonLd) &&
    /streetAddress|openingHours/i.test(jsonLd)
  ) {
    flags.push("schema_telephone_on_station_address");
    score += 35;
    recommendations.push("Never put firm telephone on LocalBusiness with station streetAddress");
  }

  if (hasPhoneUnderStationFacts(signals.html || body)) {
    flags.push("phone_under_station_facts");
    score += 25;
    recommendations.push("Move solicitor phone under Need a solicitor / Independent legal advice");
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
  };
}

function countMatches(text: string, phrases: string[]): number {
  let n = 0;
  for (const p of phrases) {
    if (text.includes(p)) n += 1;
  }
  return n;
}

function hasPhoneUnderStationFacts(html: string): boolean {
  if (!FIRM_PHONE.test(html)) return false;
  const stationIdx = html.search(/Police Station Details|Station Details|Get Directions/i);
  if (stationIdx === -1) return false;
  const window = html.slice(stationIdx, stationIdx + 1800);
  const hasPhone = FIRM_PHONE.test(window);
  const hasSolicitorHeading = /Need a solicitor|Independent legal advice|Criminal Defence/i.test(
    window,
  );
  return hasPhone && !hasSolicitorHeading;
}

export const CONFUSION_THRESHOLD = 40;
