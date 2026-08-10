'use client';

import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import {
  Menu, X, Shield, ChevronRight, ChevronDown,
  BookOpen, Award, Users, FileText, Scale, HelpCircle,
  MessageSquare, ClipboardList, Mic, Newspaper,
} from 'lucide-react';

const BRAND = '#0B3C5D';

type DropdownItem = {
  href: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

type NavItem =
  | { label: string; href: string; dropdown?: never }
  | { label: string; href?: never; dropdown: DropdownItem[] };

const navItems: NavItem[] = [
  {
    label: 'Training',
    dropdown: [
      { href: '/training', label: 'Course overview', desc: 'Programme structure and modules', icon: <BookOpen className="w-4 h-4" /> },
      { href: '/features', label: 'Platform features', desc: 'Mocks, scenarios, progress tracking', icon: <ClipboardList className="w-4 h-4" /> },
      { href: '/legal/course-content', label: 'What you study', desc: 'PACE, custody, interview, CIT', icon: <ClipboardList className="w-4 h-4" /> },
      { href: '/legal/who-this-is-for', label: 'Who this is for', desc: 'Aspirants, trainees, practising PSRs', icon: <Users className="w-4 h-4" /> },
      { href: '/signup', label: 'Start training', desc: 'Create your account', icon: <ChevronRight className="w-4 h-4" />, highlight: true },
    ],
  },
  {
    label: 'Accreditation',
    dropdown: [
      { href: '/legal/about-the-role', label: 'What is a PSR?', desc: 'Role and responsibilities', icon: <Scale className="w-4 h-4" /> },
      { href: '/legal/accreditation-process', label: 'Accreditation process', desc: 'How PSRAS works in England & Wales', icon: <Award className="w-4 h-4" /> },
      { href: '/guides/what-is-psras', label: 'What is PSRAS?', desc: 'Accreditation scheme explained', icon: <HelpCircle className="w-4 h-4" /> },
      { href: '/legal/how-our-training-helps', label: 'How we help', desc: 'PSRAS-aligned preparation', icon: <Mic className="w-4 h-4" /> },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Resources',
    dropdown: [
      { href: '/blog', label: 'Blog', desc: 'PSRAS prep, PACE & CIT articles', icon: <Newspaper className="w-4 h-4" /> },
      { href: '/guides', label: 'PSR & PSRAS guides', desc: 'Accreditation, PACE, CIT prep', icon: <BookOpen className="w-4 h-4" /> },
      { href: '/legal-advice', label: 'Legal advice hub', desc: 'Rights and procedure guides', icon: <FileText className="w-4 h-4" /> },
      { href: '/legal-advice/police-interviews/do-i-have-to-answer-police-questions', label: 'Interview rights', desc: 'Silence and disclosure', icon: <HelpCircle className="w-4 h-4" /> },
      { href: '/legal-advice/legal-rights/is-legal-advice-free-at-a-police-station', label: 'Free legal advice?', desc: 'Custody and solicitors', icon: <Scale className="w-4 h-4" /> },
      { href: '/legal/faq', label: 'FAQ', desc: 'Common questions', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  { label: 'About', href: '/legal/about' },
  { label: 'Contact', href: '/legal/contact' },
];

function DropdownPanel({ items }: { items: DropdownItem[] }) {
  return (
    <div className="absolute left-0 top-full z-[200] mt-1.5 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      <div className="h-0.5 w-full bg-gradient-to-r from-[#0B3C5D] to-[#D4AF37]" />
      <ul className="py-2">
        {items.map(({ href, label, desc, icon, highlight }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                highlight ? 'bg-primary-50 hover:bg-primary-100/80' : 'hover:bg-slate-50'
              }`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  highlight ? 'bg-[#0B3C5D] text-[#D4AF37]' : 'bg-primary-50 text-[#0B3C5D]'
                }`}
              >
                {icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-slate-900">{label}</p>
                <p className="mt-0.5 text-xs leading-snug text-slate-600">{desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const closeMenu = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  const keepOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    // z-[70] (above the fixed cookie banner's z-50) so an open mobile menu is never
    // covered by the cookie banner even in edge-case viewport heights.
    <header className="sticky top-0 z-[70] border-b border-[#0B3C5D]/10 bg-white/90 shadow-[0_4px_30px_-8px_rgba(11,60,93,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ring-1 ring-[#D4AF37]/25 transition group-hover:shadow-md group-hover:ring-[#D4AF37]/40"
            style={{ background: BRAND }}
          >
            <Shield className="h-5 w-5 text-[#D4AF37]" aria-hidden />
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: BRAND }}>
            PSR Train
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && openMenu(item.label)}
              onMouseLeave={() => item.dropdown && closeMenu()}
            >
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    className={`flex cursor-default items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      openDropdown === item.label
                        ? 'bg-primary-50 text-[#0B3C5D]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B3C5D]'
                    }`}
                    style={{ border: 'none', background: openDropdown === item.label ? undefined : 'transparent' }}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openDropdown === item.label ? 'rotate-180 text-gold-600' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div onMouseEnter={keepOpen} onMouseLeave={closeMenu}>
                      <DropdownPanel items={item.dropdown} />
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0B3C5D]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#0B3C5D]">
            Log in
          </Link>
          <Link
            href="/signup"
            data-testid="header-cta-start-training"
            className="btn-gold inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-[#0B3C5D]"
          >
            Start training
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileExpanded(null);
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        // max-h + overflow-y-auto keeps this panel within the viewport below the sticky
        // top bar so it scrolls internally instead of extending under the fixed cookie
        // banner (which otherwise intercepts clicks on the last few items, e.g. "Log in").
        <div className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            {navItems.map(item => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-800"
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        background: mobileExpanded === item.label ? 'rgb(248 250 252)' : 'transparent',
                      }}
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="mb-2 ml-3 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                        {item.dropdown.map(({ href, label, icon, highlight }) => (
                          <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 border-b border-slate-100 px-4 py-2.5 last:border-0 ${
                              highlight ? 'font-semibold text-[#0B3C5D]' : 'text-slate-700'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className={highlight ? 'text-gold-600' : 'text-slate-400'}>{icon}</span>
                            <span className="text-sm">{label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Link href="/login" className="px-3 py-2 text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
                Log in
              </Link>
              <Link
                href="/signup"
                data-testid="header-cta-start-training-mobile"
                className="btn-gold rounded-xl px-4 py-3 text-center text-sm font-bold text-[#0B3C5D]"
                onClick={() => setMobileOpen(false)}
              >
                Start training
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
