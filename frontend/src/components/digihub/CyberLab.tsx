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
  Terminal,
  Wifi,
  Radio,
  FileCode2,
  Smartphone,
  Hash,
} from "lucide-react";
import { CyberLabConfig } from "@/lib/lmsStore";

interface CyberLabProps {
  config: CyberLabConfig;
  onLabCompleted?: () => void;
}

export function CyberLab({ config, onLabCompleted }: CyberLabProps) {
  // ─── 1. PHISHING & MOMO FRAUD DETECTOR STATE ─────────────────────────────
  const [phishingScenario, setPhishingScenario] = useState<"momo-sms" | "tax-authority">("momo-sms");
  const [discoveredFlags, setDiscoveredFlags] = useState<number[]>([]);

  // ─── 2. PASSWORD AUDITOR & HASH CRACKER STATE ────────────────────────────
  const [testPassword, setTestPassword] = useState("Accra@2026Secure!");
  const [showPassword, setShowPassword] = useState(false);
  const [hashTab, setHashTab] = useState<"entropy" | "hashes">("entropy");

  // ─── 3. SQLi DEFENDER STATE ──────────────────────────────────────────────
  const [sqliInput, setSqliInput] = useState("' OR '1'='1");
  const [queryMode, setQueryMode] = useState<"vulnerable" | "parameterized">("vulnerable");

  // ─── 4. NETWORK & PORT INSPECTOR STATE ───────────────────────────────────
  const [scanState, setScanState] = useState<"idle" | "scanning" | "scanned">("idle");
  const [firewallActive, setFirewallActive] = useState(false);
  const [sniffingActive, setSniffingActive] = useState(false);

  // Common UI states
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
      strength = "Exceptional (Quantum Resistant)";
      percent = 100;
    } else if (bits >= 60) {
      crackTime = "~300 years (Resistant to GPU cluster)";
      strength = "Strong";
      percent = 80;
    } else if (bits >= 40) {
      crackTime = "~3 weeks";
      strength = "Moderate (Vulnerable to botnets)";
      percent = 50;
    } else if (bits >= 25) {
      crackTime = "~2 minutes";
      strength = "Weak";
      percent = 25;
    }

    return { bits, crackTime, strength, percent };
  };

  const entropy = calculateEntropy(testPassword);

  // Hash simulation (deterministic fake SHA-256 string for interactive preview)
  const computeFakeSha256 = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `${hex}a9b2c3d4e5f60123456789abcdef0123456789abcdef0123456789abcdef`.slice(0, 64);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex flex-col flex-1">
      {/* Top Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-3.5 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
            {config.type === "phishing-detector" && <ShieldAlert className="w-4 h-4" />}
            {config.type === "password-auditor" && <KeyRound className="w-4 h-4" />}
            {config.type === "sqli-defender" && <Database className="w-4 h-4" />}
            {config.type === "network-inspector" && <Wifi className="w-4 h-4" />}
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
      <div className="p-3.5 sm:p-6 flex-1 space-y-5">
        {/* ─── LAB 1: PHISHING & MOMO FRAUD DETECTOR ─────────────────────── */}
        {config.type === "phishing-detector" && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-semibold text-neutral-900">Task: </span>
                {config.prompt}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPhishingScenario("momo-sms")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    phishingScenario === "momo-sms"
                      ? "bg-amber-600 text-white font-bold"
                      : "bg-white border text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  MoMo SMS Fraud
                </button>
                <button
                  type="button"
                  onClick={() => setPhishingScenario("tax-authority")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    phishingScenario === "tax-authority"
                      ? "bg-brand-blue text-white font-bold"
                      : "bg-white border text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Tax Agency Email
                </button>
              </div>
            </div>

            {phishingScenario === "momo-sms" ? (
              /* Scenario A: Mobile Money SMS Fraud Simulation */
              <div className="max-w-md mx-auto bg-neutral-900 rounded-3xl p-4 sm:p-5 border-4 border-neutral-800 shadow-xl text-neutral-100 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>SMS Message • Telecel/MTN MoMo Notice</span>
                  </div>
                  <span>10:42 AM</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleToggleFlag(0)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-mono transition border ${
                      discoveredFlags.includes(0)
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                        : "bg-neutral-800/80 border-neutral-700 hover:border-neutral-500 text-neutral-200"
                    }`}
                  >
                    Sender ID: <span className="font-bold text-amber-400">+233 54 819 0291 (Unverified Private Number)</span>
                    {discoveredFlags.includes(0) && " ✓ Spoofed Sender"}
                  </button>

                  <div className="p-4 rounded-2xl bg-neutral-800 border border-neutral-700 text-xs leading-relaxed space-y-3">
                    <button
                      onClick={() => handleToggleFlag(1)}
                      className={`text-left p-1.5 rounded transition ${
                        discoveredFlags.includes(1)
                          ? "bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500"
                          : "hover:bg-neutral-700/60 text-neutral-100"
                      }`}
                    >
                      URGENT NOTICE: Your Mobile Money wallet has been flagged for unauthorized cash-out. Your funds of GH₵ 3,850 will be locked in 15 minutes!
                      {discoveredFlags.includes(1) && " ✓ Urgency Cue"}
                    </button>

                    <div className="pt-1">
                      <button
                        onClick={() => handleToggleFlag(2)}
                        className={`w-full text-center py-2 px-3 rounded-xl font-bold text-xs transition border ${
                          discoveredFlags.includes(2)
                            ? "bg-emerald-900/80 text-emerald-300 border-emerald-400"
                            : "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                        }`}
                      >
                        {discoveredFlags.includes(2)
                          ? "✓ Fake Domain Identified: http://momo-secure-ghana-auth.top"
                          : "Tap Here to Cancel Freeze & Enter 4-Digit MoMo PIN"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Scenario B: Email Phishing Simulation */
              <div className="bg-white rounded-2xl border border-neutral-300 shadow-2xs overflow-hidden text-xs">
                <div className="bg-neutral-100/90 border-b border-neutral-200 p-3 sm:p-4 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-neutral-500 font-medium">From:</span>
                    <button
                      onClick={() => handleToggleFlag(0)}
                      className={`text-left font-mono px-2 py-1 rounded-md transition ${
                        discoveredFlags.includes(0)
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold"
                          : "bg-neutral-200/70 text-neutral-800 hover:bg-neutral-200"
                      }`}
                    >
                      Gh-Revenue-Authority &lt;security-alert@gh-gov-taxes-portal.net&gt;
                      {discoveredFlags.includes(0) && " ✓ Lookalike TLD"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-neutral-500 font-medium">Subject:</span>
                    <button
                      onClick={() => handleToggleFlag(1)}
                      className={`font-semibold px-2 py-1 rounded-md transition text-left ${
                        discoveredFlags.includes(1)
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "text-neutral-900 hover:bg-neutral-200/60"
                      }`}
                    >
                      URGENT: Legal Summons & Frozen Accounts Within 2 Hours!
                      {discoveredFlags.includes(1) && " ✓ Urgency Panicking"}
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3 leading-relaxed">
                  <p>Dear Taxpayer,</p>
                  <p>
                    Your national TIN was audited today with outstanding fines of GH₵ 750.00. Click below to pay via our portal or face police arrest.
                  </p>
                  <div className="text-center py-2">
                    <button
                      onClick={() => handleToggleFlag(2)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                        discoveredFlags.includes(2)
                          ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                          : "bg-neutral-900 text-white hover:bg-neutral-800"
                      }`}
                    >
                      {discoveredFlags.includes(2)
                        ? "✓ Raw Foreign IP: http://185.220.101.5/tin-pay"
                        : "Click to Pay Assessment via Portal"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Flags Checklist */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">
                  Suspicious Artifacts Found ({discoveredFlags.length} of 3)
                </span>
                <span className="text-neutral-500 text-[11px]">Click suspicious cues in the message above</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(0)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Unverified sender identity</span>
                </div>
                <div
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(1)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Urgency coercion & countdown threat</span>
                </div>
                <div
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    discoveredFlags.includes(2)
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                      : "bg-white text-neutral-500 border-neutral-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Deceptive or credential harvesting link</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── LAB 2: PASSWORD AUDITOR & HASH CRACKER ───────────────────── */}
        {config.type === "password-auditor" && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <button
                type="button"
                onClick={() => setHashTab("entropy")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  hashTab === "entropy"
                    ? "bg-brand-blue text-white font-bold"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Entropy & Brute Force Estimator
              </button>
              <button
                type="button"
                onClick={() => setHashTab("hashes")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  hashTab === "hashes"
                    ? "bg-brand-blue text-white font-bold"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Cryptographic Hashing & Salt Demo
              </button>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                Type Any Password or Passphrase to Audit:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={testPassword}
                  onChange={(e) => {
                    setTestPassword(e.target.value);
                    if (e.target.value.length >= 14 && onLabCompleted) onLabCompleted();
                  }}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-brand-blue"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs text-neutral-500 hover:text-neutral-900 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {hashTab === "entropy" ? (
              <div className="space-y-4">
                {/* Strength Meter Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-neutral-600">Calculated Entropy:</span>
                    <span className="font-bold text-neutral-900">
                      {entropy.bits} bits ({entropy.strength})
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        entropy.percent >= 80
                          ? "bg-emerald-500"
                          : entropy.percent >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${entropy.percent}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px]">Character Length</span>
                    <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{testPassword.length} chars</span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px]">GPU Crack Time</span>
                    <span className="font-bold text-neutral-900 text-sm mt-0.5 block truncate">{entropy.crackTime}</span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px]">Pool Character Space</span>
                    <span className="font-bold text-neutral-900 text-sm mt-0.5 block">
                      {/[a-z]/.test(testPassword) && "a-z "}
                      {/[A-Z]/.test(testPassword) && "A-Z "}
                      {/[0-9]/.test(testPassword) && "0-9 "}
                      {/[^a-zA-Z0-9]/.test(testPassword) && "symbols"}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px]">Industry Standard</span>
                    <span className="font-bold text-emerald-700 text-sm mt-0.5 block">NIST SP 800-63B</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Cryptographic Hash Tab */
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-neutral-900 text-neutral-200 rounded-xl space-y-2 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400">One-Way SHA-256 Digest:</div>
                  <div className="text-emerald-400 break-all select-all">{computeFakeSha256(testPassword)}</div>
                  <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-800">
                    Irreversible mathematical fingerprint. Even changing 1 character completely flips 50% of bits (Avalanche Effect).
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50 text-blue-950 rounded-xl border border-blue-200 font-digihub space-y-1.5">
                  <span className="font-bold flex items-center gap-1.5 text-xs text-blue-900">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    How Password Salting Defeats Rainbow Tables:
                  </span>
                  <p className="text-xs leading-relaxed text-blue-800">
                    Databases never store plain passwords. When you add a cryptographic Salt (e.g. <code>hash(password + random_salt)</code>), attackers cannot use precomputed dictionary rainbow tables to crack stolen database dumps!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── LAB 3: SQL INJECTION DEFENDER ────────────────────────────── */}
        {config.type === "sqli-defender" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setQueryMode("vulnerable")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                  queryMode === "vulnerable"
                    ? "bg-rose-50 text-rose-800 border-rose-300 font-bold"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                Vulnerable Query (Direct Concatenation)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQueryMode("parameterized");
                  if (onLabCompleted) onLabCompleted();
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                  queryMode === "parameterized"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                Parameterized Shield (Prepared Statement)
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-700">
                Simulated User Input (Login Form)
              </label>
              <input
                type="text"
                value={sqliInput}
                onChange={(e) => setSqliInput(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Query Viewer */}
            <div className="bg-neutral-950 text-neutral-100 rounded-2xl p-4 font-mono text-xs space-y-2">
              <div className="text-[11px] text-neutral-400">Database Engine Query Assembly:</div>
              {queryMode === "vulnerable" ? (
                <div className="text-rose-300 break-all leading-relaxed">
                  SELECT id, name, role FROM users WHERE username = &apos;
                  <span className="bg-rose-900/60 px-1 py-0.5 rounded text-white font-bold">{sqliInput}</span>
                  &apos; AND status = &apos;active&apos;;
                </div>
              ) : (
                <div className="text-emerald-300 break-all leading-relaxed">
                  SELECT id, name, role FROM users WHERE username = <span className="bg-emerald-900/60 px-1 py-0.5 rounded text-white font-bold">$1</span> AND status = &apos;active&apos;;
                  <div className="text-[11px] text-neutral-400 mt-2">
                    Bound Literal Parameter $1: &ldquo;{sqliInput}&rdquo; (treated as plain text, never executable SQL)
                  </div>
                </div>
              )}
            </div>

            {/* Database Output Simulation */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-neutral-100 px-3 py-2 font-mono text-[11px] font-bold text-neutral-700 border-b border-neutral-200">
                Database Return Records:
              </div>
              <div className="p-3 bg-white font-mono text-xs">
                {queryMode === "vulnerable" ? (
                  <div className="space-y-1 text-rose-700">
                    <div>[Record 1] id: 1 • name: &quot;Admin Master&quot; • role: &quot;superadmin&quot; • password_hash: &quot;$2a$12...&quot;</div>
                    <div>[Record 2] id: 2 • name: &quot;Kwame Finance&quot; • role: &quot;auditor&quot; • password_hash: &quot;$2a$12...&quot;</div>
                    <div className="text-rose-950 font-bold font-digihub pt-2 border-t border-rose-200">
                      ⚠️ Breach Confirmed: Injected tautology bypassed auth and dumped all confidential records!
                    </div>
                  </div>
                ) : (
                  <div className="text-emerald-700 space-y-1">
                    <div>(0 records returned. No user with literal name &ldquo;{sqliInput}&rdquo; exists.)</div>
                    <div className="text-emerald-950 font-bold font-digihub pt-2 border-t border-emerald-200">
                      🛡️ Defense Confirmed: Attack payload safely neutralized by prepared statement parameterization.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── LAB 4: NETWORK & PORT INSPECTOR ──────────────────────────── */}
        {config.type === "network-inspector" && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-bold text-neutral-900">Task: </span>
                Scan the remote server at <code>192.168.1.100</code>, sniff unencrypted traffic, and activate firewall protection.
              </div>
              <button
                type="button"
                onClick={() => {
                  setScanState("scanning");
                  setTimeout(() => setScanState("scanned"), 1200);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition"
              >
                {scanState === "scanning" ? "Scanning..." : "Run Nmap Port Scan"}
              </button>
            </div>

            {/* Network Terminal */}
            <div className="bg-neutral-950 text-neutral-100 rounded-2xl p-4 font-mono text-xs space-y-3 min-h-[220px]">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Network Forensic Console (nmap & tcpdump)</span>
                </span>
                <span className="text-neutral-500">Host: 192.168.1.100</span>
              </div>

              {scanState === "idle" && (
                <div className="text-neutral-500 py-6 text-center">
                  Click &apos;Run Nmap Port Scan&apos; above to inspect open listening services.
                </div>
              )}

              {scanState === "scanning" && (
                <div className="text-amber-400 py-6 text-center animate-pulse">
                  Initiating SYN Stealth Scan against 1,000 ports...
                </div>
              )}

              {scanState === "scanned" && (
                <div className="space-y-1.5">
                  <div className="text-neutral-400">PORT     STATE SERVICE       SECURITY POSTURE</div>
                  <div className="text-rose-400">21/tcp   OPEN  ftp           Vulnerable: Plaintext password transmission</div>
                  <div className="text-rose-400">23/tcp   OPEN  telnet        Critical: Deprecated unencrypted shell</div>
                  <div className="text-amber-300">80/tcp   OPEN  http          Unencrypted web traffic (No TLS)</div>
                  <div className="text-emerald-400">443/tcp  OPEN  https         Secure: TLS 1.3 / AES-256-GCM</div>
                  <div className="text-emerald-400">22/tcp   OPEN  ssh           Secure: OpenSSH Ed25519 key auth</div>
                </div>
              )}
            </div>

            {scanState === "scanned" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div>
                    <span className="font-bold text-xs text-neutral-900 block">
                      Firewall & TLS Hardening Rule
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Block legacy ports 21 & 23, redirect HTTP to HTTPS (443)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFirewallActive(true);
                      if (onLabCompleted) onLabCompleted();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      firewallActive
                        ? "bg-emerald-600 text-white"
                        : "bg-brand-blue hover:bg-brand-blue-dark text-white shadow-2xs"
                    }`}
                  >
                    {firewallActive ? "✓ Hardened & Protected" : "Apply Firewall Policy"}
                  </button>
                </div>

                {firewallActive && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Success: Server ports 21 and 23 blocked. Strict HTTPS (HSTS) enforced. Network security lab completed! (+50 XP)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
