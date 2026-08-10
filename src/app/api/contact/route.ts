import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Receives contact form submissions. In production, wire this up to
 * an email service (Resend, SendGrid, etc.) to forward messages.
 * For now, logs the message and returns success.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // TODO: Send email via Resend / SendGrid when configured
    console.log("[Contact form]", { name, email, subject, message });

    return NextResponse.json({
      message: "Message sent. We\u2019ll get back to you within one working day.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
