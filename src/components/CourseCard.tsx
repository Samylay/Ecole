"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { Course, subjectColors, subjectIcons } from "@/lib/data";

export function CourseCard({ course }: { course: Course }) {
  const { locale, t } = useLocale();

  const colors = subjectColors[course.subject];
  const icon = subjectIcons[course.subject];
  const subjectName = t.subjects[course.subject];
  const levelName = t.levels[course.level];

  return (
    <Link href={`/course/${course.id}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className={`${colors.accent} h-40 flex items-center justify-center relative`}>
          <span className="text-6xl opacity-30">{icon}</span>
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`${colors.bg} ${colors.text} text-xs font-semibold px-2 py-1 rounded-full`}>
              {subjectName}
            </span>
            <span className="bg-white/90 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {levelName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {course.title[locale]}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{course.instructor.name}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {course.totalLessons} {t.course.lessons}
            </span>
            <span>{course.totalHours}h</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex" aria-label={`Rating: ${course.rating} out of 5`} role="img">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.floor(course.rating) ? "text-yellow-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
            <span className="text-sm text-gray-400">({course.studentCount.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
