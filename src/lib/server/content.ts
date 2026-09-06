import { DbUser, findUserById, getContentDb, isEnrolledIn } from "./db";
import { courses as seedCourseList, getCourse as getSeedCourse } from "@/lib/data";
import type { Course, QuizQuestion } from "@/lib/data";

export type LocalizedText = { fr: string; en: string; ar: string };
export type CourseInput = {
  id: string;
  subject: "math" | "physics" | "biology";
  level: "middle" | "high";
  title: LocalizedText;
  description: LocalizedText;
  thumbnail: string;
  instructor: { name: string; avatar: string; bio: LocalizedText };
  totalLessons?: number;
  totalHours?: number;
  studentCount?: number;
  rating?: number;
};
export type ChapterInput = {
  id: string;
  title: LocalizedText;
  position?: number;
  livestreamUrl?: string;
  scheduledAt?: string;
};
export type LessonInput = {
  id: string;
  title: LocalizedText;
  duration: string;
  videoUrl: string;
  description: LocalizedText;
  position?: number;
  livestreamUrl?: string;
  scheduledAt?: string;
};
export type QuestionInput = {
  id: string;
  lessonId: string;
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
  position?: number;
};
export type DocumentInput = { name: string; url: string; position?: number };

type CourseRow = {
  id: string;
  subject: Course["subject"];
  level: Course["level"];
  title_fr: string;
  title_en: string;
  title_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  thumbnail: string;
  instructor_name: string;
  instructor_avatar: string;
  instructor_bio_fr: string;
  instructor_bio_en: string;
  instructor_bio_ar: string;
  total_lessons: number;
  total_hours: number;
  student_count: number;
  rating: number;
  archived: number;
};

type ChapterRow = {
  course_id: string;
  id: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  position: number;
};

type LessonRow = {
  course_id: string;
  chapter_id: string;
  id: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  duration: string;
  video_url: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  position: number;
};

type QuizRow = {
  course_id: string;
  chapter_id: string;
  id: string;
  lesson_id: string;
  question_fr: string;
  question_en: string;
  question_ar: string;
  options_json: string;
  correct_index: number;
  explanation_fr: string;
  explanation_en: string;
  explanation_ar: string;
  position: number;
};

function publicCourse(row: CourseRow, chapters: ChapterRow[], lessons: LessonRow[], documents: Map<string, { name: string; url: string }[]>): Course {
  return {
    id: row.id,
    subject: row.subject,
    level: row.level,
    title: { fr: row.title_fr, en: row.title_en, ar: row.title_ar },
    description: { fr: row.description_fr, en: row.description_en, ar: row.description_ar },
    thumbnail: row.thumbnail,
    instructor: {
      name: row.instructor_name,
      avatar: row.instructor_avatar,
      bio: { fr: row.instructor_bio_fr, en: row.instructor_bio_en, ar: row.instructor_bio_ar },
    },
    totalLessons: row.total_lessons,
    totalHours: row.total_hours,
    studentCount: row.student_count,
    rating: row.rating,
    chapters: chapters.map((chapter) => ({
      id: chapter.id,
      title: { fr: chapter.title_fr, en: chapter.title_en, ar: chapter.title_ar },
      lessons: lessons.filter((lesson) => lesson.chapter_id === chapter.id).map((lesson) => ({
        id: lesson.id,
        title: { fr: lesson.title_fr, en: lesson.title_en, ar: lesson.title_ar },
        duration: lesson.duration,
        videoUrl: lesson.video_url,
        description: { fr: lesson.description_fr, en: lesson.description_en, ar: lesson.description_ar },
        ...(documents.has(`${chapter.id}:${lesson.id}`) ? { documents: documents.get(`${chapter.id}:${lesson.id}`) } : {}),
      })),
    })),
  };
}

function publicContentRows() {
  const db = getContentDb();
  const rows = db.prepare("SELECT * FROM courses WHERE archived = 0 ORDER BY updated_at DESC, id").all() as CourseRow[];
  const chapters = db.prepare("SELECT * FROM chapters ORDER BY position, id").all() as ChapterRow[];
  const lessons = db.prepare("SELECT * FROM lessons ORDER BY position, id").all() as LessonRow[];
  const documentRows = db.prepare("SELECT course_id, chapter_id, lesson_id, name, url FROM documents ORDER BY position, id").all() as {
    course_id: string; chapter_id: string; lesson_id: string; name: string; url: string;
  }[];
  const documents = new Map<string, { name: string; url: string }[]>();
  for (const document of documentRows) {
    const key = `${document.course_id}:${document.chapter_id}:${document.lesson_id}`;
    const items = documents.get(key) ?? [];
    items.push({ name: document.name, url: document.url });
    documents.set(key, items);
  }
  return { rows, chapters, lessons, documents };
}

