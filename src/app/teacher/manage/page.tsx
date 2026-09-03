"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Plus, Trash2, Video } from "lucide-react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/Toast";
import { LocalizedField, LocalizedValue } from "@/components/teacher/LocalizedField";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";

type CourseRow = {
  id: string;
  subject: "math" | "physics" | "biology";
  level: "middle" | "high";
  title_fr: string; title_en: string; title_ar: string;
  description_fr: string; description_en: string; description_ar: string;
  thumbnail: string;
  instructor_name: string; instructor_avatar: string;
  instructor_bio_fr: string; instructor_bio_en: string; instructor_bio_ar: string;
  archived: number;
};

type ChapterRow = {
  id: string;
  title_fr: string; title_en: string; title_ar: string;
  position: number;
  livestream_url: string | null;
  scheduled_at: string | null;
};

type LessonRow = ChapterRow & {
  chapter_id: string;
  duration: string;
  video_url: string;
  description_fr: string; description_en: string; description_ar: string;
};

type LessonForm = {
  id: string;
  isNew: boolean;
  title: LocalizedValue;
  description: LocalizedValue;
  duration: string;
  videoUrl: string;
  position: string;
  livestreamUrl: string;
  scheduledAt: string;
};

type ChapterForm = {
  id: string;
  isNew: boolean;
  title: LocalizedValue;
  position: string;
  livestreamUrl: string;
  scheduledAt: string;
  lessons: LessonForm[];
};

type CourseForm = {
  id: string;
  isNew: boolean;
  subject: CourseRow["subject"];
  level: CourseRow["level"];
  title: LocalizedValue;
  description: LocalizedValue;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  instructorBio: LocalizedValue;
};

const emptyText: LocalizedValue = { fr: "", en: "", ar: "" };

function text(row: Record<string, unknown>, prefix: string): LocalizedValue {
  return {
    fr: String(row[`${prefix}_fr`] ?? ""),
    en: String(row[`${prefix}_en`] ?? ""),
    ar: String(row[`${prefix}_ar`] ?? ""),
  };
}

function blankCourse(): CourseForm {
  return {
    id: "", isNew: true, subject: "math", level: "middle",
    title: emptyText, description: emptyText, thumbnail: "/thumbnails/placeholder.svg",
    instructorName: "", instructorAvatar: "/avatars/placeholder.svg", instructorBio: emptyText,
  };
}

