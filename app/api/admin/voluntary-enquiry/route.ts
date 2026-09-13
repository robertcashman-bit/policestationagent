import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { getVoluntaryEnquiryByReference } from "@/lib/enquiry/voluntary-store";

export const dynamic = "force-dynamic";

/**
 * Ops lookup: GET /api/admin/voluntary-enquiry?reference=VAI-…
 * Requires admin session. Reconstructs stored business fields (90-day TTL).
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const reference = request.nextUrl.searchParams.get("reference")?.trim() || "";
  if (!reference) {
    return NextResponse.json(
      { error: "Pass ?reference=VAI-… (enquiry reference from the confirmation email)." },
      { status: 400 },
    );
  }

  const record = await getVoluntaryEnquiryByReference(reference);
  if (!record) {
    return NextResponse.json(
      {
        error: "Not found (wrong reference, expired past ~90 days, or KV unavailable).",
        reference,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, enquiry: record });
}
