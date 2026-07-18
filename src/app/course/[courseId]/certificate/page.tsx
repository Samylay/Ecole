"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Printer, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EmptyState } from "@/components/EmptyState";
import { Button, ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { getCourse, getAllLessons } from "@/lib/data";
import { getCourseProgress, getCourseCompletionDate, migrateLegacyProgress } from "@/lib/progress";

export default function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { locale, t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const course = getCourse(courseId);
  const [progress, setProgress] = useState<number | null>(null);
  const [issuedAt, setIssuedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!course) return;
    migrateLegacyProgress();
    setProgress(getCourseProgress(courseId, getAllLessons(course).length));
    setIssuedAt(getCourseCompletionDate(courseId));
  }, [course, courseId]);

  if (isLoading || !user || !course || progress === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const dateLabel = new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(issuedAt ?? Date.now());

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <ButtonLink href={`/course/${courseId}`} variant="ghost" size="sm" className="print:hidden">
          <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
          {t.certificate.back}
        </ButtonLink>

        {progress < 100 ? (
          <div className="mt-6">
            <EmptyState
              icon={<Award className="h-6 w-6" />}
              title={t.certificate.notCompletedTitle}
              body={t.certificate.notCompletedBody}
              action={<ButtonLink href={`/course/${courseId}`}>{t.certificate.goToCourse}</ButtonLink>}
            />
          </div>
        ) : (
          <>
            <div className="mt-6 rounded-card border-2 border-primary/30 bg-surface px-6 py-12 text-center shadow-lift print:border-ink print:shadow-none sm:px-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-pill bg-primary-soft text-primary-hover">
                <Award className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="mt-6 text-[13px] font-mono uppercase tracking-wide text-muted">Layaida</p>
              <h1 className="mt-2 text-[30px] font-semibold text-ink">{t.certificate.title}</h1>
              <p className="mt-6 text-[15px] text-muted">{t.certificate.presentedTo}</p>
              <p className="mt-1 text-[22px] font-semibold text-ink">{user.name}</p>
              <p className="mt-4 text-[17px] text-slate">
                {t.certificate.completionStatement}
                <br />
                <span className="font-semibold text-ink">{course.title[locale]}</span>
              </p>
              <div className="mx-auto mt-8 flex max-w-sm flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-[13px] text-muted">
                <div>
                  <p className="font-mono">{t.certificate.issuedOn}</p>
                  <p className="mt-0.5 text-ink">{dateLabel}</p>
                </div>
                <div>
                  <p className="font-mono">{t.certificate.instructor}</p>
                  <p className="mt-0.5 text-ink">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center print:hidden">
              <Button onClick={() => window.print()}>
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t.certificate.print}
              </Button>
            </div>
          </>
        )}
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
