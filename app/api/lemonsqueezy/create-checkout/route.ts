import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resolveLemonTestMode } from '@/lib/billing/test-mode';

type Plan = 'monthly' | 'annual';

function getVariantId(plan: Plan) {
  return plan === 'annual'
    ? process.env.LEMON_SQUEEZY_VARIANT_ID_ANNUAL
    : process.env.LEMON_SQUEEZY_VARIANT_ID_MONTHLY;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return NextResponse.json({ error: 'Lemon Squeezy is not configured' }, { status: 503 });
    }

    const body = await request.json();
    const plan: Plan = body?.plan === 'annual' ? 'annual' : 'monthly';
    const variantId = getVariantId(plan);

    if (!variantId) {
      return NextResponse.json({ error: 'Plan is not configured' }, { status: 503 });
    }

    let testMode: boolean;
    try {
      testMode = resolveLemonTestMode();
    } catch (err) {
      console.error('Lemon Squeezy test_mode misconfigured:', err);
      return NextResponse.json(
        { error: 'Billing is misconfigured (test_mode)' },
        { status: 503 },
      );
    }

    const successUrl = `${request.nextUrl.origin}/billing?success=true&plan=${plan}`;
    const cancelUrl = `${request.nextUrl.origin}/billing?canceled=true`;

    const lsRes = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
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
              email: user.email,
              custom: {
                user_id: user.id,
                plan,
              },
            },
            checkout_options: {
              embed: false,
              media: true,
              logo: true,
            },
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
            store: {
              data: { type: 'stores', id: String(storeId) },
            },
            variant: {
              data: { type: 'variants', id: String(variantId) },
            },
          },
        },
        meta: {
          cancel_url: cancelUrl,
        },
      }),
    });

    const payload = await lsRes.json();
    if (!lsRes.ok) {
      const message =
        payload?.errors?.[0]?.detail ||
        payload?.message ||
        'Failed to create Lemon Squeezy checkout';
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const url = payload?.data?.attributes?.url;
    if (!url) {
      return NextResponse.json({ error: 'Missing checkout URL from Lemon Squeezy' }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Lemon Squeezy checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}