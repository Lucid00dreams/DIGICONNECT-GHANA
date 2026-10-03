/**
 * DigiConnect Ghana - Cookie Utilities & Consent Management
 * Standard-compliant cookie management for GDPR, ePrivacy, and user preference handling.
 */

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export const COOKIE_CONSENT_KEY = "dcg_cookie_consent";
export const COOKIE_VERSION = "1.0.0";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
  timestamp: "",
  version: COOKIE_VERSION,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  functional: true,
  marketing: true,
  timestamp: new Date().toISOString(),
  version: COOKIE_VERSION,
};

/**
 * Set a browser cookie with standard security attributes
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
  } = {}
): void {
  if (typeof document === "undefined") return;

  const {
    days = 365,
    path = "/",
    sameSite = "Lax",
    secure = typeof window !== "undefined" && window.location.protocol === "https:",
  } = options;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}; SameSite=${sameSite}`;

  if (secure) {
    cookieString += "; Secure";
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      try {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      } catch {
        return cookie.substring(nameEQ.length);
      }
    }
  }

  return null;
}

/**
 * Delete a cookie by setting expired date
 */
export function deleteCookie(name: string, path: string = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

/**
 * Read stored cookie consent preferences
 */
export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  // Check cookie first
  const cookieVal = getCookie(COOKIE_CONSENT_KEY);
  if (cookieVal) {
    try {
      return JSON.parse(cookieVal) as CookiePreferences;
    } catch {
      // Fallback
    }
  }

  // Fallback to localStorage
  try {
    const localVal = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (localVal) {
      return JSON.parse(localVal) as CookiePreferences;
    }
  } catch {
    // Ignore
  }

  return null;
}

/**
 * Store user cookie consent preferences in both cookie and localStorage
 */
export function saveConsent(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const payload: CookiePreferences = {
    ...preferences,
    necessary: true,
    timestamp: new Date().toISOString(),
    version: COOKIE_VERSION,
  };

  const serialized = JSON.stringify(payload);

  // Store in 365-day cookie
  setCookie(COOKIE_CONSENT_KEY, serialized, { days: 365, sameSite: "Lax" });

  // Sync to localStorage
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
  } catch {
    // Ignore
  }

  // Dispatch global event for external scripts / analytics listeners
  window.dispatchEvent(
    new CustomEvent("dcg_cookie_consent_updated", { detail: payload })
  );
}
