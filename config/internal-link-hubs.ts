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
      href: "/kent-police-station-reps",
      text: "Police Station Reps in Kent",
      description: "All Kent custody suites",
    },
    {
      href: "/locations",
      text: "All Kent rep town pages",
      description: "Police station rep by town",
    },
    {
      href: "/police-station-rep-medway",
      text: "Police station rep in Medway",
      description: "Gillingham custody suite",
    },
    {
      href: "/police-station-rep-maidstone",
      text: "Police station rep in Maidstone",
      description: "Mid-Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-canterbury",
      text: "Police station rep in Canterbury",
      description: "East Kent custody suite",
    },
    {
      href: "/police-station-rep-ashford",
      text: "Police station rep in Ashford",
      description: "Mid-Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-folkestone",
      text: "Police station rep in Folkestone",
      description: "Coastal east Kent custody",
    },
    {
      href: "/police-station-rep-dover",
      text: "Police station rep in Dover",
      description: "East Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-gravesend",
      text: "Police station rep in Gravesend",
      description: "North Kent custody suite",
    },
    {
      href: "/police-station-rep-tonbridge",
      text: "Police station rep in Tonbridge",
      description: "West Kent custody suite",
    },
    {
      href: "/police-station-rep-tunbridge-wells",
      text: "Police station rep in Tunbridge Wells",
      description: "West Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-sevenoaks",
      text: "Police station rep in Sevenoaks",
      description: "West Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-sittingbourne",
      text: "Police station rep in Sittingbourne",
      description: "Swale voluntary interviews",
    },
    {
      href: "/police-station-rep-swanley",
      text: "Police station rep in Swanley",
      description: "North-west Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-margate",
      text: "Police station rep in Margate",
      description: "Thanet custody suite",
    },
    {
      href: "/police-station-rep-dartford",
      text: "Police station rep in Dartford",
      description: "North Kent voluntary interviews",
    },
    {
      href: "/police-station-rep-bluewater",
      text: "Police station rep in Bluewater",
      description: "North Kent voluntary interviews",
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
