# Handoff: Layaida — full product redesign (« Nord Campus »)

## Overview
Complete visual redesign + expanded screen inventory for **Layaida**, the trilingual (fr/en/ar) STEM e-school for collège/lycée students. Replaces the current indigo/Inter/gray Tailwind MVP with a calm, cool-neutral system: violet primary, tinted subject colors, pill buttons, 16px cards, IBM Plex Sans + IBM Plex Sans Arabic.

Target codebase: **Samylay/Ecole** — Next.js 15 (App Router) + React 19 + Tailwind CSS 4 + TypeScript, mock data in `src/lib/data.ts`, i18n via `src/lib/i18n.ts` + `locale-context.tsx` (already sets `document.documentElement.dir`).

## About the Design Files
The files in this bundle are **design references created in HTML** — high-fidelity mockups showing intended look and behavior, NOT production code to copy. The task is to **recreate these designs inside the Ecole codebase** using its existing patterns (App Router pages, `useLocale()`, Tailwind utilities, mock data). Open `Layaida Design.dc.html` in a browser to view everything on one pannable canvas.

## Fidelity
**High-fidelity.** Colors, type sizes, spacing, radii and copy are final. Recreate pixel-perfectly with Tailwind utilities backed by the tokens in `tokens.css`.

## Implementation plan (suggested commit order)
1. **Tokens**: replace the `:root` block in `src/app/globals.css` with `tokens.css` (Tailwind 4 `@theme` → utilities like `bg-primary`, `text-ink`, `rounded-card`, `shadow-card`). Delete the old `--primary: #4F46E5` palette.
2. **Fonts**: in `src/app/layout.tsx`, load `IBM_Plex_Sans`, `IBM_Plex_Sans_Arabic`, `IBM_Plex_Mono` via `next/font/google` (weights 400/500/600/700; mono 400/500). Drop Inter/Tajawal.
3. **Subject colors**: rewrite `subjectColors` in `src/lib/data.ts` to the new math/physics/biology tokens (solid + `-soft` tint + `-deep` text). Scheme scales: new subject = new oklch hue.
4. **Core components** (`src/components/`): Button, Input, CourseCard (new layout below), LessonRow, ProgressBar/Ring, Badge, Tabs, Toast, Modal, EmptyState, Skeleton.
5. **Screens** in the order of the design doc sections 02→12.

## Design system essentials
- **Type scale** (same rem scale both scripts; Arabic +0.2 line-height, no letter-spacing):
  display 30/600 · h1 22/600 · h2 17/600 · body 15/400 (lh 1.6) · small 13/500 · stats/timers in Plex Mono 11/500.
