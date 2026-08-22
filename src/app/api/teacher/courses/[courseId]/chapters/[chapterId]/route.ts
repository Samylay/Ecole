import { NextResponse } from "next/server";
import { deleteChapter, updateChapter } from "@/lib/server/content";
import { authorizeTeacher, contentError, validChapter } from "../../../../_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string }> };
export async function PUT(request: Request, context: Context) {
  const auth = await authorizeTeacher(request); if ("error" in auth) return auth.error;
  try {
    const body = await request.json(); if (!validChapter(body, false)) throw new Error("invalid_request");
    const { courseId, chapterId } = await context.params;
    return NextResponse.json({ success: true, chapter: updateChapter(courseId, chapterId, auth.user.id, body) });
  } catch (error) { return contentError(error); }
}
export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeTeacher(request); if ("error" in auth) return auth.error;
  try { const { courseId, chapterId } = await context.params; deleteChapter(courseId, chapterId, auth.user.id); return NextResponse.json({ success: true }); }
  catch (error) { return contentError(error); }
}
