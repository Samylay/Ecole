import { NextResponse } from "next/server";
import { assertDocumentScope, deleteDocument, updateDocument } from "@/lib/server/content";
import { authorizeTeacher, contentError, validDocument } from "@/app/api/teacher/_shared";

type Context = { params: Promise<{ courseId: string; chapterId: string; lessonId: string; documentId: string }> };

function numericId(value: string): number {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("document_not_found");
  return id;
}

export async function PUT(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validDocument(body)) throw new Error("invalid_request");
    const { courseId, chapterId, lessonId, documentId } = await context.params;
    const id = numericId(documentId);
    assertDocumentScope(courseId, chapterId, lessonId, id, auth.user.id);
    updateDocument(courseId, id, auth.user.id, body);
    return NextResponse.json({ success: true, document: { id, ...body } });
  } catch (error) {
    return contentError(error);
  }
}

export async function DELETE(request: Request, context: Context) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const { courseId, chapterId, lessonId, documentId } = await context.params;
    const id = numericId(documentId);
    assertDocumentScope(courseId, chapterId, lessonId, id, auth.user.id);
    deleteDocument(courseId, id, auth.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return contentError(error);
  }
}
