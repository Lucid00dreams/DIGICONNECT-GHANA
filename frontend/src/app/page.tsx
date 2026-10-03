"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  Code,
  Briefcase,
  Lightbulb,
  Target,
  Eye,
  Heart,
  HeartHandshake,
  GraduationCap,
  Users,
  Building2,
  Gift,
  ChevronRight,
  Sparkles,
  Pause,
  Play,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { EventCard } from "@/components/ui/EventCard";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { ArticleReaderModal } from "@/components/ui/ArticleReaderModal";
import { DynamicImpactStats } from "@/components/sections/DynamicImpactStats";
import { useStore } from "@/context/StoreContext";
import { NewsPost } from "@/lib/store";
import {
  TESTIMONIALS,
  INVOLVEMENT_OPTIONS,
  VALUES,
} from "@/lib/data";

const HERO_SLIDES = [
  {
    image: "/images/hero/hero.jpg",
    value: "Empowerment",
    tagline: "Enabling young people to lead through technology",
    alt: "Young Ghanaians collaborating in an empowering digital workspace",
  },
  {
    image: "/images/about/about.jpg",
    value: "Innovation",
    tagline: "Embracing creative digital solutions & modern skills",
    alt: "Students engaging with modern digital devices and creative tools",
  },
  {
    image: "/images/gallery/gallery-2.jpg",
    value: "Collaboration",
    tagline: "Building together through partnerships & shared projects",
    alt: "Young developers and peers collaborating on coding software",
  },
  {
    image: "/images/gallery/gallery-5.jpg",
    value: "Inclusion",
    tagline: "Making technology accessible to every young Ghanaian",
    alt: "Inclusive community learning session with diverse young participants",
  },
  {
    image: "/images/programs/community-innovation.jpg",
    value: "Impact",
    tagline: "Transforming communities with sustainable digital skills",
    alt: "Impactful technology training and community presentation",
  },
];

