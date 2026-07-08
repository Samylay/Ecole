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

- [ ] **P1-T1 — Quiz coverage for every chapter** (M) — only 4 chapters have quizzes (`quizzes` in `src/lib/data.ts`). Write 3 trilingual QCM questions (+ explanations linking a real `lessonId`) for every remaining chapter of every course, matching the existing shape. Verify: `npm run typecheck && npm run build`, and a grep shows every chapter id of every course present in `quizzes`.
- [ ] **P1-T2 — Real SVG course thumbnails** (M) — CourseCard renders a tinted placeholder. Create one distinctive inline-SVG illustration per course (geometric, subject-tinted, no external assets) in `public/thumbnails/` and render via `next/image` with the tint kept as loading background. Verify: build passes and every course id has a matching SVG file.
- [ ] **P1-T3 — Per-course outcomes + reviews** (M) — `getCourseExtras` falls back to generic outcomes and empty reviews for 9 of 10 courses. Write course-specific trilingual outcomes (4 each) and 2–3 reviews per course. Verify: typecheck+build; no course uses `defaultOutcomes`.
- [ ] **P1-T4 — Skeleton loading states** (S) — `CourseCardSkeleton` exists but nothing uses it. Add `loading.tsx` files (or in-page skeletons) for /courses, /dashboard, /my-courses using the shimmer components. Verify: typecheck+build; route-level loading files exist.
- [ ] **P1-T5 — Route metadata & SEO** (S) — only the root layout has metadata. Add per-route `<title>`/description (generateMetadata or layout metadata for static routes; the pages are client components so use route-group layouts), plus OpenGraph image placeholder. Verify: build output + curl shows distinct `<title>` per route.
- [ ] **P1-T6 — Smoke-test suite** (M) — no tests exist. Propose (NEEDS-SAMY approval for the dependency) Playwright or vitest+testing-library; once approved, cover: signup→onboarding→enroll→complete-lesson→quiz happy path, locale switch flips `dir`, dark-mode toggle. Until approved: BLOCKED.
- [ ] **P1-T7 — Dark-mode contrast audit** (S) — walk every screen in `.dark` and fix any token pairing below AA (notably warning-on-warning-soft and text on tinted chips). Verify: typecheck+build + note listing checked pairs in the Log.
- [ ] **P1-T8 — Arabic copy review** (S) — the ar strings were machine-written; sweep `src/lib/i18n.ts` + `data.ts` Arabic for tone consistency (tutoiement equivalent, no literal calques). Keep Layaida wordmark = العيايدة. Verify: typecheck+build; Log lists changed keys. NEEDS-SAMY final read.
- [ ] **P1-T9 — Streak/goal edge cases** (S) — `getStreak` counts calendar days but `recordActiveDay` only fires on completion/quiz; visiting without finishing breaks streaks silently. Record active days on lesson-player visits too, and cap `getWeeklyActivity` rendering when >9 lessons/day. Verify: typecheck+build.

## Phase 2 — Real accounts & data (NEEDS-SAMY decisions first)

Goal: multiple real users on one shared source of truth. Everything below changes infra — **queue, never unattended**.

- [ ] **P2-T1 — NEEDS-SAMY: pick the backend** — recommendation: SQLite (better-sqlite3 or Drizzle+libsql) like LifeOS for self-host simplicity, or Postgres in Docker like Flux if multi-device sync matters from day 1. Decide also where it runs (homelab behind tunnel vs VPS).
- [ ] **P2-T2 — Real auth** — replace the hardcoded users: Auth.js (NextAuth) credentials + email verification, bcrypt hashes, session cookies (httpOnly), CSRF. Parent/student roles persisted. Requires P2-T1.
- [ ] **P2-T3 — Server-side learner state** — move enrollment/completion/quiz attempts/notes/streak/goal from localStorage to the DB behind API routes; keep localStorage as offline cache with a one-time upload migration (the per-user namespacing in `progress.ts` was designed for this).
- [ ] **P2-T4 — Course content in the DB + admin CRUD** — courses/chapters/lessons/quizzes as tables; minimal admin screen (Samy-only) to create/edit content in the three languages. `data.ts` becomes the seed script.
- [ ] **P2-T5 — Parent↔child linking** — real parent accounts linked to a student (invite code at signup, per the design's child-linking flow); parent view reads the child's data server-side, read-only.

## Phase 3 — Real content & video

Goal: it teaches, not just demos. The YouTube placeholder embed must die.

- [ ] **P3-T1 — NEEDS-SAMY: video strategy** — options: (a) unlisted YouTube embeds (free, fast, least control), (b) Cloudflare Stream (~$5/1k min, signed URLs, matches the existing CF tunnel), (c) self-hosted HLS (ffmpeg + R2/minio). Recommendation: start (a) for the pilot, design URLs so (b) is a column swap.
- [ ] **P3-T2 — NEEDS-SAMY: pilot curriculum** — pick ONE course (suggestion: Algèbre 3ᵉ, deepest mock data) and produce/collect real lessons end-to-end: videos, PDFs, quizzes. Validates the whole pipeline before scaling content.
- [ ] **P3-T3 — Real documents** — replace `url: "#"` PDFs with actual files served from the app (or R2), with download tracking; keep the design's promise that downloaded docs work offline (service-worker cache).
- [ ] **P3-T4 — Video progress tracking** — swap elapsed-time note timestamps for real player position (YouTube IFrame API or HLS events); resume-at-position; count a lesson viewed at ≥80% watched.

## Phase 4 — Launch ops

- [ ] **P4-T1 — NEEDS-SAMY: hosting + domain** — homelab behind the existing Cloudflare tunnel scaffold vs Vercel/VPS; pick the domain; staging + prod.
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
- 2026-07-08 — Full Nord Campus redesign implemented and verified (typecheck+build green, all 14 routes 200). Old roadmap superseded: T01 ✓ (committed), T02 ✓ (locale persisted), T03 ✓ (tokens), T04 ✓ (dark mode), T05 ✓ (/courses), T06 ✓ (/dashboard), T07 ✓ (per-user progress + migration), T08 ✓ (/profile), T09 partially ✓ (quizzes on 4 chapters — completed by P1-T1), T10 ✓ (/teacher/[slug]), T11 ✓ (RTL logical props, grep clean), T12 ✓ (focus rings, ≥44px targets, reduced-motion kill-switch). Roadmap rewritten around the path to production.
