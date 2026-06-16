import React from "react";
import { cn } from "../../lib/utils";

interface SubCategory {
  name: string;
  slug: string;
  image: string;
}

interface SubCategoryGridProps {
  subcategories: SubCategory[];
  activeSubcategory: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export default function SubCategoryGrid({
  subcategories,
  activeSubcategory,
  onSelect,
  className,
}: SubCategoryGridProps) {
  return (
    <div className={cn("space-y-4 select-none", className)}>
      {/* Small Section title */}
      <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8273] font-semibold">
        Refine by Classification
      </h3>
      
      {/* Scrollable list grid */}
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2 pt-1">
        
        {/* "All" classification card */}
        <button
          onClick={() => onSelect("all")}
          className="flex flex-col items-center gap-3 group focus:outline-none shrink-0"
        >
          <div className={cn(
            "w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500",
            activeSubcategory === "all"
              ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-md scale-105"
              : "border-[#EAE5D9] bg-[#FAF8F2] text-[#8C8273] group-hover:border-[#1A1A1A]/50 group-hover:text-black"
          )}>
            <span className="text-[10px] uppercase tracking-widest font-sans font-light">
              All
            </span>
          </div>
          <span className={cn(
            "text-[9px] uppercase tracking-[0.2em] font-sans transition-colors",
            activeSubcategory === "all" ? "text-[#1A1A1A] font-semibold" : "text-[#8C8273] group-hover:text-black"
          )}>
            All Classes
          </span>
        </button>

        {/* Dynamic subcategory cards */}
        {subcategories.map((sub) => {
          const isActive = activeSubcategory === sub.slug;
          
          return (
            <button
              key={sub.slug}
              onClick={() => onSelect(sub.slug)}
              className="flex flex-col items-center gap-3 group focus:outline-none shrink-0"
            >
              {/* Circle Thumbnail */}
              <div className={cn(
                "w-16 h-16 rounded-full overflow-hidden border p-[2px] transition-all duration-500 relative",
                isActive
                  ? "border-[#1A1A1A] shadow-md scale-105"
                  : "border-[#EAE5D9] group-hover:border-[#1A1A1A]/40"
              )}>
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F5F2EA]">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle active tint */}
                  {isActive && <div className="absolute inset-0 bg-[#8C6D4F]/15 rounded-full" />}
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-[9px] uppercase tracking-[0.2em] font-sans transition-colors",
                isActive ? "text-[#1A1A1A] font-semibold" : "text-[#8C8273] group-hover:text-black"
              )}>
                {sub.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}
