"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Code2,
  Sparkles,
} from "lucide-react";
import { Mentor, bookMentorshipSession, MentorshipSession } from "@/lib/lmsStore";

interface MentorBookingModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onBooked?: (session: MentorshipSession) => void;
}

export function MentorBookingModal({
  mentor,
  isOpen,
  onClose,
  onBooked,
}: MentorBookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [trackTopic, setTrackTopic] = useState<"coding" | "cybersecurity">("coding");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmedSession, setConfirmedSession] = useState<MentorshipSession | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    if (!studentName || !studentEmail) {
      alert("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newSession = bookMentorshipSession({
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorTitle: mentor.title,
        mentorAvatar: mentor.avatar,
        studentName,
        studentEmail,
        studentPhone: studentPhone || undefined,
        trackTopic,
        date: selectedDate,
        timeSlot: selectedSlot,
        notes: notes || undefined,
      });

      setConfirmedSession(newSession);
      if (onBooked) {
        onBooked(newSession);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const resetAndClose = () => {
    setConfirmedSession(null);
    setSelectedSlot("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedSession ? (
          /* Booking Confirmation State */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400">
                Session Confirmed
              </span>
              <h2 className="text-2xl font-bold mt-1 text-white">
                You&apos;re Booked with {mentor.name}!
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                A 1-on-1 hands-on coaching session has been reserved. You can test your meeting room below or join at the scheduled time.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-left space-y-3">
              <div className="flex items-center justify-between text-sm border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Date & Time</span>
                <span className="font-semibold text-white">
                  {confirmedSession.date} at {confirmedSession.timeSlot}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Focus Track</span>
                <span className="font-medium text-blue-400 capitalize">
                  {confirmedSession.trackTopic === "coding" ? "Web & Basic Coding" : "Cybersecurity Defense"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Student</span>
                <span className="font-medium text-slate-200">
                  {confirmedSession.studentName} ({confirmedSession.studentEmail})
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Encrypted Video Room</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={confirmedSession.meetingLink}
                    className="w-full text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 select-all"
                  />
                  <button
                    onClick={() => handleCopyLink(confirmedSession.meetingLink)}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition shrink-0"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={confirmedSession.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white shadow-lg shadow-blue-600/30 transition text-sm"
              >
                <Video className="w-4 h-4" />
                Open Video Room
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetAndClose}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            {/* Mentor Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
                  <Sparkles className="w-3 h-3" />
                  1-on-1 Mentorship
                </div>
                <h3 className="text-xl font-bold text-white truncate">{mentor.name}</h3>
                <p className="text-xs text-slate-400">{mentor.title}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="text-amber-400 font-semibold">★ {mentor.rating}</span>
                  <span>•</span>
                  <span>{mentor.totalSessions} sessions completed</span>
                </div>
              </div>
            </div>

            {/* Booking Form Content */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Select Focus Track */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  1. Select Track Topic
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTrackTopic("coding")}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition ${
                      trackTopic === "coding"
                        ? "bg-blue-600/20 border-blue-500 text-blue-200 ring-1 ring-blue-500/30"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Basic Coding</div>
                      <div className="text-[10px] text-slate-400">HTML, CSS, JS Help</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrackTopic("cybersecurity")}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition ${
                      trackTopic === "cybersecurity"
                        ? "bg-emerald-600/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Cyber Defense</div>
                      <div className="text-[10px] text-slate-400">Phishing & Security</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    2. Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    3. Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {mentor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition ${
                          selectedSlot === slot
                            ? "bg-blue-600 text-white border-blue-500 ring-2 ring-blue-500/30 font-semibold"
                            : "bg-slate-800/70 border-slate-700 text-slate-300 hover:border-slate-500"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learner Info */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  4. Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="WhatsApp or Phone (Optional for reminders)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <textarea
                    rows={2}
                    placeholder="What questions or roadblock do you want to cover with your mentor?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Video className="w-4 h-4" />
                  {isSubmitting ? "Confirming..." : "Confirm 1-on-1 Session"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
