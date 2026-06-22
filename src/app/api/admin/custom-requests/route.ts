import { NextResponse } from "next/server";
import { getCustomRequests } from "@/lib/db";

export async function GET() {
  try {
    const rows = getCustomRequests();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch custom requests:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
