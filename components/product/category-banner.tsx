import React from "react";
import { cn } from "../../lib/utils";

interface CategoryBannerProps {
  title: string;
  description: string;
  backgroundImage: string;
  eyebrow?: string;
  className?: string;
}

export default function CategoryBanner({
  title,
  description,
  backgroundImage,
  eyebrow = "SHOWROOM CATEGORY",
  className,
}: CategoryBannerProps) {
  return (
    <div className={cn("relative w-full h-[55vh] min-h-[350px] md:h-[60vh] overflow-hidden flex items-center bg-[#1E1D1C] rounded-sm shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] border border-[#EAE5D9]/20", className)}>
      
      {/* 1. PARALLAX BACKDROP IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={`${title} Showroom Backdrop`}
          className="w-full h-full object-cover object-center scale-[1.03] opacity-50 hover:scale-[1.06] transition-transform duration-10000 ease-out"
        />
        {/* Soft golden and dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 md:from-black/90 md:via-black/70 md:to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent to-black/80 pointer-events-none" />
      </div>

      {/* 2. EDITORIAL TEXT CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-start space-y-4 md:space-y-6">
        
        <div className="space-y-2 md:space-y-3">
          {/* Eyebrow with centered gold separator */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#CBB593] select-none">
              {eyebrow}
            </span>
            <span className="h-[1px] w-8 bg-[#CBB593]/40" />
          </div>
          
          {/* Category Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide leading-tight">
            {title}
          </h1>
        </div>

        {/* Accent Bar */}
        <div className="h-[1.5px] w-16 bg-[#CBB593]" />

        {/* Philosophy Description */}
        <p className="font-sans text-xs sm:text-sm text-[#FAF8F2]/80 font-light leading-relaxed max-w-xl text-justify text-pretty">
          {description}
        </p>

        {/* Trade spec footer badge */}
        <div className="pt-2 select-none">
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#CBB593] bg-[#CBB593]/10 border border-[#CBB593]/30 px-3 py-1.5 rounded-sm">
            Export Grade / Commercial Specs Certified
          </span>
        </div>

      </div>
    </div>
  );
}
