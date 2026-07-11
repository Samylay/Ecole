"use client";

// Rare, meaningful-event checkmark (lesson complete, quiz passed) — SVG
// stroke draw-in + scale/opacity entrance, driven by the `celebration-*`
// keyframes in globals.css (all ≤300ms combined, transform/opacity/stroke
// only, killed by the global prefers-reduced-motion block).
export function CelebrationCheck({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      className="celebration-check"
      aria-hidden="true"
    >
      <circle className="celebration-check-circle" cx="26" cy="26" r="23" fill="none" strokeWidth="3" />
      <path className="celebration-check-mark" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 17-17" />
    </svg>
  );
}
