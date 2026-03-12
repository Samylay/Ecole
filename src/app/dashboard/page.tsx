"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";
import { courses, getAllLessons, subjectIcons, subjectColors } from "@/lib/data";

export default function DashboardPage() {
  const { locale, t } = useLocale();
  const { user, enrolledCourses, getCompletedLessonCount } = useProgress();

  const enrolled = courses.filter((c) => enrolledCourses[c.id]?.enrolled);
  const totalLessonsCompleted = enrolled.reduce((acc, c) => acc + getCompletedLessonCount(c.id), 0);
  const totalLessons = enrolled.reduce((acc, c) => acc + getAllLessons(c).length, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalLessonsCompleted / totalLessons) * 100) : 0;
  const streak = totalLessonsCompleted > 0 ? Math.min(totalLessonsCompleted, 7) : 0;
  const minutesSpent = totalLessonsCompleted * 15;
  const hoursSpent = Math.floor(minutesSpent / 60);
  const minsLeft = minutesSpent % 60;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.dashboard.title}</h1>
          {user.isLoggedIn && (
            <p className="text-gray-500 mt-1">{t.dashboard.welcome}, {user.name}</p>
          )}
        </div>

        {enrolled.length === 0 ? (
          <div className="animate-fade-in">
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500 text-lg mb-4">{t.dashboard.noActivity}</p>
              <Link href="/courses" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                {t.dashboard.exploreCourses}
              </Link>
            </div>

            {/* Suggested courses */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.home.popularCourses}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.slice(0, 6).map((course) => {
                  const colors = subjectColors[course.subject];
                  return (
                    <Link key={course.id} href={`/course/${course.id}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}>
                          {subjectIcons[course.subject]}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors text-sm truncate">
                            {course.title[locale]}
                          </h3>
                          <p className="text-xs text-gray-500">{course.totalLessons} {t.course.lessons} &middot; {course.totalHours} {t.course.hours}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                label={t.dashboard.enrolledCourses}
                value={enrolled.length.toString()}
                color="bg-blue-50 text-blue-600"
              />
              <StatCard
                icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                label={t.dashboard.lessonsCompleted}
                value={`${totalLessonsCompleted}/${totalLessons}`}
                color="bg-green-50 text-green-600"
              />
              <StatCard
                icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                label={t.dashboard.timeSpent}
                value={hoursSpent > 0 ? `${hoursSpent}h ${minsLeft}m` : `${minsLeft}m`}
                color="bg-purple-50 text-purple-600"
              />
              <StatCard
                icon="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                label={t.dashboard.streak}
                value={`${streak} ${t.dashboard.days}`}
                color="bg-orange-50 text-orange-600"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboard.overallProgress}</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-indigo-600 h-4 rounded-full progress-bar" style={{ width: `${overallProgress}%` }} />
                  </div>
                </div>
                <span className="text-2xl font-bold text-indigo-600 w-16 text-right">{overallProgress}%</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboard.continueLearning}</h2>
            <div className="space-y-4">
              {enrolled.map((course) => {
                const allLsns = getAllLessons(course);
                const done = getCompletedLessonCount(course.id);
                const pct = allLsns.length > 0 ? Math.round((done / allLsns.length) * 100) : 0;
                const colors = subjectColors[course.subject];
                return (
                  <Link key={course.id} href={`/course/${course.id}`} className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${colors.accent} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                        {subjectIcons[course.subject]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                          {course.title[locale]}
                        </h3>
                        <p className="text-sm text-gray-500">{done}/{allLsns.length} {t.course.lessons}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className={`${colors.accent} h-2 rounded-full progress-bar`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">{pct}%</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-in-up">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
