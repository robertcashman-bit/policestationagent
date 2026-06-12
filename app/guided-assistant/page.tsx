import ScrapedHtmlPage from "@/components/ScrapedHtmlPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Police Station Agent | Police Station Agent",
  description: "v4.4.0 — 12/12/2025",
  alternates: {
    canonical: "https://policestationagent.com/guided-assistant",
  },
  openGraph: {
    title: "Police Station Agent | Police Station Agent",
    description: "v4.4.0 — 12/12/2025",
    url: "https://policestationagent.com/guided-assistant",
    siteName: "Police Station Agent",
    type: "website",
  },
};

const PAGE_HTML = `<div class="fixed right-3 top-4 z-40 text-[10px] text-slate-400 select-none pointer-events-none bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-200/50" aria-hidden="true">v4.4.0 — 12/12/2025</div>`;

export default function Page() {
  return <ScrapedHtmlPage html={PAGE_HTML} />;
}
