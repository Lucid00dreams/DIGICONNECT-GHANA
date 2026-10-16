"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Square, Sparkles, RefreshCw } from "lucide-react";

interface AudioNarrationPlayerProps {
  title: string;
  summary: string;
  sections?: Array<{
    heading: string;
    explanation: string;
    analogy?: string;
  }>;
  keyTakeaways?: string[];
}

export function AudioNarrationPlayer({
  title,
  summary,
  sections,
  keyTakeaways,
}: AudioNarrationPlayerProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.9); // Default slightly relaxed for beginners
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Compile clean spoken script from the topic content
  const prepareScript = (): string => {
    let script = `${title}. Summary: ${summary}. `;

    if (sections && sections.length > 0) {
      sections.forEach((sec, idx) => {
        script += `Section ${idx + 1}: ${sec.heading}. ${sec.explanation}. `;
        if (sec.analogy) {
          script += `Everyday analogy: ${sec.analogy}. `;
        }
      });
    }

    if (keyTakeaways && keyTakeaways.length > 0) {
      script += `Key takeaways to remember: ${keyTakeaways.join(". ")}. `;
    }

    return script
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/•/g, "")
      .replace(/\s+/g, " ")
      .trim();
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
    };
  }, [title]);

  const handlePlay = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synthRef.current.cancel(); // Clear any previous speech

    const script = prepareScript();
    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    utterance.rate = playbackRate;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    // Attempt to pick a smooth natural English voice if available
    const voices = (synthRef.current ? synthRef.current.getVoices() : []) || [];
    const preferredVoice =
      voices.find((v) => v && v.lang && v.lang.startsWith("en") && (v.name?.includes("Natural") || v.name?.includes("Google"))) ||
      voices.find((v) => v && v.lang && v.lang.startsWith("en"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === "number") {
        const remaining = script.slice(event.charIndex);
        const match = remaining.match(/^[^.!?]+[.!?]/);
        if (match) {
          setCurrentSentence(match[0].trim());
        }
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence("");
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentence("");
  };

  const toggleRate = () => {
    const nextRate = playbackRate === 0.9 ? 1.0 : playbackRate === 1.0 ? 1.2 : 0.8;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      // Restart at new rate
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!isSupported) {
    return null; // Graceful degrade on ancient unsupported environments
  }

  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-neutral-800 transition shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition ${
            isPlaying ? "bg-[#0056D2] text-white animate-pulse" : "bg-white text-[#0056D2] shadow-2xs"
          }`}>
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
              <span>Listen to this Lesson</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white border border-blue-200 text-[#0056D2] font-semibold">
                Voice Reader
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 truncate">
              {isPlaying
                ? "Reading out loud • Tap pause or speed anytime"
                : isPaused
                ? "Audio paused • Tap play to continue"
                : "Listen to the explanation and analogy spoken in clear audio"}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-2xs active:scale-95"
              title="Pause Audio Narration"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold transition shadow-2xs active:scale-95"
              title="Play Lesson Narration"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isPaused ? "Resume" : "Listen"}</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="p-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition text-xs"
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
            {playbackRate === 0.8 ? "0.8x (Slow)" : playbackRate === 0.9 ? "0.9x" : playbackRate === 1.0 ? "1.0x" : "1.2x (Fast)"}
          </button>
        </div>
      </div>

      {/* Real-time Read-Along Karaoke Subtitle */}
      {isPlaying && currentSentence && (
        <div className="mt-2.5 pt-2.5 border-t border-blue-200/60 flex items-center gap-2 text-xs text-[#0056D2] animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-end gap-0.5 h-3 shrink-0">
            <span className="w-0.5 h-full bg-[#0056D2] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-2 bg-[#0056D2] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-3 bg-[#0056D2] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="truncate font-semibold tracking-tight text-neutral-800 italic">
            "{currentSentence}"
          </span>
        </div>
      )}
    </div>
  );
}
