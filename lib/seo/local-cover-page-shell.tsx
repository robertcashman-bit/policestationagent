import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalCoverPage } from "@/components/local/LocalCoverPage";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import type { LocalCoverConfig } from "@/lib/seo/local-cover-data";
import type { Metadata } from "next";

export function localCoverMetadata(config: LocalCoverConfig): Metadata {
  return buildPageMetadata({
    title: config.title,
    path: `/${config.slug}`,
    description: config.metaDescription,
    town: config.town,
  });
}

export function LocalCoverPageShell({ config }: { config: LocalCoverConfig }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col pb-16 lg:pb-0">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <LocalCoverPage config={config} />
      </main>
      <Footer />
    </div>
  );
}
