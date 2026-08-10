import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";

type CheckoutMode = "payment" | "subscription";
type PlanType = "standard" | "cloud";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode: CheckoutMode = body.mode === "payment" ? "payment" : "subscription";
    const plan: PlanType = body.plan === "cloud" ? "cloud" : "standard";

    const lineItems: { price: string; quantity: number }[] = [];

    if (mode === "payment") {
      if (!STRIPE_PRICE_IDS.oneTime) {
        return NextResponse.json(
          { error: "One-time price not configured." },
          { status: 500 }
        );
      }
      lineItems.push({ price: STRIPE_PRICE_IDS.oneTime, quantity: 1 });
    } else {
      if (!STRIPE_PRICE_IDS.subscription) {
        return NextResponse.json(
          { error: "Subscription price not configured." },
          { status: 500 }
        );
      }
      lineItems.push({ price: STRIPE_PRICE_IDS.subscription, quantity: 1 });

      if (plan === "cloud" && STRIPE_PRICE_IDS.cloudBackup) {
        lineItems.push({ price: STRIPE_PRICE_IDS.cloudBackup, quantity: 1 });
      }
    }

    const origin = req.headers.get("origin") || req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      success_url: `${origin}/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buy/cancel`,
      allow_promotion_codes: true,
      metadata: {
        plan,
        cloudBackup: plan === "cloud" ? "true" : "false",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
