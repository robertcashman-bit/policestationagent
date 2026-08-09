import Link from "next/link";
import { getFormattedVersion, getLastUpdateDateTime } from "@/lib/version";
import { CHROME_BRAND_TAGLINE, CHROME_HELP_STRIP, SERVICE_SCOPE_SHORT } from "@/config/contact";
import { FOOTER_LEGAL } from "@/config/footer-links";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";

const PUBLIC_HELP = [
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews" },
  { href: PATH_CUSTODY, label: "Current custody" },
  { href: "/can-we-help", label: "Can we help?" },
  { href: "/faq", label: "FAQ" },
];

const PROFESSIONALS = [
  { href: PATH_AGENCY, label: "Agency cover" },
  { href: `${PATH_AGENCY}#agency-instructions`, label: "Send instructions" },
  { href: "/servicerates", label: "Rates" },
  { href: "/attendanceterms", label: "Terms" },
];

const INFORMATION = [
  { href: "/coverage", label: "Areas covered" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: PATH_CONTACT, label: "Contact" },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.12em] text-accent-light mb-3 font-semibold">
        {title}
      </h2>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white/75 hover:text-accent-light transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
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
    <footer className="bg-primary-dark text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="pb-6 border-b border-white/10">
          <Link
            href="/"
            className="font-display font-bold text-lg text-white hover:text-accent-light transition-colors"
          >
            Police Station Agent
          </Link>
          <p className="text-sm text-accent-light mt-1">{CHROME_BRAND_TAGLINE}</p>
          <p className="text-xs text-white/80 mt-1 max-w-xl">{CHROME_HELP_STRIP}</p>
          <p className="text-xs text-white/75 mt-1 max-w-xl">{SERVICE_SCOPE_SHORT}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-b border-white/10">
          <Column title="Public help" links={PUBLIC_HELP} />
          <Column title="For professionals" links={PROFESSIONALS} />
          <Column title="Information" links={INFORMATION} />
          <div>
            <h2 className="text-xs uppercase tracking-[0.12em] text-accent-light mb-3 font-semibold">
              Legal
            </h2>
            <ul className="space-y-2 text-sm">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-5 border-b border-white/10">
          <p className="text-xs text-white/80 max-w-3xl">
            Independent criminal defence solicitor website. For police assistance call 101, or 999
            in an emergency. We cannot transfer calls to the police and do not provide free general
            legal advice by telephone.
          </p>
        </div>

        <div className="pt-6 text-center">
          <div className="mb-4 max-w-3xl mx-auto p-3 bg-white/5 rounded-lg text-xs text-white/85">
            <p>
              <span className="font-semibold text-white">Robert Cashman</span> is a criminal defence
              solicitor. All legal services provided through{" "}
              <span className="font-semibold text-white">Tuckers Solicitors</span> (SRA ID: 127795).
            </p>
            <p className="text-white/75 mt-1">
              We act in relation to active police investigations and interviews. We do not provide
              free general advice after release.
            </p>
          </div>
          <p className="text-xs text-white/70">
            © {currentYear} Police Station Agent · {appVersion}
            {lastUpdate ? ` · Updated ${lastUpdate}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
