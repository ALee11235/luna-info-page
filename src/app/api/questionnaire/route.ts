import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, favorite_content, fantasies, frequency, additional_notes } = body;

    db.prepare(`
      INSERT INTO questionnaire_submissions (name, username, favorite_content, fantasies, frequency, additional_notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, username, favorite_content, fantasies, frequency, additional_notes);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Questionnaire submission error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
