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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-neutral-200 rounded-3xl shadow-xl text-neutral-900 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-xl hover:bg-neutral-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedSession ? (
          /* Booking Confirmation State */
          <div className="text-center py-4 space-y-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-700">
                Session Confirmed
              </span>
              <h2 className="text-2xl font-bold mt-1 text-neutral-900">
                You&apos;re Booked with {mentor.name}!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                Your 1-on-1 mentorship session is scheduled. You can join your meeting room directly at the appointed time below.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-left space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-neutral-200/80 pb-2">
                <span className="text-neutral-500">Date & Time</span>
                <span className="font-semibold text-neutral-900">
                  {confirmedSession.date} at {confirmedSession.timeSlot}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-neutral-200/80 pb-2">
                <span className="text-neutral-500">Focus Topic</span>
                <span className="font-medium text-brand-blue capitalize">
                  {confirmedSession.trackTopic === "coding" ? "Web & Basic Coding" : "Cybersecurity Defense"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-neutral-200/80 pb-2">
                <span className="text-neutral-500">Student</span>
                <span className="font-medium text-neutral-800">
                  {confirmedSession.studentName} ({confirmedSession.studentEmail})
                </span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 block mb-1">Encrypted Video Room</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={confirmedSession.meetingLink}
                    className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 select-all"
                  />
                  <button
                    onClick={() => handleCopyLink(confirmedSession.meetingLink)}
                    className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-neutral-700 transition shrink-0"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={confirmedSession.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark font-semibold text-white shadow-2xs transition text-xs"
              >
                <Video className="w-4 h-4" />
                <span>Open Video Room</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetAndClose}
                className="px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            {/* Mentor Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-neutral-100">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-neutral-200 shadow-2xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[11px] font-semibold text-brand-blue mb-0.5">
                  1-on-1 Technical Mentorship
                </span>
                <h3 className="text-lg font-bold text-neutral-900 truncate">{mentor.name}</h3>
                <p className="text-xs text-neutral-500">{mentor.title}</p>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1.5">
                  <span className="font-semibold text-neutral-800">Rating: {mentor.rating} / 5.0</span>
                  <span>•</span>
                  <span>{mentor.totalSessions} sessions completed</span>
                </div>
              </div>
            </div>

            {/* Booking Form Content */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Select Focus Track */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  1. Focus Track
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTrackTopic("coding")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-medium transition ${
                      trackTopic === "coding"
                        ? "bg-brand-blue-light/60 border-brand-blue text-brand-blue-dark font-semibold shadow-2xs"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Basic Coding</div>
                      <div className="text-[10px] text-neutral-500">HTML, CSS, JS guidance</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrackTopic("cybersecurity")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-medium transition ${
                      trackTopic === "cybersecurity"
                        ? "bg-brand-blue-light/60 border-brand-blue text-brand-blue-dark font-semibold shadow-2xs"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-brand-blue shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900">Cyber Defense</div>
                      <div className="text-[10px] text-neutral-500">Threats & best practices</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-neutral-400" />
                    2. Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-neutral-400" />
                    3. Time Slot
                  </label>
                  <div className="space-y-1.5">
                    {mentor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-medium border text-left transition ${
                          selectedSlot === slot
                            ? "bg-brand-blue text-white border-brand-blue font-semibold shadow-2xs"
                            : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
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
                <label className="block text-xs font-semibold text-neutral-700">
                  4. Your Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="tel"
                    placeholder="WhatsApp or Phone (Optional for reminders)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                  <textarea
                    rows={2}
                    placeholder="What specific question or code roadblock would you like to cover?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-blue resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark font-semibold text-xs text-white shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Video className="w-4 h-4" />
                  <span>{isSubmitting ? "Scheduling..." : "Schedule Mentorship Session"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
