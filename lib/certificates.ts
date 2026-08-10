import { createClient } from '@/lib/supabase/server';

export const CERTIFICATE_TYPES = {
  mock_exam_pass: {
    urlKey: 'mock_exam_pass',
    title: 'Mock exam pass',
    description: 'Completed a timed mock exam with 70% or higher.',
  },
  practice_milestone: {
    urlKey: 'practice_milestone_100',
    title: 'Practice milestone',
    description: 'Answered 100+ practice questions with 60% or higher accuracy.',
  },
} as const;

export type CertificateType = keyof typeof CERTIFICATE_TYPES;

export type UserCertificate = {
  id: string;
  type: CertificateType;
  title: string;
  description: string;
  issuedAt: string;
};
const MOCK_EXAM_PASS_PCT = 70;
const PRACTICE_MILESTONE_COUNT = 100;
const PRACTICE_MILESTONE_ACCURACY = 60;

export async function getUserCertificates(userId: string): Promise<UserCertificate[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('certificates')
    .select('id, certificate_url, issued_at')
    .eq('user_id', userId)
    .order('issued_at', { ascending: false });

  const results: UserCertificate[] = [];

  for (const row of data ?? []) {
    const entry = Object.entries(CERTIFICATE_TYPES).find(
      ([, meta]) => meta.urlKey === row.certificate_url,
    );
    if (!entry) continue;
    const [type, meta] = entry as [CertificateType, (typeof CERTIFICATE_TYPES)[CertificateType]];
    results.push({
      id: row.id as string,
      type,
      title: String(meta.title),
      description: String(meta.description),
      issuedAt: row.issued_at as string,
    });
  }

  return results;
}

async function hasCertificate(userId: string, urlKey: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('certificates')
    .select('id')
    .eq('user_id', userId)
    .eq('certificate_url', urlKey)
    .maybeSingle();
  return Boolean(data);
}

export async function evaluateAndIssueCertificates(userId: string): Promise<UserCertificate[]> {
  const supabase = await createClient();
  const issued: UserCertificate[] = [];

  const { data: mockSession } = await supabase
    .from('mock_exam_sessions')
    .select('percentage')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (
    mockSession?.percentage != null &&
    Number(mockSession.percentage) >= MOCK_EXAM_PASS_PCT &&
    !(await hasCertificate(userId, CERTIFICATE_TYPES.mock_exam_pass.urlKey))
  ) {
    const { data: inserted } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        module_id: null,
        certificate_url: CERTIFICATE_TYPES.mock_exam_pass.urlKey,
      })
      .select('id, issued_at')
      .single();

    if (inserted) {
      issued.push({
        id: inserted.id as string,
        type: 'mock_exam_pass',
        title: CERTIFICATE_TYPES.mock_exam_pass.title,
        description: CERTIFICATE_TYPES.mock_exam_pass.description,
        issuedAt: inserted.issued_at as string,
      });
    }
  }

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('answered_correctly')
    .eq('user_id', userId);

  const rows = progressRows ?? [];
  const total = rows.length;
  const correct = rows.filter((r) => r.answered_correctly).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  if (
    total >= PRACTICE_MILESTONE_COUNT &&
    accuracy >= PRACTICE_MILESTONE_ACCURACY &&
    !(await hasCertificate(userId, CERTIFICATE_TYPES.practice_milestone.urlKey))
  ) {
    const { data: inserted } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        module_id: null,
        certificate_url: CERTIFICATE_TYPES.practice_milestone.urlKey,
      })
      .select('id, issued_at')
      .single();

    if (inserted) {
      issued.push({
        id: inserted.id as string,
        type: 'practice_milestone',
        title: CERTIFICATE_TYPES.practice_milestone.title,
        description: CERTIFICATE_TYPES.practice_milestone.description,
        issuedAt: inserted.issued_at as string,
      });
    }
  }

  return issued;
}

export async function getCertificateForUser(
  userId: string,
  certificateId: string,
): Promise<UserCertificate | null> {
  const certs = await getUserCertificates(userId);
  return certs.find((c) => c.id === certificateId) ?? null;
}
