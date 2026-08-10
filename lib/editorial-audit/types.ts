export type AuditUnitKind =
  | 'guide-section'
  | 'guide-faq'
  | 'guide-summary'
  | 'legal-advice'
  | 'marketing-page'
  | 'question-batch'
  | 'cit-scenario'
  | 'live-url';

export type AuditSeverity = 'info' | 'review' | 'fail' | 'auto_fixed';

export type AuditFinding = {
  severity: AuditSeverity;
  category: string;
  message: string;
  location?: string;
  metadata?: Record<string, unknown>;
};

export type AuditUnit = {
  id: string;
  kind: AuditUnitKind;
  label: string;
  url?: string;
  sourcePath?: string;
  text?: string;
  llmEligible: boolean;
  meta?: Record<string, unknown>;
};

export type AuditRunResult = {
  unitsChecked: number;
  findings: AuditFinding[];
  approvedUnits: string[];
  llmCalls: number;
  autoFixedDb: number;
  prUrl?: string;
  cursorBefore: number;
  cursorAfter: number;
  totalUnits: number;
  batchLabels: string[];
};
