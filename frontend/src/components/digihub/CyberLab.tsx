"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Database,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Eye,
  Lock,
  RefreshCw,
  Search,
  Shield,
} from "lucide-react";
import { CyberLabConfig } from "@/lib/lmsStore";

interface CyberLabProps {
  config: CyberLabConfig;
  onLabCompleted?: () => void;
}

export function CyberLab({ config, onLabCompleted }: CyberLabProps) {
  // Phishing Detector state
  const [discoveredFlags, setDiscoveredFlags] = useState<number[]>([]);

  // Password Auditor state
  const [testPassword, setTestPassword] = useState("Ghana@2026Secure!");
  const [showPassword, setShowPassword] = useState(false);

  // SQLi Defender state
  const [sqliInput, setSqliInput] = useState("' OR '1'='1");
  const [queryMode, setQueryMode] = useState<"vulnerable" | "parameterized">("vulnerable");

  // Hint toggle
  const [showHint, setShowHint] = useState(false);

  // Phishing flags handler
  const handleToggleFlag = (index: number) => {
    if (!discoveredFlags.includes(index)) {
      const updated = [...discoveredFlags, index];
      setDiscoveredFlags(updated);
      if (updated.length >= 3 && onLabCompleted) {
        onLabCompleted();
      }
    }
  };

  // Password Entropy Calculator
  const calculateEntropy = (pwd: string) => {
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32;

    if (poolSize === 0 || pwd.length === 0) {
      return { bits: 0, crackTime: "Instant", strength: "Very Weak", percent: 5 };
    }

    const bits = Math.round(pwd.length * (Math.log2(poolSize) || 0));
    let crackTime = "Instant";
    let strength = "Very Weak";
    let percent = 10;

    if (bits >= 80) {
      crackTime = "Over 1,000,000 centuries";
      strength = "Excellent (Resistant to Brute Force)";
      percent = 100;
    } else if (bits >= 60) {
      crackTime = "~300 years";
      strength = "Strong";
      percent = 80;
    } else if (bits >= 40) {
      crackTime = "~3 weeks";
      strength = "Moderate (Vulnerable to GPU cluster)";
      percent = 50;
    } else if (bits >= 25) {
      crackTime = "~2 minutes";
      strength = "Weak";
      percent = 25;
    }

    return { bits, crackTime, strength, percent };
  };

  const entropy = calculateEntropy(testPassword);

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex flex-col flex-1">
      {/* Top Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-3.5 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
            {config.type === "phishing-detector" && <ShieldAlert className="w-4 h-4" />}
            {config.type === "password-auditor" && <KeyRound className="w-4 h-4" />}
            {config.type === "sqli-defender" && <Database className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{config.title}</h3>
            <span className="text-[11px] text-neutral-500 block truncate">{config.scenario}</span>
          </div>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition shrink-0 ${
            showHint
              ? "bg-amber-50 text-amber-800 border-amber-300"
              : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? "Hide Guidance" : "Show Guidance"}</span>
        </button>
      </div>

      {/* Guidance Alert */}
      {showHint && (
        <div className="bg-amber-50/70 border-b border-amber-200/80 p-3.5 sm:p-4 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-950">Security Rule: </span>
            {config.hint}
          </div>
        </div>
      )}

      {/* Main Lab Workspace */}
      <div className="p-3.5 sm:p-7 flex-1 space-y-5 sm:space-y-6">
        {/* LAB 1: PHISHING DETECTOR */}
        {config.type === "phishing-detector" && (
          <div className="space-y-5 sm:space-y-6">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
              <span className="font-semibold text-neutral-900">Task: </span>
              {config.prompt}
            </div>

            {/* Email UI Simulation */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-300 shadow-2xs overflow-hidden">
              {/* Fake Email Header */}
              <div className="bg-neutral-100/90 border-b border-neutral-200 p-3 sm:p-4 space-y-2.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-neutral-500 font-medium shrink-0">From:</span>
                  <button
                    onClick={() => handleToggleFlag(0)}
                    className={`text-left font-mono px-2 py-1 rounded-md transition break-all leading-normal ${
                      discoveredFlags.includes(0)
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold"
                        : "bg-neutral-200/70 text-neutral-800 hover:bg-neutral-200"
                    }`}
                    title="Inspect sender email"
                  >
                    Gh-Revenue-Authority &lt;security-alert@gh-gov-taxes-portal.net&gt;
                    {discoveredFlags.includes(0) && " ✓ Spoofed Domain"}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-neutral-500 font-medium shrink-0">To:</span>
                  <span className="text-neutral-700 font-mono break-all">student.account@digiconnect.org</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-neutral-500 font-medium shrink-0">Subject:</span>
                  <button
                    onClick={() => handleToggleFlag(1)}
                    className={`font-semibold px-2 py-1 rounded-md transition text-left leading-snug break-words ${
                      discoveredFlags.includes(1)
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "text-neutral-900 hover:bg-neutral-200/60"
                    }`}
                  >
                    URGENT: Outstanding Tax Clearance Required Within 2 Hours!
                    {discoveredFlags.includes(1) && " ✓ Urgency Cue"}
                  </button>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <p>Dear Valued Citizen,</p>
                <p>
                  Our automated audit system identified an unpaid registration penalty of <strong>GH₵ 420.00</strong> on your national profile.
                  Failure to authenticate your identity immediately will result in police warrant execution and bank account suspension.
                </p>

                <div className="py-2 text-center">
                  <button
                    onClick={() => handleToggleFlag(2)}
                    className={`inline-block w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs transition border leading-normal break-words ${
                      discoveredFlags.includes(2)
                        ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900"
                    }`}
                  >
                    {discoveredFlags.includes(2)
                      ? "✓ Identified Raw IP Destination (http://185.220.101.5/verify)"
                      : "Click Here to Clear Fine & Authenticate ID"}
                  </button>
                  <div className="text-[11px] text-neutral-400 font-mono mt-1.5 break-all">
                    Target URL: http://185.220.101.5/verify-account?token=9281
                  </div>
                </div>

                <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                  Compliance Division, Tax Enforcement Services.
                </p>
              </div>
            </div>

            {/* Flags Checklist */}
            <div className="bg-neutral-50 rounded-xl sm:rounded-2xl border border-neutral-200 p-3.5 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="font-semibold text-neutral-800">
                  Deceptive Indicators Discovered ({discoveredFlags.length} of 3)
                </span>
                <span className="text-neutral-500">Tap suspicious elements in the email above</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(0)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Lookalike sender domain (.net vs .gov.gh)</span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(1)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Artificial urgency & panic pressure</span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(2)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Direct IP address destination</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 2: PASSWORD ENTROPY AUDITOR */}
        {config.type === "password-auditor" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <span className="font-semibold text-neutral-900">Task: </span>
              {config.prompt}
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                Test Password String
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={testPassword}
                  onChange={(e) => {
                    setTestPassword(e.target.value);
                    if (e.target.value.length > 12 && onLabCompleted) {
                      onLabCompleted();
                    }
                  }}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 font-mono focus:outline-none focus:border-brand-blue shadow-2xs"
                  placeholder="Type any password to test entropy..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Entropy Metrics */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-neutral-800">Entropy Strength: {entropy.strength}</span>
                  <span className="font-mono text-neutral-600 font-semibold">{entropy.bits} bits</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      entropy.percent >= 80
                        ? "bg-emerald-600"
                        : entropy.percent >= 50
                        ? "bg-brand-blue"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${entropy.percent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-white rounded-xl border border-neutral-200">
                  <span className="text-neutral-500 block text-[11px]">Character Length</span>
                  <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{testPassword.length} characters</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200">
                  <span className="text-neutral-500 block text-[11px]">Estimated Brute-Force Time</span>
                  <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{entropy.crackTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 3: SQL INJECTION DEFENDER */}
        {config.type === "sqli-defender" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <span className="font-semibold text-neutral-900">Task: </span>
              {config.prompt}
            </div>

            {/* Mode Toggle */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setQueryMode("vulnerable")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                  queryMode === "vulnerable"
                    ? "bg-rose-50 text-rose-800 border-rose-300"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                Vulnerable String Concatenation
              </button>
              <button
                onClick={() => {
                  setQueryMode("parameterized");
                  if (onLabCompleted) onLabCompleted();
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                  queryMode === "parameterized"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                Parameterized Query (Prepared Statement)
              </button>
            </div>

            {/* Input Simulation */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                User Input Field (Username)
              </label>
              <input
                type="text"
                value={sqliInput}
                onChange={(e) => setSqliInput(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Query Viewer */}
            <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 font-mono text-xs space-y-2">
              <div className="text-[11px] text-neutral-400">Database Engine Query Interpretation:</div>
              {queryMode === "vulnerable" ? (
                <div className="text-rose-300 break-all leading-relaxed">
                  SELECT * FROM users WHERE username = &apos;<span className="bg-rose-900/60 px-1 py-0.5 rounded text-white font-bold">{sqliInput}</span>&apos; AND status = &apos;active&apos;;
                </div>
              ) : (
                <div className="text-emerald-300 break-all leading-relaxed">
                  SELECT * FROM users WHERE username = <span className="bg-emerald-900/60 px-1 py-0.5 rounded text-white font-bold">$1</span> AND status = &apos;active&apos;;
                  <div className="text-[11px] text-neutral-400 mt-2">
                    Bound Parameter $1: &ldquo;{sqliInput}&rdquo; (treated as literal text, never executable SQL)
                  </div>
                </div>
              )}
            </div>

            {/* Query Result Status */}
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                queryMode === "vulnerable"
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              {queryMode === "vulnerable" ? (
                <div>
                  <span className="font-bold block mb-1">Security Vulnerability Active:</span>
                  The injected tautology <code>&apos; OR &apos;1&apos;=&apos;1</code> evaluates to TRUE for every single record, dumping the entire database credentials table to an unauthenticated attacker.
                </div>
              ) : (
                <div>
                  <span className="font-bold block mb-1">Defense Confirmed:</span>
                  The prepared statement enforces strict separation between SQL logic and user data. The database safely searches for a user whose literal name is <code>&apos; OR &apos;1&apos;=&apos;1</code> and returns 0 records.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
