"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "@/lib/locale-context";

interface LessonNotesProps {
  courseId: string;
  lessonId: string;
}

export function LessonNotes({ courseId, lessonId }: LessonNotesProps) {
  const { t } = useLocale();
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const storageKey = `layaida-notes-${courseId}-${lessonId}`;

  // Load saved notes on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [storageKey]);

  // Auto-save with debounce
  const autoSave = useCallback(
    (value: string) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      setSaved(false);
      saveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem(storageKey, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }, 1000);
    },
    [storageKey]
  );

  const handleChange = (value: string) => {
    setNotes(value);
    autoSave(value);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl mt-6 overflow-hidden animate-fade-in">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm">
            {t.lesson.notes}
          </span>
          {saved && (
            <span className="text-xs text-green-400 animate-fade-in">
              {t.lesson.noteSaved}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      {isOpen && (
        <div className="px-6 pb-6 animate-fade-in">
          <textarea
            value={notes}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t.lesson.notesPlaceholder}
            className="w-full h-40 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm placeholder-gray-500 resize-y focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-gray-500">
              {saved && (
                <span className="flex items-center gap-1 text-green-400">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {t.lesson.noteSaved}
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all active:scale-[0.97]"
            >
              {t.lesson.saveNote}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
