/**
 * Stephanie (samainsteph0@gmail.com) account checks — case-insensitive, no duplicates.
 */
import path from 'node:path';
import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const STEPHANIE_EMAIL = 'samainsteph0@gmail.com';
const STEPHANIE_EMAIL_CAPS = 'Samainsteph0@gmail.com';

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

test.describe('Stephanie account', () => {
  test.beforeEach(() => {
    test.skip(!adminClient(), 'Needs SUPABASE_SERVICE_ROLE_KEY for DB checks');
  });

  test('exactly one customer_access row regardless of email casing', async () => {
    const supabase = adminClient()!;
    const { data: lower } = await supabase
      .from('customer_access')
      .select('email,is_paid,access_status,plan,current_period_end,user_id')
      .ilike('email', STEPHANIE_EMAIL);
    const { data: mixed } = await supabase
      .from('customer_access')
      .select('email')
      .ilike('email', STEPHANIE_EMAIL_CAPS);

    expect(lower?.length).toBe(1);
    expect(mixed?.length).toBe(1);
    expect(lower![0].email.toLowerCase()).toBe(STEPHANIE_EMAIL);
  });

  test('free month extension is active (is_paid through Aug 2026)', async () => {
    const supabase = adminClient()!;
    const { data } = await supabase
      .from('customer_access')
      .select('is_paid,access_status,current_period_end')
      .ilike('email', STEPHANIE_EMAIL)
      .single();

    expect(data?.is_paid).toBe(true);
    expect(data?.access_status).toBe('active');
    expect(new Date(data!.current_period_end!).getTime()).toBeGreaterThan(Date.now());
  });

  test('no duplicate auth.users rows for Stephanie email variants', async () => {
    const supabase = adminClient()!;
    const { data } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    const matches =
      data.users?.filter((u) => u.email?.toLowerCase() === STEPHANIE_EMAIL) ?? [];
    expect(matches.length).toBeLessThanOrEqual(1);
  });
});
