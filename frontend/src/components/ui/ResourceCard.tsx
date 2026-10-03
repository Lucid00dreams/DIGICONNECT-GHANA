import Image from "next/image";
import Link from "next/link";
import { Resource } from "@/lib/types";
import { FileText, Video, BookOpen, GraduationCap, File, ArrowRight } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  article: FileText,
  guide: BookOpen,
  video: Video,
  tutorial: GraduationCap,
  pdf: File,
};

const typeBadgeColors: Record<string, string> = {
  article: "bg-brand-blue-light text-brand-blue",
  guide: "bg-brand-green-light text-brand-green",
  video: "bg-brand-red-light text-brand-red",
  tutorial: "bg-brand-yellow-light text-brand-yellow",
  pdf: "bg-neutral-100 text-neutral-600",
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type] || FileText;

  return (
    <Link href={`/resources/${resource.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-neutral-200 overflow-hidden card-hover h-full flex flex-col">
        <div className="img-hover aspect-[16/9] relative">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 lg:p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold ${typeBadgeColors[resource.type]}`}
            >
              <Icon size={12} />
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </span>
            <span className="text-[11px] text-neutral-400">{resource.category}</span>
          </div>
          <h3 className="text-base font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors flex-1">
            {resource.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-neutral-600 mb-4">
            {resource.description}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            {resource.readTime && (
              <span className="text-[12px] text-neutral-400">{resource.readTime}</span>
            )}
            <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-blue group-hover:gap-2 transition-all ml-auto">
              Read
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
