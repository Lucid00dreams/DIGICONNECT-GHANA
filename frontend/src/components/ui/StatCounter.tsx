"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  accent?: "blue" | "red" | "yellow" | "green";
}

const accentColors = {
  blue: "text-brand-blue",
  red: "text-brand-red",
  yellow: "text-brand-yellow",
  green: "text-brand-green",
};

export function StatCounter({ value, suffix = "", label, accent = "blue" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(value * progress);
      setCount(current);

      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${accentColors[accent]}`}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-1.5 text-sm text-neutral-300 font-medium">{label}</p>
    </div>
  );
}
