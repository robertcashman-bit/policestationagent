"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFormattedVersion, getLastUpdateDateTime } from "@/lib/version";

// Link data organized by category
const serviceLinks = [
  { href: "/services", label: "Police Station Rep Services Kent", priority: true },
  { href: "/services/police-station-representation", label: "Police Station Representation" },
  { href: "/offences-we-deal-with", label: "Offences We Deal With", priority: true },
  { href: "/voluntary-interviews", label: "Voluntary Interviews" },
  { href: "/courtrepresentation", label: "Court Representation" },
  { href: "/for-solicitors", label: "Agent Cover for Law Firms" },
  { href: "/privatecrime", label: "Private Client Service" },
  { href: "/fees", label: "Legal Aid & Fees" },
  { href: "/for-clients", label: "For Clients" },
  { href: "/emergency-police-station-representation", label: "Emergency Representation" },
  { href: "/court-representation", label: "Court Representation (Alt)" },
  { href: "/servicesvoluntaryinterviews", label: "Voluntary Interviews (Alt)" },
  { href: "/private-crime", label: "Private Crime (Alt)" },
  { href: "/forsolicitors", label: "For Solicitors (Alt)" },
  { href: "/freelegaladvice", label: "Free Legal Advice" },
  { href: "/voluntary-police-interview", label: "Voluntary Police Interview" },
  // Keep legacy slug around only if a page exists; otherwise link to the canonical route.
  { href: "/voluntary-police-interview", label: "Voluntary Interview Solicitor" },
  { href: "/voluntaryinterviews", label: "Voluntary Interviews (Alt 2)" },
];

const helpLinks = [
  { href: "/faq", label: "Frequently Asked Questions", priority: true },
  { href: "/offences-we-deal-with", label: "Offences We Deal With", priority: true },
  { href: "/police-custody-rights", label: "Police Custody Rights", priority: true },
  { href: "/police-interview-rights", label: "Police Interview Rights", priority: true },
  { href: "/custody-time-limits", label: "Custody Time Limits" },
  { href: "/pace-code-c", label: "PACE Code C Rights" },
  { href: "/no-comment-interview", label: "No Comment Interviews" },
  { href: "/prepared-statements", label: "Prepared Statements" },
  { href: "/adverse-inference", label: "Adverse Inferences" },
  { href: "/released-under-investigation", label: "Released Under Investigation" },
  { href: "/police-bail-explained", label: "Police Bail Explained" },
  { href: "/youth-custody-rights", label: "Youth Custody Rights" },
  { href: "/appropriate-adult", label: "Appropriate Adults" },
  { href: "/can-police-take-my-phone", label: "Can Police Take My Phone?" },
  { href: "/dna-fingerprints-police-station", label: "DNA & Fingerprints" },
  { href: "/blog", label: "Legal Advice Blog", priority: true },
  {
    href: "/what-to-do-if-a-loved-one-is-arrested",
    label: "What to Do if a Loved One is Arrested",
  },
  { href: "/arrested-what-to-do", label: "Arrested - What to Do" },
  { href: "/article-loved-one-arrested-kent", label: "Loved One Arrested in Kent" },
  { href: "/arrival-times-delays", label: "Arrival Times & Delays" },
  { href: "/booking-in-procedure-in-kent", label: "Booking Procedure in Kent" },
  { href: "/importance-of-early-legal-advice", label: "Importance of Early Legal Advice" },
  { href: "/preparing-for-police-interview", label: "Preparing for Police Interview" },
  { href: "/voluntary-police-interview-risks", label: "Voluntary Interview Risks" },
  {
    href: "/what-happens-if-ignore-police-interview",
    label: "What Happens if You Ignore Interview",
  },
  { href: "/vulnerable-adults-in-custody", label: "Vulnerable Adults in Custody" },
  {
    href: "/police-station-interviews-kent-rights",
    label: "Police Station Interviews Kent Rights",
  },
  { href: "/policeinterviewhelp", label: "Police Interview Help" },
  { href: "/refusingpoliceinterview", label: "Refusing Police Interview" },
  { href: "/afterapoliceinterview", label: "After Police Interview (Alt)" },
  {
    href: "/nofurtheractionafterpoliceinterview",
    label: "No Further Action After Interview (Alt)",
  },
  { href: "/after-a-police-interview", label: "After a Police Interview" },
  { href: "/arrested-at-police-station", label: "Arrested at Police Station" },
  { href: "/article-interview-under-caution", label: "Interview Under Caution Guide" },
  { href: "/article-police-caution-before-interview", label: "Police Caution Before Interview" },
  {
    href: "/article-rights-kent-police-station-2025",
    label: "Your Rights at Kent Police Stations 2025",
  },
  { href: "/what-is-a-criminal-solicitor", label: "What is a Criminal Solicitor?" },
  { href: "/what-is-a-police-station-rep", label: "What is a Police Station Rep?" },
  {
    href: "/what-to-expect-at-a-police-interview-in-kent",
    label: "What to Expect at Police Interview",
  },
  { href: "/your-rights-in-custody", label: "Your Rights in Custody" },
];

