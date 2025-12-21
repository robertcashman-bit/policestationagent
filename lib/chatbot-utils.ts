/**
 * Chatbot Utility Functions
 * Query processing, normalization, and search enhancements
 */

// Legal terminology synonyms for better matching
const LEGAL_SYNONYMS: Record<string, string[]> = {
  'police station': ['custody', 'police station', 'station', 'custody suite'],
  'arrested': ['arrest', 'detained', 'in custody', 'taken into custody'],
  'voluntary interview': ['voluntary', 'caution plus 3', 'interview under caution', 'voluntary attendance'],
  'legal aid': ['free legal advice', 'duty solicitor', 'legal aid', 'free solicitor'],
  'rights': ['rights', 'legal rights', 'entitlements', 'protections'],
  'solicitor': ['solicitor', 'lawyer', 'legal representative', 'duty solicitor', 'agent'],
  'representation': ['representation', 'legal representation', 'defence', 'legal defence'],
  'find out': ['find out', 'information', 'details', 'status', 'what happened', 'check', 'inquire', 'learn about', 'get information'],
  'someone': ['someone', 'person', 'family member', 'friend', 'relative', 'loved one', 'detainee', 'individual'],
  'custody': ['custody', 'in custody', 'arrested', 'detained', 'police station', 'custody suite'],
  'information': ['information', 'details', 'status', 'update', 'news', 'what happened'],
};

/**
 * Normalize query: lowercase, trim, remove extra spaces
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s-]/g, '');
}

/**
 * Extract key terms from query
 */
export function extractKeyTerms(query: string): string[] {
  const normalized = normalizeQuery(query);
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'when', 'where', 'who', 'why', 'how', 'i', 'want']);
  
  return normalized
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Expand query with synonyms
 */
export function expandQueryWithSynonyms(query: string): string[] {
  const normalized = normalizeQuery(query);
  const expanded = [normalized];
  
  for (const [term, synonyms] of Object.entries(LEGAL_SYNONYMS)) {
    if (normalized.includes(term)) {
      synonyms.forEach(synonym => {
        if (synonym !== term && !expanded.includes(synonym)) {
          expanded.push(synonym);
        }
      });
    }
  }
  
  return expanded;
}

/**
 * Enhanced search scoring with multiple factors
 */
export function calculateSearchScore(
  query: string,
  content: string,
  isTitle: boolean = false,
  isQuestion: boolean = false
): number {
  const lowerQuery = normalizeQuery(query);
  const lowerContent = content.toLowerCase();
  
  let score = 0;
  
  // Exact phrase match gets highest score
  if (lowerContent.includes(lowerQuery)) {
    score += isTitle ? 50 : isQuestion ? 30 : 20;
  }
  
  // Check for expanded synonyms
  const expanded = expandQueryWithSynonyms(query);
  expanded.forEach(expandedQuery => {
    if (lowerContent.includes(expandedQuery) && expandedQuery !== lowerQuery) {
      score += isTitle ? 15 : isQuestion ? 10 : 5;
    }
  });
  
  // Word-by-word matching
  const queryWords = extractKeyTerms(query);
  const contentWords = lowerContent.split(/\s+/);
  const matchedWords = queryWords.filter(word => 
    contentWords.some(cw => cw.includes(word) || word.includes(cw))
  );
  
  if (matchedWords.length > 0) {
    const matchRatio = matchedWords.length / queryWords.length;
    score += matchRatio * (isTitle ? 20 : isQuestion ? 15 : 10);
  }
  
  // Boost for legal terminology
  const legalTerms = Object.keys(LEGAL_SYNONYMS);
  legalTerms.forEach(term => {
    if (lowerQuery.includes(term) && lowerContent.includes(term)) {
      score += 5;
    }
  });
  
  // Reduce score for very long content (prefer concise answers)
  if (content.length > 1000) {
    score *= 0.9;
  }
  
  return score;
}

/**
 * Process query for better search results
 */
export function processQuery(query: string): {
  normalized: string;
  keyTerms: string[];
  expanded: string[];
} {
  return {
    normalized: normalizeQuery(query),
    keyTerms: extractKeyTerms(query),
    expanded: expandQueryWithSynonyms(query),
  };
}

