/** Load all legal content surfaces for audit scripts. */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");
const APP_DIR = path.join(process.cwd(), "app");

export function normalizeSlug(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLegacyPosts() {
  if (!fs.existsSync(LEGACY_PATH)) return [];
  const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
  return legacy
    .filter((p) => p.published === 1)
    .map((p) => ({
      id: `legacy-${p.id}`,
      title: p.title || "Untitled",
      slug: normalizeSlug(p.slug || p.title),
      date: (p.published_at || p.created_at || "").split("T")[0],
      contentHtml: p.content || "",
      faq: p.faq || [],
      source: "legacy",
      surface: "blog",
      file: LEGACY_PATH,
      legacyId: p.id,
    }));
}

function getCanonicalPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  const posts = [];
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    if (post.status !== "published") continue;
    posts.push({
      ...post,
      source: "canonical",
      surface: "blog",
      file,
    });
  }
  return posts;
}

export function getAllBlogPosts() {
  const map = new Map();
  for (const post of getLegacyPosts()) {
    map.set(normalizeSlug(post.slug), post);
  }
  for (const post of getCanonicalPosts()) {
    map.set(normalizeSlug(post.slug), post);
  }
  return Array.from(map.values());
}

function walkPages(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "admin" || entry.name === "api") continue;
      walkPages(full, acc);
    } else if (entry.name === "page.tsx") {
      acc.push(full);
    }
  }
  return acc;
}

export function getStaticPageSurfaces() {
  const pages = walkPages(APP_DIR);
  return pages.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const route =
      "/" +
      path
        .relative(APP_DIR, path.dirname(filePath))
        .split(path.sep)
        .filter((s) => !s.startsWith("(") && s !== "page.tsx")
        .join("/");
    const normalizedRoute = route === "/" ? "/" : route.replace(/\/$/, "") || "/";
    return {
      id: filePath,
      title: path.basename(path.dirname(filePath)),
      slug: normalizedRoute,
      contentHtml: content,
      surface: "static-page",
      file: path.relative(process.cwd(), filePath),
    };
  });
}

export function stripHtml(html) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function isLegalContent(text) {
  return /pace|code c|section \d+|paragraph \d+|police station|custody|interview under caution|legal advice|appropriate adult|bail/i.test(
    text,
  );
}

export function loadPaceRegistry() {
  const p = path.join(process.cwd(), "data", "pace-reference-registry.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export function loadCaseRegistry() {
  const p = path.join(process.cwd(), "data", "legal-case-registry.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}
