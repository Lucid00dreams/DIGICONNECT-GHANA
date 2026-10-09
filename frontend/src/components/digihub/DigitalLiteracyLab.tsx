"use client";

import React, { useState } from "react";
import {
  Folder,
  FileText,
  FileSpreadsheet,
  Lock,
  Globe,
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calculator,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export interface DigitalLiteracyLabConfig {
  type: "cloud-permissions" | "spreadsheet-formulas";
  title: string;
  scenario: string;
  prompt: string;
  hint: string;
}

interface DigitalLiteracyLabProps {
  config: DigitalLiteracyLabConfig;
  onLabCompleted?: () => void;
}

export function DigitalLiteracyLab({ config, onLabCompleted }: DigitalLiteracyLabProps) {
  // Cloud Permissions State
  const [accessLevel, setAccessLevel] = useState<"public" | "anyone-with-link" | "restricted">("public");
  const [permissionRole, setPermissionRole] = useState<"editor" | "commenter" | "viewer">("editor");
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(false);

  // Spreadsheet State
  const [formulaInput, setFormulaInput] = useState("=SUM(D2:D5)");
  const [formulaEvaluated, setFormulaEvaluated] = useState<number | null>(1480);
  const [formulaError, setFormulaError] = useState<string | null>(null);

  const [completed, setCompleted] = useState(false);

  // Spreadsheet sample data
  const spreadsheetData = [
    { item: "Training Laptops", unit: 350, qty: 3, total: 1050 },
    { item: "Wi-Fi Router (4G)", unit: 180, qty: 1, total: 180 },
    { item: "Projector Screen", unit: 150, qty: 1, total: 150 },
    { item: "Whiteboard & Markers", unit: 100, qty: 1, total: 100 },
  ];

  const handleApplyPermissions = () => {
    if (accessLevel === "restricted" && permissionRole === "viewer" && twoFactorEnforced) {
      setCompleted(true);
      if (onLabCompleted) onLabCompleted();
    } else {
      setCompleted(false);
    }
  };

  const handleEvaluateFormula = () => {
    setFormulaError(null);
    const cleaned = formulaInput.trim().toUpperCase();

    if (cleaned === "=SUM(D2:D5)") {
      setFormulaEvaluated(1480);
      setCompleted(true);
      if (onLabCompleted) onLabCompleted();
    } else if (cleaned === "=AVERAGE(D2:D5)") {
      setFormulaEvaluated(370);
      setCompleted(true);
      if (onLabCompleted) onLabCompleted();
    } else if (cleaned.startsWith("=SUM(") && cleaned.endsWith(")")) {
      setFormulaEvaluated(1480);
      setCompleted(true);
      if (onLabCompleted) onLabCompleted();
    } else {
      setFormulaError("Formula syntax incorrect. Try writing '=SUM(D2:D5)' to sum all totals.");
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex flex-col flex-1">
      {/* Top Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-3.5 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            {config.type === "cloud-permissions" ? (
              <Folder className="w-4 h-4" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{config.title}</h3>
            <span className="text-[11px] text-neutral-500 block truncate">{config.scenario}</span>
          </div>
        </div>

        {completed && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Lab Complete (+50 XP)</span>
          </span>
        )}
      </div>

      {/* Main Task Description */}
      <div className="p-4 bg-emerald-50/50 border-b border-emerald-100 text-xs text-emerald-950 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Workplace Objective: </span>
          {config.prompt}
        </div>
      </div>

      {/* LAB TYPE 1: CLOUD PERMISSIONS SIMULATOR */}
      {config.type === "cloud-permissions" ? (
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* Simulated File Card */}
          <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">
                PDF
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">
                  DCG_Staff_Salary_Confidential_Q4.pdf
                </h4>
                <p className="text-[11px] text-neutral-500">Cloud Storage • Human Resources Directorate</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              Confidential
            </span>
          </div>

          {/* Sharing Configuration Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                1. General Access Control
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setAccessLevel("public")}
                  className={`p-3 rounded-xl border text-left transition ${
                    accessLevel === "public"
                      ? "border-rose-400 bg-rose-50 text-rose-900 font-semibold"
                      : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <Globe className="w-4 h-4 mb-1 text-rose-600" />
                  <div className="font-bold">Public (Internet)</div>
                  <div className="text-[10px] text-neutral-500">Search engines & anyone can find</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccessLevel("anyone-with-link")}
                  className={`p-3 rounded-xl border text-left transition ${
                    accessLevel === "anyone-with-link"
                      ? "border-amber-400 bg-amber-50 text-amber-900 font-semibold"
                      : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <Users className="w-4 h-4 mb-1 text-amber-600" />
                  <div className="font-bold">Anyone with Link</div>
                  <div className="text-[10px] text-neutral-500">Unauthenticated link access</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccessLevel("restricted")}
                  className={`p-3 rounded-xl border text-left transition ${
                    accessLevel === "restricted"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold"
                      : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <Lock className="w-4 h-4 mb-1 text-emerald-600" />
                  <div className="font-bold">Restricted (Invite Only)</div>
                  <div className="text-[10px] text-neutral-500">Specific verified corporate emails</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                2. Recipient Role Permission
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {(["editor", "commenter", "viewer"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setPermissionRole(role)}
                    className={`p-3 rounded-xl border text-left capitalize transition ${
                      permissionRole === role
                        ? role === "viewer"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                          : "border-blue-400 bg-blue-50 text-blue-900 font-bold"
                        : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <div className="font-bold">{role}</div>
                    <div className="text-[10px] text-neutral-500">
                      {role === "editor"
                        ? "Can edit, delete, and redistribute"
                        : role === "commenter"
                        ? "Can leave feedback without modifying"
                        : "Can read only (no copy or delete)"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnforced}
                  onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                  className="rounded text-brand-blue focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold">
                  Enforce Two-Factor Authentication (2FA) verification before file download
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyPermissions}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs"
              >
                Apply Security Policy & Verify
              </button>
            </div>

            {/* Risk Assessment Box */}
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                accessLevel === "restricted" && permissionRole === "viewer" && twoFactorEnforced
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              {accessLevel === "restricted" && permissionRole === "viewer" && twoFactorEnforced ? (
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Enterprise Compliant: </span>
                    Confidential document is restricted exclusively to authorized accounts with Viewer privileges and mandatory 2FA. Data leakage risk is eliminated.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Security Exposure Detected: </span>
                    {accessLevel !== "restricted"
                      ? "File is open to unauthorized public internet viewers. Switch to 'Restricted'."
                      : permissionRole !== "viewer"
                      ? "Consultants should not have Editor permissions on confidential payroll files. Change role to 'Viewer'."
                      : "Enable Two-Factor Authentication (2FA) to complete the security posture."}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* LAB TYPE 2: SPREADSHEET FORMULAS SIMULATOR */
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          {/* Spreadsheet Table */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-neutral-100 text-neutral-600 font-mono text-[11px] border-b border-neutral-200">
                <tr>
                  <th className="py-2 px-3 w-8">#</th>
                  <th className="py-2 px-3">A (Item)</th>
                  <th className="py-2 px-3">B (Unit Cost GH₵)</th>
                  <th className="py-2 px-3">C (Qty)</th>
                  <th className="py-2 px-3">D (Total GH₵)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono">
                {spreadsheetData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/70">
                    <td className="py-2 px-3 text-neutral-400 bg-neutral-50/60 font-bold">{idx + 2}</td>
                    <td className="py-2 px-3 font-sans font-medium text-neutral-900">{row.item}</td>
                    <td className="py-2 px-3 text-neutral-700">{row.unit}</td>
                    <td className="py-2 px-3 text-neutral-700">{row.qty}</td>
                    <td className="py-2 px-3 font-bold text-neutral-900 bg-blue-50/30">{row.total}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-emerald-50/60 font-bold border-t-2 border-emerald-300">
                  <td className="py-2 px-3 text-neutral-400">6</td>
                  <td className="py-2 px-3 font-sans text-emerald-950" colSpan={3}>
                    Grand Budget Total (D2:D5):
                  </td>
                  <td className="py-2 px-3 text-emerald-700 text-sm">
                    {formulaEvaluated !== null ? `GH₵ ${formulaEvaluated}` : "—"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Formula Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-800">
              Formula Input Bar (fx)
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-neutral-400">
                  fx
                </span>
                <input
                  type="text"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  placeholder="=SUM(D2:D5)"
                  className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <button
                type="button"
                onClick={handleEvaluateFormula}
                className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition shadow-2xs"
              >
                Calculate
              </button>
            </div>

            {formulaError && (
              <p className="text-xs text-rose-600 font-medium">{formulaError}</p>
            )}
          </div>

          {/* Quick Formula Hints */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <span className="font-bold text-neutral-900 block">Common Spreadsheet Formulas:</span>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setFormulaInput("=SUM(D2:D5)")}
                className="px-2 py-1 bg-white border border-neutral-300 rounded hover:border-brand-blue"
              >
                =SUM(D2:D5)
              </button>
              <button
                type="button"
                onClick={() => setFormulaInput("=AVERAGE(D2:D5)")}
                className="px-2 py-1 bg-white border border-neutral-300 rounded hover:border-brand-blue"
              >
                =AVERAGE(D2:D5)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
