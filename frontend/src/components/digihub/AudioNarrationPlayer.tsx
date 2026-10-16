"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause, Square, Sparkles } from "lucide-react";

export interface AudioProgressInfo {
  isPlaying: boolean;
  isPaused: boolean;
  activeType:
    | "title"
    | "summary"
    | "section_heading"
    | "section_explanation"
    | "section_analogy"
    | "takeaways"
    | null;
  activeSectionIndex: number | null;
  currentSentence: string;
}

interface AudioSegment {
  type:
    | "title"
    | "summary"
    | "section_heading"
    | "section_explanation"
    | "section_analogy"
    | "takeaways";
  sectionIndex?: number;
  label: string;
  charStart: number;
  charEnd: number;
}

interface AudioNarrationPlayerProps {
  title: string;
  summary: string;
  sections?: Array<{
    heading: string;
    explanation: string;
    analogy?: string;
  }>;
  keyTakeaways?: string[];
  onAudioProgress?: (info: AudioProgressInfo) => void;
}

export function AudioNarrationPlayer({
  title,
  summary,
  sections,
  keyTakeaways,
  onAudioProgress,
}: AudioNarrationPlayerProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.9); // Default slightly relaxed for beginners
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const [activeSegmentLabel, setActiveSegmentLabel] = useState<string>("");

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef<AudioSegment[]>([]);
  const fullScriptRef = useRef<string>("");

  // Build clean spoken script and index exact character positions for text highlighting
  const prepareScriptAndSegments = (): { script: string; segments: AudioSegment[] } => {
    const segments: AudioSegment[] = [];
    let script = "";

    const add = (
      type: AudioSegment["type"],
      label: string,
      rawText: string,
      sectionIndex?: number
    ) => {
      const cleaned = (rawText || "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/•/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleaned) return;

      if (script.length > 0 && !script.endsWith(" ")) {
        script += " ";
      }

      const charStart = script.length;
      script += cleaned;
      if (!/[.!?]$/.test(cleaned)) {
        script += ".";
      }
      const charEnd = script.length;

      segments.push({
        type,
        label,
        sectionIndex,
        charStart,
        charEnd,
      });
    };

    add("title", "Topic Title", title);
    add("summary", "Summary Overview", summary);

    if (sections && sections.length > 0) {
      sections.forEach((sec, idx) => {
        add(
          "section_heading",
          `Section ${idx + 1}: ${sec.heading}`,
          `Section ${idx + 1}: ${sec.heading}`,
          idx
        );
        add(
          "section_explanation",
          `Section ${idx + 1} Explanation`,
          sec.explanation,
          idx
        );
        if (sec.analogy) {
          add(
            "section_analogy",
            `Section ${idx + 1} Ghanaian Analogy`,
            `Everyday Ghanaian analogy: ${sec.analogy}`,
            idx
          );
        }
      });
    }

    if (keyTakeaways && keyTakeaways.length > 0) {
      add(
        "takeaways",
        "Key Takeaways",
        `Key takeaways to remember: ${keyTakeaways.join(". ")}`
      );
    }

    segmentsRef.current = segments;
    fullScriptRef.current = script;
    return { script, segments };
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    // Stop speaking when user moves to a new topic or unmounts
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (onAudioProgress) {
        onAudioProgress({
          isPlaying: false,
          isPaused: false,
          activeType: null,
          activeSectionIndex: null,
          currentSentence: "",
        });
      }
    };
  }, [title]);

  const notifyProgress = (
    playing: boolean,
    paused: boolean,
    activeSeg: AudioSegment | null,
    sentence: string
  ) => {
    if (!onAudioProgress) return;
    onAudioProgress({
      isPlaying: playing,
      isPaused: paused,
      activeType: activeSeg ? activeSeg.type : null,
      activeSectionIndex:
        activeSeg && typeof activeSeg.sectionIndex === "number"
          ? activeSeg.sectionIndex
          : null,
      currentSentence: sentence,
    });
  };

  const handlePlay = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      const activeSeg = segmentsRef.current[0] || null;
      notifyProgress(true, false, activeSeg, currentSentence);
      return;
    }

    synthRef.current.cancel(); // Clear any previous speech

    const { script, segments } = prepareScriptAndSegments();
    if (!script) return;

    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    utterance.rate = playbackRate;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    // Pick a smooth natural English voice if available
    const voices = (synthRef.current ? synthRef.current.getVoices() : []) || [];
    const preferredVoice =
      voices.find(
        (v) =>
          v &&
          v.lang &&
          v.lang.startsWith("en") &&
          (v.name?.includes("Natural") || v.name?.includes("Google"))
      ) || voices.find((v) => v && v.lang && v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === "number") {
        const charIdx = event.charIndex;
        const currentSegments = segmentsRef.current;
        const currentScript = fullScriptRef.current;

        // Find active segment
        let activeSeg = currentSegments.find(
          (s) => charIdx >= s.charStart && charIdx <= s.charEnd
        );
        if (!activeSeg) {
          activeSeg =
            currentSegments.find((s) => charIdx <= s.charEnd) ||
            currentSegments[currentSegments.length - 1] ||
            null;
        }

        // Extract sentence being read
        const remaining = currentScript.slice(charIdx);
        const match = remaining.match(/^[^.!?]+[.!?]?/);
        const sentence = match ? match[0].trim() : remaining.slice(0, 90).trim();

        setCurrentSentence(sentence);
        if (activeSeg) {
          setActiveSegmentLabel(activeSeg.label);
        }
        notifyProgress(true, false, activeSeg || null, sentence);
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      const firstSeg = segments[0] || null;
      if (firstSeg) {
        setActiveSegmentLabel(firstSeg.label);
      }
      notifyProgress(true, false, firstSeg, "");
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence("");
      setActiveSegmentLabel("");
      notifyProgress(false, false, null, "");
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence("");
      setActiveSegmentLabel("");
      notifyProgress(false, false, null, "");
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
    notifyProgress(false, true, null, currentSentence);
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentence("");
    setActiveSegmentLabel("");
    notifyProgress(false, false, null, "");
  };

  const toggleRate = () => {
    const nextRate = playbackRate === 0.9 ? 1.0 : playbackRate === 1.0 ? 1.2 : 0.8;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!isSupported) {
    return null; // Graceful degrade on ancient unsupported environments
  }

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 shadow-2xs ${
        isPlaying
          ? "bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/60 border-2 border-[#2196D3] shadow-md"
          : "bg-blue-50/70 border border-blue-200/80 text-neutral-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
              isPlaying
                ? "bg-[#0056D2] text-white shadow-md shadow-blue-500/25 scale-105"
                : "bg-white text-[#0056D2] border border-blue-200/60 shadow-2xs"
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span>Interactive Audio Narration</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-blue-200 text-[#0056D2] font-semibold flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Live Read-Along
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 truncate mt-0.5">
              {isPlaying
                ? "Voicing lesson • Spoken sentences & analogies highlight below in real-time"
                : isPaused
                ? "Narration paused • Press resume to continue"
                : "Listen to the explanations, analogies, and concepts read aloud"}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-2xs active:scale-95"
              title="Pause Audio Narration"
            >
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition shadow-2xs active:scale-95"
              title="Listen to lesson with text highlighting"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isPaused ? "Resume" : "Listen Along"}</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="p-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition text-xs shadow-2xs"
              title="Stop Narration"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleRate}
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-bold transition shadow-2xs"
            title="Adjust reading speed"
          >
            {playbackRate === 0.8
              ? "0.8x (Slow)"
              : playbackRate === 0.9
              ? "0.9x"
              : playbackRate === 1.0
              ? "1.0x"
              : "1.2x (Fast)"}
          </button>
        </div>
      </div>

      {/* Real-time Read-Along Live Karaoke Subtitle Box */}
      {isPlaying && currentSentence && (
        <div className="mt-3 pt-3 border-t border-blue-200/80 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center justify-between text-[11px] text-[#0056D2] font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <span
                  className="w-1 h-3 bg-[#0056D2] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1 h-2 bg-[#0056D2] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1 h-3.5 bg-[#0056D2] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="font-bold tracking-tight">Currently Speaking:</span>
              {activeSegmentLabel && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0056D2] text-[10px] font-bold border border-blue-200">
                  {activeSegmentLabel}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 hidden sm:inline">
              Highlighted on page below ↓
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/95 border border-blue-300 shadow-xs text-xs text-neutral-900 leading-relaxed font-medium">
            <span className="bg-amber-100 text-neutral-950 font-semibold px-1 py-0.5 rounded shadow-2xs">
              "{currentSentence}"
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
