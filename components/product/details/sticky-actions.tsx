import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

interface StickyActionsProps {
  image: string;
  title: string;
  price?: string;
  selectedFinish: string;
  onInquireClick: () => void;
}

export default function StickyActions({
  image,
  title,
  price,
  selectedFinish,
  onInquireClick,
}: StickyActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello SB Artisan, I am interested in seeking a trade quote for the "${title}" in the "${selectedFinish}" finish for a hospitality project.`
    );
    // WhatsApp API redirect link
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full bg-[#FAF8F2] border-t border-[#EAE5D9] py-3.5 px-6 z-[150] shadow-[0_-10px_30px_rgba(26,26,26,0.04)] transition-all duration-500 ease-out transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Left Side: Product Preview (Hidden on small mobile viewports) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden bg-[#F5F2EA] border border-[#EAE5D9]">
            <img src={image} alt="preview" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-light text-[#1A1A1A] leading-tight">
              {title}
            </h4>
            <span className="block text-[9px] uppercase tracking-wider text-[#8C8273] font-sans font-light mt-0.5">
              Finish: {selectedFinish}
            </span>
          </div>
        </div>

        {/* Right Side: Primary Call-to-actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* WhatsApp Direct Consult */}
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 border border-[#EAE5D9] bg-[#FAF8F2] hover:bg-[#F5F2EA] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm"
          >
            {/* Elegant wood/brass-styled WhatsApp logo */}
            <svg className="w-3.5 h-3.5 text-[#8C6D4F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
            </svg>
            WhatsApp Consult
          </button>

          {/* Quick Inquiry desk */}
          <button
            onClick={onInquireClick}
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#1A1A1A] hover:bg-[#8C6D4F] text-white text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-all duration-300 rounded-sm"
          >
            Discuss Project
          </button>
        </div>

      </div>
    </div>
  );
}
