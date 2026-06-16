import React from "react";
import { cn } from "../../lib/utils";

interface ProductInfoProps {
  title: string;
  category: string;
  designer?: string;
  description?: string;
  price?: string;
  isLoading?: boolean;
  alignment?: "left" | "center";
  className?: string;
}

export default function ProductInfo({
  title,
  category,
  designer,
  description,
  price,
  isLoading = false,
  alignment = "left",
  className,
}: ProductInfoProps) {
  const isCentered = alignment === "center";

  if (isLoading) {
    return (
      <div
        className={cn(
          "space-y-3.5",
          isCentered ? "flex flex-col items-center text-center" : "text-left",
          className
        )}
      >
        {/* Category skeleton */}
        <div className="h-2.5 bg-[#F5F2EA] w-1/4 rounded-sm animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-5 bg-[#F5F2EA] w-3/4 rounded-sm animate-pulse" />
        
        {/* Designer skeleton */}
        <div className="h-3 bg-[#F5F2EA] w-1/3 rounded-sm animate-pulse" />
        
        {/* Description skeleton */}
        <div className="space-y-1.5 w-full">
          <div className="h-3 bg-[#F5F2EA] w-full rounded-sm animate-pulse" />
          <div className="h-3 bg-[#F5F2EA] w-5/6 rounded-sm animate-pulse" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-4 bg-[#F5F2EA] w-1/5 rounded-sm animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-2 md:space-y-3",
        isCentered ? "text-center" : "text-left",
        className
      )}
    >
      {/* Category */}
      <span className="block text-[10px] tracking-[0.2em] font-sans text-[#8C8273] uppercase font-light">
        {category}
      </span>

      {/* Title */}
      <h3 className="font-serif text-lg md:text-xl font-light text-[#1A1A1A] leading-snug tracking-wide">
        {title}
      </h3>

      {/* Designer */}
      {designer && (
        <p className="font-sans italic text-xs text-[#8C8273] font-light -mt-1">
          {designer}
        </p>
      )}

      {/* Short Description */}
      {description && (
        <p className="font-sans text-xs text-[#6E6B64] font-light leading-relaxed text-pretty max-w-md">
          {description}
        </p>
      )}

      {/* Optional Price */}
      {price && (
        <div className="font-sans text-xs text-[#8C8273] font-light pt-1 flex items-baseline gap-1 select-none">
          <span>Est. Trade Rate:</span>
          <span className="text-sm text-[#1A1A1A] font-normal">{price}</span>
        </div>
      )}
    </div>
  );
}
