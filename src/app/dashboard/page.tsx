"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Play, ArrowRight, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { ProgressRing, ProgressSegments } from "@/components/Progress";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber } from "@/lib/i18n";
import { courses, getCourse, getLesson, getAllLessons, subjectColors, subjectIcons, Subject } from "@/lib/data";
import {
  migrateLegacyProgress,
  getEnrolledCourseIds,
  getCompletedLessonIds,
  getLastActivity,
  getLessonsCompletedThisWeek,
  getWeeklyGoal,
  getWeeklyActivity,
  getStreak,
  getPrefs,
  getWrongQuestions,
} from "@/lib/progress";

const DAY_KEYS = ["L", "M", "M", "J", "V", "S", "D"];
const DAY_KEYS_EN = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_KEYS_AR = ["ن", "ث", "ر", "خ", "ج", "س", "ح"];

type DashState = {
  enrolledIds: string[];
  resume: { courseId: string; lessonId: string } | null;
  weekCount: number;
  weekGoal: number;
  weekActivity: number[];
  streak: number;
  subjectPct: Partial<Record<Subject, number>>;
  wrongCount: number;
};

export default function DashboardPage() {
  const { t, locale, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<DashState | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    migrateLegacyProgress();
    if (!getPrefs().onboarded) {
      router.replace("/onboarding");
      return;
    }

    const enrolledIds = getEnrolledCourseIds().filter((id) => getCourse(id));

    // Resume: last completed lesson's successor, else first unfinished lesson.
    let resume: DashState["resume"] = null;
    const last = getLastActivity();
    if (last && getCourse(last.courseId)) {
      const course = getCourse(last.courseId)!;
      const all = getAllLessons(course);
      const idx = all.findIndex((l) => l.id === last.lessonId);
      const nextLesson = all[idx + 1] ?? all[idx];
      if (nextLesson) resume = { courseId: course.id, lessonId: nextLesson.id };
    } else if (enrolledIds.length > 0) {
      const course = getCourse(enrolledIds[0])!;
      const done = getCompletedLessonIds(course.id);
      const nextLesson = getAllLessons(course).find((l) => !done.has(l.id)) ?? getAllLessons(course)[0];
      if (nextLesson) resume = { courseId: course.id, lessonId: nextLesson.id };
    }

    const subjectPct: DashState["subjectPct"] = {};
    for (const subject of ["math", "physics", "biology"] as Subject[]) {
      const enrolled = enrolledIds.map((id) => getCourse(id)!).filter((c) => c.subject === subject);
      if (enrolled.length === 0) continue;
      const total = enrolled.reduce((sum, c) => sum + getAllLessons(c).length, 0);
      const done = enrolled.reduce((sum, c) => sum + getCompletedLessonIds(c.id).size, 0);
      subjectPct[subject] = total ? Math.round((done / total) * 100) : 0;
    }

    setState({
      enrolledIds,
      resume,
      weekCount: getLessonsCompletedThisWeek(),
      weekGoal: getWeeklyGoal(),
      weekActivity: getWeeklyActivity(),
      streak: getStreak(),
      subjectPct,
      wrongCount: getWrongQuestions().length,
    });
  }, [user, router]);

  if (isLoading || !user || !state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-label={t.common.loading} />
      </div>
    );
  }

  const resumeData = state.resume ? getLesson(state.resume.courseId, state.resume.lessonId) : null;
  const enrolledCourses = state.enrolledIds.map((id) => getCourse(id)!);
  const recommendations = courses
    .filter((c) => !state.enrolledIds.includes(c.id) && getPrefs().subjects.includes(c.subject))
    .slice(0, 3);
  const dayLabels = locale === "ar" ? DAY_KEYS_AR : locale === "en" ? DAY_KEYS_EN : DAY_KEYS;
  const maxDay = Math.max(1, ...state.weekActivity);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting + streak chip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[22px] font-semibold text-ink">
            {t.dashboard.greeting} {user.name.split(" ")[0]} 👋
          </h1>
          <span className="flex items-center gap-1.5 rounded-pill bg-warning-soft px-3 py-1.5 text-[13px] font-semibold text-warning">
            <Flame className="h-4 w-4" aria-hidden="true" />
            {formatNumber(locale, state.streak)} {t.dashboard.streakDays}
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Reprendre — whole card is the tap target */}
            {resumeData ? (
              <Link
                href={`/course/${state.resume!.courseId}/lesson/${state.resume!.lessonId}`}
                className="group block rounded-card bg-ink p-6 text-bg shadow-card transition-[box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:shadow-lift active:scale-[0.98] dark:bg-surface dark:text-ink"
              >
                <p className="text-[13px] font-medium text-faint">{t.dashboard.resumeSubtitle}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-primary text-white shadow-primary transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)] group-hover:scale-105">
                    <Play className={`h-5 w-5 ${dir === "rtl" ? "-scale-x-100" : ""}`} fill="currentColor" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-[17px] font-semibold">{resumeData.lesson.title[locale]}</h2>
                    <p className="truncate text-[13px] text-faint">{resumeData.course.title[locale]}</p>
                  </div>
                  <span className="hidden items-center gap-1 text-[13px] font-semibold text-primary-soft sm:flex dark:text-primary">
                    {t.dashboard.resume}
                    <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ) : (
              <EmptyState
                icon={<Play className="h-6 w-6" />}
                title={t.dashboard.noActivity}
                body={t.dashboard.startACourse}
                action={<ButtonLink href="/courses">{t.dashboard.exploreCatalog}</ButtonLink>}
              />
            )}

            {/* Weekly goal segments */}
            <div className="rounded-card border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-semibold text-ink">{t.dashboard.weeklyGoal}</h2>
                <span className="font-mono text-[13px] font-medium text-muted">
                  {formatNumber(locale, state.weekCount)} / {formatNumber(locale, state.weekGoal)}{" "}
                  {t.dashboard.lessonsThisWeek}
                </span>
              </div>
              <ProgressSegments
                total={state.weekGoal}
                done={Math.min(state.weekCount, state.weekGoal)}
                className="mt-4"
                label={t.dashboard.weeklyGoal}
              />
            </div>

            {/* Per-subject rings */}
            {Object.keys(state.subjectPct).length > 0 && (
              <div className="rounded-card border border-border bg-surface p-6">
                <h2 className="text-[17px] font-semibold text-ink">{t.dashboard.subjectProgress}</h2>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {(Object.entries(state.subjectPct) as [Subject, number][]).map(([subject, pct]) => (
                    <Link
                      key={subject}
                      href="/my-courses"
                      className="group flex flex-col items-center gap-2 rounded-card p-3 transition-colors duration-[var(--duration-base)] hover:bg-bg"
                    >
                      <ProgressRing value={pct} colorClassName={subjectColors[subject].stroke} label={t.subjects[subject]}>
                        <span className="text-lg" aria-hidden="true">
                          {subjectIcons[subject]}
                        </span>
                      </ProgressRing>
                      <span className="text-[13px] font-medium text-slate">{t.subjects[subject]}</span>
                      <span className="font-mono text-[11px] font-medium text-muted">{formatNumber(locale, pct)}%</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-[17px] font-semibold text-ink">{t.dashboard.recommended}</h2>
                  <Link
                    href="/courses"
                    className="rounded-pill px-3 py-1.5 text-[13px] font-medium text-primary transition-colors hover:bg-primary-soft"
                  >
                    {t.common.seeAll}
                  </Link>
                </div>
                <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {recommendations.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side column (desktop) */}
          <div className="space-y-6">
            {/* Weekly activity bar chart */}
            <div className="rounded-card border border-border bg-surface p-6">
              <h2 className="text-[17px] font-semibold text-ink">{t.dashboard.weeklyActivity}</h2>
              <div className="mt-5 flex h-28 items-end gap-2" aria-hidden="true">
                {state.weekActivity.map((count, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-[88px] w-full items-end">
                      <div
                        className={`w-full origin-bottom rounded-chip transition-[transform,background-color] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] ${count > 0 ? "bg-primary" : "bg-mist"}`}
                        style={{ height: "88px", transform: `scaleY(${Math.max(8, (count / maxDay) * 88) / 88})` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-faint">{dayLabels[i]}</span>
                  </div>
                ))}
              </div>
              <p className="sr-only">
                {formatNumber(locale, state.weekCount)} {t.dashboard.lessonsThisWeek}
              </p>
            </div>

            {/* Streak card */}
            <div className="rounded-card border border-border bg-surface p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-warning-soft text-warning">
                  <Flame className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[22px] font-semibold leading-none text-ink">
                    {formatNumber(locale, state.streak)}
                  </p>
                  <p className="mt-1 text-[13px] text-muted">{t.dashboard.streakTitle}</p>
                </div>
              </div>
              <p className="mt-4 text-[13px] text-muted">{t.dashboard.streakSubtitle}</p>
            </div>

            {/* Review queue */}
            {state.wrongCount > 0 && (
              <Link
                href="/review"
                className="group block rounded-card border border-border bg-surface p-6 transition-[box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:shadow-lift active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-primary-soft text-primary-hover dark:text-primary">
                    <RefreshCw className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[17px] font-semibold text-ink">{t.review.dashboardCardTitle}</p>
                    <p className="mt-1 text-[13px] text-muted">
                      {formatNumber(locale, state.wrongCount)} {t.review.dashboardCardBody}
                    </p>
                  </div>
                  <ArrowRight className={`h-4 w-4 shrink-0 text-muted ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
                </div>
              </Link>
            )}

            {/* Enrolled shortcuts */}
            {enrolledCourses.length > 0 && (
              <div className="rounded-card border border-border bg-surface p-6">
                <h2 className="text-[17px] font-semibold text-ink">{t.nav.myCourses}</h2>
                <ul className="mt-4 space-y-1">
                  {enrolledCourses.slice(0, 4).map((course) => {
                    const total = getAllLessons(course).length;
                    const done = getCompletedLessonIds(course.id).size;
                    return (
                      <li key={course.id}>
                        <Link
                          href={`/course/${course.id}`}
                          className="flex min-h-11 items-center gap-3 rounded-input px-2 py-2 transition-colors duration-[var(--duration-base)] hover:bg-bg"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-chip text-base ${subjectColors[course.subject].bg} ${subjectColors[course.subject].text}`}
                            aria-hidden="true"
                          >
                            {subjectIcons[course.subject]}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                            {course.title[locale]}
                          </span>
                          <span className="font-mono text-[11px] text-muted">
                            {formatNumber(locale, done)}/{formatNumber(locale, total)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
