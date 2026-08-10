import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

/**
 * POST /api/licence/validate
 * Called by the Electron app to validate a licence key and check entitlements.
 * Body: { key: string, machineId: string, appVersion?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    if (!key) {
      return NextResponse.json(
        { valid: false, message: "Missing licence key." },
        { status: 400 }
      );
    }

    // Check trial keys
    const trialData = await kv.get<{
      email: string;
      createdAt: string;
      expiresAt: string;
    }>(`trial:key:${key}`);

    if (trialData) {
      const expired = new Date(trialData.expiresAt) <= new Date();
      return NextResponse.json({
        valid: !expired,
        expiresAt: trialData.expiresAt,
        email: trialData.email,
        cloudBackup: false,
        message: expired ? "Trial has expired." : undefined,
      });
    }

    // Check paid subscription keys
    const subData = await kv.get<{
      email: string;
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      plan?: string;
      cloudBackup?: boolean;
      expiresAt?: string;
      status?: string;
      createdAt: string;
    }>(`licence:key:${key.toUpperCase()}`);

    if (!subData) {
      return NextResponse.json({
        valid: false,
        message: "Unknown licence key.",
      });
    }

    const now = new Date();
    const expired = subData.expiresAt
      ? new Date(subData.expiresAt) <= now
      : false;
    const revoked = subData.status === "revoked";

    return NextResponse.json({
      valid: !expired && !revoked,
      expiresAt: subData.expiresAt || null,
      email: subData.email,
      cloudBackup: !!subData.cloudBackup && !expired && !revoked,
      message: revoked
        ? "Licence has been revoked."
        : expired
          ? "Subscription has expired."
          : undefined,
    });
  } catch (err) {
    console.error("Licence validate error:", err);
    return NextResponse.json(
      { valid: false, error: "Validation failed." },
      { status: 500 }
    );
  }
}
