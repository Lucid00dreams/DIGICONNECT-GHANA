"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  Sparkles,
  Clock,
  Users,
  Target,
  Handshake,
  ArrowRight,
  Monitor,
  Code,
  Briefcase,
  Rocket,
  Lightbulb,
  GraduationCap,
  TrendingUp,
  Award,
  FileText,
  Newspaper,
  Calendar,
  Gift,
  BookOpen,
  Info
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { NavDropdownItem } from "@/lib/types";

function getDropdownIcon(iconName: string) {
  switch (iconName) {
    case "Sparkles":
      return Sparkles;
    case "Clock":
      return Clock;
    case "Users":
      return Users;
    case "Target":
      return Target;
    case "Handshake":
      return Handshake;
    case "Monitor":
      return Monitor;
    case "Code":
      return Code;
    case "Briefcase":
      return Briefcase;
    case "Rocket":
      return Rocket;
    case "Lightbulb":
      return Lightbulb;
    case "GraduationCap":
      return GraduationCap;
    case "TrendingUp":
      return TrendingUp;
    case "Award":
      return Award;
    case "FileText":
      return FileText;
    case "Newspaper":
      return Newspaper;
    case "Calendar":
      return Calendar;
    case "Heart":
      return Heart;
    case "Gift":
      return Gift;
    case "BookOpen":
      return BookOpen;
    default:
      return Info;
  }
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    "About Us": true,
    "Programs": true,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (pathname.startsWith("/connecthub")) {
    return null;
  }

  // On desktop, filter out "Home" since the logo is prominent, accessible, and already links to "/"
  const desktopNavItems = NAV_ITEMS.filter((item) => item.href !== "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/70 py-2.5"
          : "bg-white border-b border-neutral-100 py-3"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-brand-blue rounded-lg"
          aria-label="DigiConnect Ghana Home"
        >
          <Image
            src="/logo.png"
            alt="DigiConnect Ghana"
            width={40}
            height={40}
            className="h-9 w-9 lg:h-10 lg:w-10 object-contain"
            priority
          />
          <div className="hidden sm:block">
            <span className="text-[15px] font-bold leading-tight text-brand-dark block tracking-tight">
              DigiConnect
            </span>
            <span className="text-[11px] font-medium text-neutral-500 block -mt-0.5">
              Ghana
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {desktopNavItems.map((item, itemIdx) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isDropdownOpen = activeDropdown === item.label;

            // Align right if it's near the right half of the menu
            const alignRight = itemIdx >= desktopNavItems.length - 3;

            // An item is active if exact path matches, or if any of its child sub-pages match
            const isActive =
              pathname === item.href ||
              Boolean(item.children?.some((child) => pathname === child.href));

            if (hasChildren) {
              return (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      prefetch={true}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-[13.5px] font-medium rounded-lg transition-colors ${
                        isActive
                          ? "text-brand-blue font-semibold bg-brand-blue-light/50"
                          : "text-neutral-600 hover:text-brand-dark hover:bg-neutral-50"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-brand-blue" : "group-hover:text-neutral-700"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-blue rounded-full" />
                      )}
                    </Link>
                  </div>

                  {/* Dropdown Card */}
                  <div
                    className={`absolute top-full pt-2 transition-all duration-200 z-50 ${
                      alignRight ? "right-0" : "left-0"
                    } ${
                      isDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="w-[340px] rounded-2xl bg-white p-2.5 shadow-xl border border-neutral-200/90 ring-1 ring-black/5">
                      <div className="px-3 pt-2 pb-1.5 border-b border-neutral-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                          {item.label}
                        </span>
                        <Link
                          href={item.href}
                          prefetch={true}
                          className="text-[11px] font-semibold text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-0.5"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Overview <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="mt-1 space-y-1 max-h-[380px] overflow-y-auto">
                        {item.children?.map((child: NavDropdownItem) => {
                          const IconComponent = getDropdownIcon(child.icon);
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              prefetch={true}
                              onClick={() => setActiveDropdown(null)}
                              className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                isChildActive
                                  ? "bg-brand-blue-50/80 border border-brand-blue/10"
                                  : "hover:bg-neutral-50 border border-transparent"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                  isChildActive
                                    ? "bg-brand-blue text-white shadow-xs"
                                    : "bg-neutral-100 text-neutral-600 group-hover/item:bg-brand-blue/10 group-hover/item:text-brand-blue"
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div
                                  className={`text-[13px] font-semibold tracking-tight transition-colors ${
                                    isChildActive
                                      ? "text-brand-blue"
                                      : "text-neutral-900 group-hover/item:text-brand-blue"
                                  }`}
                                >
                                  {child.title}
                                </div>
                                <div className="text-[11.5px] text-neutral-500 line-clamp-1 mt-0.5">
                                  {child.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={true}
                  className={`relative px-3 py-1.5 text-[13.5px] font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-blue font-semibold bg-brand-blue-light/50"
                      : "text-neutral-600 hover:text-brand-dark hover:bg-neutral-50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-blue rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Controls & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Donate Button */}
          <Link
            href="/donate"
            prefetch={true}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200/90 bg-rose-50/80 hover:bg-rose-100 text-rose-700 px-3.5 py-2 text-[13px] font-semibold shadow-2xs transition-all hover:border-rose-300 shrink-0"
            aria-label="Donate to DigiConnect Ghana"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Donate</span>
          </Link>

          {/* Primary Action Button */}
          <Link
            href="/join"
            prefetch={true}
            className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-4 py-2 text-[13px] font-semibold text-white shadow-2xs hover:bg-brand-blue-dark transition-all shrink-0"
          >
            Join DigiConnect
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2 -mr-2">
          {/* Mobile Donate Button */}
          <Link
            href="/donate"
            prefetch={true}
            className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
            aria-label="Donate to DigiConnect Ghana"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Donate</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-neutral-700 hover:text-brand-dark"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-[57px] z-40 transition-all duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`relative bg-white shadow-xl max-h-[calc(100vh-57px)] overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {/* Mobile Donate Highlight */}
          <div className="px-5 pt-4 pb-2">
            <Link
              href="/donate"
              prefetch={true}
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm font-semibold hover:bg-rose-100 transition-colors"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Donate to Support Learners</span>
            </Link>
          </div>

          <ul className="px-5 py-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isActive =
                pathname === item.href ||
                Boolean(item.children?.some((child) => pathname === child.href));
              const isExpanded = mobileExpanded[item.label] ?? false;

              if (hasChildren) {
                return (
                  <li key={item.label} className="border-b border-neutral-100/60 pb-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 py-3 px-3 text-[15px] font-semibold transition-colors rounded-lg ${
                          isActive
                            ? "text-brand-blue"
                            : "text-neutral-800 hover:text-brand-dark"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-3 text-neutral-400 hover:text-brand-blue transition-colors"
                        aria-label={`Toggle ${item.label} sub-navigation`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-brand-blue" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Submenu Accordion */}
                    {isExpanded && (
                      <div className="pl-3 pr-2 pb-2 space-y-1">
                        {item.children?.map((child: NavDropdownItem) => {
                          const IconComponent = getDropdownIcon(child.icon);
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              prefetch={true}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isChildActive
                                  ? "bg-brand-blue-50 text-brand-blue font-semibold"
                                  : "text-neutral-600 hover:text-brand-dark hover:bg-neutral-50"
                              }`}
                            >
                              <IconComponent className="w-4 h-4 text-brand-blue shrink-0" />
                              <span>{child.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-brand-blue-light text-brand-blue font-semibold"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-5 pb-6 pt-3 space-y-3 border-t border-neutral-100">
            <Link
              href="/join"
              prefetch={true}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center rounded-xl bg-brand-blue px-5 py-3 text-[14px] font-semibold text-white hover:bg-brand-blue-dark transition-colors"
            >
              Join DigiConnect
            </Link>
            <Link
              href="/get-involved"
              prefetch={true}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center rounded-xl border border-neutral-200 px-5 py-3 text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Partner & Get Involved
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
