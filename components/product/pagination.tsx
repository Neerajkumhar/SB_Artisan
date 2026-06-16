import React from "react";
import { cn } from "../../lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Format single digit numbers to double digits for luxury editorial feel (e.g. 01 instead of 1)
  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={cn("flex items-center justify-center gap-6 select-none font-sans text-xs border-t border-[#F2EDE2] pt-8 mt-16", className)}>
      
      {/* 1. PREVIOUS PAGE BUTTON */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-2 py-2 px-3 transition-colors duration-300 focus:outline-none rounded-sm border border-transparent",
          currentPage === 1
            ? "text-[#8C8273]/30 cursor-not-allowed"
            : "text-[#8C8273] hover:text-black hover:border-[#EAE5D9] cursor-pointer"
        )}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[9px] uppercase tracking-[0.2em] font-light">Prev</span>
      </button>

      {/* 2. PAGE RANGE COUNTER */}
      <div className="flex items-center gap-2.5 font-light text-[#8C8273]">
        <span className="text-[#1A1A1A] font-medium">{formatNum(currentPage)}</span>
        <span className="text-[#8C8273]/40">/</span>
        <span>{formatNum(totalPages)}</span>
      </div>

      {/* 3. NEXT PAGE BUTTON */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-2 py-2 px-3 transition-colors duration-300 focus:outline-none rounded-sm border border-transparent",
          currentPage === totalPages
            ? "text-[#8C8273]/30 cursor-not-allowed"
            : "text-[#8C8273] hover:text-black hover:border-[#EAE5D9] cursor-pointer"
        )}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-light">Next</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </div>
  );
}
