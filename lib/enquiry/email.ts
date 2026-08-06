import { Resend } from "resend";
import type { SafeAttachment } from "@/lib/enquiry/uploads";

function getFrom(): string {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Police Station Agent <onboarding@resend.dev>"
  );
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function toAttachments(files: SafeAttachment[]) {
  return files.map((f) => ({
    filename: f.filename,
    content: f.content,
    contentType: f.contentType,
  }));
}

export async function sendVoluntaryEnquiryEmails(opts: {
  reference: string;
  businessBody: string;
  ackEmail: string | null;
  stationLabel: string;
  attachments: SafeAttachment[];
}): Promise<{ businessOk: boolean; ackOk: boolean }> {
  const resend = getResend();
  const to = process.env.CONTACT_FORM_TO_EMAIL?.trim();
  if (!resend || !to) {
    console.warn("[voluntary enquiry] email not configured");
    return { businessOk: false, ackOk: false };
  }
  const from = getFrom();
  let businessOk = false;
  let ackOk = false;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Voluntary enquiry ${opts.reference} — ${opts.stationLabel.slice(0, 40)}`,
      text: opts.businessBody,
      attachments: opts.attachments.length ? toAttachments(opts.attachments) : undefined,
    });
    businessOk = !error;
    if (error) console.error("[voluntary enquiry] business email:", error.message);
  } catch (err) {
    console.error("[voluntary enquiry] business send failed", err);
  }

  if (opts.ackEmail) {
    try {
      const { error } = await resend.emails.send({
        from,
        to: [opts.ackEmail],
        subject: `We received your enquiry ${opts.reference}`,
        text: [
          "Your voluntary interview representation request has been received for review.",
          `Reference: ${opts.reference}`,
          "",
          "This does not guarantee acceptance of instructions. Do not miss or attend an interview solely because you are waiting for a response. Contact the interviewing officer if arrangements need to be changed.",
          "",
          "Police Station Agent — independent criminal defence (not the police).",
        ].join("\n"),
      });
      ackOk = !error;
      if (error) console.error("[voluntary enquiry] ack email:", error.message);
    } catch (err) {
      console.error("[voluntary enquiry] ack send failed", err);
    }
  }

  return { businessOk, ackOk };
}

export async function sendAgencyEnquiryEmails(opts: {
  reference: string;
  businessBody: string;
  ackEmail: string;
  clientInitials: string;
  station: string;
  proposedTime: string;
  attachments: SafeAttachment[];
}): Promise<{ businessOk: boolean; ackOk: boolean }> {
  const resend = getResend();
  const to =
    process.env.AGENCY_FORM_TO_EMAIL?.trim() ||
    process.env.CONTACT_FORM_TO_EMAIL?.trim();
  if (!resend || !to) {
    console.warn("[agency enquiry] email not configured");
    return { businessOk: false, ackOk: false };
  }
  const from = getFrom();
  let businessOk = false;
  let ackOk = false;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Agency ${opts.reference} — ${opts.clientInitials} @ ${opts.station.slice(0, 30)}`,
      text: opts.businessBody,
      attachments: opts.attachments.length ? toAttachments(opts.attachments) : undefined,
    });
    businessOk = !error;
    if (error) console.error("[agency enquiry] business email:", error.message);
  } catch (err) {
    console.error("[agency enquiry] business send failed", err);
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: [opts.ackEmail],
      subject: `Agency instructions received ${opts.reference}`,
      text: [
        "Instructions received for review.",
        `Reference: ${opts.reference}`,
        `Client identifier: ${opts.clientInitials}`,
        `Station: ${opts.station}`,
        `Proposed attendance: ${opts.proposedTime || "(not specified)"}`,
        "",
        "Attendance is not accepted until expressly confirmed.",
        "",
        "Police Station Agent — professional agency instructions only.",
      ].join("\n"),
    });
    ackOk = !error;
    if (error) console.error("[agency enquiry] ack email:", error.message);
  } catch (err) {
    console.error("[agency enquiry] ack send failed", err);
  }

  return { businessOk, ackOk };
}
