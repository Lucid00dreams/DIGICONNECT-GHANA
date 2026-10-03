"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { addApplication } from "@/lib/store";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, Send, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

function JoinFormContent() {
  const { store } = useStore();
  const { showToast } = useToast();
  const programs = store.programs || [];
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get("program") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    location: "Accra",
    programOfInterest: initialProgram || "digital-literacy",
    educationLevel: "high-school",
    digitalExperience: "beginner",
    motivation: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, programOfInterest: initialProgram }));
    }
  }, [initialProgram]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      showToast("Please agree to the privacy policy to submit your application", "info");
      return;
    }
    setLoading(true);
    // Persist to central store
    addApplication({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      location: formData.location,
      programOfInterest: formData.programOfInterest,
      educationLevel: formData.educationLevel,
      digitalExperience: formData.digitalExperience,
      motivation: formData.motivation,
    });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("Application submitted successfully for cohort review", "success");
    }, 500);
  };

  const selectedProgramObj = programs.find(
    (p) => p.slug === formData.programOfInterest
  );

  return (
    <div className="max-w-3xl mx-auto">
      {submitted ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-14 shadow-lg text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 block mb-2">
            Submission successful
          </span>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-4">
            Application received
          </h2>
          <p className="text-neutral-600 leading-relaxed max-w-lg mx-auto mb-8 text-sm md:text-base">
            Thank you, <strong>{formData.fullName}</strong>! We have received your application for the{" "}
            <strong>{selectedProgramObj?.title || "DigiConnect"}</strong> cohort.
          </p>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-left max-w-md mx-auto mb-8 space-y-3">
            <h4 className="text-xs font-semibold text-neutral-600">
              What happens next
            </h4>
            <div className="space-y-2 text-xs text-neutral-700">
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold flex items-center justify-center shrink-0">1</span>
                <span>Our admissions team reviews your application against current cohort spaces.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold flex items-center justify-center shrink-0">2</span>
                <span>You will receive an email and SMS invitation for a short orientation session.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold flex items-center justify-center shrink-0">3</span>
                <span>Cohort onboarding materials and schedule will be provided before week 1.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-full font-semibold bg-brand-blue text-white text-xs hover:bg-brand-blue-dark transition-colors shadow-2xs"
            >
              Return to homepage
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  age: "",
                  location: "Accra",
                  programOfInterest: "digital-literacy",
                  educationLevel: "high-school",
                  digitalExperience: "beginner",
                  motivation: "",
                  consent: false,
                });
              }}
              className="px-6 py-3 rounded-full font-semibold border border-neutral-300 text-neutral-700 text-xs hover:bg-neutral-50"
            >
              Submit another application
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12 shadow-xs">
          <div className="mb-8 pb-6 border-b border-neutral-150">
            <span className="text-xs font-semibold text-brand-blue block mb-1">
              Admissions intake
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
              Cohort application
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 mt-1">
              Please provide accurate information. Admission is merit and motivation based.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kofi Mensah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="kofi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>
            </div>

            {/* Phone & Age */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Phone number (WhatsApp preferred) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Age (years) *
                </label>
                <input
                  type="number"
                  required
                  min={14}
                  max={35}
                  placeholder="e.g. 21"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>
            </div>

            {/* Location & Program */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Location or city *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Accra, Kumasi, Tamale"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Program of interest *
                </label>
                <select
                  required
                  value={formData.programOfInterest}
                  onChange={(e) => setFormData({ ...formData, programOfInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                >
                  {programs.map((prog) => (
                    <option key={prog.slug} value={prog.slug}>
                      {prog.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Education level & Digital Experience */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Highest education level *
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                >
                  <option value="junior-high">Junior High School (JHS)</option>
                  <option value="high-school">Senior High School (SHS / WASSCE)</option>
                  <option value="vocational">Vocational / Technical Institute</option>
                  <option value="undergraduate">University / Tertiary</option>
                  <option value="graduate">Postgraduate</option>
                  <option value="other">Other / Self-taught</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Current digital experience *
                </label>
                <select
                  value={formData.digitalExperience}
                  onChange={(e) => setFormData({ ...formData, digitalExperience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                >
                  <option value="beginner">Complete beginner (rarely use computers)</option>
                  <option value="basic">Basic (can browse web & use smartphone)</option>
                  <option value="intermediate">Intermediate (use productivity tools regularly)</option>
                  <option value="some-coding">Some coding experience (HTML/CSS/Python)</option>
                </select>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Why do you want to join this program? *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share your background, what you hope to achieve, and how digital skills will help your aspirations..."
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Consent checkbox */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                />
                <span className="text-xs text-neutral-600 leading-relaxed">
                  I confirm that the details provided are accurate. I consent to DigiConnect Ghana storing my details for cohort review and contacting me regarding program schedules in accordance with the{" "}
                  <Link href="/privacy" className="text-brand-blue underline">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors shadow-2xs flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting application...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit cohort application</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function JoinPage() {
  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Ascending Growth & Pathway Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-10 200 C 60 190, 110 140, 150 90 C 190 40, 220 20, 250 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 220 C 80 205, 125 160, 165 110 C 205 60, 230 40, 260 30" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
            <path d="M-30 180 C 40 170, 95 120, 135 70 C 175 20, 210 0, 240 -10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="150" cy="90" r="4.5" fill="currentColor" />
            <circle cx="165" cy="110" r="3.5" fill="currentColor" />
            <circle cx="135" cy="70" r="4" fill="currentColor" />
            <circle cx="95" cy="148" r="3" fill="currentColor" />
            <circle cx="195" cy="45" r="3" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Join DigiConnect
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Begin Your Digital Journey
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Step into technology education, mentorship, and career opportunities. Apply for our upcoming cohorts across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 lg:py-24 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Suspense fallback={<div className="text-center py-20 text-neutral-500">Loading form...</div>}>
            <JoinFormContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
