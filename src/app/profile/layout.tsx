import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil",
  description: "Gérez votre langue, votre mot de passe et vos préférences de notification.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
