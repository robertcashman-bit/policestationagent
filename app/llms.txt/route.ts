import { SITE_URL } from "@/config/site";
import { getAllPosts } from "@/lib/blog-reader";

export const dynamic = "force-static";
export const revalidate = 3600;

const corePages = [
  ["/", "Independent duty solicitor and police station representation in Kent"],
  ["/for-solicitors", "Police station cover for criminal defence firms"],
  ["/dscc-and-custody-record-support", "DSCC and custody record instruction guide for firms"],
  ["/free-police-station-advice-kent", "Police station legal advice for clients"],
  ["/police-station-rep-medway", "Police station cover Medway"],
  ["/police-station-rep-gravesend", "Police station cover Gravesend and North Kent custody"],
  ["/police-station-rep-tonbridge", "Police station cover Tonbridge and west Kent custody"],
  ["/police-station-rep-sevenoaks", "Police station cover Sevenoaks"],
  ["/coverage/areas/north-kent", "North Kent area hub — Gravesend custody"],
  ["/coverage/areas/west-kent", "West Kent area hub — Tonbridge custody"],
  ["/start/in-custody", "Help arranging representation for someone in police custody"],
  ["/start/voluntary-interview", "Help for scheduled voluntary police interviews"],
  ["/start/solicitors-agent-cover", "Police station attendance cover for solicitors"],
  ["/services/police-station-representation", "Police station representation service details"],
  ["/police-custody-rights", "Rights in Kent police custody"],
  ["/police-interview-rights", "Rights during a police interview"],
  ["/blog", "Legal articles and police station guidance"],
  ["/contact", "Contact details and service scope"],
  ["/kent-police-custody-resources", "Kent police custody and interview resource hub — link-friendly"],
  ["/resources", "Free resources index"],
  ["/link-to-us", "Link to our Kent custody resources"],
  ["/press", "Press and media enquiries"],
];

export function GET() {
  const posts = getAllPosts();
  const lines = [
    "# Police Station Agent",
    "",
    "Independent duty solicitor information site for police custody and scheduled voluntary interviews in Kent. This is a private defence solicitor website and is not Kent Police or any police force.",
    "",
    "## Primary Pages",
    ...corePages.map(([path, description]) => `- [${description}](${SITE_URL}${path})`),
    "",
    "## Blog Articles",
    ...posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug})`),
    "",
    "## Feeds And Sitemaps",
    `- [Main sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Blog sitemap](${SITE_URL}/blog-sitemap.xml)`,
    `- [RSS feed](${SITE_URL}/feed.xml)`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
