import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";
import type { ChapterInput, CourseInput, LessonInput, LocalizedText } from "@/lib/server/content";

export async function authorizeTeacher(request: Request) {
  const user = await getCurrentUser();
  if (!user) return { error: NextResponse.json({ success: false }, { status: 401 }) } as const;
  if (user.role !== "teacher" && user.role !== "admin") {
    return { error: NextResponse.json({ success: false }, { status: 403 }) } as const;
  }
  if (isRateLimited(`teacher:${user.id}:${clientIp(request)}`, 120, 5 * 60 * 1000)) {
    return { error: NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 }) } as const;
  }
  return { user } as const;
}

function text(value: unknown, max = 500): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function localized(value: unknown, max = 500): value is LocalizedText {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return text(item.fr, max) && text(item.en, max) && text(item.ar, max);
}

export function validCourse(value: unknown, requireId: boolean): value is CourseInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  const instructor = v.instructor as Record<string, unknown> | undefined;
  return (!requireId || (text(v.id, 128) && /^[a-z0-9][a-z0-9-]*$/.test(v.id))) &&
    (v.subject === "math" || v.subject === "physics" || v.subject === "biology") &&
    (v.level === "middle" || v.level === "high") && localized(v.title, 200) &&
    localized(v.description, 2000) && text(v.thumbnail, 500) && !!instructor &&
    text(instructor.name, 200) && text(instructor.avatar, 500) && localized(instructor.bio, 1000) &&
    optionalNumber(v.totalLessons, 0) && optionalNumber(v.totalHours, 0) &&
    optionalNumber(v.studentCount, 0) && optionalNumber(v.rating, 0, 5);
}

function optionalNumber(value: unknown, min: number, max = Number.MAX_SAFE_INTEGER): boolean {
  return value === undefined || (typeof value === "number" && Number.isFinite(value) && value >= min && value <= max);
}

export function validChapter(value: unknown, requireId: boolean): value is ChapterInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (!requireId || text(v.id, 128)) && localized(v.title, 200) && optionalNumber(v.position, 0);
}

export function validLesson(value: unknown, requireId: boolean): value is LessonInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (!requireId || text(v.id, 128)) && localized(v.title, 200) && text(v.duration, 32) &&
    text(v.videoUrl, 1000) && localized(v.description, 2000) && optionalNumber(v.position, 0);
}

export function contentError(error: unknown) {
  const message = error instanceof Error ? error.message : "invalid_request";
  if (message === "forbidden") return NextResponse.json({ success: false }, { status: 403 });
  if (message.endsWith("_not_found")) return NextResponse.json({ success: false }, { status: 404 });
  if (message.includes("UNIQUE") || message.includes("FOREIGN KEY")) {
    return NextResponse.json({ success: false, error: "conflict" }, { status: 409 });
  }
  return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
}
