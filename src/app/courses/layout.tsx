import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue de cours",
  description: "Parcourez les cours de mathématiques, physique et biologie pour le collège et le lycée.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
