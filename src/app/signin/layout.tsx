import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte Layaida pour reprendre vos cours.",
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return children;
}
