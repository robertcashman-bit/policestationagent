/**
 * JSON-LD structured data presence check.
 *
 * Verifies that the root layout includes the required JSON-LD schema types
 * without needing to render the full React tree.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const layoutSrc = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf-8');

describe('JSON-LD structured data', () => {
  it('root layout contains application/ld+json script tag', () => {
    expect(layoutSrc).toContain('application/ld+json');
  });

  it('schema includes LegalService @type', () => {
    expect(layoutSrc).toContain('"LegalService"');
  });

  it('schema uses @context https://schema.org', () => {
    expect(layoutSrc).toContain('https://schema.org');
  });

  it('schema is defined as a JavaScript constant', () => {
    expect(layoutSrc).toMatch(/const\s+\w+Schema\s*=/);
  });
});
