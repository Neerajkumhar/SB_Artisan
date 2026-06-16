import React from "react";
import { cn } from "../../lib/utils";

interface ProductBadgeProps {
  type: "new" | "featured" | "custom";
  label?: string;
  className?: string;
}

export default function ProductBadge({
  type,
  label,
  className,
}: ProductBadgeProps) {
  // Establish elegant editorial styling for labels
  const getBadgeConfig = () => {
    switch (type) {
      case "new":
        return {
          text: label || "New Edition",
          styles: "bg-[#F5F2EA] text-[#6E6B64] border border-[#E8E2D5] font-sans",
        };
      case "featured":
        return {
          text: label || "Featured Object",
          styles: "bg-[#1A1A1A]/95 text-[#EAE5D9] border border-[#2D2B28]/30 font-sans",
        };
      default:
        return {
          text: label || "",
          styles: "bg-transparent text-[#1A1A1A] border border-[#1A1A1A] font-sans",
        };
    }
  };

  const config = getBadgeConfig();

  if (!config.text) return null;

  return (
    <span
      className={cn(
        "inline-block text-[9px] uppercase tracking-[0.25em] font-medium px-2.5 py-1 rounded-sm select-none",
        config.styles,
        className
      )}
    >
      {config.text}
    </span>
  );
}
