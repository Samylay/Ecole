"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/lib/locale-context";
import { instructors, subjectColors, subjectIcons } from "@/lib/data";

export default function InstructorsPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">{t.nav.home}</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{t.instructor.title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">{t.instructor.title}</h1>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, idx) => {
            const colors = subjectColors[instructor.expertise];
            const icon = subjectIcons[instructor.expertise];
            const subjectName = t.subjects[instructor.expertise];

            return (
              <Link
                key={instructor.id}
                href={`/instructor/${instructor.id}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "both" }}
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Avatar Header */}
                  <div className={`${colors.accent} h-32 flex items-center justify-center relative`}>
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm">
                      {instructor.avatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-lg">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className={`${colors.bg} ${colors.text} text-xs font-semibold px-2 py-1 rounded-full`}>
                        {icon} {subjectName}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= Math.floor(instructor.rating) ? "text-yellow-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700 ml-1">{instructor.rating}</span>
                    </div>

                    <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{instructor.courseCount}</p>
                        <p>{t.instructor.courses}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{instructor.studentCount.toLocaleString()}</p>
                        <p>{t.instructor.students}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-indigo-600 text-sm font-medium group-hover:underline">
                        {t.instructor.viewProfile}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
