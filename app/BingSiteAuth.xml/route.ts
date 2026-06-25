import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Bing Webmaster Tools XML-file verification.
 * Set BING_SITE_VERIFICATION to the code Bing gives you (same code as the
 * msvalidate.01 meta tag) and Bing's XML-file verification will pass.
 */
export function GET() {
  const code = process.env.BING_SITE_VERIFICATION?.trim();
  if (!code) {
    return new NextResponse("Not configured", { status: 404 });
  }
  const xml = `<?xml version="1.0"?>\n<users>\n  <user>${code}</user>\n</users>\n`;
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
