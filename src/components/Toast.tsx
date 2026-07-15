"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from "react";

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
          <ToastRow
            key={toast.id}
            toast={toast}
            onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Enter transition on mount — plain CSS transition, no keyframes: render
// translateY(4px)+opacity-0, then flip to the resting state a frame later.
function ToastRow({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 rounded-pill bg-ink px-5 py-3 text-[13px] font-medium text-bg shadow-modal transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] ${
        entered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
    >
      <span>{toast.message}</span>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onDismiss();
          }}
          className="font-semibold text-primary-soft underline underline-offset-2 dark:text-primary"
        >
          {toast.action.label}
        </button>
      )}
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
