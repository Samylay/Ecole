"use client";

import { use, useEffect, useState } from "react";
import { Star, Users, BookOpen, Check, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { Button, ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";
import { formatNumber } from "@/lib/i18n";
import { getTeacher } from "@/lib/data";
import { isFollowingTeacher, toggleFollowTeacher } from "@/lib/progress";

export default function TeacherPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale, t } = useLocale();
  const [following, setFollowing] = useState(false);
  const teacher = getTeacher(slug);

  useEffect(() => {
    setFollowing(isFollowingTeacher(slug));
  }, [slug]);

  if (!teacher) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <div className="mx-auto max-w-7xl flex-1 px-4 py-20 text-center">
          <h1 className="text-[22px] font-semibold text-ink">{t.states.notFoundTitle}</h1>
          <ButtonLink href="/courses" className="mt-6">
            {t.states.notFoundCta}
          </ButtonLink>
        </div>
        <Footer />
      </div>
    );
  }

  const { instructor, courses: taught, studentCount, rating } = teacher;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="flex-1">
        {/* Ink header */}
        <section className="bg-ink text-bg dark:bg-surface dark:text-ink">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-pill bg-primary text-[30px] font-semibold text-white shadow-primary">
                {instructor.name.replace(/^Pr\.\s*/, "")[0]}
              </span>
              <div className="flex-1">
                <h1 className="text-[30px] font-semibold leading-tight">{instructor.name}</h1>
                <p className="mt-2 max-w-xl text-[15px] text-faint">{instructor.bio[locale]}</p>
              </div>
              <Button
                variant={following ? "secondary" : "primary"}
                onClick={() => setFollowing(toggleFollowTeacher(slug))}
              >
                {following ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t.teacher.following}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    {t.teacher.follow}
                  </>
                )}
              </Button>
            </div>

            {/* Stats */}
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-faint" aria-hidden="true" />
                <div>
                  <dd className="font-mono text-[17px] font-semibold">{formatNumber(locale, studentCount)}</dd>
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-faint">{t.teacher.students}</dt>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-faint" aria-hidden="true" />
                <div>
                  <dd className="font-mono text-[17px] font-semibold">{formatNumber(locale, taught.length)}</dd>
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-faint">{t.teacher.courses}</dt>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 fill-warning text-warning" aria-hidden="true" />
                <div>
                  <dd className="font-mono text-[17px] font-semibold">{formatNumber(locale, Math.round(rating * 10) / 10)}</dd>
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-faint">{t.teacher.rating}</dt>
                </div>
              </div>
            </dl>
          </div>
        </section>

        {/* Course grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-[22px] font-semibold text-ink">
            {t.teacher.coursesBy} {instructor.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {taught.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
