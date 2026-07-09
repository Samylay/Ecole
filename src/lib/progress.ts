// Local (mock) persistence for all learner state, namespaced per signed-in user.
// No backend assumptions — everything lives in localStorage.

export type QuizAttempt = {
  chapterId: string;
  courseId: string;
  score: number;
  total: number;
  wrongQuestionIds: string[];
  date: number;
};

export type LessonNote = {
  id: string;
  timestamp: string; // video position, mm:ss
  text: string;
  createdAt: number;
};

export type OnboardingPrefs = {
  grade: string;
  subjects: string[];
  weeklyGoal: number;
  reminders: boolean;
  onboarded: boolean;
};

export type ActivityEvent = {
  type: "lesson" | "quiz" | "enroll";
  courseId: string;
  refId: string; // lessonId / chapterId / courseId
  date: number;
  detail?: string;
};

const LEGACY_ENROLLMENT_KEY = "layaida_enrolled";
const LEGACY_COMPLETION_KEY = "layaida_completed";

function currentUserId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    const stored = localStorage.getItem("layaida_user");
    if (stored) {
      const email = JSON.parse(stored)?.email;
      if (typeof email === "string" && email) return email;
    }
  } catch {
    // fall through
  }
  return "anon";
}

function key(name: string): string {
  return `layaida:${currentUserId()}:${name}`;
}

function read<T>(name: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key(name));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(name: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(name), JSON.stringify(value));
  scheduleSync();
}

// ——— Server sync (SQLite mirror, see /api/state) ———
// localStorage stays the synchronous read path; every write debounces a full
// namespace push. On login the server copy wins (pullServerState).

const STATE_KEYS = [
  "enrolled",
  "completed",
  "active_days",
  "weekly_goal",
  "quiz_attempts",
  "notes",
  "prefs",
  "notifications",
  "followed_teachers",
  "activity",
] as const;

let syncTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSync(): void {
  if (typeof window === "undefined") return;
  if (currentUserId() === "anon") return; // nothing to sync for signed-out visitors
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(pushLocalState, 800);
}

async function pushLocalState(): Promise<void> {
  syncTimer = null;
  const state: Record<string, unknown> = {};
  for (const name of STATE_KEYS) {
    const raw = localStorage.getItem(key(name));
    if (raw !== null) {
      try {
        state[name] = JSON.parse(raw);
      } catch {
        // skip corrupt local values
      }
    }
  }
  if (Object.keys(state).length === 0) return;
  try {
    await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
  } catch {
    // offline — next write retries; a full reconnect resync is roadmap P2-T3 polish
  }
}

export async function pullServerState(email: string): Promise<void> {
  try {
    const res = await fetch("/api/state");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !data.state) return;
    for (const [name, value] of Object.entries(data.state as Record<string, unknown>)) {
      localStorage.setItem(`layaida:${email}:${name}`, JSON.stringify(value));
    }
  } catch {
    // offline: keep local copy
  }
}

// One-time migration of pre-redesign global keys into the current user's namespace.
export function migrateLegacyProgress(): void {
  if (typeof window === "undefined") return;
  try {
    const legacyEnrolled = localStorage.getItem(LEGACY_ENROLLMENT_KEY);
    if (legacyEnrolled) {
      const enrolled = read<Record<string, boolean>>("enrolled", {});
      Object.assign(enrolled, JSON.parse(legacyEnrolled));
      write("enrolled", enrolled);
      localStorage.removeItem(LEGACY_ENROLLMENT_KEY);
    }
    const legacyCompleted = localStorage.getItem(LEGACY_COMPLETION_KEY);
    if (legacyCompleted) {
      const completed = read<Record<string, number>>("completed", {});
      const old = JSON.parse(legacyCompleted) as Record<string, boolean>;
      for (const k of Object.keys(old)) {
        if (old[k] && !completed[k]) completed[k] = Date.now();
      }
      write("completed", completed);
      localStorage.removeItem(LEGACY_COMPLETION_KEY);
    }
  } catch {
    // migration is best-effort
  }
}

// ——— Enrollment ———

export function isEnrolled(courseId: string): boolean {
  return read<Record<string, boolean>>("enrolled", {})[courseId] === true;
}

export function enroll(courseId: string): void {
  const enrolled = read<Record<string, boolean>>("enrolled", {});
  enrolled[courseId] = true;
  write("enrolled", enrolled);
  logActivity({ type: "enroll", courseId, refId: courseId, date: Date.now() });
}

export function getEnrolledCourseIds(): string[] {
  const enrolled = read<Record<string, boolean>>("enrolled", {});
  return Object.keys(enrolled).filter((id) => enrolled[id]);
}

// ——— Lesson completion (timestamped, feeds streak + weekly goal) ———

function readCompleted(): Record<string, number> {
  return read<Record<string, number>>("completed", {});
}

export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  return Boolean(readCompleted()[`${courseId}:${lessonId}`]);
}

export function toggleLessonCompleted(courseId: string, lessonId: string, completed: boolean): void {
  const completions = readCompleted();
  const k = `${courseId}:${lessonId}`;
  if (completed) {
    completions[k] = Date.now();
    recordActiveDay();
    logActivity({ type: "lesson", courseId, refId: lessonId, date: Date.now() });
  } else {
    delete completions[k];
  }
  write("completed", completions);
}

export function getCompletedLessonIds(courseId: string): Set<string> {
  const completions = readCompleted();
  const result = new Set<string>();
  for (const k of Object.keys(completions)) {
    if (completions[k] && k.startsWith(`${courseId}:`)) {
      result.add(k.slice(courseId.length + 1));
    }
  }
  return result;
}

export function getCourseProgress(courseId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  return Math.round((getCompletedLessonIds(courseId).size / totalLessons) * 100);
}

