import Image from "next/image";
import Link from "next/link";
import { DCGEvent } from "@/lib/types";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

interface EventCardProps {
  event: DCGEvent;
}

export function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const month = date.toLocaleString("en", { month: "short" }).toUpperCase();
  const day = date.getDate();

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-left">
      <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-950/85 text-white backdrop-blur-md capitalize">
            {event.category || "Workshop"}
          </span>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md shadow-xs ${
              event.status === "upcoming"
                ? "bg-brand-green/90 text-white"
                : "bg-neutral-800/80 text-neutral-300"
            }`}
          >
            {event.status === "upcoming" ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1.5 font-medium text-neutral-600">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {month} {day}, {date.getFullYear()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {event.time}
            </span>
          </div>

          <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-snug mb-2.5">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
            <MapPin size={13} className="shrink-0 text-neutral-400" />
            <span className="truncate">{event.location}</span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-3 mb-4">
            {event.description}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="text-neutral-500 font-medium">Free Access</span>
          <span className="font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            {event.status === "upcoming" ? "Register details" : "View event"}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
