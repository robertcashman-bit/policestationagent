import Link from "next/link";
import { getRecentPosts } from "@/lib/blog-reader";
import { getFormattedVersion, getLastUpdateDateTime } from "@/lib/version";
import {
  SERVICE_SCOPE_SHORT,
  SMS_DISPLAY,
  SMS_TEL,
} from "@/config/contact";
import RouteAwarePhoneLink from "@/components/compliance/RouteAwarePhoneLink";
import {
  FOOTER_ADVICE_PAGES,
  FOOTER_BLOG_LIMIT,
  FOOTER_LEGAL,
  FOOTER_NETWORK_LINKS,
  FOOTER_PRIORITY_LINKS,
  FOOTER_RIGHTS_GUIDES,
  FOOTER_SERVICES,
  FOOTER_STATION_HUBS,
} from "@/config/footer-links";
import { FooterCollapsibleSection } from "@/components/FooterCollapsibleSection";

function FooterLinkList({
  links,
  className = "",
}: {
  links: { href: string; label: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {links.map((link) => (
        <li key={`${link.href}::${link.label}`}>
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className="text-sky-300 hover:text-white transition-colors">
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = getFormattedVersion();
  const lastUpdate = getLastUpdateDateTime();
  const blogPosts = getRecentPosts(FOOTER_BLOG_LIMIT);

  return (
    <footer className="bg-slate-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link href="/" className="font-bold text-lg text-white hover:text-blue-300 transition-colors">
              Police Station Agent
            </Link>
            <p className="text-sm text-sky-300 mt-1">Independent duty solicitor — NOT the police</p>
            <p className="text-xs text-sky-400/90 mt-1 max-w-xl">{SERVICE_SCOPE_SHORT}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <RouteAwarePhoneLink variant="footer" />
            <span className="text-sky-600">|</span>
            <a
              href={`sms:${SMS_TEL}?body=I%20need%20custody%20or%20scheduled%20interview%20representation`}
              className="text-sky-300 hover:text-sky-200 font-medium"
            >
              Text {SMS_DISPLAY}
            </a>
          </div>
        </div>

        {/* Priority links — always visible */}
        <nav aria-label="Priority pages" className="py-5 border-b border-slate-800">
          <p className="text-xs uppercase tracking-wide text-sky-400 mb-1 font-semibold">Kent-wide cover</p>
          <p className="text-xs text-sky-500/90 mb-3">All Kent stations — including regular attendance at Gravesend and Tonbridge</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {FOOTER_PRIORITY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white font-medium hover:text-sky-200 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapsible link sections */}
        <div className="py-2 border-b border-slate-800 text-sm">
          <FooterCollapsibleSection title="Latest articles">
            <FooterLinkList
              links={blogPosts.map((post) => ({
                href: `/blog/${post.slug}`,
                label: post.title,
              }))}
            />
            <Link href="/blog" className="inline-block mt-3 text-sky-200 font-medium hover:text-white text-xs">
              View all blog posts →
            </Link>
          </FooterCollapsibleSection>

          <FooterCollapsibleSection title="Rights &amp; guides">
            <FooterLinkList links={FOOTER_RIGHTS_GUIDES} />
          </FooterCollapsibleSection>

          <FooterCollapsibleSection title="Advice pages">
            <FooterLinkList links={FOOTER_ADVICE_PAGES} />
          </FooterCollapsibleSection>

          <FooterCollapsibleSection title="Kent stations &amp; services">
            <FooterLinkList links={[...FOOTER_STATION_HUBS, ...FOOTER_SERVICES.slice(0, 4)]} />
          </FooterCollapsibleSection>

          <FooterCollapsibleSection title="Related sites">
            <FooterLinkList links={FOOTER_NETWORK_LINKS} />
          </FooterCollapsibleSection>
        </div>

        {/* Legal row */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-sky-300 py-4 border-b border-slate-800">
          {FOOTER_LEGAL.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center">
          <div className="mb-4 max-w-3xl mx-auto p-3 bg-white/5 rounded-lg text-xs text-sky-200">
            <p>
              <span className="font-semibold text-white">Robert Cashman</span> is a criminal defence
              solicitor. All legal services provided through{" "}
              <span className="font-semibold text-white">Tuckers Solicitors</span> (SRA ID: 127795).
            </p>
            <p className="text-sky-300 mt-1">
              We act in relation to active police investigations and interviews. We do not provide
              general criminal law advice or hypothetical consultations.
            </p>
          </div>

          <p className="text-xs text-sky-300">
            © {currentYear} Defence Legal Services Limited T/A Police Station Agent. Company No. 09900871
          </p>
          <p className="text-xs text-sky-400 mt-1">
            Registered Office: Greenacre, London Road, West Kingsdown, Sevenoaks, Kent, TN15 6ER
          </p>
          <p className="text-xs text-sky-500 mt-2">
            {appVersion} · Updated: {lastUpdate}
          </p>
        </div>
      </div>
    </footer>
  );
}
