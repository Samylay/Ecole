import { courses, quizzes } from "../src/lib/data";
import { ensureContentTables, findUserByEmail, getDb } from "../src/lib/server/db";

const SEED_VERSION = "phase7-content-v1";
const ownerEmail = process.argv[2]?.trim().toLowerCase();

if (!ownerEmail) {
  throw new Error("Usage: tsx scripts/seed-content-from-data.ts <teacher-or-admin-email>");
}

const owner = findUserByEmail(ownerEmail);
if (!owner || (owner.role !== "teacher" && owner.role !== "admin")) {
  throw new Error("Seed owner must be an existing teacher or admin");
}

const db = getDb();
ensureContentTables(db);
const marker = db.prepare("SELECT value FROM content_meta WHERE key = ?").get("static_seed_version") as
  | { value: string }
  | undefined;

if (marker?.value === SEED_VERSION) {
  console.log(`Content seed ${SEED_VERSION} already applied`);
  process.exit(0);
}

const insertCourse = db.prepare(`INSERT INTO courses (
  id, owner_id, subject, level, title_fr, title_en, title_ar,
  description_fr, description_en, description_ar, thumbnail,
  instructor_name, instructor_avatar, instructor_bio_fr, instructor_bio_en, instructor_bio_ar,
  total_lessons, total_hours, student_count, rating
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertChapter = db.prepare(
  "INSERT INTO chapters (course_id, id, title_fr, title_en, title_ar, position) VALUES (?, ?, ?, ?, ?, ?)"
);
const insertLesson = db.prepare(`INSERT INTO lessons (
  course_id, chapter_id, id, title_fr, title_en, title_ar, duration, video_url,
  description_fr, description_en, description_ar, position
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertDocument = db.prepare(
  "INSERT INTO documents (course_id, chapter_id, lesson_id, name, url, position) VALUES (?, ?, ?, ?, ?, ?)"
);
const insertQuestion = db.prepare(`INSERT INTO quiz_questions (
  course_id, chapter_id, id, lesson_id, question_fr, question_en, question_ar,
  options_json, correct_index, explanation_fr, explanation_en, explanation_ar, position
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

db.transaction(() => {
  db.prepare("DELETE FROM courses").run();
  for (const course of courses) {
    insertCourse.run(
      course.id, owner.id, course.subject, course.level, course.title.fr, course.title.en, course.title.ar,
      course.description.fr, course.description.en, course.description.ar, course.thumbnail,
      course.instructor.name, course.instructor.avatar, course.instructor.bio.fr, course.instructor.bio.en,
      course.instructor.bio.ar, course.totalLessons, course.totalHours, course.studentCount, course.rating
    );
    course.chapters.forEach((chapter, chapterPosition) => {
      insertChapter.run(course.id, chapter.id, chapter.title.fr, chapter.title.en, chapter.title.ar, chapterPosition);
      chapter.lessons.forEach((lesson, lessonPosition) => {
        insertLesson.run(
          course.id, chapter.id, lesson.id, lesson.title.fr, lesson.title.en, lesson.title.ar,
          lesson.duration, lesson.videoUrl, lesson.description.fr, lesson.description.en,
          lesson.description.ar, lessonPosition
        );
        lesson.documents?.forEach((document, documentPosition) => {
          insertDocument.run(course.id, chapter.id, lesson.id, document.name, document.url, documentPosition);
        });
      });
      (quizzes[course.id]?.[chapter.id] ?? []).forEach((question, questionPosition) => {
        insertQuestion.run(
          course.id, chapter.id, question.id, question.lessonId,
          question.question.fr, question.question.en, question.question.ar, JSON.stringify(question.options),
          question.correctIndex, question.explanation.fr, question.explanation.en, question.explanation.ar,
          questionPosition
        );
      });
    });
  }
  db.prepare(`INSERT INTO content_meta (key, value, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`)
    .run("static_seed_version", SEED_VERSION, Date.now());
})();

console.log(`Seeded ${courses.length} courses as ${owner.email} (${SEED_VERSION})`);
