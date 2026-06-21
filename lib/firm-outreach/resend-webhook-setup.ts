import { Resend } from 'resend';

const WEBHOOK_URL =
  process.env.RESEND_WEBHOOK_URL_OVERRIDE || 'https://www.policestationagent.com/api/webhooks/resend';

const EVENTS = [
  'email.sent',
  'email.delivered',
  'email.opened',
  'email.clicked',
  'email.bounced',
  'email.complained',
] as const;

function eventsMatch(existing: string[] | undefined): boolean {
  if (!existing?.length) return false;
  const want = new Set(EVENTS);
  for (const e of want) {
    if (!existing.includes(e)) return false;
  }
  return true;
}

export async function configureResendOutreachWebhook(): Promise<{
  ok: boolean;
  webhookId?: string;
  signingSecret?: string;
  action: 'existing' | 'created' | 'updated';
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, action: 'existing', error: 'RESEND_API_KEY not configured' };
  }

  const resend = new Resend(apiKey);
  const { data: listData, error: listError } = await resend.webhooks.list();
  if (listError) {
    return { ok: false, action: 'existing', error: listError.message };
  }

  const hooks = listData?.data ?? [];
  const ours = hooks.find((h) => h.endpoint === WEBHOOK_URL);

  if (ours && eventsMatch(ours.events ?? undefined) && ours.status === 'enabled') {
    const { data: detail } = await resend.webhooks.get(ours.id);
    return {
      ok: true,
      webhookId: ours.id,
      signingSecret: detail?.signing_secret,
      action: 'existing',
    };
  }

  if (ours) {
    const { error } = await resend.webhooks.update(ours.id, {
      endpoint: WEBHOOK_URL,
      events: [...EVENTS],
      status: 'enabled',
    });
    if (error) {
      return { ok: false, action: 'updated', error: error.message };
    }
    const { data: detail } = await resend.webhooks.get(ours.id);
    return {
      ok: true,
      webhookId: ours.id,
      signingSecret: detail?.signing_secret,
      action: 'updated',
    };
  }

  const { data, error } = await resend.webhooks.create({
    endpoint: WEBHOOK_URL,
    events: [...EVENTS],
  });
  if (error) {
    return { ok: false, action: 'created', error: error.message };
  }

  return {
    ok: true,
    webhookId: data.id,
    signingSecret: data.signing_secret,
    action: 'created',
  };
}
