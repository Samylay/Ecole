import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { canViewCourseContent, isCourseArchived, listLiveSessions } from "@/lib/server/content";
import { isEnrolledIn } from "@/lib/server/db";

type Context = { params: Promise<{ courseId: string }> };

/**
 * P8-H: Meet links are served only to a signed-in, enrolled student (or the
 * teaching staff), never bundled into the public catalogue payload.
 */
export async function GET(_request: Request, context: Context) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  const { courseId } = await context.params;
  if (isCourseArchived(courseId)) return NextResponse.json({ success: false }, { status: 404 });
  const staffPreview = user.role === "admin" || (user.role === "teacher" && canViewCourseContent(user, courseId));
  if (!canViewCourseContent(user, courseId) || (!staffPreview && !isEnrolledIn(user.id, courseId))) {
    return NextResponse.json({ success: false }, { status: 403 });
  }
  return NextResponse.json({ success: true, sessions: listLiveSessions(courseId) });
}
