import { Resend } from 'resend';
import { SITE_URL } from '@/config/site';
import { loadBrochureAttachment } from '../brochure/load-attachment';
import type { FirmProspect } from '../types';
import { buildKentCorrectionEmailHtml, KENT_CORRECTION_SUBJECT, OUTREACH_CONTACT_EMAIL } from './templates';
import { issueUnsubscribeToken } from './unsubscribe-token';

const FROM_EMAIL =
  process.env.FIRM_OUTREACH_FROM_EMAIL?.trim() ||
  'Police Station Agent <noreply@policestationagent.com>';

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (resend) return resend;
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  resend = new Resend(key);
  return resend;
}

export async function sendKentCorrectionEmail(opts: {
  prospect: FirmProspect;
  dryRun?: boolean;
}): Promise<{ ok: boolean; messageId?: string; subject: string; error?: string }> {
  const email = opts.prospect.email?.trim();
  if (!email) return { ok: false, subject: '', error: 'no_email' };

  const subject = KENT_CORRECTION_SUBJECT;
  const token = issueUnsubscribeToken(email);
  const unsubscribeUrl = `${SITE_URL}/outreach/unsubscribe/${encodeURIComponent(token)}`;
  const html = buildKentCorrectionEmailHtml({ prospect: opts.prospect, unsubscribeUrl });

  if (opts.dryRun || process.env.FIRM_OUTREACH_DRY_RUN === 'true') {
    console.info('[firm-outreach kent-correction dry-run]', email, subject);
    return { ok: true, subject, messageId: 'dry-run' };
  }

  const client = getResend();
  if (!client) {
    console.info('[firm-outreach kent-correction — no RESEND_API_KEY]', email, subject);
    return { ok: false, subject, error: 'no_resend' };
  }

  const brochure = loadBrochureAttachment();
  const attachments = brochure
    ? [{ filename: brochure.filename, content: brochure.content }]
    : undefined;

  try {
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: OUTREACH_CONTACT_EMAIL,
      subject,
      html,
      attachments,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${OUTREACH_CONTACT_EMAIL}?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });
    const messageId =
      result.data && 'id' in result.data ? String(result.data.id) : undefined;
    return { ok: true, messageId, subject };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, subject, error: msg };
  }
}
