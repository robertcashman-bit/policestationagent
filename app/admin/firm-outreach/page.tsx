import { requireAdminAuth, isJWTSecretConfigured } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { FirmOutreachDashboard } from "@/components/admin/FirmOutreachDashboard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Firm outreach | Admin",
  description: "Kent agent cover outreach — discovery, enrichment, and email sends.",
  robots: { index: false, follow: false },
};

export default async function FirmOutreachAdminPage() {
  if (!isJWTSecretConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700 mb-2">
            JWT_SECRET environment variable is not properly configured.
          </p>
        </div>
      </div>
    );
  }

  await requireAdminAuth();

  return (
    <AdminShell
      title="Firm outreach"
      description="Automated discovery, email enrichment, and Kent agent cover invitations for criminal defence firms and solicitors."
    >
      <FirmOutreachDashboard />
    </AdminShell>
  );
}
