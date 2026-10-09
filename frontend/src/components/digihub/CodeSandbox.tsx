"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Code2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  BookOpen,
} from "lucide-react";
import { CodeSandboxConfig } from "@/lib/lmsStore";

interface CodeSandboxProps {
  config: CodeSandboxConfig;
  onCodeRun?: () => void;
  onLabCompleted?: () => void;
}

export function CodeSandbox({ config, onCodeRun, onLabCompleted }: CodeSandboxProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [html, setHtml] = useState(config.initialHtml);
  const [css, setCss] = useState(config.initialCss);
  const [js, setJs] = useState(config.initialJs);
  const [copied, setCopied] = useState(false);
  const [runKey, setRunKey] = useState(0);

  // Console output state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [viewportMode, setViewportMode] = useState<"responsive" | "tablet" | "mobile">("responsive");

  // Solution check result
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    passed: boolean;
    feedback: string;
  }>({ tested: false, passed: false, feedback: "" });

  useEffect(() => {
    setHtml(config.initialHtml);
    setCss(config.initialCss);
    setJs(config.initialJs);
    setConsoleLogs([]);
    setTestResult({ tested: false, passed: false, feedback: "" });
  }, [config]);

  // Listen to messages from sandbox iframe for console logs
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "sandbox_console") {
        setConsoleLogs((prev) => [...prev, String(event.data.message)]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleReset = () => {
    if (confirm("Reset code back to the initial template?")) {
      setHtml(config.initialHtml);
      setCss(config.initialCss);
      setJs(config.initialJs);
      setConsoleLogs([]);
      setTestResult({ tested: false, passed: false, feedback: "" });
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
    setMobileView("preview");
    if (onCodeRun) {
      onCodeRun();
    }
  };

  // Automated solution evaluation
  const handleCheckSolution = () => {
    handleRun();

    let passed = true;
    let feedback = "All challenge tests passed! Excellent work!";

    // Check expected keywords if supplied
    if (config.expectedKeywords && config.expectedKeywords.length > 0) {
      const allCode = `${html} ${css} ${js}`.toLowerCase();
      const missingKeywords: string[] = [];

      for (const kw of config.expectedKeywords) {
        if (!allCode.includes(kw.toLowerCase())) {
          missingKeywords.push(kw);
        }
      }

      if (missingKeywords.length > 0) {
        passed = false;
        feedback = `Make sure your code includes: "${missingKeywords.join('", "')}"`;
      }
    } else {
      // General heuristics
      if (config.challengeInstructions.toLowerCase().includes("button") && !html.includes("<button")) {
        passed = false;
        feedback = "Hint: Add a <button> element to your HTML markup!";
      } else if (config.challengeInstructions.toLowerCase().includes("heading") && !html.includes("<h")) {
        passed = false;
        feedback = "Hint: Add a heading tag (e.g. <h1> or <h2>) in your HTML!";
      } else if (config.challengeInstructions.toLowerCase().includes("color") && !css.includes("color")) {
        passed = false;
        feedback = "Hint: Customize text or background color in the CSS tab!";
      }
    }

    setTestResult({ tested: true, passed, feedback });
    if (passed && onLabCompleted) {
      onLabCompleted();
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
          // Intercept console.log to communicate with parent
          const originalLog = console.log;
          console.log = function(...args) {
            window.parent.postMessage({ type: 'sandbox_console', message: args.join(' ') }, '*');
            originalLog.apply(console, args);
          };

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
      {/* Mobile View Switcher */}
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
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs font-bold"
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
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs font-bold"
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
                ? "bg-white text-neutral-900 border border-neutral-200 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            JS
          </button>
        </div>

        {/* Viewport & Helper Tools */}
        <div className="hidden sm:flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1 ${
              showCheatsheet
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cheatsheet</span>
          </button>

          <button
            type="button"
            onClick={() => setShowConsole(!showConsole)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1 ${
              showConsole
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console ({consoleLogs.length})</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition shadow-2xs"
            title="Copy all code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition shadow-2xs"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run</span>
          </button>

          <button
            onClick={handleCheckSolution}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg sm:rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold transition shadow-2xs active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check Solution</span>
          </button>
        </div>
      </div>

      {/* Cheatsheet Drawer */}
      {showCheatsheet && (
        <div className="bg-blue-50/90 border-b border-blue-200 p-4 text-xs text-blue-950 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <span className="font-bold block mb-1">Semantic HTML Tags:</span>
            <code className="block text-[11px] font-mono text-blue-900">
              &lt;h1&gt;, &lt;p&gt;, &lt;button id=&quot;cta-btn&quot;&gt;, &lt;div class=&quot;card&quot;&gt;
            </code>
          </div>
          <div>
            <span className="font-bold block mb-1">CSS Selectors:</span>
            <code className="block text-[11px] font-mono text-blue-900">
              .class &#123; background: #0284c7; border-radius: 12px; &#125;
            </code>
          </div>
          <div>
            <span className="font-bold block mb-1">JavaScript DOM:</span>
            <code className="block text-[11px] font-mono text-blue-900">
              btn.addEventListener(&quot;click&quot;, () =&gt; alert(&quot;Hello!&quot;))
            </code>
          </div>
        </div>
      )}

      {/* Challenge Instructions */}
      {config.challengeInstructions && (
        <div className="bg-brand-blue-light/30 border-b border-brand-blue/15 px-4 sm:px-5 py-2.5 sm:py-3 text-xs text-neutral-800 flex items-start gap-2.5">
          <Code2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-neutral-900">Lab Challenge: </span>
            {config.challengeInstructions}
          </div>
        </div>
      )}

      {/* Test Feedback Banner */}
      {testResult.tested && (
        <div
          className={`px-4 py-3 border-b text-xs flex items-center justify-between gap-3 ${
            testResult.passed
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {testResult.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{testResult.feedback}</span>
          </div>
          {testResult.passed && (
            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase">
              Passed (+50 XP)
            </span>
          )}
        </div>
      )}

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 flex-1 min-h-[380px] sm:min-h-[460px]">
        {/* Code Editor Window */}
        <div
          className={`${
            mobileView === "editor" ? "flex" : "hidden"
          } md:flex flex-col bg-neutral-900 text-neutral-100 flex-1`}
        >
          <div className="bg-neutral-950 px-3.5 sm:px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>Editor • {activeTab.toUpperCase()}</span>
            <span>Live Sync</span>
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
                className="w-full h-full min-h-[300px] sm:min-h-[360px] bg-transparent text-blue-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 select-text p-2"
                placeholder="Write your CSS styling here..."
              />
            )}
            {activeTab === "js" && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] sm:min-h-[360px] bg-transparent text-amber-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 select-text p-2"
                placeholder="Write your JavaScript logic here..."
              />
            )}
          </div>

          {/* Console Drawer inside Editor */}
          {showConsole && (
            <div className="bg-neutral-950 border-t border-neutral-800 p-3 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1">
              <div className="text-neutral-500 font-bold mb-1 flex items-center justify-between">
                <span>Browser Console Output</span>
                <button
                  type="button"
                  onClick={() => setConsoleLogs([])}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  Clear
                </button>
              </div>
              {consoleLogs.length === 0 ? (
                <div className="text-neutral-600">No console output logged yet. Call console.log() in JS.</div>
              ) : (
                consoleLogs.map((log, i) => (
                  <div key={i} className="text-emerald-400">
                    &gt; {log}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Live Output Preview */}
        <div
          className={`${
            mobileView === "preview" ? "flex" : "hidden"
          } md:flex flex-col bg-neutral-100/50 flex-1`}
        >
          <div className="bg-neutral-50 px-3.5 sm:px-4 py-2 border-b border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Browser Output Preview
            </span>

            {/* Viewport Mode Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewportMode("responsive")}
                className={`p-1 rounded ${viewportMode === "responsive" ? "bg-white shadow-2xs text-neutral-900" : "text-neutral-400"}`}
                title="Full width"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("tablet")}
                className={`p-1 rounded ${viewportMode === "tablet" ? "bg-white shadow-2xs text-neutral-900" : "text-neutral-400"}`}
                title="Tablet Viewport (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("mobile")}
                className={`p-1 rounded ${viewportMode === "mobile" ? "bg-white shadow-2xs text-neutral-900" : "text-neutral-400"}`}
                title="Mobile Viewport (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white relative min-h-[320px] sm:min-h-[380px] flex items-center justify-center p-2">
            <div
              className={`h-full transition-all duration-300 relative ${
                viewportMode === "mobile"
                  ? "w-[360px] border border-neutral-300 rounded-2xl shadow-md overflow-hidden bg-white"
                  : viewportMode === "tablet"
                  ? "w-[600px] border border-neutral-300 rounded-2xl shadow-md overflow-hidden bg-white"
                  : "w-full"
              }`}
            >
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
    </div>
  );
}
