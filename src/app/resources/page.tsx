"use client";

import { FormEvent, useState } from "react";
import { BookOpen, Check, Download, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";

const PDF_URL = "/documents/fonctions-exponentielles-exercices.pdf";

export default function ResourcesPage() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validReferral = !referral || /^[A-Za-z0-9]{1,8}$/.test(referral);
    if (!validEmail) {
      setError(t.resources.validationEmail);
      return;
    }
    if (!validReferral) {
      setError(t.resources.validationReferral);
      return;
    }
    if (email && !consent) {
      setError(t.resources.consentLabel);
      return;
    }
    setError(null);
    setReady(true);
    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = "layaida-fonctions-exponentielles-exercices.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <section className="overflow-hidden bg-mist/40">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary">{t.resources.eyebrow}</p>
              <h1 className="mt-4 text-[30px] font-semibold leading-tight text-ink md:text-5xl">{t.resources.title}</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">{t.resources.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-[13px] text-muted">
                <span className="inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2 shadow-card"><ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />{t.resources.downloadHint}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-7" noValidate>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-input bg-primary-soft text-primary"><BookOpen className="h-6 w-6" aria-hidden="true" /></span>
                <div>
                  <h2 className="text-[17px] font-semibold text-ink">{t.resources.resourceTitle}</h2>
                  <p className="mt-0.5 text-[13px] text-muted">{t.resources.resourceDescription}</p>
                </div>
              </div>

              <div className="mt-7 border-t border-border-soft pt-5">
                <p className="text-[13px] font-semibold text-slate">{t.resources.optionalContact}</p>
                <div className="mt-3">
                  <Input id="resource-email" type="email" label={t.resources.emailLabel} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nom@exemple.com" autoComplete="email" />
                  <p className="mt-1.5 text-[13px] text-muted">{t.resources.emailHint}</p>
                </div>
                {email && (
                  <label className="mt-3 flex min-h-11 cursor-pointer items-start gap-3 rounded-input border border-border-soft p-3 text-[13px] text-slate">
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
                    <span>{t.resources.consentLabel}</span>
                  </label>
                )}
                <div className="mt-3">
                  <Input id="resource-referral" label={t.resources.referralLabel} value={referral} maxLength={8} onChange={(event) => setReferral(event.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 8))} />
                  <p className="mt-1.5 text-[13px] text-muted">{t.resources.referralHint}</p>
                </div>
              </div>

              {error && <p role="alert" className="mt-4 rounded-input bg-error-soft px-3 py-2 text-[13px] font-medium text-error">{error}</p>}
              {ready && <p role="status" className="mt-4 flex items-center gap-2 rounded-input bg-success-soft px-3 py-2 text-[13px] font-medium text-success"><Check className="h-4 w-4" aria-hidden="true" />{t.resources.readyTitle} · {t.resources.readyBody}</p>}
              <Button type="submit" className="mt-5 w-full"><Download className="h-5 w-5" aria-hidden="true" />{t.resources.download}</Button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">{t.resources.privacyNote}</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
