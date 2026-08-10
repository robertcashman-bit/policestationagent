import Link from 'next/link';
import { Shield } from 'lucide-react';
import { SITE } from '@/lib/site';
import { PSRUK_DIRECTORY_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';
import { PSA_HOME_HREF } from '@/lib/policestationagent-promo';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/disclaimer', label: 'Disclaimer' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/refund', label: 'Refunds' },
  { href: '/legal/complaints', label: 'Complaints' },
];

const resourceLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/guides', label: 'PSR Guides' },
  { href: '/training', label: 'Training' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/legal-advice', label: 'Legal advice hub' },
  { href: '/legal/faq', label: 'FAQ' },
];

const partnerLinks = [
  { href: PSRUK_DIRECTORY_HREF, label: 'PoliceStationRepUK.com' },
  { href: CUSTODYNOTE_TRIAL_HREF, label: 'CustodyNote.com' },
  { href: PSA_HOME_HREF, label: 'PoliceStationAgent.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="PSR Train home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B3C5D]">
                <Shield className="h-5 w-5 text-[#D4AF37]" aria-hidden />
              </span>
              <span className="text-lg font-bold text-[#0B3C5D]">{SITE.name}</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-700">
              Bright, focused PSRAS preparation — mock exams, CIT-style scenarios, and PACE-aligned
              study for candidates in England &amp; Wales.
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-600">
              {SITE.footerLegalShort}{' '}
              <Link href="/legal/about" className="font-medium text-[#0B3C5D] underline underline-offset-2">
                Company details
              </Link>
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#0B3C5D]">Resources</p>
            <ul className="space-y-2">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-700 transition hover:text-[#0B3C5D]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#0B3C5D]">Partners</p>
            <ul className="space-y-2">
              {partnerLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-700 transition hover:text-[#0B3C5D]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mb-1 mt-6 text-xs font-bold uppercase tracking-wider text-[#0B3C5D]">Support</p>
            <Link href="/legal/contact" className="text-sm font-medium text-[#0B3C5D] hover:underline">
              Contact us
            </Link>
          </div>
        </div>

        <nav
          className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-8"
          aria-label="Legal"
        >
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-xs text-slate-600 transition hover:text-[#0B3C5D]">
              {label}
            </Link>
          ))}
          <Link href="/legal/contact" className="text-xs text-slate-600 transition hover:text-[#0B3C5D]">
            Contact
          </Link>
        </nav>

        <p className="mt-6 text-center text-xs text-slate-500 sm:text-left">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
