import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Espace prof",
  description: "Crée et modifie tes cours, chapitres et leçons.",
};

export default function TeacherStudioLayout({ children }: { children: ReactNode }) {
  return children;
}
