import { test, expect, Page } from "@playwright/test";

// Smoke suite (P1-T6) — runs against a prod build with a throwaway SQLite DB
// (see playwright.config.ts). UI is exercised in the default locale (fr).

const PASSWORD = "motdepasse123";

function uniqueEmail(tag: string): string {
  return `e2e-${tag}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@test.local`;
}

async function signupStudent(page: Page, email: string) {
  await page.goto("/signup");
  await page.getByLabel("Nom complet").fill("Élève E2E");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mot de passe", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirmer le mot de passe").fill(PASSWORD);
  await page.getByRole("button", { name: "Inscription" }).click();
  await page.waitForURL("**/onboarding");
}

test("signup → onboarding → enroll → complete lesson → quiz happy path", async ({ page }) => {
  await signupStudent(page, uniqueEmail("happy"));

  // Onboarding: keep the defaults through the 3 steps.
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "C'est parti !" }).click();
  await page.waitForURL("**/dashboard");

  // Enroll in the pilot course.
  await page.goto("/course/math-algebra-101");
  await page.getByRole("button", { name: "S'inscrire gratuitement" }).click();

  // Complete the first lesson.
  await page.goto("/course/math-algebra-101/lesson/l1");
  await page.getByRole("button", { name: "Marquer comme terminée" }).click();
  await expect(page.getByRole("button", { name: "Terminée" })).toBeVisible();

  // Take the chapter quiz: always pick the first option, walk to the results.
  await page.goto("/course/math-algebra-101/quiz/ch1");
  for (let i = 0; i < 10; i++) {
    await page.getByRole("radio").first().click();
    await page.getByRole("button", { name: "Valider" }).click();
    const seeResults = page.getByRole("button", { name: "Voir les résultats" });
    if (await seeResults.isVisible()) {
      await seeResults.click();
      break;
    }
    await page.getByRole("button", { name: "Question suivante" }).click();
  }
  await expect(page.getByRole("heading", { name: "Résultats" })).toBeVisible();
});

test("locale switch to Arabic flips dir to rtl and back", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  await page.getByRole("button", { name: /Français/ }).click();
  await page.getByRole("navigation").getByText("العربية").click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");

  await page.getByRole("button", { name: /العربية/ }).click();
  await page.getByRole("navigation").getByText("Français").click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("dark-mode toggle applies and removes the dark class", async ({ page }) => {
  await signupStudent(page, uniqueEmail("theme"));
  // Skip onboarding with defaults, then open the profile settings.
  await page.getByRole("button", { name: "Passer" }).click();
  await page.waitForURL("**/dashboard");

  await page.goto("/profile");
  await page.getByRole("button", { name: "Préférences" }).click();
  await page.getByText("Sombre", { exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByText("Clair", { exact: true }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
