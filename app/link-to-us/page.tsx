import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import LinkToUsPanel from "@/components/LinkToUsPanel";
import { EMBED_BADGE_HTML, RESOURCE_HUB_URL } from "@/config/link-authority";

export const metadata: Metadata = {
  title: "Link to Us | Police Station Agent Kent",
  description:
    "Copy-paste URLs and suggested anchor text to link to our free Kent police custody resources.",
  alternates: { canonical: `https://${SITE_DOMAIN}/link-to-us` },
};

export default function LinkToUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16" id="main-content">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Link to us</h1>
        <p className="text-lg text-slate-700 mb-8">
          Free resources for councils, universities, blogs, and community sites. Prefer linking to{" "}
          <strong>{RESOURCE_HUB_URL}</strong> rather than our homepage.
        </p>
        <LinkToUsPanel />
        <section className="mt-10 bg-white rounded-xl border p-6">
          <h2 className="text-lg font-bold mb-2">HTML badge (solicitor firms)</h2>
          <pre className="text-xs bg-slate-100 p-4 rounded overflow-x-auto whitespace-pre-wrap">
            {EMBED_BADGE_HTML}
          </pre>
        </section>
      </main>
      <Footer />
    </div>
  );
}
