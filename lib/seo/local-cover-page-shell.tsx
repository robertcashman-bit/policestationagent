import PageShell from "@/components/PageShell";
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
    <PageShell forceHidePhone withMobilePad>
      <LocalCoverPage config={config} />
    </PageShell>
  );
}
