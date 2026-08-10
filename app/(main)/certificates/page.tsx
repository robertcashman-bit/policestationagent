import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Award, Download } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { evaluateAndIssueCertificates, getUserCertificates } from '@/lib/certificates';

export const metadata = {
  title: 'Certificates',
  description: 'Your earned certificates.',
};

export default async function CertificatesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth?next=/certificates');

  await evaluateAndIssueCertificates(user.id);
  const certificates = await getUserCertificates(user.id);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="app-page-header">
        <p className="section-label mb-1.5">Achievements</p>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Certificates</h1>
        <p className="text-muted-foreground mt-1">
          Training completion evidence — not PSRAS accreditation or professional authorisation.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="app-panel p-8">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="icon-tile-gradient w-20 h-20 rounded-full mb-6">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No certificates yet</h2>
            <p className="text-muted-foreground mb-6">
              Earn certificates by passing a mock exam (70%+) or reaching 100 practice questions
              with 60%+ accuracy.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/mock-exam"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Try mock exam
              </Link>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Start practice
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ul className="reveal-stagger grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <li
              key={cert.id}
              className="app-stat-card p-6 flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="icon-tile-gradient w-11 h-11 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{cert.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Issued{' '}
                    {new Date(cert.issuedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
                  </p>
                </div>
              </div>
              <Link
                href={`/certificates/${cert.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-auto"
              >
                <Download className="w-4 h-4" />
                View &amp; print certificate
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
