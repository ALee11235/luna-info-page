import { NextResponse } from "next/server";
import { getQuestionnaireSubmissions } from "@/lib/db";

export async function GET() {
  try {
    const rows = getQuestionnaireSubmissions();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch questionnaire submissions:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
