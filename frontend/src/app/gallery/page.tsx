"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function GalleryPage() {
  const { store } = useStore();
  const galleryItems = store.gallery || [];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.category || "Community"))),
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return (item.category || "Community").toLowerCase() === selectedCategory.toLowerCase();
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Visual Aperture & Framing Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="120" cy="120" r="45" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="120" cy="120" r="75" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 4" />
            <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="1.6" />
            <path d="M75 45 L 165 45 L 195 120 L 165 195 L 75 195 L 45 120 Z" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 4" />
            <circle cx="120" cy="45" r="3.5" fill="currentColor" />
            <circle cx="195" cy="120" r="3.5" fill="currentColor" />
            <circle cx="120" cy="195" r="3.5" fill="currentColor" />
            <circle cx="45" cy="120" r="3.5" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Community Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Moments of Learning, Innovation & Impact
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Explore authentic moments from our classrooms, code labs, community hackathons, and youth graduation ceremonies across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-neutral-50 min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Controls: Search and Categories — Matching News Page Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-neutral-500 self-center">
              Showing {filteredItems.length} photos
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => openLightbox(index)}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-[4/3]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt || "DigiConnect Ghana"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue text-white self-start mb-2">
                      {item.category || "Community"}
                    </span>
                    <h3 className="text-white text-sm font-bold line-clamp-2">
                      {item.caption || item.alt}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 text-[11px] mt-2">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to expand view</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 max-w-md mx-auto p-8 shadow-xs">
              <Sparkles className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-brand-dark mb-1">No photos in this category</h3>
              <p className="text-xs text-neutral-500 mb-4">
                Try selecting &quot;All&quot; to see the complete gallery.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors"
              >
                Show All Photos
              </button>
            </div>
          )}

          {/* Bottom Callout Banner — Matching News Page Aesthetic */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-brand-dark text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px]" />
              <svg
                className="absolute -right-10 -bottom-10 w-72 h-72 text-white/[0.05] pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </div>
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-semibold text-brand-green mb-2 block">
                Be in Our Stories
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Join our next community cohort or event
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Experience collaborative learning in person at our training centers across Accra, Kumasi, and regional communities.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Explore events
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Join a program
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 text-white">
                {filteredItems[lightboxIndex].category || "Community"}
              </span>
              <span className="text-xs text-white/70">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image & Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-4xl max-h-[75vh]">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption */}
          <div className="text-center text-white max-w-2xl mx-auto z-10">
            <p className="text-sm md:text-base font-medium">
              {filteredItems[lightboxIndex].caption || filteredItems[lightboxIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
