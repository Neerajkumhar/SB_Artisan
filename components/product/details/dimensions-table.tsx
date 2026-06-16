import React, { useState } from "react";
import { cn } from "../../../lib/utils";

interface ProductDimensions {
  height: number;
  width: number;
  depth: number;
  unit: "cm" | "in";
}

interface DimensionsTableProps {
  dimensions: ProductDimensions;
  tags?: string[];
  materials?: string[];
  finishes?: string[];
  usage?: string;
  collection?: string;
}

export default function DimensionsTable({
  dimensions,
  tags = [],
  materials = [],
  finishes = [],
  usage = "",
  collection = "",
}: DimensionsTableProps) {
  const [unitMode, setUnitMode] = useState<"cm" | "in">("cm");

  const convertVal = (val: number, toUnit: "cm" | "in") => {
    if (toUnit === "cm") return `${val} cm`;
    // cm to inches conversion
    const inches = Math.round(val * 0.393701 * 10) / 10;
    return `${inches} in`;
  };

  // Determine seat height helper based on product categories
  const hasSeatHeight = tags.some((t) =>
    ["chair", "seating", "stool", "barstool", "lounger", "daybed"].includes(t.toLowerCase())
  );
  
  const getSeatHeight = () => {
    if (tags.some((t) => t.toLowerCase().includes("barstool"))) {
      return unitMode === "cm" ? "75 cm" : "29.5 in";
    }
    if (tags.some((t) => t.toLowerCase().includes("daybed"))) {
      return unitMode === "cm" ? "45 cm" : "17.7 in";
    }
    return unitMode === "cm" ? "46 cm" : "18.1 in";
  };

  return (
    <div className="space-y-4">
      {/* Header and Toggle */}
      <div className="flex justify-between items-center border-b border-[#F2EDE2] pb-3">
        <h3 className="font-serif text-lg font-light text-[#1A1A1A] tracking-wide">
          Technical Specifications
        </h3>
        
        {/* Toggle units switch */}
        <div className="flex bg-[#F5F2EA] p-0.5 border border-[#EAE5D9] rounded-sm">
          <button
            onClick={() => setUnitMode("cm")}
            className={cn(
              "text-[9px] uppercase tracking-wider px-2 py-1 transition-all rounded-sm font-medium",
              unitMode === "cm" ? "bg-[#1A1A1A] text-white" : "text-[#8C8273]"
            )}
          >
            Metric (cm)
          </button>
          <button
            onClick={() => setUnitMode("in")}
            className={cn(
              "text-[9px] uppercase tracking-wider px-2 py-1 transition-all rounded-sm font-medium",
              unitMode === "in" ? "bg-[#1A1A1A] text-white" : "text-[#8C8273]"
            )}
          >
            Imperial (in)
          </button>
        </div>
      </div>

      {/* Specification Table */}
      <div className="font-sans text-xs text-[#1A1A1A] divide-y divide-[#F2EDE2]/60">
        {collection && (
          <div className="grid grid-cols-2 py-2.5">
            <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Collection</span>
            <span className="font-light text-[#1A1A1A] font-semibold">{collection}</span>
          </div>
        )}
        <div className="grid grid-cols-2 py-2.5">
          <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Height</span>
          <span className="font-light">{convertVal(dimensions.height, unitMode)}</span>
        </div>
        <div className="grid grid-cols-2 py-2.5">
          <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Width</span>
          <span className="font-light">{convertVal(dimensions.width, unitMode)}</span>
        </div>
        <div className="grid grid-cols-2 py-2.5">
          <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Depth</span>
          <span className="font-light">{convertVal(dimensions.depth, unitMode)}</span>
        </div>
        {hasSeatHeight && (
          <div className="grid grid-cols-2 py-2.5">
            <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Seat Height</span>
            <span className="font-light">{getSeatHeight()}</span>
          </div>
        )}
        {materials && materials.length > 0 && (
          <div className="grid grid-cols-2 py-2.5">
            <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Materials</span>
            <span className="font-light">{materials.join(", ")}</span>
          </div>
        )}
        {finishes && finishes.length > 0 && (
          <div className="grid grid-cols-2 py-2.5">
            <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Finish & Colors</span>
            <span className="font-light">{finishes.join(", ")}</span>
          </div>
        )}
        {usage && (
          <div className="grid grid-cols-2 py-2.5">
            <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Usage Placements</span>
            <span className="font-light">{usage}</span>
          </div>
        )}
        <div className="grid grid-cols-2 py-2.5">
          <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Suitability</span>
          <span className="font-light text-[#8C8273]">Indoor / Covered Terrace</span>
        </div>
        <div className="grid grid-cols-2 py-2.5">
          <span className="font-medium text-[#8C8273] uppercase tracking-wider text-[10px]">Packaging Spec</span>
          <span className="font-light text-[#8C8273]">LCL/FCL Export-Ready Crated Packing</span>
        </div>
      </div>
    </div>
  );
}
