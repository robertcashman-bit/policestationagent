/**
 * Look up customer_access by email (case-insensitive).
 * Usage: node scripts/admin/check-customer-access.mjs [email]
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

const { data, error } = await supabase
  .from('customer_access')
  .select('email,user_id,is_paid,access_status,plan,current_period_end,updated_at')
  .ilike('email', email)
  .maybeSingle();

if (error) {
  console.error('Query failed:', error.message);
  process.exit(1);
}

if (!data) {
  console.log(`No customer_access row for ${email}`);
  process.exit(0);
}

console.log(JSON.stringify(data, null, 2));
