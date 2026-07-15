"use client";

import { ReactNode, useRef } from "react";
import { useOverlay } from "@/lib/useOverlay";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlay(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="modal-enter relative w-full max-w-sm rounded-card bg-surface p-6 shadow-modal outline-none"
      >
        <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
