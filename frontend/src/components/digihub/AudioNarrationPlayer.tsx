"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause, Square, Sparkles } from "lucide-react";

export interface AudioProgressInfo {
  isPlaying: boolean;
  isPaused: boolean;
  activeTargetId: string | null;
  activeWordIndex: number;
  activeSectionIndex: number | null;
  currentSentence: string;
  activeWord: string;
}

interface WordToken {
  word: string;
  charStart: number;
  charEnd: number;
  targetId: string;
  wordIndex: number;
  sectionIndex: number | null;
  sentence: string;
  label: string;
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
  const [playbackRate, setPlaybackRate] = useState<number>(0.9); // Relaxed for beginner learning
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const [activeWord, setActiveWord] = useState<string>("");
  const [activeSegmentLabel, setActiveSegmentLabel] = useState<string>("");

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const tokensRef = useRef<WordToken[]>([]);
  const currentTokenRef = useRef<WordToken | null>(null);
  const lastBoundaryTimeRef = useRef<number>(0);
  const fullScriptRef = useRef<string>("");

  // Build clean spoken script and index every single word to its exact target and position
  const prepareTokensAndScript = (): { script: string; tokens: WordToken[] } => {
    const tokens: WordToken[] = [];
    let script = "";

    const addTarget = (
      targetId: string,
      label: string,
      rawText: string,
      sectionIndex: number | null,
      prefix?: string
    ) => {
      const cleanPrefix = (prefix || "").trim();
      const cleanText = (rawText || "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/•/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleanText) return;

      // Spoken prefix (e.g. "Section 1:" or "Ghanaian Analogy:")
      if (cleanPrefix) {
        const prefixWords = cleanPrefix.split(" ");
        prefixWords.forEach((pw) => {
          if (script.length > 0 && !script.endsWith(" ")) script += " ";
          const charStart = script.length;
          script += pw;
          const charEnd = script.length;
          tokens.push({
            word: pw,
            charStart,
            charEnd,
            targetId: `${targetId}-prefix`,
            wordIndex: -1,
            sectionIndex,
            sentence: cleanText,
            label,
          });
        });
      }

      // Spoken target words
      const words = cleanText.split(" ");
      words.forEach((w, wIdx) => {
        if (script.length > 0 && !script.endsWith(" ")) script += " ";
        const charStart = script.length;
        script += w;
        const charEnd = script.length;

        tokens.push({
          word: w,
          charStart,
          charEnd,
          targetId,
          wordIndex: wIdx,
          sectionIndex,
          sentence: cleanText,
          label,
        });
      });

      if (!/[.!?]$/.test(cleanText)) {
        script += ". ";
      } else {
        script += " ";
      }
    };

    addTarget("summary", "Topic Summary", summary, null);

    if (sections && sections.length > 0) {
      sections.forEach((sec, idx) => {
        addTarget(
          `sec-${idx}-heading`,
          `Section ${idx + 1} Heading`,
          sec.heading,
          idx,
          `Section ${idx + 1}:`
        );
        addTarget(
          `sec-${idx}-exp`,
          `Section ${idx + 1} Explanation`,
          sec.explanation,
          idx
        );
        if (sec.analogy) {
          addTarget(
            `sec-${idx}-analogy`,
            `Section ${idx + 1} Ghanaian Analogy`,
            sec.analogy,
            idx,
            `Everyday Ghanaian Analogy:`
          );
        }
      });
    }

    if (keyTakeaways && keyTakeaways.length > 0) {
      addTarget(
        "takeaways",
        "Key Takeaways",
        keyTakeaways.join(". "),
        null,
        "Key takeaways to remember:"
      );
    }

    tokensRef.current = tokens;
    fullScriptRef.current = script.trim();
    return { script: fullScriptRef.current, tokens };
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (onAudioProgress) {
        onAudioProgress({
          isPlaying: false,
          isPaused: false,
          activeTargetId: null,
          activeWordIndex: -1,
          activeSectionIndex: null,
          currentSentence: "",
          activeWord: "",
        });
      }
    };
  }, [title]);

  const notifyProgress = (
    playing: boolean,
    paused: boolean,
    token: WordToken | null
  ) => {
    if (!onAudioProgress) return;
    onAudioProgress({
      isPlaying: playing,
      isPaused: paused,
      activeTargetId: token ? token.targetId : null,
      activeWordIndex: token ? token.wordIndex : -1,
      activeSectionIndex: token ? token.sectionIndex : null,
      currentSentence: token ? token.sentence : "",
      activeWord: token ? token.word : "",
    });
  };

  // High-reliability smooth word ticker:
  // If browser onboundary is delayed or skipped by the engine, advance smoothly
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      // Average speech at 0.9x is ~380ms per word. If no boundary event for 400ms, nudge forward
      if (now - lastBoundaryTimeRef.current >= 400) {
        const tokens = tokensRef.current;
        const current = currentTokenRef.current;
        if (!current) return;
        const curIdx = tokens.indexOf(current);
        if (curIdx >= 0 && curIdx < tokens.length - 1) {
          const nextToken = tokens[curIdx + 1];
          currentTokenRef.current = nextToken;
          lastBoundaryTimeRef.current = now;
          setActiveWord(nextToken.word);
          setCurrentSentence(nextToken.sentence);
          setActiveSegmentLabel(nextToken.label);
          notifyProgress(true, false, nextToken);
        }
      }
    }, 180);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const handlePlay = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      notifyProgress(true, false, currentTokenRef.current);
      return;
    }

    synthRef.current.cancel(); // Clear any previous speech

    const { script, tokens } = prepareTokensAndScript();
    if (!script || tokens.length === 0) return;

    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    utterance.rate = playbackRate;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    // Select natural English voice
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
        const currentTokens = tokensRef.current;

        // Find token corresponding to charIdx
        let match = currentTokens.find(
          (t) => charIdx >= t.charStart && charIdx <= t.charEnd
        );
        if (!match) {
          // Closest token
          for (let i = currentTokens.length - 1; i >= 0; i--) {
            if (currentTokens[i].charStart <= charIdx) {
              match = currentTokens[i];
              break;
            }
          }
        }
        if (!match && currentTokens.length > 0) {
          match = currentTokens[0];
        }

        if (match) {
          currentTokenRef.current = match;
          lastBoundaryTimeRef.current = Date.now();
          setActiveWord(match.word);
          setCurrentSentence(match.sentence);
          setActiveSegmentLabel(match.label);
          notifyProgress(true, false, match);
        }
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      const firstToken = tokens[0] || null;
      currentTokenRef.current = firstToken;
      lastBoundaryTimeRef.current = Date.now();
      if (firstToken) {
        setActiveWord(firstToken.word);
        setCurrentSentence(firstToken.sentence);
        setActiveSegmentLabel(firstToken.label);
      }
      notifyProgress(true, false, firstToken);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence("");
      setActiveWord("");
      setActiveSegmentLabel("");
      currentTokenRef.current = null;
      notifyProgress(false, false, null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentence("");
      setActiveWord("");
      setActiveSegmentLabel("");
      currentTokenRef.current = null;
      notifyProgress(false, false, null);
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
    notifyProgress(false, true, currentTokenRef.current);
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentence("");
    setActiveWord("");
    setActiveSegmentLabel("");
    currentTokenRef.current = null;
    notifyProgress(false, false, null);
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
    return null;
  }

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 shadow-2xs ${
        isPlaying
          ? "bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/60 border-2 border-[#0056D2] shadow-md"
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
              <span>Interactive Audio Voice Reader</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-blue-200 text-[#0056D2] font-semibold flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Live Word Highlights
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 truncate mt-0.5">
              {isPlaying
                ? "Reading aloud • Words highlight in gold on the page as spoken"
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
              title="Listen to lesson with real-time text highlighting"
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
              ? "0.8x"
              : playbackRate === 0.9
              ? "0.9x"
              : playbackRate === 1.0
              ? "1.0x"
              : "1.2x"}
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
              <span className="font-bold tracking-tight">Currently Reading:</span>
              {activeSegmentLabel && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0056D2] text-[10px] font-bold border border-blue-200">
                  {activeSegmentLabel}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 hidden sm:inline">
              Watch words highlight in real-time below ↓
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/95 border border-blue-300 shadow-xs text-xs text-neutral-900 leading-relaxed font-medium flex items-center gap-1.5 flex-wrap">
            <span className="text-neutral-500 italic text-[11px]">Speaking:</span>
            {activeWord && (
              <span className="bg-amber-300 text-neutral-950 font-extrabold px-2 py-0.5 rounded-md shadow-xs ring-2 ring-amber-400 animate-pulse text-xs">
                "{activeWord}"
              </span>
            )}
            <span className="text-neutral-700 font-normal line-clamp-1">
              in {currentSentence}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
