import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Layaida - Apprends mieux, réussis plus",
    template: "%s | Layaida",
  },
  description: "Plateforme d'apprentissage pour le collège et le lycée. Cours de maths, physique et biologie.",
  keywords: ["éducation", "cours en ligne", "mathématiques", "physique", "biologie", "collège", "lycée"],
  authors: [{ name: "Layaida" }],
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Layaida",
    title: "Layaida - Apprends mieux, réussis plus",
    description: "Plateforme d'apprentissage pour le collège et le lycée.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Layaida" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5B5BD6",
};

// Applies the persisted (or system) theme before first paint to avoid a flash.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("layaida_theme");
    var dark = t === "dark" || ((t === null || t === "system") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
    var l = localStorage.getItem("layaida_locale");
    if (l === "ar") { document.documentElement.lang = "ar"; document.documentElement.dir = "rtl"; }
    else if (l === "en" || l === "fr") { document.documentElement.lang = l; }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
