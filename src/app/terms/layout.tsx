import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Les conditions générales d'utilisation de la plateforme Layaida.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
