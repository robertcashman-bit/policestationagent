const fs = require("fs");
const path = require("path");

// Get all routes
const getAllRoutes = () => {
  const routes = [];
  const appDir = path.join(process.cwd(), "app");

  function scanDir(dir, baseRoute = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach((item) => {
      if (item.isDirectory()) {
        const routePart = item.name;
        const newBase = baseRoute ? baseRoute + "/" + routePart : "/" + routePart;
        scanDir(path.join(dir, item.name), newBase);
      } else if (item.name === "page.tsx") {
        const route = baseRoute || "/";
        routes.push(route);
      }
    });
  }

  scanDir(appDir);
  return routes;
};

// Get linked routes from Header and Footer
const getLinkedRoutes = () => {
  const header = fs.readFileSync("components/Header.tsx", "utf8");
  const footer = fs.readFileSync("components/Footer.tsx", "utf8");
  const combined = header + footer;

  const links = new Set();
  // Match href="/..." or Link href="/..."
  const regex = /href=["'](\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(combined)) !== null) {
    const link = match[1].split("?")[0].split("#")[0];
    if (link.startsWith("/")) {
      links.add(link);
    }
  }

  return Array.from(links);
};

const allRoutes = getAllRoutes();
const linkedRoutes = getLinkedRoutes();

// Filter out dynamic routes and admin/internal routes
const publicRoutes = allRoutes.filter(
  (r) =>
    !r.includes("[") &&
    !r.startsWith("/admin") &&
    !r.startsWith("/import-blog") &&
    !r.startsWith("/post") &&
    !r.startsWith("/feed") &&
    !r.startsWith("/case-status")
);

// Find orphaned pages
const orphaned = publicRoutes.filter((route) => {
  // Check if route is linked directly
  if (linkedRoutes.includes(route)) return false;

  // Check if it's a parent route (e.g., /services when /services/police-station-representation is linked)
  const routeParts = route.split("/").filter((p) => p);
  for (let i = routeParts.length; i > 0; i--) {
    const parentRoute = "/" + routeParts.slice(0, i).join("/");
    if (linkedRoutes.includes(parentRoute)) return false;
  }

  return true;
});

console.log("ORPHANED PAGES (not linked in Header or Footer):");
console.log("================================================");
orphaned.sort().forEach((route) => console.log(route));
console.log("\nTotal orphaned pages:", orphaned.length);
console.log("\nTotal public routes:", publicRoutes.length);
console.log("Total linked routes:", linkedRoutes.length);
