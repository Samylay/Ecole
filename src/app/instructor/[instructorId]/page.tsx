"use client";

import { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { getInstructor, getCoursesByInstructor, subjectColors, subjectIcons } from "@/lib/data";

export default function InstructorPage({ params }: { params: Promise<{ instructorId: string }> }) {
  const { instructorId } = use(params);
  const { locale, t } = useLocale();
  const instructor = getInstructor(instructorId);

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.course.notFound}</h1>
          <Link href="/instructors" className="text-indigo-600 mt-4 inline-block">
            {t.instructor.allInstructors}
          </Link>
        </div>
      </div>
    );
  }

  const instructorCourses = getCoursesByInstructor(instructorId);
  const colors = subjectColors[instructor.expertise];
  const icon = subjectIcons[instructor.expertise];
  const subjectName = t.subjects[instructor.expertise];

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
            <Link href="/instructors" className="hover:text-indigo-600 transition-colors">{t.instructor.title}</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{instructor.name}</span>
          </nav>
        </div>
      </div>

      {/* Profile Header */}
      <section className={`${colors.accent} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 animate-fade-in-up">
            {/* Avatar */}
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold text-white backdrop-blur-sm flex-shrink-0">
              {instructor.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-start">
              <h1 className="text-3xl md:text-4xl font-bold">{instructor.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <span className="bg-white/20 text-sm px-3 py-1 rounded-full">
                  {icon} {subjectName}
                </span>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <h2 className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">{t.instructor.bio}</h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                  {instructor.bio[locale]}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 text-white/80">
                <div className="text-center md:text-start">
                  <p className="text-2xl font-bold text-white">{instructor.courseCount}</p>
                  <p className="text-sm">{t.instructor.courses}</p>
                </div>
                <div className="text-center md:text-start">
                  <p className="text-2xl font-bold text-white">{instructor.studentCount.toLocaleString()}</p>
                  <p className="text-sm">{t.instructor.students}</p>
                </div>
                <div className="text-center md:text-start">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-white">{instructor.rating}</span>
                  </div>
                  <p className="text-sm">{t.instructor.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor's Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.instructor.courses}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course, idx) => (
            <div
              key={course.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "both" }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
