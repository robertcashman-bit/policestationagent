/**
 * COMPLIANCE COPY NORMALIZATION
 *
 * Centralized copy normalization to prevent non-compliant marketing language
 * and ensure consistent attribution to Tuckers Solicitors LLP.
 */

export interface BannedPatternMatch {
  patternId: string;
  excerpt: string;
  lineNumber?: number;
}

export interface NormalizationResult {
  normalized: string;
  matches: BannedPatternMatch[];
}

/**
 * BANNED PATTERNS WITH REPLACEMENTS
 */
export const BANNED_PATTERNS = [
  {
    id: "strapline-kent-representation",
    pattern: /free\s+police\s+station\s+representation\s+across\s+kent/gi,
    replacement: "Kent police station legal advice (Legal Aid) — via Tuckers Solicitors LLP",
    description: "Strapline variant claiming free representation across Kent",
  },
  {
    id: "forty-five-minutes",
    pattern: /(?:available\s+)?within\s+45\s+minutes|attend\s+within\s+45\s+minutes/gi,
    replacement:
      "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
    description: "45 minute SLA claims",
  },
  {
    id: "twenty-four-seven-representation",
    pattern: /24\/7.*?(?:representation|legal\s+services|immediate(?:\s+representation)?)/gi,
    replacement:
      "We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor.",
    description: "24/7 immediate representation claims",
  },
  {
    id: "guaranteed-representation",
    pattern: /(?:guaranteed|you\s+are\s+guaranteed\s+to\s+be\s+represented\s+by)/gi,
    replacement:
      "Where possible, you may be represented by Robert Cashman, subject to availability and conflicts. If Robert cannot attend, Tuckers will arrange an alternative suitably qualified representative.",
    description: "Guarantee language",
  },
  {
    id: "we-provide-urgent-attendance",
    pattern: /we\s+provide\s+urgent\s+attendance/gi,
    replacement:
      "If you request Tuckers Solicitors LLP, arrangements for attendance will be made in accordance with scheme requirements and solicitor availability.",
    description: "We provide urgent attendance claims",
  },
  {
    id: "we-provide-representation",
    // Match full clause so we do not leave a leading "We" or dangling "at …"
    pattern:
      /we\s+provide\s+representation(?:\s+at\s+all\s+police\s+stations(?:\s+and\s+custody\s+suites)?(?:\s+across\s+Kent(?:\s*(?:&|and)\s*Medway)?)?)?/gi,
    replacement:
      "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795) at police stations and custody suites across Kent and Medway",
    description: "We provide representation claims",
  },
  {
    id: "broken-we-legal-services-splice",
    pattern:
      /We\s+Legal\s+services\s+are\s+provided\s+by\s+Tuckers\s+Solicitors\s+LLP\s+\(SRA\s+ID:\s*127795\)\.\s*/g,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795) ",
    description: "Cleanup for prior bad compliance splice leaving 'We Legal services…'",
  },
  {
    id: "our-advice-representation",
    pattern: /our\s+advice\s+and\s+representation/gi,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795)",
    description: "Our advice and representation claims",
  },
  {
    id: "subject-to-eligibility",
    pattern:
      /subject\s+to\s+eligibility\s+(?:and\s+)?(?:availability\s+)?(?:re\s+)?(?:police\s+station\s+advice)?/gi,
    replacement:
      "Police station legal advice is free and independent. You can ask custody staff to contact a solicitor or law firm. For Kent matters, you can request Tuckers Solicitors LLP and may request Robert Cashman as your named solicitor, subject to availability and conflicts.",
    description: "Inconsistent Legal Aid eligibility messaging",
  },
  {
    id: "police-station-agent-provides-services",
    pattern:
      /(?:policestationagent\.com|Police\s+Station\s+Agent)\s+provides.*?legal\s+services.*?(?:across\s+Kent|and\s+the\s+UK)/gi,
    replacement:
      "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795). This website is operated by Defence Legal Services Ltd t/a Police Station Agent and provides general information; it does not itself provide legal services.",
    description: "Website operator providing services claim",
  },
  {
    id: "ask-for-police-station-agent",
    pattern:
      /(?:ask\s+for|tell.*?you\s+want|request)\s+["']?(?:Police\s+Station\s+Agent|policestationagent)["']?\s+to\s+(?:represent|attend)/gi,
    replacement:
      "Tell custody staff you want Tuckers Solicitors LLP. You may request Robert Cashman as your named solicitor, subject to availability and conflicts.",
    description: "Instructions to ask for Police Station Agent",
  },
];

/**
 * Scan text for banned patterns
 */
export function scanTextForBanned(input: string): BannedPatternMatch[] {
  const matches: BannedPatternMatch[] = [];
  const lines = input.split("\n");

  BANNED_PATTERNS.forEach(({ id, pattern, description }) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    const match = regex.exec(input);
    if (match) {
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      matches.push({
        patternId: id,
        excerpt: match[0].substring(0, 100),
        lineNumber: lineNumber >= 0 ? lineNumber + 1 : undefined,
      });
    }
  });

  return matches;
}

/**
 * Normalize plain text copy
 */
export function normalizeCopy(input: string): string {
  let normalized = input;

  BANNED_PATTERNS.forEach(({ pattern, replacement }) => {
    normalized = normalized.replace(pattern, replacement);
  });

  return normalized;
}

/**
 * Normalize HTML content (safe string transforms only)
 * Preserves HTML structure, only replaces text content
 */
export function normalizeHtml(html: string): string {
  let normalized = html;

  BANNED_PATTERNS.forEach(({ pattern, replacement }) => {
    // Replace in text nodes only (between > and <)
    normalized = normalized.replace(pattern, (match, offset) => {
      // Check if we're inside a tag (between < and >)
      const before = normalized.substring(0, offset);
      const lastOpenTag = before.lastIndexOf("<");
      const lastCloseTag = before.lastIndexOf(">");

      // If last tag is an open tag, we're inside HTML, skip
      if (lastOpenTag > lastCloseTag) {
        return match;
      }

      return replacement;
    });
  });

  return normalized;
}

/**
 * Normalize with result tracking
 */
export function normalizeCopyWithResults(input: string): NormalizationResult {
  const matches = scanTextForBanned(input);
  const normalized = normalizeCopy(input);

  return {
    normalized,
    matches,
  };
}

/**
 * Check if text contains any banned patterns (boolean check)
 */
export function containsBannedPatterns(input: string): boolean {
  return BANNED_PATTERNS.some(({ pattern }) => pattern.test(input));
}
