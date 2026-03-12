"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { courses, subjectIcons } from "@/lib/data";

export function SearchBar() {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? courses.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.title[locale].toLowerCase().includes(q) ||
          c.description[locale].toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={locale === "ar" ? "ابحث عن دروس..." : locale === "fr" ? "Rechercher des cours..." : "Search courses..."}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{subjectIcons[course.subject]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{course.title[locale]}</p>
                    <p className="text-xs text-gray-500">{course.instructor.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              {locale === "ar" ? "لا توجد نتائج" : locale === "fr" ? "Aucun résultat" : "No results found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
