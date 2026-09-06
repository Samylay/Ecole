import { NextResponse } from "next/server";
import { createQuestion } from "@/lib/server/content";
import { authorizeTeacher, contentError, validQuestion } from "@/app/api/teacher/_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string }> };

export async function POST(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validQuestion(body, true)) throw new Error("invalid_request");
    const { courseId, chapterId } = await context.params;
    return NextResponse.json(
      { success: true, question: createQuestion(courseId, chapterId, auth.user.id, body) },
      { status: 201 }
    );
  } catch (error) {
    return contentError(error);
  }
}
