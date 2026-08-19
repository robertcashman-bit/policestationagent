import Script from "next/script";
import { ROBERT_CASHMAN_PHOTO_URL } from "@/config/site";

interface PersonSchemaProps {
  name?: string;
  jobTitle?: string;
  description?: string;
  knowsAbout?: string[];
  areaServed?: string;
  image?: string;
}

/**
 * Person Schema Component for Robert Cashman
 * 
 * Implements comprehensive Person schema with:
 * - Professional credentials
 * - Experience
 * - Areas of expertise
 * - Relationship to LegalService
 */
export function PersonSchema({
  name = "Robert Cashman",
  jobTitle = "Accredited Duty Solicitor",
  description = "Qualified solicitor and accredited duty solicitor with 30+ years experience in police station representation. Higher Court Advocate qualified to practice in the Crown Court.",
  knowsAbout = [
    "Police Station Representation",
    "Criminal Defence",
    "Legal Aid",
    "PACE Code C",
    "Kent Police Stations",
  ],
  areaServed = "Kent",
  image = ROBERT_CASHMAN_PHOTO_URL,
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    jobTitle: jobTitle,
    description: description,
    image: image,
    worksFor: {
      "@type": "LegalService",
      name: "Police Station Agent",
    },
    knowsAbout: knowsAbout,
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Qualification",
        name: "Qualified Solicitor",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Qualification",
        name: "Accredited Duty Solicitor",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Qualification",
        name: "Higher Court Advocate",
      },
    ],
    areaServed: {
      "@type": "State",
      name: areaServed,
    },
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
