import { NextResponse } from "next/server";
import { getLesson } from "@/lib/data";
import { getCurrentUser } from "@/lib/server/auth";
import { getLessonQuestion, isEnrolledIn } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

export const QA_PAGE_SIZE = 10;

export function plainText(value: unknown, max = 500): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\r\n?/g, "\n").trim();
  if (normalized.length === 0 || normalized.length > max) return null;
  return normalized;
}

export async function authorizeLessonQa(
  request: Request,
  lessonId: string,
  options: { enrolledOnly?: boolean } = {}
) {
  const user = await getCurrentUser();
  if (!user) return { error: NextResponse.json({ success: false }, { status: 401 }) } as const;
  if (isRateLimited(`lesson-qa-read:${user.id}`, 240, 5 * 60 * 1000)) {
    return { error: NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 }) } as const;
  }
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId") ?? "";
  const result = getLesson(courseId, lessonId);
  if (!result) {
    return { error: NextResponse.json({ success: false, error: "lesson_not_found" }, { status: 404 }) } as const;
  }
  const chapter = result.course.chapters.find((item) => item.lessons.some((lesson) => lesson.id === lessonId));
  if (!chapter) {
    return { error: NextResponse.json({ success: false, error: "lesson_not_found" }, { status: 404 }) } as const;
  }
  const isStaff = user.role === "teacher" || user.role === "admin";
  const enrolled = isEnrolledIn(user.id, courseId);
  if ((options.enrolledOnly && !enrolled) || (!options.enrolledOnly && !enrolled && !isStaff)) {
    return { error: NextResponse.json({ success: false }, { status: 403 }) } as const;
  }
  return { user, courseId, chapterId: chapter.id, isStaff, enrolled } as const;
}

export function scopedQuestion(questionId: number, courseId: string, chapterId: string, lessonId: string) {
  const question = getLessonQuestion(questionId);
  if (
    !question ||
    question.course_id !== courseId ||
    question.chapter_id !== chapterId ||
    question.lesson_id !== lessonId
  ) {
    return null;
  }
  return question;
}

export function numericId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
