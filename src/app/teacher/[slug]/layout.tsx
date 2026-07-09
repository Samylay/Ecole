import type { Metadata } from "next";
import { getTeacher } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teacher = getTeacher(slug);
  if (!teacher) return { title: "Enseignant introuvable" };
  return {
    title: teacher.instructor.name,
    description: teacher.instructor.bio.fr,
  };
}

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
