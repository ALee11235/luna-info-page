import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "info-page.db");

// Ensure directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(dbPath);

// Enable WAL mode for better concurrent performance
db.pragma("journal_mode = WAL");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS questionnaire_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    favorite_content TEXT,
    fantasies TEXT,
    frequency TEXT,
    additional_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS custom_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    minutes INTEGER,
    video_type TEXT,
    accessories TEXT,
    special_requests TEXT,
    estimated_price INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export interface QuestionnaireRow {
  id: number;
  name: string;
  username: string;
  favorite_content: string;
  fantasies: string;
  frequency: string;
  additional_notes: string;
  created_at: string;
}

export interface CustomRequestRow {
  id: number;
  name: string;
  username: string;
  minutes: number;
  video_type: string;
  accessories: string;
  special_requests: string;
  estimated_price: number;
  created_at: string;
}

export function getQuestionnaireSubmissions(): QuestionnaireRow[] {
  return db.prepare("SELECT * FROM questionnaire_submissions ORDER BY created_at DESC").all() as QuestionnaireRow[];
}

export function getCustomRequests(): CustomRequestRow[] {
  return db.prepare("SELECT * FROM custom_requests ORDER BY created_at DESC").all() as CustomRequestRow[];
}

export function checkAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export default db;
