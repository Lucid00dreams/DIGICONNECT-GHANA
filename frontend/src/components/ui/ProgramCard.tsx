import Image from "next/image";
import Link from "next/link";
import { Program } from "@/lib/types";
import {
  Monitor,
  Code,
  Briefcase,
  Rocket,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Code,
  Briefcase,
  Rocket,
  Lightbulb,
};

const accentBg: Record<string, string> = {
  blue: "bg-brand-blue-light",
  red: "bg-brand-red-light",
  yellow: "bg-brand-yellow-light",
  green: "bg-brand-green-light",
  dark: "bg-neutral-100",
};

const accentText: Record<string, string> = {
  blue: "text-brand-blue",
  red: "text-brand-red",
  yellow: "text-brand-yellow",
  green: "text-brand-green",
  dark: "text-brand-dark",
};

const accentBorder: Record<string, string> = {
  blue: "group-hover:border-brand-blue/30",
  red: "group-hover:border-brand-red/30",
  yellow: "group-hover:border-brand-yellow/30",
  green: "group-hover:border-brand-green/30",
  dark: "group-hover:border-neutral-300",
};

interface ProgramCardProps {
  program: Program;
  showImage?: boolean;
}

export function ProgramCard({ program, showImage = true }: ProgramCardProps) {
  const Icon = iconMap[program.icon] || Monitor;

  return (
    <Link href={`/programs/${program.slug}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left">
        {showImage && (
          <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-950/85 text-white backdrop-blur-md">
                Program {program.number}
              </span>
            </div>
            {program.duration && (
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-neutral-800 backdrop-blur-md shadow-xs">
                  {program.duration}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${accentBg[program.accent]}`}
              >
                <Icon size={20} className={accentText[program.accent]} />
              </div>
              <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-snug">
                {program.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4">
              {program.description}
            </p>

            {program.skills && program.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {program.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-600 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium truncate max-w-[170px]">
              {program.audience?.split(" ")[0] || "Youth"} Pathway
            </span>
            <span className="font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore pathway
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
