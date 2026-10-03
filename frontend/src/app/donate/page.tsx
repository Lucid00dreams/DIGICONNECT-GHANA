"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Laptop,
  Wifi,
  Monitor,
  Gift,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Truck,
  ArrowRight,
  HelpCircle,
  Building2,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { addInvolvement } from "@/lib/store";
import { useToast } from "@/context/ToastContext";

interface DonationFormState {
  fullName: string;
  email: string;
  phone: string;
  donorType: string;
  resourceCategory: string;
  quantityDetails: string;
  deliveryMethod: string;
  notes: string;
}

export default function DonatePage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("laptops");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<DonationFormState>({
    fullName: "",
    email: "",
    phone: "",
    donorType: "Individual donor",
    resourceCategory: "Laptops and computers",
    quantityDetails: "",
    deliveryMethod: "Drop off at Accra Hub",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addInvolvement({
        type: "donate",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: `${formData.donorType} — Category: ${formData.resourceCategory}`,
        category: formData.resourceCategory,
        message: `[Resource Donation Pledge]\nQuantity / Spec: ${formData.quantityDetails}\nDelivery Method: ${formData.deliveryMethod}\nNotes: ${formData.notes || "None"}`,
      });

      setSubmitted(true);
      showToast(
        "Thank you! Your donation pledge has been recorded. Our team will contact you shortly.",
        "success"
      );
    } catch {
      showToast("There was an issue recording your pledge. Please try again or reach out directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectCategory = (categoryKey: string, categoryLabel: string) => {
    setSelectedCategory(categoryKey);
    setFormData((prev) => ({ ...prev, resourceCategory: categoryLabel }));
    const formElem = document.getElementById("pledge-form-section");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HEADER SECTION — Consistent with News, About & Programs
      ═══════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Digital Interconnect & Community Hub Pattern Vector */}
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

          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300 mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>Nonprofit resource donation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Empower Classrooms With Tech Resources
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed mb-6">
              Access to hardware and stable connectivity is the single largest hurdle for young Ghanaian learners. Donate laptops, lab workstations, internet packages, or sponsor student cohort seats to bridge the digital divide.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% of equipment goes directly to student labs
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                Certified data wiping & official tax receipt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: WAYS TO DONATE (CATEGORIES)
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold text-brand-blue mb-1 block">
              High-priority equipment needs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              Select what you would like to donate
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Click any category below to immediately pre-fill your pledge details in the form.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Laptops */}
            <div
              onClick={() => handleSelectCategory("laptops", "Laptops and computers")}
              className={`cursor-pointer p-6 rounded-2xl border transition-all text-left group ${
                selectedCategory === "laptops"
                  ? "border-rose-400 bg-rose-50/50 shadow-sm ring-2 ring-rose-400/30"
                  : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-1.5">Laptops & PCs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Working or gently used laptops (Intel Core i3/i5 or equivalent, 8GB RAM preferred, with power adapters).
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-rose-700">
                Pledge laptops <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

            {/* Lab Monitors & Gear */}
            <div
              onClick={() => handleSelectCategory("monitors", "Lab monitors and workstations")}
              className={`cursor-pointer p-6 rounded-2xl border transition-all text-left group ${
                selectedCategory === "monitors"
                  ? "border-brand-blue bg-brand-blue-light/50 shadow-sm ring-2 ring-brand-blue/30"
                  : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-1.5">Lab Displays & Gear</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                External monitors (21”–27”), keyboards, mice, power surge protectors, and lab projection screens.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-brand-blue">
                Pledge lab gear <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

            {/* Internet & Connectivity */}
            <div
              onClick={() => handleSelectCategory("connectivity", "Internet and connectivity bundles")}
              className={`cursor-pointer p-6 rounded-2xl border transition-all text-left group ${
                selectedCategory === "connectivity"
                  ? "border-emerald-400 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-400/30"
                  : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-1.5">Internet Bundles</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Sponsor monthly high-speed broadband or 4G data packages for community training labs and students.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-700">
                Pledge connectivity <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>

            {/* Student Cohort Sponsorship */}
            <div
              onClick={() => handleSelectCategory("sponsorship", "Financial or student cohort sponsorship")}
              className={`cursor-pointer p-6 rounded-2xl border transition-all text-left group ${
                selectedCategory === "sponsorship"
                  ? "border-amber-400 bg-amber-50/50 shadow-sm ring-2 ring-amber-400/30"
                  : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-1.5">Student Sponsorship</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Direct financial contributions to sponsor complete cohort tuition, certification exams, and learning stipends.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-amber-800">
                Sponsor student seats <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: PLEDGE FORM & DROP-OFF LOGISTICS
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-neutral-50" id="pledge-form-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-8 lg:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">
                    Thank You for Your Tech Donation Pledge!
                  </h3>
                  <p className="text-neutral-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                    We have received your donation details. A member of our community logistics team will call or email you within 24 hours to confirm drop-off or arrange pickup.
                  </p>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-left max-w-md mx-auto mb-6 space-y-1.5">
                    <p className="font-semibold text-neutral-800">Next steps:</p>
                    <p className="text-neutral-600">1. We will verify device details and provide delivery/pickup instructions.</p>
                    <p className="text-neutral-600">2. Hardware is wiped and refurbished by our technical staff.</p>
                    <p className="text-neutral-600">3. You receive an official non-profit donation receipt and lab allocation report.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        donorType: "Individual donor",
                        resourceCategory: "Laptops and computers",
                        quantityDetails: "",
                        deliveryMethod: "Drop off at Accra Hub",
                        notes: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl font-semibold bg-brand-blue text-white text-sm hover:bg-brand-blue-dark transition-colors"
                  >
                    Pledge another donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-1">
                      Resource Donation Pledge
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Fill out this quick form. Our staff handles device pickup, testing, and distribution to learners.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Your name or organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Kwame Mensah or TechCorp Ghana"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Donor category
                      </label>
                      <select
                        value={formData.donorType}
                        onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors bg-white"
                      >
                        <option value="Individual donor">Individual donor</option>
                        <option value="Corporate / Company">Corporate / Tech Enterprise</option>
                        <option value="Foundation / NGO">Foundation / NGO</option>
                        <option value="Alumni / Diaspora">Diaspora / Overseas Supporter</option>
                        <option value="Educational Institution">Educational Institution</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="kwame@example.com"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Phone or WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+233 24 000 0000"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Resource category
                      </label>
                      <select
                        value={formData.resourceCategory}
                        onChange={(e) => setFormData({ ...formData, resourceCategory: e.target.value })}
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors bg-white"
                      >
                        <option value="Laptops and computers">Laptops & computers</option>
                        <option value="Lab monitors and workstations">Lab monitors & workstations</option>
                        <option value="Networking and Wi-Fi routers">Networking & Wi-Fi routers</option>
                        <option value="Internet and connectivity bundles">Internet & connectivity bundles</option>
                        <option value="Financial or student cohort sponsorship">Financial student sponsorship</option>
                        <option value="Other hardware or equipment">Other hardware or equipment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Delivery preference
                      </label>
                      <select
                        value={formData.deliveryMethod}
                        onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors bg-white"
                      >
                        <option value="Drop off at Accra Hub">Drop off at Accra Hub (Ridge)</option>
                        <option value="Drop off at Kumasi Partner Center">Drop off at Kumasi Partner Center</option>
                        <option value="Courier or pickup request (Accra/Tema)">Request pickup (Greater Accra)</option>
                        <option value="Digital or Mobile Money transfer">Mobile Money / Bank Transfer</option>
                        <option value="Please contact me to discuss options">Contact me to discuss</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Quantity and item specifications *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.quantityDetails}
                      onChange={(e) => setFormData({ ...formData, quantityDetails: e.target.value })}
                      placeholder="e.g. 4 HP laptops (Core i5, 8GB RAM, working batteries with chargers) and 2 mouse accessories"
                      className="w-full rounded-xl border border-neutral-300 p-3.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Additional notes or questions (optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific requests, timeline constraints, or tax receipt requirements..."
                      className="w-full rounded-xl border border-neutral-300 p-3.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting donation pledge..." : "Submit donation pledge"}
                  </button>
                </form>
              )}
            </div>

            {/* Logistics & Trust Sidebar Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Drop-off Locations */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-brand-dark font-bold text-base mb-4">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span>Physical drop-off locations</span>
                </div>
                <div className="space-y-4 text-xs text-neutral-600">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="font-bold text-brand-dark mb-1">Accra Main Tech Hub</p>
                    <p>DigiConnect Ghana Innovation Hub, Ridge / Osu link, Accra</p>
                    <p className="text-neutral-500 mt-1">Monday – Friday: 8:30 AM – 5:00 PM</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <p className="font-bold text-brand-dark mb-1">Kumasi Regional Center</p>
                    <p>Tech Partners Collective, KNUST Commercial Area, Kumasi</p>
                    <p className="text-neutral-500 mt-1">Tuesday & Thursday: 9:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Free Courier Pickup */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-brand-dark font-bold text-base mb-3">
                  <Truck className="w-5 h-5 text-brand-blue" />
                  <span>Doorstep pickup available</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  For corporate or bulk donations (3 or more computers), our team will arrange secure courier pickup at no cost to you within Accra and Tema.
                </p>
                <div className="flex items-center gap-3 text-xs font-semibold text-brand-blue">
                  <Phone className="w-4 h-4" />
                  <span>Hotline: +233 (0) 54 832 9102</span>
                </div>
              </div>

              {/* Certified Data Sanitization */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-brand-dark font-bold text-base mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Certified data wipe guarantee</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every storage drive undergoes three-pass zeroization (DoD 5220.22-M compliant). We then install clean education distributions (Ubuntu LTS / Windows 11 Education) loaded with offline coding libraries.
                </p>
              </div>

              {/* Need direct assistance */}
              <div className="p-5 rounded-2xl bg-brand-blue-light/60 border border-brand-blue/20 text-xs">
                <p className="font-bold text-brand-dark mb-1">Direct corporate partnership inquiries</p>
                <p className="text-neutral-600 mb-3">
                  Planning an office hardware upgrade or large corporate CSR grant? Speak directly with our executive director.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center font-semibold text-brand-blue hover:text-brand-blue-dark"
                >
                  Contact partnerships team <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: FREQUENTLY ASKED QUESTIONS
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-t border-neutral-200/80">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-brand-blue mb-1 block">
              Donor transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-brand-dark mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                What condition must donated laptops be in?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                Laptops should be operational and capable of running a modern browser. Devices with worn batteries are still acceptable if they function while plugged into AC power. Please include chargers whenever possible.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-brand-dark mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                Do you provide an official donation receipt?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                Yes. DigiConnect Ghana issues an official non-profit acknowledgment letter and donation receipt specifying all serial numbers, donated items, and estimated fair market values for tax or CSR documentation.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-brand-dark mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                Can I donate from outside Ghana?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                Yes! We regularly accept shipments from supporters in the UK, US, and Europe. Please contact us before sending parcels so we can provide customs clearing documentation and direct shipping address details.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-brand-dark mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                How do I know where my donation goes?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                We maintain full asset tracing. Within 60 days of your donation, you will receive an impact report with photos showing the specific student cohort or community learning lab using your donated hardware.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
