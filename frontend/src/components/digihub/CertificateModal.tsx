"use client";

import React, { useState } from "react";
import { X, Award, CheckCircle2, Printer, Download, Sparkles, Shield, Share2 } from "lucide-react";
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

  const certificateId = `DCG-CERT-${Math.abs(progress.xp * 73 + 1042).toString(16).toUpperCase()}`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container (print-friendly) */}
        <div
          id="digihub-certificate"
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-8 md:p-12 rounded-2xl border-4 border-double border-amber-500/40 text-center shadow-inner overflow-hidden"
        >
          {/* Subtle Background Seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-96 h-96 text-amber-400" />
          </div>

          {/* Top Crest */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 mb-3">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400/90">
              Digiconnect Ghana • DIGIHub Academy
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
              Certificate of Achievement
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              This credential certifies the successful mastery of self-directed technical curriculum and applied hands-on laboratories.
            </p>
          </div>

          {/* Student Name */}
          <div className="relative z-10 my-8 py-4 border-y border-amber-500/20 max-w-lg mx-auto">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Awarded Proudly To
            </p>
            {isEditing ? (
              <div className="flex items-center justify-center gap-2 mt-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-xl md:text-2xl font-serif font-bold text-center bg-slate-800 border border-amber-500/50 rounded-lg px-3 py-1 text-amber-200 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2
                onClick={() => setIsEditing(true)}
                title="Click to edit name"
                className="text-2xl md:text-4xl font-serif font-bold text-amber-200 mt-2 cursor-pointer hover:underline decoration-amber-400/40 decoration-dashed transition"
              >
                {studentName}
              </h2>
            )}
            <p className="text-xs text-slate-300 mt-3">
              for completing the <span className="font-semibold text-blue-400">Foundations of Modern Web Coding</span> &{" "}
              <span className="font-semibold text-emerald-400">Applied Cybersecurity Defense</span> tracks.
            </p>
          </div>

          {/* Signatures & Credentials Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 text-xs border-t border-slate-800/80">
            <div className="text-left">
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider">Date Issued</span>
              <span className="font-medium text-slate-300">{issueDate}</span>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Credential
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">{certificateId}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block uppercase text-[10px] tracking-wider">Director of Education</span>
              <span className="font-serif italic text-amber-300/90 text-sm">Digiconnect Ghana</span>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Tip: Click on the name in the certificate to customize it before printing.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
