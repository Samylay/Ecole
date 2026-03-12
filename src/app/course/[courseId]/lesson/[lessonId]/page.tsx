"use client";

import { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";
import { getLesson, getAllLessons } from "@/lib/data";
import { getQuiz } from "@/lib/quiz-data";
import { QuizComponent } from "@/components/QuizComponent";
import { LessonNotes } from "@/components/LessonNotes";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const { locale, t } = useLocale();
  const { completeLesson, isLessonCompleted, isEnrolled, getCompletedLessonCount } = useProgress();

  const result = getLesson(courseId, lessonId);
  const enrolled = isEnrolled(courseId);
  const completed = isLessonCompleted(courseId, lessonId);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.lesson.notFound}</h1>
          <Link href="/" className="text-indigo-600 mt-4 inline-block">{t.course.goHome}</Link>
        </div>
      </div>
    );
  }

  const { lesson, course } = result;
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const completedCount = getCompletedLessonCount(courseId);
  const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
  const quiz = getQuiz(courseId, lessonId);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Progress bar at top */}
      {enrolled && (
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
            <span className="text-xs text-gray-400">{t.course.progress}</span>
            <div className="flex-1 bg-gray-700 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs text-gray-400 font-medium">{progressPercent}%</span>
          </div>
        </div>
      )}

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
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video animate-fade-in">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title[locale]}
              />
            </div>

            {/* Lesson Info */}
            <div className="mt-6 bg-gray-800 rounded-xl p-6 animate-fade-in-up">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">{lesson.title[locale]}</h1>
                  <p className="text-gray-400 mt-2">{lesson.description[locale]}</p>
                </div>
                <span className="text-sm text-gray-500 flex-shrink-0">{lesson.duration}</span>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => completeLesson(courseId, lessonId)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all active:scale-[0.97] ${
                    completed
                      ? "bg-green-600 text-white hover:bg-green-700"
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
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.lesson.markComplete}
                    </>
                  )}
                </button>
              </div>

              {/* Documents */}
              {lesson.documents && lesson.documents.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {t.lesson.resources}
                  </h3>
                  <div className="space-y-2">
                    {lesson.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gray-700/50 rounded-lg px-4 py-3 hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-300 text-sm">{doc.name}</span>
                        </div>
                        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                          {t.course.downloadPdf}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <LessonNotes courseId={courseId} lessonId={lessonId} />

              {/* Quiz */}
              {quiz && <QuizComponent quiz={quiz} />}

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
                    <div>
                      <p className="text-xs text-gray-500">{t.lesson.previous}</p>
                      <p className="text-sm">{prevLesson.title[locale]}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextLesson ? (
                  <Link
                    href={`/course/${courseId}/lesson/${nextLesson.id}`}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-right"
                  >
                    <div>
                      <p className="text-xs text-gray-500">{t.lesson.next}</p>
                      <p className="text-sm">{nextLesson.title[locale]}</p>
                    </div>
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
                <Link href={`/course/${courseId}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.lesson.backToCourse}
                </Link>
                <h2 className="text-white font-semibold mt-1 text-sm truncate">{course.title[locale]}</h2>
                {enrolled && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-600 rounded-full h-1">
                      <div className="bg-indigo-400 h-1 rounded-full progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-xs text-gray-400">{progressPercent}%</span>
                  </div>
                )}
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-800/50">
                      {chapter.title[locale]}
                    </div>
                    {chapter.lessons.map((l) => {
                      const isActive = l.id === lessonId;
                      const isDone = isLessonCompleted(courseId, l.id);
                      return (
                        <Link
                          key={l.id}
                          href={`/course/${courseId}/lesson/${l.id}`}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                            isActive
                              ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500"
                              : isDone
                              ? "text-green-400 hover:bg-gray-700"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {isDone ? (
                            <svg className="w-4 h-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : isActive ? (
                            <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          <span className="truncate">{l.title[locale]}</span>
                          <span className="text-xs text-gray-500 ml-auto flex-shrink-0">{l.duration}</span>
                        </Link>
                      );
                    })}
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
