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

/**
 * Revoke every session for a user except the one making the request; returns how
 * many were revoked. Called on password change — without it, changing your
 * password does not evict anyone else who is signed in, and their 30-day cookie
 * keeps working for its full remaining life.
 */
export function deleteOtherSessions(userId: number, keepToken: string): number {
  const info = getDb()
    .prepare("DELETE FROM sessions WHERE user_id = ? AND token != ?")
    .run(userId, keepToken);
  return info.changes;
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

// ——— Enrolment (Phase 7 T7-1): server-authoritative access ———
// The client's learner_state "enrolled" key was proven forgeable on 2026-08-15
// (any signed-in student could PUT themselves into any course for free).
// Access now reads THIS table only; learner_state.enrolled degrades to a
// read-only UI cache and is stripped at the /api/state boundary.

export type Enrollment = {
  user_id: number;
  course_id: string;
  status: "active" | "revoked";
  source: "self_free" | "cash" | "chargily" | "admin" | "import";
  granted_at: number;
  granted_by: number | null;
};

function ensureEnrollmentsTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS enrollments (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
      source TEXT NOT NULL DEFAULT 'self_free' CHECK (source IN ('self_free', 'cash', 'chargily', 'admin', 'import')),
      granted_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      granted_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      PRIMARY KEY (user_id, course_id)
    );
    CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
  `);
}

/** One-time import of pre-T7-1 self-enrolments from learner_state (idempotent). */
function backfillEnrollmentsFromLearnerState(db: Database.Database): void {
  const rows = db
    .prepare(`SELECT user_id, value FROM learner_state WHERE key = 'enrolled'`)
    .all() as { user_id: number; value: string }[];
  const insert = db.prepare(
    `INSERT OR IGNORE INTO enrollments (user_id, course_id, status, source)
     VALUES (?, ?, 'active', 'import')`
  );
  const tx = db.transaction(() => {
    for (const row of rows) {
      try {
        const parsed = JSON.parse(row.value) as Record<string, unknown>;
        for (const [courseId, flag] of Object.entries(parsed)) {
          if (flag === true && typeof courseId === "string" && courseId.length <= 128) {
            insert.run(row.user_id, courseId);
          }
        }
      } catch {
        // skip corrupt rows
      }
    }
  });
  tx();
}

let enrollmentsReady = false;

function getEnrollmentsDb(): Database.Database {
  const database = getDb();
  if (!enrollmentsReady) {
    ensureEnrollmentsTable(database);
    backfillEnrollmentsFromLearnerState(database);
    enrollmentsReady = true;
  }
  return database;
}

export function listEnrollments(userId: number): Enrollment[] {
  return getEnrollmentsDb()
    .prepare(`SELECT * FROM enrollments WHERE user_id = ? AND status = 'active'`)
    .all(userId) as Enrollment[];
}

export function isEnrolledIn(userId: number, courseId: string): boolean {
  return (
    getEnrollmentsDb()
      .prepare(
        `SELECT 1 FROM enrollments WHERE user_id = ? AND course_id = ? AND status = 'active'`
      )
      .get(userId, courseId) !== undefined
  );
}

export function grantEnrollment(
  userId: number,
  courseId: string,
  source: Enrollment["source"],
  grantedBy: number | null = null
): void {
  getEnrollmentsDb()
    .prepare(
      `INSERT INTO enrollments (user_id, course_id, status, source, granted_by)
       VALUES (?, ?, 'active', ?, ?)
       ON CONFLICT(user_id, course_id) DO UPDATE SET
         status = 'active', source = excluded.source,
         granted_at = unixepoch() * 1000, granted_by = excluded.granted_by`
    )
    .run(userId, courseId, source, grantedBy);
}
