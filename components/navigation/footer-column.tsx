import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export interface FooterColumnLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links?: FooterColumnLink[];
  children?: React.ReactNode;
  collapsibleMobile?: boolean;
  className?: string;
}

export default function FooterColumn({
  title,
  links,
  children,
  collapsibleMobile = true,
  className,
}: FooterColumnProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (collapsibleMobile) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {/* Column Title with mobile toggle support */}
      <button
        onClick={toggleOpen}
        disabled={!collapsibleMobile}
        className={cn(
          "w-full flex items-center justify-between text-left focus:outline-none md:pointer-events-none md:cursor-default"
        )}
      >
        <h4 className="font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#EAE5D9]">
          {title}
        </h4>
        
        {/* Chevron Icon - Visible only on mobile if collapsible */}
        {collapsibleMobile && (
          <div className="md:hidden text-[#8C8273]">
            <motion.svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <polyline points="4 6 8 10 12 6" />
            </motion.svg>
          </div>
        )}
      </button>

      {/* Accordion Content for Mobile, standard list for Desktop */}
      <div className="hidden md:block">
        {links ? (
          <ul className="space-y-3.5">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.href}
                  className="font-sans text-[13px] text-[#8C8273] hover:text-[#EAE5D9] transition-colors duration-300 font-light tracking-wide inline-block relative group"
                >
                  {link.label}
                  {/* Subtle underline hover effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EAE5D9] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>

      {collapsibleMobile && (
        <div className="md:hidden">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-4 border-b border-[#2C2B29]/30">
                  {links ? (
                    <ul className="space-y-3">
                      {links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            to={link.href}
                            className="font-sans text-xs text-[#8C8273] hover:text-[#EAE5D9] transition-colors duration-300 font-light tracking-wide inline-block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    children
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
