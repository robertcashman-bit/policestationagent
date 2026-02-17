import { NextRequest, NextResponse } from "next/server";
import { sendContactFormNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const MAX_FIELD_LENGTH = 2000;

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 submissions per IP per minute
    const rate = checkRateLimit(request, 5, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rate.retryAfter,
        },
        { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : {} }
      );
    }

    const body = await request.json();

    const name = String(body?.name ?? "").trim();
    const contactNumber = String(body?.contactNumber ?? "").trim();
    const emailRaw = String(body?.email ?? "").trim();
    const email = emailRaw === "" ? null : emailRaw;
    const role = String(body?.role ?? "").trim();
    const requestTypeLegacy = String(body?.requestType ?? "").trim();
    const requestType =
      requestTypeLegacy === "self" || requestTypeLegacy === "client"
        ? requestTypeLegacy
        : role === "solicitor" || role === "representative"
          ? "client"
          : role === "family"
            ? "self"
            : requestTypeLegacy || "self";
    const clientName = String(body?.clientName ?? "").trim();
    const clientDOB = String(body?.clientDOB ?? "").trim();
    const policeStation = String(body?.policeStation ?? "").trim();
    const interviewDate = String(body?.interviewDate ?? "").trim();
    const interviewTime = String(body?.interviewTime ?? "").trim();
    const attendanceType = String(body?.attendanceType ?? "").trim();
    const briefDetails = String(body?.briefDetails ?? "").trim();
    const offenceSummaryLegacy = String(body?.offenceSummary ?? "").trim();
    const offenceSummary = briefDetails || offenceSummaryLegacy;
    const contactWindow = String(body?.contactWindow ?? "").trim();
    const contactWindowTime = String(body?.contactWindowTime ?? "").trim();
    const supportNeeds = String(body?.supportNeeds ?? "").trim();
    const nonUrgentConfirmation = Boolean(body?.nonUrgentConfirmation);
    const consent = Boolean(body?.consent);

    // Input length limits to prevent abuse
    const fields = [
      name, contactNumber, emailRaw, clientName, clientDOB, policeStation,
      interviewDate, interviewTime, attendanceType, offenceSummary, supportNeeds, contactWindowTime,
    ];
    if (fields.some((f) => f && f.length > MAX_FIELD_LENGTH)) {
      return NextResponse.json({ error: "One or more fields exceed maximum length" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!contactNumber) {
      return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
    }
    if (email !== null && !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!policeStation) {
      return NextResponse.json({ error: "Police station is required" }, { status: 400 });
    }
    if (!interviewDate) {
      return NextResponse.json({ error: "Interview date is required" }, { status: 400 });
    }
    if (!interviewTime) {
      return NextResponse.json({ error: "Interview time is required" }, { status: 400 });
    }
    if (!attendanceType) {
      return NextResponse.json({ error: "Attendance type is required" }, { status: 400 });
    }
    if (!offenceSummary) {
      return NextResponse.json({ error: "Brief details are required" }, { status: 400 });
    }
    if (requestType === "client" && (!clientName || !clientDOB)) {
      return NextResponse.json(
        { error: "Client name and date of birth are required when requesting for a client" },
        { status: 400 }
      );
    }
    if (contactWindow === "specify" && !contactWindowTime) {
      return NextResponse.json({ error: "Please specify a contact time" }, { status: 400 });
    }
    if (!nonUrgentConfirmation) {
      return NextResponse.json({ error: "Non-urgent confirmation is required" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    // Notify site owner by email if Resend is configured (do not fail request on email failure)
    let emailResult: { success: boolean; error?: string } | null = null;
    try {
      console.log("[Contact API] Attempting to send notification email");
      emailResult = await sendContactFormNotification({
        name,
        contactNumber,
        email,
        requestType,
        clientName: clientName || null,
        clientDOB: clientDOB || null,
        policeStation,
        interviewDate,
        interviewTime,
        attendanceType,
        offenceSummary,
        supportNeeds: supportNeeds || null,
      });
      if (emailResult.success) {
        console.log("[Contact API] Notification email sent successfully");
      } else {
        console.warn("[Contact API] Notification email skipped or failed:", emailResult.error);
      }
    } catch (error_) {
      console.warn("[Contact API] Notification email error:", error_);
    }

    // Do not fail the request if email notifications are not configured or fail.
    // The form should remain usable even if RESEND_API_KEY / CONTACT_FORM_TO_EMAIL are missing/invalid.
    return NextResponse.json({
      success: true,
      email: emailResult ?? { success: false, error: "Email result unavailable" },
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 });
  }
}
