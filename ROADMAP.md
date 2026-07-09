# Roadmap — Ecole (Layaida)

> Executor contract: each night an unattended Sonnet agent (`claude -p`, cwd = this repo) picks the FIRST unchecked task, does ONLY that task, verifies it per the task's Verify note, commits with an `autoloop:` prefix (one logical change per commit, never leave the tree dirty), then ticks the checkbox adding the date and a one-line result, and appends details to ## Log. If verification fails: revert, leave unchecked, add a `BLOCKED:` note. Tasks marked **NEEDS-SAMY** are decisions/credentials only Samy can provide — never attempt them unattended.

## Context for the executor

- **Stack:** Next.js 15 App Router + React 19 + Tailwind CSS 4 + TypeScript + lucide-react. Verification gate: `npm run typecheck && npm run build` (both pass — keep them passing). No test suite yet (see P1-T6).
- **State (2026-07-08):** the full « Nord Campus » redesign is implemented (see `design/handoff/README.md` — the spec; `DESIGN_PROMPT.md` — the original brief). All screens exist: accueil, auth, onboarding, dashboard, catalogue `/courses`, fiche cours, lecteur, quiz, mes cours, profil, teacher, parent, 404/erreur/offline. Light+dark themes, fr/en/ar with full RTL.
- **Data model:** still intentionally **mock/local** — courses in `src/lib/data.ts` (trilingual), auth hardcoded in `src/app/api/auth/*`, all learner state per-user in localStorage (`src/lib/progress.ts`). Phase 1 stays mock; Phases 2+ replace it deliberately, task by task.
- **Trilingual rule (never break):** every user-visible string goes through `src/lib/i18n.ts` in all three locales; the `TranslationKeys` type enforces it.
- **RTL rule:** logical Tailwind utilities only (`ms-/me-/ps-/pe-/start-/end-/text-start/text-end`); directional icons must mirror (`dir === "rtl"` → `-scale-x-100`).
- **Design rules:** tokens only (no raw hex in components); type scale 30/22/17/15/13 + mono 11; motion 180ms ease-out; touch targets ≥44px; empty states always suggest an action.
- Never add a dependency unattended — propose as NEEDS-SAMY.

## Phase 1 — Polish & content depth (mock data, autoloop-safe)

Goal: make the mock platform indistinguishable from a real one in look and feel.

