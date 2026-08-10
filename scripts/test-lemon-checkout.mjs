/**
 * Smoke-test Lemon Squeezy checkout creation (API key + variant IDs).
 * Usage: node scripts/test-lemon-checkout.mjs [monthly|annual]
 * Loads .env.local then .env (same order as Next.js).
 */
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

function resolveTestMode() {
  const raw = process.env.LEMON_SQUEEZY_TEST_MODE;
  if (raw === undefined || raw === '') {
    return process.env.NODE_ENV !== 'production';
  }
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

if (!apiKey || !storeId || !variantId) {
  console.error('Missing LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, or variant ID env vars.');
  process.exit(1);
}

const testMode = resolveTestMode();
console.log(`Creating Lemon Squeezy checkout (${plan}, test_mode=${testMode})…`);

const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://psrtrain.com';
const successUrl = `${origin}/billing?success=true&plan=${plan}`;
const cancelUrl = `${origin}/billing?canceled=true`;

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
          email: 'checkout-smoke@psrtrain.com',
          custom: { plan, smoke_test: 'true' },
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
  const message =
    payload?.errors?.[0]?.detail || payload?.message || `HTTP ${res.status}`;
  console.error('FAIL —', message);
  process.exit(1);
}

const url = payload?.data?.attributes?.url;
if (!url) {
  console.error('FAIL — Lemon Squeezy response missing checkout URL');
  process.exit(1);
}

console.log('OK — checkout URL created');
console.log('URL:', url);
console.log('test_mode:', testMode);
console.log('plan:', plan);
