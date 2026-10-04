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
  Unlock,
  RefreshCw,
  Search,
  Sparkles,
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
  const [testPassword, setTestPassword] = useState("kumasi2026");
  const [showPassword, setShowPassword] = useState(true);

  // SQLi Defender state
  const [userInput, setUserInput] = useState("admin' OR '1'='1");
  const [defenseMode, setDefenseMode] = useState<"vulnerable" | "parameterized">("vulnerable");

  // Toggle discovered red flag
  const toggleFlag = (idx: number) => {
    if (!discoveredFlags.includes(idx)) {
      const next = [...discoveredFlags, idx];
      setDiscoveredFlags(next);
      if (next.length === (config.targetData?.redFlags?.length || 4) && onLabCompleted) {
        onLabCompleted();
      }
    }
  };

  // Calculate password strength & entropy
  const calcPasswordStats = (pwd: string) => {
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;

    const length = pwd.length;
    const entropy = length > 0 && pool > 0 ? Math.round(length * Math.log2(pool)) : 0;

    let strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Military Grade" = "Very Weak";
    let crackTime = "Instant (< 1 millisecond)";
    let barColor = "bg-red-500";

    if (entropy < 28) {
      strength = "Very Weak";
      crackTime = "A few milliseconds";
      barColor = "bg-red-500";
    } else if (entropy < 45) {
      strength = "Weak";
      crackTime = "A few minutes to hours";
      barColor = "bg-amber-500";
    } else if (entropy < 65) {
      strength = "Moderate";
      crackTime = "Several weeks to months";
      barColor = "bg-yellow-500";
    } else if (entropy < 85) {
      strength = "Strong";
      crackTime = "Centuries (100+ years)";
      barColor = "bg-emerald-500";
    } else {
      strength = "Military Grade";
      crackTime = "Billions of years";
      barColor = "bg-emerald-400";
    }

    return { entropy, strength, crackTime, barColor, pool, length };
  };

  const pwdStats = calcPasswordStats(testPassword);

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5 lg:p-6 text-white shadow-xl flex flex-col justify-between">
      {/* Lab Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-2">
            {config.type === "phishing-detector" && <ShieldAlert className="w-5 h-5 text-rose-500" />}
            {config.type === "password-auditor" && <KeyRound className="w-5 h-5 text-amber-400" />}
            {config.type === "sqli-defender" && <Database className="w-5 h-5 text-brand-blue" />}
            <h3 className="font-extrabold text-sm sm:text-base text-white">{config.title}</h3>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Interactive Security Lab
          </span>
        </div>

        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">{config.scenario}</p>

        {/* ─── LAB TYPE 1: PHISHING DETECTOR ─── */}
        {config.type === "phishing-detector" && config.targetData && (
          <div className="space-y-4">
            {/* Suspicious Email Card */}
            <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-4 font-mono text-xs space-y-2.5">
              <div className="flex items-start justify-between border-b border-neutral-800 pb-2">
                <div>
                  <span className="text-neutral-500 block text-[10px]">From:</span>
                  <span className="text-rose-400 font-bold">{config.targetData.sender}</span>
                </div>
                <button
                  onClick={() => toggleFlag(0)}
                  className={`text-[10px] px-2 py-0.5 rounded font-sans transition-colors ${
                    discoveredFlags.includes(0)
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  {discoveredFlags.includes(0) ? "Flagged: Fake Domain" : "Inspect Sender Domain"}
                </button>
              </div>

              <div className="flex items-start justify-between border-b border-neutral-800 pb-2">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Subject:</span>
                  <span className="text-amber-300 font-bold">{config.targetData.subject}</span>
                </div>
                <button
                  onClick={() => toggleFlag(1)}
                  className={`text-[10px] px-2 py-0.5 rounded font-sans transition-colors ${
                    discoveredFlags.includes(1)
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  {discoveredFlags.includes(1) ? "Flagged: Panic Urgency" : "Analyze Urgency"}
                </button>
              </div>

              <div className="text-neutral-300 leading-relaxed font-sans text-xs pt-1">
                {config.targetData.body}
              </div>

              {/* Malicious CTA Link */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Hidden Link Destination:</span>
                  <code className="text-rose-400 text-[11px] underline">{config.targetData.ctaUrl}</code>
                </div>
                <button
                  onClick={() => toggleFlag(2)}
                  className={`text-[10px] px-2 py-0.5 rounded font-sans transition-colors ${
                    discoveredFlags.includes(2)
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  {discoveredFlags.includes(2) ? "Flagged: Raw IP & HTTP" : "Examine Link Target"}
                </button>
              </div>
            </div>

            {/* Red Flags Discovered Checklist */}
            <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span>Threat Indicators Discovered:</span>
                <span className="text-rose-400">
                  {discoveredFlags.length} of {config.targetData.redFlags.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {config.targetData.redFlags.map((flag: string, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-xs p-1.5 rounded-lg transition-colors ${
                      discoveredFlags.includes(idx)
                        ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                        : "text-neutral-500"
                    }`}
                  >
                    {discoveredFlags.includes(idx) ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0" />
                    )}
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── LAB TYPE 2: PASSWORD AUDITOR ─── */}
        {config.type === "password-auditor" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Test a Password or Passphrase:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:border-brand-yellow focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Demo Templates */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-neutral-500">Quick test:</span>
              <button
                type="button"
                onClick={() => setTestPassword("123456")}
                className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                123456
              </button>
              <button
                type="button"
                onClick={() => setTestPassword("accra2025")}
                className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                accra2025
              </button>
              <button
                type="button"
                onClick={() => setTestPassword("P@ssw0rd!#")}
                className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                P@ssw0rd!#
              </button>
              <button
                type="button"
                onClick={() => setTestPassword("kumasi-solar-coffee-beacon")}
                className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                4-Word Passphrase
              </button>
            </div>

            {/* Strength Analysis Meter */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Mathematical Entropy:</span>
                <span className="font-mono font-bold text-white">{pwdStats.entropy} bits</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full ${pwdStats.barColor} transition-all duration-300`}
                  style={{ width: `${Math.min(100, (pwdStats.entropy / 90) * 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-800">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Strength Rating:</span>
                  <span className="font-bold text-white">{pwdStats.strength}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Estimated Crack Time (GPU Cluster):</span>
                  <span className="font-bold text-amber-300">{pwdStats.crackTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── LAB TYPE 3: SQL INJECTION DEFENDER ─── */}
        {config.type === "sqli-defender" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-300">Simulated Login Input:</label>
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setDefenseMode("vulnerable")}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${
                    defenseMode === "vulnerable"
                      ? "bg-rose-600 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Vulnerable SQL
                </button>
                <button
                  type="button"
                  onClick={() => setDefenseMode("parameterized")}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${
                    defenseMode === "parameterized"
                      ? "bg-emerald-600 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Parameterized Defense
                </button>
              </div>
            </div>

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-brand-blue"
            />

            {/* Generated SQL Query */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 font-mono text-xs">
              <span className="text-[10px] text-neutral-500 block mb-1">Generated Database Query:</span>
              {defenseMode === "vulnerable" ? (
                <code className="text-rose-400 break-all">
                  SELECT * FROM users WHERE email = &apos;<span className="bg-rose-500/20 px-1 rounded text-white">{userInput}</span>&apos;;
                </code>
              ) : (
                <code className="text-emerald-400 break-all">
                  SELECT * FROM users WHERE email = $1;
                  <br />
                  <span className="text-neutral-400 text-[11px]">// Parameter 1 is treated strictly as literal data: &quot;{userInput}&quot;</span>
                </code>
              )}
            </div>

            {/* Result Outcome */}
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              defenseMode === "vulnerable"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            }`}>
              {defenseMode === "vulnerable" ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <strong>VULNERABILITY EXPLOITED!</strong> The string broke outside the quotes. &apos;1&apos;=&apos;1&apos; is always true, bypassing authentication and dumping user accounts.
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong>DEFENSE SUCCESSFUL!</strong> Parameterized query safely treated the input as a single literal string. Injection was neutralized.
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Hint */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
          <span>{config.hint}</span>
        </div>
      </div>
    </div>
  );
}
