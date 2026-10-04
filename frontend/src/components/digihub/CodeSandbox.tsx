"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, ExternalLink, Code2 } from "lucide-react";
import { CodeSandboxConfig } from "@/lib/lmsStore";

interface CodeSandboxProps {
  config: CodeSandboxConfig;
  onCodeRun?: () => void;
}

export function CodeSandbox({ config, onCodeRun }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [html, setHtml] = useState(config.initialHtml);
  const [css, setCss] = useState(config.initialCss);
  const [js, setJs] = useState(config.initialJs);
  const [copied, setCopied] = useState(false);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    setHtml(config.initialHtml);
    setCss(config.initialCss);
    setJs(config.initialJs);
  }, [config]);

  const handleReset = () => {
    if (confirm("Reset code back to the initial template?")) {
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
    // On mobile, automatically show the preview when running code
    setMobileView("preview");
    if (onCodeRun) {
      onCodeRun();
    }
  };

  const combinedSrcDoc = `
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
            color: #1e293b;
            background-color: #ffffff;
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
            console.error("Runtime error in sandbox:", err);
            const errBox = document.createElement("div");
            errBox.style.background = "#fee2e2";
            errBox.style.color = "#991b1b";
            errBox.style.padding = "8px 12px";
            errBox.style.borderRadius = "6px";
            errBox.style.fontSize = "12px";
            errBox.style.marginTop = "12px";
            errBox.style.border = "1px solid #f87171";
            errBox.innerText = "Script Error: " + err.message;
            document.body.appendChild(errBox);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex flex-col flex-1">
      {/* Mobile View Switcher (Editor vs Output Preview) */}
      <div className="md:hidden flex items-center border-b border-neutral-200 bg-neutral-100 p-1 text-xs">
        <button
          type="button"
          onClick={() => setMobileView("editor")}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center ${
            mobileView === "editor"
              ? "bg-white text-neutral-900 shadow-2xs font-bold"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          Code Editor ({activeTab.toUpperCase()})
        </button>
        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center flex items-center justify-center gap-1.5 ${
            mobileView === "preview"
              ? "bg-white text-neutral-900 shadow-2xs font-bold"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Top Controls Toolbar */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        {/* Editor Tab Selectors */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => {
              setActiveTab("html");
              setMobileView("editor");
            }}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl transition ${
              activeTab === "html"
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            HTML
          </button>

          <button
            onClick={() => {
              setActiveTab("css");
              setMobileView("editor");
            }}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl transition ${
              activeTab === "css"
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            CSS
          </button>

          <button
            onClick={() => {
              setActiveTab("js");
              setMobileView("editor");
            }}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl transition ${
              activeTab === "js"
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            JS
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition shadow-2xs"
            title="Copy all code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition shadow-2xs"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Reset</span>
          </button>

          <button
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg sm:rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition shadow-2xs active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Challenge Instructions */}
      {config.challengeInstructions && (
        <div className="bg-brand-blue-light/30 border-b border-brand-blue/15 px-4 sm:px-5 py-2.5 sm:py-3 text-xs text-neutral-800 flex items-start gap-2.5">
          <Code2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-neutral-900">Lab Challenge: </span>
            {config.challengeInstructions}
          </div>
        </div>
      )}

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 flex-1 min-h-[360px] sm:min-h-[460px]">
        {/* Code Editor Window */}
        <div
          className={`${
            mobileView === "editor" ? "flex" : "hidden"
          } md:flex flex-col bg-neutral-900 text-neutral-100 flex-1`}
        >
          <div className="bg-neutral-950 px-3.5 sm:px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>Editor • {activeTab.toUpperCase()}</span>
            <span>UTF-8</span>
          </div>

          <div className="relative flex-1 p-2 sm:p-3">
            {activeTab === "html" && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] sm:min-h-[360px] bg-transparent text-neutral-100 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 select-text p-2"
                placeholder="Write your HTML here..."
              />
            )}
            {activeTab === "css" && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] sm:min-h-[360px] bg-transparent text-neutral-100 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 select-text p-2"
                placeholder="Write your CSS styling here..."
              />
            )}
            {activeTab === "js" && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] sm:min-h-[360px] bg-transparent text-neutral-100 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 select-text p-2"
                placeholder="Write your JavaScript logic here..."
              />
            )}
          </div>
        </div>

        {/* Live Output Preview */}
        <div
          className={`${
            mobileView === "preview" ? "flex" : "hidden"
          } md:flex flex-col bg-white flex-1`}
        >
          <div className="bg-neutral-50 px-3.5 sm:px-4 py-2 border-b border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Browser Output Preview
            </span>
            <span>Sandboxed</span>
          </div>

          <div className="flex-1 bg-white relative min-h-[320px] sm:min-h-[380px]">
            <iframe
              key={runKey}
              srcDoc={combinedSrcDoc}
              title="Code Preview Sandbox"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


