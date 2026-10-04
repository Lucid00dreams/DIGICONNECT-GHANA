"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Award, RotateCcw } from "lucide-react";
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
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block">
            Knowledge Check
          </span>
          <h3 className="font-extrabold text-base text-neutral-900">
            Verify Your Understanding ({questions.length} Questions)
          </h3>
        </div>
        {submitted && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isPassed
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            <span>
              {score} / {questions.length} Correct
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          return (
            <div key={q.id} className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-800 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <span>{q.question}</span>
              </h4>

              <div className="space-y-2 pl-7">
                {q.options.map((opt, optIndex) => {
                  const isChosen = selected === optIndex;
                  const isCorrect = q.correctAnswer === optIndex;

                  let optionStyle = "border-neutral-200 hover:border-brand-blue/50 bg-neutral-50/50";
                  if (submitted) {
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold";
                    } else if (isChosen && !isCorrect) {
                      optionStyle = "border-rose-400 bg-rose-50/80 text-rose-900";
                    } else {
                      optionStyle = "border-neutral-100 opacity-50";
                    }
                  } else if (isChosen) {
                    optionStyle = "border-brand-blue bg-brand-blue/10 text-brand-blue font-semibold";
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {submitted && isChosen && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="ml-7 p-3 rounded-xl bg-neutral-100/80 border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
        {!submitted ? (
          <button
            type="button"
            disabled={Object.keys(selectedAnswers).length < questions.length}
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold disabled:bg-neutral-200 disabled:cursor-not-allowed transition-all shadow-xs ml-auto"
          >
            Submit Answers
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-neutral-600">
              {isPassed ? (
                <strong className="text-emerald-600">All questions correct! You earned full XP.</strong>
              ) : (
                <span className="text-rose-600">Review the explanations above and try again.</span>
              )}
            </span>
            {!isPassed && (
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
