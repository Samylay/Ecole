"use client";

import { InputHTMLAttributes, ReactNode, useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
};

export function Input({ label, error, icon, className = "", id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-medium text-slate">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-faint" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-input border-[1.5px] bg-surface px-4 text-[15px] text-ink placeholder:text-faint transition-colors duration-[var(--duration-base)] focus:outline-none ${
            icon ? "ps-11" : ""
          } ${
            error
              ? "border-error focus:border-error focus:ring-[3px] focus:ring-error-soft"
              : "border-mist focus:border-primary focus:ring-[3px] focus:ring-primary-soft"
          } ${className}`}
          {...rest}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
