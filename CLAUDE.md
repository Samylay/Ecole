# Ecole (Layaida) — trilingual e-learning platform. Read @ROADMAP.md for the task queue and current phase.

## Purpose / state
- Trilingual (fr/en/ar) e-learning platform; « Nord Campus » redesign shipped 2026-07-08 — all 12+ screens exist, light+dark, full RTL.
- Data is intentionally **mock/local** in Phase 1 (courses in `src/lib/data.ts`, auth hardcoded, learner state in localStorage). Phases 2+ replace it task by task — don't "fix" mock data ahead of the phase gates.

## Essential files
- @ROADMAP.md — executor contract, phased task queue, NEEDS-SAMY gates.
- @DESIGN_PROMPT.md — original redesign brief. **Read when:** questioning a design choice.
- `design/handoff/README.md` — the shipped design spec (tokens, type scale, motion). **Read when:** touching any UI.

## Constraints (MUST NOT)
- Never ship a user-visible string outside `src/lib/i18n.ts`; all three locales required (the `TranslationKeys` type enforces it) — except dev-only console/log text.
- No physical directional Tailwind utilities (`ml-/mr-/pl-/pr-/text-left/right`); logical only (`ms-/me-/ps-/pe-/text-start/end`). Directional icons mirror under RTL (`dir === "rtl"` → `-scale-x-100`).
- No raw hex in components — design tokens only. No new dependency without Samy (NEEDS-SAMY task).
- Wordmark in Arabic stays العيايدة.

## Conventions
- Verify gate for every change: `npm run typecheck && npm run build` (no test suite yet — P1-T6 is gated on a dependency decision).
- Type scale 30/22/17/15/13 + mono 11; motion 180ms ease-out; touch targets ≥44px; empty states always suggest an action.

## Locked decisions
- 2026-07-08: Nord Campus design system is THE design — don't re-theme.
- Phase gates (backend, video strategy, curriculum, hosting) are Samy-only; queue questions as NEEDS-SAMY, never pick for him.
