import {
  CUSTODY_PHONE_CTA,
  HEADER_STRAPLINE,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/config/contact";
import RouteAwarePhoneLink from "@/components/compliance/RouteAwarePhoneLink";

/** Server-rendered top strip — phone digits hidden on station routes. */
export default function HeaderTopStrip({
  forceHideDigits = false,
}: {
  forceHideDigits?: boolean;
} = {}) {
  return (
    <div className="bg-blue-900 text-white text-xs sm:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-center sm:text-left">{HEADER_STRAPLINE}</div>
          <RouteAwarePhoneLink variant="header-strip" forceHideDigits={forceHideDigits} />
        </div>
      </div>
    </div>
  );
}

export { CUSTODY_PHONE_CTA, PHONE_DISPLAY, PHONE_TEL };
