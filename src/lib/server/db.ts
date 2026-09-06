import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { getCourse as getSeedCourse } from "../data";

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

// ——— Teacher-owned content (Phase 7 T7-6) ———

let contentTablesReady = false;

export function ensureContentTables(database: Database.Database = getDb()): void {
  if (contentTablesReady) return;
  database.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      subject TEXT NOT NULL CHECK (subject IN ('math', 'physics', 'biology')),
      level TEXT NOT NULL CHECK (level IN ('middle', 'high')),
      title_fr TEXT NOT NULL, title_en TEXT NOT NULL, title_ar TEXT NOT NULL,
      description_fr TEXT NOT NULL, description_en TEXT NOT NULL, description_ar TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      instructor_name TEXT NOT NULL, instructor_avatar TEXT NOT NULL,
      instructor_bio_fr TEXT NOT NULL, instructor_bio_en TEXT NOT NULL, instructor_bio_ar TEXT NOT NULL,
      total_lessons INTEGER NOT NULL DEFAULT 0,
      total_hours REAL NOT NULL DEFAULT 0,
      student_count INTEGER NOT NULL DEFAULT 0,
      rating REAL NOT NULL DEFAULT 0,
      archived INTEGER NOT NULL DEFAULT 0 CHECK (archived IN (0, 1)),
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_courses_owner ON courses(owner_id, archived);

    CREATE TABLE IF NOT EXISTS chapters (
      course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      id TEXT NOT NULL,
      title_fr TEXT NOT NULL, title_en TEXT NOT NULL, title_ar TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (course_id, id)
    );

    CREATE TABLE IF NOT EXISTS lessons (
      course_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      id TEXT NOT NULL,
      title_fr TEXT NOT NULL, title_en TEXT NOT NULL, title_ar TEXT NOT NULL,
      duration TEXT NOT NULL,
      video_url TEXT NOT NULL,
      description_fr TEXT NOT NULL, description_en TEXT NOT NULL, description_ar TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (course_id, chapter_id, id),
      FOREIGN KEY (course_id, chapter_id) REFERENCES chapters(course_id, id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      course_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      question_fr TEXT NOT NULL, question_en TEXT NOT NULL, question_ar TEXT NOT NULL,
      options_json TEXT NOT NULL,
      correct_index INTEGER NOT NULL,
      explanation_fr TEXT NOT NULL, explanation_en TEXT NOT NULL, explanation_ar TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (course_id, chapter_id, id),
      FOREIGN KEY (course_id, chapter_id) REFERENCES chapters(course_id, id) ON DELETE CASCADE,
      FOREIGN KEY (course_id, chapter_id, lesson_id) REFERENCES lessons(course_id, chapter_id, id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (course_id, chapter_id, lesson_id) REFERENCES lessons(course_id, chapter_id, id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_documents_lesson ON documents(course_id, chapter_id, lesson_id);

    CREATE TABLE IF NOT EXISTS content_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
  `);
  ensureLiveColumns(database);
  ensureAccessPlanSchema(database);
  cleanupDanglingSubjectProgramCourses(database);
  contentTablesReady = true;
}

/**
 * P9-T2: chapters and lessons can carry a teacher-scheduled Meet link.
 * Additive and idempotent, same shape as the sessions metadata migration.
 */
function ensureLiveColumns(database: Database.Database): void {
  for (const table of ["chapters", "lessons"] as const) {
    const names = new Set(
      (database.prepare(`SELECT name FROM pragma_table_info('${table}')`).all() as { name: string }[])
        .map((column) => column.name)
    );
    if (!names.has("livestream_url")) database.exec(`ALTER TABLE ${table} ADD COLUMN livestream_url TEXT`);
    if (!names.has("scheduled_at")) database.exec(`ALTER TABLE ${table} ADD COLUMN scheduled_at TEXT`);
  }
}

function contentDb(): Database.Database {
  const database = getDb();
  ensureContentTables(database);
  return database;
}

export function getContentDb(): Database.Database {
  return contentDb();
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

export function adminUserExists(): boolean {
  return getDb().prepare("SELECT 1 FROM users WHERE role = 'admin' LIMIT 1").get() !== undefined;
}

export function setUserRole(
  email: string,
  role: DbUser["role"]
): DbUser | undefined {
  getDb().prepare("UPDATE users SET role = ? WHERE email = ?").run(role, email.trim().toLowerCase());
  return findUserByEmail(email.trim().toLowerCase());
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
  program_id: string | null;
  plan_id: string | null;
  starts_at: number | null;
  expires_at: number | null;
  grace_until: number | null;
  periods_covered: number;
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
  const columns = new Set(
    (db.prepare("SELECT name FROM pragma_table_info('enrollments')").all() as { name: string }[])
      .map((column) => column.name)
  );
  // Additive only. Do not rebuild this table because deployed copies may have
  // older CHECK constraints and existing enrollment identifiers.
  if (!columns.has("program_id")) db.exec("ALTER TABLE enrollments ADD COLUMN program_id TEXT");
  if (!columns.has("plan_id")) db.exec("ALTER TABLE enrollments ADD COLUMN plan_id TEXT");
  if (!columns.has("starts_at")) db.exec("ALTER TABLE enrollments ADD COLUMN starts_at INTEGER");
  if (!columns.has("expires_at")) db.exec("ALTER TABLE enrollments ADD COLUMN expires_at INTEGER");
  if (!columns.has("grace_until")) db.exec("ALTER TABLE enrollments ADD COLUMN grace_until INTEGER");
  if (!columns.has("periods_covered")) {
    db.exec("ALTER TABLE enrollments ADD COLUMN periods_covered INTEGER NOT NULL DEFAULT 1");
  }
  db.exec("CREATE INDEX IF NOT EXISTS idx_enrollments_access_window ON enrollments(user_id, starts_at, expires_at, grace_until)");
}

let enrollmentsReady = false;

function getEnrollmentsDb(): Database.Database {
  const database = getDb();
  if (!enrollmentsReady) {
    ensureEnrollmentsTable(database);
    ensureAccessPlanTables(database);
    enrollmentsReady = true;
  }
  return database;
}

export type AccessPeriod = "annual" | "term" | "monthly" | "installment";
export type AccessState = "active" | "grace" | "expired" | "revoked";

export type SubjectProgram = {
  id: string;
  subject: string;
  level: "middle" | "high";
  academic_year: string;
  stream: string | null;
  title_fr: string;
  title_en: string;
  title_ar: string;
  active: 0 | 1;
  created_at: number;
  updated_at: number;
};

export type AccessPlan = {
  id: string;
  program_id: string;
  period: AccessPeriod;
  amount_dzd: number;
  period_months: number;
  periods_covered: number;
  grace_days: number;
  active: 0 | 1;
  created_at: number;
  updated_at: number;
};

export type SubjectEntitlement = {
  id: number;
  user_id: number;
  program_id: string;
  plan_id: string | null;
  payment_id: number | null;
  status: "active" | "revoked";
  source: Enrollment["source"];
  starts_at: number;
  expires_at: number | null;
  grace_until: number | null;
  periods_covered: number;
  granted_at: number;
  granted_by: number | null;
};

export type SubjectEntitlementWithState = SubjectEntitlement & {
  access_state: AccessState;
};

/**
 * Flexible subject-program commercial model. Every object here is additive to
 * the original course-only schema, so this can be run on a copied DB and then
 * repeatedly on the same DB without changing existing rows.
 */
function ensureAccessPlanTables(db: Database.Database): void {
  // Entitlements reference payments for retry-safe paid access. Create the
  // legacy-compatible payments table first when access schema is initialized.
  ensurePaymentsTable(db);
  db.exec(`
    CREATE TABLE IF NOT EXISTS subject_programs (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      level TEXT NOT NULL CHECK (level IN ('middle', 'high')),
      academic_year TEXT NOT NULL DEFAULT 'unspecified',
      stream TEXT,
      title_fr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_subject_programs_lookup
      ON subject_programs(subject, level, stream, active);

    CREATE TABLE IF NOT EXISTS access_plans (
      id TEXT PRIMARY KEY,
      program_id TEXT NOT NULL REFERENCES subject_programs(id) ON DELETE CASCADE,
      period TEXT NOT NULL CHECK (period IN ('annual', 'term', 'monthly', 'installment')),
      amount_dzd INTEGER NOT NULL CHECK (amount_dzd >= 0),
      period_months INTEGER NOT NULL DEFAULT 1 CHECK (period_months > 0),
      periods_covered INTEGER NOT NULL DEFAULT 1 CHECK (periods_covered > 0),
      grace_days INTEGER NOT NULL DEFAULT 0 CHECK (grace_days >= 0),
      active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_access_plans_program ON access_plans(program_id, active);

    CREATE TABLE IF NOT EXISTS subject_program_courses (
      program_id TEXT NOT NULL REFERENCES subject_programs(id) ON DELETE CASCADE,
      course_id TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      PRIMARY KEY (program_id, course_id)
    );
    CREATE INDEX IF NOT EXISTS idx_subject_program_courses_course
      ON subject_program_courses(course_id, program_id);

    CREATE TABLE IF NOT EXISTS subject_entitlements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      program_id TEXT NOT NULL REFERENCES subject_programs(id) ON DELETE RESTRICT,
      plan_id TEXT REFERENCES access_plans(id) ON DELETE SET NULL,
      payment_id INTEGER REFERENCES payments(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
      source TEXT NOT NULL,
      starts_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      expires_at INTEGER,
      grace_until INTEGER,
      periods_covered INTEGER NOT NULL DEFAULT 1 CHECK (periods_covered > 0),
      granted_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      granted_by INTEGER REFERENCES users(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_subject_entitlements_user
      ON subject_entitlements(user_id, program_id, status, starts_at, expires_at, grace_until);
    CREATE INDEX IF NOT EXISTS idx_subject_entitlements_program
      ON subject_entitlements(program_id, status);
  `);
  const entitlementColumns = new Set(
    (db.prepare("SELECT name FROM pragma_table_info('subject_entitlements')").all() as { name: string }[])
      .map((column) => column.name)
  );
  if (!entitlementColumns.has("payment_id")) {
    db.exec("ALTER TABLE subject_entitlements ADD COLUMN payment_id INTEGER REFERENCES payments(id) ON DELETE SET NULL");
  }
  db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_subject_entitlements_payment ON subject_entitlements(payment_id) WHERE payment_id IS NOT NULL");
  const columns = new Set(
    (db.prepare("SELECT name FROM pragma_table_info('subject_programs')").all() as { name: string }[])
      .map((column) => column.name)
  );
  if (!columns.has("academic_year")) {
    db.exec("ALTER TABLE subject_programs ADD COLUMN academic_year TEXT NOT NULL DEFAULT 'unspecified'");
  }
  cleanupDanglingSubjectProgramCourses(db);
}

export function ensureAccessPlanSchema(database: Database.Database = getDb()): void {
  ensureEnrollmentsTable(database);
  ensureAccessPlanTables(database);
}

function hasTable(database: Database.Database, table: string): boolean {
  return Boolean(database.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table));
}

/** Validate both database-backed courses and the explicit seed fallback. */
export function validateCourseForSubjectProgram(database: Database.Database, courseId: string): void {
  if (hasTable(database, "courses")) {
    const row = database.prepare("SELECT archived FROM courses WHERE id = ?").get(courseId) as { archived: number } | undefined;
    if (row) {
      if (row.archived === 1) throw new Error("course_archived");
      return;
    }
  }
  if (!getSeedCourse(courseId)) throw new Error("course_not_found");
}

export function courseBelongsToSubjectProgram(
  database: Database.Database,
  programId: string,
  courseId: string
): boolean {
  validateCourseForSubjectProgram(database, courseId);
  return Boolean(database.prepare(
    "SELECT 1 FROM subject_program_courses WHERE program_id = ? AND course_id = ?"
  ).get(programId, courseId));
}

export function getAccessPlan(programId: string, planId: string): AccessPlan | undefined {
  return getEnrollmentsDb().prepare(
    "SELECT * FROM access_plans WHERE id = ? AND program_id = ? AND active = 1"
  ).get(planId, programId) as AccessPlan | undefined;
}

/** Remove only mappings that point at neither a public DB course nor a seed. */
export function cleanupDanglingSubjectProgramCourses(database: Database.Database = getDb()): number {
  if (!hasTable(database, "subject_program_courses")) return 0;
  const mappings = database.prepare("SELECT program_id, course_id FROM subject_program_courses").all() as {
    program_id: string;
    course_id: string;
  }[];
  const remove = database.prepare(
    "DELETE FROM subject_program_courses WHERE program_id = ? AND course_id = ?"
  );
  let removed = 0;
  for (const mapping of mappings) {
    try {
      validateCourseForSubjectProgram(database, mapping.course_id);
    } catch {
      removed += remove.run(mapping.program_id, mapping.course_id).changes;
    }
  }
  return removed;
}

function addMonths(timestamp: number, months: number): number {
  const date = new Date(timestamp);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.getTime();
}

function stateForWindow(
  status: "active" | "revoked",
  startsAt: number | null,
  expiresAt: number | null,
  graceUntil: number | null,
  now: number
): AccessState {
  if (status === "revoked" || (startsAt !== null && startsAt > now)) return "revoked";
  if (expiresAt === null || expiresAt > now) return "active";
  if (graceUntil !== null && graceUntil > now) return "grace";
  return "expired";
}

export function createSubjectProgram(input: {
  id: string;
  subject: string;
  level: "middle" | "high";
  academicYear?: string;
  stream?: string | null;
  title_fr: string;
  title_en: string;
  title_ar: string;
}): SubjectProgram {
  const database = getEnrollmentsDb();
  database.prepare(`
    INSERT INTO subject_programs (id, subject, level, academic_year, stream, title_fr, title_en, title_ar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(input.id, input.subject, input.level, input.academicYear ?? "unspecified", input.stream ?? null, input.title_fr, input.title_en, input.title_ar);
  return database.prepare("SELECT * FROM subject_programs WHERE id = ?").get(input.id) as SubjectProgram;
}

export function createAccessPlan(input: {
  id: string;
  programId: string;
  period: AccessPeriod;
  amountDzd: number;
  periodMonths?: number;
  periodsCovered?: number;
  graceDays?: number;
}): AccessPlan {
  const database = getEnrollmentsDb();
  database.prepare(`
    INSERT INTO access_plans
      (id, program_id, period, amount_dzd, period_months, periods_covered, grace_days)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    input.id,
    input.programId,
    input.period,
    input.amountDzd,
    input.periodMonths ?? (input.period === "annual" ? 12 : input.period === "term" ? 3 : 1),
    input.periodsCovered ?? 1,
    input.graceDays ?? 0
  );
  return database.prepare("SELECT * FROM access_plans WHERE id = ?").get(input.id) as AccessPlan;
}

export function linkCourseToSubjectProgram(programId: string, courseId: string): number {
  const database = getEnrollmentsDb();
  validateCourseForSubjectProgram(database, courseId);
  if (!database.prepare("SELECT 1 FROM subject_programs WHERE id = ? AND active = 1").get(programId)) {
    throw new Error("subject_program_not_found");
  }
  database.prepare(
    "INSERT OR IGNORE INTO subject_program_courses (program_id, course_id) VALUES (?, ?)"
  ).run(programId, courseId);
  return backfillSubjectEntitlementsFromEnrollments(programId);
}

/**
 * Preserve existing course enrolments when a course is attached to a subject
 * programme. This is intentionally explicit and idempotent because programme
 * mappings are product configuration, not something the migration can infer
 * safely from a legacy course id alone.
 */
export function backfillSubjectEntitlementsFromEnrollments(programId?: string): number {
  const database = getEnrollmentsDb();
  const rows = (programId
    ? database.prepare(`
        SELECT e.user_id, pc.program_id, e.status, e.source, e.granted_at, e.granted_by,
               e.starts_at, e.expires_at, e.grace_until, e.periods_covered
        FROM enrollments e JOIN subject_program_courses pc ON pc.course_id = e.course_id
        WHERE pc.program_id = ?
          AND NOT EXISTS (
            SELECT 1 FROM subject_entitlements se
            WHERE se.user_id = e.user_id AND se.program_id = pc.program_id
          )
      `).all(programId)
    : database.prepare(`
        SELECT e.user_id, pc.program_id, e.status, e.source, e.granted_at, e.granted_by,
               e.starts_at, e.expires_at, e.grace_until, e.periods_covered
        FROM enrollments e JOIN subject_program_courses pc ON pc.course_id = e.course_id
        WHERE NOT EXISTS (
          SELECT 1 FROM subject_entitlements se
          WHERE se.user_id = e.user_id AND se.program_id = pc.program_id
        )
      `).all()) as {
    user_id: number;
    program_id: string;
    status: "active" | "revoked";
    source: Enrollment["source"];
    granted_at: number;
    granted_by: number | null;
    starts_at: number | null;
    expires_at: number | null;
    grace_until: number | null;
    periods_covered: number;
  }[];
  const insert = database.prepare(`
    INSERT INTO subject_entitlements
      (user_id, program_id, status, source, starts_at, expires_at, grace_until, periods_covered, granted_at, granted_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const transaction = database.transaction(() => {
    for (const row of rows) {
      insert.run(
        row.user_id,
        row.program_id,
        row.status,
        row.source,
        row.starts_at ?? row.granted_at,
        row.expires_at,
        row.grace_until,
        row.periods_covered || 1,
        row.granted_at,
        row.granted_by
      );
    }
  });
  transaction();
  return rows.length;
}

export function listSubjectPrograms(): SubjectProgram[] {
  return getEnrollmentsDb()
    .prepare("SELECT * FROM subject_programs WHERE active = 1 ORDER BY subject, level, stream, id")
    .all() as SubjectProgram[];
}

export function listAccessPlans(programId?: string): AccessPlan[] {
  const database = getEnrollmentsDb();
  return (programId
    ? database.prepare("SELECT * FROM access_plans WHERE program_id = ? AND active = 1 ORDER BY amount_dzd, id").all(programId)
    : database.prepare("SELECT * FROM access_plans WHERE active = 1 ORDER BY program_id, amount_dzd, id").all()) as AccessPlan[];
}

export function grantSubjectEntitlement(input: {
  userId: number;
  programId: string;
  source: Enrollment["source"];
  grantedBy?: number | null;
  planId?: string | null;
  paymentId?: number | null;
  startsAt?: number;
  periodsCovered?: number;
}): SubjectEntitlement {
  const database = getEnrollmentsDb();
  const plan = input.planId
    ? database.prepare("SELECT * FROM access_plans WHERE id = ? AND program_id = ?").get(input.planId, input.programId) as AccessPlan | undefined
    : undefined;
  if (input.planId && !plan) {
    throw new Error("access_plan_not_found");
  }
  const startsAt = input.startsAt ?? Date.now();
  const periodsCovered = input.periodsCovered ?? plan?.periods_covered ?? 1;
  const expiresAt = plan ? addMonths(startsAt, plan.period_months * periodsCovered) : null;
  const graceUntil = plan && expiresAt !== null ? addMonths(expiresAt, 0) + plan.grace_days * 86_400_000 : null;
  const info = database.prepare(`
    INSERT INTO subject_entitlements
      (user_id, program_id, plan_id, payment_id, source, starts_at, expires_at, grace_until, periods_covered, granted_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    input.userId,
    input.programId,
    input.planId ?? null,
    input.paymentId ?? null,
    input.source,
    startsAt,
    expiresAt,
    graceUntil,
    periodsCovered,
    input.grantedBy ?? null
  );
  return database.prepare("SELECT * FROM subject_entitlements WHERE id = ?").get(info.lastInsertRowid) as SubjectEntitlement;
}

export function listSubjectEntitlements(userId: number, now = Date.now()): SubjectEntitlementWithState[] {
  return getEnrollmentsDb().prepare(`
    SELECT e.*,
      CASE
        WHEN e.status = 'revoked' OR (e.starts_at IS NOT NULL AND e.starts_at > ?) THEN 'revoked'
        WHEN e.expires_at IS NULL OR e.expires_at > ? THEN 'active'
        WHEN e.grace_until IS NOT NULL AND e.grace_until > ? THEN 'grace'
        ELSE 'expired'
      END AS access_state
    FROM subject_entitlements e
    WHERE e.user_id = ?
    ORDER BY e.granted_at DESC, e.id DESC
  `).all(now, now, now, userId) as SubjectEntitlementWithState[];
}

export function getCourseAccessState(userId: number, courseId: string, now = Date.now()): AccessState | null {
  const database = getEnrollmentsDb();
  const enrollment = database.prepare(`
    SELECT status, starts_at, expires_at, grace_until
    FROM enrollments WHERE user_id = ? AND course_id = ?
  `).get(userId, courseId) as {
    status: "active" | "revoked";
    starts_at: number | null;
    expires_at: number | null;
    grace_until: number | null;
  } | undefined;
  const enrollmentState = enrollment
    ? stateForWindow(enrollment.status, enrollment.starts_at, enrollment.expires_at, enrollment.grace_until, now)
    : null;
  if (enrollment) {
    if (enrollmentState === "active" || enrollmentState === "grace") return enrollmentState;
  }
  const subject = database.prepare(`
    SELECT e.status, e.starts_at, e.expires_at, e.grace_until
    FROM subject_entitlements e
    JOIN subject_program_courses pc ON pc.program_id = e.program_id
    WHERE e.user_id = ? AND pc.course_id = ?
    ORDER BY e.granted_at DESC, e.id DESC
  `).all(userId, courseId) as {
    status: "active" | "revoked";
    starts_at: number | null;
    expires_at: number | null;
    grace_until: number | null;
  }[];
  let result: AccessState | null = null;
  for (const row of subject) {
    const state = stateForWindow(row.status, row.starts_at, row.expires_at, row.grace_until, now);
    if (state === "active") return state;
    if (state === "grace") result = state;
    else if (result === null && state === "expired") result = state;
  }
  return result ?? enrollmentState;
}

export function listEnrollments(userId: number): Enrollment[] {
  const database = getEnrollmentsDb();
  const direct = database
    .prepare(`
      SELECT * FROM enrollments
      WHERE user_id = ? AND status = 'active'
        AND (expires_at IS NULL OR expires_at > ? OR (grace_until IS NOT NULL AND grace_until > ?))
    `)
    .all(userId, Date.now(), Date.now()) as Enrollment[];
  const existingCourseIds = new Set(direct.map((row) => row.course_id));
  const subjectRows = listSubjectEntitlements(userId).filter(
    (row) => row.access_state === "active" || row.access_state === "grace"
  );
  const subjectCourses = database.prepare(`
    SELECT pc.course_id, e.program_id, e.plan_id, e.status, e.source, e.starts_at,
           e.expires_at, e.grace_until, e.periods_covered, e.granted_at, e.granted_by
    FROM subject_entitlements e
    JOIN subject_program_courses pc ON pc.program_id = e.program_id
    WHERE e.id = ?
  `);
  for (const entitlement of subjectRows) {
    for (const row of subjectCourses.all(entitlement.id) as Omit<Enrollment, "user_id">[]) {
      if (existingCourseIds.has(row.course_id)) continue;
      direct.push({ user_id: userId, ...row });
      existingCourseIds.add(row.course_id);
    }
  }
  return direct;
}

export function isEnrolledIn(userId: number, courseId: string): boolean {
  const state = getCourseAccessState(userId, courseId);
  return state === "active" || state === "grace";
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

// ——— Payments (Phase 7 T7-4): staff-recorded cash/Chargily payments ———

export type Payment = {
  id: number;
  user_id: number;
  course_id: string;
  amount: number;
  method: "cash" | "chargily";
  status: "pending" | "paid" | "refunded";
  recorded_by: number | null;
  created_at: number;
  updated_at: number;
  program_id: string | null;
  plan_id: string | null;
  billing_period: AccessPeriod | null;
  periods_covered: number;
  coverage_start_at: number | null;
  coverage_end_at: number | null;
  provider_ref: string | null;
};

let paymentsReady = false;

function ensurePaymentsTable(database: Database.Database): void {
  if (paymentsReady) return;
  database.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id TEXT NOT NULL,
      amount INTEGER NOT NULL CHECK (amount >= 0),
      method TEXT NOT NULL CHECK (method IN ('cash', 'chargily')),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded')),
      recorded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
    CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
  `);
  const columns = new Set(
    (database.prepare("SELECT name FROM pragma_table_info('payments')").all() as { name: string }[])
      .map((column) => column.name)
  );
  if (!columns.has("updated_at")) database.exec("ALTER TABLE payments ADD COLUMN updated_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)");
  if (!columns.has("program_id")) database.exec("ALTER TABLE payments ADD COLUMN program_id TEXT");
  if (!columns.has("plan_id")) database.exec("ALTER TABLE payments ADD COLUMN plan_id TEXT");
  if (!columns.has("billing_period")) database.exec("ALTER TABLE payments ADD COLUMN billing_period TEXT");
  if (!columns.has("periods_covered")) database.exec("ALTER TABLE payments ADD COLUMN periods_covered INTEGER NOT NULL DEFAULT 1");
  if (!columns.has("coverage_start_at")) database.exec("ALTER TABLE payments ADD COLUMN coverage_start_at INTEGER");
  if (!columns.has("coverage_end_at")) database.exec("ALTER TABLE payments ADD COLUMN coverage_end_at INTEGER");
  if (!columns.has("provider_ref")) database.exec("ALTER TABLE payments ADD COLUMN provider_ref TEXT");
  database.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_provider_ref ON payments(provider_ref) WHERE provider_ref IS NOT NULL");
  paymentsReady = true;
}

function paymentsDb(): Database.Database {
  const database = getDb();
  ensurePaymentsTable(database);
  return database;
}

export function createPayment(
  userId: number,
  courseId: string,
  amount: number,
  method: Payment["method"],
  recordedBy: number,
  options: {
    programId?: string | null;
    planId?: string | null;
    providerRef?: string | null;
  } = {}
): Payment {
  const database = paymentsDb();
  let normalizedAmount = amount;
  let billingPeriod: AccessPeriod | null = null;
  let periodsCovered = 1;
  let coverageStartAt: number | null = null;
  let coverageEndAt: number | null = null;
  if (options.programId !== undefined || options.planId !== undefined) {
    if (!options.programId || !options.planId) throw new Error("access_plan_required");
    ensureAccessPlanSchema(database);
    const plan = getAccessPlan(options.programId, options.planId);
    if (!plan || !courseBelongsToSubjectProgram(database, options.programId, courseId)) {
      throw new Error("access_plan_course_mismatch");
    }
    if (amount !== plan.amount_dzd) throw new Error("access_plan_amount_mismatch");
    normalizedAmount = plan.amount_dzd;
    billingPeriod = plan.period;
    periodsCovered = plan.periods_covered;
    coverageStartAt = Date.now();
    coverageEndAt = addMonths(coverageStartAt, plan.period_months * plan.periods_covered);
  }
  const info = database
    .prepare(
      `INSERT INTO payments
        (user_id, course_id, amount, method, recorded_by, program_id, plan_id,
         billing_period, periods_covered, coverage_start_at, coverage_end_at, provider_ref)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      userId,
      courseId,
      normalizedAmount,
      method,
      recordedBy,
      options.programId ?? null,
      options.planId ?? null,
      billingPeriod,
      periodsCovered,
      coverageStartAt,
      coverageEndAt,
      options.providerRef ?? null
    );
  return database.prepare("SELECT * FROM payments WHERE id = ?").get(info.lastInsertRowid) as Payment;
}

export function listPaymentsForUser(userId: number): Payment[] {
  return paymentsDb()
    .prepare("SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as Payment[];
}

export type PaymentWithUser = Payment & { user_name: string; user_email: string };

export function listPendingPayments(): PaymentWithUser[] {
  return paymentsDb()
    .prepare(
      `SELECT p.*, u.name AS user_name, u.email AS user_email
       FROM payments p JOIN users u ON u.id = p.user_id
       WHERE p.status = 'pending' ORDER BY p.created_at ASC`
    )
    .all() as PaymentWithUser[];
}

function grantAccessForPaymentOnDatabase(
  database: Database.Database,
  payment: Payment,
  grantedBy: number | null
): void {
  if (!payment.program_id) {
    database.prepare(`
      INSERT INTO enrollments (user_id, course_id, status, source, granted_by)
      VALUES (?, ?, 'active', ?, ?)
      ON CONFLICT(user_id, course_id) DO UPDATE SET
        status = 'active', source = excluded.source,
        granted_at = unixepoch() * 1000, granted_by = excluded.granted_by
    `).run(payment.user_id, payment.course_id, payment.method === "cash" ? "cash" : "chargily", grantedBy);
    return;
  }

  const plan = database.prepare(
    "SELECT * FROM access_plans WHERE id = ? AND program_id = ? AND active = 1"
  ).get(payment.plan_id, payment.program_id) as AccessPlan | undefined;
  if (!plan || !courseBelongsToSubjectProgram(database, payment.program_id, payment.course_id)) {
    throw new Error("access_plan_course_mismatch");
  }
  if (database.prepare("SELECT 1 FROM subject_entitlements WHERE payment_id = ?").get(payment.id)) return;
  const latest = database.prepare(`
    SELECT expires_at FROM subject_entitlements
    WHERE user_id = ? AND program_id = ? AND status = 'active'
    ORDER BY COALESCE(expires_at, 9223372036854775807) DESC, id DESC LIMIT 1
  `).get(payment.user_id, payment.program_id) as { expires_at: number | null } | undefined;
  const startsAt = latest?.expires_at && latest.expires_at > Date.now() ? latest.expires_at : Date.now();
  const expiresAt = addMonths(startsAt, plan.period_months * plan.periods_covered);
  const graceUntil = expiresAt + plan.grace_days * 86_400_000;
  database.prepare(`
    INSERT INTO subject_entitlements
      (user_id, program_id, plan_id, payment_id, source, starts_at, expires_at,
       grace_until, periods_covered, granted_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    payment.user_id,
    payment.program_id,
    plan.id,
    payment.id,
    payment.method === "cash" ? "cash" : "chargily",
    startsAt,
    expiresAt,
    graceUntil,
    plan.periods_covered,
    grantedBy
  );
}

/** Mark paid and grant access in one SQLite transaction. Safe to retry. */
export function markPaymentPaidAndGrantAccess(
  paymentId: number,
  grantedBy: number | null = null
): Payment | undefined {
  const database = paymentsDb();
  ensureAccessPlanSchema(database);
  return database.transaction(() => {
    const current = database.prepare("SELECT * FROM payments WHERE id = ?").get(paymentId) as Payment | undefined;
    if (!current || current.status === "refunded") return undefined;
    if (current.status === "pending") {
      database.prepare("UPDATE payments SET status = 'paid', updated_at = ? WHERE id = ?").run(Date.now(), paymentId);
    }
    const paid = database.prepare("SELECT * FROM payments WHERE id = ? AND status = 'paid'").get(paymentId) as Payment | undefined;
    if (!paid) return undefined;
    grantAccessForPaymentOnDatabase(database, paid, grantedBy);
    return paid;
  })();
}

/** Backward-compatible name now uses the atomic paid-plus-access path. */
export function markPaymentPaid(paymentId: number, grantedBy: number | null = null): Payment | undefined {
  return markPaymentPaidAndGrantAccess(paymentId, grantedBy);
}

/** Grant access for an already-paid payment, idempotently. */
export function grantAccessForPayment(payment: Payment, grantedBy: number | null = null): void {
  const database = paymentsDb();
  ensureAccessPlanSchema(database);
  database.transaction(() => grantAccessForPaymentOnDatabase(database, payment, grantedBy))();
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

// ——— Per-lesson Q&A (UX Wave 1 U3) ———

export type LessonAnswer = {
  id: number;
  question_id: number;
  user_id: number;
  author_name: string;
  author_role: DbUser["role"];
  body: string;
  created_at: number;
  accepted: 0 | 1;
};

export type LessonQuestion = {
  id: number;
  user_id: number;
  author_name: string;
  author_role: DbUser["role"];
  course_id: string;
  chapter_id: string;
  lesson_id: string;
  body: string;
  created_at: number;
  answers: LessonAnswer[];
};

let lessonQaReady = false;

export function ensureLessonQaTables(database: Database.Database = getDb()): void {
  if (lessonQaReady) return;
  database.exec(`
    CREATE TABLE IF NOT EXISTS lesson_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
    CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson
      ON lesson_questions(course_id, chapter_id, lesson_id, created_at DESC, id DESC);

    CREATE TABLE IF NOT EXISTS lesson_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL REFERENCES lesson_questions(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
      accepted INTEGER NOT NULL DEFAULT 0 CHECK (accepted IN (0, 1))
    );
    CREATE INDEX IF NOT EXISTS idx_lesson_answers_question
      ON lesson_answers(question_id, accepted DESC, created_at ASC, id ASC);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_answers_one_accepted
      ON lesson_answers(question_id) WHERE accepted = 1;
  `);
  lessonQaReady = true;
}

function lessonQaDb(): Database.Database {
  const database = getDb();
  ensureLessonQaTables(database);
  return database;
}

type QuestionRow = Omit<LessonQuestion, "answers">;

export function listLessonQuestions(
  courseId: string,
  chapterId: string,
  lessonId: string,
  limit: number,
  offset: number,
  unansweredOnly: boolean
): { questions: LessonQuestion[]; hasMore: boolean } {
  const database = lessonQaDb();
  const unansweredClause = unansweredOnly
    ? "AND NOT EXISTS (SELECT 1 FROM lesson_answers a WHERE a.question_id = q.id)"
    : "";
  const rows = database
    .prepare(
      `SELECT q.*, u.name AS author_name, u.role AS author_role
       FROM lesson_questions q JOIN users u ON u.id = q.user_id
       WHERE q.course_id = ? AND q.chapter_id = ? AND q.lesson_id = ?
       ${unansweredClause}
       ORDER BY q.created_at DESC, q.id DESC LIMIT ? OFFSET ?`
    )
    .all(courseId, chapterId, lessonId, limit + 1, offset) as QuestionRow[];
  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit);
  if (page.length === 0) return { questions: [], hasMore };
  const placeholders = page.map(() => "?").join(",");
  const answerRows = database
    .prepare(
      `SELECT a.*, u.name AS author_name, u.role AS author_role
       FROM lesson_answers a JOIN users u ON u.id = a.user_id
       WHERE a.question_id IN (${placeholders})
       ORDER BY a.accepted DESC, a.created_at ASC, a.id ASC`
    )
    .all(...page.map((question) => question.id)) as LessonAnswer[];
  const answersByQuestion = new Map<number, LessonAnswer[]>();
  for (const answer of answerRows) {
    const answers = answersByQuestion.get(answer.question_id) ?? [];
    answers.push(answer);
    answersByQuestion.set(answer.question_id, answers);
  }
  return {
    questions: page.map((question) => ({
      ...question,
      answers: answersByQuestion.get(question.id) ?? [],
    })),
    hasMore,
  };
}

export function createLessonQuestion(
  userId: number,
  courseId: string,
  chapterId: string,
  lessonId: string,
  body: string
): number {
  const info = lessonQaDb()
    .prepare(
      `INSERT INTO lesson_questions (user_id, course_id, chapter_id, lesson_id, body)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(userId, courseId, chapterId, lessonId, body);
  return Number(info.lastInsertRowid);
}

export function getLessonQuestion(questionId: number): QuestionRow | undefined {
  return lessonQaDb()
    .prepare(
      `SELECT q.*, u.name AS author_name, u.role AS author_role
       FROM lesson_questions q JOIN users u ON u.id = q.user_id WHERE q.id = ?`
    )
    .get(questionId) as QuestionRow | undefined;
}

export function createLessonAnswer(questionId: number, userId: number, body: string): number {
  const info = lessonQaDb()
    .prepare("INSERT INTO lesson_answers (question_id, user_id, body) VALUES (?, ?, ?)")
    .run(questionId, userId, body);
  return Number(info.lastInsertRowid);
}

export function acceptLessonAnswer(questionId: number, answerId: number): boolean {
  const database = lessonQaDb();
  return database.transaction(() => {
    const answer = database
      .prepare("SELECT 1 FROM lesson_answers WHERE id = ? AND question_id = ?")
      .get(answerId, questionId);
    if (!answer) return false;
    database.prepare("UPDATE lesson_answers SET accepted = 0 WHERE question_id = ?").run(questionId);
    database.prepare("UPDATE lesson_answers SET accepted = 1 WHERE id = ?").run(answerId);
    return true;
  })();
}
