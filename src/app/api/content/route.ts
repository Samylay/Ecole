import { NextResponse } from "next/server";
import {
  listArchivedCourseIds,
  listDatabaseCourseIds,
  listProtectedCoursesForUser,
  listPublicCourseMetadata,
  listPublicQuizzes,
} from "@/lib/server/content";
import { getCurrentUser } from "@/lib/server/auth";
import { courses as seedCourses, quizzes as seedQuizzes } from "@/lib/data";

/**
 * Public student catalogue. The seed catalogue remains part of the response so
 * the app is usable while the database is empty or temporarily unavailable.
 * Database rows win on id, which keeps stable course/progress keys intact.
 */
export async function GET() {
  const user = await getCurrentUser();
  try {
    const archivedIds = listArchivedCourseIds();
    const databaseCourseIds = listDatabaseCourseIds();
    const dbMetadata = listPublicCourseMetadata();
    const seedMetadata = seedCourses.map((course) => ({
      ...course,
      chapters: course.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map(({ videoUrl: _videoUrl, documents: _documents, ...lesson }) => lesson),
      })),
    }));
    const byId = new Map(seedMetadata.filter((course) => !archivedIds.includes(course.id)).map((course) => [course.id, course]));
    for (const course of dbMetadata) {
      if (!archivedIds.includes(course.id)) byId.set(course.id, course);
    }
    const protectedCourses = user ? listProtectedCoursesForUser(user) : [];
    const protectedIds = new Set(protectedCourses.map((course) => course.id));
    const protectedQuizzes: typeof seedQuizzes = {};
    for (const [courseId, chapters] of Object.entries(listPublicQuizzes())) {
      if (protectedIds.has(courseId)) protectedQuizzes[courseId] = chapters;
    }
    for (const course of protectedCourses) {
      if (!databaseCourseIds.includes(course.id) && seedQuizzes[course.id]) {
        protectedQuizzes[course.id] = seedQuizzes[course.id];
      }
    }
    return NextResponse.json({
      success: true,
      courses: [...byId.values()],
      protectedCourses,
      protectedQuizzes,
      databaseCourseIds,
      archivedIds,
    });
  } catch {
    const metadata = seedCourses.map((course) => ({
      ...course,
      chapters: course.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map(({ videoUrl: _videoUrl, documents: _documents, ...lesson }) => lesson),
      })),
    }));
    return NextResponse.json({ success: true, courses: metadata, protectedCourses: [], protectedQuizzes: {}, fallback: true });
  }
}