const locationLinks = [
  { href: "/police-stations", label: "All Kent Police Stations", priority: true },
  { href: "/coverage", label: "Service Coverage Areas", priority: true },
  { href: "/medway-police-station", label: "Medway Police Station", priority: true },
  { href: "/maidstone-police-station", label: "Maidstone Police Station", priority: true },
  { href: "/canterbury-police-station", label: "Canterbury Police Station", priority: true },
  { href: "/north-kent-gravesend-police-station", label: "Gravesend Police Station" },
  { href: "/tonbridge-police-station", label: "Tonbridge Police Station" },
  { href: "/folkestone-police-station", label: "Folkestone Police Station" },
  { href: "/margate-police-station", label: "Margate Police Station" },
  { href: "/sevenoaks-police-station", label: "Sevenoaks Police Station" },
  { href: "/kent-police-station-reps", label: "Kent Police Station Reps" },
  { href: "/kent-police-stations", label: "Kent Police Stations" },
  { href: "/psastations", label: "PSA Stations" },
  { href: "/policestationreps", label: "Police Station Reps (Alt)" },
  { href: "/accreditedpolicerep", label: "Accredited Police Rep" },
  { href: "/areas", label: "Areas" },
  { href: "/locations", label: "Locations" },
  { href: "/out-of-area", label: "Out of Area" },
  { href: "/outofarea", label: "Out of Area (Alt)" },
  { href: "/ashford-police-station", label: "Ashford Police Station" },
  { href: "/ashford-psa-station", label: "Ashford PSA Station" },
  { href: "/ashford-solicitor", label: "Ashford Solicitor" },
  { href: "/bluewater-police-station", label: "Bluewater Police Station" },
  { href: "/bluewater-psa-station", label: "Bluewater PSA Station" },
  { href: "/bluewater-solicitor", label: "Bluewater Solicitor" },
  { href: "/bromley-solicitor", label: "Bromley Solicitor" },
  { href: "/canterbury-psa-station", label: "Canterbury PSA Station" },
  { href: "/canterbury-solicitor", label: "Canterbury Solicitor" },
  { href: "/chatham-solicitor", label: "Chatham Solicitor" },
  { href: "/coldharbour-police-station", label: "Coldharbour Police Station" },
  { href: "/dartford-solicitor", label: "Dartford Solicitor" },
  { href: "/deal-solicitor", label: "Deal Solicitor" },
  { href: "/dover-police-station", label: "Dover Police Station" },
  { href: "/dover-psa-station", label: "Dover PSA Station" },
  { href: "/dover-solicitor", label: "Dover Solicitor" },
  { href: "/faversham-solicitor", label: "Faversham Solicitor" },
  { href: "/folkestone-psa-station", label: "Folkestone PSA Station" },
  { href: "/folkestone-solicitor", label: "Folkestone Solicitor" },
  { href: "/gillingham-solicitor", label: "Gillingham Solicitor" },
  { href: "/gravesend-police-station", label: "Gravesend Police Station" },
  { href: "/gravesend-solicitor", label: "Gravesend Solicitor" },
  { href: "/herne-bay-solicitor", label: "Herne Bay Solicitor" },
  { href: "/maidstone-psa-station", label: "Maidstone PSA Station" },
  { href: "/maidstone-solicitor", label: "Maidstone Solicitor" },
  { href: "/margate-psa-station", label: "Margate PSA Station" },
  { href: "/margate-solicitor", label: "Margate Solicitor" },
  { href: "/medway-psa-station", label: "Medway PSA Station" },
  { href: "/medway-solicitor", label: "Medway Solicitor" },
  { href: "/north-kent-gravesend-psa-station", label: "North Kent Gravesend PSA Station" },
  { href: "/ramsgate-solicitor", label: "Ramsgate Solicitor" },
  { href: "/rochester-solicitor", label: "Rochester Solicitor" },
  { href: "/sandwich-solicitor", label: "Sandwich Solicitor" },
  { href: "/sevenoaks-psa-station", label: "Sevenoaks PSA Station" },
  { href: "/sevenoaks-solicitor", label: "Sevenoaks Solicitor" },
  { href: "/sittingbourne-police-station", label: "Sittingbourne Police Station" },
  { href: "/sittingbourne-psa-station", label: "Sittingbourne PSA Station" },
  { href: "/sittingbourne-solicitor", label: "Sittingbourne Solicitor" },
  { href: "/swanley-police-station", label: "Swanley Police Station" },
  { href: "/swanley-psa-station", label: "Swanley PSA Station" },
  { href: "/swanley-solicitor", label: "Swanley Solicitor" },
  { href: "/tonbridge-psa-station", label: "Tonbridge PSA Station" },
  { href: "/tonbridge-solicitor", label: "Tonbridge Solicitor" },
  { href: "/tunbridge-wells-police-station", label: "Tunbridge Wells Police Station" },
  { href: "/tunbridge-wells-psa-station", label: "Tunbridge Wells PSA Station" },
  { href: "/tunbridge-wells-solicitor", label: "Tunbridge Wells Solicitor" },
  { href: "/whitstable-solicitor", label: "Whitstable Solicitor" },
  { href: "/police-station-agent-ashford", label: "Police Station Agent Ashford" },
  { href: "/police-station-agent-canterbury", label: "Police Station Agent Canterbury" },
  { href: "/police-station-agent-dartford", label: "Police Station Agent Dartford" },
  { href: "/police-station-agent-folkestone", label: "Police Station Agent Folkestone" },
  { href: "/police-station-agent-gravesend", label: "Police Station Agent Gravesend" },
  { href: "/police-station-agent-kent", label: "Police Station Agent Kent" },
  { href: "/police-station-agent-maidstone", label: "Police Station Agent Maidstone" },
  { href: "/police-station-agent-medway", label: "Police Station Agent Medway" },
  { href: "/police-station-agent-sevenoaks", label: "Police Station Agent Sevenoaks" },
  { href: "/police-station-agent-sittingbourne", label: "Police Station Agent Sittingbourne" },
  { href: "/police-station-agent-tonbridge", label: "Police Station Agent Tonbridge" },
  { href: "/police-station-rep-ashford", label: "Police Station Rep Ashford" },
  { href: "/police-station-rep-bluewater", label: "Police Station Rep Bluewater" },
  { href: "/police-station-rep-canterbury", label: "Police Station Rep Canterbury" },
  { href: "/police-station-rep-dartford", label: "Police Station Rep Dartford" },
  { href: "/police-station-rep-dover", label: "Police Station Rep Dover" },
  { href: "/police-station-rep-folkestone", label: "Police Station Rep Folkestone" },
  { href: "/police-station-rep-gravesend", label: "Police Station Rep Gravesend" },
  { href: "/police-station-rep-maidstone", label: "Police Station Rep Maidstone" },
  { href: "/police-station-rep-margate", label: "Police Station Rep Margate" },
  { href: "/police-station-rep-medway", label: "Police Station Rep Medway" },
  { href: "/police-station-rep-sevenoaks", label: "Police Station Rep Sevenoaks" },
  { href: "/police-station-rep-sittingbourne", label: "Police Station Rep Sittingbourne" },
  { href: "/police-station-rep-swanley", label: "Police Station Rep Swanley" },
  { href: "/police-station-rep-tonbridge", label: "Police Station Rep Tonbridge" },
  { href: "/police-station-rep-tunbridge-wells", label: "Police Station Rep Tunbridge Wells" },
];

