import { NextResponse } from "next/server";
import { createLessonQuestion, listLessonQuestions } from "@/lib/server/db";
import { authorizeLessonQa, plainText, QA_PAGE_SIZE } from "./_shared";

export async function GET(request: Request, context: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await context.params;
  const auth = await authorizeLessonQa(request, lessonId);
  if ("error" in auth) return auth.error;
  const url = new URL(request.url);
  const parsedOffset = Number(url.searchParams.get("offset") ?? "0");
  const offset = Number.isSafeInteger(parsedOffset) && parsedOffset >= 0 && parsedOffset <= 10_000 ? parsedOffset : 0;
  const unansweredOnly = auth.isStaff && url.searchParams.get("unanswered") === "1";
  const page = listLessonQuestions(
    auth.courseId,
    auth.chapterId,
    lessonId,
    QA_PAGE_SIZE,
    offset,
    unansweredOnly
  );
  return NextResponse.json({
    success: true,
    questions: page.questions.map((question) => ({
      id: question.id,
      author_name: question.author_name,
      author_role: question.author_role,
      body: question.body,
      created_at: question.created_at,
      answers: question.answers.map((answer) => ({
        id: answer.id,
        question_id: answer.question_id,
        author_name: answer.author_name,
        author_role: answer.author_role,
        body: answer.body,
        created_at: answer.created_at,
        accepted: answer.accepted,
      })),
      canAccept: auth.isStaff || question.user_id === auth.user.id,
    })),
    hasMore: page.hasMore,
    nextOffset: offset + page.questions.length,
  });
}

export async function POST(request: Request, context: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await context.params;
  const auth = await authorizeLessonQa(request, lessonId, { enrolledOnly: true });
  if ("error" in auth) return auth.error;
  if (!auth.enrolled) return NextResponse.json({ success: false }, { status: 403 });
  try {
    const payload = (await request.json()) as { body?: unknown };
    const body = plainText(payload.body);
    if (!body) return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
    const id = createLessonQuestion(auth.user.id, auth.courseId, auth.chapterId, lessonId, body);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
