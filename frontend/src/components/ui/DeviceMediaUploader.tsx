"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  Camera,
  Video,
  X,
  Check,
  Loader2,
  Link as LinkIcon,
  Play,
  Film,
  Image as ImageIcon,
} from "lucide-react";

export interface DeviceMediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  accept?: string;
  required?: boolean;
  previewAspect?: "video" | "square" | "banner";
  compact?: boolean;
}

import { isVideoMedia } from "@/lib/media";
export { isVideoMedia };

export function DeviceMediaUploader({
  label,
  value,
  onChange,
  helperText = "Select a picture or video from your device or camera",
  accept = "image/*,video/*",
  required = false,
  previewAspect = "video",
  compact = false,
}: DeviceMediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const isVideo = isVideoMedia(value);

  const handleProcessFile = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVid = file.type.startsWith("video/") || /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);

    if (!isImage && !isVid) {
      alert("Please select a valid image (JPEG, PNG, WebP, GIF) or video (MP4, WebM, MOV, OGG).");
      return;
    }

    const sizeKb = Math.round(file.size / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
    setFileName(file.name);
    setFileSize(sizeStr);

    // Instant local preview via FileReader
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);

    // Concurrently upload to server
    setIsUploading(true);
    setUploadProgress("Uploading to server...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setUploadProgress("Saved & synced");
        }
      } else {
        setUploadProgress("Saved locally");
      }
    } catch (err) {
      console.warn("Upload endpoint notice: saved local preview data", err);
      setUploadProgress("Saved locally");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(null), 3000);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const aspectClass =
    previewAspect === "square"
      ? "aspect-square max-w-[200px]"
      : previewAspect === "banner"
      ? "aspect-[21/9]"
      : "aspect-[16/9]";

  return (
    <div className="space-y-2">
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-neutral-700">
          {label} {required && <span className="text-brand-red">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="text-[11px] font-semibold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Hide URL input" : "Or enter direct URL"}
        </button>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Direct URL input fallback */}
      {showUrlInput && (
        <div className="flex items-center gap-2 mb-2 animate-fade-in">
          <input
            type="text"
            placeholder="https://... or /images/..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
          />
        </div>
      )}

      {/* Active Preview Display */}
      {value ? (
        <div
          className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 group shadow-xs`}
        >
          {isVideo ? (
            <video
              src={value}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Media preview"
              className="w-full h-full object-cover"
            />
          )}

          {/* Media Type & Upload Status Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-2 pointer-events-none z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
              {isVideo ? (
                <>
                  <Film className="w-3 h-3 text-brand-yellow" /> Video
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 text-brand-blue" /> Photo
                </>
              )}
            </span>

            {isUploading && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white flex items-center gap-1.5 shadow-xs">
                <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
              </span>
            )}

            {uploadProgress && !isUploading && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1.5 shadow-xs">
                <Check className="w-3 h-3" /> {uploadProgress}
              </span>
            )}
          </div>

          {/* Controls overlay */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title="Replace from device"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setFileName("");
                setFileSize("");
              }}
              className="p-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow-sm"
              title="Remove media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* File details footer */}
          {fileName && (
            <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-white text-[11px] truncate flex items-center justify-between">
              <span className="truncate">{fileName}</span>
              {fileSize && <span className="text-white/70 ml-2 shrink-0">{fileSize}</span>}
            </div>
          )}
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl ${
            compact ? "p-4" : "p-6"
          } text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-brand-blue bg-brand-blue/5 scale-[1.01]"
              : "border-neutral-300 hover:border-brand-blue bg-neutral-50/70 hover:bg-neutral-50"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-neutral-400">
            <Camera className="w-6 h-6 text-brand-blue" />
            <Video className="w-6 h-6 text-brand-red" />
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-neutral-800">
            Choose Photo or Video from Device
          </h4>
          <p className="text-[11px] text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
            {helperText}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold shadow-2xs hover:bg-neutral-100 transition-colors">
            <UploadCloud className="w-3.5 h-3.5 text-brand-blue" />
            <span>Browse Device Gallery / Files</span>
          </div>

          <div className="mt-2 text-[10px] text-neutral-400 font-medium">
            Supports JPEG, PNG, WebP, GIF, MP4, WebM, MOV
          </div>
        </div>
      )}
    </div>
  );
}
