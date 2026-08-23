import { NextResponse } from "next/server";
import { createLessonAnswer } from "@/lib/server/db";
import { authorizeLessonQa, numericId, plainText, scopedQuestion } from "../../_shared";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";

export async function POST(
  request: Request,
  context: { params: Promise<{ lessonId: string; questionId: string }> }
) {
  const { lessonId, questionId: rawQuestionId } = await context.params;
  if (isRateLimited(`lesson-qa-write:${clientIp(request)}`, 20, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  const auth = await authorizeLessonQa(request, lessonId);
  if ("error" in auth) return auth.error;
  if (!auth.enrolled && !auth.isStaff) return NextResponse.json({ success: false }, { status: 403 });
  const questionId = numericId(rawQuestionId);
  if (!questionId || !scopedQuestion(questionId, auth.courseId, auth.chapterId, lessonId)) {
    return NextResponse.json({ success: false, error: "question_not_found" }, { status: 404 });
  }
  try {
    const payload = (await request.json()) as { body?: unknown };
    const body = plainText(payload.body);
    if (!body) return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
    const id = createLessonAnswer(questionId, auth.user.id, body);
    return NextResponse.json(
      { success: true, id, authorRole: auth.isStaff ? auth.user.role : "student" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
