"use client";

import { LocaleProvider } from "@/lib/locale-context";
import { ProgressProvider } from "@/lib/progress-context";
import { NotificationToast } from "@/components/NotificationToast";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <ProgressProvider>
        {children}
        <NotificationToast />
        <ScrollToTop />
      </ProgressProvider>
    </LocaleProvider>
  );
}