/** Public student projection. Owner ids, timestamps, archived rows, and live links never leave this boundary. */
export function listPublicCourses(): Course[] {
  const { rows, chapters, lessons, documents } = publicContentRows();
  return rows.map((row) => publicCourse(
    row,
    chapters.filter((chapter) => chapter.course_id === row.id),
    lessons.filter((lesson) => lesson.course_id === row.id),
    new Map([...documents].filter(([key]) => key.startsWith(`${row.id}:`)).map(([key, value]) => [key.slice(row.id.length + 1), value])),
  ));
}

/** Remove lesson-level assets from the anonymous catalogue projection. */
export function stripProtectedCourse(course: Course): Course {
  return {
    ...course,
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map(({ videoUrl: _videoUrl, documents: _documents, ...lesson }) => lesson),
    })),
  } as Course;
}

export function listPublicCourseMetadata(): Course[] {
  return listPublicCourses().map(stripProtectedCourse);
}

export function listDatabaseCourseIds(): string[] {
  return (getContentDb().prepare("SELECT id FROM courses WHERE archived = 0").all() as { id: string }[]).map((row) => row.id);
}

/** Protected student payload authorization. Teachers can preview only their own DB courses. */
export function canViewCourseContent(user: DbUser, courseId: string): boolean {
  if (user.role === "admin") return true;
  const owner = getContentDb().prepare("SELECT owner_id FROM courses WHERE id = ? AND archived = 0").get(courseId) as
    | { owner_id: number }
    | undefined;
  if (owner) return user.role === "teacher" ? owner.owner_id === user.id : isEnrolledIn(user.id, courseId);
  return user.role === "teacher" || user.role === "student" || user.role === "parent"
    ? isEnrolledIn(user.id, courseId)
    : false;
}

export function listProtectedCoursesForUser(user: DbUser): Course[] {
  const dbCourses = listPublicCourses().filter((course) => canViewCourseContent(user, course.id));
  const dbIds = new Set(listDatabaseCourseIds());
  return [...dbCourses, ...seedCourseList.filter((course) => !dbIds.has(course.id) && canViewCourseContent(user, course.id))];
}

export function getPublicCourse(courseId: string): Course | undefined {
  return listPublicCourses().find((course) => course.id === courseId);
}

/** Server-side student lookup with the same seed fallback as the public API. */
export function getStudentCourse(courseId: string): Course | undefined {
  if (isCourseArchived(courseId)) return undefined;
  return getPublicCourse(courseId) ?? getSeedCourse(courseId);
}

export function listPublicQuizzes(): Record<string, Record<string, QuizQuestion[]>> {
  const db = getContentDb();
  const rows = db.prepare(`
    SELECT q.* FROM quiz_questions q
    JOIN courses c ON c.id = q.course_id
    WHERE c.archived = 0
    ORDER BY q.position, q.id
  `).all() as QuizRow[];
  const quizzes: Record<string, Record<string, QuizQuestion[]>> = {};
  for (const row of rows) {
    let options: QuizQuestion["options"];
    try { options = JSON.parse(row.options_json) as QuizQuestion["options"]; } catch { continue; }
    quizzes[row.course_id] ??= {};
    quizzes[row.course_id][row.chapter_id] ??= [];
    quizzes[row.course_id][row.chapter_id].push({
      id: row.id,
      lessonId: row.lesson_id,
      question: { fr: row.question_fr, en: row.question_en, ar: row.question_ar },
      options,
      correctIndex: row.correct_index,
      explanation: { fr: row.explanation_fr, en: row.explanation_en, ar: row.explanation_ar },
    });
  }
  return quizzes;
}

export function publicCourseExists(courseId: string): boolean {
  return Boolean(getContentDb().prepare("SELECT 1 FROM courses WHERE id = ? AND archived = 0").get(courseId));
}

export function isCourseArchived(courseId: string): boolean {
  return Boolean(getContentDb().prepare("SELECT 1 FROM courses WHERE id = ? AND archived = 1").get(courseId));
}

