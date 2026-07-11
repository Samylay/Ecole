"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenCheck, ClipboardCheck, GraduationCap, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProgressRing, ProgressBar } from "@/components/Progress";
import { EmptyState } from "@/components/EmptyState";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber } from "@/lib/i18n";
import { getCourse, getAllLessons, subjectColors, subjectIcons, Subject } from "@/lib/data";
import {
  migrateLegacyProgress,
  getEnrolledCourseIds,
  getCompletedLessonIds,
  getLessonsCompletedThisWeek,
  getWeeklyGoal,
  getActivityFeed,
  ActivityEvent,
} from "@/lib/progress";

type ParentState = {
  weekCount: number;
  weekGoal: number;
  subjectPct: [Subject, number][];
  feed: ActivityEvent[];
  timeSpentMin: number;
};

export default function ParentPage() {
  const { t, locale } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<ParentState | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    migrateLegacyProgress();
    const enrolledIds = getEnrolledCourseIds().filter((id) => getCourse(id));
    const subjectPct: [Subject, number][] = [];
    for (const subject of ["math", "physics", "biology"] as Subject[]) {
      const enrolled = enrolledIds.map((id) => getCourse(id)!).filter((c) => c.subject === subject);
      if (!enrolled.length) continue;
      const total = enrolled.reduce((sum, c) => sum + getAllLessons(c).length, 0);
      const done = enrolled.reduce((sum, c) => sum + getCompletedLessonIds(c.id).size, 0);
      subjectPct.push([subject, total ? Math.round((done / total) * 100) : 0]);
    }
    const weekCount = getLessonsCompletedThisWeek();
    setState({
      weekCount,
      weekGoal: getWeeklyGoal(),
      subjectPct,
      feed: getActivityFeed(8),
      timeSpentMin: weekCount * 18, // mock: ~18 min per lesson
    });
  }, [user]);

  if (isLoading || !user || !state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const goalPct = state.weekGoal ? Math.min(100, Math.round((state.weekCount / state.weekGoal) * 100)) : 0;
  const childName = user.name.split(" ")[0];

  const describeEvent = (event: ActivityEvent): string => {
    const course = getCourse(event.courseId);
    const courseTitle = course ? course.title[locale] : event.courseId;
    if (event.type === "lesson") return `${childName} ${t.parent.completedLesson} — ${courseTitle}`;
    if (event.type === "quiz") return `${childName} ${t.parent.passedQuiz} (${event.detail}) — ${courseTitle}`;
    return `${childName} ${t.parent.enrolledIn} « ${courseTitle} »`;
  };

  const eventIcon = (event: ActivityEvent) =>
    event.type === "lesson" ? (
      <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
    ) : event.type === "quiz" ? (
      <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
    ) : (
      <GraduationCap className="h-4 w-4" aria-hidden="true" />
    );

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[22px] font-semibold text-ink">{t.parent.title}</h1>
        <p className="mt-1 text-[15px] text-muted">{t.parent.subtitle}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Weekly ring */}
          <div className="flex items-center gap-6 rounded-card border border-border bg-surface p-6">
            <ProgressRing value={goalPct} size={96} strokeWidth={8} label={t.parent.weeklyActivity}>
              <span className="font-mono text-[17px] font-semibold text-ink">
                {formatNumber(locale, state.weekCount)}/{formatNumber(locale, state.weekGoal)}
              </span>
            </ProgressRing>
            <div>
              <h2 className="text-[17px] font-semibold text-ink">{t.parent.weeklyActivity}</h2>
              <p className="mt-1 text-[13px] text-muted">
                {formatNumber(locale, state.weekCount)} {t.parent.lessonsCompleted}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                <Clock className="h-4 w-4" aria-hidden="true" />
                ≈ {formatNumber(locale, state.timeSpentMin)} {t.common.min} {t.parent.timeSpent}
              </p>
            </div>
          </div>

          {/* Gentle summary */}
          <div className="rounded-card bg-primary-soft/60 p-6">
            <h2 className="text-[17px] font-semibold text-ink">{t.parent.summaryTitle}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate">
              {state.weekCount > 0
                ? `${childName} — ${formatNumber(locale, state.weekCount)} ${t.parent.lessonsCompleted} · ${t.parent.weeklyActivity.toLowerCase()}`
                : t.parent.noActivityYet}
            </p>
          </div>
        </div>

        {/* Per-subject bars */}
        {state.subjectPct.length > 0 && (
          <section className="mt-6 rounded-card border border-border bg-surface p-6">
            <h2 className="text-[17px] font-semibold text-ink">{t.parent.bySubject}</h2>
            <div className="mt-4 space-y-4">
              {state.subjectPct.map(([subject, pct]) => (
                <div key={subject}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[15px] font-medium text-slate">
                      <span aria-hidden="true">{subjectIcons[subject]}</span>
                      {t.subjects[subject]}
                    </span>
                    <span className="font-mono text-[11px] text-muted">{formatNumber(locale, pct)}%</span>
                  </div>
                  <ProgressBar value={pct} barClassName={subjectColors[subject].accent} label={t.subjects[subject]} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activity feed */}
        <section className="mt-6">
          <h2 className="text-[17px] font-semibold text-ink">{t.parent.recentActivity}</h2>
          {state.feed.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={<BookOpenCheck className="h-6 w-6" />}
                title={t.parent.noActivityYet}
                body={t.parent.subtitle}
              />
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {state.feed.map((event, i) => (
                <li key={i} className="flex items-center gap-3 rounded-card border border-border bg-surface px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-primary-soft text-primary-hover dark:text-primary">
                    {eventIcon(event)}
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] text-slate">{describeEvent(event)}</span>
                  <span className="shrink-0 font-mono text-[11px] text-faint">
                    {new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale, { day: "numeric", month: "short" }).format(
                      new Date(event.date)
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
