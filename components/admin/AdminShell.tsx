'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AdminShell({ title, description, children }: AdminShellProps) {
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Still redirect even if the request fails
    }
    window.location.href = '/admin/login';
  }

  const navLink = (href: string, label: string) => {
    const active = pathname === href || pathname?.startsWith(`${href}/`);
    return (
      <Link
        href={href}
        className={`font-medium hover:underline ${
          active ? 'text-[#0A2342] underline' : 'text-gray-700 hover:text-[#0A2342]'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-3 h-16">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0A2342]">Admin</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {navLink('/admin', 'Dashboard')}
              {navLink('/admin/firm-outreach', 'Firm outreach')}
              {navLink('/admin/blog-generator', 'Blog generator')}
              <Link href="/" className="text-gray-700 hover:text-[#0A2342] font-medium">
                View site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
