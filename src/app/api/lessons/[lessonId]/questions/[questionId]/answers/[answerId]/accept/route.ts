import { NextResponse } from "next/server";
import { acceptLessonAnswer } from "@/lib/server/db";
import { authorizeLessonQa, numericId, scopedQuestion } from "../../../../_shared";

export async function POST(
  request: Request,
  context: { params: Promise<{ lessonId: string; questionId: string; answerId: string }> }
) {
  const { lessonId, questionId: rawQuestionId, answerId: rawAnswerId } = await context.params;
  const auth = await authorizeLessonQa(request, lessonId);
  if ("error" in auth) return auth.error;
  const questionId = numericId(rawQuestionId);
  const answerId = numericId(rawAnswerId);
  const question = questionId
    ? scopedQuestion(questionId, auth.courseId, auth.chapterId, lessonId)
    : null;
  if (!question || !answerId) {
    return NextResponse.json({ success: false, error: "answer_not_found" }, { status: 404 });
  }
  if (question.user_id !== auth.user.id && !auth.isStaff) {
    return NextResponse.json({ success: false }, { status: 403 });
  }
  if (!acceptLessonAnswer(question.id, answerId)) {
    return NextResponse.json({ success: false, error: "answer_not_found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
