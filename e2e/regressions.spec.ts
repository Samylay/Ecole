import { test, expect, request as playwrightRequest, type APIRequestContext, type Page } from "@playwright/test";
import Database from "better-sqlite3";
import os from "node:os";
import path from "node:path";

// This is the same path used by playwright.config.ts. It is deliberately a
// throwaway file, never the development or deployment database.
const E2E_DB = path.join(os.tmpdir(), "layaida-e2e.db");
const PASSWORD = "motdepasse123";

type Localized = { fr: string; en: string; ar: string };

function uniqueEmail(tag: string): string {
  return `e2e-regression-${tag}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@test.local`;
}

function localized(value: string): Localized {
  return { fr: value, en: value, ar: value };
}

async function signup(context: APIRequestContext, tag: string, name = "E2E test user") {
  const email = uniqueEmail(tag);
  const response = await context.post("/api/auth/signup", {
    data: { name, email, password: PASSWORD },
  });
  expect(response.ok()).toBeTruthy();
  return email;
}

function setRole(email: string, role: "teacher" | "student"): void {
  const db = new Database(E2E_DB);
  db.prepare("UPDATE users SET role = ? WHERE email = ?").run(role, email);
  db.close();
}

async function teacherContext(tag: string): Promise<{ context: APIRequestContext; email: string }> {
  const context = await playwrightRequest.newContext({ baseURL: "http://127.0.0.1:3210" });
  const email = await signup(context, tag, `Teacher ${tag}`);
  setRole(email, "teacher");
  // Re-authenticate after the role promotion so this test does not depend on
  // whether the request context retained the signup response's cookie.
  const login = await context.post("/api/auth/login", { data: { email, password: PASSWORD } });
  expect(login.ok()).toBeTruthy();
  return { context, email };
}

async function completeOnboarding(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "C'est parti !" }).click();
  await page.waitForURL("**/dashboard");
}

async function signupThroughUi(page: Page, tag: string): Promise<string> {
  const email = uniqueEmail(tag);
  await page.goto("/signup");
  await page.getByLabel("Nom complet").fill(`Élève ${tag}`);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirmer le mot de passe").fill(PASSWORD);
  await page.getByRole("button", { name: "Inscription" }).click();
  await page.waitForURL("**/onboarding");
  return email;
}

function courseInput(id: string, title: string) {
  return {
    id,
    subject: "math",
    level: "high",
    title: localized(title),
    description: localized("Regression course"),
    thumbnail: "/thumbnails/math-algebra-101.svg",
    instructor: {
      name: "E2E Teacher",
      avatar: "/logo.png",
      bio: localized("Teacher biography"),
    },
  };
}

const chapterInput = {
  id: "chapter-1",
  title: localized("Chapter one"),
  position: 0,
  livestreamUrl: "https://meet.google.com/regression-live",
  scheduledAt: "2030-01-01T10:00:00.000Z",
};

const lessonInput = {
  id: "lesson-1",
  title: localized("Lesson one"),
  duration: "12 min",
  videoUrl: "https://www.youtube.com/watch?v=regression",
  description: localized("Lesson description"),
  position: 0,
  livestreamUrl: "https://meet.google.com/regression-lesson",
  scheduledAt: "2030-01-01T11:00:00.000Z",
};

function questionInput(id: string) {
  return {
    id,
    lessonId: "lesson-1",
    question: localized("Which answer is correct?"),
    options: [localized("First"), localized("Second")],
    correctIndex: 1,
    explanation: localized("The second answer is correct."),
    position: 0,
  };
}

test.describe.configure({ mode: "serial" });

