import Link from "next/link";
import { getFormattedVersion, getLastUpdateDateTime } from "@/lib/version";
import { CHROME_BRAND_TAGLINE, CHROME_HELP_STRIP, SERVICE_SCOPE_SHORT } from "@/config/contact";
import {
  FOOTER_ADVICE_PAGES,
  FOOTER_LEGAL,
  FOOTER_NETWORK_LINKS,
  FOOTER_RIGHTS_GUIDES,
  FOOTER_STATION_HUBS,
  isBlockedRepUkUrl,
  type FooterLink,
} from "@/config/footer-links";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import {
  CUSTODYNOTE_DOWNLOAD_CTA,
  CUSTODYNOTE_DOWNLOAD_HREF,
  CUSTODYNOTE_MAC_DOWNLOAD_CTA,
  CUSTODYNOTE_MAC_DOWNLOAD_HREF,
  CUSTODYNOTE_MICROSOFT_STORE_CTA,
  CUSTODYNOTE_MICROSOFT_STORE_HREF,
  CUSTODYNOTE_STORE_WINDOWS_NOTE,
} from "@/lib/custodynote-promo";
import { FooterCollapsibleSection } from "@/components/FooterCollapsibleSection";

const PUBLIC_HELP: FooterLink[] = [
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews" },
  { href: PATH_CUSTODY, label: "Current custody" },
  { href: "/canwehelp", label: "Can we help?" },
  { href: "/faq", label: "FAQ" },
];

const PROFESSIONALS: FooterLink[] = [
  { href: PATH_AGENCY, label: "Agency cover" },
  { href: `${PATH_AGENCY}#agency-instructions`, label: "Send instructions" },
  { href: "/servicerates", label: "Rates" },
  { href: "/attendanceterms", label: "Terms" },
];

const INFORMATION: FooterLink[] = [
  { href: "/coverage", label: "Areas covered" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: PATH_CONTACT, label: "Contact" },
];

const CORE_COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: "Public help", links: PUBLIC_HELP },
  { title: "For professionals", links: PROFESSIONALS },
  { title: "Information", links: INFORMATION },
  { title: "Legal", links: FOOTER_LEGAL },
];

const RICH_COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: "Rights & guides", links: FOOTER_RIGHTS_GUIDES },
  { title: "Kent hubs", links: FOOTER_STATION_HUBS },
  { title: "Advice", links: FOOTER_ADVICE_PAGES },
];

function safeLinks(links: FooterLink[]): FooterLink[] {
  return links.filter((link) => !isBlockedRepUkUrl(link.href));
}

