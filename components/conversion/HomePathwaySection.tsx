import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";

/** Homepage first-screen job — three pathways immediately under the compact hero. */
export function HomePathwaySection() {
  return (
    <section
      id="pathways"
      className="relative pathway-panel section-seam-from-navy border-b border-border-subtle pt-8 pb-12 md:pt-10 md:pb-16 scroll-mt-4"
      aria-label="Enquiry pathways"
    >
      <AudiencePathSelector
        variant="centrepiece"
        heading="Three routes. One clear next step."
        subheading="Select the route that matches your situation. The solicitor telephone is shown only after you qualify for current custody, or on the agency page for firms."
      />
    </section>
  );
}
