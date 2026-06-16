import React from "react";
import { cn } from "../../lib/utils";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  className?: string;
}

export default function ProductSort({
  sortBy,
  onSortChange,
  className,
}: ProductSortProps) {
  return (
    <div className={cn("space-y-3.5 select-none w-full sm:w-48", className)}>
      <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8273] font-semibold">
        Sort Registry
      </h4>

      <div className="relative border-b border-[#2C2B29] pb-1 flex items-center">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-transparent text-xs text-[#1A1A1A] focus:outline-none font-sans font-light py-1 pr-6 cursor-pointer rounded-none appearance-none"
        >
          <option value="featured">Featured Collection</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Stature: A to Z</option>
          <option value="name-desc">Stature: Z to A</option>
        </select>
        
        {/* Custom gold accent dropdown arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C6D4F]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