export function listArchivedCourseIds(): string[] {
  return (getContentDb().prepare("SELECT id FROM courses WHERE archived = 1").all() as { id: string }[]).map((row) => row.id);
}

function actor(userId: number): DbUser {
  const user = findUserById(userId);
  if (!user) throw new Error("actor_not_found");
  return user;
}

function writer(userId: number): DbUser {
  const user = actor(userId);
  if (user.role !== "teacher" && user.role !== "admin") throw new Error("forbidden");
  return user;
}

function assertOwnership(courseId: string, userId: number): void {
  const user = actor(userId);
  if (user.role === "admin") return;
  const row = getContentDb().prepare("SELECT owner_id FROM courses WHERE id = ?").get(courseId) as
    | { owner_id: number }
    | undefined;
  if (!row) throw new Error("course_not_found");
  if (row.owner_id !== userId) throw new Error("forbidden");
}

export function listCoursesForOwner(userId: number) {
  const user = actor(userId);
  return getContentDb()
    .prepare(
      user.role === "admin"
        ? "SELECT * FROM courses ORDER BY updated_at DESC"
        : "SELECT * FROM courses WHERE owner_id = ? ORDER BY updated_at DESC"
    )
    .all(...(user.role === "admin" ? [] : [userId]));
}

/** Full editing payload for one course the caller owns: course + chapters + lessons. */
export function getCourseTree(courseId: string, userId: number) {
  assertOwnership(courseId, userId);
  const db = getContentDb();
  const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(courseId);
  const chapters = db
    .prepare("SELECT * FROM chapters WHERE course_id = ? ORDER BY position, id")
    .all(courseId);
  const lessons = db
    .prepare("SELECT * FROM lessons WHERE course_id = ? ORDER BY position, id")
    .all(courseId);
  const questions = db
    .prepare("SELECT * FROM quiz_questions WHERE course_id = ? ORDER BY chapter_id, position, id")
    .all(courseId)
    .map((row) => {
      const question = row as { options_json: string } & Record<string, unknown>;
      let options: unknown[] = [];
      try {
        options = JSON.parse(question.options_json);
      } catch {
        // Existing rows are validated on write. Keep a malformed legacy row
        // visible to the owner without making the whole editor unreadable.
        options = [];
      }
      return { ...question, options };
    });
  const documents = db
    .prepare("SELECT * FROM documents WHERE course_id = ? ORDER BY chapter_id, lesson_id, position, id")
    .all(courseId);
  return { course, chapters, lessons, questions, documents };
}

export type LiveSession = {
  scope: "chapter" | "lesson";
  chapterId: string;
  lessonId: string | null;
  livestreamUrl: string;
  scheduledAt: string | null;
};

/**
 * P8-H: live links never ride along in the public catalogue payload. Callers
 * must have checked enrolment before calling this.
 */
export function listLiveSessions(courseId: string): LiveSession[] {
  const db = getContentDb();
  const chapters = db
    .prepare("SELECT id, livestream_url, scheduled_at FROM chapters WHERE course_id = ? AND livestream_url IS NOT NULL")
    .all(courseId) as { id: string; livestream_url: string; scheduled_at: string | null }[];
  const lessons = db
    .prepare(
      "SELECT chapter_id, id, livestream_url, scheduled_at FROM lessons WHERE course_id = ? AND livestream_url IS NOT NULL"
    )
    .all(courseId) as { chapter_id: string; id: string; livestream_url: string; scheduled_at: string | null }[];
  return [
    ...chapters.map((row) => ({
      scope: "chapter" as const,
      chapterId: row.id,
      lessonId: null,
      livestreamUrl: row.livestream_url,
      scheduledAt: row.scheduled_at,
    })),
    ...lessons.map((row) => ({
      scope: "lesson" as const,
      chapterId: row.chapter_id,
      lessonId: row.id,
      livestreamUrl: row.livestream_url,
      scheduledAt: row.scheduled_at,
    })),
  ];
}

