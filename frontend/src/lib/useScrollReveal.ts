"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses IntersectionObserver for performant scroll detection.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = options || {};

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Immediately make all reveal elements visible
      document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (once) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, once]);
}

/**
 * Hook to add stagger delay to child elements.
 * Call with a container ref and it will assign incrementing
 * animation-delay to matching children.
 */
export function useStaggerChildren(containerRef: React.RefObject<HTMLElement | null>, selector = ".stagger-item", delayMs = 60) {
  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll(selector);
    children.forEach((child, i) => {
      (child as HTMLElement).style.animationDelay = `${i * delayMs}ms`;
    });
  }, [containerRef, selector, delayMs]);
}
