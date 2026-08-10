import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, generateLicenceKey } from "@/lib/stripe";
import { kv } from "@vercel/kv";
import { sendLicenceKeyEmail } from "@/lib/email";

async function createOrUpdateLicence(
  email: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  cloudBackup: boolean,
  expiresAt: string | null,
  status: string
) {
  // Check if this customer already has a licence
  const existingKey = await kv.get<string>(
    `licence:customer:${stripeCustomerId}`
  );

  if (existingKey) {
    // Update existing licence
    const existing = await kv.get<Record<string, unknown>>(
      `licence:key:${existingKey}`
    );
    if (existing) {
      await kv.set(`licence:key:${existingKey}`, {
        ...existing,
        cloudBackup,
        expiresAt,
        status,
        updatedAt: new Date().toISOString(),
      });
      console.log(
        `[Webhook] Updated licence ${existingKey}: cloudBackup=${cloudBackup}, status=${status}`
      );
      return existingKey;
    }
  }

  // Create new licence
  const licenceKey = generateLicenceKey();
  const now = new Date().toISOString();

  await kv.set(`licence:key:${licenceKey}`, {
    email,
    stripeCustomerId,
    stripeSubscriptionId,
    cloudBackup,
    expiresAt,
    status,
    createdAt: now,
    updatedAt: now,
  });

  await kv.set(`licence:customer:${stripeCustomerId}`, licenceKey);
  await kv.set(`licence:email:${email.toLowerCase()}`, licenceKey);

  console.log(
    `[Webhook] Created licence ${licenceKey} for ${email}: cloudBackup=${cloudBackup}`
  );

  sendLicenceKeyEmail(email, licenceKey, cloudBackup).catch((err) =>
    console.error("[Webhook] Licence email send failed:", err),
  );

  return licenceKey;
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email || session.customer_details?.email;
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;
        const cloudBackup = session.metadata?.cloudBackup === "true";

        if (email && customerId) {
          // For subscriptions, get the current period end for expiry
          let expiresAt: string | null = null;
          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            expiresAt = new Date(
              sub.current_period_end * 1000
            ).toISOString();
          }

          await createOrUpdateLicence(
            email,
            customerId,
            subscriptionId || "",
            cloudBackup,
            expiresAt,
            "active"
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const existingKey = await kv.get<string>(
          `licence:customer:${customerId}`
        );
        if (existingKey) {
          const existing = await kv.get<Record<string, unknown>>(
            `licence:key:${existingKey}`
          );
          if (existing) {
            // Check if cloud backup price is in the subscription items
            const cloudPriceId = process.env.STRIPE_PRICE_ID_CLOUD_BACKUP;
            const hasCloud = cloudPriceId
              ? subscription.items.data.some(
                  (item) => item.price.id === cloudPriceId
                )
              : false;

            await kv.set(`licence:key:${existingKey}`, {
              ...existing,
              cloudBackup: hasCloud,
              expiresAt: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              status:
                subscription.status === "active" ||
                subscription.status === "trialing"
                  ? "active"
                  : subscription.status,
              updatedAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const existingKey = await kv.get<string>(
          `licence:customer:${customerId}`
        );
        if (existingKey) {
          const existing = await kv.get<Record<string, unknown>>(
            `licence:key:${existingKey}`
          );
          if (existing) {
            await kv.set(`licence:key:${existingKey}`, {
              ...existing,
              cloudBackup: false,
              status: "cancelled",
              updatedAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;
        if (customerId) {
          const existingKey = await kv.get<string>(
            `licence:customer:${customerId}`
          );
          if (existingKey) {
            const existing = await kv.get<Record<string, unknown>>(
              `licence:key:${existingKey}`
            );
            if (existing && invoice.lines?.data?.[0]?.period?.end) {
              await kv.set(`licence:key:${existingKey}`, {
                ...existing,
                status: "active",
                expiresAt: new Date(
                  invoice.lines.data[0].period.end * 1000
                ).toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed for invoice:", invoice.id);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
