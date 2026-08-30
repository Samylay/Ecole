import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Layaida collecte, utilise et protège vos données.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
