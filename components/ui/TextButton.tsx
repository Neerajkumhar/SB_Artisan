import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextButtonProps<T extends React.ElementType = "button"> {
  /**
   * The HTML element or React component to render the button as (e.g. 'a', 'button').
   * @default "button"
   */
  as?: T;

  /**
   * Button sizes.
   * - 'sm': Small link text.
   * - 'md': Standard link text.
   * - 'lg': Prominent link text.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Displays an elegant loading spinner and disables user interaction.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Optional icon to render before the text.
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon to render after the text.
   */
  rightIcon?: React.ReactNode;

  /**
   * Additional styling classes.
   */
  className?: string;

  /**
   * Node children.
   */
  children?: React.ReactNode;
}

type PolymorphicTextButtonProps<T extends React.ElementType> = TextButtonProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof TextButtonProps<T>>;

/**
 * Premium polymorphic text link action with custom sliding underline effects.
 * Inspired by high-end design catalogs, it replaces standard blue links with minimalist text.
 */
const TextButton = React.forwardRef(
  <T extends React.ElementType = "button">(
    {
      as,
      className,
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    }: PolymorphicTextButtonProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || "button";

    // If disabled or loading, prevent clicking dynamically
    const isDisabled = (props as any).disabled || isLoading;

    return (
      <Component
        ref={ref}
        {...props}
        disabled={Component === "button" ? isDisabled : undefined}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(
          // Base resets, layout, and transitions
          "inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-light transition-all duration-300 ease-in-out outline-none select-none relative group",
          
          // Transparent backgrounds, dark charcoal color
          "bg-transparent text-[#1A1A1A] py-1 border-none",
          
          // Focus state
          "focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF7]",
          
          // Disabled/Loading styles
          isDisabled && "opacity-50 cursor-not-allowed",
          
          // Sizes
          {
            "text-[10px] tracking-[0.18em]": size === "sm",
            "text-xs": size === "md",
            "text-sm tracking-[0.22em]": size === "lg",
          },
          
          className
        )}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3 w-3 text-current"
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
        )}

        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="mr-1.5 inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}

        {/* Text Content */}
        <span className="relative translate-y-[0.5px]">{children}</span>

        {/* Underline Slide Animation (Luxury signature styling) */}
        <span 
          className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1A1A1A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" 
          aria-hidden="true"
        />

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="ml-1.5 inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </Component>
    );
  }
);

(TextButton as any).displayName = "TextButton";

export default TextButton;
export type { PolymorphicTextButtonProps };
