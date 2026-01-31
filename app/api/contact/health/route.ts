import { NextResponse } from "next/server";

export async function GET() {
  const resendKey = process.env.RESEND_API_KEY?.trim() || "";
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim() || "";
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || "";

  return NextResponse.json({
    ok: Boolean(resendKey && toEmail),
    hasResendApiKey: Boolean(resendKey),
    resendKeyLooksValid: resendKey.startsWith("re_"),
    hasContactFormToEmail: Boolean(toEmail),
    hasContactFromEmail: Boolean(fromEmail),
  });
}

