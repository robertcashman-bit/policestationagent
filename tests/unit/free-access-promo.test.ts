import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  freeAccessEndsLabel,
  hasTrainingAccess,
  isFreeAccessPeriodActive,
} from '../../lib/free-access-promo.ts';

const saved: Record<string, string | undefined> = {};

beforeEach(() => {
  saved.FREE_ACCESS_ENABLED = process.env.FREE_ACCESS_ENABLED;
  saved.FREE_ACCESS_UNTIL = process.env.FREE_ACCESS_UNTIL;
});

afterEach(() => {
  if (saved.FREE_ACCESS_ENABLED === undefined) delete process.env.FREE_ACCESS_ENABLED;
  else process.env.FREE_ACCESS_ENABLED = saved.FREE_ACCESS_ENABLED;
  if (saved.FREE_ACCESS_UNTIL === undefined) delete process.env.FREE_ACCESS_UNTIL;
  else process.env.FREE_ACCESS_UNTIL = saved.FREE_ACCESS_UNTIL;
});

describe('free-access-promo', () => {
  test('disabled when FREE_ACCESS_ENABLED is not true', () => {
    process.env.FREE_ACCESS_ENABLED = 'false';
    process.env.FREE_ACCESS_UNTIL = '2099-01-01';
    expect(isFreeAccessPeriodActive()).toBe(false);
    expect(hasTrainingAccess({ subscriptionActive: false, isAdmin: false })).toBe(false);
  });

  test('active when enabled with no end date', () => {
    process.env.FREE_ACCESS_ENABLED = 'true';
    delete process.env.FREE_ACCESS_UNTIL;
    expect(isFreeAccessPeriodActive()).toBe(true);
    expect(hasTrainingAccess({ subscriptionActive: false, isAdmin: false })).toBe(true);
  });

  test('admin always has access', () => {
    process.env.FREE_ACCESS_ENABLED = 'false';
    expect(hasTrainingAccess({ subscriptionActive: false, isAdmin: true })).toBe(true);
  });

  test('freeAccessEndsLabel formats end date', () => {
    process.env.FREE_ACCESS_UNTIL = '2026-07-01';
    const label = freeAccessEndsLabel();
    expect(label?.includes('2026')).toBeTruthy();
  });
});
