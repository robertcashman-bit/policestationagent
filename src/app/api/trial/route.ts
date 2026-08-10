import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { sendTrialKeyEmail } from "@/lib/email";

const TRIAL_DAYS = 30;

function generateLicenseKey(): string {
  const segment = () =>
    Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  return [segment(), segment(), segment(), segment()].join("-");
}

function expiresAt(): string {
  const d = new Date();
  d.setDate(d.getDate() + TRIAL_DAYS);
  return d.toISOString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const emailKey = `trial:email:${email.toLowerCase()}`;
    const existing = await kv.get<string>(emailKey);
    if (existing) {
      const data = await kv.get<{ licenseKey: string; expiresAt: string }>(
        `trial:key:${existing}`
      );
      if (data && new Date(data.expiresAt) > new Date()) {
        return NextResponse.json({
          licenseKey: data.licenseKey,
          expiresAt: data.expiresAt,
          message: "You already have an active trial. Use your existing key below.",
        });
      }
    }

    const licenseKey = generateLicenseKey();
    const expiry = expiresAt();

    await kv.set(`trial:key:${licenseKey}`, {
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      expiresAt: expiry,
    });
    await kv.set(emailKey, licenseKey);

    sendTrialKeyEmail(email.toLowerCase(), licenseKey, expiry).catch((err) =>
      console.error("[Trial] Email send failed:", err),
    );

    return NextResponse.json({
      licenseKey,
      expiresAt: expiry,
      message: "Trial activated. Use the key in the desktop app.",
    });
  } catch (err) {
    console.error("Trial signup error:", err);
    return NextResponse.json(
      {
        error:
          "Trial signup failed. If you have not set up Vercel KV, add a KV store in the Vercel dashboard and link it to this project.",
      },
      { status: 500 }
    );
  }
}
