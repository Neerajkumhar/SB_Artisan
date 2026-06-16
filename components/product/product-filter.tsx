import React from "react";
import { cn } from "../../lib/utils";

interface ProductFilterProps {
  materials: string[];
  activeMaterial: string;
  onMaterialChange: (material: string) => void;
  onClear: () => void;
  className?: string;
}

export default function ProductFilter({
  materials,
  activeMaterial,
  onMaterialChange,
  onClear,
  className,
}: ProductFilterProps) {
  const hasActiveFilters = activeMaterial && activeMaterial !== "all";

  return (
    <div className={cn("space-y-3.5 select-none", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8273] font-semibold">
          Material & Craft
        </h4>
        
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-[9px] uppercase tracking-wider text-[#8C6D4F] hover:text-[#1A1A1A] transition-colors font-sans font-light underline focus:outline-none"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* "All Materials" Button */}
        <button
          onClick={() => onMaterialChange("all")}
          className={cn(
            "text-[9px] uppercase tracking-widest font-sans py-2 px-3 border transition-all duration-300 rounded-sm focus:outline-none",
            !activeMaterial || activeMaterial === "all"
              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
              : "bg-transparent text-[#8C8273] border-[#EAE5D9] hover:border-[#8C8273] hover:text-black"
          )}
        >
          All Mediums
        </button>

        {/* Dynamic Material Pills */}
        {materials.map((material) => {
          const isActive = activeMaterial === material;
          
          return (
            <button
              key={material}
              onClick={() => onMaterialChange(material)}
              className={cn(
                "text-[9px] uppercase tracking-widest font-sans py-2 px-3 border transition-all duration-300 rounded-sm focus:outline-none",
                isActive
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-transparent text-[#8C8273] border-[#EAE5D9] hover:border-[#8C8273] hover:text-black"
              )}
            >
              {material}
            </button>
          );
        })}
      </div>
    </div>
  );
}
