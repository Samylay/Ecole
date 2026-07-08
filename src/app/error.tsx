"use client";

import { AlertTriangle } from "lucide-react";
import { Button, ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-card bg-error-soft text-error">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-[30px] font-semibold leading-tight text-ink">{t.states.errorTitle}</h1>
      <p className="mt-3 max-w-md text-[15px] text-muted">{t.states.errorBody}</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>{t.states.errorRetry}</Button>
        <ButtonLink href="/" variant="secondary">
          {t.states.notFoundCta}
        </ButtonLink>
      </div>
    </div>
  );
}
