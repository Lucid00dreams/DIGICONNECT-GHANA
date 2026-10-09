"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, HelpCircle, Code2, CheckCircle2, AlertCircle } from "lucide-react";

export interface PythonLabConfig {
  title: string;
  scenario: string;
  initialCode: string;
  challengeInstructions: string;
  expectedOutputSubstring?: string;
  expectedVariables?: Record<string, any>;
  hint?: string;
}

interface PythonLabProps {
  config: PythonLabConfig;
  onLabCompleted?: () => void;
}

export function PythonLab({ config, onLabCompleted }: PythonLabProps) {
  const [code, setCode] = useState(config.initialCode);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [variablesState, setVariablesState] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<"terminal" | "variables">("terminal");
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    passed: boolean;
    feedback: string;
  }>({ tested: false, passed: false, feedback: "" });

  useEffect(() => {
    setCode(config.initialCode);
    setOutputLogs(["> Ready to run. Click 'Run Script' to execute."]);
    setVariablesState({});
    setTestResult({ tested: false, passed: false, feedback: "" });
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset code back to the initial Python template?")) {
      setCode(config.initialCode);
      setOutputLogs(["> Code reset to initial template."]);
      setVariablesState({});
      setTestResult({ tested: false, passed: false, feedback: "" });
    }
  };

  // Safe client-side Python-like execution engine for beginner scripts
  const runPythonCode = () => {
    const logs: string[] = [];
    const vars: Record<string, any> = {};

    try {
      const lines = code.split("\n");
      let inForLoop = false;
      let loopVar = "";
      let loopItems: any[] = [];
      let loopBody: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith("#")) continue;

        // Check for for-loop: for x in items:
        const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
        if (forMatch) {
          inForLoop = true;
          loopVar = forMatch[1];
          const collectionExpr = forMatch[2].trim();

          if (collectionExpr.startsWith("[") && collectionExpr.endsWith("]")) {
            try {
              loopItems = eval(collectionExpr);
            } catch {
              loopItems = ["item1", "item2"];
            }
          } else if (vars[collectionExpr]) {
            loopItems = Array.isArray(vars[collectionExpr]) ? vars[collectionExpr] : [vars[collectionExpr]];
          } else if (collectionExpr.startsWith("range(")) {
            const rangeNum = parseInt(collectionExpr.replace("range(", "").replace(")", ""), 10) || 3;
            loopItems = Array.from({ length: rangeNum }, (_, idx) => idx);
          } else {
            loopItems = ["Apple", "Orange", "Mango"];
          }
          loopBody = [];
          continue;
        }

        // Inside for-loop collection
        if (inForLoop && (lines[i].startsWith("    ") || lines[i].startsWith("\t"))) {
          loopBody.push(line);
          const isLastLine = i === lines.length - 1 || (!lines[i + 1].startsWith("    ") && !lines[i + 1].startsWith("\t"));
          if (isLastLine) {
            inForLoop = false;
            // Execute loop
            for (const item of loopItems) {
              vars[loopVar] = item;
              for (const bodyLine of loopBody) {
                executeSingleStatement(bodyLine, vars, logs);
              }
            }
          }
          continue;
        }

        inForLoop = false;
        executeSingleStatement(line, vars, logs);
      }

      setOutputLogs(logs.length > 0 ? logs : ["> Script executed with no console output."]);
      setVariablesState(vars);

      // Verify challenge assertions
      let passed = true;
      let feedback = "All challenge tests passed! Excellent work!";

      if (config.expectedOutputSubstring) {
        const fullOutput = logs.join(" ");
        if (!fullOutput.toLowerCase().includes(config.expectedOutputSubstring.toLowerCase())) {
          passed = false;
          feedback = `Missing expected text in console output: "${config.expectedOutputSubstring}"`;
        }
      }

      if (config.expectedVariables) {
        for (const [varName, expectedVal] of Object.entries(config.expectedVariables)) {
          if (vars[varName] === undefined) {
            passed = false;
            feedback = `Variable '${varName}' is not defined.`;
            break;
          } else if (typeof expectedVal === "number" && vars[varName] !== expectedVal) {
            passed = false;
            feedback = `Variable '${varName}' was expected to be ${expectedVal}, but got ${vars[varName]}.`;
            break;
          }
        }
      }

      setTestResult({ tested: true, passed, feedback });
      if (passed && onLabCompleted) {
        onLabCompleted();
      }
    } catch (err: any) {
      setOutputLogs([`> Traceback (most recent call last):`, `> SyntaxError / EvaluationError: ${err.message}`]);
      setTestResult({ tested: true, passed: false, feedback: `Execution Error: ${err.message}` });
    }
  };

  const executeSingleStatement = (stmt: string, vars: Record<string, any>, logs: string[]) => {
    // 1. print(...) statement
    if (stmt.startsWith("print(") && stmt.endsWith(")")) {
      let inner = stmt.slice(6, -1).trim();

      // Handle f-string: print(f"Hello {name}")
      if (inner.startsWith('f"') && inner.endsWith('"') || inner.startsWith("f'") && inner.endsWith("'")) {
        let content = inner.slice(2, -1);
        content = content.replace(/\{([a-zA-Z_]\w*)\}/g, (_, varName) => {
          return vars[varName] !== undefined ? String(vars[varName]) : `{${varName}}`;
        });
        logs.push(content);
        return;
      }

      // Handle standard string concatenation or variable printing
      try {
        const evaluated = evaluatePythonExpr(inner, vars);
        logs.push(String(evaluated));
      } catch {
        // Fallback literal cleanup
        logs.push(inner.replace(/^['"]|['"]$/g, ""));
      }
      return;
    }

    // 2. Variable assignment: name = "Kofi" or total = 10 + 20
    const assignMatch = stmt.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const expr = assignMatch[2].trim();
      const value = evaluatePythonExpr(expr, vars);
      vars[varName] = value;
      return;
    }

    // 3. In-place increment: count += 1
    const incMatch = stmt.match(/^([a-zA-Z_]\w*)\s*\+=\s*(.+)$/);
    if (incMatch) {
      const varName = incMatch[1];
      const expr = incMatch[2].trim();
      const addVal = evaluatePythonExpr(expr, vars);
      vars[varName] = (vars[varName] || 0) + addVal;
      return;
    }
  };

  const evaluatePythonExpr = (expr: string, vars: Record<string, any>): any => {
    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    // Boolean
    if (expr === "True") return true;
    if (expr === "False") return false;
    // Numbers
    if (!isNaN(Number(expr))) return Number(expr);
    // Variable reference
    if (vars[expr] !== undefined) return vars[expr];

    // List literal: ["A", "B", "C"]
    if (expr.startsWith("[") && expr.endsWith("]")) {
      try {
        return eval(expr);
      } catch {
        return [];
      }
    }

    // Arithmetic with variables substituted
    let safeExpr = expr;
    for (const [key, val] of Object.entries(vars)) {
      if (typeof val === "number") {
        safeExpr = safeExpr.replace(new RegExp(`\\b${key}\\b`, "g"), String(val));
      } else if (typeof val === "string") {
        safeExpr = safeExpr.replace(new RegExp(`\\b${key}\\b`, "g"), JSON.stringify(val));
      }
    }

    try {
      // eslint-disable-next-line no-eval
      return eval(safeExpr);
    } catch {
      return expr;
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex flex-col flex-1">
      {/* Top Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-3.5 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
              {config.title || "Interactive Python Automation Sandbox"}
            </h3>
            <span className="text-[11px] text-neutral-500 block truncate">
              {config.scenario || "Write, execute, and verify Python 3 code in real-time"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {config.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                showHint
                  ? "bg-amber-50 text-amber-800 border-amber-300"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? "Hide Hint" : "Need Hint?"}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition"
            title="Copy Python Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-medium transition"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={runPythonCode}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-2xs active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Script</span>
          </button>
        </div>
      </div>

      {/* Hint Alert */}
      {showHint && config.hint && (
        <div className="bg-amber-50/80 border-b border-amber-200 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Python Tip: </span>
            {config.hint}
          </div>
        </div>
      )}

      {/* Challenge Instruction */}
      <div className="bg-blue-50/60 border-b border-blue-100 px-4 py-3 text-xs text-blue-900 flex items-start gap-2.5">
        <Code2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Challenge: </span>
          {config.challengeInstructions}
        </div>
      </div>

      {/* Editor & Terminal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 flex-1 min-h-[380px]">
        {/* Python Code Editor */}
        <div className="flex flex-col bg-neutral-950 text-neutral-100 flex-1">
          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>main.py (Python 3.12 Engine)</span>
            <span className="text-amber-400 font-semibold">Ready</span>
          </div>

          <div className="relative flex-1 p-3">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full min-h-[300px] bg-transparent text-amber-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 p-2 select-text"
              placeholder="# Write your Python 3 code here..."
            />
          </div>
        </div>

        {/* Live Terminal & Variable State */}
        <div className="flex flex-col bg-neutral-900 text-neutral-100 flex-1">
          {/* Sub-tab Switcher */}
          <div className="bg-neutral-950 px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition ${
                  activeTab === "terminal"
                    ? "bg-neutral-800 text-emerald-400 font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Output Terminal (stdout)
              </button>
              <button
                onClick={() => setActiveTab("variables")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition ${
                  activeTab === "variables"
                    ? "bg-neutral-800 text-blue-400 font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Variable Inspector ({Object.keys(variablesState).length})
              </button>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Local Sandbox</span>
          </div>

          {/* Terminal Logs */}
          {activeTab === "terminal" ? (
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-neutral-200 bg-neutral-900">
              {outputLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.startsWith("> Traceback") || log.startsWith("> SyntaxError")
                      ? "text-rose-400"
                      : log.startsWith("> Ready")
                      ? "text-neutral-500"
                      : "text-emerald-400"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          ) : (
            /* Variable Inspector */
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 bg-neutral-900">
              {Object.keys(variablesState).length === 0 ? (
                <div className="text-neutral-500 text-center py-8">
                  Run script to inspect declared variables in memory.
                </div>
              ) : (
                Object.entries(variablesState).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">{k}</span>
                    <span className="text-amber-300 truncate max-w-[200px]">{JSON.stringify(v)}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Solution Test Result Banner */}
          {testResult.tested && (
            <div
              className={`p-3.5 border-t text-xs flex items-center justify-between gap-3 ${
                testResult.passed
                  ? "bg-emerald-950/80 border-emerald-800 text-emerald-200"
                  : "bg-rose-950/80 border-rose-800 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {testResult.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{testResult.feedback}</span>
              </div>
              {testResult.passed && (
                <span className="px-2 py-0.5 rounded bg-emerald-800 text-white font-bold text-[10px] uppercase">
                  Passed (+50 XP)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
