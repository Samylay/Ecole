import { Skeleton, CourseCardSkeleton } from "@/components/Skeleton";

export default function MyCoursesLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-10 w-48 rounded-pill" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
