"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  CookiePreferences,
  DEFAULT_PREFERENCES,
  ACCEPT_ALL_PREFERENCES,
  getStoredConsent,
  saveConsent,
  COOKIE_VERSION,
} from "@/lib/cookies";

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  isHydrated: boolean;
  showBanner: boolean;
  showPreferencesModal: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustomPreferences: (prefs: Partial<CookiePreferences>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);

  useEffect(() => {
    // Only check storage after client mount to eliminate SSR hydration mismatch
    const stored = getStoredConsent();
    if (stored && stored.version === COOKIE_VERSION) {
      setPreferences(stored);
      setHasConsented(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setIsHydrated(true);

    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      if (customEvent.detail) {
        setPreferences(customEvent.detail);
        setHasConsented(true);
      }
    };

    window.addEventListener("dcg_cookie_consent_updated", handleConsentEvent);
    return () => window.removeEventListener("dcg_cookie_consent_updated", handleConsentEvent);
  }, []);

  const acceptAll = () => {
    saveConsent(ACCEPT_ALL_PREFERENCES);
    setPreferences(ACCEPT_ALL_PREFERENCES);
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const rejectNonEssential = () => {
    const minimal: CookiePreferences = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: COOKIE_VERSION,
    };
    saveConsent(minimal);
    setPreferences(minimal);
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const saveCustomPreferences = (custom: Partial<CookiePreferences>) => {
    const updated: CookiePreferences = {
      ...preferences,
      ...custom,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: COOKIE_VERSION,
    };
    saveConsent(updated);
    setPreferences(updated);
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const openPreferences = () => {
    setShowPreferencesModal(true);
  };

  const closePreferences = () => {
    setShowPreferencesModal(false);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        isHydrated,
        showBanner: isHydrated && showBanner,
        showPreferencesModal,
        acceptAll,
        rejectNonEssential,
        saveCustomPreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent(): CookieContextType {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
}
