import { NextResponse } from "next/server";
import { deleteCourse, updateCourse } from "@/lib/server/content";
import { authorizeTeacher, contentError, validCourse } from "../../_shared";

type Context = { params: Promise<{ courseId: string }> };

export async function PUT(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validCourse(body, false)) throw new Error("invalid_request");
    const { courseId } = await context.params;
    return NextResponse.json({ success: true, course: updateCourse(courseId, auth.user.id, body) });
  } catch (error) { return contentError(error); }
}

export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const { courseId } = await context.params;
    deleteCourse(courseId, auth.user.id);
    return NextResponse.json({ success: true });
  } catch (error) { return contentError(error); }
}
