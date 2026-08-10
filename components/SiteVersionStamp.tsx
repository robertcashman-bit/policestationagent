import { getSiteVersionLabel } from '@/lib/site-version';

type Props = {
  className?: string;
};

/** Small version + build date stamp for release tracking. */
export function SiteVersionStamp({ className = '' }: Props) {
  const label = getSiteVersionLabel();
  return (
    <p
      className={`text-[10px] leading-none text-slate-500 ${className}`.trim()}
      aria-label={`Site version ${label}`}
    >
      {label}
    </p>
  );
}
