"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

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
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  dismissNotification: (id: string) => void;
};

export type NotificationType = "success" | "info" | "warning" | "error";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  createdAt: number;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>({
    name: "",
    email: "",
    avatar: "",
    isLoggedIn: false,
  });

  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, CourseProgress>>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
    setUser({
      name,
      email,
      avatar: name[0]?.toUpperCase() || "U",
      isLoggedIn: true,
    });
    addNotification(`Bienvenue, ${name} !`);
  }, [addNotification]);

  const logout = useCallback(() => {
    setUser({ name: "", email: "", avatar: "", isLoggedIn: false });
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
      addNotification("Inscription r\u00e9ussie !");
    },
    [addNotification]
  );

  const isEnrolled = useCallback(
    (courseId: string) => {
      return !!enrolledCourses[courseId]?.enrolled;
    },
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
    (courseId: string, lessonId: string) => {
      return !!enrolledCourses[courseId]?.lessons[lessonId]?.completed;
    },
    [enrolledCourses]
  );

  const getCourseProgress = useCallback(
    (courseId: string) => {
      const course = enrolledCourses[courseId];
      if (!course) return 0;
      const completedCount = Object.values(course.lessons).filter((l) => l.completed).length;
      // We need total lessons from data, but we store per-lesson so we approximate
      // The component should pass totalLessons
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
