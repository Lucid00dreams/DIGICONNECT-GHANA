"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, ExternalLink, Sparkles } from "lucide-react";
import { CodeSandboxConfig } from "@/lib/lmsStore";

interface CodeSandboxProps {
  config: CodeSandboxConfig;
  onCodeRun?: () => void;
}

export function CodeSandbox({ config, onCodeRun }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [html, setHtml] = useState(config.initialHtml);
  const [css, setCss] = useState(config.initialCss);
  const [js, setJs] = useState(config.initialJs);
  const [copied, setCopied] = useState(false);
  const [runKey, setRunKey] = useState(0);

  // Sync if config changes
  useEffect(() => {
    setHtml(config.initialHtml);
    setCss(config.initialCss);
    setJs(config.initialJs);
  }, [config]);

  const handleReset = () => {
    if (confirm("Reset code back to the starting template?")) {
      setHtml(config.initialHtml);
      setCss(config.initialCss);
      setJs(config.initialJs);
      setRunKey((k) => k + 1);
    }
  };

  const handleCopy = () => {
    const fullSnippet = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n// JavaScript\n${js}`;
    navigator.clipboard.writeText(fullSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunKey((k) => k + 1);
    if (onCodeRun) onCodeRun();
  };

  // Compile combined document for sandboxed iframe
  const compiledDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #ffffff;
            color: #0f172a;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-b border-neutral-800">
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveTab("html")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "html"
                ? "bg-brand-blue text-white shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "css"
                ? "bg-brand-yellow text-brand-dark shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "js"
                ? "bg-brand-green text-white shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            JavaScript
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy all code"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            title="Reset code"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRun}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Run Code
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Split Pane */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800 min-h-[380px]">
        {/* Code Editor Pane */}
        <div className="flex flex-col bg-neutral-900 relative">
          <div className="px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>Editor: {activeTab.toUpperCase()}</span>
            <span className="text-[10px] text-neutral-500">Edit directly below</span>
          </div>

          <div className="relative flex-1 p-2">
            {activeTab === "html" && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[220px] bg-transparent text-neutral-200 font-mono text-xs sm:text-sm p-2 outline-none resize-none leading-relaxed"
                placeholder="Write HTML markup here..."
              />
            )}
            {activeTab === "css" && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[220px] bg-transparent text-amber-200 font-mono text-xs sm:text-sm p-2 outline-none resize-none leading-relaxed"
                placeholder="Write CSS styling rules here..."
              />
            )}
            {activeTab === "js" && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[220px] bg-transparent text-emerald-200 font-mono text-xs sm:text-sm p-2 outline-none resize-none leading-relaxed"
                placeholder="Write JavaScript interactivity here..."
              />
            )}
          </div>

          {/* Quick Challenge Hint */}
          {config.challengeInstructions && (
            <div className="p-3 bg-neutral-950/80 border-t border-neutral-800 text-xs text-brand-yellow flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span><strong>Practice Task:</strong> {config.challengeInstructions}</span>
            </div>
          )}
        </div>

        {/* Live Browser Output View */}
        <div className="flex flex-col bg-neutral-950">
          <div className="px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Browser Preview</span>
            </div>
            <span className="text-[10px] text-neutral-500">Auto-sandboxed</span>
          </div>

          <div className="flex-1 bg-white relative overflow-hidden min-h-[220px]">
            <iframe
              key={runKey}
              srcDoc={compiledDoc}
              title="Live Code Preview"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
