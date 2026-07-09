import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Rejoignez Layaida pour apprendre les mathématiques, la physique et la biologie.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
