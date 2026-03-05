"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { courses } from "@/lib/data";
import Link from "next/link";

export default function MyCoursesPage() {
  const { t } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Mock: show first 2 courses as "enrolled"
  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.nav.myCourses}</h1>
          <p className="text-gray-500">
            {t.auth.welcome}, <span className="font-medium text-gray-900">{user.name}</span>
          </p>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                {/* Progress overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-b-xl px-4 py-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">{t.course.progress}</span>
                    <span className="font-medium text-indigo-600">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-gray-500 text-lg">No enrolled courses yet</p>
            <Link href="/" className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-700">
              {t.home.hero.cta}
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
