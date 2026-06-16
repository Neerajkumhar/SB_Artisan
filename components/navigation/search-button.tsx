"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import IconButton from "../ui/IconButton";

export interface SearchButtonProps {
  /**
   * Additional styling classes.
   */
  className?: string;
}

/**
 * Expandable search trigger utilizing Framer Motion slide animations.
 * Smoothly transitions from a circular icon button to an active search bar.
 */
export default function SearchButton({ className }: SearchButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input automatically when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Collapse search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleToggle = () => {
    if (isExpanded && query.trim()) {
      // Execute search query
      console.log("Searching for:", query);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      console.log("Searching for:", query);
      setIsExpanded(false);
    } else if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center relative h-12 bg-transparent", className)}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.input
            ref={inputRef}
            initial={{ width: 0, opacity: 0, paddingRight: 0 }}
            animate={{
              width: 220,
              opacity: 1,
              paddingRight: 48, // Space for the floating button inside
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              width: 0,
              opacity: 0,
              paddingRight: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            type="text"
            placeholder="Search Atelier..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-full bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#8C887E] font-sans font-light focus:outline-none border-b border-[#C5BFB2] pr-12 w-0 py-1"
          />
        )}
      </AnimatePresence>

      <IconButton
        size="sm"
        aria-label="Toggle search input"
        onClick={handleToggle}
        className={cn(
          "z-10 bg-transparent transition-all border-none hover:bg-transparent text-[#5A5750] hover:text-black",
          isExpanded && "absolute right-0 text-[#1A1A1A]"
        )}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1" />
          <path d="M10.5 10.5l4.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </IconButton>
    </div>
  );
}
