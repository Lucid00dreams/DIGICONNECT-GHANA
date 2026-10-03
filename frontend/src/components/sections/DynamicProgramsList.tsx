"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Clock, ArrowRight } from "lucide-react";

export function DynamicProgramsGrid() {
  const { store } = useStore();
  const programs = store.programs || [];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((program, idx) => (
        <ScrollReveal key={program.slug} delay={idx * 100}>
          <ProgramCard program={program} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function DynamicProgramsTable() {
  const { store } = useStore();
  const programs = store.programs || [];

  return (
    <tbody className="divide-y divide-neutral-200 text-sm">
      {programs.map((prog) => (
        <tr key={prog.slug} className="hover:bg-neutral-50/80 transition-colors">
          <td className="py-5 px-6 font-semibold text-brand-dark">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue font-mono font-bold text-xs flex items-center justify-center">
                {prog.number}
              </span>
              {prog.title}
            </div>
          </td>
          <td className="py-5 px-6 text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-400" />
              {prog.duration}
            </div>
          </td>
          <td className="py-5 px-6 text-neutral-600 max-w-xs">
            {prog.audience}
          </td>
          <td className="py-5 px-6 text-neutral-600">
            <div className="flex flex-wrap gap-1.5 max-w-xs">
              {prog.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </td>
          <td className="py-5 px-6 text-right">
            <Link
              href={`/programs/${prog.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
