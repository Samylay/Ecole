"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Star } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { formatNumber } from "@/lib/i18n";
import { Course, subjectColors } from "@/lib/data";
import { Badge } from "./Badge";
import { ProgressBar } from "./Progress";

export function CourseCard({ course, progress }: { course: Course; progress?: number }) {
  const { locale, t } = useLocale();

  const colors = subjectColors[course.subject];

  return (
    <Link
      href={`/course/${course.id}`}
      className="group block h-full transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] active:scale-[0.98]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] group-hover:-translate-y-0.5 group-hover:shadow-lift">
        {/* Subject-tinted background stays visible while the SVG illustration loads/decodes */}
        <div className={`relative flex h-36 items-center justify-center overflow-hidden ${colors.bg}`}>
          <Image
            src={`/thumbnails/${course.id}.svg`}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute start-3 top-3 flex gap-2">
            <Badge className={`${colors.bg} ${colors.text} border border-surface/60 bg-surface/80 backdrop-blur-sm`}>
              {t.subjects[course.subject]}
            </Badge>
            <Badge className="bg-surface/80 text-slate backdrop-blur-sm">{t.levels[course.level]}</Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-[15px] font-semibold text-ink transition-colors duration-[var(--duration-base)] group-hover:text-primary">
            {course.title[locale]}
          </h3>
          <p className="mt-1 text-[13px] text-muted">{course.instructor.name}</p>

          <div className="mt-3 flex items-center gap-4 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {formatNumber(locale, course.totalLessons)} {t.course.lessons}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {formatNumber(locale, course.totalHours)} {t.course.hours}
            </span>
          </div>

          <div className="mt-auto pt-3">
            {typeof progress === "number" ? (
              <div>
                <div className="mb-1 flex items-center justify-between text-[13px]">
                  <span className="text-muted">{t.course.progress}</span>
                  <span className="font-mono font-medium text-primary">{formatNumber(locale, progress)}%</span>
                </div>
                <ProgressBar value={progress} label={t.course.progress} />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[13px]">
                <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                <span className="font-medium text-ink">{formatNumber(locale, course.rating)}</span>
                <span className="text-faint">
                  ({formatNumber(locale, course.studentCount)} {t.course.students})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