export default function HomePage() {
  const { store } = useStore();
  const [selectedArticle, setSelectedArticle] = useState<NewsPost | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle hero background images every 8 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const programs = store.programs || [];
  const events = store.events || [];
  const news = store.news || [];
  const galleryImages = (store.gallery || []).map((img) => ({
    src: img.src,
    alt: img.caption || img.alt || "DigiConnect Ghana community activity",
  }));

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO SECTION — Full Viewport Background Cycling Every 8 Seconds
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] w-full flex items-center overflow-hidden bg-neutral-950 pt-20 pb-16 lg:py-28">
        {/* Full Viewport Photography Background Slides with 8-second crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.value}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 z-0 scale-100"
                : "opacity-0 pointer-events-none -z-10 scale-105"
            } transition-transform duration-[8000ms]`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Cinematic Directional Scrim Overlay (Matches Reference Image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/75 to-neutral-950/90 lg:from-neutral-950/40 lg:via-neutral-950/70 lg:to-neutral-950/95 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-transparent to-neutral-950/50 z-[1]" />

        {/* Carousel Indicator Dots on Right (Synchronized with 8s interval + WCAG Pause control) */}
        <div className="hidden lg:flex flex-col items-center gap-2.5 absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-xs p-2 rounded-full border border-white/10">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.value}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-3 h-3 bg-amber-500 ring-4 ring-amber-500/30 scale-110"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
              title={`Core value: ${slide.value}`}
              aria-label={`Go to slide ${idx + 1}: ${slide.value}`}
            />
          ))}

          {/* WCAG 2.2 Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="mt-1 p-1 rounded-full text-white/50 hover:text-white transition-colors"
            title={isPaused ? "Play slideshow" : "Pause slideshow"}
            aria-label={isPaused ? "Play hero slideshow" : "Pause hero slideshow"}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>

        {/* Hero Content Container — Positioned to the right just like the reference image */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full flex justify-end">
          <div className="max-w-2xl lg:max-w-xl text-left text-white py-10">
            {/* Eyebrow badge matching reference + active core value tag */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <HeartHandshake className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-amber-400 italic tracking-wide">
                  Nonprofit digital skills foundation
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-neutral-200">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-neutral-300">Core value:</span>
                <strong className="text-white font-semibold">{HERO_SLIDES[currentSlide].value}</strong>
              </div>
            </div>

            {/* Massive headline matching 'Raise Your Helping Hand' in reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-white leading-[1.08] tracking-tight mb-6">
              Empowering Young People Through Digital Skills
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed mb-8 max-w-lg font-normal">
              We equip young people with the digital skills, knowledge and
              opportunities they need to learn, create, work and transform
              their communities across Ghana.
            </p>

            {/* Actions matching reference (Golden button + Heart text link) */}
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-7 py-3.5 text-sm sm:text-base font-bold text-neutral-950 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Programs
                <ChevronRight size={18} />
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white hover:text-amber-400 transition-colors"
              >
                <Heart size={18} className="text-brand-red fill-brand-red/30" />
                Become a Volunteer
              </Link>
            </div>

            {/* Mobile Carousel Indicators with WCAG pause control */}
            <div className="flex lg:hidden items-center gap-2.5 mt-8">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.value}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-6 bg-amber-500" : "w-2 bg-white/40"
                  }`}
                  aria-label={`Go to ${slide.value} slide`}
                />
              ))}
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="p-1 rounded-full text-white/60 hover:text-white transition-colors ml-1"
                aria-label={isPaused ? "Play hero slideshow" : "Pause hero slideshow"}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED FOCUS CARDS — Matching the 3 Dark Cards in Reference
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 bg-neutral-950 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Digital Literacy (Topographic Contour Waves Pattern) */}
            <div className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 p-5 flex items-center justify-between gap-4 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all">
              {/* Pattern Background Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:14px_14px]" />
                <svg
                  className="absolute -bottom-8 -left-8 w-60 h-60 text-white/[0.16] group-hover:text-amber-400/[0.28] group-hover:scale-105 transition-all duration-700"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M-20 50 C 35 25, 75 90, 135 55 C 195 20, 225 80, 260 50" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-20 80 C 35 55, 80 120, 140 85 C 200 50, 230 110, 260 80" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-20 110 C 40 85, 85 150, 145 115 C 205 80, 235 140, 260 110" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-20 140 C 45 115, 90 180, 150 145 C 210 110, 240 170, 260 140" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-20 170 C 50 145, 95 210, 155 175 C 215 140, 245 200, 260 170" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-20 200 C 55 175, 100 240, 160 205 C 220 170, 250 230, 260 200" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-700" />
              </div>

              <div className="relative z-10 flex-1 space-y-3">
                <span className="text-xs font-semibold text-amber-400 italic">
                  Digital Literacy
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                  Essential digital foundation for modern livelihoods
                </h3>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Explore more <ChevronRight size={14} />
                </Link>
              </div>
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-neutral-800 group-hover:border-neutral-700 transition-colors shadow-inner">
                <Image
                  src="/images/gallery/gallery-1.jpg"
                  alt="Digital Literacy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 2: Code Academy (Circuit Board & Microchip Tech Pattern) */}
            <div className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 p-5 flex items-center justify-between gap-4 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all">
              {/* Pattern Background Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:14px_14px]" />
                <svg
                  className="absolute -bottom-8 -left-8 w-60 h-60 text-white/[0.16] group-hover:text-amber-400/[0.28] group-hover:scale-105 transition-all duration-700"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M-10 190 H 70 L 110 150 H 180" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M20 250 V 170 L 60 130 H 140 L 170 100 H 220" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M-10 130 H 40 L 85 85 V 30" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M90 220 L 130 180 V 120 L 155 95" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M140 230 L 165 205 H 220" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <path d="M50 70 L 80 40 H 150" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  <circle cx="70" cy="190" r="3" fill="currentColor" />
                  <circle cx="180" cy="150" r="3.5" fill="currentColor" />
                  <circle cx="60" cy="130" r="3" fill="currentColor" />
                  <circle cx="140" cy="130" r="3" fill="currentColor" />
                  <circle cx="220" cy="100" r="3.5" fill="currentColor" />
                  <circle cx="85" cy="30" r="3" fill="currentColor" />
                  <circle cx="155" cy="95" r="3" fill="currentColor" />
                  <circle cx="220" cy="205" r="3.5" fill="currentColor" />
                  <circle cx="150" cy="40" r="3" fill="currentColor" />
                </svg>
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all duration-700" />
              </div>

              <div className="relative z-10 flex-1 space-y-3">
                <span className="text-xs font-semibold text-amber-400 italic">
                  Code Academy
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                  Web development & practical software skills
                </h3>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Explore more <ChevronRight size={14} />
                </Link>
              </div>
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-neutral-800 group-hover:border-neutral-700 transition-colors shadow-inner">
                <Image
                  src="/images/gallery/gallery-2.jpg"
                  alt="Code Academy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 3: Youth Careers (Orbital Rings & Network Constellation Pattern) */}
            <div className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 p-5 flex items-center justify-between gap-4 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all">
              {/* Pattern Background Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:14px_14px]" />
                <svg
                  className="absolute -bottom-8 -left-8 w-60 h-60 text-white/[0.16] group-hover:text-amber-400/[0.28] group-hover:scale-105 transition-all duration-700"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="190" r="40" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                  <circle cx="50" cy="190" r="70" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="50" cy="190" r="100" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 4" />
                  <circle cx="50" cy="190" r="130" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="50" cy="190" r="160" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
                  <line x1="50" y1="190" x2="190" y2="50" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
                  <line x1="50" y1="190" x2="210" y2="120" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
                  <line x1="50" y1="190" x2="130" y2="30" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
                  <circle cx="100" cy="140" r="3.5" fill="currentColor" />
                  <circle cx="150" cy="90" r="4" fill="currentColor" />
                  <circle cx="150" cy="145" r="3.5" fill="currentColor" />
                  <circle cx="100" cy="90" r="3.5" fill="currentColor" />
                  <circle cx="185" cy="135" r="3" fill="currentColor" />
                </svg>
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-brand-red/10 rounded-full blur-2xl group-hover:bg-brand-red/20 transition-all duration-700" />
              </div>

              <div className="relative z-10 flex-1 space-y-3">
                <span className="text-xs font-semibold text-amber-400 italic">
                  Youth Careers
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                  Connecting trained talent with remote opportunities
                </h3>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Explore more <ChevronRight size={14} />
                </Link>
              </div>
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-neutral-800 group-hover:border-neutral-700 transition-colors shadow-inner">
                <Image
                  src="/images/gallery/gallery-6.jpg"
                  alt="Youth Careers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT / IMPACT INTRO (Matching Reference Grid Layout)
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Multi-photo collage like reference */}
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
                  <Image
                    src="/images/about/about.jpg"
                    alt="Young person working on laptop"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-neutral-100 mt-8">
                  <Image
                    src="/images/gallery/gallery-5.jpg"
                    alt="DigiConnect workshop collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div>
                <div className="inline-flex items-center gap-2 mb-2 text-amber-500 text-xs font-semibold italic">
                  <Sparkles className="w-4 h-4" /> About DigiConnect Ghana
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-5 leading-tight">
                  Building a Digitally Empowered Generation
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-600 mb-4">
                  Across Ghana, many young people lack access to practical
                  digital skills and the technology opportunities that come with
                  them. In an increasingly digital world, this gap limits their
                  ability to learn, work, and contribute to their communities.
                </p>
                <p className="text-[15px] leading-relaxed text-neutral-600 mb-6">
                  DigiConnect Ghana bridges this gap by providing hands-on
                  digital literacy training, coding education, career
                  development support, and community innovation programs.
                </p>

                {/* Bullet items with tick icons like reference */}
                <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-bold text-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>Digital Literacy For All</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>Coding & Tech Careers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>Community Innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">✓</span>
                    <span>Inclusive Mentorship</span>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-red/90 transition-all shadow-md"
                >
                  Learn More Us <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          IMPACT STATS COUNTER STRIP
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8">
          <DynamicImpactStats />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROGRAMS CATALOG
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[13px] font-bold text-brand-blue mb-2 block">
                Our Programs
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
                What We Do
              </h2>
              <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto">
                Practical, hands-on programs designed to help young people
                develop the skills they need to succeed in a digital world.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 3).map((program, i) => (
              <ScrollReveal key={program.slug} delay={i * 100}>
                <ProgramCard program={program} />
              </ScrollReveal>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {programs.slice(3).map((program, i) => (
              <ScrollReveal key={program.slug} delay={i * 100}>
                <ProgramCard program={program} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              View All Programs
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LATEST NEWS & BLOG POSTS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold text-brand-blue mb-2 block">
                  Latest Updates
                </span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark">
                  News & Community Stories
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors self-start sm:self-auto"
              >
                View all stories
                <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(0, 3).map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 100}>
                  <BlogPostCard post={post} onSelect={(p) => setSelectedArticle(p)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-400">Stories and articles will appear here as they are published.</p>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-blue"
            >
              View all stories
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COMMUNITY GALLERY
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[13px] font-bold text-brand-red mb-2 block">
                Our Community
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
                Life at DigiConnect
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ImageGallery images={galleryImages} />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          UPCOMING EVENTS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[13px] font-bold text-brand-yellow mb-2 block">
                  Upcoming Events
                </span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark">
                  Join Us
                </h2>
              </div>
              <Link
                href="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                All Events
                <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 100}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-blue to-brand-blue-dark">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-5">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-base text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
              Join thousands of young people across Ghana who are building the
              skills, connections, and confidence to thrive in a digital world.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-bold text-brand-blue shadow-md hover:shadow-lg transition-all"
              >
                Join DigiConnect
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Article Reader Modal */}
      <ArticleReaderModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
}
