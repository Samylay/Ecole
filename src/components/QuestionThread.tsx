"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Check, MessageCircle, UserRound } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/Button";

type Answer = {
  id: number;
  question_id: number;
  author_name: string;
  author_role: "student" | "parent" | "teacher" | "admin";
  body: string;
  created_at: number;
  accepted: 0 | 1;
};

type Question = {
  id: number;
  author_name: string;
  body: string;
  created_at: number;
  answers: Answer[];
  canAccept: boolean;
};

type PageResponse = {
  success: boolean;
  questions: Question[];
  hasMore: boolean;
  nextOffset: number;
};

const MAX_LENGTH = 500;

export function QuestionThread({
  courseId,
  lessonId,
  isStaff,
  canAsk,
}: {
  courseId: string;
  lessonId: string;
  isStaff: boolean;
  canAsk: boolean;
}) {
  const { locale, t } = useLocale();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);
  const [unansweredOnly, setUnansweredOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questionBody, setQuestionBody] = useState("");
  const [replyFor, setReplyFor] = useState<number | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const endpoint = useCallback(
    (offset = 0) => {
      const query = new URLSearchParams({ courseId, offset: String(offset) });
      if (unansweredOnly) query.set("unanswered", "1");
      return `/api/lessons/${encodeURIComponent(lessonId)}/questions?${query}`;
    },
    [courseId, lessonId, unansweredOnly]
  );

  const load = useCallback(
    async (offset = 0) => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(endpoint(offset));
        if (!response.ok) throw new Error("request_failed");
        const data = (await response.json()) as PageResponse;
        setQuestions((current) => (offset === 0 ? data.questions : [...current, ...data.questions]));
        setHasMore(data.hasMore);
        setNextOffset(data.nextOffset);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    void load(0);
  }, [load]);

  const refresh = async () => {
    setReplyFor(null);
    setReplyBody("");
    await load(0);
  };

  const postQuestion = async (event: FormEvent) => {
    event.preventDefault();
    const body = questionBody.trim();
    if (!body || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(endpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!response.ok) throw new Error("request_failed");
      setQuestionBody("");
      await refresh();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const postAnswer = async (event: FormEvent, questionId: number) => {
    event.preventDefault();
    const body = replyBody.trim();
    if (!body || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(
        `/api/lessons/${encodeURIComponent(lessonId)}/questions/${questionId}/answers?courseId=${encodeURIComponent(courseId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body }),
        }
      );
      if (!response.ok) throw new Error("request_failed");
      await refresh();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const accept = async (questionId: number, answerId: number) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(
        `/api/lessons/${encodeURIComponent(lessonId)}/questions/${questionId}/answers/${answerId}/accept?courseId=${encodeURIComponent(courseId)}`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("request_failed");
      await refresh();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const countLabel = (length: number) =>
    t.qa.charactersRemaining.replace("{count}", new Intl.NumberFormat(locale).format(MAX_LENGTH - length));
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="max-w-2xl">
      {canAsk && <form onSubmit={postQuestion} className="rounded-card border border-border bg-surface p-4 sm:p-5">
        <label htmlFor="lesson-question" className="text-[15px] font-semibold text-ink">
          {t.qa.askQuestion}
        </label>
        <textarea
          id="lesson-question"
          value={questionBody}
          onChange={(event) => setQuestionBody(event.target.value)}
          maxLength={MAX_LENGTH}
          rows={3}
          placeholder={t.qa.questionPlaceholder}
          className="mt-3 w-full resize-y rounded-input border-[1.5px] border-mist bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-medium text-faint">{countLabel(questionBody.length)}</span>
          <Button type="submit" disabled={!questionBody.trim() || submitting}>
            {t.qa.publishQuestion}
          </Button>
        </div>
      </form>}

      {isStaff && (
        <label className="mt-4 flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-pill px-3 text-[13px] font-medium text-slate transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]">
          <input
            type="checkbox"
            checked={unansweredOnly}
            onChange={(event) => setUnansweredOnly(event.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          {t.qa.unansweredOnly}
        </label>
      )}

      {error && (
        <div role="alert" className="mt-5 flex items-center justify-between gap-3 rounded-card bg-error-soft p-4 text-[13px] text-error">
          <span>{t.qa.loadError}</span>
          <button onClick={() => void load(0)} className="min-h-11 rounded-pill px-3 font-semibold underline active:scale-[0.98]">
            {t.qa.retry}
          </button>
        </div>
      )}

      {loading && questions.length === 0 ? (
        <p role="status" className="mt-6 text-[15px] text-muted">{t.qa.loading}</p>
      ) : questions.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-border bg-surface px-5 py-8 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <p className="mt-3 text-[15px] text-slate">{unansweredOnly ? t.qa.noUnanswered : t.qa.firstQuestion}</p>
        </div>
      ) : (
        <ul className="mt-5 space-y-4">
          {questions.map((question) => (
            <li key={question.id} className="rounded-card border border-border bg-surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[13px] text-muted">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                <span className="font-semibold text-ink">{question.author_name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={new Date(question.created_at).toISOString()}>{dateFormatter.format(question.created_at)}</time>
              </div>
              {/* React text nodes escape markup, so stored Q&A remains plain text. */}
              <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate">{question.body}</p>

              {question.answers.length > 0 && (
                <ul className="mt-4 space-y-3 border-s-2 border-border ps-4">
                  {question.answers.map((answer) => {
                    const teacherAnswer = answer.author_role === "teacher" || answer.author_role === "admin";
                    return (
                      <li key={answer.id} className={answer.accepted ? "rounded-input bg-success-soft p-3" : "py-2"}>
                        <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
                          <span className="font-semibold text-ink">{answer.author_name}</span>
                          {teacherAnswer && (
                            <span className="rounded-chip bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary-hover dark:text-primary">
                              {t.qa.teacher}
                            </span>
                          )}
                          {answer.accepted === 1 && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
                              <Check className="h-4 w-4" aria-hidden="true" />
                              {t.qa.acceptedAnswer}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate">{answer.body}</p>
                        {question.canAccept && answer.accepted !== 1 && (
                          <button
                            onClick={() => void accept(question.id, answer.id)}
                            disabled={submitting}
                            className="mt-2 min-h-11 rounded-pill px-3 text-[13px] font-semibold text-success transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:bg-success-soft active:scale-[0.98] disabled:opacity-50"
                          >
                            {t.qa.acceptAnswer}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {replyFor === question.id ? (
                <form onSubmit={(event) => void postAnswer(event, question.id)} className="mt-4">
                  <textarea
                    value={replyBody}
                    onChange={(event) => setReplyBody(event.target.value)}
                    maxLength={MAX_LENGTH}
                    rows={3}
                    autoFocus
                    aria-label={t.qa.replyPlaceholder}
                    placeholder={t.qa.replyPlaceholder}
                    className="w-full resize-y rounded-input border-[1.5px] border-mist bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
                  />
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-medium text-faint">{countLabel(replyBody.length)}</span>
                    <Button type="submit" disabled={!replyBody.trim() || submitting}>{t.qa.publishReply}</Button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setReplyFor(question.id);
                    setReplyBody("");
                  }}
                  className="mt-3 min-h-11 rounded-pill px-3 text-[13px] font-semibold text-primary transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:bg-primary-soft active:scale-[0.98]"
                >
                  {t.qa.reply}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <div className="mt-5 text-center">
          <Button variant="secondary" onClick={() => void load(nextOffset)} disabled={loading}>
            {t.qa.loadMore}
          </Button>
        </div>
      )}
    </div>
  );
}
