import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { issueBackupCredentials } from "@/lib/aws";

/**
 * POST /api/backup/credentials
 * Called by the Electron app to obtain scoped, temporary S3 credentials.
 * Body: { key: string }
 * Returns: { credentials: { accessKeyId, secretAccessKey, sessionToken, expiration, bucket, region, prefix } }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    if (!key) {
      return NextResponse.json(
        { error: "Missing licence key." },
        { status: 400 }
      );
    }

    // Verify the licence exists and has cloud backup entitlement
    const subData = await kv.get<{
      email: string;
      cloudBackup?: boolean;
      expiresAt?: string;
      status?: string;
    }>(`licence:key:${key.toUpperCase()}`);

    if (!subData) {
      return NextResponse.json(
        { error: "Unknown licence key." },
        { status: 403 }
      );
    }

    const now = new Date();
    const expired = subData.expiresAt
      ? new Date(subData.expiresAt) <= now
      : false;
    const revoked = subData.status === "revoked";

    if (expired || revoked) {
      return NextResponse.json(
        { error: "Subscription is not active." },
        { status: 403 }
      );
    }

    if (!subData.cloudBackup) {
      return NextResponse.json(
        {
          error:
            "Cloud backup is not included in your subscription. Upgrade to enable cloud backup.",
        },
        { status: 403 }
      );
    }

    const credentials = await issueBackupCredentials(key);

    return NextResponse.json({ credentials });
  } catch (err) {
    console.error("Backup credentials error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to issue credentials.",
      },
      { status: 500 }
    );
  }
}
