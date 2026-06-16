import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { MegaMenuConfig } from "./nav-data";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TextButton from "../ui/TextButton";

export interface MegaMenuProps {
  /**
   * Mega menu details (columns, titles, and promo banners).
   */
  config: MegaMenuConfig;

  /**
   * Callback triggered when mouse leaves the mega menu pane.
   */
  onMouseLeave?: () => void;
}

// Framer Motion animation settings
const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out cubic
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

/**
 * Premium MegaMenu overlay that slides down below the main navigation bar.
 * Features a multi-column grid layout, organic linen tones, and Framer Motion entries.
 */
export default function MegaMenu({ config, onMouseLeave }: MegaMenuProps) {
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-[#FDFCF7] border-b border-[#EAE5D9] shadow-[0_20px_40px_rgba(0,0,0,0.03)] z-50 overflow-hidden"
    >
      {/* Dynamic default container aligned to master page grid bounds */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* 1. LINKS GRID SECTION */}
          <div 
            className={config.promo ? "col-span-12 lg:col-span-8" : "col-span-12"}
          >
            <div 
              className={cn(
                "grid grid-cols-1 gap-8",
                config.columns.length === 2 && "md:grid-cols-2",
                config.columns.length === 3 && "md:grid-cols-3",
                config.columns.length >= 4 && "md:grid-cols-4"
              )}
              role="menu"
              aria-label="Subcategories Menu"
            >
              {config.columns.map((column, index) => (
                <div key={index} className="space-y-6" role="none">
                  {/* Subtle grey uppercase column title */}
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C887E] font-normal block mb-4">
                    {column.title}
                  </span>
                  
                  {/* List of subcategory links */}
                  <ul className="space-y-4" role="none">
                    {column.items.map((item, itemIdx) => (
                      <li key={itemIdx} role="none">
                        <Link
                          to={item.href}
                          role="menuitem"
                          className="font-sans text-xs text-[#5A5750] hover:text-black transition-colors duration-200 font-light block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. PROMO BANNER SECTION (if config defines one) */}
          {config.promo && (
            <div className="col-span-12 lg:col-span-4 border-l border-[#F2EDE2] lg:pl-12 space-y-6">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#F7F5EE] relative group rounded-sm">
                <div className="absolute inset-0 bg-black/5 z-10 transition-opacity group-hover:opacity-0" />
                <img
                  src={config.promo.image}
                  alt={config.promo.title}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-[1200ms] ease-out"
                />
              </div>
              
              <div className="space-y-3">
                <Heading variant="xs" weight="normal" className="tracking-wide">
                  {config.promo.title}
                </Heading>
                <div>
                  <TextButton size="sm" as={Link} to={config.promo.href}>
                    {config.promo.linkText}
                  </TextButton>
                </div>
              </div>
            </div>
          )}

        </div>
      </Container>
    </motion.div>
  );
}
