"use client";

import Image from "next/image";
import { NewsPost } from "@/lib/store";
import { X, Calendar, Clock, User, Share2 } from "lucide-react";
import { useEffect } from "react";

interface ArticleReaderModalProps {
  post: NewsPost | null;
  onClose: () => void;
}

export function ArticleReaderModal({ post, onClose }: ArticleReaderModalProps) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [post]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-neutral-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image in modal */}
        <div className="relative aspect-[16/9] w-full bg-neutral-100">
          <Image
            src={post.image || "/images/gallery/gallery-2.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue text-white mb-3">
              {post.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 max-w-2xl mx-auto">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">{post.author}</span>
                <span className="text-[11px] text-neutral-400">DigiConnect Editorial</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime || "3 min read"}
              </span>
            </div>
          </div>

          {/* Excerpt callout */}
          <div className="p-4 rounded-2xl bg-neutral-50 border-l-4 border-brand-blue mb-6">
            <p className="text-sm font-medium text-neutral-700 italic leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Full content */}
          <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 text-sm sm:text-base">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-400">
              Published on DigiConnect Ghana Insights
            </span>
            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  }).catch(() => {});
                } else if (typeof navigator !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-brand-dark bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
