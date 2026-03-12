"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";
import { courses, getAllLessons } from "@/lib/data";
import Link from "next/link";

export default function MyCoursesPage() {
  const { t } = useLocale();
  const { enrolledCourses, getCompletedLessonCount } = useProgress();

  const enrolled = courses.filter((c) => enrolledCourses[c.id]?.enrolled);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.nav.myCourses}</h1>
        <p className="text-gray-500 mb-8">
          {enrolled.length} {t.nav.courses.toLowerCase()}
        </p>

        {enrolled.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolled.map((course) => {
              const allLessons = getAllLessons(course);
              const completedCount = getCompletedLessonCount(course.id);
              const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

              return (
                <div key={course.id} className="relative animate-fade-in-up">
                  <CourseCard course={course} />
                  {/* Progress overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-b-xl px-4 py-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">{t.course.progress}</span>
                      <span className="font-medium text-indigo-600">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {completedCount}/{allLessons.length} {t.course.lessons}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <svg className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{t.dashboard.noActivity}</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {t.courses.noResultsDesc}
            </p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              {t.home.hero.cta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
