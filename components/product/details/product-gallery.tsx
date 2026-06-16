import React, { useState } from "react";
import { cn } from "../../../lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}

export default function ProductGallery({
  images,
  title,
  onOpenLightbox,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image Frame with hover zoom and lightbox indicator */}
      <div
        onClick={() => onOpenLightbox(activeIndex)}
        className="relative aspect-[4/3] md:aspect-[1.1] overflow-hidden bg-[#F5F2EA] cursor-zoom-in group border border-[#EAE5D9]"
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/[0.01] pointer-events-none z-10" />
        
        {/* Hover zoom effect */}
        <img
          src={images[activeIndex]}
          alt={`${title} - Main Showroom View`}
          className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        {/* Cinematic zoom indicator button */}
        <div className="absolute bottom-4 right-4 z-20 bg-[#FAF8F2]/90 backdrop-blur-sm border border-[#EAE5D9] px-3 py-1.5 flex items-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#FAF8F2]">
          <svg className="w-3.5 h-3.5 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#1A1A1A]">
            Expand Frame
          </span>
        </div>
      </div>

      {/* Interactive Horizontal Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-1">
          {images.map((imgUrl, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={imgUrl}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-24 aspect-[4/3] overflow-hidden bg-[#F5F2EA] transition-all duration-300 border shrink-0",
                  isActive
                    ? "border-[#A3927B] opacity-100 scale-[0.98]"
                    : "border-[#EAE5D9] opacity-55 hover:opacity-100"
                )}
              >
                <img
                  src={imgUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
