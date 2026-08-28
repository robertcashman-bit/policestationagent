import { describe, expect, it } from 'vitest';
import { GET, POST } from '@/app/api/outreach/send-approved/route';

describe('outreach send-approved route', () => {
  it('GET returns 410 permanently disabled', async () => {
    const res = await GET();
    expect(res.status).toBe(410);
    const json = await res.json();
    expect(json.reason).toBe('psa_outreach_emails_disabled');
  });

  it('POST returns 410 permanently disabled', async () => {
    const res = await POST();
    expect(res.status).toBe(410);
    const json = await res.json();
    expect(json.disabled).toBe(true);
  });
});
