"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, NotebookPen, Quote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/Button";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { courses } from "@/lib/data";
import { CourseLessonNote, getAllNotes, migrateLegacyProgress } from "@/lib/progress";

function secondsFromTimestamp(timestamp: string): number {
  const parts = timestamp.split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

export default function NotesPage() {
  const { user, isLoading } = useAuth();
  const { locale, t } = useLocale();
  const router = useRouter();
  const [notes, setNotes] = useState<CourseLessonNote[] | null>(null);
  const [courseFilter, setCourseFilter] = useState("all");
  const [chapterFilter, setChapterFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [isLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    migrateLegacyProgress();
    setNotes(getAllNotes());
  }, [user]);

  const noteDetails = useMemo(
    () =>
      (notes ?? []).flatMap((note) => {
        const course = courses.find((item) => item.id === note.courseId);
        if (!course) return [];
        const chapter = course.chapters.find((item) => item.lessons.some((lesson) => lesson.id === note.lessonId));
        const lesson = chapter?.lessons.find((item) => item.id === note.lessonId);
        if (!chapter || !lesson) return [];
        return [{ note, course, chapter, lesson }];
      }),
    [notes],
  );

  const availableCourses = useMemo(
    () => courses.filter((course) => noteDetails.some((item) => item.course.id === course.id)),
    [noteDetails],
  );
  const availableChapters = useMemo(() => {
    const seen = new Set<string>();
    return noteDetails
      .filter((item) => courseFilter === "all" || item.course.id === courseFilter)
      .filter((item) => {
        const key = `${item.course.id}:${item.chapter.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [courseFilter, noteDetails]);
  const visible = noteDetails.filter(
    (item) =>
      (courseFilter === "all" || item.course.id === courseFilter) &&
      (chapterFilter === "all" || `${item.course.id}:${item.chapter.id}` === chapterFilter),
  );

  if (isLoading || !user || notes === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">{t.common.skipToContent}</a>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-input bg-primary-soft text-primary">
            <NotebookPen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-[22px] font-semibold text-ink">{t.notes.title}</h1>
            <p className="mt-1 text-[15px] text-muted">{t.notes.subtitle}</p>
          </div>
        </div>

        {noteDetails.length > 0 && (
          <div className="mt-6 grid gap-3 rounded-card border border-border bg-surface p-4 sm:grid-cols-2">
            <label className="text-[13px] font-medium text-slate">
              {t.notes.courseFilter}
              <select
                value={courseFilter}
                onChange={(event) => {
                  setCourseFilter(event.target.value);
                  setChapterFilter("all");
                }}
                className="mt-1 h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
              >
                <option value="all">{t.notes.allCourses}</option>
                {availableCourses.map((course) => <option key={course.id} value={course.id}>{course.title[locale]}</option>)}
              </select>
            </label>
            <label className="text-[13px] font-medium text-slate">
              {t.notes.chapterFilter}
              <select
                value={chapterFilter}
                onChange={(event) => setChapterFilter(event.target.value)}
                className="mt-1 h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-3 text-[15px] text-ink focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
              >
                <option value="all">{t.notes.allChapters}</option>
                {availableChapters.map(({ course, chapter }) => (
                  <option key={`${course.id}:${chapter.id}`} value={`${course.id}:${chapter.id}`}>{chapter.title[locale]}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {visible.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={notes.length === 0 ? <NotebookPen className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
              title={t.notes.emptyTitle}
              body={t.notes.emptyBody}
              action={<ButtonLink href="/my-courses">{t.notes.emptyAction}</ButtonLink>}
            />
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {visible.map(({ note, course, chapter, lesson }) => (
              <li key={`${course.id}:${lesson.id}:${note.id}`}>
                <Link
                  href={`/course/${course.id}/lesson/${lesson.id}?t=${secondsFromTimestamp(note.timestamp)}`}
                  className="block rounded-card border border-border bg-surface p-5 shadow-card transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
                  aria-label={`${t.notes.openNote}: ${lesson.title[locale]}, ${note.timestamp}`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
                    <span className="font-medium text-primary">{course.title[locale]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{chapter.title[locale]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lesson.title[locale]}</span>
                    <span className="ms-auto rounded-chip bg-primary-soft px-2 py-1 font-mono text-[11px] text-primary-hover dark:text-primary">{note.timestamp}</span>
                  </div>
                  {note.quote && (
                    <blockquote className="mt-3 flex gap-2 border-s-2 border-primary ps-3 text-[13px] italic text-muted">
                      <Quote className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">{t.notes.quoteLabel}: </span>{note.quote}</span>
                    </blockquote>
                  )}
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{note.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
