"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button, ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { formatNumber, Locale } from "@/lib/i18n";
import { getCourse, getQuiz, QuizQuestion } from "@/lib/data";
import { getWrongQuestions, clearWrongQuestion, migrateLegacyProgress } from "@/lib/progress";
import { rovingTabIndexHandler } from "@/lib/rovingTabIndex";

type ReviewItem = {
  courseId: string;
  chapterId: string;
  courseTitle: string;
  chapterTitle: string;
  question: QuizQuestion;
};

function loadQueue(locale: Locale): ReviewItem[] {
  const items: ReviewItem[] = [];
  for (const ref of getWrongQuestions()) {
    const course = getCourse(ref.courseId);
    const chapter = course?.chapters.find((c) => c.id === ref.chapterId);
    const question = getQuiz(ref.courseId, ref.chapterId)?.find((q) => q.id === ref.questionId);
    if (course && chapter && question) {
      items.push({
        courseId: ref.courseId,
        chapterId: ref.chapterId,
        courseTitle: course.title[locale],
        chapterTitle: chapter.title[locale],
        question,
      });
    }
  }
  return items;
}

export default function ReviewPage() {
  const { locale, t, dir } = useLocale();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const optionsRef = useRef<HTMLDivElement>(null);

  const [queue, setQueue] = useState<ReviewItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"question" | "feedback">("question");
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) router.push("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    migrateLegacyProgress();
    setQueue(loadQueue(locale));
  }, [user, locale]);

  if (isLoading || !user || queue === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-label={t.common.loading} />
      </div>
    );
  }

  const handleValidate = () => {
    if (selected === null) return;
    setPhase("feedback");
  };

  const handleNext = () => {
    const current = queue[index];
    if (selected === current.question.correctIndex) {
      clearWrongQuestion(current.courseId, current.chapterId, current.question.id);
      setCorrectCount((c) => c + 1);
    }
    setSelected(null);
    setPhase("question");
    setIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setQueue(loadQueue(locale));
    setIndex(0);
    setCorrectCount(0);
    setSelected(null);
    setPhase("question");
  };

  if (queue.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
          <EmptyState
            icon={<Check className="h-6 w-6" />}
            title={t.review.emptyTitle}
            body={t.review.emptyBody}
            action={<ButtonLink href="/dashboard">{t.review.backToDashboard}</ButtonLink>}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (index >= queue.length) {
    const stillWrong = getWrongQuestions().length;
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Navbar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 text-center">
          <h1 className="text-[22px] font-semibold text-ink">{t.review.doneTitle}</h1>
          <p className="mt-2 text-[15px] text-slate">{t.review.doneBody}</p>
          <p className="mt-4 font-mono text-[15px] text-muted">
            {formatNumber(locale, correctCount)} / {formatNumber(locale, queue.length)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {stillWrong > 0 && (
              <Button onClick={handleRestart}>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t.review.reviewAgain}
              </Button>
            )}
            <ButtonLink href="/dashboard" variant={stillWrong > 0 ? "secondary" : "primary"}>
              {t.review.backToDashboard}
            </ButtonLink>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const current = queue[index];
  const question = current.question;
  const isCorrect = selected !== null && selected === question.correctIndex;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold text-ink">{t.review.title}</h1>
            <p className="truncate text-[13px] text-muted">
              {current.courseTitle} — {current.chapterTitle}
            </p>
          </div>
          <span className="shrink-0 font-mono text-[11px] font-medium text-muted">
            {t.quiz.questionOf} {formatNumber(locale, index + 1)} / {formatNumber(locale, queue.length)}
          </span>
        </div>

        <h2 className="mt-6 text-[17px] font-semibold leading-snug text-ink">{question.question[locale]}</h2>

        <div
          ref={optionsRef}
          className="mt-6 space-y-3"
          role="radiogroup"
          aria-label={question.question[locale]}
          onKeyDown={rovingTabIndexHandler(
            optionsRef,
            '[role="radio"]',
            (i) => phase !== "feedback" && setSelected(i),
            dir,
          )}
        >
          {question.options.map((option, i) => {
            const picked = selected === i;
            const showCorrect = phase === "feedback" && i === question.correctIndex;
            const showWrong = phase === "feedback" && picked && i !== question.correctIndex;
            return (
              <button
                key={i}
                role="radio"
                aria-checked={picked}
                tabIndex={picked || (selected === null && i === 0) ? 0 : -1}
                disabled={phase === "feedback"}
                onClick={() => setSelected(i)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-card border-[1.5px] px-5 py-3.5 text-start text-[15px] font-medium transition-[border-color,background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] disabled:active:scale-100 ${
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

        {phase === "feedback" && (
          <div role="status" className={`mt-5 rounded-card p-5 ${isCorrect ? "bg-success-soft" : "bg-error-soft"}`}>
            <p className={`text-[15px] font-semibold ${isCorrect ? "text-success" : "text-error"}`}>
              {isCorrect ? t.quiz.correct : t.quiz.incorrect}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-slate">
              <span className="font-semibold">{t.quiz.explanation} : </span>
              {question.explanation[locale]}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {phase === "question" ? (
            <Button onClick={handleValidate} disabled={selected === null}>
              {t.quiz.validate}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {index + 1 >= queue.length ? t.quiz.seeResults : t.quiz.nextQuestion}
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
