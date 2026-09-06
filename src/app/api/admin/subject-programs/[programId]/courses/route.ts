import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { linkCourseToSubjectProgram } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

export async function POST(request: Request, { params }: { params: Promise<{ programId: string }> }) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") {
    return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
  }
  if (isRateLimited(`admin-subject-program-courses:${admin.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  const { programId } = await params;
  try {
    const body = (await request.json()) as { courseId?: unknown };
    if (typeof body.courseId !== "string" || body.courseId.length === 0 || body.courseId.length > 128) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    linkCourseToSubjectProgram(programId, body.courseId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "invalid_request";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
