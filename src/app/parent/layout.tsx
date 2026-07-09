import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace parent",
  description: "Suivez les progrès de votre enfant : cours suivis, temps d'étude et résultats aux quiz.",
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
