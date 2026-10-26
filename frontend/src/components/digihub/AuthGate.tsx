"use client";

import React, { useState } from "react";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithSocialProvider,
  LMSUser,
} from "@/lib/lmsStore";
import {
  executeSocialLogin,
  SocialProvider,
} from "@/lib/socialAuth";

interface AuthGateProps {
  onAuthenticated: (user: LMSUser) => void;
  title?: string;
  subtitle?: string;
}

export function AuthGate({
  onAuthenticated,
  title = "Sign in to access this lab",
  subtitle = "Sign in with Google or your student account to run live code.",
}: AuthGateProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<"coding" | "cybersecurity">("coding");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  const handleSocialAuth = async (provider: SocialProvider) => {
    setSocialLoading(provider);
    setErrorMessage("");

    try {
      const profile = await executeSocialLogin(provider);
      const user = signInWithSocialProvider(
        profile.provider,
        profile.name,
        profile.email,
        profile.avatar,
        profile.id
      );
      onAuthenticated(user);
    } catch (err: any) {
      const msg = err?.message || "";
      if (
        msg.toLowerCase().includes("closed") ||
        msg.toLowerCase().includes("cancel") ||
        msg.toLowerCase().includes("user_cancel")
      ) {
        setErrorMessage("");
      } else {
        setErrorMessage(
          msg || "Google Sign-In could not be completed. Please try again or use your password."
        );
      }
    } finally {
      setSocialLoading(null);
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
          setErrorMessage(res.error || "Invalid credentials. Please switch to Create Account if new.");
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
    <div className="py-6 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-[390px] bg-white border border-neutral-200/90 rounded-2xl shadow-lg p-5 sm:p-6">
        {/* Header */}
        <div className="text-center space-y-1.5 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-blue-light text-brand-blue">
            <GraduationCap className="w-3.5 h-3.5" />
            DIGIHub Student Access
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">{title}</h2>
          <p className="text-xs text-neutral-500 leading-snug max-w-xs mx-auto">{subtitle}</p>
        </div>


        {/* Google SSO Button */}
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          disabled={isLoading || socialLoading !== null}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3.5 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-[0.99] disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
          ) : (
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
          )}
          <span>
            {socialLoading === "google" ? "Connecting to Google..." : "Continue with Google"}
          </span>
        </button>

        {/* Divider */}
        <div className="relative my-3 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <span className="relative bg-white px-2.5 text-[11px] font-medium text-neutral-400">
            or continue with email
          </span>
        </div>

        {/* Tabs: Sign In / Create Account */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl mb-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setErrorMessage("");
            }}
            className={`flex-1 py-1 rounded-lg transition ${
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
            className={`flex-1 py-1 rounded-lg transition ${
              authMode === "signin" ? "bg-white text-neutral-900 shadow-2xs font-bold" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-3 p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 leading-tight">
            {errorMessage}
          </div>
        )}

        {/* Email Auth Form */}
        <form onSubmit={handleEmailAuth} className="space-y-2.5 text-xs">
          {authMode === "signup" && (
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Kofi Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 sm:py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="learner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 sm:py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-neutral-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 sm:py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {authMode === "signup" && (
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Primary Track</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value as any)}
                className="w-full px-2.5 py-1.5 sm:py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-brand-blue"
              >
                <option value="coding">Coding & Web Development</option>
                <option value="cybersecurity">Cybersecurity Architecture</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2 px-4 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold rounded-xl text-xs shadow-2xs transition active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{authMode === "signup" ? "Create Free Account" : "Sign In"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-3.5 pt-2 border-t border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-400 leading-snug">
            Protected by DigiConnect Academic Authority.
          </p>
        </div>
      </div>
    </div>
  );
}
