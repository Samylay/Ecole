"use client";

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

type ToastAction = { label: string; onClick: () => void };
type ToastItem = { id: number; message: string; action?: ToastAction };

type ToastContextType = {
  showToast: (message: string, action?: ToastAction) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

// Ink pill, bottom center, 4s, optional action — per the design system.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, action?: ToastAction) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-pill bg-ink px-5 py-3 text-[13px] font-medium text-bg shadow-modal"
          >
            <span>{toast.message}</span>
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                }}
                className="font-semibold text-primary-soft underline underline-offset-2 dark:text-primary"
              >
                {toast.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
