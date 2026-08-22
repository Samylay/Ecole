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

// T7-5 (Phase 7): roles widened student|parent -> +teacher|admin. SQLite
// cannot ALTER a CHECK constraint, so migrate() rebuilds users in place when
// the old 2-role CHECK is still present (idempotent: data-preserving, runs
// once).
function ensureUsersRoleV2(db: Database.Database): void {
  const sql = db
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'users'")
    .get() as { sql: string } | undefined;
  if (!sql?.sql || sql.sql.includes("'teacher'")) return; // already v2
  const rebuild = db.transaction(() => {
    db.exec(`
      CREATE TABLE users_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent', 'teacher', 'admin')),
        created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
      );
      INSERT INTO users_new SELECT id, name, email, password_hash, role, created_at FROM users;
      DROP TABLE users;
      ALTER TABLE users_new RENAME TO users;
    `);
  });
  rebuild();
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent', 'teacher', 'admin')),
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
  ensureUsersRoleV2(db);
}

export type DbUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "student" | "parent" | "teacher" | "admin";
  created_at: number;
};

export function findUserByEmail(email: string): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUser | undefined;
}

export function findUserById(id: number): DbUser | undefined {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
}

export function createUser(name: string, email: string, passwordHash: string, role: "student" | "parent" | "teacher" | "admin"): DbUser {
  const info = getDb()
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
    .run(name, email, passwordHash, role);
  return findUserById(Number(info.lastInsertRowid))!;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

let sessionMetadataReady = false;

function ensureSessionMetadata(database: Database.Database): void {
  if (sessionMetadataReady) return;
  const columns = database.prepare("SELECT name FROM pragma_table_info('sessions')").all() as {
    name: string;
  }[];
  const names = new Set(columns.map((column) => column.name));
  if (!names.has("user_agent")) database.exec("ALTER TABLE sessions ADD COLUMN user_agent TEXT");
  if (!names.has("ip")) database.exec("ALTER TABLE sessions ADD COLUMN ip TEXT");
  if (!names.has("last_seen_at")) database.exec("ALTER TABLE sessions ADD COLUMN last_seen_at INTEGER");
  sessionMetadataReady = true;
}

export function getSessionsDb(): Database.Database {
  const database = getDb();
  ensureSessionMetadata(database);
  return database;
}

export type ActiveSession = {
  id: string;
  user_agent: string | null;
  ip: string | null;
  created_at: number;
  last_seen_at: number | null;
  current: boolean;
};

export function createSession(
  userId: number,
  token: string,
  userAgent: string | null,
  ip: string | null
): void {
  const now = Date.now();
  getSessionsDb()
    .prepare(
      `INSERT INTO sessions (token, user_id, expires_at, user_agent, ip, last_seen_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(token, userId, now + SESSION_TTL_MS, userAgent, ip, now);
}

export function getSessionUser(token: string): DbUser | undefined {
  const database = getSessionsDb();
  const now = Date.now();
  const row = database
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > ?`
    )
    .get(token, now) as DbUser | undefined;
  if (row) {
    database
      .prepare(
        `UPDATE sessions SET last_seen_at = ?
         WHERE token = ? AND (last_seen_at IS NULL OR last_seen_at < ?)`
      )
      .run(now, token, now - 60_000);
  }
  return row;
}

export function listActiveSessions(userId: number, currentToken: string): ActiveSession[] {
  return getSessionsDb()
    .prepare(
      `SELECT substr(token, 1, 8) AS id, user_agent, ip, created_at, last_seen_at,
              token = ? AS current
       FROM sessions
       WHERE user_id = ? AND expires_at > ?
       ORDER BY COALESCE(last_seen_at, created_at) DESC`
    )
    .all(currentToken, userId, Date.now()) as ActiveSession[];
}

export function deleteSessionByPrefix(
  userId: number,
  prefix: string,
  currentToken: string
): boolean {
  const database = getSessionsDb();
  const row = database
    .prepare(
      `SELECT token FROM sessions
       WHERE user_id = ? AND substr(token, 1, 8) = ? AND token != ? AND expires_at > ?
       LIMIT 1`
    )
    .get(userId, prefix, currentToken, Date.now()) as { token: string } | undefined;
  if (!row) return false;
  return database.prepare("DELETE FROM sessions WHERE token = ?").run(row.token).changes === 1;
}

export function deleteSession(token: string): void {
  getSessionsDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

/**
 * Revoke every session for a user except the one making the request; returns how
 * many were revoked. Called on password change — without it, changing your
 * password does not evict anyone else who is signed in, and their 30-day cookie
 * keeps working for its full remaining life.
 */
export function deleteOtherSessions(userId: number, keepToken: string): number {
  const info = getSessionsDb()
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

// ——— Email tokens (Phase 7 T7-2/T7-3): magic links + account activation ———

export type EmailTokenPurpose = "magic_login" | "account_activation";

let emailTokensReady = false;

function ensureEmailTokensTable(database: Database.Database): void {
  if (emailTokensReady) return;
  database.exec(`
    CREATE TABLE IF NOT EXISTS email_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      purpose TEXT NOT NULL CHECK (purpose IN ('magic_login', 'account_activation')),
      token_hash TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      consumed_at INTEGER,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_email_tokens_email ON email_tokens(email);
  `);
  emailTokensReady = true;
}

function tokensDb(): Database.Database {
  const database = getDb();
  ensureEmailTokensTable(database);
  return database;
}

export function createEmailToken(
  email: string,
  purpose: EmailTokenPurpose,
  tokenHash: string,
  ttlMs: number
): void {
  // single active token per (email, purpose): issuing a new one supersedes the old
  tokensDb()
    .prepare(`DELETE FROM email_tokens WHERE email = ? AND purpose = ?`)
    .run(email, purpose);
  tokensDb()
    .prepare(
      `INSERT INTO email_tokens (email, purpose, token_hash, expires_at) VALUES (?, ?, ?, ?)`
    )
    .run(email, purpose, tokenHash, Date.now() + ttlMs);
}

/** Consume a token: returns the email it was issued for, or null. Single-use. */
export function consumeEmailToken(
  purpose: EmailTokenPurpose,
  tokenHash: string
): { email: string } | null {
  const row = tokensDb()
    .prepare(
      `SELECT id, email FROM email_tokens
       WHERE purpose = ? AND token_hash = ? AND consumed_at IS NULL AND expires_at > ?`
    )
    .get(purpose, tokenHash, Date.now()) as { id: number; email: string } | undefined;
  if (!row) return null;
  tokensDb()
    .prepare(`UPDATE email_tokens SET consumed_at = ? WHERE id = ?`)
    .run(Date.now(), row.id);
  return { email: row.email };
}
