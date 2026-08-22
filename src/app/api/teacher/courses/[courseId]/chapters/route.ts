import { NextResponse } from "next/server";
import { createChapter } from "@/lib/server/content";
import { authorizeTeacher, contentError, validChapter } from "../../../_shared";

type Context = { params: Promise<{ courseId: string }> };
export async function POST(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validChapter(body, true)) throw new Error("invalid_request");
    const { courseId } = await context.params;
    return NextResponse.json({ success: true, chapter: createChapter(courseId, auth.user.id, body) }, { status: 201 });
  } catch (error) { return contentError(error); }
}
