"use client";

import { useRef } from "react";
import { rovingTabIndexHandler } from "@/lib/rovingTabIndex";

// Segmented control (pill group) — used for tabs, locale/theme switchers, filters.
// variant "tabs" (default) is a view switcher (tablist/tab); "radiogroup" is a
// single choice among peers (locale, theme, level filter) and gets radiogroup/radio semantics.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = "",
  label,
  variant = "tabs",
  dir = "ltr",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  label?: string;
  variant?: "tabs" | "radiogroup";
  dir?: "ltr" | "rtl";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRole = variant === "tabs" ? "tab" : "radio";
  const onKeyDown = rovingTabIndexHandler(containerRef, `[role="${itemRole}"]`, (i) => onChange(options[i].value), dir);

  return (
    <div
      ref={containerRef}
      role={variant === "tabs" ? "tablist" : "radiogroup"}
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`inline-flex rounded-pill bg-mist p-1 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role={itemRole}
            aria-selected={variant === "tabs" ? active : undefined}
            aria-checked={variant === "radiogroup" ? active : undefined}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.value)}
            className={`min-h-9 rounded-pill px-4 text-[13px] font-medium transition-[background-color,color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
              active ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
