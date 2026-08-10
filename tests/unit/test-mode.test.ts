import { describe, expect, it } from 'vitest';
import { resolveLemonTestMode } from '../../lib/billing/test-mode.ts';

describe('resolveLemonTestMode', () => {
  describe('explicit values', () => {
    it('"true" → test mode', () => {
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'true', NODE_ENV: 'production' } as never)).toBe(true);
    });

    it('"false" → live mode', () => {
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'false', NODE_ENV: 'development' } as never)).toBe(false);
    });

    it('case-insensitive', () => {
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'TRUE' } as never)).toBe(true);
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'False' } as never)).toBe(false);
    });

    it('whitespace tolerated', () => {
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: '  true  ' } as never)).toBe(true);
    });

    it('"1"/"0", "yes"/"no" accepted', () => {
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: '1' } as never)).toBe(true);
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: '0' } as never)).toBe(false);
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'yes' } as never)).toBe(true);
      expect(resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'no' } as never)).toBe(false);
    });
  });

  describe('default behaviour when unset (the bug fix)', () => {
    it('production with no env var → LIVE mode (not test)', () => {
      // This is THE regression we are fixing. Previously this returned true.
      expect(resolveLemonTestMode({ NODE_ENV: 'production' } as never)).toBe(false);
    });

    it('production with empty string → LIVE mode', () => {
      expect(resolveLemonTestMode({ NODE_ENV: 'production', LEMON_SQUEEZY_TEST_MODE: '' } as never)).toBe(false);
    });

    it('development with no env var → test mode', () => {
      expect(resolveLemonTestMode({ NODE_ENV: 'development' } as never)).toBe(true);
    });

    it('test environment with no env var → test mode', () => {
      expect(resolveLemonTestMode({ NODE_ENV: 'test' } as never)).toBe(true);
    });

    it('totally empty env → test mode (NODE_ENV undefined ≠ production)', () => {
      expect(resolveLemonTestMode({} as never)).toBe(true);
    });
  });

  describe('safety: refuse to guess on garbage', () => {
    it('throws on unrecognised values rather than silently choosing', () => {
      expect(() => resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'maybe' } as never)).toThrow();
      expect(() => resolveLemonTestMode({ LEMON_SQUEEZY_TEST_MODE: 'production' } as never)).toThrow();
    });
  });
});
