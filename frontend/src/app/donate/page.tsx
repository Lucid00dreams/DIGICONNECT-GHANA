"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Banknote,
  Package,
  CreditCard,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Truck,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  Sparkles,
  Lock,
  Copy,
  Check,
  Building2,
  Calendar,
  AlertCircle,
  Printer,
  ChevronDown,
} from "lucide-react";
import { addInvolvement } from "@/lib/store";
import { useToast } from "@/context/ToastContext";
import { playSuccessChime, triggerConfetti } from "@/lib/confetti";

// ─── MATERIAL ITEMS DROPDOWN CHOICES ─────────────────────────────────────────
const MATERIAL_CATEGORIES = [
  "Laptops & Notebooks (Intel Core i3/i5/i7, MacBooks, Chromebooks)",
  "Desktop Computers & All-in-Ones (PC Towers, Workstations)",
  "Lab Monitors & Display Screens (21”–27” HDMI/VGA displays)",
  "Computer Peripherals (Keyboards, Mice, Webcams, Headsets)",
  "Networking Equipment (Wi-Fi Routers, 4G Modems, Switches)",
  "Power Protection & UPS / Surge Protectors",
  "Tablets & Mobile Learning Devices (Android, iPads)",
  "Lab Furniture (Computer Desks & Ergonomic Chairs)",
  "Projectors & Audio/Visual Hardware",
  "Other Hardware & Electronics",
];

// ─── SELECTION POINTS (DROP-OFF & COLLECTION HUBS) ───────────────────────────
const SELECTION_POINTS = [
  {
    id: "accra-ridge",
    name: "Accra Main Innovation Hub (Ridge / Osu Link)",
    address: "DigiConnect Ghana Innovation Hub, Ridge / Osu Link, Accra",
    hours: "Monday – Friday: 8:30 AM – 5:00 PM",
    phone: "+233 (0) 54 832 9102",
    badge: "Primary Headquarters",
  },
  {
    id: "kumasi-knust",
    name: "Kumasi Tech Partner Hub (KNUST Commercial Area)",
    address: "Tech Partners Collective, KNUST Commercial Area, Kumasi",
    hours: "Tuesday & Thursday: 9:00 AM – 4:00 PM",
    phone: "+233 (0) 24 123 4567",
    badge: "Ashanti Regional Hub",
  },
  {
    id: "takoradi-market",
    name: "Takoradi Regional Partner Center (Market Circle)",
    address: "Market Circle Tech Center, Commercial District, Takoradi",
    hours: "Monday – Wednesday: 9:00 AM – 4:00 PM",
    phone: "+233 (0) 31 200 4567",
    badge: "Western Regional Hub",
  },
  {
    id: "tamale-ridge",
    name: "Tamale Northern Tech Outpost (Education Ridge)",
    address: "Education Ridge Innovation Center, Tamale",
    hours: "Monday – Friday: 9:00 AM – 4:00 PM",
    phone: "+233 (0) 37 200 7890",
    badge: "Northern Regional Hub",
  },
  {
    id: "cape-coast-gate",
    name: "Cape Coast Innovation Lab (University Commercial Gate)",
    address: "University Commercial Gate Tech Point, Cape Coast",
    hours: "Monday – Friday: 9:00 AM – 4:00 PM",
    phone: "+233 (0) 33 200 1234",
    badge: "Central Regional Hub",
  },
  {
    id: "doorstep-pickup",
    name: "Request Free Courier Doorstep Pickup (Greater Accra & Tema)",
    address: "Our logistics courier collects directly from your home or office address",
    hours: "Scheduled collection within 24–48 hours",
    phone: "+233 (0) 54 832 9102",
    badge: "Free Doorstep Service",
  },
];

