import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")?.trim();

  if (!key) {
    return NextResponse.json(
      { valid: false, error: "Missing key parameter." },
      { status: 400 }
    );
  }

  try {
    const data = await kv.get<{
      email: string;
      createdAt: string;
      expiresAt: string;
    }>(`trial:key:${key}`);

    if (!data) {
      return NextResponse.json({ valid: false, reason: "unknown_key" });
    }

    const expired = new Date(data.expiresAt) <= new Date();
    if (expired) {
      return NextResponse.json({
        valid: false,
        reason: "expired",
        expiresAt: data.expiresAt,
      });
    }

    return NextResponse.json({
      valid: true,
      expiresAt: data.expiresAt,
    });
  } catch (err) {
    console.error("Trial validate error:", err);
    return NextResponse.json(
      { valid: false, error: "Validation failed." },
      { status: 500 }
    );
  }
}
