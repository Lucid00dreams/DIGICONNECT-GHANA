"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { EventCard } from "@/components/ui/EventCard";
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  X,
  Send,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { DCGEvent } from "@/lib/types";

export default function EventsPage() {
  const { store } = useStore();
  const allEvents = store.events || [];
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [registeringEvent, setRegisteringEvent] = useState<DCGEvent | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const filteredEvents = allEvents.filter((evt) => {
    const matchesStatus =
      statusFilter === "all" || evt.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || evt.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSuccess(true);
  };

  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Calendar Meridians & Event Orbitals */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="120" cy="120" r="50" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="120" cy="120" r="85" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 4" />
            <circle cx="120" cy="120" r="115" stroke="currentColor" strokeWidth="1.6" />
            <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="120" cy="70" r="4" fill="currentColor" />
            <circle cx="170" cy="120" r="4" fill="currentColor" />
            <circle cx="120" cy="170" r="4" fill="currentColor" />
            <circle cx="70" cy="120" r="4" fill="currentColor" />
            <circle cx="180" cy="60" r="3.5" fill="currentColor" />
            <circle cx="60" cy="180" r="3.5" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Community & Workshops
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Workshops, Bootcamps & Community Events
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Connect with fellow learners, gain practical skills during weekend bootcamps, and network with tech industry mentors across Ghana.
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
              {(["all", "upcoming", "past"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                    statusFilter === status
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {status === "all" ? "All Events" : `${status} Events`}
                </button>
              ))}

              <div className="h-4 w-px bg-neutral-300 mx-1 hidden sm:block" />

              {["all", "workshop", "bootcamp", "meetup"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                    categoryFilter === cat
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {cat === "all" ? "All Types" : `${cat}s`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events or locations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
              />
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    if (event.status === "upcoming") {
                      setRegisteringEvent(event);
                    }
                  }}
                  className="h-full cursor-pointer"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 max-w-lg mx-auto p-8 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-800 mb-2">No Events Found</h3>
              <p className="text-xs text-neutral-500 mb-6">
                We couldn&apos;t find any events matching your selected filters. Try changing your search keywords or resetting filters.
              </p>
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl font-bold bg-brand-blue text-white text-xs hover:bg-brand-blue-dark transition-colors"
              >
                Reset Filters
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
                Host an Event
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Want to partner for a workshop or bootcamp?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We collaborate with tech companies, universities, and community centers to deliver hands-on digital skills sessions across Ghana.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Partner with us
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Join upcoming cohort
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Registration Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl border border-neutral-200 my-8">
            <button
              onClick={() => {
                setRegisteringEvent(null);
                setRegistrationSuccess(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {registrationSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  Registration Confirmed!
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  You are registered for <strong>{registeringEvent.title}</strong>. An email with venue details and schedule has been sent.
                </p>
                <button
                  onClick={() => {
                    setRegisteringEvent(null);
                    setRegistrationSuccess(false);
                  }}
                  className="px-6 py-2.5 rounded-full font-bold bg-brand-blue text-white text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase text-brand-blue tracking-wider block mb-1">
                  RSVP Registration
                </span>
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  {registeringEvent.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-6">
                  {registeringEvent.date} • {registeringEvent.location}
                </p>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Boateng"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ama@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 XX XXX XXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-sm shadow-sm flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    Complete Registration
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
