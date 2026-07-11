"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Trophy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { EmptyState } from "@/components/EmptyState";
import { ButtonLink } from "@/components/Button";
import { Segmented } from "@/components/Tabs";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { getCourse, getAllLessons, Course } from "@/lib/data";
import { getEnrolledCourseIds, getCompletedLessonIds, migrateLegacyProgress } from "@/lib/progress";

type TabValue = "inProgress" | "completed";
type EnrolledCourse = { course: Course; progress: number };

export default function MyCoursesPage() {
  const { t } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>("inProgress");
  const [enrolled, setEnrolled] = useState<EnrolledCourse[] | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    migrateLegacyProgress();
    const items = getEnrolledCourseIds()
      .map((id) => getCourse(id))
      .filter((c): c is Course => Boolean(c))
      .map((course) => {
        const total = getAllLessons(course).length;
        const done = getCompletedLessonIds(course.id).size;
        return { course, progress: total ? Math.round((done / total) * 100) : 0 };
      });
    setEnrolled(items);
  }, [user]);

  if (isLoading || !user || enrolled === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const inProgress = enrolled.filter((e) => e.progress < 100);
  const completed = enrolled.filter((e) => e.progress === 100);
  const visible = tab === "inProgress" ? inProgress : completed;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[22px] font-semibold text-ink">{t.myCourses.title}</h1>
          <Segmented
            options={[
              { value: "inProgress", label: t.myCourses.inProgress },
              { value: "completed", label: t.myCourses.completedTab },
            ]}
            value={tab}
            onChange={setTab}
            label={t.myCourses.title}
          />
        </div>

        <div className="mt-6">
          {visible.length === 0 ? (
            tab === "inProgress" ? (
              <EmptyState
                icon={<BookOpen className="h-6 w-6" />}
                title={t.myCourses.emptyInProgressTitle}
                body={t.myCourses.emptyInProgressBody}
                action={<ButtonLink href="/courses">{t.myCourses.browseCatalog}</ButtonLink>}
              />
            ) : (
              <EmptyState
                icon={<Trophy className="h-6 w-6" />}
                title={t.myCourses.emptyCompletedTitle}
                body={t.myCourses.emptyCompletedBody}
                action={<ButtonLink href="/courses">{t.myCourses.browseCatalog}</ButtonLink>}
              />
            )
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(({ course, progress }) => (
                <CourseCard key={course.id} course={course} progress={progress} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