export function createCourse(userId: number, input: CourseInput) {
  writer(userId);
  getContentDb()
    .prepare(`INSERT INTO courses (
      id, owner_id, subject, level, title_fr, title_en, title_ar,
      description_fr, description_en, description_ar, thumbnail,
      instructor_name, instructor_avatar, instructor_bio_fr, instructor_bio_en, instructor_bio_ar,
      total_lessons, total_hours, student_count, rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      input.id, userId, input.subject, input.level, input.title.fr, input.title.en, input.title.ar,
      input.description.fr, input.description.en, input.description.ar, input.thumbnail,
      input.instructor.name, input.instructor.avatar, input.instructor.bio.fr, input.instructor.bio.en,
      input.instructor.bio.ar, input.totalLessons ?? 0, input.totalHours ?? 0,
      input.studentCount ?? 0, input.rating ?? 0
    );
  return getContentDb().prepare("SELECT * FROM courses WHERE id = ?").get(input.id);
}

export function updateCourse(courseId: string, userId: number, input: Omit<CourseInput, "id">) {
  assertOwnership(courseId, userId);
  getContentDb().prepare(`UPDATE courses SET
    subject = ?, level = ?, title_fr = ?, title_en = ?, title_ar = ?,
    description_fr = ?, description_en = ?, description_ar = ?, thumbnail = ?,
    instructor_name = ?, instructor_avatar = ?, instructor_bio_fr = ?, instructor_bio_en = ?, instructor_bio_ar = ?,
    total_lessons = ?, total_hours = ?, student_count = ?, rating = ?, updated_at = ? WHERE id = ?`)
    .run(
      input.subject, input.level, input.title.fr, input.title.en, input.title.ar,
      input.description.fr, input.description.en, input.description.ar, input.thumbnail,
      input.instructor.name, input.instructor.avatar, input.instructor.bio.fr, input.instructor.bio.en,
      input.instructor.bio.ar, input.totalLessons ?? 0, input.totalHours ?? 0,
      input.studentCount ?? 0, input.rating ?? 0, Date.now(), courseId
    );
  return getContentDb().prepare("SELECT * FROM courses WHERE id = ?").get(courseId);
}

/** Teacher deletion is deliberately reversible: courses are archived. */
export function deleteCourse(courseId: string, userId: number): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare("UPDATE courses SET archived = 1, updated_at = ? WHERE id = ?").run(Date.now(), courseId);
}

export function createChapter(courseId: string, userId: number, input: ChapterInput) {
  assertOwnership(courseId, userId);
  getContentDb().prepare(
    `INSERT INTO chapters (course_id, id, title_fr, title_en, title_ar, position, livestream_url, scheduled_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(courseId, input.id, input.title.fr, input.title.en, input.title.ar, input.position ?? 0,
    input.livestreamUrl ?? null, input.scheduledAt ?? null);
  return getContentDb().prepare("SELECT * FROM chapters WHERE course_id = ? AND id = ?").get(courseId, input.id);
}

export function updateChapter(courseId: string, chapterId: string, userId: number, input: Omit<ChapterInput, "id">) {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare(
    `UPDATE chapters SET title_fr = ?, title_en = ?, title_ar = ?, position = ?,
     livestream_url = ?, scheduled_at = ? WHERE course_id = ? AND id = ?`
  ).run(input.title.fr, input.title.en, input.title.ar, input.position ?? 0,
    input.livestreamUrl ?? null, input.scheduledAt ?? null, courseId, chapterId);
  if (!result.changes) throw new Error("chapter_not_found");
  return getContentDb().prepare("SELECT * FROM chapters WHERE course_id = ? AND id = ?").get(courseId, chapterId);
}

export function deleteChapter(courseId: string, chapterId: string, userId: number): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare("DELETE FROM chapters WHERE course_id = ? AND id = ?").run(courseId, chapterId);
}

export function createLesson(courseId: string, chapterId: string, userId: number, input: LessonInput) {
  assertOwnership(courseId, userId);
  getContentDb().prepare(`INSERT INTO lessons (
    course_id, chapter_id, id, title_fr, title_en, title_ar, duration, video_url,
    description_fr, description_en, description_ar, position, livestream_url, scheduled_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(courseId, chapterId, input.id, input.title.fr, input.title.en, input.title.ar,
      input.duration, input.videoUrl, input.description.fr, input.description.en, input.description.ar,
      input.position ?? 0, input.livestreamUrl ?? null, input.scheduledAt ?? null);
  return getContentDb().prepare("SELECT * FROM lessons WHERE course_id = ? AND chapter_id = ? AND id = ?")
    .get(courseId, chapterId, input.id);
}

export function updateLesson(courseId: string, chapterId: string, lessonId: string, userId: number, input: Omit<LessonInput, "id">) {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare(`UPDATE lessons SET title_fr = ?, title_en = ?, title_ar = ?,
    duration = ?, video_url = ?, description_fr = ?, description_en = ?, description_ar = ?, position = ?,
    livestream_url = ?, scheduled_at = ?
    WHERE course_id = ? AND chapter_id = ? AND id = ?`)
    .run(input.title.fr, input.title.en, input.title.ar, input.duration, input.videoUrl,
      input.description.fr, input.description.en, input.description.ar, input.position ?? 0,
      input.livestreamUrl ?? null, input.scheduledAt ?? null, courseId, chapterId, lessonId);
  if (!result.changes) throw new Error("lesson_not_found");
  return getContentDb().prepare("SELECT * FROM lessons WHERE course_id = ? AND chapter_id = ? AND id = ?")
    .get(courseId, chapterId, lessonId);
}

export function deleteLesson(courseId: string, chapterId: string, lessonId: string, userId: number): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare("DELETE FROM lessons WHERE course_id = ? AND chapter_id = ? AND id = ?")
    .run(courseId, chapterId, lessonId);
}

export function createQuestion(courseId: string, chapterId: string, userId: number, input: QuestionInput) {
  assertOwnership(courseId, userId);
  getContentDb().prepare(`INSERT INTO quiz_questions (
    course_id, chapter_id, id, lesson_id, question_fr, question_en, question_ar,
    options_json, correct_index, explanation_fr, explanation_en, explanation_ar, position
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(courseId, chapterId, input.id, input.lessonId, input.question.fr, input.question.en, input.question.ar,
      JSON.stringify(input.options), input.correctIndex, input.explanation.fr, input.explanation.en,
    input.explanation.ar, input.position ?? 0);
  return getContentDb().prepare("SELECT * FROM quiz_questions WHERE course_id = ? AND chapter_id = ? AND id = ?")
    .get(courseId, chapterId, input.id);
}

export function updateQuestion(courseId: string, chapterId: string, questionId: string, userId: number, input: Omit<QuestionInput, "id">): void {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare(`UPDATE quiz_questions SET lesson_id = ?, question_fr = ?, question_en = ?, question_ar = ?,
    options_json = ?, correct_index = ?, explanation_fr = ?, explanation_en = ?, explanation_ar = ?, position = ?
    WHERE course_id = ? AND chapter_id = ? AND id = ?`)
    .run(input.lessonId, input.question.fr, input.question.en, input.question.ar, JSON.stringify(input.options),
      input.correctIndex, input.explanation.fr, input.explanation.en, input.explanation.ar, input.position ?? 0,
      courseId, chapterId, questionId);
  if (!result.changes) throw new Error("question_not_found");
}

export function deleteQuestion(courseId: string, chapterId: string, questionId: string, userId: number): void {
  assertOwnership(courseId, userId);
  const info = getContentDb()
    .prepare("DELETE FROM quiz_questions WHERE course_id = ? AND chapter_id = ? AND id = ?")
    .run(courseId, chapterId, questionId);
  if (info.changes === 0) throw new Error("not_found"); // reviewer P2-4: fail loudly on wrong ids
}

export function createDocument(courseId: string, chapterId: string, lessonId: string, userId: number, input: DocumentInput): number {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare(
    "INSERT INTO documents (course_id, chapter_id, lesson_id, name, url, position) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(courseId, chapterId, lessonId, input.name, input.url, input.position ?? 0);
  return Number(result.lastInsertRowid);
}

/** Ensure a nested document route cannot address a different lesson's row. */
export function assertDocumentScope(
  courseId: string,
  chapterId: string,
  lessonId: string,
  documentId: number,
  userId: number
): void {
  assertOwnership(courseId, userId);
  const row = getContentDb().prepare(
    "SELECT 1 FROM documents WHERE course_id = ? AND chapter_id = ? AND lesson_id = ? AND id = ?"
  ).get(courseId, chapterId, lessonId, documentId);
  if (!row) throw new Error("document_not_found");
}

export function updateDocument(courseId: string, documentId: number, userId: number, input: DocumentInput): void {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare("UPDATE documents SET name = ?, url = ?, position = ? WHERE course_id = ? AND id = ?")
    .run(input.name, input.url, input.position ?? 0, courseId, documentId);
  if (!result.changes) throw new Error("document_not_found");
}

export function deleteDocument(courseId: string, documentId: number, userId: number): void {
  assertOwnership(courseId, userId);
  const result = getContentDb().prepare("DELETE FROM documents WHERE course_id = ? AND id = ?").run(courseId, documentId);
  if (!result.changes) throw new Error("document_not_found");
}
