import Link from "next/link";

interface HubLink {
  href: string;
  text: string;
  description?: string;
}

interface InternalLinkHubProps {
  title: string;
  links: HubLink[];
  className?: string;
}

/**
 * Internal Linking Hub Component
 * 
 * Creates hub-to-spoke internal linking structure
 * for SEO authority flow
 */
export function InternalLinkHub({
  title,
  links,
  className = "",
}: InternalLinkHubProps) {
  return (
    <div className={`bg-slate-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg ${className}`}>
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
          >
            {link.text}
            {link.description && (
              <span className="text-slate-600 text-sm block mt-1 font-normal">
                {link.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
