import React from "react";
import { cn } from "../../lib/utils";
import TextButton from "../ui/TextButton";

interface ProductActionsProps {
  onInquire?: (e: React.MouseEvent) => void;
  onWhatsApp?: (e: React.MouseEvent) => void;
  onTearSheet?: (e: React.MouseEvent) => void;
  inquireLabel?: string;
  whatsAppLabel?: string;
  tearSheetLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export default function ProductActions({
  onInquire,
  onWhatsApp,
  onTearSheet,
  inquireLabel = "Request Pricing",
  whatsAppLabel = "WhatsApp Inquiry",
  tearSheetLabel = "Request Spec Sheet",
  isLoading = false,
  className,
}: ProductActionsProps) {
  
  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-6 pt-1", className)}>
        {/* Actions loading placeholders */}
        <div className="h-4 bg-[#F5F2EA] w-24 rounded-sm animate-pulse" />
        <div className="h-4 bg-[#F5F2EA] w-28 rounded-sm animate-pulse" />
      </div>
    );
  }

  // Arrow icons for premium directional action links
  const ArrowRight = () => (
    <svg className="w-3 h-3 transition-transform duration-300" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // WhatsApp icon for direct instant consult
  const WhatsAppIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#8C6D4F] group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
    </svg>
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 select-none", className)}>
      {/* 1. PRIMARY INQUIRY ACTION */}
      {onInquire && (
        <TextButton
          size="sm"
          onClick={onInquire}
          rightIcon={<ArrowRight />}
          className="text-[#1A1A1A] hover:text-[#8C8273]"
        >
          {inquireLabel}
        </TextButton>
      )}

      {/* 2. INSTANT WHATSAPP DIRECT ACTION */}
      {onWhatsApp && (
        <TextButton
          size="sm"
          onClick={onWhatsApp}
          leftIcon={<WhatsAppIcon />}
          className="text-[#8C6D4F] hover:text-black group"
        >
          {whatsAppLabel}
        </TextButton>
      )}

      {/* 3. OPTIONAL SPEC SHEET / TEAR SHEET ACTION */}
      {onTearSheet && (
        <TextButton
          size="sm"
          onClick={onTearSheet}
          className="text-[#8C8273] hover:text-[#1A1A1A]"
        >
          {tearSheetLabel}
        </TextButton>
      )}
    </div>
  );
}
