export const KNOWN_CASE_CITATIONS = ['R v Samuel [1988] QB 615', 'R v Samuel'];

export function findUnknownCaseCitations(text: string): string[] {
  const matches = text.match(/R v [A-Z][A-Za-z]+(?:\s+\[[^\]]+\])?/g) ?? [];
  const unknown: string[] = [];
  for (const m of matches) {
    const known = KNOWN_CASE_CITATIONS.some((k) => m.includes(k.replace(/^R v /, '')) || m.startsWith(k));
    if (!known && !unknown.includes(m)) unknown.push(m);
  }
  return unknown;
}
