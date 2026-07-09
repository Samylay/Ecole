import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Suivez votre progression, votre série de jours actifs et vos prochaines leçons recommandées.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
