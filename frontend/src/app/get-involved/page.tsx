"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Building2,
  Gift,
  GraduationCap,
  CheckCircle2,
  Send,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { addInvolvement } from "@/lib/store";
import { useToast } from "@/context/ToastContext";

export default function GetInvolvedPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"volunteer" | "partner">("volunteer");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addInvolvement({
        type: activeTab,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        category: formData.category,
        message: formData.message,
      });
      setSubmitted(true);
      showToast(
        activeTab === "volunteer"
          ? "Thank you for volunteering! Our coordinator will contact you shortly."
          : "Thank you for reaching out! Our partnerships team will review and connect with you.",
        "success"
      );
    } catch {
      showToast("There was an issue submitting your inquiry. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HEADER — Matching News & About Page Aesthetic
      ═══════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Community Mesh & Radiant Orbitals */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="120" cy="120" r="45" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="120" cy="120" r="75" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 5" />
            <circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M40 120 C 80 80, 160 80, 200 120 C 160 160, 80 160, 40 120 Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            <path
              d="M120 40 C 80 80, 80 160, 120 200 C 160 160, 160 80, 120 40 Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            <circle cx="120" cy="40" r="3.5" fill="currentColor" />
            <circle cx="200" cy="120" r="3.5" fill="currentColor" />
            <circle cx="120" cy="200" r="3.5" fill="currentColor" />
            <circle cx="40" cy="120" r="3.5" fill="currentColor" />
            <circle cx="152" cy="88" r="3" fill="currentColor" />
            <circle cx="88" cy="152" r="3" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Community action & partnerships
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Be Part of the Digital Future
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Empowering young people with digital opportunities takes a community. Whether you want to volunteer your expertise, partner with our organization, or support our learning centers, there is a place for you.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PATHWAYS CARDS
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pathway 1: Join a Program */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">Join a Program</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Are you a young Ghanaian eager to learn computers, web development, or career skills? Enroll in our cohorts today.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blue-dark"
              >
                Apply to cohort <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            {/* Pathway 2: Volunteer */}
            <div
              onClick={() => {
                setActiveTab("volunteer");
                setSubmitted(false);
                document.getElementById("forms-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                activeTab === "volunteer"
                  ? "border-brand-red bg-brand-red/5 shadow-sm ring-1 ring-brand-red"
                  : "border-neutral-200 bg-neutral-50/50 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">Volunteer</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Share your industry knowledge as a technical mentor, workshop speaker, or soft skills trainer.
              </p>
              <span className="inline-flex items-center text-xs font-bold text-brand-red">
                Volunteer with us <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

            {/* Pathway 3: Partner With Us */}
            <div
              onClick={() => {
                setActiveTab("partner");
                setSubmitted(false);
                document.getElementById("forms-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                activeTab === "partner"
                  ? "border-brand-green bg-brand-green/5 shadow-sm ring-1 ring-brand-green"
                  : "border-neutral-200 bg-neutral-50/50 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">Partner With Us</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Collaborate as a school, tech enterprise, foundation, or local government agency to sponsor cohorts.
              </p>
              <span className="inline-flex items-center text-xs font-bold text-brand-green">
                Explore partnership <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

            {/* Pathway 4: Dedicated Resource Donation Portal */}
            <Link
              href="/donate"
              className="p-6 rounded-2xl border border-rose-200 bg-rose-50/60 hover:bg-rose-50 hover:border-rose-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">Resource Donation</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Donate hardware (laptops, monitors), internet connectivity packages, or sponsor student cohort seats on our dedicated donation portal.
              </p>
              <span className="inline-flex items-center text-xs font-bold text-rose-700 group-hover:text-rose-800">
                Go to donation portal <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INTERACTIVE INQUIRY FORM (VOLUNTEER & PARTNER)
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-neutral-50 border-t border-neutral-200/60" id="forms-section">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          {/* Highlight banner linking to dedicated /donate page */}
          <div className="mb-10 p-5 rounded-2xl border border-rose-200 bg-rose-50/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-dark">Looking to donate laptops, hardware, or student funding?</p>
                <p className="text-xs text-neutral-600">Explore drop-off locations, free courier pickup, and certified data wiping on our dedicated donation page.</p>
              </div>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors shrink-0 shadow-2xs"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Resource donation</span>
            </Link>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-neutral-200/80">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("volunteer");
                  setSubmitted(false);
                }}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  activeTab === "volunteer"
                    ? "bg-white text-brand-dark shadow-xs"
                    : "text-neutral-600 hover:text-brand-dark"
                }`}
              >
                Volunteer sign-up
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("partner");
                  setSubmitted(false);
                }}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  activeTab === "partner"
                    ? "bg-white text-brand-dark shadow-xs"
                    : "text-neutral-600 hover:text-brand-dark"
                }`}
              >
                Partnership inquiry
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 lg:p-12 shadow-xs">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">
                  Thank You for Your Submission!
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto mb-6 text-sm">
                  We have received your details. A member of the DigiConnect Ghana engagement team will reach out to you within 2-3 business days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      organization: "",
                      category: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl font-semibold bg-brand-blue text-white text-sm hover:bg-brand-blue-dark transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-1">
                    {activeTab === "volunteer" && "Join as a Mentor or Volunteer"}
                    {activeTab === "partner" && "Partner with DigiConnect Ghana"}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {activeTab === "volunteer" &&
                      "Tell us about your background and how you'd like to support our learners."}
                    {activeTab === "partner" &&
                      "Collaborate with our organization on youth education and community transformation."}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. kwame@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+233 XX XXX XXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      {activeTab === "partner" ? "Organization / Company *" : "Organization / Field of expertise"}
                    </label>
                    <input
                      type="text"
                      required={activeTab === "partner"}
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder={activeTab === "partner" ? "Company / School / NGO" : "e.g. Software Engineer, Teacher"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                {activeTab === "volunteer" && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Area of contribution *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:border-brand-blue transition-colors"
                    >
                      <option value="">Select your area of contribution...</option>
                      <option value="coding">Technical Mentorship (Coding & Web Development)</option>
                      <option value="literacy">Digital Literacy Instruction</option>
                      <option value="career">Career Coaching & CV Review</option>
                      <option value="event">Event Organization & Logistics</option>
                      <option value="other">Other Skills & Support</option>
                    </select>
                  </div>
                )}

                {activeTab === "partner" && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Partnership type *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:border-brand-blue transition-colors"
                    >
                      <option value="">Select partnership type...</option>
                      <option value="corporate">Corporate Sponsorship & CSR</option>
                      <option value="education">School / University Collaboration</option>
                      <option value="community">Community Hub / Venue Partner</option>
                      <option value="hiring">Talent / Internship Placement Partner</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Message or collaboration vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your ideas, availability, or how we can collaborate..."
                    className="w-full p-3.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Submitting inquiry..."
                      : activeTab === "volunteer"
                      ? "Submit volunteer application"
                      : "Submit partnership inquiry"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
