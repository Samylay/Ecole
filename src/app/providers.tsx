"use client";

import { useEffect } from "react";
import { LocaleProvider } from "@/lib/locale-context";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ToastProvider } from "@/components/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { OfflineBanner } from "@/components/OfflineBanner";
import { ContentProvider } from "@/lib/content-context";

// Registers the offline document cache (P3-T3); no-op if unsupported.
function useDocumentServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // registration is best-effort — offline caching just won't kick in
      });
    }
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useDocumentServiceWorker();
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LocaleProvider>
          <AuthProvider>
            <ContentProvider>
              <ToastProvider>
                <OfflineBanner />
                {children}
              </ToastProvider>
            </ContentProvider>
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
