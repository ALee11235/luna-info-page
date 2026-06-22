import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, minutes, video_type, accessories, special_requests, estimated_price } = body;

    db.prepare(`
      INSERT INTO custom_requests (name, username, minutes, video_type, accessories, special_requests, estimated_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, username, minutes, video_type, JSON.stringify(accessories), special_requests, estimated_price);

    return NextResponse.json({ success: true, estimated_price });
  } catch (err) {
    console.error("Custom request submission error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
