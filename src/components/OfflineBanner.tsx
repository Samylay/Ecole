"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function OfflineBanner() {
  const { t } = useLocale();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const onOffline = () => setOffline(true);
    const onOnline = () => setOffline(false);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div role="status" className="flex items-center justify-center gap-2 bg-warning-soft px-4 py-2 text-[13px] font-medium text-warning">
      <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        {t.states.offlineBanner} {t.states.offlineDocsHint}
      </span>
    </div>
  );
}
