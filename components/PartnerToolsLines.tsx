import { PoliceStationRepUkPartnerLine } from '@/components/PoliceStationRepUkPartnerLine';
import { CustodyNotePartnerLine } from '@/components/CustodyNotePartnerLine';

type Props = {
  className?: string;
  variant?: 'light' | 'dark';
};

/** Inline partner mentions for marketing page heroes. */
export function PartnerToolsLines({
  className = 'mt-4 max-w-xl mx-auto text-left sm:text-center',
  variant = 'light',
}: Props) {
  return (
    <div className={className}>
      <PoliceStationRepUkPartnerLine variant={variant} />
      <CustodyNotePartnerLine variant={variant} />
    </div>
  );
}
