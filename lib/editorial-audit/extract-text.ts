/** Rough plain text from TSX source for rule scanning. */
export function extractTextFromTsx(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    .replace(/export\s+const\s+metadata[\s\S]*?;\n?/g, '')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/['"`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
