# Ecole — UX/UI & Feature Improvement Plan
Research-based, August 2026. Sources: Coursera product blog + support docs,
Khan Academy mastery system, Duolingo retention mechanics, Udemy course-page
conversions, LMS feature benchmarks (2026), Algeria edtech market analyses.

## Context that shapes everything
- Algerian learners are mobile-first (~45% smartphone share, higher for teens)
  but bandwidth is uneven: rural coverage is weak, data is paid by the MB.
- BAC/BEM prep is THE killer use case (860k+ candidates, huge wilaya gaps in
  pass rates). Exam-prep is our strongest differentiator vs generic MOOCs.
- Completion rates collapse on long courses industry-wide (8–12% for 10h+
  courses); micro-modules of 5–10 min with active recall hold 25–40%.
- Community/Q&A with accepted answers is rare even in commercial LMSs —
  cheap to build, high retention impact.
- Gamification works when tied to real progress (mastery), fails when it is
  decoration. Our CLAUDE.md bans shallow gamification — respect that.

## A. Learning experience (the core loop)

A1. **Mastery levels instead of raw completion** (Khan Academy model)
    - Per-chapter skill state: Découvert → Entraîné → Maîtrisé, driven by quiz
      performance + spaced review hits, not just "lesson watched".
    - Course page shows mastery % per chapter; dashboard aggregates per subject.
    - Feeds P5-T3 /review queue automatically (wrong questions = not mastered).
A2. **Unit tests + course challenge**
    - Chapter quiz already exists; add an auto-generated Unit Test mixing all
      chapter skills, and an end-of-course Challenge drawing from every chapter
      (exam simulation, reuses exam-prep engine).
A3. **Video player parity with Coursera** (currently bare YouTube embed)
    - Playback speed control, quality selector, subtitles toggle, PiP,
      keyboard shortcuts (space/j/l/f), resume-position already exists.
    - **Transcript panel**: auto-captions via YouTube API where available;
      clicking a transcript line seeks the video.
A4. **Notes 2.0** (Coursera's proven retention driver)
    - Notes already exist with timestamps; add: highlight-from-transcript →
      saved note, screenshot capture button, and a unified "Mes notes" review
      page per course (filterable by chapter, click note → jump to timestamp).
A5. **Micro-learning structure**
    - Encourage 5–10 min lessons in teacher guidelines; show "3 leçons restantes
      cette semaine" style weekly pacing on the dashboard (self-paced, no hard
      deadlines — deadlines hurt our audience).
A6. **Spaced repetition upgrade**
    - /review exists; schedule wrong questions on a Leitner curve (1d/3d/7d/21d)
      instead of simple clear-once-correct, and surface a daily "Révision du
      jour" card.

## B. Motivation & habit (Duolingo lessons, applied within our laws)
B1. **Streaks stay** — we have them; add streak-freeze (1/day, earned by
    completing a review session) to prevent rage-quit after a missed day.
B2. **Weekly goal already exists** — add a Monday "semaine type" plan and a
    Sunday recap email/notification (needs SMTP).
B3. **Badges tied to mastery milestones only** (no XP spam): first unit
    mastered, first course completed, 30-day streak, BAC-blanc ≥ 15/20, etc.
    Trilingual names, tokens-only art.
B4. **Leaderboard: opt-in classroom-level only** (teacher-created groups),
    never global — avoids demotivating the long tail and fits school use.

## C. Community & teacher presence (biggest feature gap vs market)
C1. **Per-lesson Q&A thread** (absorbs old P5-T4, now unblocked by T7-6):
    - question threads scoped under each lesson, enrolled-only;
    - accepted-answer mechanism (asker or teacher picks), endorsed-by-teacher
      badge sorts to top; "unanswered" filter for teachers;
    - moderation = teacher role; plain-text only (low bandwidth + no XSS);
      explicit "load more" pagination, server-rendered.
C2. **Teacher announcements** per course (pinned, trilingual) — replaces the
    need for a chat system entirely.
C3. **Office-hours signal**: reuse T7-7 Meet scheduling to show "prochaine
    séance live" prominently on the course home.

## D. Conversion & pricing UX (Udemy patterns, adapted to subscriptions)
D1. **Course landing page upgrades**: free-preview first lesson (already the
    preview row — make it actually playable pre-enrolment), instructor
    credibility block, outcome bullet list ("À la fin de ce cours…"), rating
    histogram, FAQ accordion, sticky subscribe CTA on scroll.
D2. **Subject subscription pages** (new P8-B surface): price/month per
    subject, what's included (courses, lives, Q&A), comparison table, DZD
    prices front and center, cash-payment instructions beside Chargily button.
D3. **Transparent billing state**: subscription card showing status, renewal
    date, days remaining, grace period warning at ≤3 days, one-click renewal.
D4. **Trial lesson experience**: non-subscribed visitors get chapter 1 free
    across ALL courses of a subject (industry-standard taste-before-buy).

## E. Mobile & low-bandwidth (Algeria reality)
E1. **Data-saver mode**: default YouTube quality capped at 360p, images lazy +
    low-res thumbnails, audio-only lecture mode (YouTube background play via
    embed param) — big differentiator for paid-data students.
E2. **Offline pack v2**: current SW caches PDFs only; extend to lesson list +
    transcript text cached per course, sync-on-reconnect progress (T2-T3
    polish already noted offline resync as pending).
E3. **PWA installability**: manifest + install prompt; homescreen icon makes
    us feel native without app-store cost.
E4. **Aggressive performance budget**: route-level code splitting audit,
    font subsetting for Arabic, target <150KB JS on first load of /courses.

## F. Trust, admin & ops polish
F1. **Parent view revival** (P2-T5 was superseded too eagerly): parents pay;
    give the paying account a read-only child-progress view via invite code —
    Khan Academy proves parent accounts drive K-12 adoption.
F2. **Admin analytics dashboard**: enrolments, active subs, churn, revenue by
    subject, weekly active learners, lesson drop-off points (which lesson
    students quit on) — informs content investment.
F3. **Certificates with verification URLs** (P5-T1 print version exists):
    public verify page `/certificats/<id>` — shareable, LinkedIn-friendly.
F4. **Search upgrade**: fuzzy Arabic search (normalize alef/hamza/taa
    marbuta), search inside Q&A once C1 lands.

## Priority order (impact × effort, post-P8 dependencies noted)
1. A3+A4 video player + notes (core loop, medium effort, high daily impact)
2. E1+E3 data-saver + PWA (Algeria fit, low effort)
3. C1 lesson Q&A w/ accepted answers (retention engine, medium-high effort,
   needs T7-6 UI wave)
4. D1+D2 landing + subscription pages (revenue path, needs P8-A/B)
5. A1+A2 mastery system (deep, high effort, biggest long-term moat)
6. B1–B4 motivation layer (small increments after mastery exists)
7. F1 parent view, F2 analytics, F3 certificates (ops maturity)

## Explicitly NOT doing (and why)
- Deadlines/drip schedules: our audience is exam-prep + self-paced; rigid
  schedules increase refunds and anxiety.
- Global leaderboards/XP: violates repo design laws, hurts the long tail.
- AI tutor now: valuable later (Khanmigo model) but needs content depth first;
  revisit after P8-I when real courses exist. Cheap interim: link lesson
  questions to existing Q&A + review queue.
- Native apps: PWA covers install/offline/push at zero store overhead until
  >500 paying students (industry threshold).
