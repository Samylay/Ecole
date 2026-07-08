"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Check, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { Button, ButtonLink } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { ProgressRing } from "@/components/Progress";
import { formatNumber } from "@/lib/i18n";
import { getCourse, getQuiz, QuizQuestion } from "@/lib/data";
import { recordQuizAttempt, getLastQuizAttempt, migrateLegacyProgress } from "@/lib/progress";

type Phase = "question" | "feedback" | "results";

function shuffleWrongFirst(questions: QuizQuestion[], wrongIds: string[]): QuizQuestion[] {
  const wrong = questions.filter((q) => wrongIds.includes(q.id));
  const right = questions.filter((q) => !wrongIds.includes(q.id));
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
  return [...shuffle(wrong), ...shuffle(right)];
}

export default function QuizPage({ params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  const { courseId, chapterId } = use(params);
  const { locale, t } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const course = getCourse(courseId);
  const baseQuestions = useMemo(() => getQuiz(courseId, chapterId), [courseId, chapterId]);
  const chapter = course?.chapters.find((c) => c.id === chapterId);

  const [questions, setQuestions] = useState<QuizQuestion[]>(baseQuestions ?? []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [answers, setAnswers] = useState<{ id: string; correct: boolean; picked: number }[]>([]);
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    migrateLegacyProgress();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!course || !chapter || !baseQuestions) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
        <h1 className="text-[22px] font-semibold text-ink">{t.quiz.noQuiz}</h1>
        <ButtonLink href={`/course/${courseId}`} className="mt-6">
          {t.lesson.backToCourse}
        </ButtonLink>
      </div>
    );
  }

  const question = questions[index];
  const correctCount = answers.filter((a) => a.correct).length;
  const isCorrect = selected !== null && question && selected === question.correctIndex;

  const handleValidate = () => {
    if (selected === null || !question) return;
    setAnswers((prev) => [...prev, { id: question.id, correct: selected === question.correctIndex, picked: selected }]);
    setPhase("feedback");
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      // answers already includes the current question (added on validate)
      recordQuizAttempt({
        courseId,
        chapterId,
        score: answers.filter((a) => a.correct).length,
        total: questions.length,
        wrongQuestionIds: answers.filter((a) => !a.correct).map((a) => a.id),
        date: Date.now(),
      });
      setPhase("results");
    } else {
      setIndex(index + 1);
      setSelected(null);
      setPhase("question");
    }
  };

  const handleReplay = () => {
    const last = getLastQuizAttempt(courseId, chapterId);
    setQuestions(shuffleWrongFirst(baseQuestions, last?.wrongQuestionIds ?? []));
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setPhase("question");
  };

  const scorePct = Math.round((correctCount / questions.length) * 100);
  const scoreMessage = scorePct === 100 ? t.quiz.perfect : scorePct >= 60 ? t.quiz.goodJob : t.quiz.keepGoing;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top bar: exit + progress (never goes backwards) */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-4 px-4">
          <button
            onClick={() => (phase === "results" ? router.push(`/course/${courseId}`) : setExitOpen(true))}
            aria-label={t.quiz.exitTitle}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-slate transition-colors hover:bg-mist"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-ink">
              {t.quiz.title} — {chapter.title[locale]}
            </p>
          </div>
          {phase !== "results" && (
            <span className="shrink-0 font-mono text-[11px] font-medium text-muted">
              {t.quiz.questionOf} {formatNumber(locale, index + 1)} / {formatNumber(locale, questions.length)}
            </span>
          )}
        </div>
        <div className="h-1 bg-mist">
          <div
            className="h-full bg-primary transition-[width] duration-[180ms] ease-out"
            style={{ width: `${phase === "results" ? 100 : (index / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        {phase !== "results" && question && (
          <>
            <h1 className="text-[22px] font-semibold leading-snug text-ink">{question.question[locale]}</h1>

            <div className="mt-6 space-y-3" role="radiogroup" aria-label={question.question[locale]}>
              {question.options.map((option, i) => {
                const picked = selected === i;
                const showCorrect = phase === "feedback" && i === question.correctIndex;
                const showWrong = phase === "feedback" && picked && i !== question.correctIndex;
                return (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={picked}
                    disabled={phase === "feedback"}
                    onClick={() => setSelected(i)}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-card border-[1.5px] px-5 py-3.5 text-start text-[15px] font-medium transition-all duration-[180ms] ${
                      showCorrect
                        ? "border-success bg-success-soft text-ink"
                        : showWrong
                          ? "border-error bg-error-soft text-ink"
                          : picked
                            ? "border-primary bg-primary-soft/50 text-ink"
                            : "border-mist text-slate hover:border-faint disabled:hover:border-mist"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-pill border-[1.5px] transition-colors ${
                        showCorrect
                          ? "border-success bg-success text-white"
                          : showWrong
                            ? "border-error bg-error text-white"
                            : picked
                              ? "border-primary bg-primary text-white"
                              : "border-mist"
                      }`}
                      aria-hidden="true"
                    >
                      {showCorrect ? <Check className="h-4 w-4" /> : showWrong ? <X className="h-4 w-4" /> : null}
                    </span>
                    {option[locale]}
                  </button>
                );
              })}
            </div>

            {/* Feedback card */}
            {phase === "feedback" && (
              <div
                role="status"
                className={`mt-5 rounded-card p-5 ${isCorrect ? "bg-success-soft" : "bg-error-soft"}`}
              >
                <p className={`text-[15px] font-semibold ${isCorrect ? "text-success" : "text-error"}`}>
                  {isCorrect ? t.quiz.correct : t.quiz.incorrect}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">
                  <span className="font-semibold">{t.quiz.explanation} : </span>
                  {question.explanation[locale]}
                </p>
                <Link
                  href={`/course/${courseId}/lesson/${question.lessonId}`}
                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:underline"
                >
                  {t.quiz.backToLesson}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              {phase === "question" ? (
                <Button onClick={handleValidate} disabled={selected === null}>
                  {t.quiz.validate}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {index + 1 >= questions.length ? t.quiz.seeResults : t.quiz.nextQuestion}
                </Button>
              )}
            </div>
          </>
        )}

        {/* Results */}
        {phase === "results" && (
          <div className="text-center">
            <h1 className="text-[22px] font-semibold text-ink">{t.quiz.results}</h1>
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

            {/* Per-question review */}
            <div className="mt-8 text-start">
              <h2 className="text-[15px] font-semibold text-ink">{t.quiz.reviewAnswers}</h2>
              <ul className="mt-3 space-y-2">
                {questions.map((q) => {
                  const answer = answers.find((a) => a.id === q.id);
                  const ok = answer?.correct ?? false;
                  return (
                    <li key={q.id}>
                      <Link
                        href={`/course/${courseId}/lesson/${q.lessonId}`}
                        className="flex min-h-12 items-center gap-3 rounded-card border border-border bg-surface px-4 py-3 transition-colors duration-[180ms] hover:bg-bg"
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
                          {q.question[locale]}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="secondary" onClick={handleReplay}>
                {t.quiz.replay}
              </Button>
              <ButtonLink href={`/course/${courseId}`}>{t.lesson.backToCourse}</ButtonLink>
            </div>
          </div>
        )}
      </main>

      {/* Exit confirm */}
      <Modal open={exitOpen} onClose={() => setExitOpen(false)} title={t.quiz.exitTitle}>
        <p className="text-[15px] text-slate">{t.quiz.exitBody}</p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setExitOpen(false)}>
            {t.quiz.exitCancel}
          </Button>
          <Button variant="danger" onClick={() => router.push(`/course/${courseId}`)}>
            {t.quiz.exitConfirm}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
