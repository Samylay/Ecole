import { NextResponse } from "next/server";
import { createCourse, listCoursesForOwner } from "@/lib/server/content";
import { authorizeTeacher, contentError, validCourse } from "../_shared";

export async function GET(request: Request) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  return NextResponse.json({ success: true, courses: listCoursesForOwner(auth.user.id) });
}

export async function POST(request: Request) {
  const auth = await authorizeTeacher(request);
  if ("error" in auth) return auth.error;
  try {
    const body = await request.json();
    if (!validCourse(body, true)) throw new Error("invalid_request");
    return NextResponse.json({ success: true, course: createCourse(auth.user.id, body) }, { status: 201 });
  } catch (error) {
    return contentError(error);
  }
}
