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
    title: "Police Station Reps Kent | All Custody Suites",
    metaDescription:
      "Police station reps and representatives across all Kent custody suites and voluntary interviews — with regular attendance at North Kent (Gravesend) and Tonbridge. Firm instructions and client advice. NOT Kent Police.",
    h1: "Police Station Reps Across Kent",
    answerFirst:
      "In brief: this hub covers police station reps and police station representatives across Kent — with regular attendance at North Kent (Gravesend) and Tonbridge custody suites, plus voluntary interviews at Maidstone, Sevenoaks, Tunbridge Wells, Swanley and other Kent stations.",
    intro:
      "Robert Cashman provides police station representation across Kent, and agency cover at police stations within about 45 minutes of Maidstone — with regular extended-hours attendance at North Kent (Gravesend) and Tonbridge among others. Criminal defence firms can instruct cover; clients in custody or booked for interview can request advice through Tuckers Solicitors LLP.",
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
        href: "/police-station-rep-medway",
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
      { href: "/police-station-rep-gravesend", label: "Police station rep in Gravesend" },
      { href: "/police-station-rep-tonbridge", label: "Police station rep in Tonbridge" },
      { href: "/coverage/areas/north-kent", label: "North Kent area hub" },
      { href: "/coverage/areas/west-kent", label: "West Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  medway: {
    slug: "police-station-rep-medway",
    town: "Medway",
    title: "Police Station Rep Medway | Kent",
    metaDescription:
      "Police station rep in Medway, Kent for custody and voluntary interviews. Solicitor instructions and client advice across Gillingham, Chatham and Rochester. NOT Kent Police.",
    h1: "Police Station Rep in Medway, Kent",
    answerFirst:
      "In brief: a police station rep in Medway means qualified representation at Medway custody suite and voluntary interviews across the Medway towns, for criminal defence firms instructing cover and for clients needing legal advice in custody.",
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
      { href: "/police-station-rep-gravesend", label: "Police station rep in Gravesend" },
      { href: "/police-station-rep-maidstone", label: "Police station rep in Maidstone" },
      { href: "/coverage/areas/medway", label: "Medway area hub" },
    ],
  },
  sevenoaks: {
    slug: "police-station-rep-sevenoaks",
    town: "Sevenoaks",
    title: "Police Station Rep Sevenoaks | Kent",
    metaDescription:
      "Police station rep in Sevenoaks, Kent for voluntary interviews and custody across west Kent. Solicitor instructions welcome. Private defence site — NOT Kent Police.",
    h1: "Police Station Rep in Sevenoaks, Kent",
    answerFirst:
      "In brief: a police station rep in Sevenoaks covers voluntary interviews at Sevenoaks police station and attendance at Kent custody suites when clients from the Sevenoaks area are detained elsewhere.",
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
      { href: "/police-station-rep-tonbridge", label: "Police station rep in Tonbridge" },
      { href: "/police-station-rep-swanley", label: "Police station rep in Swanley" },
      { href: "/police-station-rep-tunbridge-wells", label: "Police station rep in Tunbridge Wells" },
    ],
  },
  swanley: {
    slug: "police-station-rep-swanley",
    town: "Swanley",
    title: "Police Station Rep Swanley | Kent",
    metaDescription:
      "Police station rep in Swanley, Kent for voluntary interviews and Kent custody attendance. Instructions from criminal defence firms. NOT Kent Police.",
    h1: "Police Station Rep in Swanley, Kent",
    answerFirst:
      "In brief: a police station rep in Swanley includes representation at Swanley police station for voluntary interviews and attendance at Kent custody suites when required.",
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
      { href: "/police-station-rep-dartford", label: "Police station rep in Dartford" },
      { href: "/police-station-rep-sevenoaks", label: "Police station rep in Sevenoaks" },
    ],
  },
  dartford: {
    slug: "police-station-rep-dartford",
    town: "Dartford",
    title: "Police Station Rep Dartford | Kent",
    metaDescription:
      "Police station rep in Dartford, Kent. Voluntary interviews and custody support for firms and clients. NOT Kent Police.",
    h1: "Police Station Rep in Dartford, Kent",
    answerFirst:
      "In brief: a police station rep in Dartford covers voluntary interviews locally and custody attendance across north Kent suites including Gravesend when needed.",
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
      { href: "/police-station-rep-gravesend", label: "Police station rep in Gravesend" },
      { href: "/police-station-rep-swanley", label: "Police station rep in Swanley" },
    ],
  },
  gravesend: {
    slug: "police-station-rep-gravesend",
    town: "Gravesend",
    title: "Police Station Rep Gravesend & North Kent | Kent",
    metaDescription:
      "Police station rep at North Kent (Gravesend) 24-hour custody suite — Gravesend, Northfleet and north Kent. Solicitor instructions and client advice. NOT Kent Police.",
    h1: "Police Station Rep in Gravesend & North Kent",
    answerFirst:
      "In brief: a police station rep in Gravesend means attendance at the North Kent 24-hour custody suite (Thames Way, Northfleet) and voluntary interview representation across Gravesend, Dartford and north Kent.",
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
      { href: "/police-station-rep-dartford", label: "Police station rep in Dartford" },
      { href: "/police-station-rep-medway", label: "Police station rep in Medway" },
      { href: "/coverage/areas/north-kent", label: "North Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  maidstone: {
    slug: "police-station-rep-maidstone",
    town: "Maidstone",
    title: "Police Station Rep Maidstone | Kent",
    metaDescription:
      "Police station rep in Maidstone, Kent for voluntary interviews and Kent custody. Solicitor agent cover. NOT Kent Police.",
    h1: "Police Station Rep in Maidstone, Kent",
    answerFirst:
      "In brief: a police station rep in Maidstone covers voluntary interviews at Maidstone police station; custody matters may be at other Kent suites.",
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
      { href: "/police-station-rep-tonbridge", label: "Police station rep in Tonbridge" },
      { href: "/police-station-rep-medway", label: "Police station rep in Medway" },
    ],
  },
  tonbridge: {
    slug: "police-station-rep-tonbridge",
    town: "Tonbridge",
    title: "Police Station Rep Tonbridge & West Kent | Kent",
    metaDescription:
      "Police station rep at Tonbridge 24-hour custody and voluntary interviews across west Kent. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Rep in Tonbridge & West Kent",
    answerFirst:
      "In brief: a police station rep in Tonbridge covers the 24-hour custody suite and voluntary interviews at Tonbridge police station for instructing firms and client advice across Tonbridge, Sevenoaks and Tunbridge Wells.",
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
      { href: "/police-station-rep-tunbridge-wells", label: "Police station rep in Tunbridge Wells" },
      { href: "/police-station-rep-sevenoaks", label: "Police station rep in Sevenoaks" },
      { href: "/coverage/areas/west-kent", label: "West Kent area hub" },
      { href: "/for-solicitors", label: "Cover for solicitors" },
    ],
  },
  "tunbridge-wells": {
    slug: "police-station-rep-tunbridge-wells",
    town: "Tunbridge Wells",
    title: "Police Station Rep Tunbridge Wells | Kent",
    metaDescription:
      "Police station rep in Tunbridge Wells, Kent for voluntary interviews and Kent custody. Solicitor instructions. NOT Kent Police.",
    h1: "Police Station Rep in Tunbridge Wells, Kent",
    answerFirst:
      "In brief: we provide police station rep cover for Tunbridge Wells voluntary interviews and Kent custody attendance for west Kent clients.",
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
      { href: "/police-station-rep-tonbridge", label: "Police station rep in Tonbridge" },
      { href: "/police-station-rep-sevenoaks", label: "Police station rep in Sevenoaks" },
    ],
  },
  canterbury: {
    slug: "police-station-rep-canterbury",
    town: "Canterbury",
    title: "Police Station Rep Canterbury | Kent",
    metaDescription:
      "Police station rep in Canterbury, Kent at Canterbury custody suite. Extended-hours representation across east Kent. NOT Kent Police.",
    h1: "Police Station Rep in Canterbury, Kent",
    answerFirst:
      "In brief: a police station rep in Canterbury provides representation at Canterbury custody suite and voluntary interviews across east Kent including Herne Bay, Whitstable and Faversham.",
    intro:
      "Canterbury custody suite at Old Dover Road is a main east Kent detention facility. Robert Cashman provides police station representation for criminal defence firms instructing cover and legal advice for clients detained at Canterbury or booked for interview in the area. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    areas: ["Canterbury", "East Kent", "Herne Bay", "Whitstable", "Faversham"],
    stations: [
      {
        name: "Canterbury custody suite",
        address: "Old Dover Road, Canterbury",
        href: "/canterbury-police-station",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing east Kent custody cover, duty solicitors needing attendance support, and clients or family arranging representation at Canterbury.",
    faqs: [
      {
        question: "Do you cover Canterbury custody suite?",
        answer:
          "Yes. We attend Canterbury custody for interviews under caution, subject to availability.",
      },
      {
        question: "Can solicitor firms instruct cover for Canterbury?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
      {
        question: "Is police station advice free at Canterbury custody?",
        answer:
          "Legal advice at the police station under the duty solicitor scheme is free for most detainees being interviewed. This is general information only.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-folkestone", label: "Police station rep in Folkestone" },
      { href: "/police-station-rep-margate", label: "Police station rep in Margate" },
      { href: "/police-station-rep-dover", label: "Police station rep in Dover" },
    ],
  },
  ashford: {
    slug: "police-station-rep-ashford",
    town: "Ashford",
    title: "Police Station Rep Ashford | Kent",
    metaDescription:
      "Police station rep in Ashford, Kent for voluntary interviews and Kent custody attendance. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Rep in Ashford, Kent",
    answerFirst:
      "In brief: a police station rep in Ashford covers voluntary interviews at Ashford police station and attendance at Kent custody suites when clients from mid-Kent are detained.",
    intro:
      "Ashford police station at Tufton Street is used for voluntary interviews across mid-Kent. Criminal defence firms can instruct cover; clients can request advice for custody or booked interviews.",
    areas: ["Ashford", "Mid Kent", "Tenterden"],
    stations: [
      {
        name: "Ashford police station",
        address: "Tufton Street, Ashford",
        note: "Voluntary interviews",
      },
    ],
    audience: "Solicitors instructing cover and clients in Ashford police interviews.",
    faqs: [
      {
        question: "Do you attend voluntary interviews at Ashford?",
        answer: "Yes, subject to availability. Instruct with interview time and client details.",
      },
      {
        question: "Which custody suite serves Ashford arrests?",
        answer:
          "Arrests may be taken to Medway, Canterbury or other Kent suites depending on operational demand.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-maidstone", label: "Police station rep in Maidstone" },
      { href: "/police-station-rep-canterbury", label: "Police station rep in Canterbury" },
    ],
  },
  folkestone: {
    slug: "police-station-rep-folkestone",
    town: "Folkestone",
    title: "Police Station Rep Folkestone | Kent",
    metaDescription:
      "Police station rep in Folkestone, Kent at Folkestone custody suite. Extended-hours representation across coastal east Kent. NOT Kent Police.",
    h1: "Police Station Rep in Folkestone, Kent",
    answerFirst:
      "In brief: a police station rep in Folkestone provides representation at Folkestone custody suite and voluntary interviews across coastal east Kent including Dover and Hythe.",
    intro:
      "Folkestone custody suite at Bouverie House is a key east Kent detention facility. Robert Cashman provides police station representation for firms instructing cover and legal advice for clients detained at Folkestone or booked for interview in the area.",
    areas: ["Folkestone", "East Kent", "Hythe", "Dover"],
    stations: [
      {
        name: "Folkestone custody suite",
        address: "Bouverie House, Folkestone",
        href: "/folkestone-police-station",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing coastal east Kent cover, and clients or family arranging representation at Folkestone.",
    faqs: [
      {
        question: "Do you cover Folkestone custody suite?",
        answer:
          "Yes. We attend Folkestone custody for interviews under caution, subject to availability.",
      },
      {
        question: "Can solicitor firms instruct cover for Folkestone?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-dover", label: "Police station rep in Dover" },
      { href: "/police-station-rep-canterbury", label: "Police station rep in Canterbury" },
      { href: "/police-station-rep-margate", label: "Police station rep in Margate" },
    ],
  },
  dover: {
    slug: "police-station-rep-dover",
    town: "Dover",
    title: "Police Station Rep Dover | Kent",
    metaDescription:
      "Police station rep in Dover, Kent for voluntary interviews and Kent custody attendance. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Rep in Dover, Kent",
    answerFirst:
      "In brief: a police station rep in Dover covers voluntary interviews at Dover police station and attendance at Kent custody suites including Folkestone when Dover-area arrests require detention.",
    intro:
      "Dover police station at Ladywell handles voluntary interviews across east Kent. Criminal defence firms can instruct cover; clients can request advice for custody or booked interviews.",
    areas: ["Dover", "East Kent", "Deal", "Sandwich"],
    stations: [
      {
        name: "Dover police station",
        address: "Ladywell, Dover CT16 1DJ",
        href: "/dover-police-station",
        note: "Voluntary interviews",
      },
    ],
    audience: "Solicitors instructing cover and clients in Dover police interviews.",
    faqs: [
      {
        question: "Do you attend voluntary interviews at Dover?",
        answer: "Yes, subject to availability. Instruct with interview time and client details.",
      },
      {
        question: "Which custody suite serves Dover arrests?",
        answer:
          "Arrests may be taken to Folkestone or Canterbury custody depending on operational demand.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-folkestone", label: "Police station rep in Folkestone" },
      { href: "/police-station-rep-canterbury", label: "Police station rep in Canterbury" },
    ],
  },
  margate: {
    slug: "police-station-rep-margate",
    town: "Margate",
    title: "Police Station Rep Margate | Kent",
    metaDescription:
      "Police station rep in Margate, Kent at Margate custody suite. Extended-hours representation across Thanet and east Kent. NOT Kent Police.",
    h1: "Police Station Rep in Margate, Kent",
    answerFirst:
      "In brief: a police station rep in Margate provides representation at Margate custody suite and voluntary interviews across Thanet including Ramsgate and Broadstairs.",
    intro:
      "Margate custody suite at Fort Hill is the main detention facility for Thanet. Robert Cashman provides police station representation for firms instructing cover and legal advice for clients detained at Margate or booked for interview in the area.",
    areas: ["Margate", "Thanet", "Ramsgate", "Broadstairs"],
    stations: [
      {
        name: "Margate custody suite",
        address: "Fort Hill, Margate",
        href: "/margate-police-station",
        note: "24-hour custody",
      },
    ],
    audience:
      "Criminal defence firms needing Thanet custody cover, and clients or family arranging representation at Margate.",
    faqs: [
      {
        question: "Do you cover Margate custody suite?",
        answer:
          "Yes. We attend Margate custody for interviews under caution, subject to availability.",
      },
      {
        question: "Can solicitor firms instruct cover for Margate?",
        answer:
          "Yes. Firms can instruct by telephone or email with client details, station, custody record number and DSCC reference where available.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-canterbury", label: "Police station rep in Canterbury" },
      { href: "/police-station-rep-folkestone", label: "Police station rep in Folkestone" },
    ],
  },
  sittingbourne: {
    slug: "police-station-rep-sittingbourne",
    town: "Sittingbourne",
    title: "Police Station Rep Sittingbourne | Kent",
    metaDescription:
      "Police station rep in Sittingbourne, Kent for voluntary interviews and Kent custody attendance. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Rep in Sittingbourne, Kent",
    answerFirst:
      "In brief: a police station rep in Sittingbourne covers voluntary interviews at Sittingbourne police station and attendance at Kent custody suites when mid-Kent clients are detained.",
    intro:
      "Sittingbourne police station handles voluntary interviews across the Swale area. Criminal defence firms can instruct cover; clients can request advice for custody or booked interviews.",
    areas: ["Sittingbourne", "Swale", "Faversham", "Sheppey"],
    stations: [
      {
        name: "Sittingbourne police station",
        address: "Sittingbourne, Kent",
        note: "Voluntary interviews",
      },
    ],
    audience: "Solicitors instructing cover and clients in Sittingbourne police interviews.",
    faqs: [
      {
        question: "Do you attend voluntary interviews at Sittingbourne?",
        answer: "Yes, subject to availability. Instruct with interview time and client details.",
      },
      {
        question: "Which custody suite serves Sittingbourne arrests?",
        answer:
          "Arrests may be taken to Medway, Canterbury or other Kent suites depending on operational demand.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-maidstone", label: "Police station rep in Maidstone" },
      { href: "/police-station-rep-medway", label: "Police station rep in Medway" },
    ],
  },
  bluewater: {
    slug: "police-station-rep-bluewater",
    town: "Bluewater",
    title: "Police Station Rep Bluewater | Kent",
    metaDescription:
      "Police station rep in Bluewater, Kent for voluntary interviews and north Kent custody attendance. Solicitor instructions welcome. NOT Kent Police.",
    h1: "Police Station Rep in Bluewater, Kent",
    answerFirst:
      "In brief: a police station rep in Bluewater covers voluntary interviews locally and custody attendance at north Kent suites including Gravesend and Medway when required.",
    intro:
      "Bluewater area police stations handle voluntary interviews for north-west Kent. Criminal defence firms can instruct cover; clients can request advice for custody or booked interviews.",
    areas: ["Bluewater", "Greenhithe", "North Kent", "Dartford"],
    stations: [
      {
        name: "Bluewater police station",
        address: "Bluewater, Kent",
        note: "Voluntary interviews",
      },
    ],
    audience: "Solicitors instructing cover and clients in the Bluewater area.",
    faqs: [
      {
        question: "Do you attend voluntary interviews near Bluewater?",
        answer: "Yes, subject to availability. Instruct with interview time and client details.",
      },
      {
        question: "Which custody suite serves Bluewater arrests?",
        answer:
          "Arrests may be taken to North Kent (Gravesend) or Medway custody depending on operational demand.",
      },
    ],
    nearbyLinks: [
      { href: "/police-station-rep-dartford", label: "Police station rep in Dartford" },
      { href: "/police-station-rep-gravesend", label: "Police station rep in Gravesend" },
    ],
  },
};

export function getLocalCoverBySlug(slug: string): LocalCoverConfig | undefined {
  return Object.values(LOCAL_COVER_PAGES).find((p) => p.slug === slug);
}
