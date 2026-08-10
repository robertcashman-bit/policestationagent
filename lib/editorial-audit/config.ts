import { cleanEnvValue } from '@/lib/env';

function intEnv(name: string, fallback: number): number {
  const raw = cleanEnvValue(process.env[name]);
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function floatEnv(name: string, fallback: number): number {
  const raw = cleanEnvValue(process.env[name]);
  const n = parseFloat(raw);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function getAuditConfig() {
  const llmOn = cleanEnvValue(process.env.AUDIT_LLM_ON)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    emailTo:
      cleanEnvValue(process.env.AUDIT_EMAIL_TO) ||
      cleanEnvValue(process.env.CONTACT_EMAIL_TO) ||
      'robertdavidcashman@gmail.com',
    emailOnClean: cleanEnvValue(process.env.AUDIT_EMAIL_ON_CLEAN).toLowerCase() !== 'false',
    batchSize: intEnv('AUDIT_BATCH_SIZE', 12),
    llmMaxCallsPerRun: intEnv('AUDIT_LLM_MAX_CALLS', 2),
    llmMonthlyCallCap: intEnv('AUDIT_LLM_MONTHLY_CALL_CAP', 60),
    llmModel: cleanEnvValue(process.env.AUDIT_LLM_MODEL) || 'gpt-4o-mini',
    llmMode: cleanEnvValue(process.env.AUDIT_LLM_MODE) || 'rules_flagged_only',
    llmOnKinds: new Set(llmOn.length ? llmOn : ['guide', 'legal-advice']),
    llmMaxInputChars: intEnv('AUDIT_LLM_MAX_INPUT_CHARS', 6000),
    llmMaxOutputTokens: intEnv('AUDIT_LLM_MAX_OUTPUT_TOKENS', 512),
    openAiSoftCapUsd: floatEnv('AUDIT_OPENAI_SOFT_CAP_USD', 3),
    githubRepo: cleanEnvValue(process.env.GITHUB_REPO) || 'robertcashman-bit/pstrain-rebuild',
    githubToken: cleanEnvValue(process.env.GITHUB_TOKEN),
    siteUrl: cleanEnvValue(process.env.NEXT_PUBLIC_SITE_URL) || 'https://psrtrain.com',
    questionBatchSize: 10,
    estimatedQuestionBatches: 30,
  };
}

export function estimateLlmCostUsd(inputTokens: number, outputTokens: number): number {
  return (inputTokens / 1_000_000) * 0.15 + (outputTokens / 1_000_000) * 0.6;
}
