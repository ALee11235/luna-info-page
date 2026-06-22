import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (checkAdminPassword(password)) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
