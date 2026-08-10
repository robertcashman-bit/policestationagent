/**
 * Custody Note logo – notepad with lines and tick-in-circle.
 * Matches the desktop app header logo; use className to control size and colour.
 */
export function CustodyNoteLogo({
  className = "h-8 w-8",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <rect
        x="4"
        y="8"
        width="56"
        height="48"
        rx="6"
        className="stroke-[#3b82f6] dark:stroke-custody-accent"
        strokeWidth="3"
        fill="none"
      />
      <line
        x1="14"
        y1="22"
        x2="50"
        y2="22"
        className="stroke-[#3b82f6] dark:stroke-custody-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="32"
        x2="42"
        y2="32"
        className="stroke-[#60a5fa] dark:stroke-custody-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="42"
        x2="36"
        y2="42"
        className="stroke-[#60a5fa] dark:stroke-custody-accent"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="46"
        r="10"
        className="fill-[#2563eb] dark:fill-custody-accent"
      />
      <path
        d="M47 46l2.5 2.5L53 44"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
