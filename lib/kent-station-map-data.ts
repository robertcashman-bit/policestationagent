/**
 * Quick-reference Kent police station distances from West Kingsdown (TN15 6ER).
 * Distances are approximate straight-line miles; drive times are typical in normal traffic.
 */

export type KentMapStation = {
  id: number;
  name: string;
  shortName: string;
  address: string;
  miles: number;
  driveMins: number;
  /** Operational 24-hour custody suite (site taxonomy) */
  custody: boolean;
  href: string;
  lat: number;
  lng: number;
  /** Precomputed map pin in Kent SVG viewBox 0 0 480 400 */
  x: number;
  y: number;
  label: "left" | "right" | "top" | "bottom";
};

export const KENT_MAP_BASE = {
  name: "West Kingsdown",
  postcode: "TN15 6ER",
  label: "Base location",
  lat: 51.342,
  lng: 0.258,
  x: 90.4,
  y: 133.5,
} as const;

/** Linear projection matching homepage KentCoverageMap pins */
export function projectKent(lat: number, lng: number): { x: number; y: number } {
  return {
    x: 309.95119466234263 * lng + 10.40568748173905,
    y: -626.2003808323459 * lat + 32259.437941123302,
  };
}

export const KENT_MAP_STATIONS: KentMapStation[] = [
  {
    id: 1,
    name: "Swanley Police Station",
    shortName: "Swanley",
    address: "London Road, Swanley, Kent",
    miles: 4,
    driveMins: 10,
    custody: false,
    href: "/swanley-psa-station",
    lat: 51.397,
    lng: 0.174,
    x: 64.3,
    y: 99.0,
    label: "left",
  },
  {
    id: 2,
    name: "Dartford Police Station",
    shortName: "Dartford",
    address: "Instone Road, Dartford, Kent",
    miles: 10,
    driveMins: 18,
    custody: false,
    href: "/police-station-rep-dartford",
    lat: 51.446,
    lng: 0.219,
    x: 78.3,
    y: 68.3,
    label: "top",
  },
  {
    id: 3,
    name: "Sevenoaks Police Station",
    shortName: "Sevenoaks",
    address: "Morewood Close, Sevenoaks, Kent",
    miles: 12,
    driveMins: 20,
    custody: false,
    href: "/sevenoaks-psa-station",
    lat: 51.272,
    lng: 0.19,
    x: 67.6,
    y: 152.4,
    label: "left",
  },
  {
    id: 4,
    name: "Tonbridge Police Station",
    shortName: "Tonbridge",
    address: "Pembury Road, Tonbridge, Kent",
    miles: 13,
    driveMins: 22,
    custody: true,
    href: "/tonbridge-psa-station",
    lat: 51.195,
    lng: 0.273,
    x: 94.5,
    y: 200.9,
    label: "bottom",
  },
  {
    id: 5,
    name: "Maidstone Police Station",
    shortName: "Maidstone",
    address: "Palace Avenue, Maidstone, Kent",
    miles: 14,
    driveMins: 25,
    custody: false,
    href: "/maidstone-psa-station",
    lat: 51.272,
    lng: 0.514,
    x: 171.8,
    y: 153.6,
    label: "right",
  },
  {
    id: 6,
    name: "Medway Police Station",
    shortName: "Medway",
    address: "Purser Way, Gillingham, Kent",
    miles: 20,
    driveMins: 30,
    custody: true,
    href: "/medway-psa-station",
    lat: 51.386,
    lng: 0.551,
    x: 183.3,
    y: 84.4,
    label: "right",
  },
  {
    id: 7,
    name: "Sittingbourne Police Station",
    shortName: "Sittingbourne",
    address: "Central Avenue, Sittingbourne, Kent",
    miles: 24,
    driveMins: 35,
    custody: false,
    href: "/sittingbourne-psa-station",
    lat: 51.34,
    lng: 0.733,
    x: 237.3,
    y: 109.6,
    label: "top",
  },
  {
    id: 8,
    name: "Ashford Police Station",
    shortName: "Ashford",
    address: "Tufton Street, Ashford, Kent",
    miles: 26,
    driveMins: 35,
    custody: false,
    href: "/ashford-psa-station",
    lat: 51.146,
    lng: 0.875,
    x: 280.4,
    y: 231.7,
    label: "bottom",
  },
  {
    id: 9,
    name: "Canterbury Police Station",
    shortName: "Canterbury",
    address: "Old Dover Road, Canterbury, Kent",
    miles: 32,
    driveMins: 45,
    custody: true,
    href: "/canterbury-psa-station",
    lat: 51.28,
    lng: 1.079,
    x: 344.7,
    y: 147.3,
    label: "top",
  },
  {
    id: 10,
    name: "Thanet Police Station",
    shortName: "Thanet",
    address: "Margate, Kent",
    miles: 38,
    driveMins: 55,
    custody: true,
    href: "/margate-psa-station",
    lat: 51.389,
    lng: 1.387,
    x: 439.6,
    y: 78.7,
    label: "left",
  },
];
