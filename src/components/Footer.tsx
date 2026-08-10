import Link from "next/link";
import { CustodyNoteLogo } from "./CustodyNoteLogo";

const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Free trial", href: "/trial" },
    { label: "Download", href: "/download" },
  ],
  support: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Cloud Backup", href: "/cloud-backup" },
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" },
  ],
  network: [
    {
      label: "Police Station Rep UK",
      href: "https://policestationrepuk.org/?utm_source=custodynote&utm_medium=web&utm_campaign=footer",
      external: true,
    },
    {
      label: "PSR Train",
      href: "https://psrtrain.com/?utm_source=custodynote&utm_medium=web&utm_campaign=footer",
      external: true,
    },
    {
      label: "Police Station Agent",
      href: "https://www.policestationagent.com/?utm_source=custodynote&utm_medium=web&utm_campaign=footer",
      external: true,
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Changelog", href: "/changelog" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-custody-slate/20 bg-custody-light/50 dark:border-custody-light/10 dark:bg-custody-slate/30" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2">
              <CustodyNoteLogo className="h-6 w-6 shrink-0" />
              <p className="text-sm font-semibold text-custody-navy dark:text-white">
                Custody Note
              </p>
            </div>
            <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/70">
              Built for freelance police station reps and
              criminal solicitors across England &amp; Wales.
            </p>
            <Link
              href="/trial"
              className="mt-3 inline-block text-sm font-medium text-custody-accent transition-colors hover:text-custody-accentLight"
            >
              Start free trial &rarr;
            </Link>
          </div>
          <nav aria-label="Product links">
            <p className="text-sm font-semibold text-custody-navy dark:text-white">
              Product
            </p>
            <ul className="mt-2 space-y-2" role="list">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-custody-slate transition-colors hover:text-custody-accent dark:text-custody-light/70 dark:hover:text-custody-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Support links">
            <p className="text-sm font-semibold text-custody-navy dark:text-white">
              Support
            </p>
            <ul className="mt-2 space-y-2" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-custody-slate transition-colors hover:text-custody-accent dark:text-custody-light/70 dark:hover:text-custody-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Network partner links">
            <p className="text-sm font-semibold text-custody-navy dark:text-white">
              Network
            </p>
            <ul className="mt-2 space-y-2" role="list">
              {footerLinks.network.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-custody-slate transition-colors hover:text-custody-accent dark:text-custody-light/70 dark:hover:text-custody-accent"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal links">
            <p className="text-sm font-semibold text-custody-navy dark:text-white">
              Legal
            </p>
            <ul className="mt-2 space-y-2" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-custody-slate transition-colors hover:text-custody-accent dark:text-custody-light/70 dark:hover:text-custody-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-custody-slate/20 pt-8 text-center text-sm text-custody-slate dark:border-custody-light/10 dark:text-custody-light/60">
          &copy; {new Date().getFullYear()} Custody Note. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
