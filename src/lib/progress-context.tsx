"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type LessonProgress = {
  completed: boolean;
  completedAt?: string;
};

type CourseProgress = {
  enrolled: boolean;
  enrolledAt: string;
  lessons: Record<string, LessonProgress>;
};

type UserState = {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
};

type ProgressContextType = {
  user: UserState;
  login: (name: string, email: string) => void;
  logout: () => void;
  enrolledCourses: Record<string, CourseProgress>;
  enroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  completeLesson: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  getCompletedLessonCount: (courseId: string) => number;
  notifications: AppNotification[];
  addNotification: (message: string, type?: NotificationType) => void;
  dismissNotification: (id: string) => void;
};

export type NotificationType = "success" | "info" | "warning" | "error";

export type AppNotification = {
  id: string;
  message: string;
  type: NotificationType;
  createdAt: number;
};

const STORAGE_KEYS = {
  user: "layaida-user",
  courses: "layaida-courses",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

const defaultUser: UserState = { name: "", email: "", avatar: "", isLoggedIn: false };

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultUser);
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, CourseProgress>>({});
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setUser(loadFromStorage(STORAGE_KEYS.user, defaultUser));
    setEnrolledCourses(loadFromStorage(STORAGE_KEYS.courses, {}));
    setHydrated(true);
  }, []);

  // Persist user changes
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.user, user);
  }, [user, hydrated]);

  // Persist course progress
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.courses, enrolledCourses);
  }, [enrolledCourses, hydrated]);

  const addNotification = useCallback((message: string, type: NotificationType = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setNotifications((prev) => [...prev, { id, message, type, createdAt: Date.now() }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const login = useCallback((name: string, email: string) => {
    const newUser = {
      name,
      email,
      avatar: name[0]?.toUpperCase() || "U",
      isLoggedIn: true,
    };
    setUser(newUser);
    addNotification(`${name} ✓`);
  }, [addNotification]);

  const logout = useCallback(() => {
    setUser(defaultUser);
    saveToStorage(STORAGE_KEYS.user, defaultUser);
  }, []);

  const enroll = useCallback(
    (courseId: string) => {
      setEnrolledCourses((prev) => ({
        ...prev,
        [courseId]: {
          enrolled: true,
          enrolledAt: new Date().toISOString(),
          lessons: {},
        },
      }));
      addNotification("✓");
    },
    [addNotification]
  );

  const isEnrolled = useCallback(
    (courseId: string) => !!enrolledCourses[courseId]?.enrolled,
    [enrolledCourses]
  );

  const completeLesson = useCallback(
    (courseId: string, lessonId: string) => {
      setEnrolledCourses((prev) => {
        const course = prev[courseId];
        if (!course) return prev;
        const isAlreadyComplete = course.lessons[lessonId]?.completed;
        return {
          ...prev,
          [courseId]: {
            ...course,
            lessons: {
              ...course.lessons,
              [lessonId]: {
                completed: !isAlreadyComplete,
                completedAt: !isAlreadyComplete ? new Date().toISOString() : undefined,
              },
            },
          },
        };
      });
    },
    []
  );

  const isLessonCompleted = useCallback(
    (courseId: string, lessonId: string) => !!enrolledCourses[courseId]?.lessons[lessonId]?.completed,
    [enrolledCourses]
  );

  const getCourseProgress = useCallback(
    (courseId: string) => {
      const course = enrolledCourses[courseId];
      if (!course) return 0;
      const completedCount = Object.values(course.lessons).filter((l) => l.completed).length;
      const totalLessons = Object.keys(course.lessons).length;
      if (totalLessons === 0) return 0;
      return Math.round((completedCount / totalLessons) * 100);
    },
    [enrolledCourses]
  );

  const getCompletedLessonCount = useCallback(
    (courseId: string) => {
      const course = enrolledCourses[courseId];
      if (!course) return 0;
      return Object.values(course.lessons).filter((l) => l.completed).length;
    },
    [enrolledCourses]
  );

  return (
    <ProgressContext.Provider
      value={{
        user,
        login,
        logout,
        enrolledCourses,
        enroll,
        isEnrolled,
        completeLesson,
        isLessonCompleted,
        getCourseProgress,
        getCompletedLessonCount,
        notifications,
        addNotification,
        dismissNotification,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
