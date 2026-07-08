"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  const links = [
    { href: "#", label: t.footer.about },
    { href: "#", label: t.footer.contact },
    { href: "#", label: t.footer.terms },
    { href: "#", label: t.footer.privacy },
  ];

  return (
    <footer className="mt-auto bg-ink text-bg dark:bg-surface dark:text-ink" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-chip bg-surface p-0.5" />
            <div>
              <span className="block text-[17px] font-semibold lowercase">layaida</span>
              <span className="block text-[13px] text-faint">{t.footer.tagline}</span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-faint transition-colors duration-[180ms] hover:text-bg dark:hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-faint/30 pt-6 text-[13px] text-faint">
          © {new Date().getFullYear()} Layaida
        </p>
      </div>
    </footer>
  );
}
