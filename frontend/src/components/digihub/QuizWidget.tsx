"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/lib/lmsStore";

interface QuizWidgetProps {
  questions: QuizQuestion[];
  xpAward?: number;
  onQuizPassed?: () => void;
  onQuizCompleted?: (score: number, total: number) => void;
}

export function QuizWidget({ questions, xpAward, onQuizPassed, onQuizCompleted }: QuizWidgetProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const isPassed = score === questions.length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (onQuizCompleted) {
      onQuizCompleted(score, questions.length);
    }
    if (isPassed && onQuizPassed) {
      onQuizPassed();
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-100 pb-4">
        <h3 className="text-base font-bold text-neutral-900">Knowledge Check</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Verify your understanding of this module&apos;s key concepts to complete the lesson.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const selectedOpt = selectedAnswers[q.id];
          const isCorrect = selectedOpt === q.correctAnswer;

          return (
            <div key={q.id} className="space-y-3">
              <div className="text-xs font-semibold text-neutral-900 leading-relaxed">
                {qIndex + 1}. {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selectedOpt === optIndex;
                  const isThisCorrect = q.correctAnswer === optIndex;

                  let style = "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50";

                  if (submitted) {
                    if (isThisCorrect) {
                      style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                    } else if (isThisSelected && !isThisCorrect) {
                      style = "bg-rose-50 border-rose-300 text-rose-900";
                    } else {
                      style = "bg-neutral-50 border-neutral-200 text-neutral-400";
                    }
                  } else if (isThisSelected) {
                    style = "bg-brand-blue-light/50 border-brand-blue text-brand-blue-dark font-semibold";
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <span className="font-semibold">{isCorrect ? "Correct: " : "Explanation: "}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Actions & Results */}
      <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {submitted ? (
          <>
            <div className="text-xs">
              <span className="font-bold text-neutral-900">Score: {score} of {questions.length}</span>
              <span className="text-neutral-500 ml-2">
                {isPassed ? "Great job, all answers correct!" : "Review the explanations above and try again."}
              </span>
            </div>

            <button
              onClick={handleRetake}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-neutral-400">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </span>

            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Submit Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
