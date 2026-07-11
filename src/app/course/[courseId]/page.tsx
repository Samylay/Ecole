"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  Check,
  ChevronDown,
  Star,
  BookOpen,
  Clock,
  Users,
  FileText,
  Lock,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { Button, ButtonLink } from "@/components/Button";
import { ProgressBar } from "@/components/Progress";
import { useToast } from "@/components/Toast";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber } from "@/lib/i18n";
import {
  getCourse,
  getCourseExtras,
  getAllLessons,
  chapterHasQuiz,
  subjectColors,
  subjectIcons,
  teacherSlug,
} from "@/lib/data";
import { isEnrolled, enroll, getCompletedLessonIds, migrateLegacyProgress } from "@/lib/progress";

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { locale, t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [enrolled, setEnrolled] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const course = getCourse(courseId);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    migrateLegacyProgress();
    setEnrolled(isEnrolled(courseId));
    setCompletedIds(getCompletedLessonIds(courseId));
    setOpenChapter(getCourse(courseId)?.chapters[0]?.id ?? null);
  }, [courseId]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <div className="mx-auto max-w-7xl flex-1 px-4 py-20 text-center">
          <h1 className="text-[22px] font-semibold text-ink">{t.states.notFoundTitle}</h1>
          <ButtonLink href="/courses" className="mt-6">
            {t.states.notFoundCta}
          </ButtonLink>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = subjectColors[course.subject];
  const extras = getCourseExtras(course.id);
  const prerequisite = extras.prerequisiteId ? getCourse(extras.prerequisiteId) : null;
  const allLessons = getAllLessons(course);
  const firstLesson = allLessons[0];
  const progress = allLessons.length ? Math.round((completedIds.size / allLessons.length) * 100) : 0;
  const slug = teacherSlug(course.instructor.name);

  const handleEnroll = () => {
    enroll(courseId);
    setEnrolled(true);
    showToast(t.course.enrolledToast);
  };

  // Ratings histogram derived from the average (mock data has no per-star counts).
  const histogram = [5, 4, 3, 2, 1].map((stars) => {
    const dist = Math.max(0, 1 - Math.abs(course.rating - stars) / 1.6);
    return { stars, pct: Math.round(dist * 100) };
  });
  const histTotal = histogram.reduce((s, h) => s + h.pct, 0) || 1;

  const cta = enrolled ? (
    <ButtonLink href={`/course/${course.id}/lesson/${firstLesson?.id}`} className="w-full">
      {completedIds.size > 0 ? t.course.continueLearning : t.course.startFirstLesson}
    </ButtonLink>
  ) : (
    <Button onClick={handleEnroll} className="w-full">
      {t.course.enrollFree}
    </Button>
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg pb-24 lg:pb-0">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="page-enter flex-1">
        {/* Subject-tinted hero */}
        <section className={colors.bg}>
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={`bg-surface ${colors.text}`}>
                    <span aria-hidden="true">{subjectIcons[course.subject]}</span> {t.subjects[course.subject]}
                  </Badge>
                  <Badge className="bg-surface text-slate">{t.levels[course.level]}</Badge>
                  <Badge className="bg-success-soft text-success">{t.course.free}</Badge>
                </div>
                <h1 className="mt-4 text-[30px] font-semibold leading-tight text-ink">{course.title[locale]}</h1>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate">{course.description[locale]}</p>

                {/* Instructor → public teacher page */}
                <Link
                  href={`/teacher/${slug}`}
                  className="group mt-5 inline-flex items-center gap-3 rounded-pill bg-surface/70 py-1.5 pe-4 ps-1.5 transition-colors duration-[var(--duration-base)] hover:bg-surface"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-primary-soft text-[15px] font-semibold text-primary-hover dark:text-primary">
                    {course.instructor.name.replace(/^Pr\.\s*/, "")[0]}
                  </span>
                  <span className="text-[13px] font-medium text-ink group-hover:text-primary">
                    {course.instructor.name}
                  </span>
                  <ArrowUpRight className={`h-4 w-4 text-muted ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
                </Link>

                {/* Stats */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {formatNumber(locale, course.totalLessons)} {t.course.lessons}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {formatNumber(locale, course.totalHours)} {t.course.hours}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {formatNumber(locale, course.studentCount)} {t.course.students}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                    {formatNumber(locale, course.rating)}
                  </span>
                </div>

                {/* Prerequisite chip */}
                {prerequisite && (
                  <Link
                    href={`/course/${prerequisite.id}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-[13px] font-medium text-slate transition-colors duration-[var(--duration-base)] hover:border-primary hover:text-primary"
                  >
                    <span className="text-muted">{t.course.prerequisite} :</span>
                    {prerequisite.title[locale]}
                    <ArrowUpRight className={`h-3.5 w-3.5 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
                  </Link>
                )}
              </div>

              {/* Preview video card + enroll CTA (desktop) */}
              <div className="lg:-mb-20">
                <div className="overflow-hidden rounded-card border border-border bg-surface shadow-lift">
                  <div className={`relative flex aspect-video items-center justify-center ${colors.bg}`}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-surface/90 shadow-card">
                      <Play className={`h-6 w-6 ${colors.text} ${dir === "rtl" ? "-scale-x-100" : ""}`} fill="currentColor" aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-3 start-3 rounded-chip bg-ink/70 px-2 py-0.5 font-mono text-[11px] text-white">
                      {t.course.previewVideo}
                    </span>
                  </div>
                  <div className="p-5">
                    {cta}
                    {enrolled && completedIds.size > 0 && (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-[13px]">
                          <span className="text-muted">{t.course.progress}</span>
                          <span className="font-mono font-medium text-primary">{formatNumber(locale, progress)}%</span>
                        </div>
                        <ProgressBar value={progress} label={t.course.progress} />
                      </div>
                    )}
                    <dl className="mt-4 space-y-2 text-[13px]">
                      <div className="flex justify-between">
                        <dt className="text-muted">{t.course.level}</dt>
                        <dd className="font-medium text-ink">{t.levels[course.level]}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">{t.course.lessons}</dt>
                        <dd className="font-mono font-medium text-ink">{formatNumber(locale, course.totalLessons)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">{t.course.hours}</dt>
                        <dd className="font-mono font-medium text-ink">{formatNumber(locale, course.totalHours)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-10">
              {/* Ce que tu vas apprendre */}
              <section aria-labelledby="outcomes-heading">
                <h2 id="outcomes-heading" className="text-[22px] font-semibold text-ink">
                  {t.course.whatYouWillLearn}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {extras.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-card border border-border bg-surface p-4">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-success-soft text-success">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-[15px] text-slate">{outcome[locale]}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Chapter accordion */}
              <section aria-labelledby="curriculum-heading">
                <h2 id="curriculum-heading" className="text-[22px] font-semibold text-ink">
                  {t.course.curriculum}
                </h2>
                <div className="mt-4 space-y-3">
                  {course.chapters.map((chapter, chIdx) => {
                    const open = openChapter === chapter.id;
                    const hasQuiz = chapterHasQuiz(course.id, chapter.id);
                    return (
                      <div key={chapter.id} className="overflow-hidden rounded-card border border-border bg-surface">
                        <button
                          onClick={() => setOpenChapter(open ? null : chapter.id)}
                          aria-expanded={open}
                          className="flex min-h-14 w-full items-center gap-4 px-5 py-4 text-start transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-bg active:scale-[0.98]"
                        >
                          <span className="font-mono text-[13px] font-medium text-muted">
                            {formatNumber(locale, chIdx + 1).padStart(2, formatNumber(locale, 0))}
                          </span>
                          <span className="flex-1 text-[15px] font-semibold text-ink">{chapter.title[locale]}</span>
                          <span className="font-mono text-[11px] text-faint">
                            {formatNumber(locale, chapter.lessons.length)} {t.course.lessons}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-muted transition-transform duration-[var(--duration-base)] ${open ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                        {open && (
                          <div className="border-t border-border-soft">
                            {chapter.lessons.map((lesson, lIdx) => {
                              const done = completedIds.has(lesson.id);
                              const isPreview = chIdx === 0 && lIdx === 0;
                              const accessible = enrolled || isPreview;
                              return (
                                <Link
                                  key={lesson.id}
                                  href={accessible ? `/course/${course.id}/lesson/${lesson.id}` : "#"}
                                  onClick={(e) => {
                                    if (!accessible) e.preventDefault();
                                  }}
                                  className={`flex min-h-12 items-center gap-3 px-5 py-3 transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] ${
                                    accessible ? "hover:bg-bg active:scale-[0.98]" : "cursor-default opacity-60"
                                  }`}
                                >
                                  <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-[13px] font-medium ${
                                      done ? "bg-success-soft text-success" : "bg-primary-soft text-primary-hover"
                                    }`}
                                  >
                                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : formatNumber(locale, lIdx + 1)}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className={`block truncate text-[15px] font-medium ${done ? "text-muted" : "text-ink"}`}>
                                      {lesson.title[locale]}
                                    </span>
                                  </span>
                                  {isPreview && !enrolled && (
                                    <Badge className="bg-primary-soft text-primary-hover dark:text-primary">{t.course.preview}</Badge>
                                  )}
                                  {lesson.documents && lesson.documents.length > 0 && (
                                    <FileText className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                                  )}
                                  <span className="shrink-0 font-mono text-[11px] text-faint">{lesson.duration}</span>
                                  {!accessible && <Lock className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />}
                                </Link>
                              );
                            })}
                            {/* Quiz row in warning tint */}
                            {hasQuiz && (
                              <Link
                                href={enrolled ? `/course/${course.id}/quiz/${chapter.id}` : "#"}
                                onClick={(e) => {
                                  if (!enrolled) e.preventDefault();
                                }}
                                className={`flex min-h-12 items-center gap-3 bg-warning-soft/50 px-5 py-3 transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] ${
                                  enrolled ? "hover:bg-warning-soft active:scale-[0.98]" : "cursor-default opacity-60"
                                }`}
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-warning-soft text-warning">
                                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span className="flex-1 text-[15px] font-medium text-ink">
                                  {t.course.quiz} — {chapter.title[locale]}
                                </span>
                                {!enrolled && <Lock className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Ratings + reviews */}
              {extras.reviews.length > 0 && (
                <section aria-labelledby="reviews-heading">
                  <h2 id="reviews-heading" className="text-[22px] font-semibold text-ink">
                    {t.course.reviews}
                  </h2>
                  <div className="mt-4 grid gap-6 md:grid-cols-[220px_1fr]">
                    {/* Histogram */}
                    <div className="rounded-card border border-border bg-surface p-5">
                      <p className="font-mono text-[30px] font-semibold text-ink">{formatNumber(locale, course.rating)}</p>
                      <div className="mt-1 flex" aria-label={`${course.rating} / 5`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${s <= Math.round(course.rating) ? "fill-warning text-warning" : "text-mist"}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-[13px] text-muted">
                        {formatNumber(locale, course.studentCount)} {t.course.ratings}
                      </p>
                      <div className="mt-4 space-y-1.5">
                        {histogram.map((h) => (
                          <div key={h.stars} className="flex items-center gap-2">
                            <span className="w-3 font-mono text-[11px] text-muted">{formatNumber(locale, h.stars)}</span>
                            <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-mist">
                              <div
                                className="h-full rounded-pill bg-warning"
                                style={{ width: `${Math.round((h.pct / histTotal) * 100) * 2.2}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Review cards */}
                    <div className="space-y-4">
                      {extras.reviews.map((review, i) => (
                        <div key={i} className="rounded-card border border-border bg-surface p-5">
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-semibold text-ink">{review.author}</span>
                            <span className="flex" aria-label={`${review.rating} / 5`}>
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-warning text-warning" : "text-mist"}`}
                                  aria-hidden="true"
                                />
                              ))}
                            </span>
                          </div>
                          <p className="mt-2 text-[15px] leading-relaxed text-slate">{review.text[locale]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
            <div aria-hidden="true" className="hidden lg:block" />
          </div>
        </div>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface p-4 lg:hidden">{cta}</div>

      <Footer />
    </div>
  );
}
