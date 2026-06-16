import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_DATA, NavItem } from "./nav-data";
import Heading from "../ui/Heading";
import PrimaryButton from "../ui/PrimaryButton";

export interface MobileMenuProps {
  /**
   * Boolean flag to control showing/hiding the drawer panel.
   */
  isOpen: boolean;

  /**
   * Callback to close the menu.
   */
  onClose: () => void;
}

// Drawer animation variants
const drawerVariants = {
  closed: { x: "100%", transition: { type: "tween", duration: 0.35, ease: "easeInOut" } },
  open: { x: 0, transition: { type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// Backdrop fade variants
const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.25 } },
  open: { opacity: 1, transition: { duration: 0.35 } },
};

/**
 * Mobile navigation slide-out drawer panel.
 * Incorporates accordion sub-sections for items containing mega menu configs.
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Store expanded item index key mapping to handle accordions
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP TRANSPARENT MASK */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-[98] cursor-pointer"
            aria-hidden="true"
          />

          {/* 2. SLIDE-OUT PANEL */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[400px] bg-[#FDFCF7] border-l border-[#EAE5D9] shadow-2xl z-[99] flex flex-col overflow-hidden"
          >
            {/* Header: Close Button and Label */}
            <div className="flex items-center justify-between p-6 border-b border-[#EAE5D9]">
              <Heading variant="sm" weight="normal" className="tracking-widest uppercase">
                Menu
              </Heading>
              
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="h-8 w-8 flex items-center justify-center text-[#5A5750] hover:text-black transition-colors focus:outline-none"
              >
                {/* SVG Close Cross */}
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* List links container */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {NAVIGATION_DATA.map((item, idx) => {
                const hasMega = !!item.megaMenu;
                const isExpanded = expandedIndex === idx;

                return (
                  <div key={idx} className="border-b border-[#F2EDE2] pb-4 space-y-3">
                    {hasMega ? (
                      // Accordion Trigger Link
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="w-full flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.2em] font-light text-[#1A1A1A] py-1 select-none focus:outline-none"
                      >
                        <span>{item.label}</span>
                        {/* Angle indicator SVG */}
                        <svg
                          className={`w-3.5 h-3.5 transform transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ) : (
                      // Standard link
                      <Link
                        to={item.href || "/"}
                        onClick={onClose}
                        className="block font-sans text-xs uppercase tracking-[0.2em] font-light text-[#1A1A1A] py-1"
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Accordion panel links */}
                    <AnimatePresence initial={false}>
                      {hasMega && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pl-4 space-y-4 pt-2"
                        >
                          {/* Mobile shortcut to view the whole section */}
                          <div className="pb-2 border-b border-[#F2EDE2]/60 mr-4">
                            <Link
                              to={item.href || "/"}
                              onClick={onClose}
                              className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#8C6D4F] hover:text-black font-semibold transition-colors flex items-center gap-1"
                            >
                              Explore All {item.label} &rarr;
                            </Link>
                          </div>
                          {item.megaMenu!.columns.map((column, colIdx) => (
                            <div key={colIdx} className="space-y-2">
                              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8C887E] block">
                                {column.title}
                              </span>
                              <ul className="space-y-2 pl-2">
                                {column.items.map((sublink, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      to={sublink.href}
                                      onClick={onClose}
                                      className="font-sans text-[11px] text-[#5A5750] hover:text-black transition-colors block py-0.5"
                                    >
                                      {sublink.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Footer layout */}
            <div className="p-6 border-t border-[#EAE5D9] bg-[#F7F5EE] space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C887E] block text-center">
                Private Showroom Access
              </span>
              <PrimaryButton size="sm" as={Link} to="/bespoke-services" onClick={onClose} className="w-full text-center block">
                Book Consultation
              </PrimaryButton>
              <a
                href="https://wa.me/919999999999?text=Hello%20SB%20Artisan%2C%20I%20would%20like%20to%20discuss%20a%20hospitality%20furniture%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-2.5 bg-transparent border border-[#EAE5D9] hover:bg-[#F5F2EA] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                title="WhatsApp Trade Desk"
              >
                <svg className="w-3.5 h-3.5 text-[#8C6D4F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.11 1.867 11.47 1.867c-5.436 0-9.86 4.42-9.864 9.864 0 1.685.443 3.329 1.288 4.776L1.879 21.08l4.768-1.256c.001 0 .001 0 0 0zm11.758-5.321c-.266-.134-1.579-.78-1.823-.867-.243-.088-.42-.132-.596.133-.176.265-.681.861-.836 1.039-.153.176-.308.199-.575.066-.267-.134-1.129-.417-2.15-1.328-.793-.708-1.329-1.582-1.485-1.848-.156-.266-.017-.409.117-.541.12-.12.267-.309.4-.464.133-.155.177-.265.267-.442.089-.176.044-.331-.022-.464-.066-.133-.596-1.436-.816-1.966-.215-.518-.453-.448-.623-.456-.16-.008-.344-.01-.528-.01-.184 0-.485.069-.739.344-.254.275-.97.949-.97 2.314 0 1.365.992 2.68 1.114 2.846.122.166 1.953 2.983 4.73 4.181.661.285 1.176.455 1.579.583.664.211 1.269.181 1.747.11.533-.08 1.579-.646 1.8-.1237.221-.592.221-1.101.155-1.192-.066-.091-.243-.135-.508-.269z" />
                </svg>
                WhatsApp Inquiry
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
