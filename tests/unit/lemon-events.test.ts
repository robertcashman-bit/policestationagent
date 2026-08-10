import { describe, expect, test } from 'vitest';
import { deriveAccessUpdate } from '../../lib/billing/lemon-events.ts';

describe('deriveAccessUpdate', () => {
  test('order_created → grants paid + active', () => {
    const r = deriveAccessUpdate('order_created', {});
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('active');
    expect(r?.subscription_status).toBe('paid');
  });

  test('order_refunded → revokes + records ended_at', () => {
    const r = deriveAccessUpdate('order_refunded', {});
    expect(r?.is_paid).toBe(false);
    expect(r?.access_status).toBe('refunded');
    expect(r?.subscription_status).toBe('refunded');
    expect(r?.ended_at).toBeTruthy();
    expect(() => new Date(r!.ended_at!)).not.toThrow();
  });

  test('subscription_created → active', () => {
    const r = deriveAccessUpdate('subscription_created', { status: 'active' });
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('active');
    expect(r?.subscription_status).toBe('active');
  });

  test('subscription_created falls back to "active" when status missing', () => {
    const r = deriveAccessUpdate('subscription_created', {});
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('active');
    expect(r?.subscription_status).toBe('active');
  });

  test('subscription_resumed and subscription_unpaused → active', () => {
    for (const ev of ['subscription_resumed', 'subscription_unpaused']) {
      const r = deriveAccessUpdate(ev, { status: 'active' });
      expect(r?.is_paid).toBe(true);
      expect(r?.access_status).toBe('active');
    }
  });

  test('subscription_payment_success → active', () => {
    const r = deriveAccessUpdate('subscription_payment_success', { status: 'active' });
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('active');
  });

  test('subscription_cancelled → grace (still paid until period_end)', () => {
    const r = deriveAccessUpdate('subscription_cancelled', { status: 'cancelled' });
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('grace');
    expect(r?.subscription_status).toBe('cancelled');
  });

  test('subscription_paused → revoked', () => {
    const r = deriveAccessUpdate('subscription_paused', { status: 'paused' });
    expect(r?.is_paid).toBe(false);
    expect(r?.access_status).toBe('inactive');
    expect(r?.ended_at).toBeTruthy();
  });

  test('subscription_expired → revoked', () => {
    const r = deriveAccessUpdate('subscription_expired', { status: 'expired' });
    expect(r?.is_paid).toBe(false);
    expect(r?.access_status).toBe('inactive');
  });

  test('subscription_payment_failed → revoked', () => {
    const r = deriveAccessUpdate('subscription_payment_failed', { status: 'past_due' });
    expect(r?.is_paid).toBe(false);
    expect(r?.access_status).toBe('inactive');
  });

  test('subscription_payment_refunded → refunded', () => {
    const r = deriveAccessUpdate('subscription_payment_refunded', {});
    expect(r?.is_paid).toBe(false);
    expect(r?.access_status).toBe('refunded');
    expect(r?.subscription_status).toBe('refunded');
    expect(r?.ended_at).toBeTruthy();
  });

  describe('subscription_updated', () => {
    test('status=active → grant', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'active' });
      expect(r?.is_paid).toBe(true);
      expect(r?.access_status).toBe('active');
    });

    test('status=on_trial → grant (trial counts as paid)', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'on_trial' });
      expect(r?.is_paid).toBe(true);
      expect(r?.access_status).toBe('active');
    });

    test('status=past_due → grace (give Lemon Squeezy retry window)', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'past_due' });
      expect(r?.is_paid).toBe(true);
      expect(r?.access_status).toBe('grace');
    });

    test('status=cancelled → grace', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'cancelled' });
      expect(r?.access_status).toBe('grace');
    });

    test('status=expired → revoked', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'expired' });
      expect(r?.is_paid).toBe(false);
      expect(r?.access_status).toBe('inactive');
    });

    test('status=unpaid → revoked', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'unpaid' });
      expect(r?.is_paid).toBe(false);
      expect(r?.access_status).toBe('inactive');
    });

    test('unknown status → revoked (fail-safe)', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'something_new_from_lemon' });
      expect(r?.is_paid).toBe(false);
      expect(r?.access_status).toBe('inactive');
    });

    test('case-insensitive on status', () => {
      const r = deriveAccessUpdate('subscription_updated', { status: 'ACTIVE' });
      expect(r?.is_paid).toBe(true);
      expect(r?.access_status).toBe('active');
    });
  });

  test('unknown event_name → null (skip, no DB write)', () => {
    expect(deriveAccessUpdate('something_unrelated', {})).toBe(null);
    expect(deriveAccessUpdate('', {})).toBe(null);
  });

  test('handles undefined attributes object', () => {
    const r = deriveAccessUpdate('subscription_created', undefined);
    expect(r?.is_paid).toBe(true);
    expect(r?.access_status).toBe('active');
  });
});
