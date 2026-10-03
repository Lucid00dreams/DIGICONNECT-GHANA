import Image from "next/image";
import { Testimonial } from "@/lib/types";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-neutral-200 p-6 lg:p-7 card-hover h-full flex flex-col">
      <Quote size={28} className="text-brand-blue/20 mb-4 shrink-0" />
      <blockquote className="text-[14.5px] leading-relaxed text-neutral-700 mb-6 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-brand-dark">
            {testimonial.name}
          </p>
          <p className="text-[12px] text-neutral-500">
            {testimonial.program} · {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}
