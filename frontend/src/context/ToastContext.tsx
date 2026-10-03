"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Check, Info, X, AlertCircle } from "lucide-react";

export interface ToastItem {
  id: string;
  message: string;
  type?: "success" | "info" | "error" | "warning";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info" | "error" | "warning") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "error" | "warning" = "success") => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Accessible Toast Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-brand-dark/95 text-white shadow-xl border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  toast.type === "info"
                    ? "bg-brand-blue text-white"
                    : toast.type === "error"
                    ? "bg-rose-500 text-white"
                    : toast.type === "warning"
                    ? "bg-amber-500 text-white"
                    : "bg-emerald-500 text-white"
                }`}
              >
                {toast.type === "error" || toast.type === "warning" ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : toast.type === "info" ? (
                  <Info className="w-3.5 h-3.5" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </div>
              <p className="text-xs font-medium text-neutral-100 truncate">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
    };
  }
  return context;
}
