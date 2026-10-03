"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/data";
import { useStore } from "@/context/StoreContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { addContactMessage } from "@/lib/store";

import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { store } = useStore();
  const { showToast } = useToast();
  const contactInfo = store.contactInfo;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      subject: formData.subject,
      message: formData.message,
    });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("Message sent to DigiConnect Ghana team", "success");
    }, 500);
  };

  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Global Connection Hub & Signal Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="120" cy="120" r="30" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="120" cy="120" r="55" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
            <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 4" />
            <line x1="20" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
            <line x1="120" y1="20" x2="120" y2="220" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
            <line x1="45" y1="45" x2="195" y2="195" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" />
            <circle cx="120" cy="65" r="3.5" fill="currentColor" />
            <circle cx="175" cy="120" r="3.5" fill="currentColor" />
            <circle cx="120" cy="175" r="3.5" fill="currentColor" />
            <circle cx="65" cy="120" r="3.5" fill="currentColor" />
            <circle cx="160" cy="160" r="3" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Get in touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Let&apos;s Build the Future Together
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Have questions about our digital literacy cohorts, partnership opportunities, or community programs? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-brand-dark mb-4">
                  Contact Information
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Reach out directly through any of our channels or submit the contact form. Our administrative team typically responds within 24 hours.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block mb-0.5">
                      Email us
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm font-semibold text-brand-dark hover:text-brand-blue transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block mb-0.5">
                      Call or WhatsApp
                    </span>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-sm font-semibold text-brand-dark hover:text-brand-blue transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block mb-0.5">
                      Office location
                    </span>
                    <p className="text-sm font-semibold text-brand-dark">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 text-yellow-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block mb-0.5">
                      Working hours
                    </span>
                    <p className="text-sm font-semibold text-brand-dark">
                      {contactInfo.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
                <h3 className="text-sm font-bold text-brand-dark mb-4">
                  Social channels & community
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      aria-label={link.platform}
                      className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
                    >
                      <SocialIcon platform={link.platform} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200 p-8 lg:p-10 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">
                      Message sent successfully
                    </h3>
                    <p className="text-neutral-600 max-w-md mx-auto mb-6 text-sm">
                      Thank you for reaching out to DigiConnect Ghana. Our team has received your message and will reply shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          organization: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full font-semibold bg-brand-blue text-white text-sm hover:bg-brand-blue-dark transition-colors shadow-2xs"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-dark mb-1">
                        Send us a message
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Fill in the details below and we will get back to you promptly.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-2">
                          Your name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Abena Serwaa"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-2">
                          Email address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="abena@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-2">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+233 XX XXX XXXX"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-2">
                          Organization or school
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Optional"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Inquiry regarding the upcoming coding bootcamp"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we assist you?"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue leading-relaxed"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors shadow-2xs flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
