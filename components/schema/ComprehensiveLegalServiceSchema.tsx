import Script from "next/script";
import { SITE_URL } from "@/config/site";

interface ComprehensiveLegalServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  areaServed?: string;
  jurisdiction?: string;
  phone?: string;
  url?: string;
}

/**
 * Comprehensive LegalService Schema Component
 * 
 * Implements full LegalService schema with:
 * - Provider (Organization with SRA ID)
 * - Area served
 * - Jurisdiction
 * - Service type
 * - Contact information
 */
export function ComprehensiveLegalServiceSchema({
  serviceName,
  serviceDescription,
  serviceType,
  areaServed = "Kent",
  jurisdiction = "England & Wales",
  phone = "+441732247427",
  url = SITE_URL,
}: ComprehensiveLegalServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "Organization",
      name: "Tuckers Solicitors LLP",
      legalName: "Tuckers Solicitors LLP",
      identifier: {
        "@type": "PropertyValue",
        name: "SRA ID",
        value: "127795",
      },
      url: url,
    },
    areaServed: {
      "@type": "State",
      name: areaServed,
    },
    jurisdiction: jurisdiction,
    serviceType: serviceType,
    category: "Legal Services",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "Telephone",
      servicePhone: phone,
      availableLanguage: "English",
    },
  };

  return (
    <Script
      id="comprehensive-legal-service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
