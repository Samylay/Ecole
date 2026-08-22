"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { pullServerState } from "@/lib/progress";

// T7-3 landing for emailed magic links: consumes the token, starts the
// session cookie, pulls server state, then sends the learner on their way.

export default function MagicLoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const [state, setState] = useState<"verifying" | "done" | "failed">("verifying");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setState("failed");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/auth/magic/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) {
          setState("failed");
          return;
        }
        const data = await res.json();
        if (data?.user?.email) await pullServerState(data.user.email as string);
        setState("done");
        router.replace("/dashboard");
      } catch {
        setState("failed");
      }
    })();
  }, [router]);

  const msg =
    state === "verifying"
      ? locale === "ar"
        ? "جارٍ تسجيل الدخول…"
        : locale === "en"
          ? "Signing you in…"
          : "Connexion en cours…"
      : state === "done"
        ? locale === "ar"
          ? "تم! جارٍ التحويل…"
          : locale === "en"
            ? "Done! Redirecting…"
            : "C'est fait ! Redirection…"
        : locale === "ar"
          ? "الرابط غير صالح أو منتهي. اطلب رابطاً جديداً."
          : locale === "en"
            ? "This link is invalid or expired. Request a new one."
            : "Ce lien est invalide ou expiré. Demande un nouveau lien.";


  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <p role="status" className="text-[17px] font-medium text-ink">
        {msg}
      </p>
    </main>
  );
}
