"use client";

import { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/lib/locale-context";
import { getCourse, subjectColors, subjectIcons, getAllLessons } from "@/lib/data";
import { useState } from "react";

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { locale, t } = useLocale();
  const [enrolled, setEnrolled] = useState(false);
  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
          <Link href="/" className="text-indigo-600 mt-4 inline-block">Go home</Link>
        </div>
      </div>
    );
  }

  const colors = subjectColors[course.subject];
  const allLessons = getAllLessons(course);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Course Header */}
      <section className={`${colors.accent} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 text-sm px-3 py-1 rounded-full">
                  {subjectIcons[course.subject]} {t.subjects[course.subject]}
                </span>
                <span className="bg-white/20 text-sm px-3 py-1 rounded-full">
                  {t.levels[course.level]}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{course.title[locale]}</h1>
              <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-2xl">
                {course.description[locale]}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                  {course.instructor.name[0]}
                </div>
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-white/70 text-sm">{course.instructor.bio[locale]}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-6 mt-6 text-white/80">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {course.totalLessons} {t.course.lessons}
                </span>
                <span>{course.totalHours} {t.course.hours}</span>
                <span>{course.studentCount.toLocaleString()} {t.course.students}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating}
                </span>
              </div>
            </div>

            {/* Enroll Card */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl p-6 text-gray-900 shadow-lg">
                {enrolled ? (
                  <>
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t.course.enrolled}
                      </span>
                    </div>
                    <Link
                      href={`/course/${course.id}/lesson/${allLessons[0]?.id}`}
                      className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {t.course.startLearning}
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setEnrolled(true)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {t.course.enrollFree}
                  </button>
                )}
                <div className="mt-4 text-sm text-gray-500 space-y-2">
                  <div className="flex justify-between">
                    <span>{t.course.level}</span>
                    <span className="font-medium text-gray-700">{t.levels[course.level]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.course.lessons}</span>
                    <span className="font-medium text-gray-700">{course.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.course.hours}</span>
                    <span className="font-medium text-gray-700">{course.totalHours}h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.course.curriculum}</h2>
        <div className="space-y-4">
          {course.chapters.map((chapter, chIdx) => (
            <div key={chapter.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {chIdx + 1}. {chapter.title[locale]}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {chapter.lessons.length} {t.course.lessons}
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {chapter.lessons.map((lesson, lIdx) => (
                  <Link
                    key={lesson.id}
                    href={enrolled ? `/course/${course.id}/lesson/${lesson.id}` : "#"}
                    className={`flex items-center gap-4 px-6 py-4 ${enrolled ? "hover:bg-gray-50 cursor-pointer" : "opacity-75 cursor-default"} transition-colors`}
                    onClick={(e) => { if (!enrolled) e.preventDefault(); }}
                  >
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {lIdx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{lesson.title[locale]}</p>
                      <p className="text-sm text-gray-500 truncate">{lesson.description[locale]}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 flex-shrink-0">
                      {lesson.documents && lesson.documents.length > 0 && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      <span>{lesson.duration}</span>
                      {!enrolled && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
