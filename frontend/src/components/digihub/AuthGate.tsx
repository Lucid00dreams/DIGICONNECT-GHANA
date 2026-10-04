"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Shield,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  LMSUser,
} from "@/lib/lmsStore";

interface AuthGateProps {
  onAuthenticated: (user: LMSUser) => void;
  title?: string;
  subtitle?: string;
}

export function AuthGate({
  onAuthenticated,
  title = "Sign in to access DIGIHub",
  subtitle = "Create your free student account or sign in with Google to start interactive coding labs, track your learning progress, and schedule 1-on-1 mentorship.",
}: AuthGateProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<"coding" | "cybersecurity">("coding");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // Simulate seamless Google SSO
      const googleUser = signInWithGoogle(
        fullName || "Google Student",
        email || "student.learner@gmail.com"
      );
      onAuthenticated(googleUser);
    } catch {
      setErrorMessage("Google authentication could not be completed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (authMode === "signin") {
        const res = signInWithEmail(email, password);
        if (res.success && res.user) {
          onAuthenticated(res.user);
        } else {
          setErrorMessage(res.error || "Invalid credentials. If you are new, please switch to Create Account.");
        }
      } else {
        if (!fullName.trim()) {
          setErrorMessage("Please enter your full name.");
          setIsLoading(false);
          return;
        }
        const res = signUpWithEmail(fullName, email, password, selectedTrack);
        if (res.success && res.user) {
          onAuthenticated(res.user);
        } else {
          setErrorMessage(res.error || "Could not register account. Please try again.");
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-md bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md">
        {/* DigiConnect Ghana Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue-light text-brand-blue">
            <GraduationCap className="w-4 h-4" />
            DIGIHub Student Access
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">{title}</h2>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">{subtitle}</p>
        </div>

        {/* Prominent Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs font-semibold shadow-2xs transition active:scale-[0.99]"
        >
          {/* Multi-color Google SVG Icon */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.99 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-medium text-neutral-400">
            or continue with email
          </span>
        </div>

        {/* Tabs: Sign In / Create Account */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setErrorMessage("");
            }}
            className={`flex-1 py-1.5 rounded-lg transition ${
              authMode === "signup" ? "bg-white text-neutral-900 shadow-2xs font-bold" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signin");
              setErrorMessage("");
            }}
            className={`flex-1 py-1.5 rounded-lg transition ${
              authMode === "signin" ? "bg-white text-neutral-900 shadow-2xs font-bold" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Email Auth Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4 text-xs">
          {authMode === "signup" && (
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Kofi Owusu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authMode === "signup" && (
            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5">
                Select Your Primary Learning Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTrack("coding")}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                    selectedTrack === "coding"
                      ? "bg-brand-blue-light/50 border-brand-blue text-brand-blue-dark font-semibold"
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <Code2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs sm:text-[11px]">Basic Web Coding</div>
                    <div className="text-[10px] text-neutral-500">HTML & CSS</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTrack("cybersecurity")}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                    selectedTrack === "cybersecurity"
                      ? "bg-brand-blue-light/50 border-brand-blue text-brand-blue-dark font-semibold"
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <Shield className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-xs sm:text-[11px]">Cyber Defense</div>
                    <div className="text-[10px] text-neutral-500">Threat Labs</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs mt-2 disabled:opacity-50"
          >
            <span>{authMode === "signup" ? "Create Account & Enter DIGIHub" : "Sign In & Enter DIGIHub"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>Secure student authentication • Free for youth in Ghana</span>
        </div>
      </div>
    </div>
  );
}
