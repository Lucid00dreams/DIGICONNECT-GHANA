"use client";

import Image from "next/image";
import { NewsPost } from "@/lib/store";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";

interface BlogPostCardProps {
  post: NewsPost;
  onSelect?: (post: NewsPost) => void;
}

export function BlogPostCard({ post, onSelect }: BlogPostCardProps) {
  return (
    <article
      onClick={() => onSelect?.(post)}
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer text-left"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
        <Image
          src={post.image || "/images/gallery/gallery-2.jpg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-950/85 text-white backdrop-blur-md capitalize">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {post.readTime || "3 min read"}
            </span>
          </div>

          <h3 className="font-extrabold text-lg text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2.5">
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-[10px]">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-neutral-700">{post.author}</span>
          </div>

          <span className="font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read story
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