/** `datetime-local` produces a local wall-clock string; the API only needs it parseable. */
function toInputDate(value: string | null): string {
  if (!value) return "";
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return "";
  const date = new Date(parsed);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const filled = (value: LocalizedValue) => value.fr.trim() && value.en.trim() && value.ar.trim();

export default function TeacherStudioPage() {
  const { user, isLoading } = useAuth();
  const { locale, t } = useLocale();
  const { showToast } = useToast();
  const router = useRouter();

  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [courseForm, setCourseForm] = useState<CourseForm | null>(null);
  const [chapters, setChapters] = useState<ChapterForm[]>([]);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ chapterId: string; lessonId?: string } | null>(null);

  const staff = user?.role === "teacher" || user?.role === "admin";

  const loadCourses = useCallback(async () => {
    const response = await fetch("/api/teacher/courses");
    if (!response.ok) return;
    const data = await response.json();
    setCourses(data.courses ?? []);
  }, []);

  useEffect(() => {
    if (!isLoading && !staff) router.replace(user ? "/dashboard" : "/signin");
  }, [isLoading, router, staff, user]);

  useEffect(() => {
    if (staff) void loadCourses();
  }, [loadCourses, staff]);

  const openCourse = async (courseId: string) => {
    setFormError("");
    const response = await fetch(`/api/teacher/courses/${encodeURIComponent(courseId)}`);
    if (!response.ok) {
      showToast(t.studio.requestFailed);
      return;
    }
    const data = await response.json();
    const course = data.course as CourseRow;
    setCourseForm({
      id: course.id, isNew: false, subject: course.subject, level: course.level,
      title: text(course, "title"), description: text(course, "description"),
      thumbnail: course.thumbnail, instructorName: course.instructor_name,
      instructorAvatar: course.instructor_avatar, instructorBio: text(course, "instructor_bio"),
    });
    const lessons = (data.lessons ?? []) as LessonRow[];
    setChapters(
      ((data.chapters ?? []) as ChapterRow[]).map((chapter) => ({
        id: chapter.id, isNew: false, title: text(chapter, "title"),
        position: String(chapter.position), livestreamUrl: chapter.livestream_url ?? "",
        scheduledAt: toInputDate(chapter.scheduled_at),
        lessons: lessons
          .filter((lesson) => lesson.chapter_id === chapter.id)
          .map((lesson) => ({
            id: lesson.id, isNew: false, title: text(lesson, "title"),
            description: text(lesson, "description"), duration: lesson.duration,
            videoUrl: lesson.video_url, position: String(lesson.position),
            livestreamUrl: lesson.livestream_url ?? "", scheduledAt: toInputDate(lesson.scheduled_at),
          })),
      }))
    );
  };

  const request = async (url: string, method: string, body?: unknown) => {
    setBusy(true);
    setFormError("");
    try {
      const response = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        setFormError(t.studio.requestFailed);
        return false;
      }
      return true;
    } catch {
      setFormError(t.studio.requestFailed);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const saveCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!courseForm) return;
    if (!filled(courseForm.title) || !filled(courseForm.description) || !filled(courseForm.instructorBio) ||
      !courseForm.instructorName.trim() || !/^[a-z0-9][a-z0-9-]*$/.test(courseForm.id)) {
      setFormError(t.studio.invalidForm);
      return;
    }
    const payload = {
      id: courseForm.id, subject: courseForm.subject, level: courseForm.level,
      title: courseForm.title, description: courseForm.description, thumbnail: courseForm.thumbnail,
      instructor: {
        name: courseForm.instructorName, avatar: courseForm.instructorAvatar, bio: courseForm.instructorBio,
      },
    };
    const ok = courseForm.isNew
      ? await request("/api/teacher/courses", "POST", payload)
      : await request(`/api/teacher/courses/${encodeURIComponent(courseForm.id)}`, "PUT", payload);
    if (!ok) return;
    showToast(courseForm.isNew ? t.studio.createdToast : t.studio.savedToast);
    await loadCourses();
    await openCourse(courseForm.id);
  };

  const archiveCourse = async () => {
    if (!courseForm) return;
    setArchiveOpen(false);
    const ok = await request(`/api/teacher/courses/${encodeURIComponent(courseForm.id)}`, "DELETE");
    if (!ok) return;
    showToast(t.studio.archivedToast);
    setCourseForm(null);
    setChapters([]);
    await loadCourses();
  };

  // Indexed rather than keyed by id: a freshly added row has no id yet, and two
  // of them would otherwise share the same empty key.
  const patchChapter = (index: number, next: Partial<ChapterForm>) =>
    setChapters((current) => current.map((chapter, i) => (i === index ? { ...chapter, ...next } : chapter)));

  const patchLesson = (chapterIndex: number, lessonIndex: number, next: Partial<LessonForm>) =>
    setChapters((current) =>
      current.map((chapter, i) =>
        i === chapterIndex
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson, j) => (j === lessonIndex ? { ...lesson, ...next } : lesson)),
            }
          : chapter
      )
    );

  const saveChapter = async (chapter: ChapterForm) => {
    if (!courseForm || !filled(chapter.title) || !chapter.id.trim()) {
      setFormError(t.studio.invalidForm);
      return;
    }
    const base = `/api/teacher/courses/${encodeURIComponent(courseForm.id)}/chapters`;
    const payload = {
      id: chapter.id, title: chapter.title, position: Number(chapter.position) || 0,
      livestreamUrl: chapter.livestreamUrl || undefined, scheduledAt: chapter.scheduledAt || undefined,
    };
    const ok = chapter.isNew
      ? await request(base, "POST", payload)
      : await request(`${base}/${encodeURIComponent(chapter.id)}`, "PUT", payload);
    if (!ok) return;
    showToast(chapter.isNew ? t.studio.createdToast : t.studio.savedToast);
    await openCourse(courseForm.id);
  };

  const saveLesson = async (chapter: ChapterForm, lesson: LessonForm) => {
    if (!courseForm || !filled(lesson.title) || !filled(lesson.description) || !lesson.id.trim() ||
      !lesson.duration.trim() || !lesson.videoUrl.trim()) {
      setFormError(t.studio.invalidForm);
      return;
    }
    const base = `/api/teacher/courses/${encodeURIComponent(courseForm.id)}/chapters/${encodeURIComponent(chapter.id)}/lessons`;
    const payload = {
      id: lesson.id, title: lesson.title, description: lesson.description, duration: lesson.duration,
      videoUrl: lesson.videoUrl, position: Number(lesson.position) || 0,
      livestreamUrl: lesson.livestreamUrl || undefined, scheduledAt: lesson.scheduledAt || undefined,
    };
    const ok = lesson.isNew
      ? await request(base, "POST", payload)
      : await request(`${base}/${encodeURIComponent(lesson.id)}`, "PUT", payload);
    if (!ok) return;
    showToast(lesson.isNew ? t.studio.createdToast : t.studio.savedToast);
    await openCourse(courseForm.id);
  };

  const confirmDelete = async () => {
    if (!courseForm || !pendingDelete) return;
    const { chapterId, lessonId } = pendingDelete;
    setPendingDelete(null);
    const base = `/api/teacher/courses/${encodeURIComponent(courseForm.id)}/chapters/${encodeURIComponent(chapterId)}`;
    const ok = await request(lessonId ? `${base}/lessons/${encodeURIComponent(lessonId)}` : base, "DELETE");
    if (!ok) return;
    showToast(t.studio.deletedToast);
    await openCourse(courseForm.id);
  };

  if (isLoading || !staff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const subjectLabels = {
    math: t.studio.subjectMath, physics: t.studio.subjectPhysics, biology: t.studio.subjectBiology,
  };
  const selectClass =
    "h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink transition-colors duration-[var(--duration-base)] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft";

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">{t.common.skipToContent}</a>
      <Navbar />
      <main id="main" className="page-enter mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[22px] font-semibold text-ink">{t.studio.title}</h1>
        <p className="mt-1 text-[15px] text-muted">{t.studio.subtitle}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <section aria-labelledby="studio-courses">
            <div className="flex items-center justify-between gap-3">
              <h2 id="studio-courses" className="text-[17px] font-semibold text-ink">{t.studio.myCourses}</h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCourseForm(blankCourse());
                  setChapters([]);
                  setFormError("");
                }}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                {t.studio.newCourse}
              </Button>
            </div>
            {courses.length === 0 ? (
              <div className="mt-4 rounded-card border border-border bg-surface p-5 text-center">
                <p className="text-[15px] font-semibold text-ink">{t.studio.noCoursesTitle}</p>
                <p className="mt-1 text-[13px] text-muted">{t.studio.noCoursesBody}</p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {courses.map((course) => (
                  <li key={course.id}>
                    <button
                      onClick={() => void openCourse(course.id)}
                      className={`w-full rounded-card border px-4 py-3 text-start transition-[background-color,border-color,transform] duration-[var(--duration-base)] active:scale-[0.98] ${
                        courseForm?.id === course.id
                          ? "border-primary bg-primary-soft"
                          : "border-border bg-surface hover:bg-mist"
                      }`}
                    >
                      <span className="block text-[15px] font-medium text-ink">
                        {course[`title_${locale}`] || course.id}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-faint">
                        {subjectLabels[course.subject]}
                        {course.archived ? ` · ${t.studio.archivedBadge}` : ""}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {!courseForm ? (
            <div className="flex flex-col items-center justify-center rounded-card border border-border bg-surface p-10 text-center">
              <BookOpen className="h-8 w-8 text-faint" aria-hidden="true" />
              <p className="mt-3 text-[17px] font-semibold text-ink">{t.studio.emptyEditorTitle}</p>
              <p className="mt-1 text-[15px] text-muted">{t.studio.emptyEditorBody}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <form onSubmit={saveCourse} className="rounded-card border border-border bg-surface p-6 shadow-card">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Input
                      label={t.studio.courseIdLabel}
                      value={courseForm.id}
                      disabled={!courseForm.isNew}
                      onChange={(event) => setCourseForm({ ...courseForm, id: event.target.value })}
                      required
                    />
                    <p className="mt-1.5 text-[13px] text-muted">
                      {courseForm.isNew ? t.studio.courseIdHint : t.studio.idLocked}
                    </p>
                  </div>
                  <Input
                    label={t.studio.instructorName}
                    value={courseForm.instructorName}
                    onChange={(event) => setCourseForm({ ...courseForm, instructorName: event.target.value })}
                    required
                  />
                  <div>
                    <label htmlFor="studio-subject" className="mb-1.5 block text-[13px] font-medium text-slate">{t.studio.subject}</label>
                    <select
                      id="studio-subject"
                      className={selectClass}
                      value={courseForm.subject}
                      onChange={(event) => setCourseForm({ ...courseForm, subject: event.target.value as CourseRow["subject"] })}
                    >
                      <option value="math">{t.studio.subjectMath}</option>
                      <option value="physics">{t.studio.subjectPhysics}</option>
                      <option value="biology">{t.studio.subjectBiology}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="studio-level" className="mb-1.5 block text-[13px] font-medium text-slate">{t.studio.level}</label>
                    <select
                      id="studio-level"
                      className={selectClass}
                      value={courseForm.level}
                      onChange={(event) => setCourseForm({ ...courseForm, level: event.target.value as CourseRow["level"] })}
                    >
                      <option value="middle">{t.studio.levelMiddle}</option>
                      <option value="high">{t.studio.levelHigh}</option>
                    </select>
                  </div>
                  <Input
                    label={t.studio.thumbnail}
                    value={courseForm.thumbnail}
                    onChange={(event) => setCourseForm({ ...courseForm, thumbnail: event.target.value })}
                    required
                  />
                  <Input
                    label={t.studio.instructorAvatar}
                    value={courseForm.instructorAvatar}
                    onChange={(event) => setCourseForm({ ...courseForm, instructorAvatar: event.target.value })}
                    required
                  />
                </div>
                <div className="mt-5 space-y-5">
                  <LocalizedField
                    label={t.studio.courseTitle}
                    value={courseForm.title}
                    onChange={(title) => setCourseForm({ ...courseForm, title })}
                  />
                  <LocalizedField
                    label={t.studio.courseDescription}
                    multiline
                    value={courseForm.description}
                    onChange={(description) => setCourseForm({ ...courseForm, description })}
                  />
                  <LocalizedField
                    label={t.studio.instructorBio}
                    multiline
                    value={courseForm.instructorBio}
                    onChange={(instructorBio) => setCourseForm({ ...courseForm, instructorBio })}
                  />
                </div>
                {formError && <p role="alert" className="mt-4 text-[13px] font-medium text-error">{formError}</p>}
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button type="submit" loading={busy}>
                    {courseForm.isNew ? t.studio.create : t.studio.save}
                  </Button>
                  {!courseForm.isNew && (
                    <Button type="button" variant="ghost" onClick={() => setArchiveOpen(true)}>
                      {t.studio.archive}
                    </Button>
                  )}
                </div>
              </form>

              {!courseForm.isNew && (
                <section aria-labelledby="studio-chapters" className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 id="studio-chapters" className="text-[17px] font-semibold text-ink">{t.studio.chapters}</h2>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        setChapters((current) => [
                          ...current,
                          {
                            id: "", isNew: true, title: emptyText, position: String(current.length + 1),
                            livestreamUrl: "", scheduledAt: "", lessons: [],
                          },
                        ])
                      }
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      {t.studio.addChapter}
                    </Button>
                  </div>

                  {chapters.length === 0 && (
                    <p className="rounded-card border border-border bg-surface p-5 text-[15px] text-muted">
                      {t.studio.noChapters}
                    </p>
                  )}

                  {chapters.map((chapter, index) => (
                    <div key={chapter.isNew ? `new-${index}` : chapter.id} className="rounded-card border border-border bg-surface p-5 shadow-card">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label={t.studio.courseIdLabel}
                          value={chapter.id}
                          disabled={!chapter.isNew}
                          onChange={(event) => patchChapter(index, { id: event.target.value })}
                        />
                        <Input
                          label={t.studio.position}
                          type="number"
                          value={chapter.position}
                          onChange={(event) => patchChapter(index, { position: event.target.value })}
                        />
                      </div>
                      <div className="mt-4">
                        <LocalizedField
                          label={t.studio.chapterTitleLabel}
                          value={chapter.title}
                          onChange={(title) => patchChapter(index, { title })}
                        />
                      </div>
                      <div className="mt-4 rounded-card border border-border bg-bg p-4">
                        <p className="flex items-center gap-2 text-[13px] font-semibold text-slate">
                          <Video className="h-4 w-4" aria-hidden="true" />
                          {t.studio.liveSection}
                        </p>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                          <Input
                            label={t.studio.liveUrl}
                            placeholder="https://meet.google.com/..."
                            value={chapter.livestreamUrl}
                            onChange={(event) => patchChapter(index, { livestreamUrl: event.target.value })}
                          />
                          <Input
                            label={t.studio.liveSchedule}
                            type="datetime-local"
                            value={chapter.scheduledAt}
                            onChange={(event) => patchChapter(index, { scheduledAt: event.target.value })}
                          />
                        </div>
                        <p className="mt-2 text-[13px] text-muted">{t.studio.liveUrlHint}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button size="sm" loading={busy} onClick={() => void saveChapter(chapter)}>
                          {chapter.isNew ? t.studio.create : t.studio.save}
                        </Button>
                        {!chapter.isNew && (
                          <>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                patchChapter(index, {
                                  lessons: [
                                    ...chapter.lessons,
                                    {
                                      id: "", isNew: true, title: emptyText, description: emptyText,
                                      duration: "", videoUrl: "", position: String(chapter.lessons.length + 1),
                                      livestreamUrl: "", scheduledAt: "",
                                    },
                                  ],
                                })
                              }
                            >
                              <Plus className="h-4 w-4" aria-hidden="true" />
                              {t.studio.addLesson}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setPendingDelete({ chapterId: chapter.id })}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              {t.studio.deleteChapter}
                            </Button>
                          </>
                        )}
                      </div>

                      {chapter.lessons.length > 0 && (
                        <ul className="mt-4 space-y-3">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <li key={lesson.isNew ? `new-${lessonIndex}` : lesson.id}>
                              <details open={lesson.isNew} className="rounded-card border border-border bg-bg p-4">
                                <summary className="cursor-pointer text-[15px] font-medium text-ink">
                                  {lesson.title[locale] || lesson.id || t.studio.addLesson}
                                </summary>
                                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                  <Input
                                    label={t.studio.courseIdLabel}
                                    value={lesson.id}
                                    disabled={!lesson.isNew}
                                    onChange={(event) => patchLesson(index, lessonIndex, { id: event.target.value })}
                                  />
                                  <Input
                                    label={t.studio.duration}
                                    placeholder="12:30"
                                    value={lesson.duration}
                                    onChange={(event) => patchLesson(index, lessonIndex, { duration: event.target.value })}
                                  />
                                  <Input
                                    label={t.studio.position}
                                    type="number"
                                    value={lesson.position}
                                    onChange={(event) => patchLesson(index, lessonIndex, { position: event.target.value })}
                                  />
                                </div>
                                <div className="mt-4">
                                  <Input
                                    label={t.studio.videoUrl}
                                    value={lesson.videoUrl}
                                    onChange={(event) => patchLesson(index, lessonIndex, { videoUrl: event.target.value })}
                                  />
                                </div>
                                <div className="mt-4 space-y-5">
                                  <LocalizedField
                                    label={t.studio.lessonTitleLabel}
                                    value={lesson.title}
                                    onChange={(title) => patchLesson(index, lessonIndex, { title })}
                                  />
                                  <LocalizedField
                                    label={t.studio.lessonDescription}
                                    multiline
                                    value={lesson.description}
                                    onChange={(description) => patchLesson(index, lessonIndex, { description })}
                                  />
                                </div>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                  <Input
                                    label={t.studio.liveUrl}
                                    placeholder="https://meet.google.com/..."
                                    value={lesson.livestreamUrl}
                                    onChange={(event) => patchLesson(index, lessonIndex, { livestreamUrl: event.target.value })}
                                  />
                                  <Input
                                    label={t.studio.liveSchedule}
                                    type="datetime-local"
                                    value={lesson.scheduledAt}
                                    onChange={(event) => patchLesson(index, lessonIndex, { scheduledAt: event.target.value })}
                                  />
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                  <Button size="sm" loading={busy} onClick={() => void saveLesson(chapter, lesson)}>
                                    {lesson.isNew ? t.studio.create : t.studio.save}
                                  </Button>
                                  {!lesson.isNew && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setPendingDelete({ chapterId: chapter.id, lessonId: lesson.id })}
                                    >
                                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                                      {t.studio.deleteLesson}
                                    </Button>
                                  )}
                                </div>
                              </details>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Modal open={archiveOpen} onClose={() => setArchiveOpen(false)} title={t.studio.archiveTitle}>
        <p className="text-[15px] text-muted">{t.studio.archiveBody}</p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setArchiveOpen(false)}>{t.studio.cancel}</Button>
          <Button variant="danger" onClick={() => void archiveCourse()}>{t.studio.confirm}</Button>
        </div>
      </Modal>

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title={pendingDelete?.lessonId ? t.studio.deleteLesson : t.studio.deleteChapter}
      >
        <p className="text-[15px] text-muted">
          {pendingDelete?.lessonId ? t.studio.deleteLessonBody : t.studio.deleteChapterBody}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setPendingDelete(null)}>{t.studio.cancel}</Button>
          <Button variant="danger" onClick={() => void confirmDelete()}>{t.studio.confirm}</Button>
        </div>
      </Modal>
    </div>
  );
}
