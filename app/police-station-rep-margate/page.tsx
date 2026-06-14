import { LOCAL_COVER_PAGES } from "@/lib/seo/local-cover-data";
import { localCoverMetadata, LocalCoverPageShell } from "@/lib/seo/local-cover-page-shell";

const config = LOCAL_COVER_PAGES.margate;

export const metadata = localCoverMetadata(config);

export default function Page() {
  return <LocalCoverPageShell config={config} />;
}
