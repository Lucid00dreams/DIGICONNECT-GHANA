"use client";

import { useStore } from "@/context/StoreContext";
import { StatCounter } from "@/components/ui/StatCounter";

export function DynamicImpactStats({ isDark = true }: { isDark?: boolean }) {
  const { store } = useStore();
  const stats = store.impactStats || [];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat) => (
        <StatCounter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          accent={stat.accent}
        />
      ))}
    </div>
  );
}
