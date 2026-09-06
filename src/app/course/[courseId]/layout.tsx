import type { Metadata } from "next";
import { getStudentCourse } from "@/lib/server/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = getStudentCourse(courseId);
  if (!course) return { title: "Cours introuvable" };
  return {
    title: course.title.fr,
    description: course.description.fr,
  };
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