- [x] **P1-T1 — Quiz coverage for every chapter** (M) (2026-07-08: added 3 trilingual QCM questions each to all 24 previously-quizless chapters across the 10 courses; every chapter now has a quiz matching the existing shape).
- [x] **P1-T2 — Real SVG course thumbnails** (M) (2026-07-09: added one geometric, subject-tinted inline SVG per course in `public/thumbnails/` (11 files matching all 11 course ids), CourseCard now renders it via `next/image` with the subject tint kept as the loading background; enabled `images.dangerouslyAllowSVG` with a locked-down CSP in next.config.ts since these are locally-authored assets).
- [x] **P1-T3 — Per-course outcomes + reviews** (M) (2026-07-09: wrote 4 trilingual outcomes + 2 reviews each for the 10 courses that previously fell back to `defaultOutcomes`/empty reviews — geometry, statistics, trigonometry, mechanics, electricity, optics, cells, ecology, human-body, genetics; math-algebra-101 already had custom content. A script confirms all 11 courses now have 4 outcomes and ≥2 reviews via `getCourseExtras`).
- [x] **P1-T4 — Skeleton loading states** (S) (2026-07-09: added `loading.tsx` for /courses, /dashboard, /my-courses using `Skeleton`/`CourseCardSkeleton`, each mirroring its route's real layout).
- [ ] **P1-T5 — Route metadata & SEO** (S) — only the root layout has metadata. Add per-route `<title>`/description (generateMetadata or layout metadata for static routes; the pages are client components so use route-group layouts), plus OpenGraph image placeholder. Verify: build output + curl shows distinct `<title>` per route.
- [ ] **P1-T6 — Smoke-test suite** (M) — no tests exist. Propose (NEEDS-SAMY approval for the dependency) Playwright or vitest+testing-library; once approved, cover: signup→onboarding→enroll→complete-lesson→quiz happy path, locale switch flips `dir`, dark-mode toggle. Until approved: BLOCKED.
- [ ] **P1-T7 — Dark-mode contrast audit** (S) — walk every screen in `.dark` and fix any token pairing below AA (notably warning-on-warning-soft and text on tinted chips). Verify: typecheck+build + note listing checked pairs in the Log.
- [ ] **P1-T8 — Arabic copy review** (S) — the ar strings were machine-written; sweep `src/lib/i18n.ts` + `data.ts` Arabic for tone consistency (tutoiement equivalent, no literal calques). Keep Layaida wordmark = العيايدة. Verify: typecheck+build; Log lists changed keys. NEEDS-SAMY final read.
- [ ] **P1-T9 — Streak/goal edge cases** (S) — `getStreak` counts calendar days but `recordActiveDay` only fires on completion/quiz; visiting without finishing breaks streaks silently. Record active days on lesson-player visits too, and cap `getWeeklyActivity` rendering when >9 lessons/day. Verify: typecheck+build.

## Phase 2 — Real accounts & data (NEEDS-SAMY decisions first)

Goal: multiple real users on one shared source of truth. Everything below changes infra — **queue, never unattended**.

- [x] **P2-T1 — pick the backend** — 2026-07-08, Samy: **SQLite on the homelab** (better-sqlite3, WAL, `data/layaida.db`, `LAYAIDA_DB` override). Done same day.
- [x] **P2-T2 — Real auth** — 2026-07-08: hand-rolled sessions instead of Auth.js (zero-dep MVP): scrypt hashes via node:crypto, httpOnly 30-day cookie, `/api/auth/{signup,login,logout,me,password}`, roles persisted. Email verification + CSRF hardening deferred to P4-T2.
- [x] **P2-T3 — Server-side learner state** — 2026-07-08: `learner_state` key/value mirror of the client namespace; `/api/state` GET/PUT; progress.ts debounce-pushes writes, pull-on-login (server wins), offline keeps local copy. Remaining polish: resync-on-reconnect event, conflict strategy beyond server-wins.
- [ ] **P2-T4 — Course content in the DB + admin CRUD** — courses/chapters/lessons/quizzes as tables; minimal admin screen (Samy-only) to create/edit content in the three languages. `data.ts` becomes the seed script.
- [ ] **P2-T5 — Parent↔child linking** — real parent accounts linked to a student (invite code at signup, per the design's child-linking flow); parent view reads the child's data server-side, read-only.

## Phase 3 — Real content & video

Goal: it teaches, not just demos. The YouTube placeholder embed must die.

- [x] **P3-T1 — video strategy** — 2026-07-08, Samy: **unlisted YouTube embeds** for the pilot; keep `videoUrl` a plain URL so Cloudflare Stream later is a data swap.
- [ ] **P3-T2 — pilot curriculum: Algèbre (math-algebra-101)** — 2026-07-08, Samy picked Algèbre. NEEDS-SAMY: produce/collect the real lessons (videos as unlisted YouTube, PDFs, verified quizzes) — content production is on Samy; wiring is on the agents once URLs/files exist.
- [ ] **P3-T3 — Real documents** — replace `url: "#"` PDFs with actual files served from the app (or R2), with download tracking; keep the design's promise that downloaded docs work offline (service-worker cache).
- [ ] **P3-T4 — Video progress tracking** — swap elapsed-time note timestamps for real player position (YouTube IFrame API or HLS events); resume-at-position; count a lesson viewed at ≥80% watched.

## Phase 4 — Launch ops

- [x] **P4-T1 — hosting + domain** — 2026-07-08, Samy: **homelab**, public at **ecole.samylayaida.com** via the existing CF tunnel. `ecole.service` runs on **127.0.0.1:3002** (unit in ~/infra/systemd/). ⚠️ Domain audit found ecole.samylayaida.com ALREADY serves a Vercel auto-deploy of this repo (broken auth there — serverless has no SQLite). DONE 2026-07-08: Samy unlinked Vercel + added the tunnel hostname; Secure cookies flipped on, public E2E green. Original steps were: (1) Vercel → Ecole project → remove domain + disconnect the repo or disable auto-deploy, (2) CF Zero Trust → Tunnels → homelab → Public Hostnames → add `ecole.samylayaida.com` → HTTP → `localhost:3002` (no Access policy — public app), (3) then remove `LAYAIDA_INSECURE_COOKIE=1` from ecole.service and restart (cookies become Secure behind CF TLS). NEEDS-SAMY: a scoped CF API token (Zone.DNS + Access/Tunnels edit) in ~/.config/homelab/secrets.env would let agents manage this henceforth.
- [ ] **P4-T2 — Hardening** — rate-limit auth routes, security headers (CSP), zod validation at the API boundary, DB backups into the ~/backups rotation, error tracking.
- [ ] **P4-T3 — Monitoring & standing goal** — blackbox probe + Grafana panel like the other apps; graduate a standing goal in ~/infra/goals (predicate: prod URL 200 + build green) once live.
- [ ] **P4-T4 — Legal pages** — real Conditions/Confidentialité (footer links are `#`), cookie-less analytics or none, RGPD basics for minors' data (parental consent at signup).

## Phase 5 — Feel-real differentiators (post-launch)

- [ ] **P5-T1 — Certificates** — trilingual course-completion certificate (PDF) — the single strongest "real platform" signal for students/parents.
- [ ] **P5-T2 — Search that finds lessons** — index lesson titles/descriptions (not just courses) with highlighted matches; the hero search promises this.
- [ ] **P5-T3 — Spaced-repetition review** — a "Réviser" queue resurfacing failed quiz questions across chapters (wrongQuestionIds is already stored).
- [ ] **P5-T4 — Teacher Q&A** — per-lesson question thread (moderated) — planned as "later iteration" in the handoff.
- [ ] **P5-T5 — Exam-prep mode** — timed mock exams assembled from chapter quizzes per grade (brevet/bac alignment).
- [ ] **P5-T6 — Teacher dashboard** — upload/manage lessons (explicitly deferred in the handoff).

## Log

- 2026-07-08: T01 blocked (old roadmap). DESIGN_PROMPT.md was already committed (5a0f56d), but the tree was dirty with the in-flight redesign WIP; the autoloop correctly left it untouched.
- 2026-07-08 (later) — Decisions from Samy: SQLite on homelab / unlisted YouTube / pilot = Algèbre / host on homelab. P2-T1..T3 implemented + deployed same day: `ecole.service` live on 127.0.0.1:3002, E2E verified (signup/login/logout/password-change, state PUT on one session readable from a fresh login). Judgment call: hand-rolled scrypt+cookie sessions instead of Auth.js — zero new deps, swap possible later; email verification and CSRF deferred to P4-T2. Samy's account seeded with a placeholder password — he must change it in /profile → Sécurité.
- 2026-07-08 — Full Nord Campus redesign implemented and verified (typecheck+build green, all 14 routes 200). Old roadmap superseded: T01 ✓ (committed), T02 ✓ (locale persisted), T03 ✓ (tokens), T04 ✓ (dark mode), T05 ✓ (/courses), T06 ✓ (/dashboard), T07 ✓ (per-user progress + migration), T08 ✓ (/profile), T09 partially ✓ (quizzes on 4 chapters — completed by P1-T1), T10 ✓ (/teacher/[slug]), T11 ✓ (RTL logical props, grep clean), T12 ✓ (focus rings, ≥44px targets, reduced-motion kill-switch). Roadmap rewritten around the path to production.
- 2026-07-08 (autoloop) — P1-T1 done: wrote 3 trilingual QCM questions (with explanations linking a real `lessonId`) for all 24 chapters that had no quiz yet, across all 10 courses (math-algebra-101 ch3/ch4, math-geometry-201, math-statistics-102, math-trigonometry-301, physics-mechanics-101 ch2/ch3, physics-electricity-101, physics-optics-102, biology-cells-101 ch2, biology-ecology-201, biology-human-body-102, biology-genetics-301). `npm run typecheck && npm run build` pass; a script confirms every chapter of every course has ≥3 quiz questions. Committed in 5 parts (261/394/329/264/264 changed lines) to respect the 400-line unattended-commit cap.
- 2026-07-09 (autoloop) — P1-T2 done: added `public/thumbnails/<course-id>.svg` (11 hand-authored geometric SVGs — algebra grid, geometry shapes, statistics bars, trig unit circle, mechanics vector, electricity circuit, optics lens, cell diagram, ecology leaves, body silhouette, DNA helix — each tinted with the course's subject token, e.g. math #3f7ad9/#e3edfb/#2c5aa8). CourseCard now renders the SVG via `next/image` (`fill`, `object-cover`) over the existing subject-tint background div instead of the giant glyph placeholder; removed the now-unused `subjectIcons` import. Added `images.dangerouslyAllowSVG` + a script-blocking CSP to next.config.ts (required for Next's image optimizer to serve local `.svg`s). Note: the codebase actually has 11 courses, not 10 as the task/P1-T3 text says — a script confirmed all 11 have a matching thumbnail; didn't touch the stale "10" wording since that's P1-T3's task, not this one. `npm run typecheck && npm run build` both pass.
- 2026-07-09 (autoloop) — P1-T3 done: wrote 4 course-specific trilingual learning outcomes and 2 reviews (author, rating, trilingual text, date) for each of the 10 courses previously falling back to `defaultOutcomes`/empty reviews in `getCourseExtras` (math-geometry-201, math-statistics-102, math-trigonometry-301, physics-mechanics-101, physics-electricity-101, physics-optics-102, biology-cells-101, biology-ecology-201, biology-human-body-102, biology-genetics-301); math-algebra-101 already had custom content, left untouched. Kept existing `prerequisiteId` links (geometry→algebra, trigonometry→geometry, optics→mechanics, ecology→cells). A tsx script confirms all 11 courses now report 4 outcomes and ≥2 reviews via `getCourseExtras`. `npm run typecheck && npm run build` pass. Committed in 3 parts (140/139/185 changed lines, grouped by subject) to respect the 400-line unattended-commit cap.
- 2026-07-09 (autoloop) — P1-T4 done: added `src/app/{courses,dashboard,my-courses}/loading.tsx`, each a server component built from the existing `Skeleton`/`CourseCardSkeleton` shimmer primitives and shaped to mirror that route's real layout (catalog: title/search/filter-rail/card-grid skeleton; dashboard: resume card/weekly-goal/subject-rings/side-column skeletons; my-courses: title/tabs/card-grid skeleton). No Navbar/Footer in the skeleton (they're rendered inside each page, not a shared layout, and pulling them in would trigger duplicate auth hook calls during the loading flash). `npm run typecheck && npm run build` pass (18/18 routes generated); confirmed all three files exist at the route paths named in the task.
