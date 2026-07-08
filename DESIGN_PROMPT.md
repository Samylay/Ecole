# Prompt — Redesign complet de Layaida

Copy everything below into the design tool / AI of your choice.

---

## Context

I'm building **Layaida**, an online learning platform (e-school) for middle-school and high-school students. Think "mini Udemy/Khan Academy" focused on STEM subjects, aimed at a French/Arabic-speaking audience (e.g., France + North Africa).

**Core facts:**

- **Audience:** students aged ~11–18 (middle school "collège" and high school "lycée"), plus their parents who pay/supervise. Teachers record video lessons.
- **Subjects today:** Math, Physics, Biology — each with its own color identity (blue / purple / green). More subjects will come.
- **Content model:** Course → Chapters → Lessons. A lesson = an embedded video + a text description + optional downloadable documents (PDF exercises, cheat sheets). Courses show instructor (name, avatar, bio), total lessons, total hours, student count, and rating.
- **Trilingual & RTL:** every piece of content and UI exists in **French (default), English, and Arabic**. Arabic is **right-to-left** — the design must fully mirror for RTL, not just translate strings.
- **Current tech:** Next.js 15 (App Router) + React 19 + Tailwind CSS 4 + TypeScript. Auth is email/password. Enrollment and lesson-completion progress are tracked per user. Everything is currently mock/local data — the design should not assume backend constraints.

**Current pages (the MVP I want to replace):**

1. **Home** — indigo/purple gradient hero, search bar, subject filter tabs, grid of course cards, footer.
2. **Sign in / Sign up** — basic centered forms.
3. **Course detail** — course info, instructor, chapter/lesson accordion, enroll button.
4. **Lesson player** — YouTube embed, lesson description, documents list, "mark as complete", prev/next navigation.
5. **My courses** — enrolled courses with completion indicators.
6. **404 page.**

The current design is a generic Tailwind look (Inter font, indigo-600 primary, gray-50 background, white cards, rounded corners). It works but it's bland, has no real identity, and several essential screens are missing.

## Your task

Design an **entirely new, more complete design** for Layaida. Don't restyle the existing screens — rethink the whole product's visual identity and expand the screen inventory. Deliver:

### 1. Design system

- A distinctive brand identity appropriate for teenagers studying (motivating, friendly, credible — not childish, not corporate). Name stays "Layaida".
- Full color system: primary/secondary/accent, semantic colors (success/warning/error/info), the three subject colors reimagined, plus a scalable scheme for future subjects. Light **and dark mode**.
- Typography scale that works for **Latin and Arabic scripts** (pick a font pairing that has real Arabic support).
- Spacing, radius, elevation, iconography style.
- Core components: buttons, inputs, course card, lesson row, progress indicators, badges, tabs, toasts, modals, empty states, skeleton loaders.

### 2. Complete screen inventory (mobile-first + desktop for each)

Everything from the current MVP, redesigned, **plus the missing screens**:

- **Student dashboard** (after login): continue-where-you-left-off, progress per subject, streak/weekly goals, recommended next lessons.
- **Course catalog** with real filtering (subject, level collège/lycée, duration, rating) and search results states.
- **Course detail** with reviews section, "what you'll learn", prerequisites.
- **Lesson player** redesigned: chapter sidebar/drawer, notes area, documents, quiz entry point.
- **Quizzes / exercises** after lessons: question screen, results screen, retry flow.
- **Student profile & settings**: language switcher (fr/en/ar), avatar, password, notifications.
- **Onboarding flow** for new students: pick level, pick subjects, goal setting.
- **Instructor/teacher pages**: public instructor profile; (bonus) a simple teacher dashboard for uploading lessons.
- **Parent view** (bonus): child's progress summary.
- **States:** empty states, loading, errors, offline, and the 404.

### 3. Hard requirements

- **RTL mirroring** shown explicitly: include at least the dashboard and lesson player mocked in Arabic RTL.
- **Accessibility:** WCAG AA contrast, visible focus states, touch targets ≥ 44px, reduced-motion friendly.
- **Responsive:** phone-first (that's where students are), then tablet and desktop.
- Design tokens named so they can be implemented as CSS variables / Tailwind theme config.

### 4. Output format

Present the design system first, then screen by screen. For each screen: layout description, key components used, and interaction notes (hover, active, transitions). Make it concrete enough that a developer can implement it in Next.js + Tailwind without guessing.
