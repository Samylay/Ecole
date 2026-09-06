import { NextResponse } from "next/server";
import { createDocument } from "@/lib/server/content";
import { authorizeTeacher, contentError, validDocument } from "@/app/api/teacher/_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string; lessonId: string }> };

export async function POST(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validDocument(body)) throw new Error("invalid_request");
    const { courseId, chapterId, lessonId } = await context.params;
    const id = createDocument(courseId, chapterId, lessonId, auth.user.id, body);
    return NextResponse.json({ success: true, document: { id, ...body } }, { status: 201 });
  } catch (error) {
    return contentError(error);
  }
}