test("student content projection returns DB courses, hides live/owner fields, and archives seed shadows", async ({ request }) => {
  const { context: teacher } = await teacherContext("content");
  const courseId = "math-algebra-101";

  const created = await teacher.post("/api/teacher/courses", {
    data: courseInput(courseId, "DB-authored algebra course"),
  });
  expect(created.status()).toBe(201);
  await teacher.post(`/api/teacher/courses/${courseId}/chapters`, { data: chapterInput });
  await teacher.post(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons`, { data: lessonInput });

  const content = await request.get("/api/content");
  expect(content.ok()).toBeTruthy();
  const payload = await content.json();
  const course = payload.courses.find((item: { id: string }) => item.id === courseId);
  expect(course).toMatchObject({ id: courseId, title: localized("DB-authored algebra course") });
  expect(course).not.toHaveProperty("owner_id");
  expect(course).not.toHaveProperty("archived");
  expect(course.chapters[0].lessons[0]).not.toHaveProperty("livestream_url");
  expect(course.chapters[0].lessons[0]).not.toHaveProperty("livestreamUrl");
  expect(course.chapters[0]).not.toHaveProperty("livestream_url");
  expect(course.chapters[0]).not.toHaveProperty("livestreamUrl");

  const archived = await teacher.delete(`/api/teacher/courses/${courseId}`);
  expect(archived.ok()).toBeTruthy();
  const afterArchive = await request.get("/api/content");
  const afterPayload = await afterArchive.json();
  expect(afterPayload.courses.some((item: { id: string }) => item.id === courseId)).toBe(false);
  expect(afterPayload.archivedIds).toContain(courseId);

  // Restore the seed fixture for the smoke suite, which enrols in this course.
  // The E2E database is throwaway, but all specs in a run intentionally share it.
  const db = new Database(E2E_DB);
  db.prepare("DELETE FROM courses WHERE id = ?").run(courseId);
  db.close();

  await teacher.dispose();
});

test("teacher question and document CRUD is owner-scoped", async ({ request }) => {
  const owner = await teacherContext("owner");
  const secondTeacher = await teacherContext("second-teacher");
  const student = await playwrightRequest.newContext({ baseURL: "http://127.0.0.1:3210" });
  await signup(student, "content-student");
  const courseId = `regression-course-${Date.now()}`;

  expect((await owner.context.post("/api/teacher/courses", { data: courseInput(courseId, "CRUD course") })).status()).toBe(201);
  expect((await owner.context.post(`/api/teacher/courses/${courseId}/chapters`, { data: { ...chapterInput, livestreamUrl: undefined, scheduledAt: undefined } })).status()).toBe(201);
  expect((await owner.context.post(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons`, { data: { ...lessonInput, livestreamUrl: undefined, scheduledAt: undefined } })).status()).toBe(201);

  for (const videoUrl of [
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "http://www.youtube.com/embed/video-id",
    "https://video.example.test/embed/video-id",
    "not a URL",
  ]) {
    expect((await owner.context.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1`, {
      data: { ...lessonInput, videoUrl, livestreamUrl: undefined, scheduledAt: undefined },
    })).status()).toBe(400);
  }
  for (const videoUrl of [
    "",
    "https://www.youtube.com/watch?v=video-id",
    "https://youtu.be/video-id",
    "https://www.youtube.com/embed/video-id",
    "https://www.youtube-nocookie.com/embed/video-id",
  ]) {
    expect((await owner.context.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1`, {
      data: { ...lessonInput, videoUrl, livestreamUrl: undefined, scheduledAt: undefined },
    })).ok()).toBe(true);
  }

  const question = await owner.context.post(`/api/teacher/courses/${courseId}/chapters/chapter-1/questions`, { data: questionInput("question-1") });
  expect(question.status()).toBe(201);
  const questionUpdate = { ...questionInput("ignored-id"), question: localized("Updated question") };
  expect((await owner.context.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/questions/question-1`, { data: questionUpdate })).ok()).toBe(true);

  const document = await owner.context.post(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1/documents`, {
    data: { name: "Worksheet", url: "/documents/placeholder.pdf", position: 0 },
  });
  expect(document.status()).toBe(201);
  const documentId = (await document.json()).document.id as number;
  expect((await owner.context.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1/documents/${documentId}`, {
    data: { name: "Updated worksheet", url: "/documents/placeholder.pdf", position: 1 },
  })).ok()).toBe(true);

  const tree = await owner.context.get(`/api/teacher/courses/${courseId}`);
  expect(tree.ok()).toBe(true);
  const treePayload = await tree.json();
  expect(treePayload.questions).toEqual(expect.arrayContaining([expect.objectContaining({ id: "question-1", question_fr: "Updated question" })]));
  expect(treePayload.documents).toEqual(expect.arrayContaining([expect.objectContaining({ id: documentId, name: "Updated worksheet" })]));

  expect((await secondTeacher.context.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/questions/question-1`, { data: questionUpdate })).status()).toBe(403);
  expect((await secondTeacher.context.delete(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1/documents/${documentId}`)).status()).toBe(403);
  expect((await student.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/questions/question-1`, { data: questionUpdate })).status()).toBe(403);
  expect((await student.put(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1/documents/${documentId}`, {
    data: { name: "Student should not edit", url: "/documents/placeholder.pdf" },
  })).status()).toBe(403);

  expect((await owner.context.delete(`/api/teacher/courses/${courseId}/chapters/chapter-1/questions/question-1`)).ok()).toBe(true);
  expect((await owner.context.delete(`/api/teacher/courses/${courseId}/chapters/chapter-1/lessons/lesson-1/documents/${documentId}`)).ok()).toBe(true);
  const emptyTree = await owner.context.get(`/api/teacher/courses/${courseId}`);
  const emptyPayload = await emptyTree.json();
  expect(emptyPayload.questions).toEqual([]);
  expect(emptyPayload.documents).toEqual([]);

  await owner.context.dispose();
  await secondTeacher.context.dispose();
  await student.dispose();
});

test("lycée stream selection persists and collège onboarding leaves legacy stream unset", async ({ page }) => {
  const highEmail = await signupThroughUi(page, "high-stream");
  await page.getByRole("radio", { name: "Première", exact: true }).click();
  await page.getByRole("radio", { name: "Sciences expérimentales", exact: true }).click();
  await completeOnboarding(page);
  const highPrefs = await page.evaluate((email) => JSON.parse(localStorage.getItem(`layaida:${email}:prefs`) ?? "{}"), highEmail);
  expect(highPrefs).toMatchObject({ grade: "premiere", academicStream: "sciences_experimentales", onboarded: true });

  await page.evaluate(() => fetch("/api/auth/logout", { method: "POST" }));
  await page.goto("/signup");
  const middleEmail = uniqueEmail("middle-stream");
  await page.getByLabel("Nom complet").fill("Élève collège");
  await page.getByLabel("Email").fill(middleEmail);
  await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirmer le mot de passe").fill(PASSWORD);
  await page.getByRole("button", { name: "Inscription" }).click();
  await page.waitForURL("**/onboarding");
  await page.getByRole("radio", { name: "3ᵉ", exact: true }).click();
  await completeOnboarding(page);
  const middlePrefs = await page.evaluate((email) => JSON.parse(localStorage.getItem(`layaida:${email}:prefs`) ?? "{}"), middleEmail);
  expect(middlePrefs).toMatchObject({ grade: "troisieme", onboarded: true });
  expect(middlePrefs).not.toHaveProperty("academicStream");
});

test("free resources download has no lead POST or contact/IP submission", async ({ page }) => {
  const postRequests: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") postRequests.push(request.url());
  });

  await page.goto("/resources");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Télécharger la fiche PDF", exact: true }).click();
  const result = await download;
  expect(result.suggestedFilename()).toBe("layaida-fonctions-exponentielles-exercices.pdf");
  await expect(page.getByRole("status")).toBeVisible();
  expect(postRequests).toEqual([]);
});
