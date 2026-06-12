/** Internal linking hub definitions for SEO authority flow */

export type HubLink = {
  href: string;
  text: string;
  description?: string;
};

export type HubDefinition = {
  id: string;
  title: string;
  links: HubLink[];
};

export const RIGHTS_HUB: HubDefinition = {
  id: "rights",
  title: "Kent Police Custody Rights Guides",
  links: [
    {
      href: "/your-rights-in-custody",
      text: "Your Rights in Custody",
      description: "Core PACE rights explained in plain English",
    },
    {
      href: "/police-custody-rights",
      text: "Police Custody Rights",
      description: "What you can expect when detained",
    },
    {
      href: "/custody-time-limits",
      text: "Custody Time Limits",
      description: "How long police can hold you without charge",
    },
    {
      href: "/pace-code-c",
      text: "PACE Code C",
      description: "Official rules on detention and interviews",
    },
    {
      href: "/police-bail-explained",
      text: "Police Bail Explained",
      description: "Bail conditions and what they mean",
    },
    {
      href: "/no-comment-interview",
      text: "No Comment Interviews",
      description: "When silence may be the right strategy",
    },
    {
      href: "/youth-custody-rights",
      text: "Youth Custody Rights",
      description: "Extra protections for under-18s",
    },
  ],
};

export const STATIONS_HUB: HubDefinition = {
  id: "stations",
  title: "Kent Police Stations & Local Representation",
  links: [
    {
      href: "/kent-police-stations",
      text: "All Kent Police Stations",
      description: "Complete guide to custody suites",
    },
    {
      href: "/police-stations",
      text: "Police Station Coverage",
      description: "Areas we attend across Kent",
    },
    {
      href: "/police-station-rep-medway",
      text: "Medway Police Station Rep",
      description: "Gillingham custody suite",
    },
    {
      href: "/police-station-rep-maidstone",
      text: "Maidstone Police Station Rep",
      description: "Mid-Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-canterbury",
      text: "Canterbury Police Station Rep",
      description: "East Kent custody suite",
    },
    {
      href: "/police-station-rep-gravesend",
      text: "Gravesend Police Station Rep",
      description: "North Kent custody suite",
    },
    {
      href: "/police-station-rep-tonbridge",
      text: "Tonbridge Police Station Rep",
      description: "West Kent custody suite",
    },
  ],
};

export const INTERVIEW_HUB: HubDefinition = {
  id: "interview",
  title: "Police Interview Guides",
  links: [
    {
      href: "/voluntary-interviews",
      text: "Voluntary Police Interviews",
      description: "Your rights at a scheduled VAI",
    },
    {
      href: "/police-interview-rights",
      text: "Police Interview Rights",
      description: "What happens during questioning",
    },
    {
      href: "/prepared-statements",
      text: "Prepared Statements",
      description: "Answering on your terms",
    },
    {
      href: "/adverse-inference",
      text: "Adverse Inference",
      description: "Silence and how courts may view it",
    },
    {
      href: "/what-to-expect-at-a-police-interview-in-kent",
      text: "What to Expect at Interview",
      description: "Kent-specific interview guide",
    },
    {
      href: "/start/in-custody",
      text: "Someone in Custody Now",
      description: "Urgent steps for families",
    },
  ],
};

export const ALL_HUBS = [RIGHTS_HUB, STATIONS_HUB, INTERVIEW_HUB] as const;

export function getHub(id: string): HubDefinition | undefined {
  return ALL_HUBS.find((h) => h.id === id);
}
