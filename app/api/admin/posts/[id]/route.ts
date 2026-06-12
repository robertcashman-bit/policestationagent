import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const post = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(Number(params.id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { title, slug, content, excerpt, published, meta_title, meta_description } =
      await request.json();

    const existing = db.prepare("SELECT id FROM blog_posts WHERE id = ?").get(Number(params.id));

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const stmt = db.prepare(`
      UPDATE blog_posts 
      SET title = ?, slug = ?, content = ?, excerpt = ?, published = ?, 
          published_at = CASE WHEN published = 0 AND ? = 1 THEN CURRENT_TIMESTAMP ELSE published_at END,
          meta_title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title,
      slug,
      content,
      excerpt || null,
      published ? 1 : 0,
      published ? 1 : 0,
      meta_title || null,
      meta_description || null,
      Number(params.id)
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const stmt = db.prepare("DELETE FROM blog_posts WHERE id = ?");
  const result = stmt.run(Number(params.id));

  if (result.changes === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
