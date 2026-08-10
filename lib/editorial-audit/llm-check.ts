import OpenAI from 'openai';
import { estimateLlmCostUsd, getAuditConfig } from './config';
import type { AuditFinding, AuditUnit } from './types';

export type LlmCheckResult = {
  findings: AuditFinding[];
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
};

function llmKindAllowed(unit: AuditUnit): boolean {
  const cfg = getAuditConfig();
  if (unit.kind.startsWith('guide')) return cfg.llmOnKinds.has('guide');
  if (unit.kind === 'legal-advice') return cfg.llmOnKinds.has('legal-advice');
  return false;
}

export function shouldRunLlm(
  unit: AuditUnit,
  ruleFindings: AuditFinding[],
  callsThisRun: number,
  state: { llm_calls_this_month: number; estimated_spend_usd: number },
): boolean {
  const cfg = getAuditConfig();
  if (!process.env.OPENAI_API_KEY?.trim()) return false;
  if (!unit.llmEligible || !llmKindAllowed(unit)) return false;
  if (!unit.text?.trim()) return false;
  if (callsThisRun >= cfg.llmMaxCallsPerRun) return false;
  if (state.llm_calls_this_month >= cfg.llmMonthlyCallCap) return false;
  if (state.estimated_spend_usd >= cfg.openAiSoftCapUsd) return false;
  if (cfg.llmMode === 'rules_flagged_only' && ruleFindings.length === 0) return false;
  return true;
}

export async function runLlmFactCheck(unit: AuditUnit): Promise<LlmCheckResult> {
  const cfg = getAuditConfig();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const text = (unit.text ?? '').slice(0, cfg.llmMaxInputChars);

  const completion = await openai.chat.completions.create({
    model: cfg.llmModel,
    max_tokens: cfg.llmMaxOutputTokens,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You audit UK police station / PSRAS training content for factual accuracy. Return JSON: {"verdict":"PASS"|"REVIEW"|"FAIL","issues":[{"claim":"...","reason":"...","suggested_fix":"..."}]}. Never invent sources. If unsure, use REVIEW.',
      },
      {
        role: 'user',
        content: `Content type: ${unit.kind}\nURL: ${unit.url ?? unit.id}\n\n${text}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? '{}';
  const inputTokens = completion.usage?.prompt_tokens ?? 0;
  const outputTokens = completion.usage?.completion_tokens ?? 0;
  const findings: AuditFinding[] = [];

  try {
    const parsed = JSON.parse(raw) as {
      verdict?: string;
      issues?: { claim?: string; reason?: string; suggested_fix?: string }[];
    };
    const issues = parsed.issues ?? [];
    for (const issue of issues) {
      findings.push({
        severity: parsed.verdict === 'FAIL' ? 'fail' : 'review',
        category: 'llm-fact-check',
        message: [issue.claim, issue.reason].filter(Boolean).join(' — '),
        location: unit.url ?? unit.id,
        metadata: { suggested_fix: issue.suggested_fix },
      });
    }
    if (issues.length === 0 && parsed.verdict && parsed.verdict !== 'PASS') {
      findings.push({
        severity: parsed.verdict === 'FAIL' ? 'fail' : 'review',
        category: 'llm-fact-check',
        message: `LLM verdict: ${parsed.verdict}`,
        location: unit.url ?? unit.id,
      });
    }
  } catch {
    findings.push({
      severity: 'review',
      category: 'llm-fact-check',
      message: 'LLM returned unparseable response',
      location: unit.url ?? unit.id,
    });
  }

  return { findings, inputTokens, outputTokens, costUsd: estimateLlmCostUsd(inputTokens, outputTokens) };
}
