import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import db from "@/lib/db";
import { parseStringPromise } from "xml2js";

const MAX_IMPORT_BYTES = 10 * 1024 * 1024;

// WordPress import functionality
export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "WordPress export file is required" }, { status: 400 });
    }

    if (file.size > MAX_IMPORT_BYTES) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const text = await file.text();

    // Parse WordPress XML export
    const result = await parseStringPromise(text);
    const items = result.rss?.channel?.[0]?.item || [];
    const imported: Array<{ title: string; slug: string }> = [];
    const errors: Array<{ title: string; error: string }> = [];

    for (const item of items) {
      try {
        const title = item.title?.[0] || "Untitled";
        const content = item["content:encoded"]?.[0] || item.description?.[0] || "";
        const pubDate = item.pubDate?.[0];

        // Generate slug from title
        const slug =
          item["wp:post_name"]?.[0] ||
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        // Check if post type is 'post'
        const postType = item["wp:post_type"]?.[0];
        if (postType !== "post") {
          continue; // Skip non-post items
        }

        const status = item["wp:status"]?.[0];
        const published = status === "publish";

        const stmt = db.prepare(`
          INSERT INTO blog_posts 
          (title, slug, content, published, published_at, author_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `);

        const publishedAt = published && pubDate ? new Date(pubDate).toISOString() : null;

        stmt.run(
          title,
          slug,
          content,
          published ? 1 : 0,
          publishedAt,
          null,
          pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()
        );

        imported.push({ title, slug });
      } catch (error: any) {
        const title = item.title?.[0] || "Unknown";
        errors.push({ title, error: error.message || "Import failed" });
      }
    }

    return NextResponse.json({
      success: true,
      imported: imported.length,
      errors: errors.length,
      details: {
        imported,
        errors,
      },
    });
  } catch (error) {
    console.error("WordPress import error:", error);
    return NextResponse.json({ error: "Failed to import WordPress content" }, { status: 500 });
  }
}
