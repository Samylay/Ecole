"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "layaida_install_prompt_dismissed";

export function InstallPrompt() {
  const { t } = useLocale();
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY) === "true") return;

    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    const clearPrompt = () => setPromptEvent(null);

    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("appinstalled", clearPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", capturePrompt);
      window.removeEventListener("appinstalled", clearPrompt);
    };
  }, []);

  if (!promptEvent) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setPromptEvent(null);
  };

  const install = async () => {
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setPromptEvent(null);
  };

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-lg items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-modal"
      aria-labelledby="install-prompt-title"
    >
      <Download className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p id="install-prompt-title" className="text-[15px] font-semibold text-ink">
          {t.dataSaver.installTitle}
        </p>
        <p className="mt-0.5 text-[13px] text-muted">{t.dataSaver.installDescription}</p>
      </div>
      <button
        type="button"
        onClick={() => void install()}
        className="min-h-11 shrink-0 rounded-pill bg-primary px-4 text-[13px] font-semibold text-white shadow-primary transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-primary-hover active:scale-[0.98]"
      >
        {t.dataSaver.install}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.dataSaver.dismiss}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-muted transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </aside>
  );
}
