import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { listEnrollments, grantEnrollment } from "@/lib/server/db";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";
import { getCourse } from "@/lib/data";

// T7-1: server-authoritative enrolment. GET = the signed-in user's active
// enrolments (course ids). POST = self-enrol; while courses carry no price
// (pre-payments), self-enrolment stays free but now goes through the server
// so the enrollments table — not a forgeable client key — is the source of
// truth. When paid enrolment lands (T7-4), this route's free path dies.

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  const rows = listEnrollments(user.id);
  return NextResponse.json({ success: true, courseIds: rows.map((r) => r.course_id) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  if (isRateLimited(`enroll:${clientIp(request)}`, 20, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const body = (await request.json()) as { courseId?: unknown };
    if (typeof body.courseId !== "string" || body.courseId.length === 0 || body.courseId.length > 128) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const exists = getCourse(body.courseId) !== undefined;
    if (!exists) {
      return NextResponse.json({ success: false, error: "unknown_course" }, { status: 404 });
    }
    grantEnrollment(user.id, body.courseId, "self_free");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
