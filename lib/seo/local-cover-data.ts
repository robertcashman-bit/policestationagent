export type LocalFaq = { question: string; answer: string };

export type LocalCoverConfig = {
  slug: string;
  town: string;
  title: string;
  metaDescription: string;
  h1: string;
  answerFirst: string;
  intro: string;
  areas: string[];
  stations?: { name: string; address?: string; href?: string; note?: string }[];
  audience: string;
  faqs: LocalFaq[];
  nearbyLinks: { href: string; label: string }[];
};

export const LOCAL_COVER_PAGES: Record<string, LocalCoverConfig> = {
  kent: {
    slug: "kent-police-station-reps",
    town: "Kent",
    title: "Police Station Representatives Kent | All Custody Suites",
    metaDescription:
      "Police station representatives across all Kent custody suites and voluntary interviews — with regular attendance at North Kent (Gravesend) and Tonbridge. Firm instructions and client advice. NOT Kent Police.",
    h1: "Police Station Representatives Across Kent",
    answerFirst:
      "In brief: this hub covers police station representation and solicitor agent cover across Kent — with regular attendance at North Kent (Gravesend) and Tonbridge custody suites, plus voluntary interviews at Maidstone, Sevenoaks, Tunbridge Wells, Swanley and other Kent stations.",
    intro:
      "Robert Cashman provides police station agency and representation across Kent — with regular extended-hours attendance at North Kent (Gravesend) and Tonbridge custody suites among others. Criminal defence firms can instruct cover; clients in custody or booked for interview can request advice through Tuckers Solicitors LLP.",
    areas: [
      "Gravesend",
      "Northfleet",
      "Dartford",
      "Tonbridge",
      "Tunbridge Wells",
      "Sevenoaks",
      "Maidstone",
      "Medway",
      "Canterbury",
      "Folkestone",
    ],
    stations: [
      {
        name: "North Kent (Gravesend) custody",
        address: "Thames Way, Northfleet DA11 8BD",
        href: "/police-station-rep-gravesend",
        note: "24-hour custody",
      },
      {
        name: "Tonbridge police station",
        address: "1 Pembury Road, Tonbridge TN9 2HS",
        href: "/police-station-rep-tonbridge",
        note: "24-hour custody and voluntary interviews",
      },
      {
        name: "Medway custody suite",
        address: "Purser Way, Gillingham ME7 1NE",
        href: "/coverage/police-stations/medway",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing Kent-wide police station cover, duty solicitors needing attendance support, and clients or family arranging representation.",
    faqs: [
      {
        question: "Do you cover all Kent police stations?",
        answer:
          "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795) at Kent custody suites and voluntary interview locations across the county, subject to availability.",
      },
      {
        question: "Can solicitor firms instruct you for Kent cover?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
      {
        question: "Is police station advice free in Kent?",
        answer:
          "Legal advice at the police station under the duty solicitor scheme is free for most detainees being interviewed. This is general information only.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-gravesend", label: "North Kent (Gravesend) cover" },
      { href: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
      { href: "/coverage/areas/north-kent", label: "North Kent area hub" },
      { href: "/coverage/areas/west-kent", label: "West Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  medway: {
    slug: "police-station-rep-medway",
    town: "Medway",
    title: "Police Station Cover Medway | Kent Rep",
    metaDescription:
      "Police station cover in Medway for custody and voluntary interviews. Solicitor instructions and client advice across Gillingham, Chatham and Rochester. NOT the police.",
    h1: "Police Station Cover in Medway, Kent",
    answerFirst:
      "In brief: police station cover in Medway means qualified representation at Medway custody suite and voluntary interviews across the Medway towns, for criminal defence firms instructing cover and for clients needing legal advice in custody.",
    intro:
      "Robert Cashman provides police station agency and representation across Medway — including Medway custody suite at Gillingham and voluntary interviews in Chatham, Gillingham and Rochester. Criminal defence firms can instruct cover; clients in custody or booked for interview can request advice through Tuckers Solicitors LLP.",
    areas: ["Gillingham", "Chatham", "Rochester", "Strood", "Rainham"],
    stations: [
      {
        name: "Medway custody suite",
        address: "Purser Way, Gillingham ME7 1NE",
        href: "/coverage/police-stations/medway",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing freelance police station cover, duty solicitors needing attendance support, and clients or immediate family arranging representation.",
    faqs: [
      {
        question: "Do you cover Medway custody suite?",
        answer:
          "Yes. We attend Medway custody suite for custody interviews and provide representation for voluntary interviews across the Medway area, subject to availability.",
      },
      {
        question: "Can a solicitor firm instruct you for Medway cover?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
      {
        question: "Is police station advice free in Medway?",
        answer:
          "Legal advice at the police station under the duty solicitor scheme is free for most detainees being interviewed. This is general information only.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-gravesend", label: "Gravesend cover" },
      { href: "/police-station-rep-maidstone", label: "Maidstone cover" },
      { href: "/coverage/areas/medway", label: "Medway area hub" },
    ],
  },
  sevenoaks: {
    slug: "police-station-rep-sevenoaks",
    town: "Sevenoaks",
    title: "Police Station Cover Sevenoaks | Kent Rep",
    metaDescription:
      "Police station cover in Sevenoaks for voluntary interviews and custody across west Kent. Solicitor instructions welcome. Private defence site — NOT the police.",
    h1: "Police Station Cover in Sevenoaks, Kent",
    answerFirst:
      "In brief: police station cover in Sevenoaks covers voluntary interviews at Sevenoaks police station and attendance at Kent custody suites when clients from the Sevenoaks area are detained elsewhere.",
    intro:
      "Sevenoaks police station is commonly used for voluntary interviews. We provide police station representation for firms instructing cover and for clients needing advice at interview.",
    areas: ["Sevenoaks", "Otford", "West Kent"],
    stations: [
      {
        name: "Sevenoaks police station",
        address: "Argyle Road, Sevenoaks TN13 1HG",
        note: "Voluntary interviews",
      },
    ],
    audience: "Solicitors instructing cover and clients attending voluntary or custody interviews.",
    faqs: [
      {
        question: "Does Sevenoaks have a custody suite?",
        answer:
          "Sevenoaks is primarily used for voluntary interviews. Custody matters may be dealt with at other Kent suites such as Medway or Gravesend depending on demand.",
      },
      {
        question: "Can firms instruct cover for Sevenoaks interviews?",
        answer: "Yes. Send client name, interview time, station and allegation summary when instructing.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
      { href: "/police-station-rep-swanley", label: "Swanley cover" },
      { href: "/police-station-rep-tunbridge-wells", label: "Tunbridge Wells cover" },
    ],
  },
  swanley: {
    slug: "police-station-rep-swanley",
    town: "Swanley",
    title: "Police Station Cover Swanley | Kent Rep",
    metaDescription:
      "Police station cover in Swanley for voluntary interviews and Kent custody attendance. Instructions from criminal defence firms. NOT Kent Police.",
    h1: "Police Station Cover in Swanley, Kent",
    answerFirst:
      "In brief: police station cover in Swanley includes representation at Swanley police station for voluntary interviews and attendance at Kent custody suites when required.",
    intro:
      "Swanley police station handles many voluntary interviews for north-west Kent. We provide cover for instructing firms and advice for clients.",
    areas: ["Swanley", "Hextable", "North West Kent"],
    stations: [{ name: "Swanley police station", address: "London Road, Swanley BR8 7AJ" }],
    audience: "Criminal defence firms and clients in Swanley police interviews.",
    faqs: [
      {
        question: "Do you attend voluntary interviews at Swanley?",
        answer: "Yes, by prior arrangement or urgent instruction depending on availability.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-dartford", label: "Dartford cover" },
      { href: "/police-station-rep-sevenoaks", label: "Sevenoaks cover" },
    ],
  },
  dartford: {
    slug: "police-station-rep-dartford",
    town: "Dartford",
    title: "Police Station Cover Dartford | Kent Rep",
    metaDescription:
      "Police station cover in Dartford and north Kent. Voluntary interviews and custody support for firms and clients. NOT the police.",
    h1: "Police Station Cover in Dartford, Kent",
    answerFirst:
      "In brief: police station cover in Dartford covers voluntary interviews locally and custody attendance across north Kent suites including Gravesend when needed.",
    intro:
      "Dartford is a key location for voluntary interviews in north Kent. Firms can instruct police station cover; clients can request advice for custody or booked interviews.",
    areas: ["Dartford", "North Kent", "Bluewater area"],
    audience: "Solicitors and clients in the Dartford area.",
    faqs: [
      {
        question: "Which custody suite serves Dartford arrests?",
        answer:
          "Arrests may be taken to North Kent (Gravesend) or Medway custody depending on operational demand. We cover Kent custody suites.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-gravesend", label: "Gravesend cover" },
      { href: "/police-station-rep-swanley", label: "Swanley cover" },
    ],
  },
  gravesend: {
    slug: "police-station-rep-gravesend",
    town: "Gravesend",
    title: "Police Station Cover Gravesend & North Kent | Kent Rep",
    metaDescription:
      "Police station cover at North Kent (Gravesend) 24-hour custody suite — Gravesend, Northfleet and north Kent. Solicitor instructions and client advice. NOT Kent Police.",
    h1: "Police Station Cover in Gravesend & North Kent",
    answerFirst:
      "In brief: police station cover in Gravesend means attendance at the North Kent 24-hour custody suite (Thames Way, Northfleet) and voluntary interview representation across Gravesend, Dartford and north Kent.",
    intro:
      "North Kent custody suite at Gravesend is one of Kent's main 24-hour custody facilities. Robert Cashman provides police station agency and representation for criminal defence firms instructing cover, and legal advice for clients detained at North Kent or booked for interview in the area. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    areas: ["Gravesend", "Northfleet", "Dartford", "North Kent"],
    stations: [
      {
        name: "North Kent (Gravesend) custody",
        address: "Thames Way, Northfleet DA11 8BD",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing north Kent custody cover, duty solicitors needing attendance support, and clients or family arranging representation at North Kent (Gravesend).",
    faqs: [
      {
        question: "Do you cover North Kent custody suite at Gravesend?",
        answer:
          "Yes. We attend North Kent (Gravesend) custody for interviews under caution, subject to availability.",
      },
      {
        question: "Can solicitor firms instruct cover for North Kent custody?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
      {
        question: "Is police station advice free at North Kent custody?",
        answer:
          "Legal advice at the police station under the duty solicitor scheme is free for most detainees being interviewed. This is general information only.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-dartford", label: "Dartford cover" },
      { href: "/police-station-rep-medway", label: "Medway cover" },
      { href: "/coverage/areas/north-kent", label: "North Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  maidstone: {
    slug: "police-station-rep-maidstone",
    town: "Maidstone",
    title: "Police Station Cover Maidstone | Kent Rep",
    metaDescription:
      "Police station cover in Maidstone for voluntary interviews and Kent custody. Solicitor agent cover. NOT the police.",
    h1: "Police Station Cover in Maidstone, Kent",
    answerFirst:
      "In brief: Maidstone police station is used for voluntary interviews; custody matters may be at other Kent suites. We provide cover for both.",
    intro:
      "Maidstone is central to mid-Kent voluntary interviews. Criminal defence firms can instruct attendance; clients can request advice.",
    areas: ["Maidstone", "Mid Kent", "Malling"],
    stations: [
      {
        name: "Maidstone police station",
        address: "Palace Avenue, Maidstone ME15 6NF",
        note: "Voluntary interviews (custody closed)",
      },
    ],
    audience: "Solicitors instructing cover and Maidstone interview clients.",
    faqs: [
      {
        question: "Is there custody at Maidstone?",
        answer:
          "Maidstone custody has closed; detainees may be taken to Medway, Canterbury or other suites. We cover Kent custody attendance.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
      { href: "/police-station-rep-medway", label: "Medway cover" },
    ],
  },
  tonbridge: {
    slug: "police-station-rep-tonbridge",
    town: "Tonbridge",
    title: "Police Station Cover Tonbridge & West Kent | Kent Rep",
    metaDescription:
      "Police station cover at Tonbridge 24-hour custody and voluntary interviews across west Kent. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Cover in Tonbridge & West Kent",
    answerFirst:
      "In brief: Tonbridge police station operates a 24-hour custody suite and hosts voluntary interviews. We provide police station cover for instructing firms and client advice across Tonbridge, Sevenoaks and Tunbridge Wells.",
    intro:
      "Tonbridge is west Kent's main 24-hour custody facility and a regular venue for voluntary interviews. Robert Cashman attends by instruction from criminal defence firms or for clients in custody or booked for interview. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    areas: ["Tonbridge", "Tunbridge Wells", "Sevenoaks", "West Kent"],
    stations: [
      {
        name: "Tonbridge police station",
        address: "1 Pembury Road, Tonbridge TN9 2HS",
        note: "24-hour custody and voluntary interviews",
      },
    ],
    audience:
      "Criminal defence firms needing west Kent custody and voluntary interview cover, and clients or family arranging representation at Tonbridge.",
    faqs: [
      {
        question: "Do you cover Tonbridge custody suite?",
        answer:
          "Yes. We attend Tonbridge custody for interviews under caution, subject to availability.",
      },
      {
        question: "Can I instruct cover for a Tonbridge voluntary interview?",
        answer:
          "Yes. Provide client name, interview date/time, offence summary and your firm details by telephone or email.",
      },
      {
        question: "Can solicitor firms instruct cover for west Kent?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-tunbridge-wells", label: "Tunbridge Wells cover" },
      { href: "/police-station-rep-sevenoaks", label: "Sevenoaks cover" },
      { href: "/coverage/areas/west-kent", label: "West Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  "tunbridge-wells": {
    slug: "police-station-rep-tunbridge-wells",
    town: "Tunbridge Wells",
    title: "Police Station Cover Tunbridge Wells | Kent",
    metaDescription:
      "Police station cover in Tunbridge Wells for voluntary interviews and Kent custody. Solicitor instructions. NOT the police.",
    h1: "Police Station Cover in Tunbridge Wells, Kent",
    answerFirst:
      "In brief: we provide police station cover for Tunbridge Wells voluntary interviews and Kent custody attendance for west Kent clients.",
    intro:
      "Tunbridge Wells police station is used for voluntary interviews. Firms can instruct cover; clients can request representation.",
    areas: ["Tunbridge Wells", "Southborough", "West Kent"],
    audience: "Solicitors and clients in the Tunbridge Wells area.",
    faqs: [
      {
        question: "Do you cover Tunbridge Wells voluntary interviews?",
        answer: "Yes, subject to availability. Instruct with interview time and client details.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
      { href: "/police-station-rep-sevenoaks", label: "Sevenoaks cover" },
    ],
  },
};

export function getLocalCoverBySlug(slug: string): LocalCoverConfig | undefined {
  return Object.values(LOCAL_COVER_PAGES).find((p) => p.slug === slug);
}
