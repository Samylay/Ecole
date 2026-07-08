import { ReactNode } from "react";

// Empty states always suggest an action, per the design system.
export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-border bg-surface px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-pill bg-mist text-muted" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mt-4 text-[17px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-[15px] text-muted">{body}</p>
      {action && <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{action}</div>}
    </div>
  );
}
