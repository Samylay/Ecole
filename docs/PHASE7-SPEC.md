# PHASE 7 SWARM SPEC (binding) — 2026-08-22

All agents: read this FIRST. It overrides everything else. Repo: ~/apps/Ecole
on this host. You work ONLY inside your assigned git worktree. Commit to your
branch often. NEVER push, NEVER merge to main, NEVER touch another worktree,
NEVER touch data/layaida.db (the live DB), NEVER run `npm run build` without
NEXT_DIST_DIR (use `build:verify`), NEVER restart ecole.service, never add
AI co-author lines to commits.

## Gates (run in your worktree before reporting done)
- export PATH=$PATH:$PWD/node_modules/.bin (a node_modules symlink is provided)
- npm run typecheck → exit 0
- npm run build:verify → exit 0 (scratch dist dir, safe)
Do NOT run npm install; do NOT add dependencies.

## Project laws (from CLAUDE.md/ROADMAP)
- Trilingual: every user-visible string through src/lib/i18n.ts in fr/en/ar;
  TranslationKeys type enforces it. RTL: logical Tailwind utilities only
  (ms-/me-/ps-/pe-/start-/end-/text-start/text-end); directional icons mirror.
- Design: tokens only (no raw hex); type scale 30/22/17/15/13 + mono 11;
  motion 180ms ease-out (--duration-base); touch targets >=44px; empty states
  suggest an action; press feedback active:scale-[0.98]; no transition-all.
- Server auth pattern: see src/lib/server/{db,auth,rateLimit}.ts. Sessions are
  httpOnly cookie layaida_session. Rate-limit every new API route.
- Enrolment is server-authoritative via enrollments table (T7-1, done).
- Roles: student|parent|teacher|admin (T7-5, done).

## Requirements

### Agent A (branch swarm/t7-4-admin) — Staff/cash onboarding admin UI
- R-A1: payments table (user_id, course_id, amount INTEGER centimes,
  method TEXT CHECK IN (cash,chargily), status TEXT CHECK IN (pending,paid,
  refunded), recorded_by INTEGER REFERENCES users(id), created_at) — additive
  CREATE TABLE IF NOT EXISTS in db.ts following the ensure* lazy-pattern used
  for enrollments/email_tokens.
- R-A2: db helpers: createPayment, listPaymentsForUser, markPaymentPaid +
  adminUserExists / setUserRole if missing.
- R-A3: API routes under src/app/api/admin/*: POST /api/admin/students
  (create student account: name+email, role student; returns temp info),
  POST /api/admin/payments (create payment row), POST
  /api/admin/payments/[id]/mark-paid (sets paid AND grants enrolment source
  cash AND issues an account_activation email token via mailer with magic
  link text). ALL admin routes: getCurrentUser must return role admin,
  else 403; rate-limited.
- R-A4: activation endpoint: extend /api/auth/magic to also accept purpose
  account_activation tokens OR add /api/auth/activate consuming them and
  starting a session (choose one, keep it consistent).
- R-A5: admin page at src/app/admin/page.tsx (role-gated client page):
  form to create a student account, list of pending payments with a
  "marquer payé" action, confirmation toasts. Trilingual i18n keys under a
  new admin section. Navbar/profile link visible to admins only.
- R-A6: seed script scripts/seed-admin.ts (tsx-runnable): promotes an email
  argument to role admin. Do NOT run it against data/layaida.db.

### Agent B (branch swarm/t7-6-content-db) — Teacher content model (backend only)
- R-B1: tables courses/chapters/lessons/quiz_questions/documents mirroring the
  shapes in src/lib/data.ts Course types (study data.ts first!). All have
  owner_id INTEGER REFERENCES users(id) on the course row; children cascade.
  Additive CREATE TABLE IF NOT EXISTS via the lazy ensure* pattern.
- R-B2: seed script scripts/seed-content-from-data.ts that imports the static
  arrays from src/lib/data.ts and populates the tables idempotently (DELETE +
  INSERT inside one transaction keyed off a meta row version marker).
  Test-run it against a COPY of the DB in /tmp, never the live DB.
- R-B3: server CRUD lib src/lib/server/content.ts: create/update/delete
  course/chapter/lesson/question/document functions; every write takes the
  acting userId and verifies ownership (course.owner_id === userId or role
  admin) server-side; SQL-parameterized throughout.
- R-B4: teacher API routes src/app/api/teacher/* (list own courses, create
  course, update course, delete course=archive flag, chapter/lesson CRUD
  nested under course). Role check: teacher OR admin, else 403. Rate-limited.
  Validation: manual field checks consistent with existing route style.
- R-B5: NO UI pages in this ticket (frontend is a later wave). NO changes to
  how the public pages read data yet — getCourse etc. stay on data.ts.

### Agent C (branch swarm/t7-7-meet) — Livestream as Meet links
- R-C1: optional livestreamUrl + scheduledAt fields on chapters AND lessons in
  the static data (only where sensible: add to the TS types as optional, add
  values to 2-3 example lessons/chapters marked clearly illustrative).
- R-C2: lesson + fiche cours show a "Rejoindre le live" ButtonLink (opens in
  new tab, rel noopener noreferrer) when scheduledAt is within [-15min,+2h]
  of now OR no scheduledAt given but url present; hidden otherwise. Only
  rendered to enrolled users (isEnrolled) — not on public view.
- R-C3: trilingual i18n keys live.joinLive / live.scheduledFor etc.; Calendar/
  Video icon from lucide; logical utilities; >=44px target.
- R-C4: teacher-facing note is OUT of scope (no admin UI here).
- OWNED FILES: src/lib/data.ts, src/lib/i18n.ts (live keys only),
  src/app/course/[courseId]/page.tsx, lesson page, src/components if needed.
  NOTE: i18n.ts is shared — add ONLY a `live` section; do not reorder others.

### Agent D (branch swarm/t7-8-sessions) — Device metadata + sharing detection v1
- R-D1: sessions table gains nullable user_agent TEXT, ip TEXT, last_seen_at
  INTEGER — additive: CREATE TABLE IF NOT EXISTS stays untouched; instead add
  ALTER TABLE ... ADD COLUMN guarded by a pragma_table_info check (SQLite
  supports additive ADD COLUMN safely) in a lazy ensure function like the
  others. Existing rows keep NULLs.
- R-D2: startSession records UA + IP (x-forwarded-for); getSessionUser
  updates last_seen_at (throttled: only if >60s stale to avoid write storms).
- R-D3: GET /api/auth/sessions returns the caller's active sessions (token
  prefix id = first 8 chars, ua, ip, created_at, last_seen_at, current flag);
  DELETE /api/auth/sessions/[prefix] revokes one (not the current one).
- R-D4: profile page gains an "Appareils connectés" (trilingual) section
  listing sessions with per-row "Déconnecter" buttons; refresh after revoke.
- R-D5: sharing heuristic v1 server-side helper src/lib/server/risk.ts:
  countDistinctActiveDevices(userId, windowMs=24h) using last_seen_at+ip+ua;
  expose GET /api/auth/risk returning {distinctDevices24h} for the caller.
  No enforcement yet (notice-only); document next steps in code comments.
- OWNED FILES: db.ts (append only), auth.ts, new api dirs, profile page,
  i18n.ts (devices section keys ONLY).
