const ENROLLMENT_KEY = "layaida_enrolled";
const COMPLETION_KEY = "layaida_completed";

function readEnrolled(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ENROLLMENT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function readCompleted(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(COMPLETION_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function isEnrolled(courseId: string): boolean {
  return readEnrolled()[courseId] === true;
}

export function enroll(courseId: string): void {
  const enrolled = readEnrolled();
  enrolled[courseId] = true;
  localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(enrolled));
}

export function getEnrolledCourseIds(): string[] {
  const enrolled = readEnrolled();
  return Object.keys(enrolled).filter((id) => enrolled[id]);
}

export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  return readCompleted()[`${courseId}:${lessonId}`] === true;
}

export function toggleLessonCompleted(courseId: string, lessonId: string, completed: boolean): void {
  const completions = readCompleted();
  const key = `${courseId}:${lessonId}`;
  if (completed) {
    completions[key] = true;
  } else {
    delete completions[key];
  }
  localStorage.setItem(COMPLETION_KEY, JSON.stringify(completions));
}

export function getCourseProgress(courseId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const completions = readCompleted();
  const completedCount = Object.keys(completions).filter(
    (key) => key.startsWith(`${courseId}:`) && completions[key]
  ).length;
  return Math.round((completedCount / totalLessons) * 100);
}
