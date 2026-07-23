"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Clock, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button, ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { ProgressRing } from "@/components/Progress";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber } from "@/lib/i18n";
import { getExamQuestionPool, ExamQuestionRef, Level } from "@/lib/data";
import { rovingTabIndexHandler } from "@/lib/rovingTabIndex";

const MAX_QUESTIONS = 20;
const SECONDS_PER_QUESTION = 60;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type Phase = "select" | "exam" | "results";

export default function ExamPrepPage() {
  const { locale, t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const optionsRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("select");
  const [questions, setQuestions] = useState<ExamQuestionRef[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ id: string; correct: boolean }[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (phase !== "exam") return;
    if (secondsLeft <= 0) {
      setTimedOut(true);
      setPhase("results");
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-label={t.common.loading} />
      </div>
    );
  }

  const startExam = (chosenLevel: Level) => {
    const pool = shuffle(getExamQuestionPool(chosenLevel)).slice(0, MAX_QUESTIONS);
    setQuestions(pool);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setTimedOut(false);
    setSecondsLeft(pool.length * SECONDS_PER_QUESTION);
    setPhase(pool.length === 0 ? "results" : "exam");
  };

  const restart = () => {
    setPhase("select");
    setQuestions([]);
    setAnswers([]);
  };

  if (phase === "select") {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          <h1 className="text-[22px] font-semibold text-ink">{t.examPrep.title}</h1>
          <p className="mt-2 text-[15px] text-slate">{t.examPrep.subtitle}</p>

          <h2 className="mt-8 text-[15px] font-semibold text-ink">{t.examPrep.chooseLevelTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {([
              ["middle", t.examPrep.middleExam],
              ["high", t.examPrep.highExam],
            ] as [Level, string][]).map(([lvl, label]) => (
              <button
                key={lvl}
                onClick={() => startExam(lvl)}
                className="flex min-h-12 items-center gap-3 rounded-card border-[1.5px] border-mist px-5 py-4 text-start text-[15px] font-medium text-ink transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:border-primary active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-primary-soft text-primary-hover dark:text-primary">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                {label}
              </button>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (phase === "exam") {
    const question = questions[index]?.question;
    if (!question) return null;
    const isLast = index + 1 >= questions.length;

    const handleValidate = () => {
      if (selected === null) return;
      setAnswers((prev) => [...prev, { id: question.id, correct: selected === question.correctIndex }]);
      if (isLast) {
        setPhase("results");
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    };

    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <header className="sticky top-0 z-40 border-b border-border bg-surface">
          <div className="mx-auto flex h-14 max-w-2xl items-center gap-4 px-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{t.examPrep.title}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-[13px] font-semibold text-ink">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {formatClock(secondsLeft)}
            </span>
            <span className="shrink-0 font-mono text-[11px] font-medium text-muted">
              {t.quiz.questionOf} {formatNumber(locale, index + 1)} / {formatNumber(locale, questions.length)}
            </span>
          </div>
          <div className="h-1 bg-mist">
            <div
              className="h-full w-full origin-left bg-primary transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)] rtl:origin-right"
              style={{ transform: `scaleX(${index / questions.length})` }}
            />
          </div>
        </header>

        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          <h1 className="text-[22px] font-semibold leading-snug text-ink">{question.question[locale]}</h1>

          <div
            ref={optionsRef}
            className="mt-6 space-y-3"
            role="radiogroup"
            aria-label={question.question[locale]}
            onKeyDown={rovingTabIndexHandler(optionsRef, '[role="radio"]', (i) => setSelected(i), dir)}
          >
            {question.options.map((option, i) => {
              const picked = selected === i;
              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={picked}
                  tabIndex={picked || (selected === null && i === 0) ? 0 : -1}
                  onClick={() => setSelected(i)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-card border-[1.5px] px-5 py-3.5 text-start text-[15px] font-medium transition-[border-color,background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                    picked ? "border-primary bg-primary-soft/50 text-ink" : "border-mist text-slate hover:border-faint"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-pill border-[1.5px] ${
                      picked ? "border-primary bg-primary text-white" : "border-mist"
                    }`}
                    aria-hidden="true"
                  />
                  {option[locale]}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleValidate} disabled={selected === null}>
              {isLast ? t.examPrep.submitExam : t.quiz.nextQuestion}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Results
  const correctCount = answers.filter((a) => a.correct).length;
  const scorePct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const scoreMessage = scorePct === 100 ? t.quiz.perfect : scorePct >= 60 ? t.quiz.goodJob : t.quiz.keepGoing;

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
          <EmptyState
            icon={<GraduationCap className="h-6 w-6" />}
            title={t.examPrep.noQuestionsTitle}
            body={t.examPrep.noQuestionsBody}
            action={<Button onClick={restart}>{t.examPrep.retry}</Button>}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 text-center">
        <h1 className="text-[22px] font-semibold text-ink">{t.examPrep.resultsTitle}</h1>
        {timedOut && (
          <p role="status" className="mt-3 rounded-card bg-warning-soft px-4 py-3 text-[13px] font-medium text-warning">
            {t.examPrep.timeUp}
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <ProgressRing
            value={scorePct}
            size={140}
            strokeWidth={10}
            colorClassName={scorePct >= 60 ? "text-success" : "text-warning"}
            label={t.quiz.yourScore}
          >
            <div>
              <p className="font-mono text-[30px] font-semibold leading-none text-ink">
                {formatNumber(locale, correctCount)}/{formatNumber(locale, questions.length)}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">{t.quiz.yourScore}</p>
            </div>
          </ProgressRing>
        </div>
        <p className="mt-5 text-[15px] text-slate">{scoreMessage}</p>

        <div className="mt-8 text-start">
          <h2 className="text-[15px] font-semibold text-ink">{t.quiz.reviewAnswers}</h2>
          <ul className="mt-3 space-y-2">
            {questions.map((ref, i) => {
              const answer = answers[i];
              const ok = answer?.correct ?? false;
              return (
                <li key={`${ref.courseId}:${ref.question.id}`}>
                  <Link
                    href={`/course/${ref.courseId}/lesson/${ref.question.lessonId}`}
                    className="flex min-h-12 items-center gap-3 rounded-card border border-border bg-surface px-4 py-3 transition-colors duration-[var(--duration-base)] hover:bg-bg"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-pill ${
                        ok ? "bg-success-soft text-success" : "bg-error-soft text-error"
                      }`}
                      aria-hidden="true"
                    >
                      {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                      {ref.question.question[locale]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={restart}>{t.examPrep.retry}</Button>
          <ButtonLink href="/dashboard" variant="secondary">
            {t.examPrep.backToDashboard}
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </div>
  );
}
