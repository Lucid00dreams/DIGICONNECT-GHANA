"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Calendar,
  Newspaper,
  Compass,
  ArrowRight,
  Sparkles,
  UserPlus,
  Send,
  X,
  ShieldCheck,
  Gift,
  Heart,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { RESOURCES } from "@/lib/data";

interface CommandItem {
  id: string;
  title: string;
  category: "Quick actions" | "Program tracks" | "Learning resources" | "News stories" | "Community events";
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  detail?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { store } = useStore();

  // Listen for Cmd+K / Ctrl+K and custom trigger events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open_command_palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open_command_palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Construct searchable list
  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      {
        id: "action-join",
        title: "Apply for active cohort admission",
        category: "Quick actions",
        href: "/join",
        icon: UserPlus,
        detail: "Submit application for Cohort 2026-B",
      },
      {
        id: "action-donate",
        title: "Donate laptops, equipment, and lab resources",
        category: "Quick actions",
        href: "/donate",
        icon: Heart,
        detail: "Support students with hardware, connectivity, and sponsorship",
      },
      {
        id: "action-programs",
        title: "Explore technology training tracks",
        category: "Quick actions",
        href: "/programs",
        icon: Compass,
        detail: "Digital literacy, web dev, and careers",
      },
      {
        id: "action-contact",
        title: "Contact admissions and community team",
        category: "Quick actions",
        href: "/contact",
        icon: Send,
        detail: "Reach out via email, phone, or WhatsApp",
      },
      {
        id: "action-brand",
        title: "DigiConnect Ghana brand showcase",
        category: "Quick actions",
        href: "/brand",
        icon: Sparkles,
        detail: "Visual identity, mission, and typography",
      },
      {
        id: "action-connecthub",
        title: "ConnectHub operational command center",
        category: "Quick actions",
        href: "/connecthub",
        icon: ShieldCheck,
        detail: "Internal administration and cohort admissions",
      },
    ];

    // Programs
    store.programs.forEach((prog) => {
      items.push({
        id: `prog-${prog.slug}`,
        title: prog.title,
        category: "Program tracks",
        href: `/programs/${prog.slug}`,
        icon: Compass,
        detail: prog.description,
      });
    });

    // Learning Resources
    RESOURCES.forEach((res) => {
      items.push({
        id: `res-${res.slug}`,
        title: res.title,
        category: "Learning resources",
        href: `/resources/${res.slug}`,
        icon: BookOpen,
        detail: `${res.category} syllabus guide`,
      });
    });

    // News & Stories
    store.news.forEach((post) => {
      items.push({
        id: `news-${post.slug}`,
        title: post.title,
        category: "News stories",
        href: "/news",
        icon: Newspaper,
        detail: `${post.category} / ${post.readTime}`,
      });
    });

    // Events
    store.events.forEach((evt) => {
      items.push({
        id: `evt-${evt.id}`,
        title: evt.title,
        category: "Community events",
        href: "/events",
        icon: Calendar,
        detail: `${evt.date} / ${evt.location}`,
      });
    });

    return items;
  }, [store.programs, store.news, store.events]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 10);
    }
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.detail && item.detail.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 14);
  }, [allItems, query]);

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        handleSelect(current);
      }
    }
  };

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Platform search and quick navigation"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-neutral-200 overflow-hidden my-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-150">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search programs, articles, resources, or quick actions..."
            className="w-full pl-3 pr-10 py-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-neutral-400 bg-neutral-100 rounded-md border border-neutral-200">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 px-6 text-center">
              <Compass className="w-8 h-8 text-neutral-300 mx-auto mb-2.5" />
              <p className="text-sm font-semibold text-neutral-800">
                No matching results found
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                Try searching for &quot;coding&quot;, &quot;literacy&quot;, &quot;admissions&quot;, or &quot;data saver&quot;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-brand-blue-light/60 text-brand-dark"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-brand-blue text-white" : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-neutral-900">
                        {item.title}
                      </p>
                      {item.detail && (
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-150 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-semibold text-neutral-700 bg-white px-1.5 py-0.5 rounded border border-neutral-200">↑</kbd>{" "}
              <kbd className="font-semibold text-neutral-700 bg-white px-1.5 py-0.5 rounded border border-neutral-200">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-semibold text-neutral-700 bg-white px-1.5 py-0.5 rounded border border-neutral-200">↵</kbd> to open
            </span>
          </div>
          <span>DigiConnect Quick Search</span>
        </div>
      </div>
    </div>
  );
}
