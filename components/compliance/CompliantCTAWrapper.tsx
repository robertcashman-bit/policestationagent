/**
 * COMPLIANT CTA WRAPPER COMPONENT
 *
 * Wraps all contact CTAs (call/whatsapp/email/form blocks) with compliance disclosures
 * Renders: WhoProvidesPanel → children (CTA) → ConsentMicrocopy
 */

import WhoProvidesPanel from "./WhoProvidesPanel";
import ConsentMicrocopy from "./ConsentMicrocopy";

interface CompliantCTAWrapperProps {
  children: React.ReactNode;
}

export default function CompliantCTAWrapper({ children }: CompliantCTAWrapperProps) {
  return (
    <>
      <WhoProvidesPanel />
      {children}
      <ConsentMicrocopy />
    </>
  );
}