// Preset cash donation amounts
const GHS_PRESETS = [
  { amount: 50, impact: "Provides offline coding flash drives & workbooks" },
  { amount: 100, impact: "1 month of high-speed learning broadband for 1 student" },
  { amount: 250, impact: "Lab electricity & battery surge maintenance for 1 week" },
  { amount: 500, impact: "Complete 1-month tuition & mentorship scholarship" },
  { amount: 1000, impact: "Refurbishes a complete student lab workstation" },
];

const USD_PRESETS = [
  { amount: 15, impact: "Provides offline coding flash drives & workbooks" },
  { amount: 30, impact: "1 month of high-speed learning broadband for 1 student" },
  { amount: 75, impact: "Lab electricity & battery surge maintenance for 1 week" },
  { amount: 150, impact: "Complete 1-month tuition & mentorship scholarship" },
  { amount: 300, impact: "Refurbishes a complete student lab workstation" },
];

export default function DonatePage() {
  const { showToast } = useToast();

  // Active donation channel: "cash" | "material"
  const [donationType, setDonationType] = useState<"cash" | "material">("cash");

  // ─── CASH DONATION STATE ──────────────────────────────────────────────────
  const [cashFrequency, setCashFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<"GHS" | "USD">("GHS");
  const [selectedCashAmount, setSelectedCashAmount] = useState<number | "custom">(100);
  const [customCashAmount, setCustomCashAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card" | "bank">("momo");
  const [momoNetwork, setMomoNetwork] = useState<string>("MTN Mobile Money");
  const [momoNumber, setMomoNumber] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [donorFullName, setDonorFullName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [cashDedication, setCashDedication] = useState<string>("");
  const [isCashSubmitting, setIsCashSubmitting] = useState<boolean>(false);
  const [cashSubmitted, setCashSubmitted] = useState<boolean>(false);
  const [cashReceipt, setCashReceipt] = useState<{
    reference: string;
    amountFormatted: string;
    date: string;
    method: string;
    donorName: string;
    frequency: string;
  } | null>(null);

  // ─── MATERIAL ITEMS DONATION STATE ────────────────────────────────────────
  const [materialCategory, setMaterialCategory] = useState<string>(MATERIAL_CATEGORIES[0]);
  const [selectionPoint, setSelectionPoint] = useState<string>(SELECTION_POINTS[0].name);
  const [materialFullName, setMaterialFullName] = useState<string>("");
  const [materialEmail, setMaterialEmail] = useState<string>("");
  const [materialPhone, setMaterialPhone] = useState<string>("");
  const [materialDonorType, setMaterialDonorType] = useState<string>("Individual donor");
  const [materialQuantityDetails, setMaterialQuantityDetails] = useState<string>("");
  const [materialNotes, setMaterialNotes] = useState<string>("");
  const [isMaterialSubmitting, setIsMaterialSubmitting] = useState<boolean>(false);
  const [materialSubmitted, setMaterialSubmitted] = useState<boolean>(false);
  const [materialReceipt, setMaterialReceipt] = useState<{
    reference: string;
    category: string;
    selectionPoint: string;
    date: string;
    donorName: string;
    quantity: string;
  } | null>(null);

  // Copied bank account toast
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyText = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    showToast("Copied to clipboard", "success");
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Helper to compute cash final amount
  const finalCashAmount =
    selectedCashAmount === "custom"
      ? parseFloat(customCashAmount) || 0
      : selectedCashAmount;

  // ─── CASH FORM SUBMISSION ─────────────────────────────────────────────────
  const handleCashSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (finalCashAmount <= 0) {
      showToast("Please select or enter a valid donation amount.", "error");
      return;
    }

    setIsCashSubmitting(true);

    try {
      const currencySymbol = currency === "GHS" ? "GH₵" : "$";
      const formattedAmount = `${currencySymbol}${finalCashAmount.toLocaleString()}`;
      const referenceCode = `DCG-CASH-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

      addInvolvement({
        type: "donate",
        fullName: isAnonymous ? "Anonymous Donor" : donorFullName,
        email: donorEmail,
        phone: donorPhone || "N/A",
        organization: `Cash Donation (${currency} ${formattedAmount}) - ${paymentMethod.toUpperCase()}`,
        category: `Cash Donation (${cashFrequency})`,
        message: `[Online Cash Donation]\nAmount: ${formattedAmount}\nFrequency: ${cashFrequency}\nMethod: ${paymentMethod} (${paymentMethod === "momo" ? momoNetwork : "Direct"})\nReference: ${referenceCode}\nDedication: ${cashDedication || "None"}`,
      });

      setCashReceipt({
        reference: referenceCode,
        amountFormatted: formattedAmount,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        method:
          paymentMethod === "momo"
            ? `${momoNetwork} (${momoNumber || "Direct"})`
            : paymentMethod === "card"
            ? "Credit / Debit Card"
            : "Bank Wire Transfer",
        donorName: isAnonymous ? "Anonymous Supporter" : donorFullName,
        frequency: cashFrequency === "monthly" ? "Monthly Recurring Sponsor" : "One-Time Donation",
      });

      setCashSubmitted(true);
      playSuccessChime();
      triggerConfetti();
      showToast("Thank you for your generous online donation!", "success");
    } catch {
      showToast("There was an issue processing your donation. Please try again.", "error");
    } finally {
      setIsCashSubmitting(false);
    }
  };

  // ─── MATERIAL FORM SUBMISSION ─────────────────────────────────────────────
  const handleMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMaterialSubmitting(true);

    try {
      const referenceCode = `DCG-MAT-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

      addInvolvement({
        type: "donate",
        fullName: materialFullName,
        email: materialEmail,
        phone: materialPhone,
        organization: `${materialDonorType} — Material: ${materialCategory}`,
        category: `Material: ${materialCategory}`,
        message: `[Material Items Donation]\nItem Category: ${materialCategory}\nSelection Point: ${selectionPoint}\nQuantity / Specs: ${materialQuantityDetails}\nReference: ${referenceCode}\nNotes: ${materialNotes || "None"}`,
      });

      setMaterialReceipt({
        reference: referenceCode,
        category: materialCategory,
        selectionPoint: selectionPoint,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        donorName: materialFullName,
        quantity: materialQuantityDetails,
      });

      setMaterialSubmitted(true);
      playSuccessChime();
      triggerConfetti();
      showToast("Thank you! Your material item pledge has been registered.", "success");
    } catch {
      showToast("There was an issue recording your pledge. Please try again.", "error");
    } finally {
      setIsMaterialSubmitting(false);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HEADER SECTION — Unified Brand Aesthetic
      ═══════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>Support DigiConnect Ghana</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Empower Ghanaian Youth With Digital Skills
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed mb-6">
              Support our mission through financial contributions or donated technology equipment. Every contribution directly funds youth cohort training, student workstations, and community tech labs.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% of contributions go directly to student programs
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                Official non-profit tax receipt & impact reports
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: TWO WAYS TO DONATE (CASH VS MATERIAL)
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1.5 block">
              Choose How You Want to Give
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight">
              Select One of the Two Ways to Donate
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              You can donate money directly on our website, or donate physical material equipment by selecting your items and choosing a convenient selection point.
            </p>
          </div>

          {/* TWO PRIMARY DONATION ITEMS */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* OPTION 1: CASH DONATION */}
            <div
              onClick={() => {
                setDonationType("cash");
                const target = document.getElementById("donation-workspace");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                donationType === "cash"
                  ? "border-emerald-500 bg-white shadow-xl ring-4 ring-emerald-500/10 scale-[1.01]"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              {donationType === "cash" && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Active Option
                </div>
              )}
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-emerald-100">
                <Banknote className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                1. Cash Donation
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Donate money directly on our website using Mobile Money (MTN, Telecel, AT), Debit/Credit Card, or Bank Wire Transfer.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <span>Donate money online now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* OPTION 2: MATERIAL ITEMS DONATION */}
            <div
              onClick={() => {
                setDonationType("material");
                const target = document.getElementById("donation-workspace");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                donationType === "material"
                  ? "border-[#0056D2] bg-white shadow-xl ring-4 ring-blue-500/10 scale-[1.01]"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
              }`}
            >
              {donationType === "material" && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0056D2] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Active Option
                </div>
              )}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-blue-100">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                2. Material Items Donation
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Donate physical hardware (laptops, screens, networking gear). Select from our dropdown catalog, enter your details, and select a selection point.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0056D2]">
                <span>Pledge material items</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: INTERACTIVE DONATION WORKSPACE
      ═══════════════════════════════════════════════════ */}
      <section id="donation-workspace" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* ─────────────────────────────────────────────────────────────────
              VIEW A: CASH DONATION FLOW
          ───────────────────────────────────────────────────────────────── */}
          {donationType === "cash" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-lg space-y-8">
                {cashSubmitted && cashReceipt ? (
                  /* Official Cash Donation Receipt */
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Payment Acknowledgment
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                        Thank You for Your Donation!
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-2">
                        Your generous contribution has been recorded. An official tax-deductible receipt has been dispatched to{" "}
                        <strong className="text-neutral-900">{donorEmail || "your email"}</strong>.
                      </p>
                    </div>

                    {/* Printable Receipt Card */}
                    <div className="max-w-md mx-auto bg-neutral-50 rounded-2xl border border-neutral-200 p-6 text-left text-xs space-y-3 font-mono shadow-2xs">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 font-sans">
                        <div>
                          <p className="font-bold text-neutral-900">DigiConnect Ghana Foundation</p>
                          <p className="text-neutral-500 text-[11px]">NGO Reg: D.S.W./8392 • Accra, Ghana</p>
                        </div>
                        <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Receipt Ref:</span>
                          <span className="font-bold text-neutral-800">{cashReceipt.reference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Date:</span>
                          <span className="text-neutral-800">{cashReceipt.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Donor Name:</span>
                          <span className="text-neutral-800 font-semibold">{cashReceipt.donorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Donation Type:</span>
                          <span className="text-neutral-800">{cashReceipt.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Payment Channel:</span>
                          <span className="text-neutral-800">{cashReceipt.method}</span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-bold font-sans">
                          <span className="text-neutral-900">Total Donated:</span>
                          <span className="text-emerald-700 text-base">{cashReceipt.amountFormatted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Printer className="w-4 h-4 text-neutral-500" />
                        <span>Print Receipt</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCashSubmitted(false);
                          setCashReceipt(null);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
                      >
                        Make another donation
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Cash Donation Form */
                  <form onSubmit={handleCashSubmit} className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-neutral-100 pb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                          <Banknote className="w-5 h-5" />
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                          Donate Money Online
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-500">
                        Select your amount, preferred currency, and complete your donation securely via Mobile Money, Card, or Bank Transfer.
                      </p>
                    </div>

                    {/* Step 1: Frequency & Currency */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Frequency Toggle */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-2">
                          Donation Frequency
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl">
                          <button
                            type="button"
                            onClick={() => setCashFrequency("one-time")}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${
                              cashFrequency === "one-time"
                                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            One-Time Gift
                          </button>
                          <button
                            type="button"
                            onClick={() => setCashFrequency("monthly")}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${
                              cashFrequency === "monthly"
                                ? "bg-white text-emerald-700 shadow-2xs font-bold"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            Monthly Sponsor
                          </button>
                        </div>
                      </div>

                      {/* Currency Selector */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-2">
                          Currency
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrency("GHS");
                              setSelectedCashAmount(100);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                              currency === "GHS"
                                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            <span>🇬🇭 GHS (GH₵)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrency("USD");
                              setSelectedCashAmount(30);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                              currency === "USD"
                                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            <span>🌐 USD ($)</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Preset Amounts & Impact Pills */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-neutral-700">
                        Choose Amount ({currency === "GHS" ? "Ghana Cedis" : "US Dollars"})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                        {(currency === "GHS" ? GHS_PRESETS : USD_PRESETS).map((preset) => {
                          const isSelected = selectedCashAmount === preset.amount;
                          return (
                            <button
                              key={preset.amount}
                              type="button"
                              onClick={() => {
                                setSelectedCashAmount(preset.amount);
                                setCustomCashAmount("");
                              }}
                              className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-50/70 text-emerald-800 font-bold shadow-xs ring-2 ring-emerald-400/20"
                                  : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-800 font-semibold"
                              }`}
                            >
                              <div className="text-base sm:text-lg">
                                {currency === "GHS" ? "GH₵" : "$"}
                                {preset.amount}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Amount Option */}
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedCashAmount("custom")}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition shrink-0 ${
                            selectedCashAmount === "custom"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold"
                              : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          Custom Amount
                        </button>
                        {selectedCashAmount === "custom" && (
                          <div className="relative flex-1">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-500">
                              {currency === "GHS" ? "GH₵" : "$"}
                            </span>
                            <input
                              type="number"
                              min="1"
                              step="any"
                              value={customCashAmount}
                              onChange={(e) => setCustomCashAmount(e.target.value)}
                              placeholder="Enter custom amount"
                              className="w-full pl-8 pr-4 py-2 rounded-xl border border-neutral-300 bg-white text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-500"
                              autoFocus
                            />
                          </div>
                        )}
                      </div>

                      {/* Live Impact Indicator */}
                      {finalCashAmount > 0 && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>Your impact:</strong>{" "}
                            {finalCashAmount >= 500
                              ? "Sponsors complete cohort training and workstation hardware for Ghanaian youth."
                              : finalCashAmount >= 100
                              ? "Covers high-speed learning internet and lab electricity for community students."
                              : "Funds offline coding study packs and certification materials."}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Step 3: Payment Method Selection */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-neutral-700">
                        Select Payment Method
                      </label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("momo")}
                          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                            paymentMethod === "momo"
                              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/20 shadow-xs"
                              : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                            MoMo
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900">Mobile Money</div>
                            <div className="text-[11px] text-neutral-500">MTN, Telecel, AT</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                            paymentMethod === "card"
                              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/20 shadow-xs"
                              : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0056D2] flex items-center justify-center shrink-0">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900">Card Payment</div>
                            <div className="text-[11px] text-neutral-500">Visa, Mastercard</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("bank")}
                          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                            paymentMethod === "bank"
                              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/20 shadow-xs"
                              : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900">Bank Transfer</div>
                            <div className="text-[11px] text-neutral-500">Direct Wire (Ecobank)</div>
                          </div>
                        </button>
                      </div>

                      {/* Payment Method Details Sub-forms */}
                      {paymentMethod === "momo" && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-4">
                          <div className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                            <span>Mobile Money Checkout Details</span>
                            <span className="text-[10px] font-normal text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              Instant Push Notification
                            </span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                                Network Provider
                              </label>
                              <select
                                value={momoNetwork}
                                onChange={(e) => setMomoNetwork(e.target.value)}
                                className="w-full rounded-xl border border-neutral-300 p-2 text-xs bg-white text-neutral-900 focus:outline-none focus:border-amber-500"
                              >
                                <option value="MTN Mobile Money">MTN Mobile Money</option>
                                <option value="Telecel Cash">Telecel Cash</option>
                                <option value="AT Money">AT Money (AirtelTigo)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                                Mobile Number (for approval prompt)
                              </label>
                              <input
                                type="tel"
                                required
                                value={momoNumber}
                                onChange={(e) => setMomoNumber(e.target.value)}
                                placeholder="024 000 0000"
                                className="w-full rounded-xl border border-neutral-300 p-2 text-xs bg-white text-neutral-900 focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                          <p className="text-[11px] text-amber-900/80 leading-relaxed">
                            Upon clicking donate, a USSD payment authorization prompt will be triggered on your phone to approve the transfer to <strong>DigiConnect Ghana Foundation</strong>.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/40 border border-blue-200/70 space-y-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-neutral-800">
                              Debit / Credit Card Information
                            </span>
                            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-emerald-600" />
                              256-bit SSL Encrypted
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4123 •••• •••• 9821"
                                className="w-full rounded-xl border border-neutral-300 p-2 text-xs bg-white text-neutral-900 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  placeholder="MM/YY"
                                  className="w-full rounded-xl border border-neutral-300 p-2 text-xs bg-white text-neutral-900 focus:outline-none focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                                  Security Code (CVV)
                                </label>
                                <input
                                  type="password"
                                  required
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value)}
                                  placeholder="•••"
                                  className="w-full rounded-xl border border-neutral-300 p-2 text-xs bg-white text-neutral-900 focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "bank" && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                          <div className="text-xs font-bold text-neutral-800">
                            Direct Bank Wire Transfer (Ghana & International)
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-1">
                              <p className="font-bold text-neutral-900">Ecobank Ghana Ltd</p>
                              <p className="text-neutral-600 text-[11px]">Account Name: DigiConnect Ghana Foundation</p>
                              <div className="flex items-center justify-between pt-1">
                                <span className="font-mono text-neutral-800 font-bold">1441002391024</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText("1441002391024", "ecobank")}
                                  className="text-[10px] text-brand-blue font-bold flex items-center gap-1"
                                >
                                  {copiedField === "ecobank" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedField === "ecobank" ? "Copied" : "Copy"}</span>
                                </button>
                              </div>
                              <p className="text-[10px] text-neutral-500">Branch: Ridge Main, Accra • Swift: ECOGHAC</p>
                            </div>

                            <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-1">
                              <p className="font-bold text-neutral-900">Stanbic Bank Ghana</p>
                              <p className="text-neutral-600 text-[11px]">Account Name: DigiConnect Ghana Foundation</p>
                              <div className="flex items-center justify-between pt-1">
                                <span className="font-mono text-neutral-800 font-bold">9040003829101</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText("9040003829101", "stanbic")}
                                  className="text-[10px] text-brand-blue font-bold flex items-center gap-1"
                                >
                                  {copiedField === "stanbic" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedField === "stanbic" ? "Copied" : "Copy"}</span>
                                </button>
                              </div>
                              <p className="text-[10px] text-neutral-500">Branch: Airport City • Swift: SBICGHAC</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 4: Donor Details */}
                    <div className="space-y-4 border-t border-neutral-100 pt-5">
                      <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                        Donor Receipt Details
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={donorFullName}
                            onChange={(e) => setDonorFullName(e.target.value)}
                            placeholder="Kwame Mensah"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Email Address (for official receipt) *
                          </label>
                          <input
                            type="email"
                            required
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="kwame@example.com"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Phone / WhatsApp (optional)
                          </label>
                          <input
                            type="tel"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="+233 24 000 0000"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Dedication or Message (optional)
                          </label>
                          <input
                            type="text"
                            value={cashDedication}
                            onChange={(e) => setCashDedication(e.target.value)}
                            placeholder="In honor of... or Keep up the great work!"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="anon-checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="anon-checkbox" className="text-xs text-neutral-600 cursor-pointer">
                          Make my donation anonymous (do not display name on public donor roll)
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isCashSubmitting || finalCashAmount <= 0}
                      className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {isCashSubmitting
                          ? "Processing donation..."
                          : `Complete Donation of ${currency === "GHS" ? "GH₵" : "$"}${finalCashAmount.toLocaleString()} ${cashFrequency === "monthly" ? "/ month" : ""}`}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              VIEW B: MATERIAL ITEMS DONATION FLOW
          ───────────────────────────────────────────────────────────────── */}
          {donationType === "material" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-lg space-y-8">
                {materialSubmitted && materialReceipt ? (
                  /* Official Material Pledge Confirmation */
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0056D2] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0056D2]">
                        Hardware Donation Confirmed
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                        Thank You for Pledging Material Equipment!
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-2">
                        We have recorded your pledge. Our logistics team will contact you within 24 hours to coordinate drop-off at your selected selection point or arrange pickup.
                      </p>
                    </div>

                    {/* Printable Material Pledge Receipt */}
                    <div className="max-w-md mx-auto bg-neutral-50 rounded-2xl border border-neutral-200 p-6 text-left text-xs space-y-3 font-mono shadow-2xs">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 font-sans">
                        <div>
                          <p className="font-bold text-neutral-900">DigiConnect Ghana Logistics</p>
                          <p className="text-neutral-500 text-[11px]">Hardware Receiving & Sanitization Center</p>
                        </div>
                        <span className="p-1.5 rounded-lg bg-blue-100 text-[#0056D2]">
                          <Package className="w-4 h-4" />
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Pledge Ref:</span>
                          <span className="font-bold text-neutral-800">{materialReceipt.reference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Date Registered:</span>
                          <span className="text-neutral-800">{materialReceipt.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Donor Name:</span>
                          <span className="text-neutral-800 font-semibold">{materialReceipt.donorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Item Category:</span>
                          <span className="text-neutral-800 font-semibold text-right">{materialReceipt.category}</span>
                        </div>
                        <div className="border-t border-neutral-200 pt-2 space-y-1">
                          <span className="text-neutral-500 block">Designated Selection Point:</span>
                          <span className="text-[#0056D2] font-bold block text-sm">
                            {materialReceipt.selectionPoint}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Printer className="w-4 h-4 text-neutral-500" />
                        <span>Print Confirmation</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMaterialSubmitted(false);
                          setMaterialReceipt(null);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
                      >
                        Pledge another material item
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Material Donation Form */
                  <form onSubmit={handleMaterialSubmit} className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-neutral-100 pb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-1.5 rounded-xl bg-blue-100 text-[#0056D2]">
                          <Package className="w-5 h-5" />
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                          Donate Material Items
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-500">
                        Select what you want to donate from the dropdown, fill in your details, and select your nearest drop-off or pickup selection point.
                      </p>
                    </div>

                    {/* DROPDOWN 1: MATERIAL ITEM SELECTION */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-neutral-800">
                        1. Select Material Item From Dropdown *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={materialCategory}
                          onChange={(e) => setMaterialCategory(e.target.value)}
                          className="w-full appearance-none rounded-2xl border-2 border-neutral-300 px-4 py-3 text-xs sm:text-sm text-neutral-900 bg-white focus:outline-none focus:border-[#0056D2] font-medium pr-10 cursor-pointer shadow-2xs"
                        >
                          {MATERIAL_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Working, gently used, or brand-new devices and lab components are all welcome.
                      </p>
                    </div>

                    {/* FILL IN DONOR DETAILS */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold text-neutral-800">
                        2. Fill in Your Details *
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                            Your Name or Organization *
                          </label>
                          <input
                            type="text"
                            required
                            value={materialFullName}
                            onChange={(e) => setMaterialFullName(e.target.value)}
                            placeholder="e.g. Kwame Mensah or Enterprise Ghana"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#0056D2]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                            Donor Category
                          </label>
                          <select
                            value={materialDonorType}
                            onChange={(e) => setMaterialDonorType(e.target.value)}
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 bg-white focus:outline-none focus:border-[#0056D2]"
                          >
                            <option value="Individual donor">Individual donor</option>
                            <option value="Corporate / Tech Company">Corporate / Tech Company</option>
                            <option value="Foundation / NGO">Foundation / NGO</option>
                            <option value="Diaspora / Overseas Supporter">Diaspora / Overseas Supporter</option>
                            <option value="School / Educational Institution">Educational Institution</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={materialEmail}
                            onChange={(e) => setMaterialEmail(e.target.value)}
                            placeholder="kwame@example.com"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#0056D2]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                            Phone or WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={materialPhone}
                            onChange={(e) => setMaterialPhone(e.target.value)}
                            placeholder="+233 24 000 0000"
                            className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#0056D2]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Item Quantity and Specifications *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={materialQuantityDetails}
                          onChange={(e) => setMaterialQuantityDetails(e.target.value)}
                          placeholder="e.g. 3 HP laptops (Intel Core i5, 8GB RAM, working chargers included) and 2 computer mice"
                          className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#0056D2]"
                        />
                      </div>
                    </div>

                    {/* DROPDOWN 2: SELECT A SELECTION POINT */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold text-neutral-800">
                        3. Select a Selection Point (Drop-off or Pickup Hub) *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={selectionPoint}
                          onChange={(e) => setSelectionPoint(e.target.value)}
                          className="w-full appearance-none rounded-2xl border-2 border-neutral-300 px-4 py-3 text-xs sm:text-sm text-neutral-900 bg-white focus:outline-none focus:border-[#0056D2] font-semibold pr-10 cursor-pointer shadow-2xs"
                        >
                          {SELECTION_POINTS.map((pt) => (
                            <option key={pt.id} value={pt.name}>
                              📍 {pt.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Info preview of selected selection point */}
                      {(() => {
                        const pt = SELECTION_POINTS.find((p) => p.name === selectionPoint);
                        if (!pt) return null;
                        return (
                          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-neutral-900">{pt.name}</span>
                              <span className="text-[10px] font-bold bg-blue-100 text-[#0056D2] px-2 py-0.5 rounded-full">
                                {pt.badge}
                              </span>
                            </div>
                            <p className="text-neutral-600 text-[11px]">{pt.address}</p>
                            <p className="text-neutral-500 text-[10.5px]">Operating Hours: {pt.hours}</p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Additional Notes or Pickup Address (optional)
                      </label>
                      <textarea
                        rows={2}
                        value={materialNotes}
                        onChange={(e) => setMaterialNotes(e.target.value)}
                        placeholder="Any special handling, preferred delivery date, or office landmark..."
                        className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#0056D2]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isMaterialSubmitting}
                      className="w-full py-4 rounded-2xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {isMaterialSubmitting
                          ? "Registering material pledge..."
                          : "Submit Material Donation Pledge"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION: TRUST, DATA WIPING & SELECTION HUBS
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Trust Pillar 1 */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base">
                Certified Data Sanitization
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every storage drive undergoes three-pass zeroization (DoD 5220.22-M compliant). All corporate and personal data is permanently wiped before student operating systems are installed.
              </p>
            </div>

            {/* Trust Pillar 2 */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base">
                Regional Selection Hubs
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Convenient drop-off selection points located across Greater Accra, Ashanti, Western, Central, and Northern Regions, plus free courier pickup for bulk pledges.
              </p>
            </div>

            {/* Trust Pillar 3 */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-900 text-base">
                Official Tax & Impact Reporting
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Receive an official non-profit acknowledgment letter and donation receipt specifying serial numbers, values, and photo updates of the students benefiting.
              </p>
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
              Donor Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                How are cash donations utilized?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                100% of cash contributions go directly toward student cohort scholarships, learning broadband internet packages, lab electricity backup systems, and refurbishment of donated hardware.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                What condition must donated material items be in?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                Items should be functional and capable of running standard web browsers and development tools. Devices with depleted batteries are still accepted if they function on AC power adapters.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                How does the selection point work for material drop-offs?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                When filling the material donation form, choose your preferred regional selection point from the dropdown. You will immediately receive hours and address details. Alternatively, select &quot;Request Free Courier Doorstep Pickup&quot; if you have 3 or more items within Accra or Tema.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                Can I donate money from outside Ghana?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                Yes! Select USD ($) on the cash donation terminal and donate securely using any international credit or debit card (Visa or Mastercard), or utilize our direct Swift bank wire details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
