import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import {
  createSubjectProgram,
  listAccessPlans,
  listSubjectProgramCourseIds,
  listSubjectPrograms,
} from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

async function requireAdmin(request: Request, action: string) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") return { error: "forbidden" as const };
  if (isRateLimited(`${action}:${admin.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return { error: "rate_limited" as const };
  }
  return { admin };
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request, "admin-subject-programs-list");
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.error === "forbidden" ? 403 : 429 });
  }
  const programs = listSubjectPrograms().map((program) => ({
    ...program,
    plans: listAccessPlans(program.id),
    courseIds: listSubjectProgramCourseIds(program.id),
  }));
  return NextResponse.json({ success: true, programs });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request, "admin-subject-programs-create");
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.error === "forbidden" ? 403 : 429 });
  }
  try {
    const body = (await request.json()) as {
      id?: unknown;
      subject?: unknown;
      level?: unknown;
      academicYear?: unknown;
      stream?: unknown;
      titleFr?: unknown;
      titleEn?: unknown;
      titleAr?: unknown;
    };
    if (
      typeof body.id !== "string" || !/^[a-z0-9-]{2,64}$/.test(body.id) ||
      typeof body.subject !== "string" || body.subject.length === 0 || body.subject.length > 64 ||
      (body.level !== "middle" && body.level !== "high") ||
      typeof body.titleFr !== "string" || body.titleFr.trim().length === 0 ||
      typeof body.titleEn !== "string" || body.titleEn.trim().length === 0 ||
      typeof body.titleAr !== "string" || body.titleAr.trim().length === 0
    ) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const program = createSubjectProgram({
      id: body.id,
      subject: body.subject,
      level: body.level,
      academicYear: typeof body.academicYear === "string" && body.academicYear.trim() ? body.academicYear.trim() : undefined,
      stream: typeof body.stream === "string" && body.stream.trim() ? body.stream.trim() : null,
      title_fr: body.titleFr.trim(),
      title_en: body.titleEn.trim(),
      title_ar: body.titleAr.trim(),
    });
    return NextResponse.json({ success: true, program: { ...program, plans: [], courseIds: [] } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "id_taken_or_invalid" }, { status: 409 });
  }
}
