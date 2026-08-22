import { NextResponse } from "next/server";
import { deleteLesson, updateLesson } from "@/lib/server/content";
import { authorizeTeacher, contentError, validLesson } from "../../../../../../_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string; lessonId: string }> };
export async function PUT(request: Request, context: Context) {
  const auth = await authorizeTeacher(request); if ("error" in auth) return auth.error;
  try {
    const body = await request.json(); if (!validLesson(body, false)) throw new Error("invalid_request");
    const { courseId, chapterId, lessonId } = await context.params;
    return NextResponse.json({ success: true, lesson: updateLesson(courseId, chapterId, lessonId, auth.user.id, body) });
  } catch (error) { return contentError(error); }
}
export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeTeacher(request); if ("error" in auth) return auth.error;
  try { const { courseId, chapterId, lessonId } = await context.params; deleteLesson(courseId, chapterId, lessonId, auth.user.id); return NextResponse.json({ success: true }); }
  catch (error) { return contentError(error); }
}
