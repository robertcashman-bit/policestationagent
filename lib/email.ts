import { Resend } from "resend";

export interface ContactFormNotificationPayload {
  name: string;
  contactNumber: string;
  email: string | null;
  requestType: string;
  clientName: string | null;
  clientDOB: string | null;
  policeStation: string;
  interviewDate: string;
  interviewTime: string;
  attendanceType: string;
  offenceSummary: string;
  supportNeeds: string | null;
}

function buildEmailBody(payload: ContactFormNotificationPayload): string {
  const lines: string[] = [
    "New contact form submission from Police Station Agent website.",
    "",
    "--- Requestor ---",
    `Name: ${payload.name}`,
    `Contact number: ${payload.contactNumber}`,
    `Email: ${payload.email ?? "(not provided)"}`,
    `Role / request type: ${payload.requestType}`,
    "",
    "--- Interview details ---",
    `Police station: ${payload.policeStation}`,
    `Date: ${payload.interviewDate}`,
    `Time: ${payload.interviewTime}`,
    `Attendance type: ${payload.attendanceType}`,
    "",
    "--- Brief details ---",
    payload.offenceSummary,
  ];

  if (payload.requestType === "client" && (payload.clientName || payload.clientDOB)) {
    lines.push("", "--- Client (solicitor/representative request) ---");
    if (payload.clientName) lines.push(`Client name: ${payload.clientName}`);
    if (payload.clientDOB) lines.push(`Client DOB: ${payload.clientDOB}`);
  }

  if (payload.supportNeeds?.trim()) {
    lines.push("", "--- Support / vulnerability ---", payload.supportNeeds.trim());
  }

  return lines.join("\n");
}

/**
 * Send a notification email to the site owner when a contact form is submitted.
 * Requires RESEND_API_KEY and CONTACT_FORM_TO_EMAIL. CONTACT_FROM_EMAIL is optional
 * (defaults to Resend onboarding address for testing).
 */
export async function sendContactFormNotification(
  payload: ContactFormNotificationPayload
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim();

  if (!apiKey || !toEmail) {
    const reason = !apiKey ? "RESEND_API_KEY not set" : "CONTACT_FORM_TO_EMAIL not set";
    console.warn("[Contact email] Skipping send:", reason);
    return { success: false, error: reason };
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Police Station Agent <onboarding@resend.dev>";

  try {
    console.log("[Contact email] Sending notification to:", toEmail, "from:", fromEmail);
    const resend = new Resend(apiKey);
    const body = buildEmailBody(payload);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Contact form: ${payload.name} – ${payload.policeStation} ${payload.interviewDate}`,
      text: body,
    });

    if (error) {
      console.error("[Contact email] Resend API error:", error.message, error);
      return { success: false, error: error.message };
    }

    console.log("[Contact email] Sent successfully. Resend id:", data?.id ?? "(no id)");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Contact email] Send failed:", message);
    return { success: false, error: message };
  }
}
