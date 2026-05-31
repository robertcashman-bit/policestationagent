import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { RESOURCE_HUB_PATH } from "@/config/link-authority";

export const metadata: Metadata = {
  title: "Resources | Link-Friendly Legal Guides | Police Station Agent",
  description:
    "Free resources on police station rights in Kent — printable PACE guide, custody hub, press information, and link-to-us copy.",
  alternates: { canonical: `https://${SITE_DOMAIN}/resources` },
};

const resources = [
  {
    href: RESOURCE_HUB_PATH,
    title: "Kent police custody & interview resources",
    description: "Main hub — PACE, custody limits, RUI, family guidance, Kent stations.",
  },
  {
    href: "/resources/pace-rights-guide",
    title: "PACE rights at the police station (printable)",
    description: "Plain English summary for printing or sharing.",
  },
  {
    href: "/link-to-us",
    title: "Link to us",
    description: "Copy-paste URLs and suggested anchor text for third-party sites.",
  },
  {
    href: "/press",
    title: "Press & media",
    description: "Expert commentary topics and contact details.",
  },
  {
    href: "/faq#immediate-custody-only",
    title: "Who can call — scope FAQ",
    description: "Immediate custody only; immediate family may instruct.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16" id="main-content">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Resources</h1>
        <p className="text-lg text-slate-700 mb-10">
          Free guides you can link to, print, or share. Maintained by Robert Cashman, accredited
          duty solicitor (Kent).
        </p>
        <ul className="space-y-4">
          {resources.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-bold text-blue-800 mb-1">{r.title}</h2>
                <p className="text-slate-600 text-sm">{r.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
