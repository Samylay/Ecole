"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  courses as seedCourses,
  quizzes as seedQuizzes,
  getAllLessons as getSeedAllLessons,
  getCourse as getSeedCourse,
  getLesson as getSeedLesson,
  getQuiz as getSeedQuiz,
  chapterHasQuiz as seedChapterHasQuiz,
  getExamQuestionPool as getSeedExamQuestionPool,
  type Course,
  type Level,
  type QuizQuestion,
} from "@/lib/data";

type ContentContextValue = {
  courses: Course[];
  quizzes: Record<string, Record<string, QuizQuestion[]>>;
  loading: boolean;
  getCourse: (id: string) => Course | undefined;
  getLesson: (courseId: string, lessonId: string) => ReturnType<typeof getSeedLesson>;
  getAllLessons: typeof getSeedAllLessons;
  getQuiz: (courseId: string, chapterId: string) => QuizQuestion[] | null;
  chapterHasQuiz: (courseId: string, chapterId: string) => boolean;
  getExamQuestionPool: typeof getSeedExamQuestionPool;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(seedCourses);
  const [quizzes, setQuizzes] = useState<Record<string, Record<string, QuizQuestion[]>>>(seedQuizzes);
  const [archivedIds, setArchivedIds] = useState<Set<string>>(() => readPersistedSet("archived"));
  const [databaseIds, setDatabaseIds] = useState<Set<string>>(() => readPersistedSet("database"));
  const [loading, setLoading] = useState(true);
  const requestVersion = useRef(0);

  const refresh = useCallback(async (): Promise<void> => {
    const version = ++requestVersion.current;
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      if (!response.ok) throw new Error("content_fetch_failed");
      const payload = await response.json() as {
        courses?: Course[];
        protectedCourses?: Course[];
        protectedQuizzes?: Record<string, Record<string, QuizQuestion[]>>;
        archivedIds?: string[];
        databaseCourseIds?: string[];
      };
      if (version !== requestVersion.current || !Array.isArray(payload.courses)) return;
      const nextArchived = Array.isArray(payload.archivedIds) ? new Set(payload.archivedIds) : archivedIds;
      const nextDatabase = Array.isArray(payload.databaseCourseIds) ? new Set(payload.databaseCourseIds) : databaseIds;
      const protectedById = new Map((payload.protectedCourses ?? []).map((course) => [course.id, course]));
      const nextCourses = payload.courses.map((course) => {
        if (nextArchived.has(course.id)) return course;
        if (protectedById.has(course.id)) return protectedById.get(course.id)!;
        // Seed courses are the intentional free pilot fallback. DB-backed
        // courses never inherit seed lesson assets, even when ids collide.
        return !nextDatabase.has(course.id) ? (getSeedCourse(course.id) ?? course) : course;
      });
      setCourses(nextCourses);
      setQuizzes(payload.protectedQuizzes ?? {});
      setArchivedIds(nextArchived);
      setDatabaseIds(nextDatabase);
      persistSet("archived", nextArchived);
      persistSet("database", nextDatabase);
    } catch {
      // Keep the last known course/access boundary. Protected fields never
      // appear as a consequence of a failed refresh.
    } finally {
      setLoading(false);
    }
  }, [archivedIds, databaseIds]);

  useEffect(() => {
    requestVersion.current += 1;
    setCourses((current) => current.map((course) => databaseIds.has(course.id) ? stripCourseAssets(course) : course));
    setQuizzes({});
    void refresh();
    // Refresh when auth changes, not when the refresh function's cached
    // boundary state changes during the same request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, user?.role]);

  const value = useMemo<ContentContextValue>(() => {
    const getCourse = (id: string) => archivedIds.has(id)
      ? undefined
      : databaseIds.has(id)
        ? courses.find((course) => course.id === id)
        : courses.find((course) => course.id === id) ?? getSeedCourse(id);
    const getLesson = (courseId: string, lessonId: string) => {
      const course = getCourse(courseId);
      if (!course) return null;
      for (const chapter of course.chapters) {
        const lesson = chapter.lessons.find((item) => item.id === lessonId);
        if (lesson) return { lesson, chapter, course };
      }
      return databaseIds.has(courseId) ? null : getSeedLesson(courseId, lessonId);
    };
    const getQuiz = (courseId: string, chapterId: string) => quizzes[courseId]?.[chapterId]
      ?? (databaseIds.has(courseId) ? null : getSeedQuiz(courseId, chapterId));
    const chapterHasQuiz = (courseId: string, chapterId: string) => Boolean(getQuiz(courseId, chapterId)?.length) || seedChapterHasQuiz(courseId, chapterId);
    const getExamQuestionPool = (level: Level) => {
      const pool = courses.flatMap((course) => course.level === level
        ? course.chapters.flatMap((chapter) => (getQuiz(course.id, chapter.id) ?? []).map((question) => ({ courseId: course.id, chapterId: chapter.id, question })))
        : []);
      return pool.length || databaseIds.size > 0 ? pool : getSeedExamQuestionPool(level);
    };
    return {
      courses,
      quizzes,
      loading,
      getCourse,
      getLesson,
      getAllLessons: getSeedAllLessons,
      getQuiz,
      chapterHasQuiz,
      getExamQuestionPool,
      refresh,
    };
  }, [courses, quizzes, archivedIds, databaseIds, loading, refresh]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

function readPersistedSet(kind: "archived" | "database"): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const value = JSON.parse(localStorage.getItem(`layaida_content_${kind}`) ?? "[]");
    return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function persistSet(kind: "archived" | "database", value: Set<string>): void {
  try { localStorage.setItem(`layaida_content_${kind}`, JSON.stringify([...value])); } catch { /* best effort */ }
}

function stripCourseAssets(course: Course): Course {
  return {
    ...course,
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map(({ videoUrl: _videoUrl, documents: _documents, ...lesson }) => lesson),
    })),
  } as Course;
}

export function useContent(): ContentContextValue {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used inside ContentProvider");
  return value;
}
