import type { Metadata } from "next";
import { getCourse } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) return { title: "Cours introuvable" };
  return {
    title: course.title.fr,
    description: course.description.fr,
  };
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
