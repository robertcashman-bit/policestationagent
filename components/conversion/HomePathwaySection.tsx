import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";

/** Homepage pathway centrepiece — same routes/events as compact selector. */
export function HomePathwaySection() {
  return (
    <section
      className="relative pathway-panel section-seam-from-navy border-b border-border-subtle py-14 md:py-20"
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
