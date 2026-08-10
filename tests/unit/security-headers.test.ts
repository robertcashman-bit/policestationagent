import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const configSrc = readFileSync(join(process.cwd(), 'next.config.mjs'), 'utf-8');

const REQUIRED_HEADERS = [
  'X-Frame-Options',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Strict-Transport-Security',
  'Content-Security-Policy',
];

describe('security headers regression', () => {
  test('next.config.mjs includes all required security header keys', () => {
    for (const header of REQUIRED_HEADERS) {
      expect(configSrc, `${header} not found`).toContain(header);
    }
  });

  test('CSP includes default-src', () => {
    expect(configSrc).toContain('default-src');
  });

  test('HSTS has max-age', () => {
    expect(configSrc).toMatch(/max-age=\d+/);
  });
});

describe('JSON-LD structured data', () => {
  test('SiteJsonLd includes EducationalOrganization type', () => {
    const src = readFileSync(join(process.cwd(), 'components/SiteJsonLd.tsx'), 'utf-8');
    expect(src).toContain('EducationalOrganization');
  });

  test('SiteJsonLd includes Course type', () => {
    const src = readFileSync(join(process.cwd(), 'components/SiteJsonLd.tsx'), 'utf-8');
    expect(src).toContain('Course');
  });

  test('layout renders SiteJsonLd', () => {
    const src = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf-8');
    expect(src).toContain('<SiteJsonLd');
  });
});
