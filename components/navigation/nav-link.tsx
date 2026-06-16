import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The destination URL path.
   */
  href: string;

  /**
   * Label text.
   */
  children: React.ReactNode;

  /**
   * Is the link currently active (matches router path).
   * @default false
   */
  isActive?: boolean;
}

/**
 * Premium navigation link with Framer Motion layout transitions.
 * Implements a custom sliding underline indicator that transitions on hover and active states.
 */
export default function NavLink({
  href,
  children,
  isActive = false,
  className,
  ...props
}: NavLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        // Luxury typography: Uppercase, spacing-widest, light weight sans-serif
        "relative py-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-light text-[#5A5750] hover:text-[#1A1A1A] transition-colors duration-300 outline-none select-none group inline-flex items-center",
        isActive && "text-[#1A1A1A]",
        className
      )}
      {...(props as any)}
    >
      <span className="relative translate-y-[0.5px]">{children}</span>

      {/* Underline indicators */}
      {isActive ? (
        // Persistent Framer Motion underline layout transition
        <motion.span
          layoutId="activeNavUnderline"
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A1A1A]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : (
        // Hover underline sliding transition
        <span
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1A1A1A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
