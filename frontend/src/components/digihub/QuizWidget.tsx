"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Award } from "lucide-react";
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
    <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 tab-content-enter">
      {/* Header */}
      <div className="border-b border-neutral-100 pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <span>Knowledge Check</span>
            {xpAward && (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue text-[10px] font-bold border border-blue-200/60">
                +{xpAward} XP
              </span>
            )}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Verify your understanding of this module&apos;s key concepts to complete the lesson.
          </p>
        </div>
        <div className="hidden sm:block text-xs font-semibold text-neutral-400">
          {Object.keys(selectedAnswers).length}/{questions.length} Ready
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const selectedOpt = selectedAnswers[q.id];
          const isCorrect = selectedOpt === q.correctAnswer;

          return (
            <div key={q.id} className="space-y-3 animate-fade-in-up" style={{ animationDelay: `${qIndex * 60}ms` }}>
              <div className="text-xs font-semibold text-neutral-900 leading-relaxed flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <span>{q.question}</span>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selectedOpt === optIndex;
                  const isThisCorrect = q.correctAnswer === optIndex;

                  let style = "bg-white border-neutral-200 text-neutral-800 hover:border-brand-blue/50 hover:bg-neutral-50/70";

                  if (submitted) {
                    if (isThisCorrect) {
                      style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold shadow-xs";
                    } else if (isThisSelected && !isThisCorrect) {
                      style = "bg-rose-50 border-rose-300 text-rose-900 shadow-xs";
                    } else {
                      style = "bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60";
                    }
                  } else if (isThisSelected) {
                    style = "bg-brand-blue-light/50 border-brand-blue text-brand-blue-dark font-semibold shadow-xs";
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition quiz-option flex items-center justify-between ${style}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2 animate-scale-in" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2 animate-scale-in" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed animate-fade-in-up ${
                    isCorrect ? "bg-emerald-50/80 border border-emerald-200 text-emerald-900" : "bg-neutral-50 border border-neutral-200 text-neutral-700"
                  }`}
                >
                  <span className="font-bold">{isCorrect ? "✓ Well Done: " : "💡 Concept Review: "}</span>
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
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isPassed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {isPassed ? <Award className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
              </div>
              <div className="text-xs">
                <div className="font-bold text-neutral-900 flex items-center gap-2">
                  <span>Score: {score} of {questions.length}</span>
                  {isPassed && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      100% Mastered!
                    </span>
                  )}
                </div>
                <p className="text-neutral-500 mt-0.5">
                  {isPassed ? "Excellent work! Your module score has been recorded." : "Review the highlighted explanations above and give it another try."}
                </p>
              </div>
            </div>

            <button
              onClick={handleRetake}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-neutral-400">
              {Object.keys(selectedAnswers).length} of {questions.length} questions answered
            </span>

            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition shadow-2xs active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
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

