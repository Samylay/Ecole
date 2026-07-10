"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Check } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/Button";
import { setPrefs } from "@/lib/progress";
import { subjectColors, subjectIcons, Subject } from "@/lib/data";

const GRADES = ["sixieme", "cinquieme", "quatrieme", "troisieme", "seconde", "premiere", "terminale"] as const;
const SUBJECTS: Subject[] = ["math", "physics", "biology"];
const GOALS = [
  { id: "light", target: 2 },
  { id: "regular", target: 4 },
  { id: "intense", target: 7 },
] as const;

export default function OnboardingPage() {
  const { t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<string>("troisieme");
  const [subjects, setSubjects] = useState<Subject[]>([...SUBJECTS]);
  const [goal, setGoal] = useState<(typeof GOALS)[number]["id"]>("regular");
  const [reminders, setReminders] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const finish = (useDefaults = false) => {
    const target = useDefaults ? 4 : GOALS.find((g) => g.id === goal)!.target;
    setPrefs({
      grade: useDefaults ? "troisieme" : grade,
      subjects: useDefaults ? [...SUBJECTS] : subjects.length ? subjects : [...SUBJECTS],
      weeklyGoal: target,
      reminders: useDefaults ? true : reminders,
      onboarded: true,
    });
    showToast(t.onboarding.welcomeToast);
    router.push("/dashboard");
  };

  const toggleSubject = (s: Subject) => {
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const stepTitles = [
    { title: t.onboarding.classTitle, subtitle: t.onboarding.classSubtitle },
    { title: t.onboarding.subjectsTitle, subtitle: t.onboarding.subjectsSubtitle },
    { title: t.onboarding.goalTitle, subtitle: t.onboarding.goalSubtitle },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-8">
        {/* Segmented top progress */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 gap-1.5" aria-label={`${t.onboarding.step} ${step + 1} / 3`}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-pill transition-colors duration-[var(--duration-base)] ${
                  i <= step ? "bg-primary" : "bg-mist"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => finish(true)}
            className="rounded-pill px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-mist"
          >
            {t.common.skip}
          </button>
        </div>

        <div className="mt-10 flex-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wide text-muted">
            {t.onboarding.step} {step + 1} / 3
          </p>
          <h1 className="mt-2 text-[22px] font-semibold text-ink">{stepTitles[step].title}</h1>
          <p className="mt-1 text-[15px] text-muted">{stepTitles[step].subtitle}</p>

          {/* Step 1 — classe */}
          {step === 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label={t.onboarding.classTitle}>
              {GRADES.map((g) => {
                const active = grade === g;
                return (
                  <button
                    key={g}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setGrade(g)}
                    className={`min-h-11 rounded-input border-[1.5px] px-4 py-3 text-start text-[15px] font-medium transition-[border-color,background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                      active
                        ? "border-primary bg-primary-soft/50 text-ink"
                        : "border-mist text-slate hover:border-faint"
                    }`}
                  >
                    {t.grades[g]}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2 — matières (multi) */}
          {step === 1 && (
            <div className="mt-6 space-y-3">
              {SUBJECTS.map((s) => {
                const active = subjects.includes(s);
                const colors = subjectColors[s];
                return (
                  <button
                    key={s}
                    role="checkbox"
                    aria-checked={active}
                    onClick={() => toggleSubject(s)}
                    className={`flex w-full items-center gap-4 rounded-card border-[1.5px] p-4 text-start transition-[border-color,background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                      active ? "border-primary bg-primary-soft/40" : "border-mist hover:border-faint"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-input text-xl ${colors.bg} ${colors.text}`}
                      aria-hidden="true"
                    >
                      {subjectIcons[s]}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-ink">{t.subjects[s]}</span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-pill border-[1.5px] transition-colors duration-[var(--duration-base)] ${
                        active ? "border-primary bg-primary text-white" : "border-mist"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <Check className="h-4 w-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 3 — objectif hebdo + rappels */}
          {step === 2 && (
            <div className="mt-6 space-y-3">
              <div role="radiogroup" aria-label={t.onboarding.goalTitle} className="space-y-3">
                {GOALS.map((g) => {
                  const active = goal === g.id;
                  const labels = {
                    light: [t.onboarding.goalLight, t.onboarding.goalLightDesc],
                    regular: [t.onboarding.goalRegular, t.onboarding.goalRegularDesc],
                    intense: [t.onboarding.goalIntense, t.onboarding.goalIntenseDesc],
                  }[g.id];
                  return (
                    <button
                      key={g.id}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setGoal(g.id)}
                      className={`flex w-full items-center justify-between rounded-card border-[1.5px] p-4 text-start transition-[border-color,background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                        active ? "border-primary bg-primary-soft/40" : "border-mist hover:border-faint"
                      }`}
                    >
                      <div>
                        <span className="block text-[15px] font-semibold text-ink">{labels[0]}</span>
                        <span className="block text-[13px] text-muted">{labels[1]}</span>
                      </div>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-pill border-[1.5px] transition-colors duration-[var(--duration-base)] ${
                          active ? "border-primary bg-primary text-white" : "border-mist"
                        }`}
                        aria-hidden="true"
                      >
                        {active && <Check className="h-4 w-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between rounded-card border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted" aria-hidden="true" />
                  <div>
                    <span className="block text-[15px] font-medium text-ink">{t.onboarding.reminders}</span>
                    <span className="block text-[13px] text-muted">{t.onboarding.remindersDesc}</span>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={reminders}
                  aria-label={t.onboarding.reminders}
                  onClick={() => setReminders(!reminders)}
                  className={`relative h-7 w-12 shrink-0 rounded-pill transition-colors duration-[var(--duration-base)] ${
                    reminders ? "bg-primary" : "bg-mist"
                  }`}
                >
                  <span
                    className="absolute start-1 top-1 h-5 w-5 rounded-pill bg-white transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)]"
                    style={{
                      transform: reminders
                        ? `translateX(${dir === "rtl" ? "-" : ""}1.25rem)`
                        : "translateX(0)",
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              {t.common.back}
            </Button>
          )}
          <div className="flex-1" />
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)}>{t.common.continue}</Button>
          ) : (
            <Button onClick={() => finish(false)}>{t.onboarding.start}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