export function getLastActivity(): { courseId: string; lessonId: string; date: number } | null {
  const completions = readCompleted();
  let best: { courseId: string; lessonId: string; date: number } | null = null;
  for (const k of Object.keys(completions)) {
    const idx = k.indexOf(":");
    if (idx === -1) continue;
    const entry = { courseId: k.slice(0, idx), lessonId: k.slice(idx + 1), date: completions[k] };
    if (!best || entry.date > best.date) best = entry;
  }
  return best;
}

function startOfWeek(d: Date): number {
  const day = (d.getDay() + 6) % 7; // Monday = 0
  const monday = new Date(d);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - day);
  return monday.getTime();
}

export function getLessonsCompletedThisWeek(): number {
  const weekStart = startOfWeek(new Date());
  return Object.values(readCompleted()).filter((ts) => ts >= weekStart).length;
}

// Completions per weekday (Mon..Sun) of the current week, for the dashboard bar chart.
export function getWeeklyActivity(): number[] {
  const weekStart = startOfWeek(new Date());
  const counts = [0, 0, 0, 0, 0, 0, 0];
  for (const ts of Object.values(readCompleted())) {
    if (ts >= weekStart) {
      const idx = (new Date(ts).getDay() + 6) % 7;
      counts[idx] = Math.min(counts[idx] + 1, 9);
    }
  }
  return counts;
}

// ——— Streak (active days) ———

function dayString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function recordActiveDay(): void {
  const days = read<string[]>("active_days", []);
  const today = dayString(new Date());
  if (!days.includes(today)) {
    days.push(today);
    write("active_days", days.slice(-400));
  }
}

export function getStreak(): number {
  const days = new Set(read<string[]>("active_days", []));
  let streak = 0;
  const cursor = new Date();
  // Today counts if active; otherwise the streak may still be alive from yesterday.
  if (!days.has(dayString(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// ——— Weekly goal ———

export function getWeeklyGoal(): number {
  return read<number>("weekly_goal", 4);
}

export function setWeeklyGoal(target: number): void {
  write("weekly_goal", target);
}

// ——— Quiz attempts ———

export function recordQuizAttempt(attempt: QuizAttempt): void {
  const attempts = read<QuizAttempt[]>("quiz_attempts", []);
  attempts.push(attempt);
  write("quiz_attempts", attempts.slice(-200));
  recordActiveDay();
  logActivity({
    type: "quiz",
    courseId: attempt.courseId,
    refId: attempt.chapterId,
    date: attempt.date,
    detail: `${attempt.score}/${attempt.total}`,
  });
}

export function getBestQuizScore(courseId: string, chapterId: string): QuizAttempt | null {
  const attempts = read<QuizAttempt[]>("quiz_attempts", []).filter(
    (a) => a.courseId === courseId && a.chapterId === chapterId
  );
  if (attempts.length === 0) return null;
  return attempts.reduce((best, a) => (a.score > best.score ? a : best));
}

export function getLastQuizAttempt(courseId: string, chapterId: string): QuizAttempt | null {
  const attempts = read<QuizAttempt[]>("quiz_attempts", []).filter(
    (a) => a.courseId === courseId && a.chapterId === chapterId
  );
  return attempts.length ? attempts[attempts.length - 1] : null;
}

// ——— Notes (timestamped to video position) ———

export function getNotes(courseId: string, lessonId: string): LessonNote[] {
  return read<Record<string, LessonNote[]>>("notes", {})[`${courseId}:${lessonId}`] ?? [];
}

export function addNote(courseId: string, lessonId: string, timestamp: string, text: string): LessonNote {
  const all = read<Record<string, LessonNote[]>>("notes", {});
  const k = `${courseId}:${lessonId}`;
  const note: LessonNote = {
    id: Math.random().toString(36).slice(2, 10),
    timestamp,
    text,
    createdAt: Date.now(),
  };
  all[k] = [...(all[k] ?? []), note];
  write("notes", all);
  return note;
}

export function deleteNote(courseId: string, lessonId: string, noteId: string): void {
  const all = read<Record<string, LessonNote[]>>("notes", {});
  const k = `${courseId}:${lessonId}`;
  all[k] = (all[k] ?? []).filter((n) => n.id !== noteId);
  write("notes", all);
}

// ——— Onboarding prefs ———

export function getPrefs(): OnboardingPrefs {
  return read<OnboardingPrefs>("prefs", {
    grade: "troisieme",
    subjects: ["math", "physics", "biology"],
    weeklyGoal: 4,
    reminders: true,
    onboarded: false,
  });
}

export function setPrefs(prefs: OnboardingPrefs): void {
  write("prefs", prefs);
  setWeeklyGoal(prefs.weeklyGoal);
}

// ——— Notification toggle (profile) ———

export function getNotificationsEnabled(): boolean {
  return read<boolean>("notifications", true);
}

export function setNotificationsEnabled(enabled: boolean): void {
  write("notifications", enabled);
}

// ——— Followed teachers ———

export function isFollowingTeacher(slug: string): boolean {
  return read<string[]>("followed_teachers", []).includes(slug);
}

export function toggleFollowTeacher(slug: string): boolean {
  const followed = read<string[]>("followed_teachers", []);
  const next = followed.includes(slug) ? followed.filter((s) => s !== slug) : [...followed, slug];
  write("followed_teachers", next);
  return next.includes(slug);
}

// ——— Activity feed (parent view) ———

function logActivity(event: ActivityEvent): void {
  const feed = read<ActivityEvent[]>("activity", []);
  feed.push(event);
  write("activity", feed.slice(-100));
}

export function getActivityFeed(limit = 12): ActivityEvent[] {
  return read<ActivityEvent[]>("activity", []).slice(-limit).reverse();
}
