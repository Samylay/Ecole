"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Quiz } from "@/lib/quiz-data";

type QuizState = "idle" | "active" | "results";

export function QuizComponent({ quiz }: { quiz: Quiz }) {
  const { locale } = useLocale();
  const [state, setState] = useState<QuizState>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const question = quiz.questions[currentQ];
  const selected = answers[currentQ];
  const isCorrect = selected === question?.correctIndex;
  const score = answers.reduce<number>((acc, a, i) => acc + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);

  const labels = {
    fr: { start: "Commencer le quiz", next: "Suivant", prev: "Précédent", finish: "Voir les résultats", retry: "Recommencer", question: "Question", of: "sur", score: "Score", correct: "Correct !", wrong: "Incorrect", explanation: "Explication" },
    en: { start: "Start Quiz", next: "Next", prev: "Previous", finish: "View Results", retry: "Try Again", question: "Question", of: "of", score: "Score", correct: "Correct!", wrong: "Incorrect", explanation: "Explanation" },
    ar: { start: "ابدأ الاختبار", next: "التالي", prev: "السابق", finish: "عرض النتائج", retry: "إعادة المحاولة", question: "سؤال", of: "من", score: "النتيجة", correct: "!صحيح", wrong: "خطأ", explanation: "التفسير" },
  };
  const l = labels[locale];

  if (state === "idle") {
    return (
      <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold">Quiz</h3>
            <p className="text-gray-400 text-sm">{quiz.questions.length} {l.question.toLowerCase()}s</p>
          </div>
        </div>
        <button
          onClick={() => setState("active")}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all active:scale-[0.98]"
        >
          {l.start}
        </button>
      </div>
    );
  }

  if (state === "results") {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const isGood = percentage >= 70;
    return (
      <div className="bg-gray-800 rounded-xl p-6 mt-6 animate-scale-in">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4 ${isGood ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
            {percentage}%
          </div>
          <h3 className="text-white text-xl font-bold mb-1">{l.score}</h3>
          <p className="text-gray-400">
            {score}/{quiz.questions.length} {l.correct.toLowerCase().replace("!", "")}
          </p>

          {/* Review answers */}
          <div className="mt-6 space-y-3 text-left">
            {quiz.questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correctIndex;
              return (
                <div key={q.id} className={`p-3 rounded-lg border ${correct ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                  <p className="text-sm text-gray-300">{q.question[locale]}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {correct ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-sm ${correct ? "text-green-400" : "text-red-400"}`}>
                      {userAnswer !== null ? q.options[userAnswer][locale] : "—"}
                    </span>
                    {!correct && (
                      <span className="text-sm text-gray-500 ml-2">
                        → {q.options[q.correctIndex][locale]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => { setState("active"); setCurrentQ(0); setAnswers(new Array(quiz.questions.length).fill(null)); setShowExplanation(false); }}
            className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            {l.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-6 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">
          {l.question} {currentQ + 1} {l.of} {quiz.questions.length}
        </span>
        <div className="flex gap-1">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentQ ? "bg-indigo-500" : answers[i] !== null ? "bg-indigo-400/40" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-white text-lg font-semibold mb-4">{question.question[locale]}</h3>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isAnswer = question.correctIndex === i;
          const showResult = selected !== null;

          let style = "border-gray-600 hover:border-indigo-500 hover:bg-gray-700";
          if (showResult) {
            if (isAnswer) style = "border-green-500 bg-green-500/10";
            else if (isSelected && !isCorrect) style = "border-red-500 bg-red-500/10";
            else style = "border-gray-700 opacity-50";
          } else if (isSelected) {
            style = "border-indigo-500 bg-indigo-500/10";
          }

          return (
            <button
              key={i}
              onClick={() => {
                if (selected !== null) return;
                const newAnswers = [...answers];
                newAnswers[currentQ] = i;
                setAnswers(newAnswers);
                setShowExplanation(true);
              }}
              disabled={selected !== null}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                  showResult && isAnswer ? "border-green-500 text-green-400" :
                  showResult && isSelected ? "border-red-500 text-red-400" :
                  isSelected ? "border-indigo-500 text-indigo-400" :
                  "border-gray-500 text-gray-400"
                }`}>
                  {showResult && isAnswer ? "✓" : showResult && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <span className={`text-sm ${showResult && isAnswer ? "text-green-400" : showResult && isSelected && !isCorrect ? "text-red-400" : "text-gray-300"}`}>
                  {option[locale]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && selected !== null && (
        <div className={`mt-4 p-4 rounded-lg animate-fade-in ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-yellow-500/10 border border-yellow-500/30"}`}>
          <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-green-400" : "text-yellow-400"}`}>
            {isCorrect ? l.correct : l.wrong} — {l.explanation}
          </p>
          <p className="text-sm text-gray-300">{question.explanation[locale]}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => { setCurrentQ((p) => p - 1); setShowExplanation(answers[currentQ - 1] !== null); }}
          disabled={currentQ === 0}
          className="text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {l.prev}
        </button>
        {currentQ < quiz.questions.length - 1 ? (
          <button
            onClick={() => { setCurrentQ((p) => p + 1); setShowExplanation(answers[currentQ + 1] !== null); }}
            disabled={selected === null}
            className="text-sm text-indigo-400 hover:text-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {l.next}
          </button>
        ) : (
          <button
            onClick={() => setState("results")}
            disabled={answers.some((a) => a === null)}
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed font-medium hover:bg-indigo-700 transition-all"
          >
            {l.finish}
          </button>
        )}
      </div>
    </div>
  );
}
