import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

// Tinted chip, radius 8. Pass token classes (e.g. subjectColors bg/text) via className.
export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-chip px-2 py-0.5 text-[13px] font-medium ${className}`}
    >
      {children}
    </span>
  );
}
