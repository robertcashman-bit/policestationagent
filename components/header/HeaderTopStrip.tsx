import { HEADER_STRAPLINE } from "@/config/contact";
import RouteAwarePhoneLink from "@/components/compliance/RouteAwarePhoneLink";

/** Server-rendered top strip — never publishes firm telephone digits. */
export default function HeaderTopStrip({
  forceHideDigits = false,
}: {
  forceHideDigits?: boolean;
} = {}) {
  return (
    <div className="border-b border-primary-mid/40 bg-primary-dark text-white text-xs sm:text-sm py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="text-center text-white/90 sm:text-left">{HEADER_STRAPLINE}</div>
          <RouteAwarePhoneLink variant="header-strip" forceHideDigits={forceHideDigits} />
        </div>
      </div>
    </div>
  );
}
