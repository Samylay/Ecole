# UX WAVE 1 SPEC (binding) — 2026-08-22

Read docs/UX-IMPROVEMENT-PLAN.md first (the WHY), then this (the WHAT).
Same laws as docs/PHASE7-SPEC.md: worktrees only, no push, no live DB,
build:verify not build, no new deps without NEEDS-USER, trilingual i18n
via i18n.ts with TranslationKeys, RTL logical utilities, tokens-only,
NO GAMIFICATION of any kind (no badges/XP/leaderboards - Samy decision).
Gates before reporting done: npm run typecheck && npm run build:verify.

## Agent U1 (branch ux/wave1-player) — Video player + notes 2.0
- R-U1.1: lesson page video controls: playback-speed menu (0.75/1/1.25/1.5/2),
  quality selector via YouTube API where exposed, captions toggle, keyboard
  shortcuts (space play/pause, j -10s, l +10s, f fullscreen), trilingual
  tooltips, focus-visible.
- R-U1.2: transcript panel beside the video (desktop side, mobile tab): uses
  the YouTube caption track when available; each line is a button seeking to
  that timestamp; graceful "transcription indisponible" empty state when none.
- R-U1.3: click a transcript line -> seek; highlight-from-transcript button on
  hover creates a note pre-filled with timestamp + quoted text.
- R-U1.4: notes upgrade: LessonNote gains optional quote field (additive);
  new /mes-notes page listing all notes across courses, filter by course +
  chapter, click -> jump to timestamped lesson; linked from profile and the
  lesson sidebar.
- OWNED FILES: src/app/course/[courseId]/lesson/[lessonId]/page.tsx, new
  components VideoControls.tsx / TranscriptPanel.tsx under src/components/,
  src/lib/progress.ts (note shape, additive only), new src/app/mes-notes/
  route, i18n.ts (video + notes sections ONLY).

## Agent U2 (branch ux/wave1-datasaver) — Data-saver + PWA
- R-U2.1: data-saver toggle in profile preferences (persisted in prefs,
  synced like other keys): ON = YouTube embed loads at 360p default quality,
  thumbnails low-res variant, no autoplay anywhere.
- R-U2.2: when ON, small persistent chip on the lesson player "Mode economie
  de donnees" (trilingual).
- R-U2.3: PWA: public/manifest.webmanifest (name Layaida, 192+512 icons from
  logo.png, theme color from globals.css primary), manifest link in root
  layout metadata, install-prompt capture (beforeinstallprompt -> small
  dismissible banner, never blocking).
- R-U2.4: extend sw.js cache list to cover the offline shell (offline route
  already exists).
- OWNED FILES: src/app/profile/page.tsx (prefs section), progress.ts prefs
  shape, lesson embed wiring, root layout head, public/sw.js,
  public/manifest.webmanifest, i18n.ts (datasaver section ONLY).

## Agent U3 (branch ux/wave1-qa) — Per-lesson Q&A with accepted answers
- R-U3.1: tables lesson_questions(id, user_id, course_id, chapter_id,
  lesson_id, body TEXT, created_at) and lesson_answers(id, question_id,
  user_id, body TEXT, created_at, accepted INTEGER DEFAULT 0) via additive
  lazy ensure* pattern in db.ts; exactly one accepted answer per question
  (partial unique index WHERE accepted = 1).
- R-U3.2: API routes under src/app/api/lessons/[lessonId]/questions/: GET
  list w/ answers (enrolled or teacher or admin only), POST question
  (enrolled only, max 500 chars plain text), POST answer (enrolled;
  teacher/admin answers flagged role), POST accept (question author OR
  teacher OR admin). All rate-limited and server-side checked.
- R-U3.3: UI: Q&A section as a new lesson tab "Questions" beside Notes:
  thread list, ask form, inline replies, accept checkmark, teacher answers
  badged "Prof". Unanswered filter toggle for teachers/admins. Plain text
  only (escape HTML), explicit load-more pagination (no infinite scroll).
- R-U3.4: empty state suggests asking the first question (trilingual).
- OWNED FILES: db.ts (append only), new api tree, lesson page tabs, new
  QuestionThread.tsx component, i18n.ts (qa section ONLY).

## Agent U4 (branch ux/wave1-mastery) — Mastery levels (data + display)
- R-U4.1: per-chapter mastery computed client-side from existing state:
  mastered = chapter quiz best >= 80% AND no wrong questions left for that
  chapter; entraine = quiz attempted >= 50% OR lessons completed >= 50%;
  decouvert = any lesson visited. Pure exported functions in progress.ts.
- R-U4.2: course page curriculum rows show a mastery dot (3 states, token
  colors success/primary/faint); course header shows overall mastery %.
- R-U4.3: dashboard shows mastery per enrolled subject/course compactly;
  do not break existing rings layout if avoidable.
- R-U4.4: NO badges, NO celebrations changes, NO notifications - data +
  display only. No server schema change (derived from existing keys).
- OWNED FILES: src/lib/progress.ts (pure helpers), scripts/mastery-check.ts
  sanity script, course/[courseId]/page.tsx, dashboard/page.tsx,
  my-courses/page.tsx if needed, i18n.ts (mastery section ONLY).
