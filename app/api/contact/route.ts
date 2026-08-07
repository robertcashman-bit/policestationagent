import { NextRequest, NextResponse } from "next/server";
import { sendContactFormNotification } from "@/lib/email";
import { getClientIp, rateLimitOk } from "@/lib/contact-guards";
import { isAllowedEnquiryOrigin } from "@/lib/enquiry/origin";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const MAX_FIELD_LENGTH = 2000;

const ADMIN_ROLES = new Set([
  "prospective_client",
  "instructing_solicitor",
  "other",
]);

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedEnquiryOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rate = await rateLimitOk({
      ip: getClientIp(request),
      scope: "contact",
      max: 5,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const body = await request.json();

    // Honeypot: bots fill hidden fields humans never see. Silently accept and
    // drop (no email) so the bot believes it succeeded.
    const honeypot = String(body?.company ?? body?.website ?? "").trim();
    if (honeypot) {
      return NextResponse.json({ success: true, emailNotified: false });
    }

    const name = String(body?.name ?? "").trim();
    const contactNumber = String(body?.contactNumber ?? "").trim();
    const emailRaw = String(body?.email ?? "").trim();
    const email = emailRaw === "" ? null : emailRaw;
    const role = String(body?.role ?? "").trim();
    const enquiryKindRaw = String(body?.enquiryKind ?? "").trim();
    const clientName = String(body?.clientName ?? "").trim();
    const clientDOB = String(body?.clientDOB ?? "").trim();
    const policeStation = String(body?.policeStation ?? "").trim();
    const interviewDate = String(body?.interviewDate ?? "").trim();
    const interviewTime = String(body?.interviewTime ?? "").trim();
    const attendanceType = String(body?.attendanceType ?? "").trim();

    const REAL_ATTENDANCE = new Set([
      "scheduled-voluntary",
      "pre-booked",
      "solicitor-instruction",
    ]);
    // Client-supplied label only — not auth. A real attendance type forces attendance rules.
    const isAdminEnquiry =
      (enquiryKindRaw === "admin" || attendanceType === "admin-enquiry") &&
      !REAL_ATTENDANCE.has(attendanceType);
    const enquiryKind = isAdminEnquiry ? "admin" : "attendance";

    const requestTypeLegacy = String(body?.requestType ?? "").trim();
    let requestType: string;
    if (isAdminEnquiry) {
      // Do not map admin solicitor roles into incomplete "client" attendance mode.
      requestType = ADMIN_ROLES.has(role) ? role : role || "prospective_client";
    } else if (requestTypeLegacy === "self" || requestTypeLegacy === "client") {
      requestType = requestTypeLegacy;
    } else if (role === "solicitor" || role === "representative") {
      requestType = "client";
    } else if (role === "family") {
      requestType = "self";
    } else {
      requestType = requestTypeLegacy || "self";
    }
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
      name,
      contactNumber,
      emailRaw,
      clientName,
      clientDOB,
      policeStation,
      interviewDate,
      interviewTime,
      attendanceType,
      offenceSummary,
      supportNeeds,
      contactWindowTime,
    ];
    if (fields.some((f) => f && f.length > MAX_FIELD_LENGTH)) {
      return NextResponse.json({ error: "One or more fields exceed maximum length" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (isAdminEnquiry) {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required for written enquiries" },
          { status: 400 },
        );
      }
      if (contactNumber && contactNumber.replace(/\D/g, "").length < 10) {
        return NextResponse.json({ error: "Please enter a valid contact number" }, { status: 400 });
      }
      if (role && !ADMIN_ROLES.has(role)) {
        return NextResponse.json({ error: "Invalid role for written enquiry" }, { status: 400 });
      }
    } else {
      if (!contactNumber) {
        return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
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
    }
    if (email !== null && !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!offenceSummary) {
      return NextResponse.json(
        { error: isAdminEnquiry ? "Message is required" : "Brief details are required" },
        { status: 400 },
      );
    }
    if (requestType === "client" && !isAdminEnquiry && (!clientName || !clientDOB)) {
      return NextResponse.json(
        { error: "Client name and date of birth are required when requesting for a client" },
        { status: 400 },
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
        contactNumber: contactNumber || (isAdminEnquiry ? "(not provided)" : ""),
        email,
        requestType,
        clientName: isAdminEnquiry ? null : clientName || null,
        clientDOB: isAdminEnquiry ? null : clientDOB || null,
        policeStation: isAdminEnquiry ? "" : policeStation,
        interviewDate: isAdminEnquiry ? "" : interviewDate,
        interviewTime: isAdminEnquiry ? "" : interviewTime,
        attendanceType: isAdminEnquiry ? "admin-enquiry" : attendanceType,
        offenceSummary,
        supportNeeds: supportNeeds || null,
        enquiryKind,
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
    // Only expose a boolean to the client — never leak email-subsystem error details.
    return NextResponse.json({
      success: true,
      emailNotified: Boolean(emailResult?.success),
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 });
  }
}
