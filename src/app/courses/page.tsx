"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, SearchX, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { Segmented } from "@/components/Tabs";
import { useLocale } from "@/lib/locale-context";
import { formatNumber } from "@/lib/i18n";
import { courses, Subject, Level, subjectIcons } from "@/lib/data";

const SUBJECTS: Subject[] = ["math", "physics", "biology"];
type Duration = "all" | "short" | "medium" | "long";

function matchesDuration(hours: number, d: Duration): boolean {
  if (d === "short") return hours < 5;
  if (d === "medium") return hours >= 5 && hours <= 10;
  if (d === "long") return hours > 10;
  return true;
}

function CatalogContent() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(() => {
    const s = params.get("subject");
    return s && SUBJECTS.includes(s as Subject) ? [s as Subject] : [];
  });
  const [level, setLevel] = useState<Level | "all">("all");
  const [duration, setDuration] = useState<Duration>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (selectedSubjects.length && !selectedSubjects.includes(c.subject)) return false;
      if (level !== "all" && c.level !== level) return false;
      if (!matchesDuration(c.totalHours, duration)) return false;
      if (c.rating < minRating) return false;
      if (q) {
        const hay = `${c.title[locale]} ${c.description[locale]} ${t.subjects[c.subject]}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, selectedSubjects, level, duration, minRating, locale, t]);

  const activeChips: { key: string; label: string; clear: () => void }[] = [
    ...selectedSubjects.map((s) => ({
      key: `subject-${s}`,
      label: t.subjects[s],
      clear: () => setSelectedSubjects((prev) => prev.filter((x) => x !== s)),
    })),
    ...(level !== "all"
      ? [{ key: "level", label: t.levels[level], clear: () => setLevel("all") }]
      : []),
    ...(duration !== "all"
      ? [
          {
            key: "duration",
            label:
              duration === "short"
                ? t.catalog.durationShort
                : duration === "medium"
                  ? t.catalog.durationMedium
                  : t.catalog.durationLong,
            clear: () => setDuration("all"),
          },
        ]
      : []),
    ...(minRating > 0
      ? [
          {
            key: "rating",
            label: `★ ${formatNumber(locale, minRating)} ${t.catalog.ratingMin}`,
            clear: () => setMinRating(0),
          },
        ]
      : []),
  ];

  const clearAll = () => {
    setSelectedSubjects([]);
    setLevel("all");
    setDuration("all");
    setMinRating(0);
    setQuery("");
    router.replace("/courses");
  };

  const toggleSubject = (s: Subject) => {
    setSelectedSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const filterRail = (
    <div className="space-y-6">
      {/* Subject checkboxes with counts */}
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
          {t.catalog.subject}
        </legend>
        <div className="space-y-1">
          {SUBJECTS.map((s) => {
            const count = courses.filter((c) => c.subject === s).length;
            const checked = selectedSubjects.includes(s);
            return (
              <label
                key={s}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-input px-2 text-[15px] text-slate transition-colors duration-[var(--duration-base)] hover:bg-mist/50"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSubject(s)}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                <span aria-hidden="true">{subjectIcons[s]}</span>
                <span className="flex-1">{t.subjects[s]}</span>
                <span className="font-mono text-[11px] text-faint">{formatNumber(locale, count)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Level segmented */}
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
          {t.catalog.levelLabel}
        </legend>
        <Segmented
          options={[
            { value: "all", label: t.catalog.allLevels },
            { value: "middle", label: t.levels.middle },
            { value: "high", label: t.levels.high },
          ]}
          value={level}
          onChange={(v) => setLevel(v as Level | "all")}
          label={t.catalog.levelLabel}
        />
      </fieldset>

      {/* Duration */}
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
          {t.catalog.duration}
        </legend>
        <div className="space-y-1">
          {(
            [
              ["all", t.catalog.allLevels],
              ["short", t.catalog.durationShort],
              ["medium", t.catalog.durationMedium],
              ["long", t.catalog.durationLong],
            ] as [Duration, string][]
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-input px-2 text-[15px] text-slate transition-colors duration-[var(--duration-base)] hover:bg-mist/50"
            >
              <input
                type="radio"
                name="duration"
                checked={duration === value}
                onChange={() => setDuration(value)}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Rating */}
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
          {t.catalog.rating}
        </legend>
        <div className="space-y-1">
          {[0, 4, 4.5].map((r) => (
            <label
              key={r}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-input px-2 text-[15px] text-slate transition-colors duration-[var(--duration-base)] hover:bg-mist/50"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              {r === 0 ? (
                t.catalog.allLevels
              ) : (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                  {formatNumber(locale, r)} {t.catalog.ratingMin}
                </span>
              )}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
      </a>
      <Navbar />

      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[22px] font-semibold text-ink">{t.catalog.title}</h1>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute inset-y-0 start-4 my-auto h-4 w-4 text-faint" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              aria-label={t.common.search}
              className="h-11 w-full rounded-pill border-[1.5px] border-mist bg-surface pe-4 ps-11 text-[15px] text-ink placeholder:text-faint focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
            />
          </div>
        </div>

        {/* Mobile filter trigger */}
        <div className="mt-4 flex items-center justify-between lg:hidden">
          <Button variant="secondary" size="sm" onClick={() => setSheetOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {t.catalog.filters}
            {activeChips.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-primary font-mono text-[11px] text-white">
                {formatNumber(locale, activeChips.length)}
              </span>
            )}
          </Button>
          <span className="font-mono text-[13px] text-muted">
            {formatNumber(locale, filtered.length)} {t.catalog.resultsCount}
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block" aria-label={t.catalog.filters}>
            {filterRail}
          </aside>

          <div>
            {/* Active filter chips + count */}
            <div className="mb-4 hidden flex-wrap items-center gap-2 lg:flex">
              <span className="font-mono text-[13px] text-muted">
                {formatNumber(locale, filtered.length)} {t.catalog.resultsCount}
              </span>
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={chip.clear}
                  className="flex items-center gap-1.5 rounded-pill bg-primary-soft px-3 py-1.5 text-[13px] font-medium text-primary-hover transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-primary hover:text-white active:scale-[0.98] dark:text-primary dark:hover:text-white"
                >
                  {chip.label}
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
              {activeChips.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[13px] font-medium text-muted underline underline-offset-2 transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:text-ink active:scale-[0.98]"
                >
                  {t.catalog.clearFilters}
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<SearchX className="h-6 w-6" />}
                title={t.catalog.noResultsTitle}
                body={t.catalog.noResultsBody}
                action={
                  <Button variant="secondary" onClick={clearAll}>
                    {t.catalog.clearFilters}
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-hidden="true" tabIndex={-1} className="absolute inset-0 bg-ink/40" onClick={() => setSheetOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.catalog.filters}
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-card bg-surface p-6 shadow-modal"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-ink">{t.catalog.filters}</h2>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label={t.common.close}
                className="flex h-11 w-11 items-center justify-center rounded-pill text-slate transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {filterRail}
            <div className="sticky bottom-0 mt-6 bg-surface pt-2">
              {/* CTA carries live count */}
              <Button className="w-full" onClick={() => setSheetOpen(false)}>
                {t.catalog.showResults} ({formatNumber(locale, filtered.length)})
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}
