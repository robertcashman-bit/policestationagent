import { SITE_URL } from '@/config/site';
import { PHONE_DISPLAY, PHONE_TEL, SMS_DISPLAY, SMS_TEL } from '@/config/contact';
import type { FirmProspect } from '../types';

export const OUTREACH_CONTACT_EMAIL =
  process.env.CONTACT_FORM_TO_EMAIL?.trim() || 'robertcashman@defencelegalservices.co.uk';

/** Initial subjects sent before the Kent-only rewrite (used to target correction emails). */
export const LEGACY_NATIONWIDE_INITIAL_SUBJECTS = [
  'Police station agent cover — for criminal defence solicitors',
  'Police station agent cover — for criminal defence firms',
] as const;

export const KENT_CORRECTION_SUBJECT = 'Correction — police station agent cover within 45 mins of Maidstone';

function outreachContactLinksHtml(): string {
  return `<a href="tel:${PHONE_TEL}">${escapeHtml(PHONE_DISPLAY)}</a> · <a href="sms:${SMS_TEL}">${escapeHtml(SMS_DISPLAY)}</a> (call or text)`;
}

function escapeHtml(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildTrackedJoinUrl(prospect: FirmProspect): string {
  return `${SITE_URL}/for-solicitors?ref=${encodeURIComponent(prospect.id)}`;
}

export function isLegacyNationwideInitialSubject(subject: string): boolean {
  const trimmed = subject.trim();
  if ((LEGACY_NATIONWIDE_INITIAL_SUBJECTS as readonly string[]).includes(trimmed)) {
    return true;
  }
  const lower = trimmed.toLowerCase();
  // Current subjects use Maidstone radius; treat Kent-only or Maidstone-scoped subjects as non-legacy.
  if (lower.includes('kent') || lower.includes('maidstone')) {
    return false;
  }
  return trimmed.includes('agent cover');
}

export function subjectForStep(prospect: FirmProspect, step: number): string {
  if (step === 0) {
    return prospect.prospectType === 'solicitor'
      ? 'Police station agent cover (45 mins of Maidstone) — for criminal defence solicitors'
      : 'Police station agent cover (45 mins of Maidstone) — for criminal defence firms';
  }
  if (step === 1) {
    return 'Reminder: police station agent cover within 45 mins of Maidstone';
  }
  return 'Last note — agent cover within 45 mins of Maidstone when your rota needs a rep';
}

function outreachFooter(unsubscribeUrl: string): string {
  return `
      <hr style="margin:32px 0;border:none;border-top:1px solid #e2e8f0" />
      <p style="font-size:12px;color:#64748b">
        Defence Legal Services Ltd · ICO ZA198500<br />
        Greenacre, London Road, West Kingsdown, Sevenoaks, Kent TN15 6ER<br />
        Reply to ${escapeHtml(OUTREACH_CONTACT_EMAIL)} ·
        <a href="${escapeHtml(unsubscribeUrl)}">Unsubscribe</a>
      </p>
  `;
}

export function buildOutreachEmailHtml(opts: {
  prospect: FirmProspect;
  step: number;
  unsubscribeUrl: string;
}): string {
  const { prospect, step, unsubscribeUrl } = opts;
  const ctaUrl = buildTrackedJoinUrl(prospect);
  const firmLine = escapeHtml(prospect.firmName);
  const greeting =
    prospect.prospectType === 'solicitor' && prospect.surname
      ? `Dear ${escapeHtml([prospect.title, prospect.surname].filter(Boolean).join(' '))},`
      : 'Hello,';

  const intro =
    step === 0
      ? prospect.prospectType === 'solicitor'
        ? `<p>I provide <strong>accredited police station agent cover at stations within about 45 minutes of Maidstone</strong> for criminal defence solicitors when your duty rota or panel needs attendance — evenings, weekends, and bank holidays included.</p>`
        : `<p>I provide <strong>accredited police station agent cover at stations within about 45 minutes of Maidstone</strong> for criminal defence firms when your duty rota needs attendance — evenings, weekends, and bank holidays included.</p>`
      : step === 1
        ? `<p>A quick reminder — if <strong>${firmLine}</strong> needs police station cover within about <strong>45 minutes of Maidstone</strong>, I can attend when your own reps are unavailable.</p>`
        : `<p>Final note from us — if ${firmLine} ever needs freelance police station cover within about <strong>45 minutes of Maidstone</strong>, you can reach me directly — no agency layer.</p>`;

  const benefits =
    step === 0
      ? `<ul style="margin:16px 0;padding-left:20px;line-height:1.6">
          <li>Accredited duty solicitor — police station and custody work only (25+ years)</li>
          <li>Coverage at police stations <strong>within about 45 minutes of Maidstone</strong> when your roster cannot cover</li>
          <li>Including nearby Kent stations in that travel radius</li>
          <li>Detailed attendance notes — disclosure, advice, and interview outcome</li>
          <li>Extended hours — evenings, weekends, and bank holidays</li>
          <li>Attached brochure with police station agent services (45 minutes of Maidstone)</li>
        </ul>`
      : '';

  const refLine = `<p style="font-size:12px;color:#64748b">Please include your firm name and SRA number if applicable. Ref: ${escapeHtml(prospect.id)}</p>`;

  return `
    <div style="font-family:system-ui,sans-serif;color:#0f172a;max-width:640px;line-height:1.5">
      <p>${greeting}</p>
      ${intro}
      ${benefits}
      <p style="margin:24px 0">
        <a href="${escapeHtml(ctaUrl)}"
           style="display:inline-block;padding:12px 22px;background:#1e40af;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700">
          Agent cover for solicitors
        </a>
      </p>
      <p style="font-size:14px;color:#475569">
        <a href="${SITE_URL}/contact">Contact form</a> ·
        ${outreachContactLinksHtml()} ·
        <a href="${SITE_URL}/for-solicitors">More about agent cover</a>
      </p>
      ${refLine}
      ${outreachFooter(unsubscribeUrl)}
    </div>
  `;
}

export function buildKentCorrectionEmailHtml(opts: {
  prospect: FirmProspect;
  unsubscribeUrl: string;
}): string {
  const { prospect, unsubscribeUrl } = opts;
  const ctaUrl = buildTrackedJoinUrl(prospect);
  const greeting =
    prospect.prospectType === 'solicitor' && prospect.surname
      ? `Dear ${escapeHtml([prospect.title, prospect.surname].filter(Boolean).join(' '))},`
      : 'Hello,';

  return `
    <div style="font-family:system-ui,sans-serif;color:#0f172a;max-width:640px;line-height:1.5">
      <p>${greeting}</p>
      <p>Please ignore the coverage line in our earlier email — it incorrectly suggested nationwide attendance.</p>
      <p>I provide <strong>accredited police station agent cover within about 45 minutes of Maidstone</strong> — not England &amp; Wales-wide cover. Evenings, weekends, and bank holidays included.</p>
      <ul style="margin:16px 0;padding-left:20px;line-height:1.6">
        <li>Police stations within about 45 minutes of Maidstone only</li>
        <li>Accredited duty solicitor — police station and custody work only (25+ years)</li>
        <li>Detailed attendance notes — disclosure, advice, and interview outcome</li>
        <li>Corrected brochure attached (45 minutes of Maidstone)</li>
      </ul>
      <p style="margin:24px 0">
        <a href="${escapeHtml(ctaUrl)}"
           style="display:inline-block;padding:12px 22px;background:#1e40af;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700">
          Agent cover for solicitors
        </a>
      </p>
      <p style="font-size:14px;color:#475569">
        <a href="${SITE_URL}/contact">Contact form</a> ·
        ${outreachContactLinksHtml()} ·
        <a href="${SITE_URL}/for-solicitors">More about agent cover</a>
      </p>
      <p style="font-size:12px;color:#64748b">Ref: ${escapeHtml(prospect.id)}</p>
      ${outreachFooter(unsubscribeUrl)}
    </div>
  `;
}
