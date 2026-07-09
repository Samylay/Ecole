import { Skeleton, CourseCardSkeleton } from "@/components/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-8 w-24 rounded-pill" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-card" />
            <Skeleton className="h-28 w-full rounded-card" />
            <Skeleton className="h-40 w-full rounded-card" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-44 w-full rounded-card" />
            <Skeleton className="h-24 w-full rounded-card" />
            <Skeleton className="h-40 w-full rounded-card" />
          </div>
        </div>
      </main>
    </div>
  );
}
