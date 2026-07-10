"use client";

// Progress trio per the design system: ring for identity moments (dashboard),
// bar for lists, segments for weekly goals. Bars fill from inline-start.

export function ProgressBar({
  value,
  className = "",
  barClassName = "bg-primary",
  label,
}: {
  value: number; // 0..100
  className?: string;
  barClassName?: string;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-1.5 w-full overflow-hidden rounded-pill bg-mist ${className}`}
    >
      <div
        className={`h-full w-full origin-left rounded-pill transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)] ${barClassName}`}
        style={{ transform: `scaleX(${clamped / 100})` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 72,
  strokeWidth = 6,
  className = "",
  colorClassName = "text-primary",
  children,
  label,
}: {
  value: number; // 0..100
  size?: number;
  strokeWidth?: number;
  className?: string;
  colorClassName?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-mist"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`stroke-current transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none ${colorClassName}`}
        />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  );
}

export function ProgressSegments({
  total,
  done,
  className = "",
  label,
}: {
  total: number;
  done: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`flex gap-1.5 ${className}`}
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={label}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-pill transition-colors duration-[var(--duration-base)] ${
            i < done ? "bg-primary" : "bg-mist"
          }`}
        />
      ))}
    </div>
  );
}
