import fs from "fs";

const path = "app/kent-police-stations/page.tsx";
let content = fs.readFileSync(path, "utf8");
const marker = "                '<div class=\"fixed right-3";
const start = content.indexOf(marker);
if (start === -1) {
  console.error("HTML marker not found");
  process.exit(1);
}
const endMarker = "',\n                ),\n              ),\n            }}\n          />";
const end = content.indexOf(endMarker, start);
if (end === -1) {
  console.error("HTML end not found");
  process.exit(1);
}
const html = content.slice(start + 16, end); // skip "                '"
const funcEnd = content.indexOf("function fixStationAddresses");
const funcBlock = content.slice(funcEnd);
const funcClose = funcBlock.indexOf("}\n");
const beforeFunc = content.slice(0, funcEnd + funcClose + 2);

const tail = `
const KENT_STATIONS_PAGE_HTML = ${JSON.stringify(html)};

export default function Page() {
  return (
    <>
      <FAQPage items={KENT_STATIONS_FAQ} />
      <ScrapedHtmlPage html={KENT_STATIONS_PAGE_HTML} preprocess={fixStationAddresses} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <InternalLinkHub title={RIGHTS_HUB.title} links={RIGHTS_HUB.links} />
      </div>
    </>
  );
}
`;

fs.writeFileSync(path, beforeFunc + tail);
console.log("Fixed", path, "html length", html.length);
