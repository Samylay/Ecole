import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes cours",
  description: "Retrouvez les cours auxquels vous êtes inscrit et reprenez où vous vous étiez arrêté.",
};

export default function MyCoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
