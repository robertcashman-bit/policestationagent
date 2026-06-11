import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';
import { FirmOutreachDashboard } from '@/components/admin/FirmOutreachDashboard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Firm outreach | Admin',
  description: 'Kent agent cover outreach — discovery, enrichment, and email sends.',
  robots: { index: false, follow: false },
};

export default function FirmOutreachAdminPage() {
  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell
          active="firm-outreach"
          adminEmail={email}
          title="Firm outreach"
          description="Automated discovery, email enrichment, and Kent agent cover invitations for criminal defence firms and solicitors."
        >
          <FirmOutreachDashboard />
        </AdminShell>
      )}
    </AdminGate>
  );
}
