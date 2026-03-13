import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Layaida - Apprends mieux, réussis plus",
    template: "%s | Layaida",
  },
  description: "Plateforme d'apprentissage pour le collège et le lycée. Cours de maths, physique et biologie.",
  keywords: ["éducation", "cours en ligne", "mathématiques", "physique", "biologie", "collège", "lycée"],
  authors: [{ name: "Layaida" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Layaida",
    title: "Layaida - Apprends mieux, réussis plus",
    description: "Plateforme d'apprentissage pour le collège et le lycée.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
