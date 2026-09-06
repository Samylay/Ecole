import { NextResponse } from "next/server";
import { deleteQuestion, updateQuestion } from "@/lib/server/content";
import { authorizeTeacher, contentError, validQuestion } from "@/app/api/teacher/_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string; questionId: string }> };

export async function PUT(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validQuestion(body, false)) throw new Error("invalid_request");
    const { courseId, chapterId, questionId } = await context.params;
    updateQuestion(courseId, chapterId, questionId, auth.user.id, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return contentError(error);
  }
}

export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const { courseId, chapterId, questionId } = await context.params;
    deleteQuestion(courseId, chapterId, questionId, auth.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return contentError(error);
  }
}
