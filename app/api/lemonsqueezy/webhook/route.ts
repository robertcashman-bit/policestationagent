import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';
import { deriveAccessUpdate } from '@/lib/billing/lemon-events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function timingSafeEqualHex(aHex: string, bHex: string) {
  const a = Buffer.from(aHex, 'hex');
  const b = Buffer.from(bHex, 'hex');
  if (a.length !== b.length || a.length === 0) return false;
  return crypto.timingSafeEqual(a, b);
}

function verifySignature(rawBody: string, signature: string, secret: string) {
  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return timingSafeEqualHex(digest, signature);
}

type LemonAttributes = {
  status?: string;
  user_email?: string;
  customer_id?: number | string;
  variant_id?: number | string;
  product_id?: number | string;
  ends_at?: string | null;
  renews_at?: string | null;
  trial_ends_at?: string | null;
};

type LemonPayload = {
  meta?: {
    event_name?: string;
    custom_data?: Record<string, unknown>;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: LemonAttributes;
  };
};

function pickEmail(payload: LemonPayload): string | null {
  const attrs = payload.data?.attributes;
  const fromAttrs = attrs?.user_email;
  if (typeof fromAttrs === 'string' && fromAttrs.includes('@')) return fromAttrs.toLowerCase();

  const custom = payload.meta?.custom_data;
  if (custom && typeof custom === 'object') {
    const fromCustom = (custom as Record<string, unknown>).email;
    if (typeof fromCustom === 'string' && fromCustom.includes('@')) {
      return fromCustom.toLowerCase();
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 503 },
    );
  }

  const signature = request.headers.get('x-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: LemonPayload;
  try {
    payload = JSON.parse(rawBody) as LemonPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventName = payload?.meta?.event_name;
  if (!eventName) {
    return NextResponse.json({ error: 'Missing event_name' }, { status: 400 });
  }

  if (!hasAdminClient()) {
    // Don't drop the message — return 503 so Lemon Squeezy retries once
    // env is configured. Logged loudly so it shows up in Vercel logs.
    console.error('[lemonsqueezy/webhook] SUPABASE_SERVICE_ROLE_KEY not set — cannot persist event');
    return NextResponse.json({ error: 'Storage not configured' }, { status: 503 });
  }

  const admin = createAdminClient();

  // Idempotency key: signature is unique per body and stable across
  // Lemon Squeezy retries of the same webhook.
  const eventId = crypto.createHash('sha256').update(signature).digest('hex');

  const { error: insertErr } = await admin
    .from('billing_webhook_events')
    .insert({ event_id: eventId, event_name: eventName, payload });

  if (insertErr) {
    if ((insertErr as { code?: string }).code === '23505') {
      // Duplicate webhook delivery — already processed.
      return NextResponse.json({ ok: true, deduped: true });
    }
    console.error('[lemonsqueezy/webhook] insert event failed', insertErr);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const email = pickEmail(payload);
  if (!email) {
    console.warn('[lemonsqueezy/webhook] could not extract email from payload', { eventName });
    return NextResponse.json({ ok: true, skipped: 'no_email' });
  }

  const update = deriveAccessUpdate(eventName, payload.data?.attributes);
  if (!update) {
    return NextResponse.json({ ok: true, skipped: 'unhandled_event' });
  }

  const attrs = payload.data?.attributes;
  const lemonCustomerId = attrs?.customer_id ? String(attrs.customer_id) : null;
  const subscriptionId = payload.data?.type === 'subscriptions' && payload.data.id
    ? String(payload.data.id)
    : null;
  const variantId = attrs?.variant_id ? String(attrs.variant_id) : null;

  const row = {
    email,
    lemon_customer_id: lemonCustomerId,
    subscription_id: subscriptionId,
    variant_id: variantId,
    is_paid: update.is_paid,
    access_status: update.access_status,
    subscription_status: update.subscription_status ?? null,
    current_period_end: attrs?.renews_at ?? attrs?.ends_at ?? null,
    ended_at: update.ended_at ?? null,
    last_event_at: new Date().toISOString(),
  };

  const { error: upsertErr } = await admin
    .from('customer_access')
    .upsert(row, { onConflict: 'email' });

  if (upsertErr) {
    console.error('[lemonsqueezy/webhook] upsert customer_access failed', upsertErr);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, eventName, email });
}
