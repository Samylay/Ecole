"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";

export default function TermsPage() {
  const { t } = useLocale();
  const sections = [
    [t.legal.terms.s1Title, t.legal.terms.s1Body],
    [t.legal.terms.s2Title, t.legal.terms.s2Body],
    [t.legal.terms.s3Title, t.legal.terms.s3Body],
    [t.legal.terms.s4Title, t.legal.terms.s4Body],
    [t.legal.terms.s5Title, t.legal.terms.s5Body],
    [t.legal.terms.s6Title, t.legal.terms.s6Body],
    [t.legal.terms.s7Title, t.legal.terms.s7Body],
    [t.legal.terms.s8Title, t.legal.terms.s8Body],
    [t.legal.terms.s9Title, t.legal.terms.s9Body],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-[30px] font-semibold leading-tight text-ink">{t.legal.terms.pageTitle}</h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-faint">{t.legal.lastUpdated}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-muted">{t.legal.terms.intro}</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map(([title, body]) => (
            <section key={title}>
              <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </section>
          ))}
        </div>

        <ButtonLink href="/" variant="secondary" className="mt-12">
          {t.legal.backToHome}
        </ButtonLink>
      </main>
      <Footer />
    </div>
  );
}
