"use client";

import { BookX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-card bg-primary-soft text-primary-hover dark:text-primary">
          <BookX className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-wide text-muted">404</p>
        <h1 className="mt-2 text-[30px] font-semibold leading-tight text-ink">{t.states.notFoundTitle}</h1>
        <p className="mt-3 text-[15px] text-muted">{t.states.notFoundBody}</p>
        <ButtonLink href="/" className="mt-8">
          {t.states.notFoundCta}
        </ButtonLink>
      </main>
      <Footer />
    </div>
  );
}
