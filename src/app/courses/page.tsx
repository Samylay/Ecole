"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";
import { courses, Subject } from "@/lib/data";

type SortOption = "popular" | "rating" | "newest";
type SubjectFilter = Subject | "all";
type LevelFilter = "middle" | "high" | "all";

export default function CoursesPage() {
  const { t } = useLocale();
  const { isEnrolled } = useProgress();

  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("all");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (subjectFilter !== "all") {
      result = result.filter((c) => c.subject === subjectFilter);
    }

    if (levelFilter !== "all") {
      result = result.filter((c) => c.level === levelFilter);
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.studentCount - a.studentCount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.totalLessons - a.totalLessons);
        break;
    }

    return result;
  }, [subjectFilter, levelFilter, sortBy]);

  const subjectOptions: { value: SubjectFilter; label: string }[] = [
    { value: "all", label: t.courses.allSubjects },
    { value: "math", label: t.subjects.math },
    { value: "physics", label: t.subjects.physics },
    { value: "biology", label: t.subjects.biology },
  ];

  const levelOptions: { value: LevelFilter; label: string }[] = [
    { value: "all", label: t.courses.allLevels },
    { value: "middle", label: t.levels.middle },
    { value: "high", label: t.levels.high },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popular", label: t.courses.popular },
    { value: "rating", label: t.courses.rating },
    { value: "newest", label: t.courses.newest },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 animate-fade-in-up">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            {t.nav.home}
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{t.nav.courses}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.courses.title}</h1>
          <p className="text-gray-500">{t.courses.subtitle}</p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-8 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Subject Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.courses.allSubjects.replace(/^.*/, t.home.subjects)}
              </label>
              <div className="flex flex-wrap gap-2">
                {subjectOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSubjectFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      subjectFilter === opt.value
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.course.level}
              </label>
              <div className="flex flex-wrap gap-2">
                {levelOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setLevelFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      levelFilter === opt.value
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.courses.sortBy}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Count */}
        <p className="text-sm text-gray-500 mb-6 animate-fade-in-up">
          {t.courses.showing} {filteredCourses.length} {t.courses.results}
        </p>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CourseCard course={course} />
                {isEnrolled(course.id) && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.course.enrolled}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <svg className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{t.courses.noResults}</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">{t.courses.noResultsDesc}</p>
            <button
              onClick={() => {
                setSubjectFilter("all");
                setLevelFilter("all");
              }}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t.common.retry}
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.home.hero.title}</h2>
          <p className="text-indigo-100 mb-8 text-lg">{t.home.hero.subtitle}</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-lg">
            {t.nav.signUp}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
