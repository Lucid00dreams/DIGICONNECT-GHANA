"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/lib/data";
import { useToast } from "@/context/ToastContext";
import { useCookieConsent } from "@/context/CookieContext";
import {
  ArrowRight,
  CheckCircle,
  Heart,
} from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const pathname = usePathname();
  const { showToast } = useToast();
  const { openPreferences } = useCookieConsent();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname.startsWith("/connecthub")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast("Subscribed to DigiConnect Ghana updates", "success");
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white border-t border-white/10">
      {/* Main compact footer content */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Socials (4 columns) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3" aria-label="DigiConnect Ghana Home">
              <Image
                src="/logo.png"
                alt="DigiConnect Ghana"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div>
                <span className="text-[15px] font-bold leading-tight block text-white tracking-tight">
                  DigiConnect
                </span>
                <span className="text-[11px] font-medium text-neutral-400 block -mt-0.5">
                  Ghana
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-neutral-400 mb-4 max-w-sm">
              Nonprofit digital foundation equipping young Ghanaians with computer literacy, coding education, and career pathways.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  aria-label={link.platform}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-neutral-400 hover:bg-brand-blue hover:text-white transition-all"
                >
                  <SocialIcon platform={link.platform} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs & Learning (2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-neutral-200 mb-3 tracking-wide">
              Programs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-neutral-400 hover:text-white transition-colors">
                  Training Tracks
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-neutral-400 hover:text-white transition-colors">
                  Verified Impact
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-neutral-400 hover:text-white transition-colors">
                  Syllabi & Guides
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-neutral-400 hover:text-white transition-colors">
                  Stories & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved & Support (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-neutral-200 mb-3 tracking-wide">
              Get Involved
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/join" className="text-neutral-400 hover:text-white transition-colors">
                  Apply for Cohort
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-neutral-400 hover:text-white transition-colors">
                  Volunteer & Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors font-medium"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Donate Tech Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-neutral-400 hover:text-white transition-colors">
                  Community Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-neutral-200 mb-3 tracking-wide">
              Stay Connected
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              Subscribe to updates on new cohorts, free learning materials, and community stories.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-brand-blue px-3 py-2 text-xs font-semibold text-white hover:bg-brand-blue-dark transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle size={13} />
                  Subscribed to updates
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} DigiConnect Ghana. Tech for Youth. Tech for Good.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <span>/</span>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Terms of Use
            </Link>
            <span>/</span>
            <Link href="/brand" className="hover:text-neutral-300 transition-colors">
              Brand Guidelines
            </Link>
            <span>/</span>
            <button
              type="button"
              onClick={openPreferences}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
