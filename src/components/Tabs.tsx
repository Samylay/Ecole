"use client";

// Segmented control (pill group) — used for tabs, locale/theme switchers, filters.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = "",
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`inline-flex rounded-pill bg-mist p-1 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`min-h-9 rounded-pill px-4 text-[13px] font-medium transition-colors duration-[180ms] ${
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
