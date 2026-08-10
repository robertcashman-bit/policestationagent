import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getCertificateForUser } from '@/lib/certificates';
import { SITE } from '@/lib/site';
import { CertificatePrintButton } from '@/components/certificates/CertificatePrintButton';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return { title: 'Certificate' };

  const cert = await getCertificateForUser(user.id, id);
  if (!cert) return { title: 'Certificate not found' };

  return {
    title: `${cert.title} | Certificate`,
    description: cert.description,
  };
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect(`/auth?next=/certificates/${(await params).id}`);

  const { id } = await params;
  const cert = await getCertificateForUser(user.id, id);
  if (!cert) notFound();

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString('en-GB', { dateStyle: 'long' });
  const displayName = user.email?.split('@')[0]?.replace(/[._]/g, ' ') ?? 'Candidate';

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="print:hidden">
        <Link href="/certificates" className="text-sm font-medium text-primary hover:underline">
          ← Back to certificates
        </Link>
      </div>

      <div className="rounded-2xl border-4 border-[#0B3C5D] bg-white p-10 sm:p-14 text-center shadow-card print:shadow-none">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0B3C5D]/70 mb-4">
          {SITE.name}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3C5D] mb-2">
          Certificate of Completion
        </h1>
        <p className="text-slate-600 mb-8">This certifies that</p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900 capitalize mb-8">{displayName}</p>
        <p className="text-slate-700 max-w-lg mx-auto leading-relaxed mb-2">
          has successfully completed the training milestone:
        </p>
        <p className="text-xl font-semibold text-[#0B3C5D] mb-2">{cert.title}</p>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-10">{cert.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600 border-t border-slate-200 pt-8">
          <p>
            <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Issued</span>
            {issuedDate}
          </p>
          <p>
            <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
              Certificate ID
            </span>
            {cert.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <p className="text-[11px] text-slate-500 mt-10 max-w-md mx-auto leading-relaxed">
          This certificate is evidence of training completed on {SITE.name} only. It does not
          constitute PSRAS accreditation, SRA authorisation, or entitlement to provide police station
          legal advice.
        </p>
      </div>

      <CertificatePrintButton />
    </div>
  );
}
