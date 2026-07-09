"use client";

import { use, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Play,
  ClipboardCheck,
  List,
  X,
  Trash2,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/Button";
import { ProgressBar } from "@/components/Progress";
import { formatNumber } from "@/lib/i18n";
import { getLesson, getAllLessons, chapterHasQuiz, subjectColors } from "@/lib/data";
import {
  isLessonCompleted,
  toggleLessonCompleted,
  getCompletedLessonIds,
  getNotes,
  addNote,
  deleteNote,
  migrateLegacyProgress,
  recordActiveDay,
  isDocumentDownloaded,
  recordDocumentDownload,
  getResumePosition,
  setResumePosition,
  LessonNote,
} from "@/lib/progress";

type Tab = "about" | "notes" | "documents";

// Real player position via the YouTube IFrame API (the iframe already
// requests enablejsapi=1 — see withPlayerParams below).
interface YTPlayerInstance {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy?: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: { events?: { onReady?: (event: { target: YTPlayerInstance }) => void } }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return ytApiPromise;
}

function withPlayerParams(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("enablejsapi", "1");
    if (typeof window !== "undefined") u.searchParams.set("origin", window.location.origin);
    return u.toString();
  } catch {
    return url;
  }
}

const VIEWED_THRESHOLD = 0.8;

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const { locale, t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [completed, setCompleted] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("about");
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [noteText, setNoteText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [downloadTick, setDownloadTick] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const activeRowRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    migrateLegacyProgress();
    setCompleted(isLessonCompleted(courseId, lessonId));
    setCompletedIds(getCompletedLessonIds(courseId));
    setNotes(getNotes(courseId, lessonId));
    setTab("about");
    setCountdown(null);
    setDrawerOpen(false);
    if (user) recordActiveDay();
  }, [courseId, lessonId, user]);

  // Active sidebar row auto-scrolls into view.
  useEffect(() => {
    activeRowRef.current?.scrollIntoView({ block: "nearest" });
  }, [lessonId]);

  // Wire the YouTube IFrame API to the player: resume at the last saved
  // position, poll real playback position (not a wall-clock timer) to persist
  // it and to auto-mark the lesson viewed once ≥80% watched.
  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;
    let markedViewed = false;
    const elementId = `yt-player-${courseId}-${lessonId}`;

    loadYouTubeIframeAPI().then(() => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player(elementId, {
        events: {
          onReady: (event) => {
            if (cancelled) return;
            const resumeAt = getResumePosition(courseId, lessonId);
            if (resumeAt > 0) event.target.seekTo(resumeAt, true);
            interval = setInterval(() => {
              const player = playerRef.current;
              if (!player) return;
              const current = player.getCurrentTime();
              const duration = player.getDuration();
              setResumePosition(courseId, lessonId, Math.floor(current));
              if (!markedViewed && duration > 0 && current / duration >= VIEWED_THRESHOLD) {
                markedViewed = true;
                if (!isLessonCompleted(courseId, lessonId)) {
                  toggleLessonCompleted(courseId, lessonId, true);
                  setCompleted(true);
                  setCompletedIds(getCompletedLessonIds(courseId));
                }
              }
            }, 2000);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [courseId, lessonId]);

  const result = getLesson(courseId, lessonId);
  const allLessons = result ? getAllLessons(result.course) : [];
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const goNext = useCallback(() => {
    if (nextLesson) router.push(`/course/${courseId}/lesson/${nextLesson.id}`);
  }, [nextLesson, courseId, router]);

  // Auto-advance countdown after marking complete (cancellable).
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      goNext();
      return;
    }
    const id = setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 1000);
    return () => clearTimeout(id);
  }, [countdown, goNext]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
        <h1 className="text-[22px] font-semibold text-ink">{t.states.notFoundTitle}</h1>
        <Link href="/courses" className="mt-4 font-medium text-primary hover:underline">
          {t.states.notFoundCta}
        </Link>
      </div>
    );
  }

  const { lesson, course } = result;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const progress = allLessons.length ? Math.round((completedIds.size / allLessons.length) * 100) : 0;
  const colors = subjectColors[course.subject];

  const handleMarkComplete = () => {
    const next = !completed;
    toggleLessonCompleted(courseId, lessonId, next);
    setCompleted(next);
    setCompletedIds(getCompletedLessonIds(courseId));
    if (next) {
      showToast(t.lesson.completedToast);
      if (nextLesson) setCountdown(5);
    } else {
      setCountdown(null);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const seconds = Math.floor(playerRef.current?.getCurrentTime() ?? 0);
    const ts = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    addNote(courseId, lessonId, ts, noteText.trim());
    setNotes(getNotes(courseId, lessonId));
    setNoteText("");
  };

  const PrevChevron = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextChevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  const sidebar = (
    <nav aria-label={t.lesson.chaptersDrawer} className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <Link
          href={`/course/${courseId}`}
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
          {t.lesson.backToCourse}
        </Link>
        <h2 className="mt-2 truncate text-[15px] font-semibold text-ink">{course.title[locale]}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {course.chapters.map((chapter) => (
          <div key={chapter.id}>
            <p className="px-4 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-faint">
              {chapter.title[locale]}
            </p>
            {chapter.lessons.map((l) => {
              const isDone = completedIds.has(l.id);
              const isCurrent = l.id === lessonId;
              return (
                <Link
                  key={l.id}
                  ref={isCurrent ? activeRowRef : undefined}
                  href={`/course/${courseId}/lesson/${l.id}`}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex min-h-12 items-center gap-3 border-s-2 px-4 py-2 text-[13px] transition-colors duration-[180ms] ${
                    isCurrent
                      ? "border-primary bg-primary-soft/50 font-semibold text-primary-hover dark:text-primary"
                      : "border-transparent text-slate hover:bg-bg"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  ) : (
                    <Play className={`h-4 w-4 shrink-0 text-faint ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
                  )}
                  <span className="min-w-0 flex-1 truncate">{l.title[locale]}</span>
                  <span className="shrink-0 font-mono text-[11px] text-faint">{l.duration}</span>
                </Link>
              );
            })}
            {chapterHasQuiz(courseId, chapter.id) && (
              <Link
                href={`/course/${courseId}/quiz/${chapter.id}`}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-12 items-center gap-3 border-s-2 border-transparent bg-warning-soft/40 px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-[180ms] hover:bg-warning-soft"
              >
                <ClipboardCheck className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                <span className="flex-1">{t.course.quiz}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top bar with course progress */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
          <Link
            href={`/course/${courseId}`}
            aria-label={t.lesson.backToCourse}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-slate transition-colors hover:bg-mist"
          >
            <ArrowLeft className={`h-5 w-5 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-ink">{course.title[locale]}</p>
            <div className="mt-1 flex items-center gap-2">
              <ProgressBar value={progress} className="max-w-48" label={t.lesson.courseProgress} />
              <span className="font-mono text-[11px] text-muted">{formatNumber(locale, progress)}%</span>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex min-h-11 items-center gap-2 rounded-pill px-3 text-[13px] font-medium text-slate transition-colors hover:bg-mist lg:hidden"
            aria-expanded={drawerOpen}
          >
            <List className="h-5 w-5" aria-hidden="true" />
            {t.lesson.chaptersDrawer}
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1">
        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          {/* Video */}
          <div className="overflow-hidden rounded-card bg-ink shadow-card">
            <div className="relative aspect-video">
              <iframe
                id={`yt-player-${courseId}-${lessonId}`}
                src={withPlayerParams(lesson.videoUrl)}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title[locale]}
              />
            </div>
          </div>

          {/* Title + mark complete */}
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-semibold text-ink">{lesson.title[locale]}</h1>
              <p className="mt-1 font-mono text-[11px] text-muted">{lesson.duration}</p>
            </div>
            <Button variant={completed ? "secondary" : "primary"} onClick={handleMarkComplete}>
              <Check className="h-4 w-4" aria-hidden="true" />
              {completed ? t.lesson.markedComplete : t.lesson.markComplete}
            </Button>
          </div>

          {/* Auto-advance banner */}
          {countdown !== null && nextLesson && (
            <div
              role="status"
              className="mt-4 flex items-center justify-between rounded-card bg-primary-soft px-5 py-3"
            >
              <span className="text-[13px] font-medium text-primary-hover dark:text-primary">
                {t.lesson.autoAdvance.replace("5", formatNumber(locale, countdown))}
              </span>
              <button
                onClick={() => setCountdown(null)}
                className="rounded-pill px-3 py-1.5 text-[13px] font-semibold text-primary-hover underline underline-offset-2 dark:text-primary"
              >
                {t.lesson.stayHere}
              </button>
            </div>
          )}

          {/* Tabs */}
          <div role="tablist" aria-label={t.lesson.about} className="mt-6 flex gap-1 border-b border-border">
            {(
              [
                ["about", t.lesson.about],
                ["notes", t.lesson.myNotes],
                ["documents", t.lesson.resources],
              ] as [Tab, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={`-mb-px min-h-11 border-b-2 px-4 text-[15px] font-medium transition-colors duration-[180ms] ${
                  tab === value ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-5">
            {tab === "about" && <p className="max-w-2xl text-[15px] leading-relaxed text-slate">{lesson.description[locale]}</p>}

            {tab === "notes" && (
              <div className="max-w-2xl">
                <form onSubmit={handleAddNote} className="flex gap-3">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder={t.lesson.notePlaceholder}
                    aria-label={t.lesson.addNote}
                    className="h-12 flex-1 rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink placeholder:text-faint focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
                  />
                  <Button type="submit" disabled={!noteText.trim()}>
                    {t.lesson.addNote}
                  </Button>
                </form>
                {notes.length === 0 ? (
                  <p className="mt-6 text-[15px] text-muted">{t.lesson.noNotes}</p>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {notes.map((note) => (
                      <li key={note.id} className="flex items-start gap-3 rounded-card border border-border bg-surface p-4">
                        <span className="rounded-chip bg-primary-soft px-2 py-0.5 font-mono text-[11px] font-medium text-primary-hover dark:text-primary">
                          {note.timestamp}
                        </span>
                        <p className="min-w-0 flex-1 text-[15px] text-slate">{note.text}</p>
                        <button
                          onClick={() => {
                            deleteNote(courseId, lessonId, note.id);
                            setNotes(getNotes(courseId, lessonId));
                          }}
                          aria-label={`${t.common.close} — ${note.timestamp}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-faint transition-colors hover:bg-error-soft hover:text-error"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "documents" && (
              <div className="max-w-2xl">
                {!lesson.documents || lesson.documents.length === 0 ? (
                  <p className="text-[15px] text-muted">{t.lesson.noDocuments}</p>
                ) : (
                  <ul className="space-y-3">
                    {lesson.documents.map((doc, i) => {
                      void downloadTick;
                      const downloaded = isDocumentDownloaded(courseId, lessonId, doc.name);
                      return (
                        <li key={i} className="flex items-center gap-3 rounded-card border border-border bg-surface p-4">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-input ${colors.bg} ${colors.text}`}>
                            <FileText className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-ink">{doc.name}</span>
                          {downloaded && (
                            <span
                              className="flex items-center gap-1 text-[13px] text-success"
                              title={t.course.downloaded}
                            >
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          )}
                          <a
                            href={doc.url}
                            download={doc.name}
                            onClick={() => {
                              recordDocumentDownload(courseId, lessonId, doc.name);
                              setDownloadTick((n) => n + 1);
                            }}
                            className="flex min-h-11 items-center gap-1.5 rounded-pill px-4 text-[13px] font-semibold text-primary transition-colors hover:bg-primary-soft"
                          >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {t.course.downloadPdf}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Prev / next */}
          <div className="mt-2 flex items-center justify-between border-t border-border pt-5">
            {prevLesson ? (
              <Link
                href={`/course/${courseId}/lesson/${prevLesson.id}`}
                className="flex min-h-11 items-center gap-1.5 rounded-pill px-4 text-[15px] font-medium text-slate transition-colors hover:bg-mist"
              >
                <PrevChevron className="h-5 w-5" aria-hidden="true" />
                {t.lesson.previous}
              </Link>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Link
                href={`/course/${courseId}/lesson/${nextLesson.id}`}
                className="flex min-h-11 items-center gap-1.5 rounded-pill bg-primary px-5 text-[15px] font-semibold text-white shadow-primary transition-colors hover:bg-primary-hover"
              >
                {t.lesson.next}
                <NextChevron className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </main>

        {/* Desktop sidebar — 320px, at inline-end (flips in RTL automatically) */}
        <aside className="hidden w-80 shrink-0 border-s border-border bg-surface lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">{sidebar}</div>
        </aside>
      </div>

      {/* Mobile chapters bottom drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-hidden="true" tabIndex={-1} className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.lesson.chaptersDrawer}
            className="absolute inset-x-0 bottom-0 flex max-h-[80vh] flex-col rounded-t-card bg-surface shadow-modal"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-[15px] font-semibold text-ink">{t.lesson.chaptersDrawer}</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label={t.common.close}
                className="flex h-11 w-11 items-center justify-center rounded-pill text-slate hover:bg-mist"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>
          </div>
        </div>
      )}
    </div>
  );
}
