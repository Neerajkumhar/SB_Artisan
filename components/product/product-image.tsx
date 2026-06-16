import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import ProductBadge from "./product-badge";

interface ProductImageProps {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "square" | "landscape";
  isNew?: boolean;
  isFeatured?: boolean;
  isLoading?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (e: React.MouseEvent) => void;
  className?: string;
  isHovered?: boolean;
}

export default function ProductImage({
  src,
  alt,
  aspectRatio = "portrait",
  isNew,
  isFeatured,
  isLoading = false,
  isWishlisted = false,
  onWishlistToggle,
  className,
  isHovered = false,
}: ProductImageProps) {
  
  // Custom aspect ratio mapping for premium layout structures
  const aspectClass = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  if (isLoading) {
    return (
      <div className={cn("relative w-full overflow-hidden bg-[#F5F2EA] animate-pulse", aspectClass, className)}>
        {/* Subtle Shimmer Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#F5F2EA] group/img", aspectClass, className)}>
      {/* 1. PRODUCT IMAGE WITH HOVER ZOOM */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 1, 0.5, 1], // Custom slow bezier curve for elegant transition
        }}
        loading="lazy"
      />

      {/* Subtle overlay shading (restrained) */}
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none transition-opacity duration-500 group-hover/img:opacity-0" />

      {/* 2. ABSOLUTE BADGES (TOP-LEFT) */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {isNew && <ProductBadge type="new" />}
        {isFeatured && <ProductBadge type="featured" />}
      </div>

      {/* 3. SPEC PORTFOLIO / REGISTRY TRIGGER (TOP-RIGHT) */}
      {onWishlistToggle && (
        <motion.button
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#EAE5D9]/50 text-[#8C8273] hover:text-[#1A1A1A] hover:bg-white hover:border-[#1A1A1A]/40 transition-all duration-300"
          aria-label={isWishlisted ? "Remove from spec portfolio" : "Save to spec portfolio"}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-4 h-4 transition-colors duration-300", isWishlisted && "text-[#A3927B]")}
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
