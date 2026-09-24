const fs = require("fs");
const path = require("path");

// Location-specific data
const locations = {
  canterbury: { name: "Canterbury", areas: "Canterbury, Whitstable, Herne Bay, Faversham" },
  gravesend: { name: "Gravesend", areas: "Gravesend, Dartford, Northfleet, Swanscombe" },
  ashford: { name: "Ashford", areas: "Ashford, Tenterden, Wye, Hamstreet" },
  folkestone: { name: "Folkestone", areas: "Folkestone, Hythe, Sandgate, Lydd" },
  tonbridge: { name: "Tonbridge", areas: "Tonbridge, Tunbridge Wells, Sevenoaks, Paddock Wood" },
  sittingbourne: { name: "Sittingbourne", areas: "Sittingbourne, Faversham, Sheerness, Minster" },
  sevenoaks: { name: "Sevenoaks", areas: "Sevenoaks, Westerham, Edenbridge, Otford" },
  dartford: { name: "Dartford", areas: "Dartford, Gravesend, Bluewater, Northfleet" },
};

function updateLocationPage(location) {
  const filePath = path.join(
    __dirname,
    "..",
    "app",
    `police-station-agent-${location}`,
    "page.tsx"
  );

  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${location} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const locData = locations[location] || {
    name: location.charAt(0).toUpperCase() + location.slice(1),
    areas: location,
  };

  // Update metadata
  content = content.replace(
    /title: "Police Station Agent in [^"]+"/g,
    `title: "Police Station Duty Solicitor ${locData.name} | Duty Solicitor Representation Kent | FREE Legal Advice"`
  );

  content = content.replace(
    /description: "Expert police station representation in [^"]+\. FREE legal advice at [^"]+\. 24\/7 availability[^"]*"/g,
    `description: "Police Station Duty Solicitor ${locData.name} - Expert police station representation by qualified solicitor. FREE legal advice under Legal Aid. Accredited Duty Solicitor & Higher Court Advocate. Call 01732 247427."`
  );

  content = content.replace(
    /canonical: "https:\/\/policestationagent\.com\/police-station-agent-[^"]+"/g,
    `canonical: "https://criminaldefencekent.co.uk/police-station-agent-${location}"`
  );

  content = content.replace(
    /siteName: 'Police Station Agent'/g,
    `siteName: 'Criminal Defence Kent'`
  );

  // Update HTML content
  content = content.replace(/24\/7 Availability/g, "Extended Hours Service");

  content = content.replace(
    /Police Station Agent in ([A-Z][a-z]+)/g,
    "Police Station Duty Solicitor $1"
  );

  content = content.replace(
    /Immediate 24\/7 representation available in ([^<]+)\. FREE legal advice at ([^<]+)\. Expert criminal defence with 30\+ years experience\./g,
    `Expert police station representation by qualified solicitor in $1. FREE legal advice under Legal Aid at $2. Accredited Duty Solicitor & Higher Court Advocate with 35+ years experience.`
  );

  content = content.replace(
    /Why Choose Police Station Agent in ([A-Z][a-z]+)/g,
    "Why Choose Duty Solicitor Representation in $1"
  );

  content = content.replace(
    /FREE legal advice available 24\/7\. We can attend ([^<]+) within 30 minutes\./g,
    "FREE legal advice under Legal Aid. Accredited Duty Solicitor available to attend $1 within 30 minutes."
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated ${location}`);
}

// Update all locations
Object.keys(locations).forEach((location) => {
  updateLocationPage(location);
});

console.log("All location pages updated!");
