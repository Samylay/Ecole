import { NextResponse } from "next/server";
import { createLesson } from "@/lib/server/content";
import { authorizeTeacher, contentError, validLesson } from "../../../../../_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string }> };
export async function POST(request: Request, context: Context) {
  const auth = await authorizeTeacher(request); if ("error" in auth) return auth.error;
  try {
    const body = await request.json(); if (!validLesson(body, true)) throw new Error("invalid_request");
    const { courseId, chapterId } = await context.params;
    return NextResponse.json({ success: true, lesson: createLesson(courseId, chapterId, auth.user.id, body) }, { status: 201 });
  } catch (error) { return contentError(error); }
}
