import * as React from "react";
import { cn } from "../../lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button sizes.
   * - 'sm': Compact layout circle.
   * - 'md': Standard layout circle.
   * - 'lg': Prominent layout circle.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Displays an elegant loading spinner and disables user interaction.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Aria label describing the action for accessibility (critical since there is no text).
   */
  "aria-label": string;
}

/**
 * Premium circular button for icon-only actions (e.g. search, close, bag, sliding controls).
 * Supports loading states and key focus indicators.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = "md",
      isLoading = false,
      disabled,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(
          // Circular setup & transitions
          "inline-flex items-center justify-center rounded-full transition-all duration-300 ease-in-out outline-none select-none border shrink-0",
          
          // Color states (outlined gold border, fills into solid dark charcoal on hover)
          "bg-transparent text-[#1A1A1A] border-[#C5BFB2] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-[#FDFCF7]",
          
          // Focus state
          "focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF7]",
          
          // Disabled/Loading styles
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[#C5BFB2] disabled:hover:text-[#1A1A1A]",
          
          // Sizes
          {
            "h-9 w-9 p-2": size === "sm",
            "h-12 w-12 p-3": size === "md",
            "h-15 w-15 p-4": size === "lg",
          },
          
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <span className="inline-flex shrink-0 items-center justify-center text-current">
            {children}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
