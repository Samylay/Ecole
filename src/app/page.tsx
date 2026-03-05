"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { courses, subjectColors, subjectIcons, Subject } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

const subjects: Subject[] = ["math", "physics", "biology"];

export default function HomePage() {
  const { t } = useLocale();
  const [activeSubject, setActiveSubject] = useState<Subject | "all">("all");

  const filteredCourses =
    activeSubject === "all" ? courses : courses.filter((c) => c.subject === activeSubject);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 leading-relaxed">
              {t.home.hero.subtitle}
            </p>
            <Link
              href="#courses"
              className="mt-8 inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              {t.home.hero.cta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12K+", label: t.home.stats.students },
              { value: "50+", label: t.home.stats.courses },
              { value: "500+", label: t.home.stats.lessons },
              { value: "20+", label: t.home.stats.teachers },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-indigo-600">{stat.value}</div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.home.subjects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const colors = subjectColors[subject];
            const icon = subjectIcons[subject];
            const count = courses.filter((c) => c.subject === subject).length;
            return (
              <button
                key={subject}
                onClick={() => {
                  setActiveSubject(subject);
                  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`${colors.bg} rounded-xl p-6 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200`}
              >
                <span className="text-4xl">{icon}</span>
                <h3 className={`text-xl font-bold ${colors.text} mt-3`}>{t.subjects[subject]}</h3>
                <p className="text-gray-500 mt-1">
                  {count} {t.course.lessons.toLowerCase()}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.home.popularCourses}</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveSubject("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSubject === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.home.viewAll}
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSubject === subject
                    ? `${subjectColors[subject].accent} text-white`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {subjectIcons[subject]} {t.subjects[subject]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
