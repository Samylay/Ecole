export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton rounded-chip ${className}`} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
