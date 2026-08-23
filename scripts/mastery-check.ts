// @ts-expect-error Node's strip-types runner requires the explicit TypeScript extension.
import { computeChapterMastery, computeCourseMasteryPercent } from "../src/lib/progress.ts";

function expect<T>(actual: T, expected: T, label: string): void {
  if (actual !== expected) throw new Error(`${label}: expected ${String(expected)}, received ${String(actual)}`);
}

expect(
  computeChapterMastery({
    bestQuizPercent: 80,
    wrongQuestionCount: 0,
    completedLessonCount: 0,
    visitedLessonCount: 1,
    totalLessonCount: 4,
  }),
  "maitrise",
  "80% quiz with no remaining wrong answers is mastered"
);
expect(
  computeChapterMastery({
    bestQuizPercent: 100,
    wrongQuestionCount: 1,
    completedLessonCount: 0,
    visitedLessonCount: 1,
    totalLessonCount: 4,
  }),
  "entraine",
  "remaining wrong answers prevent mastery"
);
expect(
  computeChapterMastery({
    bestQuizPercent: null,
    wrongQuestionCount: 0,
    completedLessonCount: 2,
    visitedLessonCount: 2,
    totalLessonCount: 4,
  }),
  "entraine",
  "half of lessons completed is trained"
);
expect(
  computeChapterMastery({
    bestQuizPercent: null,
    wrongQuestionCount: 0,
    completedLessonCount: 0,
    visitedLessonCount: 1,
    totalLessonCount: 4,
  }),
  "decouvert",
  "a visited lesson is discovered"
);
expect(
  computeChapterMastery({
    bestQuizPercent: null,
    wrongQuestionCount: 0,
    completedLessonCount: 0,
    visitedLessonCount: 0,
    totalLessonCount: 4,
  }),
  null,
  "an untouched chapter has no mastery level"
);
expect(computeCourseMasteryPercent(["maitrise", "entraine", null, "maitrise"]), 50, "course aggregate");

console.log("Mastery sanity checks passed.");
