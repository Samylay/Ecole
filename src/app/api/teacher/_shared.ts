import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";
import type { ChapterInput, CourseInput, DocumentInput, LessonInput, LocalizedText, QuestionInput } from "@/lib/server/content";

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

/** Meet links only: any other host would be a streaming product we deliberately do not run. */
function optionalMeetUrl(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string" || value.length > 1000) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "meet.google.com" || url.hostname.endsWith(".meet.google.com"));
  } catch {
    return false;
  }
}

function optionalDate(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true;
  return typeof value === "string" && value.length <= 40 && Number.isFinite(Date.parse(value));
}

/**
 * Lessons may be authored before a recording is ready, so an empty URL is
 * valid. Once present, the player and transcript code only support YouTube
 * playback. Keep this exact-host allowlist here rather than accepting an
 * arbitrary iframe destination from a teacher-controlled field.
 */
function optionalVideoUrl(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value !== "string" || value.length > 1000) return false;
  if (value.trim() === "") return true;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return false;

  const host = url.hostname.toLowerCase();
  if (host === "youtu.be") return /^\/[^/?#]+$/.test(url.pathname);
  if (host === "www.youtube-nocookie.com" || host === "youtube-nocookie.com") {
    return /^\/embed\/[^/?#]+$/.test(url.pathname);
  }
  if (host !== "youtube.com" && host !== "www.youtube.com" && host !== "m.youtube.com") return false;
  if (url.pathname === "/watch") return Boolean(url.searchParams.get("v"));
  return /^\/(?:embed|shorts|live)\/[^/?#]+$/.test(url.pathname);
}

export function validChapter(value: unknown, requireId: boolean): value is ChapterInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (!requireId || text(v.id, 128)) && localized(v.title, 200) && optionalNumber(v.position, 0) &&
    optionalMeetUrl(v.livestreamUrl) && optionalDate(v.scheduledAt);
}

export function validLesson(value: unknown, requireId: boolean): value is LessonInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (!requireId || text(v.id, 128)) && localized(v.title, 200) && text(v.duration, 32) &&
    typeof v.videoUrl === "string" && optionalVideoUrl(v.videoUrl) && localized(v.description, 2000) && optionalNumber(v.position, 0) &&
    optionalMeetUrl(v.livestreamUrl) && optionalDate(v.scheduledAt);
}

export function validQuestion(value: unknown, requireId: boolean): value is QuestionInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  const options = v.options;
  return (!requireId || text(v.id, 128)) && text(v.lessonId, 128) && localized(v.question, 2000) &&
    Array.isArray(options) && options.length >= 2 && options.length <= 6 &&
    options.every((option) => localized(option, 500)) &&
    typeof v.correctIndex === "number" && Number.isInteger(v.correctIndex) &&
    v.correctIndex >= 0 && v.correctIndex < options.length && localized(v.explanation, 2000) &&
    optionalNumber(v.position, 0);
}

function validDocumentUrl(value: unknown): boolean {
  if (typeof value !== "string" || value.trim().length === 0 || value.length > 2000) return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validDocument(value: unknown): value is DocumentInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return text(v.name, 300) && validDocumentUrl(v.url) && optionalNumber(v.position, 0);
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
