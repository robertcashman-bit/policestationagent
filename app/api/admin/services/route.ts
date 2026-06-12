import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const services = db.prepare("SELECT * FROM services ORDER BY title").all();
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { title, slug, description, content } = await request.json();

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO services (title, slug, description, content, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const result = stmt.run(title, slug, description || null, content || null);

    return NextResponse.json({
      success: true,
      id: Number(result.lastInsertRowid),
    });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { error: "A service with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
