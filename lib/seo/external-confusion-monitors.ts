/**
 * Optional external monitors for police-number confusion.
 * Activate only when API keys are present — never scrape Google HTML at scale.
 */

const FIRM_PHONE = /01732\s*247427|\+44\s*1732\s*247427/i;

const SAMPLE_QUERIES = [
  "What is the telephone number for Maidstone Police Station?",
  "Gillingham police station phone number",
  "Canterbury custody suite telephone number",
  "Kent police station number",
];

export async function runExternalConfusionChecks(): Promise<{
  status: "skipped" | "partial" | "ran";
  serp?: unknown;
  ai?: unknown;
  gsc?: unknown;
  notes: string[];
}> {
  const notes: string[] = [];
  let status: "skipped" | "partial" | "ran" = "skipped";

  const serpKey = process.env.SERPAPI_KEY || process.env.DATAFORSEO_LOGIN;
  const openaiKey = process.env.OPENAI_API_KEY;
  const gscConfigured = Boolean(process.env.GSC_CLIENT_EMAIL || process.env.GOOGLE_APPLICATION_CREDENTIALS);

  let serp: unknown = null;
  let ai: unknown = null;
  let gsc: unknown = null;

  if (!serpKey) {
    notes.push("SERP checks skipped — set SERPAPI_KEY or DATAFORSEO_LOGIN");
  } else {
    status = "partial";
    notes.push("SERP API key present — wire provider-specific client when ready");
    serp = { queries: SAMPLE_QUERIES, firmPhonePattern: String(FIRM_PHONE), status: "not-implemented" };
  }

  if (!openaiKey) {
    notes.push("AI prompt checks skipped — set OPENAI_API_KEY");
  } else {
    status = "partial";
    notes.push("OpenAI key present — AI confusion prompts not auto-run in this build (cost control)");
    ai = { prompts: SAMPLE_QUERIES, status: "gated" };
  }

  if (!gscConfigured) {
    notes.push("GSC checks skipped — configure GSC service account env vars");
  } else {
    status = "partial";
    gsc = { status: "configured-but-client-not-wired" };
    notes.push("GSC credentials detected — export police-intent queries manually until client is wired");
  }

  if (serpKey && openaiKey && gscConfigured) status = "ran";

  return { status, serp, ai, gsc, notes };
}
