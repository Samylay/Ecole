import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// SQLite on the homelab (decision 2026-07-08). File lives in ./data (gitignored);
// override with LAYAIDA_DB for the systemd deployment.
const DB_PATH = process.env.LAYAIDA_DB ?? path.join(process.cwd(), "data", "layaida.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent')),
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      expires_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

    -- Learner state mirrors the client's localStorage namespace one key per row
    -- (enrolled, completed, quiz_attempts, notes, prefs, ...). Upgrade path to
    -- normalized tables is roadmap P2-T4+.
    CREATE TABLE IF NOT EXISTS learner_state (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      PRIMARY KEY (user_id, key)
    );
  `);
}

export type DbUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "student" | "parent";
  created_at: number;
};

export function findUserByEmail(email: string): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUser | undefined;
}

export function findUserById(id: number): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
}

export function createUser(name: string, email: string, passwordHash: string, role: "student" | "parent"): DbUser {
  const info = getDb()
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
    .run(name, email, passwordHash, role);
  return findUserById(Number(info.lastInsertRowid))!;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function createSession(userId: number, token: string): void {
  getDb()
    .prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
    .run(token, userId, Date.now() + SESSION_TTL_MS);
}

export function getSessionUser(token: string): DbUser | undefined {
  const row = getDb()
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > ?`
    )
    .get(token, Date.now()) as DbUser | undefined;
  return row;
}

export function deleteSession(token: string): void {
  getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function getLearnerState(userId: number): Record<string, unknown> {
  const rows = getDb().prepare("SELECT key, value FROM learner_state WHERE user_id = ?").all(userId) as {
    key: string;
    value: string;
  }[];
  const state: Record<string, unknown> = {};
  for (const row of rows) {
    try {
      state[row.key] = JSON.parse(row.value);
    } catch {
      // skip corrupt rows
    }
  }
  return state;
}

export function putLearnerState(userId: number, state: Record<string, unknown>): void {
  const stmt = getDb().prepare(
    `INSERT INTO learner_state (user_id, key, value, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  );
  const now = Date.now();
  const tx = getDb().transaction((entries: [string, unknown][]) => {
    for (const [key, value] of entries) {
      stmt.run(userId, key, JSON.stringify(value), now);
    }
  });
  tx(Object.entries(state));
}
