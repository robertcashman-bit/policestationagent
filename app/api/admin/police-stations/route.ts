import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const stations = db.prepare("SELECT * FROM police_stations ORDER BY name").all();
  return NextResponse.json({ stations });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { name, slug, address, phone, content } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO police_stations (name, slug, address, phone, content, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const result = stmt.run(name, slug, address || null, phone || null, content || null);

    return NextResponse.json({
      success: true,
      id: Number(result.lastInsertRowid),
    });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { error: "A police station with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create police station" }, { status: 500 });
  }
}
