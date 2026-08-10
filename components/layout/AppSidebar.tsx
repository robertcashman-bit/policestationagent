'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Award,
  Settings,
  CreditCard,
  LogOut,
  BarChart3,
  Menu,
  X,
  Shield,
  AlertTriangle,
  ListChecks,
  FileCheck,
  Search,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { clearTrackedSession } from '@/components/auth/SessionTracker';
import { SidebarPartnerLinks } from '@/components/layout/SidebarPartnerLinks';

const SIDEBAR_BG = '#060d1a';
const SIDEBAR_BORDER = '#0d1e36';
const SIDEBAR_TEXT_DIM = '#3d5070';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/practice', label: 'My Training', icon: BookOpen },
  { href: '/modules', label: 'Modules', icon: FolderOpen },
  { href: '/critical-incidents', label: 'Critical Incidents', icon: AlertTriangle },
  { href: '/mock-exam', label: 'Mock exam', icon: FileCheck },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/syllabus', label: 'Syllabus', icon: ListChecks },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/certificates', label: 'Certificates', icon: Award },
];

const bottomLinks = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/billing', label: 'Billing', icon: CreditCard },
];

interface NavItemProps {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ElementType;
  readonly active: boolean;
  readonly onClick: () => void;
}

function NavItem({ href, label, icon: Icon, active, onClick }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
          active
            ? 'bg-gradient-to-r from-[#1a3a6e] to-[#0f2a52] text-white shadow-sm'
            : 'text-[#8b9bb4] hover:bg-[#0d1e36] hover:text-white'
        }`}
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
            style={{ width: '3px', height: '22px', background: 'linear-gradient(180deg, #e4c04a, #D4AF37)' }}
          />
        )}
        <Icon className="shrink-0 w-[17px] h-[17px]" />
        {label}
      </Link>
    </li>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = async () => {
    clearTrackedSession();
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out failed:', e);
    }
    window.location.assign('/');
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const navContent = (
    <div className="flex flex-col h-full" style={{ background: SIDEBAR_BG }}>
      {/* Logo */}
      <div
        className="flex h-16 items-center gap-2.5 px-4 flex-shrink-0"
        style={{ borderBottom: `1px solid ${SIDEBAR_BORDER}` }}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5 flex-1 min-w-0" onClick={closeMobile}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#1e5a7a] flex items-center justify-center shadow-md shadow-[#0B3C5D]/30 flex-shrink-0">
            <Shield style={{ width: '16px', height: '16px', color: '#ffffff' }} />
          </div>
          <div className="leading-tight min-w-0">
            <span className="font-bold text-white text-[0.875rem] tracking-tight block truncate">
              PSR Train
            </span>
            <span
              className="text-[9px] font-bold uppercase tracking-widest block"
              style={{ color: SIDEBAR_TEXT_DIM }}
            >
              Police Station Rep
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={closeMobile}
          className="lg:hidden p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: SIDEBAR_TEXT_DIM }}
          aria-label="Close menu"
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p
          className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: SIDEBAR_TEXT_DIM }}
        >
          Training
        </p>
        <ul className="space-y-0.5">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={isActive(link.href)}
              onClick={closeMobile}
            />
          ))}
        </ul>

        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${SIDEBAR_BORDER}` }}>
          <p
            className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: SIDEBAR_TEXT_DIM }}
          >
            Account
          </p>
          <ul className="space-y-0.5">
            {bottomLinks.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                active={isActive(link.href)}
                onClick={closeMobile}
              />
            ))}
          </ul>
        </div>
      </nav>

      <SidebarPartnerLinks />

      {/* Logout */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: `1px solid ${SIDEBAR_BORDER}` }}>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 text-[#3d5070] hover:bg-[#0d1e36] hover:text-white"
        >
          <LogOut style={{ width: '17px', height: '17px' }} className="shrink-0" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
        style={{ background: SIDEBAR_BG, border: `1px solid ${SIDEBAR_BORDER}` }}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 flex flex-col transform transition-transform duration-200 ease-out
          lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {navContent}
      </aside>
    </>
  );
}
