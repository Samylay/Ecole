"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-[background-color,color,box-shadow,opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] disabled:active:scale-100 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-primary hover:bg-primary-hover disabled:bg-mist disabled:text-faint disabled:shadow-none",
  secondary:
    "bg-primary-soft text-primary-hover hover:bg-primary hover:text-white disabled:bg-mist disabled:text-faint",
  ghost: "bg-transparent text-slate hover:bg-mist disabled:text-faint",
  danger: "bg-error text-white hover:opacity-90 disabled:bg-mist disabled:text-faint",
};

// 44px floor on default buttons keeps mobile touch targets; sm is desktop-only contexts.
const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[15px]",
  sm: "h-9 px-4 text-[13px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export function Button({ variant = "primary", size = "md", loading, className = "", children, disabled, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} disabled={disabled || loading} {...rest}>
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
