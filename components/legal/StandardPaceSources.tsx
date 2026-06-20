import { LegalReferences } from "@/components/LegalReferences";
import { STANDARD_PACE_SOURCES } from "@/lib/legal/standard-pace-sources";

/** Standard verified PACE sources for pages with legal claims but no custom source list. */
export function StandardPaceSources() {
  return (
    <LegalReferences
      sources={STANDARD_PACE_SOURCES}
      heading="Sources"
    />
  );
}
