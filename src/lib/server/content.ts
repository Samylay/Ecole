import { DbUser, findUserById, getContentDb } from "./db";

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
  return { course, chapters, lessons };
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
}

export function updateQuestion(courseId: string, chapterId: string, questionId: string, userId: number, input: Omit<QuestionInput, "id">): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare(`UPDATE quiz_questions SET lesson_id = ?, question_fr = ?, question_en = ?, question_ar = ?,
    options_json = ?, correct_index = ?, explanation_fr = ?, explanation_en = ?, explanation_ar = ?, position = ?
    WHERE course_id = ? AND chapter_id = ? AND id = ?`)
    .run(input.lessonId, input.question.fr, input.question.en, input.question.ar, JSON.stringify(input.options),
      input.correctIndex, input.explanation.fr, input.explanation.en, input.explanation.ar, input.position ?? 0,
      courseId, chapterId, questionId);
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

export function updateDocument(courseId: string, documentId: number, userId: number, input: DocumentInput): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare("UPDATE documents SET name = ?, url = ?, position = ? WHERE course_id = ? AND id = ?")
    .run(input.name, input.url, input.position ?? 0, courseId, documentId);
}

export function deleteDocument(courseId: string, documentId: number, userId: number): void {
  assertOwnership(courseId, userId);
  getContentDb().prepare("DELETE FROM documents WHERE course_id = ? AND id = ?").run(courseId, documentId);
}