- **Spacing**: 4-base scale (4/8/12/16/24/32/48).
- **Radius**: chip 8 · input 12 · card 16 · buttons pill.
- **Elevation**: border-only → `shadow-card` → `shadow-modal`. Primary buttons carry `shadow-primary`.
- **Buttons**: h-44px (mobile floor for touch), pill, primary `#5B5BD6` (hover `#4747B8`, press scale .98), secondary `#E6E6FA`/`#4747B8`, ghost, disabled `#DCE1EC`/`#8A94A4`. Small = 36px (desktop-only contexts).
- **Inputs**: h-48, radius 12, border 1.5px `#DCE1EC`; focus 2px primary + 3px `#E6E6FA` ring; error 2px `#D14D5D` + message below, validate on blur.
- **Focus**: 2px ink outline, offset 2 (keep existing `:focus-visible` pattern, swap color).
- **Motion**: 180ms ease-out everywhere; keep the existing `prefers-reduced-motion` kill-switch.
- **Icons**: 24px rounded stroke (Lucide), 2px weight; filled only for active bottom-nav item.
- **Voice**: encouraging second person («Reprends là où tu t'es arrêté»), never childish.

## Screens (see matching numbered section in the HTML canvas)
Each section in `Layaida Design.dc.html` has mobile + desktop frames and an interaction-notes paragraph at the bottom. Summary:

- **02 Accueil** — white nav (pill links), mist hero with central search pill, subject tile grid (tinted), popular-courses grid (4-col desktop / stacked rows mobile), ink footer. Route: `/`.
- **03 Auth** — single-card forms; sign-up starts with élève/parent role cards; password strength meter; desktop sign-in is a 2-panel card (ink testimonial + form). Routes: `/signin`, `/signup`.
- **04 Onboarding** — 3 steps (classe → matières → objectif hebdo + reminder toggle), top segmented progress, «Passer» applies defaults. New route: `/onboarding` after sign-up.
- **05 Dashboard** — greeting + streak chip, ink «Reprendre» card (whole card = tap target into player), weekly-goal segments, per-subject progress rings, recommendations. Desktop = 2fr/1fr with weekly bar chart + streak card. **Arabic RTL mobile mock included** — mirror via logical properties, Arabic-Indic digits via `Intl.NumberFormat('ar')`. New route: `/dashboard` (post-login home).
- **06 Catalogue** — desktop 260px filter rail (subject checkboxes with counts, collège/lycée segmented, duration range, rating); active filters as dismissible chips; mobile filter bottom-sheet whose CTA carries live count; designed empty state with recovery actions. Route: `/courses` (extend current `/`-based filtering).
- **07 Fiche cours** — subject-tinted hero, preview video card + enroll CTA (sticky bottom bar on mobile, becomes «Commencer la leçon 1» after enroll), «Ce que tu vas apprendre» grid, prerequisite chip linking to prior course, chapter accordion with «Aperçu» lessons, ratings histogram + review cards. Route: `/course/[id]`.
- **08 Lecteur** — top bar with course progress; video; tabs À propos / Mes notes (timestamped) / Documents; mark-complete (toasts, +1 progress, auto-advance 5s cancellable); prev/next; 320px chapter sidebar with 48px rows, quiz row in warning tint; mobile gets «☰ Chapitres» bottom drawer. **Arabic RTL desktop mock included** — sidebar flips to the left, arrows/play glyphs mirror. Route: `/course/[id]/lesson/[lessonId]`.
- **09 Quiz** — one question/screen, validate → immediate feedback (correct always green, explanation card links back to the lesson), results ring + per-question review list, «Rejouer» reshuffles wrong-first. Route: `/course/[id]/quiz/[chapterId]`.
- **10 Mes cours + Profil** — enrolled courses with per-course bars + resume CTA, En cours/Terminés tabs; profile with fr/en/ar segmented switcher (instant, flips `dir` at root — wiring already exists in `locale-context.tsx`), theme Clair/Sombre/Système, notifications, weekly goal, password; desktop settings = 230px sidebar layout. Routes: `/my-courses`, `/profile`.
- **11 Enseignant + Parent** — public instructor page (ink header, stats, course grid, Suivre); read-only parent view (weekly ring, per-subject bars, activity feed, gentle summary). Routes: `/teacher/[id]`, `/parent`.
- **12 States** — 404 («Cette page a séché les cours»), offline (banner + downloaded docs remain available), error, skeleton loaders, **dark-mode dashboard preview**.

## State management
- Reuse `auth-context` and `progress.ts`; add: enrollment status, per-lesson completion, quiz attempts (score + wrong question ids), streak (last-activity dates), weekly goal target/count, notes (lessonId + timestamp + text), locale (existing), theme.
- Persist locally (current mock-data approach) — no backend assumptions.

## RTL rules (hard requirement)
- Use **logical properties only** (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*` in Tailwind) — never `pl/pr/left/right`.
- Directional glyphs (chevrons, play, arrows) must mirror; progress fills from inline-start.
- Arabic digits: `Intl.NumberFormat('ar')` for stats/timers.
- `[dir="rtl"]` font swap is in `tokens.css`.

## Accessibility
WCAG AA contrast verified on all token pairs (deep text on soft tints, white on primary/ink). Touch targets ≥44px. Visible 2px ink focus. Reduced-motion: keep the existing global kill-switch; ring/score animations must be skipped, not just shortened.

## Assets
- `logo.png` — official Layaida mark (Arabic wordmark reads **العيايدة**). Use at 32–64px on white/mist.
- Course imagery: striped placeholders in the mocks — replace with real thumbnails; keep the subject-tint background while loading.

## Files
- `Layaida Design.dc.html` — full design canvas (12 numbered sections, mobile+desktop, FR + Arabic RTL mocks, light + dark). Open in a browser; requires internet for Google Fonts.
- `Layaida Brand Directions.dc.html` — the 3 explored brand directions (1c « Nord Campus » was chosen).
- `tokens.css` — drop-in Tailwind 4 `@theme` token sheet (light + dark).
- `logo.png` — brand mark.
