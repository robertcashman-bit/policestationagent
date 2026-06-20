import { afterEach, describe, expect, it } from 'vitest';
import { countyAllowedForDiscovery } from '@/lib/firm-outreach/discovery/run-discovery';
import { countyAllowlist } from '@/lib/firm-outreach/constants';

describe('discovery county scope', () => {
  const envBackup = { ...process.env };

  afterEach(() => {
    process.env = { ...envBackup };
  });

  it('includes all counties by default (national scope)', () => {
    delete process.env.FIRM_OUTREACH_COUNTY_ALLOWLIST;
    expect(countyAllowlist()).toBeNull();
    expect(countyAllowedForDiscovery('Greater Manchester')).toBe(true);
    expect(countyAllowedForDiscovery('Kent')).toBe(true);
    expect(countyAllowedForDiscovery('West Yorkshire')).toBe(true);
  });

  it('honours FIRM_OUTREACH_COUNTY_ALLOWLIST when set', () => {
    process.env.FIRM_OUTREACH_COUNTY_ALLOWLIST = 'kent,surrey';
    expect(countyAllowlist()).toEqual(['kent', 'surrey']);
    expect(countyAllowedForDiscovery('Kent')).toBe(true);
    expect(countyAllowedForDiscovery('Surrey')).toBe(true);
    expect(countyAllowedForDiscovery('Greater Manchester')).toBe(false);
  });
});
