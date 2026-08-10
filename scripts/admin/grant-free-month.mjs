/**
 * Grant one free month of access by email (case-insensitive). Idempotent extend.
 * Usage: node scripts/admin/grant-free-month.mjs [email]
 */
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

const email = (process.argv[2] || 'samainsteph0@gmail.com').trim().toLowerCase();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { data: existing } = await supabase
  .from('customer_access')
  .select('id,email,current_period_end,is_paid,access_status')
  .ilike('email', email)
  .maybeSingle();

const now = new Date();
const base = existing?.current_period_end
  ? new Date(Math.max(now.getTime(), new Date(existing.current_period_end).getTime()))
  : now;
const periodEnd = new Date(base);
periodEnd.setMonth(periodEnd.getMonth() + 1);

const row = {
  email,
  is_paid: true,
  access_status: 'active',
  plan: 'monthly',
  current_period_end: periodEnd.toISOString(),
  last_event_at: now.toISOString(),
};

let saved;
if (existing?.id) {
  const { data, error } = await supabase
    .from('customer_access')
    .update(row)
    .eq('id', existing.id)
    .select()
    .single();
  if (error) {
    console.error('Update failed:', error.message);
    process.exit(1);
  }
  saved = data;
} else {
  const { data, error } = await supabase.from('customer_access').insert(row).select().single();
  if (error) {
    console.error('Insert failed:', error.message);
    process.exit(1);
  }
  saved = data;
}

await supabase.from('billing_webhook_events').upsert({
  event_id: `manual_admin_grant:${email}:${now.toISOString().slice(0, 10)}`,
  event_name: 'manual_admin_grant',
  payload: { email, period_end: periodEnd.toISOString(), reason: 'support_grant' },
});

console.log('OK — access granted/extended');
console.log(JSON.stringify(saved, null, 2));