function FooterLinkList({ links, dense = false }: { links: FooterLink[]; dense?: boolean }) {
  const items = safeLinks(links);
  return (
    <ul className={dense ? "space-y-1.5 text-[13px] leading-snug" : "space-y-2 text-sm"}>
      {items.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {link.external ? (
            <a
              href={link.href}
              className="text-white/75 transition-colors hover:text-accent-light"
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ) : (
            <Link
              href={link.href}
              className="text-white/75 transition-colors hover:text-accent-light"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function DesktopColumn({
  title,
  links,
  dense = false,
}: {
  title: string;
  links: FooterLink[];
  dense?: boolean;
}) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-light">
        {title}
      </h2>
      <FooterLinkList links={links} dense={dense} />
    </div>
  );
}

function NetworkTools() {
  const network = safeLinks(FOOTER_NETWORK_LINKS);
  const store = network.find((l) => l.href === CUSTODYNOTE_MICROSOFT_STORE_HREF);
  // Mac and backup share the same download href; distinguish by label.
  const mac = network.find(
    (l) => l.href === CUSTODYNOTE_MAC_DOWNLOAD_HREF && l.label === CUSTODYNOTE_MAC_DOWNLOAD_CTA
  );
  const textLinks = network.filter(
    (l) =>
      l.href !== CUSTODYNOTE_MICROSOFT_STORE_HREF &&
      !(l.href === CUSTODYNOTE_MAC_DOWNLOAD_HREF && l.label === CUSTODYNOTE_MAC_DOWNLOAD_CTA)
  );

  return (
    <div
      className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
      data-cn-store-promo="footer"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-light">
        Network / tools
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
        {store ? (
          <a
            href={store.href}
            className="inline-flex min-h-10 w-fit items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-md transition-colors hover:bg-accent-light"
            rel="noopener noreferrer"
            target="_blank"
            data-cn-store-cta="footer"
          >
            {CUSTODYNOTE_MICROSOFT_STORE_CTA}
          </a>
        ) : null}
        {mac ? (
          <a
            href={mac.href}
            className="inline-flex min-h-10 w-fit items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-md transition-colors hover:bg-accent-light"
            rel="noopener noreferrer"
            target="_blank"
            data-cn-mac-cta="footer"
          >
            {CUSTODYNOTE_MAC_DOWNLOAD_CTA}
          </a>
        ) : null}
      </div>
      <ul className="mt-3 flex flex-col gap-1.5 text-[13px] leading-snug sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1.5">
        {textLinks.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {link.external ? (
              <a
                href={link.href}
                className="text-white/70 transition-colors hover:text-accent-light"
                rel="noopener noreferrer"
                target="_blank"
                {...(link.href === CUSTODYNOTE_DOWNLOAD_HREF
                  ? { "data-cn-backup-cta": "footer" }
                  : {})}
              >
                {link.href === CUSTODYNOTE_DOWNLOAD_HREF ? CUSTODYNOTE_DOWNLOAD_CTA : link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-white/70 transition-colors hover:text-accent-light"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-2xl text-xs text-white/55">{CUSTODYNOTE_STORE_WINDOWS_NOTE}</p>
    </div>
  );
}

export default function Footer({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const currentYear = new Date().getFullYear();
  const appVersion = getFormattedVersion();
  const lastUpdate = getLastUpdateDateTime();

  return (
    <footer className="relative z-10 bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="border-b border-white/10 pb-6">
          <Link
            href="/"
            className="font-display text-lg font-bold text-white transition-colors hover:text-accent-light"
          >
            Police Station Agent
          </Link>
          <p className="mt-1 text-sm text-accent-light">{CHROME_BRAND_TAGLINE}</p>
          <p className="mt-1 max-w-xl text-xs text-white/80">{CHROME_HELP_STRIP}</p>
          <p className="mt-1 max-w-xl text-xs text-white/75">{SERVICE_SCOPE_SHORT}</p>
        </div>

        <div className="border-b border-white/10 py-2 md:hidden">
          {CORE_COLUMNS.map((col, i) => (
            <FooterCollapsibleSection key={col.title} title={col.title} defaultOpen={i === 0}>
              <FooterLinkList links={col.links} />
            </FooterCollapsibleSection>
          ))}
          {RICH_COLUMNS.map((col) => (
            <FooterCollapsibleSection key={col.title} title={col.title}>
              <FooterLinkList links={col.links} dense />
            </FooterCollapsibleSection>
          ))}
        </div>

        <div className="hidden border-b border-white/10 py-8 md:block">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_COLUMNS.map((col) => (
              <DesktopColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-3">
            {RICH_COLUMNS.map((col) => (
              <DesktopColumn key={col.title} title={col.title} links={col.links} dense />
            ))}
          </div>
        </div>

        <div className="border-b border-white/10 py-6">
          <NetworkTools />
        </div>

        <div className="border-b border-white/10 py-5">
          <p className="max-w-3xl text-xs text-white/80">
            Independent criminal defence solicitor website. For police assistance call 101, or 999
            in an emergency. We cannot transfer calls to the police and do not provide free general
            legal advice by telephone.
          </p>
        </div>

        <div className="pt-6 text-center">
          <div className="mx-auto mb-4 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/85">
            <p>
              <span className="font-semibold text-white">Robert Cashman</span> is a criminal defence
              solicitor. All legal services provided through{" "}
              <span className="font-semibold text-white">Tuckers Solicitors</span> (SRA ID: 127795).
            </p>
            <p className="mt-1 text-white/75">
              We act in relation to active police investigations and interviews. We do not provide
              free general advice after release.
            </p>
          </div>
          <p className="text-xs text-white/70" title={appVersion}>
            © {currentYear} Police Station Agent
            {lastUpdate ? ` · Updated ${lastUpdate}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
