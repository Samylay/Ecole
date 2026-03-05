"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { getLesson, getAllLessons } from "@/lib/data";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const { locale, t } = useLocale();
  const [completed, setCompleted] = useState(false);

  const result = getLesson(courseId, lessonId);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
          <Link href="/" className="text-indigo-600 mt-4 inline-block">Go home</Link>
        </div>
      </div>
    );
  }

  const { lesson, course } = result;
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Link href={`/course/${courseId}`} className="hover:text-white transition-colors">
            {course.title[locale]}
          </Link>
          <span>/</span>
          <span className="text-white">{lesson.title[locale]}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title[locale]}
              />
            </div>

            {/* Lesson Info */}
            <div className="mt-6 bg-gray-800 rounded-xl p-6">
              <h1 className="text-2xl font-bold text-white">{lesson.title[locale]}</h1>
              <p className="text-gray-400 mt-2">{lesson.description[locale]}</p>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => setCompleted(!completed)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {completed ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.lesson.markedComplete}
                    </>
                  ) : (
                    t.lesson.markComplete
                  )}
                </button>
              </div>

              {/* Documents */}
              {lesson.documents && lesson.documents.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h3 className="text-white font-semibold mb-3">{t.lesson.resources}</h3>
                  <div className="space-y-2">
                    {lesson.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-300 text-sm">{doc.name}</span>
                        </div>
                        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                          {t.course.downloadPdf}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-700">
                {prevLesson ? (
                  <Link
                    href={`/course/${courseId}/lesson/${prevLesson.id}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t.lesson.previous}
                  </Link>
                ) : <div />}
                {nextLesson ? (
                  <Link
                    href={`/course/${courseId}/lesson/${nextLesson.id}`}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    {t.lesson.next}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </div>

          {/* Sidebar: Course Outline */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl overflow-hidden sticky top-20">
              <div className="px-4 py-3 bg-gray-700">
                <Link href={`/course/${courseId}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.lesson.backToCourse}
                </Link>
                <h2 className="text-white font-semibold mt-1 text-sm">{course.title[locale]}</h2>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <div className="px-4 py-2 bg-gray-750 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {chapter.title[locale]}
                    </div>
                    {chapter.lessons.map((l) => (
                      <Link
                        key={l.id}
                        href={`/course/${courseId}/lesson/${l.id}`}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          l.id === lessonId
                            ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="truncate">{l.title[locale]}</span>
                        <span className="text-xs text-gray-500 ml-auto flex-shrink-0">{l.duration}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
