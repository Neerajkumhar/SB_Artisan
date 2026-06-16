import React from "react";
import { Paragraph } from "../../ui";

interface ProductOverviewProps {
  title: string;
  category: string;
  subcategory: string;
  designer: string;
  price?: string;
  description: string;
}

export default function ProductOverview({
  title,
  category,
  subcategory,
  designer,
  price,
  description,
}: ProductOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Category Labels */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-medium">
          {category}
        </span>
        <span className="text-[#8C8273]/30 text-xs">/</span>
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C8273] font-light">
          {subcategory}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] leading-tight tracking-wide">
        {title}
      </h1>

      {/* Designer Credit */}
      <p className="font-sans italic text-sm text-[#8C8273] font-light -mt-2">
        Designed by {designer}
      </p>

      {/* Price / Trade Label */}
      {price && (
        <div className="font-sans text-xl text-[#1A1A1A] font-light pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-[#8C8273] text-xs uppercase tracking-widest font-sans font-medium">B2B Base Estimate:</span>
          <div className="flex items-baseline gap-3 select-none">
            <span className="text-2xl font-light">{price}</span>
            <span className="text-[9px] text-[#8C8273] uppercase tracking-[0.2em] font-medium bg-[#F5F2EA] px-2.5 py-1 border border-[#EAE5D9] rounded-sm">
              Container Load Trade Rate
            </span>
          </div>
        </div>
      )}

      {/* Editorial Summary */}
      <div className="pt-4 border-t border-[#F2EDE2]">
        <Paragraph variant="md" className="text-[#1A1A1A] font-normal leading-relaxed text-justify">
          {description}
        </Paragraph>
      </div>
    </div>
  );
}
