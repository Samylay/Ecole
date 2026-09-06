import type { Metadata } from "next";
import { getTeacher, teacherSlug } from "@/lib/data";
import { listPublicCourses } from "@/lib/server/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const publicCourses = listPublicCourses();
  const taught = publicCourses.filter((course) => teacherSlug(course.instructor.name) === slug);
  const teacher = taught.length > 0
    ? { instructor: taught[0].instructor }
    : getTeacher(slug);
  if (!teacher) return { title: "Enseignant introuvable" };
  return {
    title: teacher.instructor.name,
    description: teacher.instructor.bio.fr,
  };
}

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