const resourceLinks = [
  { href: "/about", label: "About Your Independent Solicitor", priority: true },
  { href: "/why-use-us", label: "Why Use Us" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/testimonials", label: "Client Testimonials" },
  { href: "/contact", label: "Contact Us", priority: true },
  { href: "/privateclientfaq", label: "Private Client FAQ" },
  { href: "/can-we-help", label: "Can We Help" },
  { href: "/canwehelp", label: "Can We Help (Alt)" },
  { href: "/whatisapolicestationrep", label: "What is a Police Station Rep (Alt)" },
  { href: "/hours", label: "Hours" },
  { href: "/extendedhours", label: "Extended Hours" },
  { href: "/guided-assistant", label: "Guided Assistant" },
  { href: "/join", label: "Join" },
  { href: "/repcover", label: "Rep Cover" },
  { href: "/arrestednow", label: "Arrested Now" },
  { href: "/home", label: "Home" },
  { href: "/case-status", label: "Case Status" },
  // The previous internal route '/criminaldefencekent' 404s on production; link to About instead.
  { href: "/about", label: "Criminal Defence Kent" },
];

const legalLinks = [
  { href: "/terms-and-conditions", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookies Policy" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/attendanceterms", label: "Agency Terms" },
  { href: "/servicerates", label: "Service Rates" },
  { href: "/complaints", label: "Complaints" },
  { href: "/f-a-q", label: "FAQ (Alt)" },
  { href: "/g-d-p-r", label: "GDPR (Alt)" },
  { href: "/termsandconditions", label: "Terms (Alt)" },
];

export default function Footer() {
  // Prevent hydration mismatches by skipping SSR + initial client render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentYear = new Date().getFullYear();
  const appVersion = getFormattedVersion();
  const lastUpdate = getLastUpdateDateTime();

  return (
    <footer className="bg-slate-900 text-white relative z-10">
      {/* Minimal Primary Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Row - Logo, Contact, Essential Links */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-bold text-lg text-white hover:text-blue-300 transition-colors"
            >
              Police Station Agent
            </Link>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-sm text-white/75">Kent Criminal Defence</span>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
            <a
              href="tel:01732247427"
              className="flex items-center gap-1.5 text-white hover:text-blue-300 transition-colors font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              01732 247427
            </a>
            <span className="text-white/40">|</span>
            <a
              href="sms:07535494446?body=I%20need%20police%20station%20representation"
              className="flex items-center gap-1.5 text-white/85 hover:text-blue-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
              </svg>
              Text Us
            </a>
            <span className="text-white/40">|</span>
            <a
              href="mailto:robertcashman@defencelegalservices.co.uk"
              className="text-white/85 hover:text-blue-300 transition-colors"
            >
              Email
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/policestationagent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-300 transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/police-station-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://twitter.com/policestation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Essential Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/75 border-t border-slate-800 pt-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
            Terms
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/cookies" className="hover:text-white transition-colors">
            Cookies
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/complaints" className="hover:text-white transition-colors">
            Complaints
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href="/admin"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
            Admin
          </Link>
        </div>

        {/* Expandable Full Sitemap (no client state; avoids hydration issues) */}
        <details className="group mt-4">
          <summary className="list-none cursor-pointer flex justify-center">
            <span className="flex items-center gap-2 px-4 py-2 text-xs text-white hover:text-blue-300 border border-slate-600 hover:border-slate-400 rounded-full transition-all duration-200">
              <span className="group-open:hidden">View All Pages & Resources</span>
              <span className="hidden group-open:inline">Hide Sitemap</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>

          <div
            id="full-sitemap"
            className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 group-open:max-h-[2000px] group-open:opacity-100 group-open:mt-6"
          >
          <div className="border-t border-slate-800 pt-6">
            {/* Kent Towns Banner */}
            <div className="mb-6 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-center">
              <p className="text-xs text-amber-200 font-semibold mb-1">Serving All Kent Towns:</p>
              <p className="text-xs text-white/90">
                Medway, Maidstone, Canterbury, Gravesend, Tonbridge, Folkestone, Ashford, Dartford,
                Sittingbourne, Sevenoaks, Tunbridge Wells, Margate, Dover, Swanley, Bluewater
              </p>
            </div>

            {/* Full Link Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-xs">
              {/* Services */}
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm">Services</h3>
                <ul className="space-y-1.5">
                  {serviceLinks.map((link) => (
                    <li key={`${link.href}::${link.label}`}>
                      <Link
                        href={link.href}
                        className={`text-white/75 hover:text-white transition-colors ${link.priority ? "font-medium text-white/90" : ""}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help & Advice */}
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm">Help & Advice</h3>
                <ul className="space-y-1.5">
                  {helpLinks.map((link) => (
                    <li key={`${link.href}::${link.label}`}>
                      <Link
                        href={link.href}
                        className={`text-white/75 hover:text-white transition-colors ${link.priority ? "font-medium text-white/90" : ""}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kent Locations */}
              <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <h3 className="font-semibold text-white mb-3 text-sm">Kent Locations</h3>
                <ul className="space-y-1.5 columns-2 md:columns-1 lg:columns-1 gap-4">
                  {locationLinks.map((link) => (
                    <li key={`${link.href}::${link.label}`} className="break-inside-avoid">
                      <Link
                        href={link.href}
                        className={`text-white/75 hover:text-white transition-colors ${link.priority ? "font-medium text-white/90" : ""}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm">Resources</h3>
                <ul className="space-y-1.5">
                  {resourceLinks.map((link) => (
                    <li key={`${link.href}::${link.label}`}>
                      <Link
                        href={link.href}
                        className={`text-white/75 hover:text-white transition-colors ${link.priority ? "font-medium text-white/90" : ""}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm">Legal & Compliance</h3>
                <ul className="space-y-1.5">
                  {legalLinks.map((link) => (
                    <li key={`${link.href}::${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </details>

        {/* Bottom Section - Always Visible */}
        <div className="border-t border-slate-800 mt-6 pt-4 text-center">
          {/* Regulatory Disclaimer */}
          <div className="mb-4 max-w-3xl mx-auto p-3 bg-white/5 rounded-lg text-xs text-white/80">
            <p className="mb-1">
              <span className="font-semibold text-white">Robert Cashman</span> is a criminal
              defence solicitor. All legal services provided through{" "}
              <span className="font-semibold text-white">Tuckers Solicitors</span> (SRA ID:
              127795).
            </p>
            <p className="text-white/70">
              We act in relation to active police investigations and interviews. We do not provide
              general criminal law advice or hypothetical consultations.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/70 mb-2">
            © {currentYear} Defence Legal Services Limited T/A Police Station Agent. Company No.
            09900871
          </p>
          <p className="text-xs text-white/60 mb-3">
            Registered Office: Greenacre, London Road, West Kingsdown, Sevenoaks, Kent, TN15 6ER
          </p>

          {/* Version Info */}
          <div className="text-xs text-white/60 flex items-center justify-center gap-3">
            <span className="text-white/70">{appVersion}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/70">Updated: {lastUpdate}</span>
          </div>

          {/* Partners */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap justify-center gap-3 text-xs text-white/60">
            <span>Partners:</span>
            <a
              href="https://policestationrepukdirectory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-blue-300 transition-colors"
            >
              Find a Police Station Rep
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://policestationrepuk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-blue-300 transition-colors"
            >
              Police Station Rep UK
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://policestationrepuk.com/StationsDirectory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-blue-300 transition-colors"
            >
              UK Custody Suites
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
