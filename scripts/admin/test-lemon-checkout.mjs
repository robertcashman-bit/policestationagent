#!/usr/bin/env node
/**
 * Verify Lemon Squeezy checkout can be created (same API call as /api/lemonsqueezy/create-checkout).
 * Does not charge anyone — respects LEMON_SQUEEZY_TEST_MODE.
 *
 * Usage: node scripts/admin/test-lemon-checkout.mjs [monthly|annual]
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function loadEnvFile(name) {
  const path = join(root, name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

function resolveLemonTestMode() {
  const raw = process.env.LEMON_SQUEEZY_TEST_MODE;
  if (raw === undefined || raw === '') return process.env.NODE_ENV !== 'production';
  const v = raw.trim().toLowerCase();
  if (v === 'true' || v === '1' || v === 'yes') return true;
  if (v === 'false' || v === '0' || v === 'no') return false;
  throw new Error(`LEMON_SQUEEZY_TEST_MODE must be "true" or "false" (got: ${JSON.stringify(raw)})`);
}

const plan = process.argv[2] === 'annual' ? 'annual' : 'monthly';
const apiKey = process.env.LEMON_SQUEEZY_API_KEY?.trim();
const storeId = process.env.LEMON_SQUEEZY_STORE_ID?.trim();
const variantId =
  plan === 'annual'
    ? process.env.LEMON_SQUEEZY_VARIANT_ID_ANNUAL?.trim()
    : process.env.LEMON_SQUEEZY_VARIANT_ID_MONTHLY?.trim();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://psrtrain.com';
const testEmail = process.env.LEMON_CHECKOUT_TEST_EMAIL?.trim() || 'checkout-test@psrtrain.invalid';

for (const [name, val] of [
  ['LEMON_SQUEEZY_API_KEY', apiKey],
  ['LEMON_SQUEEZY_STORE_ID', storeId],
  [plan === 'annual' ? 'LEMON_SQUEEZY_VARIANT_ID_ANNUAL' : 'LEMON_SQUEEZY_VARIANT_ID_MONTHLY', variantId],
]) {
  if (!val) {
    console.error(`Missing ${name}`);
    process.exit(1);
  }
}

const testMode = resolveLemonTestMode();
const successUrl = `${siteUrl.replace(/\/$/, '')}/billing?success=true&plan=${plan}`;
const cancelUrl = `${siteUrl.replace(/\/$/, '')}/billing?canceled=true`;

console.log(`Creating Lemon Squeezy checkout (${plan}, test_mode=${testMode})…`);

const res = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
  body: JSON.stringify({
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          email: testEmail,
          custom: { user_id: 'checkout-smoke-test', plan },
        },
        checkout_options: { embed: false, media: true, logo: true },
        product_options: {
          redirect_url: successUrl,
          receipt_button_text: 'Return to PSR Train',
          receipt_link_url: successUrl,
        },
        expires_at: null,
        preview: false,
        test_mode: testMode,
      },
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(variantId) } },
      },
    },
    meta: { cancel_url: cancelUrl },
  }),
});

const payload = await res.json();
if (!res.ok) {
  console.error('Lemon Squeezy API error:', res.status);
  console.error(JSON.stringify(payload?.errors ?? payload, null, 2));
  process.exit(1);
}

const url = payload?.data?.attributes?.url;
if (!url || typeof url !== 'string') {
  console.error('Response OK but missing checkout URL');
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

console.log('OK — checkout URL created');
console.log('URL:', url);
console.log('test_mode:', testMode);
console.log('plan:', plan);
