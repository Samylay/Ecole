import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienvenue",
  description: "Choisissez votre niveau, vos matières et vos objectifs pour personnaliser votre parcours.",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
