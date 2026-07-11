"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber } from "@/lib/i18n";
import { courses, subjectColors, subjectIcons, Subject } from "@/lib/data";

const subjects: Subject[] = ["math", "physics", "biology"];

export default function HomePage() {
  const { t, locale, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Signed-in home is the dashboard.
  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [user, isLoading, router]);

  const popular = [...courses].sort((a, b) => b.studentCount - a.studentCount).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="flex-1">
        {/* Hero — mist band with central search pill */}
        <section className="bg-mist/40">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
            <h1 className="text-[30px] font-semibold leading-tight text-ink md:text-4xl">{t.home.hero.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate">{t.home.hero.subtitle}</p>

            <form
              className="relative mx-auto mt-8 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q");
                router.push(q ? `/courses?q=${encodeURIComponent(String(q))}` : "/courses");
              }}
              role="search"
            >
              <Search
                className="pointer-events-none absolute inset-y-0 start-5 my-auto h-5 w-5 text-faint"
                aria-hidden="true"
              />
              <input
                type="search"
                name="q"
                placeholder={t.home.hero.searchPlaceholder}
                aria-label={t.common.search}
                className="h-14 w-full rounded-pill border-[1.5px] border-mist bg-surface pe-14 text-[15px] text-ink shadow-card placeholder:text-faint focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
                style={{ paddingInlineStart: "3.25rem" }}
              />
              <button
                type="submit"
                aria-label={t.common.search}
                className="absolute inset-y-0 end-2 my-auto flex h-10 w-10 items-center justify-center rounded-pill bg-primary text-white shadow-primary transition-colors duration-[var(--duration-base)] hover:bg-primary-hover"
              >
                <ArrowRight className={`h-5 w-5 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>

        {/* Subject tiles */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-[22px] font-semibold text-ink">{t.home.subjects}</h2>
          <p className="mt-1 text-[15px] text-muted">{t.home.subjectsSubtitle}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {subjects.map((subject) => {
              const colors = subjectColors[subject];
              const count = courses.filter((c) => c.subject === subject).length;
              return (
                <Link
                  key={subject}
                  href={`/courses?subject=${subject}`}
                  className={`group rounded-card ${colors.bg} border border-transparent p-6 transition-[transform,border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:-translate-y-0.5 hover:border-border hover:shadow-lift active:scale-[0.98]`}
                >
                  <span className={`text-4xl ${colors.text}`} aria-hidden="true">
                    {subjectIcons[subject]}
                  </span>
                  <h3 className={`mt-3 text-[17px] font-semibold ${colors.text}`}>{t.subjects[subject]}</h3>
                  <p className="mt-1 text-[13px] text-muted">
                    {formatNumber(locale, count)} {t.home.coursesCount}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular courses */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-ink">{t.home.popularCourses}</h2>
            <Link
              href="/courses"
              className="rounded-pill px-4 py-2 text-[13px] font-medium text-primary transition-colors duration-[var(--duration-base)] hover:bg-primary-soft"
            >
              {t.home.viewAll}
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
