"use client";

import { useId } from "react";
import { Locale } from "@/lib/i18n";

export type LocalizedValue = { fr: string; en: string; ar: string };

const LOCALES: { code: Locale; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

/**
 * One label, three inputs: the trilingual rule is enforced by the type system
 * server-side, so the editor makes all three locales impossible to forget.
 */
export function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
  required = true,
}: {
  label: string;
  value: LocalizedValue;
  onChange: (next: LocalizedValue) => void;
  multiline?: boolean;
  required?: boolean;
}) {
  const baseId = useId();
  const inputClass =
    "w-full rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink placeholder:text-faint transition-colors duration-[var(--duration-base)] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft";

  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-[13px] font-medium text-slate">{label}</legend>
      <div className="space-y-2">
        {LOCALES.map(({ code, label: tag }) => (
          <div key={code} className="flex items-start gap-2">
            <label
              htmlFor={`${baseId}-${code}`}
              className="mt-2.5 w-8 shrink-0 font-mono text-[11px] font-medium text-faint"
            >
              {tag}
            </label>
            {multiline ? (
              <textarea
                id={`${baseId}-${code}`}
                dir={code === "ar" ? "rtl" : "ltr"}
                rows={2}
                required={required}
                value={value[code]}
                onChange={(event) => onChange({ ...value, [code]: event.target.value })}
                className={`${inputClass} py-2.5`}
              />
            ) : (
              <input
                id={`${baseId}-${code}`}
                dir={code === "ar" ? "rtl" : "ltr"}
                required={required}
                value={value[code]}
                onChange={(event) => onChange({ ...value, [code]: event.target.value })}
                className={`${inputClass} h-11`}
              />
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}
