"use client";

import React, { useState } from "react";
import { X, Award, CheckCircle2, Printer } from "lucide-react";
import { LearnerProgress } from "@/lib/lmsStore";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: LearnerProgress;
  onUpdateName?: (name: string) => void;
}

export function CertificateModal({
  isOpen,
  onClose,
  progress,
  onUpdateName,
}: CertificateModalProps) {
  const [studentName, setStudentName] = useState(progress.studentName || "Honored Student");
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const certificateId = `DCG-CERT-${Math.abs((progress.xp || 100) * 73 + 1042).toString(16).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSaveName = () => {
    setIsEditing(false);
    if (onUpdateName) {
      onUpdateName(studentName);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 my-auto max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 sm:top-5 right-3.5 sm:right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-xl hover:bg-neutral-100 transition z-20"
          aria-label="Close certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container (print-friendly) */}
        <div
          id="digihub-certificate"
          className="relative bg-[#FCFAF7] p-5 sm:p-12 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-double border-neutral-300 text-center shadow-inner overflow-hidden"
        >
          {/* Institutional Crest */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mb-2.5 sm:mb-3 border border-brand-blue/30 shadow-2xs">
              <Award className="w-6 sm:w-7 h-6 sm:h-7" />
            </div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-neutral-500">
              DigiConnect Ghana • DIGIHub
            </span>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              Certificate of Achievement
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 max-w-md px-2">
              This credential certifies the successful completion of practical technical curriculum and hands-on laboratory exercises.
            </p>
          </div>

          {/* Student Name */}
          <div className="relative z-10 my-5 sm:my-8 py-4 sm:py-5 border-y border-neutral-200 max-w-lg mx-auto">
            <p className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest font-medium">
              Conferred Upon
            </p>
            {isEditing ? (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 px-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-lg sm:text-2xl font-serif font-bold text-center bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-neutral-900 focus:outline-none focus:border-brand-blue max-w-xs w-full"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-1.5 bg-brand-blue text-white font-semibold text-xs rounded-xl hover:bg-brand-blue-dark"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2
                onClick={() => setIsEditing(true)}
                title="Click to edit name"
                className="text-xl sm:text-3xl font-serif font-bold text-neutral-900 mt-2 cursor-pointer hover:underline decoration-neutral-300 decoration-dashed transition break-words px-2"
              >
                {studentName}
              </h2>
            )}
            <p className="text-[11px] sm:text-xs text-neutral-600 mt-2 sm:mt-3 leading-relaxed px-2">
              for completing the <span className="font-semibold text-neutral-900">Foundations of Web Coding</span> and{" "}
              <span className="font-semibold text-neutral-900">Applied Cybersecurity Defense</span> tracks.
            </p>
          </div>

          {/* Signatures & Credentials Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-3.5 sm:pt-4 text-xs border-t border-neutral-200">
            <div className="text-center sm:text-left">
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Date Conferred</span>
              <span className="font-medium text-neutral-700">{issueDate}</span>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>
              <span className="text-[10px] text-neutral-400 block font-mono mt-0.5 break-all">{certificateId}</span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Academic Lead</span>
              <span className="font-serif italic text-neutral-800 text-sm">DigiConnect Ghana</span>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-neutral-500 text-center sm:text-left">
            Tap student name to personalize before printing.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold transition shadow-2xs text-center"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
