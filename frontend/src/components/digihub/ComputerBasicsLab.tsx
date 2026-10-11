"use client";

import React, { useState } from "react";
import {
  MousePointer,
  Keyboard,
  Copy,
  Check,
  Award,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Folder,
  FileText,
  HelpCircle,
  Eye,
} from "lucide-react";

interface ComputerBasicsLabProps {
  onLabCompleted?: () => void;
}

export function ComputerBasicsLab({ onLabCompleted }: ComputerBasicsLabProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Click Clinic State
  const [singleClicked, setSingleClicked] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [clickMessage, setClickMessage] = useState("");

  // Step 2: Copy & Paste State
  const sampleText = "DCG-ACCRA-2026";
  const [isCopied, setIsCopied] = useState(false);
  const [pastedValue, setPastedValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Step 3: Safe Typing & Backspace State
  const [typedName, setTypedName] = useState("");
  const [typingFixed, setTypingFixed] = useState(false);

  // Step 4: Scroll Explorer State
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const [isAllCompleted, setIsAllCompleted] = useState(false);

  // Handlers for Step 1
  const handleSingleClick = () => {
    setSingleClicked(true);
    setClickMessage("✓ Left-click / Single tap registered! You selected the file.");
  };

  const handleDoubleClick = () => {
    setDoubleClicked(true);
    setClickMessage("🎉 Fantastic! Double-click registered! The folder opened up.");
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRightClicked(true);
    setClickMessage("✨ Great job! Right-click opened the options menu.");
  };

  // Handlers for Step 2
  const handleCopy = () => {
    navigator.clipboard.writeText(sampleText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePasteChange = (val: string) => {
    setPastedValue(val);
    if (val.trim() === sampleText) {
      setCopySuccess(true);
    }
  };

  const handleManualPasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPastedValue(text);
      if (text.trim() === sampleText) {
        setCopySuccess(true);
      }
    } catch {
      // Fallback if browser clipboard read permissions are restricted
      setPastedValue(sampleText);
      setCopySuccess(true);
    }
  };

  // Check overall completion
  const handleFinishLab = () => {
    setIsAllCompleted(true);
    if (onLabCompleted) {
      onLabCompleted();
    }
  };

  const handleReset = () => {
    setActiveStep(1);
    setSingleClicked(false);
    setDoubleClicked(false);
    setRightClicked(false);
    setClickMessage("");
    setIsCopied(false);
    setPastedValue("");
    setCopySuccess(false);
    setTypedName("");
    setTypingFixed(false);
    setScrolledToBottom(false);
    setIsAllCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center shrink-0 shadow-2xs">
            <MousePointer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                Computer &amp; Phone Basics 101
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Zero Fear Playground
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Practice essential digital actions safely. You can NEVER break the computer here!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-600 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Practice</span>
        </button>
      </div>

      {/* 4 Step Progress Pills */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: 1, label: "Click & Tap" },
          { num: 2, label: "Copy & Paste" },
          { num: 3, label: "Safe Typing" },
          { num: 4, label: "Scroll & Find" },
        ].map((s) => {
          const isCurrent = activeStep === s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStep(s.num as any)}
              className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-0.5 ${
                isCurrent
                  ? "border-[#0056D2] bg-blue-50/70 text-[#0056D2] font-bold shadow-2xs"
                  : "border-neutral-200 hover:bg-neutral-50 text-neutral-600 font-medium"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider">Step 0{s.num}</span>
              <span className="text-xs truncate w-full">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: CLICK & TAP CLINIC */}
      {activeStep === 1 && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-[#0056D2]" />
              <span>Challenge 1: Master the 3 Essential Mouse Clicks</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              On a computer, different clicks give different instructions. Try all 3 targets below:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Left Click Target */}
            <button
              type="button"
              onClick={handleSingleClick}
              className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-2.5 card-lift ${
                singleClicked
                  ? "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold"
                  : "border-neutral-200 bg-white hover:border-blue-400 text-neutral-800"
              }`}
            >
              <FileText className={`w-8 h-8 ${singleClicked ? "text-emerald-600" : "text-neutral-400"}`} />
              <div>
                <div className="text-xs font-bold">1. Single Left-Click</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Click once to select</div>
              </div>
              {singleClicked && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </button>

            {/* Double Click Target */}
            <button
              type="button"
              onDoubleClick={handleDoubleClick}
              className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-2.5 card-lift ${
                doubleClicked
                  ? "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold"
                  : "border-neutral-200 bg-white hover:border-blue-400 text-neutral-800"
              }`}
            >
              <Folder className={`w-8 h-8 ${doubleClicked ? "text-emerald-600" : "text-amber-500"}`} />
              <div>
                <div className="text-xs font-bold">2. Double-Click</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Click twice quickly to open</div>
              </div>
              {doubleClicked && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </button>

            {/* Right Click Target */}
            <div
              onContextMenu={handleRightClick}
              className={`p-5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center gap-2.5 select-none cursor-context-menu card-lift ${
                rightClicked
                  ? "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold"
                  : "border-neutral-200 bg-white hover:border-blue-400 text-neutral-800"
              }`}
            >
              <HelpCircle className={`w-8 h-8 ${rightClicked ? "text-emerald-600" : "text-purple-500"}`} />
              <div>
                <div className="text-xs font-bold">3. Right-Click</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Right-click (or long press)</div>
              </div>
              {rightClicked && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>
          </div>

          {clickMessage && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 animate-fade-in-up">
              {clickMessage}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>Next: Copy &amp; Paste →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: COPY & PASTE PRACTICE */}
      {activeStep === 2 && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
              <Copy className="w-4 h-4 text-[#0056D2]" />
              <span>Challenge 2: Safe Copy &amp; Paste (No Retyping Needed)</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Copying does NOT delete your original words. It puts a safe digital copy into invisible computer memory.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Source Text to Duplicate</span>
                <div className="font-mono text-sm font-bold text-neutral-900 mt-0.5 p-2.5 bg-neutral-100 rounded-xl border border-neutral-200">
                  {sampleText}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition shadow-2xs active:scale-95"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? "Copied to Memory! (Ctrl+C)" : "1. Click Copy (or Ctrl+C)"}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <label className="text-xs font-bold text-neutral-800 block">
                2. Paste it into this target box (Click inside &amp; press Ctrl+V, or tap Paste):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pastedValue}
                  onChange={(e) => handlePasteChange(e.target.value)}
                  placeholder="Paste text here..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs font-mono outline-none"
                />
                <button
                  type="button"
                  onClick={handleManualPasteClick}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold border border-neutral-200 transition"
                >
                  Paste
                </button>
              </div>
            </div>

            {copySuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Success! You learned how to duplicate text in 1 second without typing every letter manually.</span>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>Next: Safe Typing →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SAFE TYPING & BACKSPACE */}
      {activeStep === 3 && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#0056D2]" />
              <span>Challenge 3: Safe Typing &amp; The Backspace Key</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every digital professional makes typos. The <strong className="text-neutral-900">Backspace</strong> key erases the letter before your cursor. You cannot break anything!
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-800 block mb-1">
                Type anything you like (e.g., your name or city), then press Backspace to fix a letter:
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => {
                  setTypedName(e.target.value);
                  if (e.target.value.length >= 3) {
                    setTypingFixed(true);
                  }
                }}
                placeholder="Type here freely..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-sm outline-none"
              />
            </div>

            <div className="text-[11px] text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Notice how you can delete and re-type as many times as you want. The computer patiently waits for you.</span>
            </div>

            {typingFixed && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Great confidence! You have full control over the keyboard.</span>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>Next: Scroll Explorer →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SCROLL & FIND */}
      {activeStep === 4 && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#0056D2]" />
              <span>Challenge 4: Scrolling Down to Find Hidden Content</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              When a webpage has lots of information, some of it hides below the screen. Use your mouse scroll-wheel or swipe up on your phone inside the box below:
            </p>
          </div>

          <div
            onScroll={(e) => {
              const el = e.currentTarget;
              if (el.scrollHeight - el.scrollTop <= el.clientHeight + 15) {
                setScrolledToBottom(true);
              }
            }}
            className="h-44 overflow-y-auto p-4 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/80 space-y-4"
          >
            <div className="text-xs text-neutral-600 font-semibold text-center">
              ↓ Scroll down inside this box to find the completion treasure ↓
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-500">
              Reading item 1: Modern websites place important buttons at the bottom.
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-500">
              Reading item 2: You never have to worry about missing anything if you scroll gently.
            </div>
            <div className="p-4 bg-emerald-100/90 rounded-2xl border border-emerald-300 text-emerald-950 text-center font-bold text-xs space-y-2">
              <Sparkles className="w-5 h-5 text-emerald-700 mx-auto" />
              <div>🎉 You found the bottom treasure! You mastered scrolling.</div>
            </div>
          </div>

          {scrolledToBottom && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>All 4 Fundamental Skills Practiced! (+50 XP Earned)</span>
              </div>
              <button
                type="button"
                onClick={handleFinishLab}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs"
              >
                Claim XP &amp; Complete
              </button>
            </div>
          )}

          <div className="flex justify-between pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700"
            >
              ← Back
            </button>
            {isAllCompleted && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Lab Completed!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
