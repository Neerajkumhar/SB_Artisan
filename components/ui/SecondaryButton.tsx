import * as React from "react";
import { cn } from "../../lib/utils";

export interface SecondaryButtonProps<T extends React.ElementType = "button"> {
  /**
   * The HTML element or React component to render the button as.
   * @default "button"
   */
  as?: T;

  /**
   * Button sizes.
   * - 'sm': Compact action button for tight layouts (e.g. table actions, filters).
   * - 'md': Standard action button.
   * - 'lg': Generous action button for primary hero headers.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Shape variants for luxury framing.
   * - 'square': Sharp 90-degree corners (Classic luxury style, e.g. Wisteria).
   * - 'rounded': Subtle, slight border radius (Modern luxury style).
   * - 'pill': Fully rounded capsule button.
   * @default "square"
   */
  shape?: "square" | "rounded" | "pill";

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
   * Additional custom styling classes.
   */
  className?: string;

  /**
   * Node children.
   */
  children?: React.ReactNode;
}

type PolymorphicSecondaryButtonProps<T extends React.ElementType> = SecondaryButtonProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof SecondaryButtonProps<T>>;

/**
 * Premium outlined button with elegant fill animations.
 * Features light warm borders and transitions into charcoal fill states on hover.
 */
const SecondaryButton = React.forwardRef(
  <T extends React.ElementType = "button">(
    {
      as,
      className,
      size = "md",
      shape = "square",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    }: PolymorphicSecondaryButtonProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || "button";
    const isDisabled = (props as any).disabled || isLoading;

    return (
      <Component
        ref={ref}
        disabled={Component === "button" ? isDisabled : undefined}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(
          // Base reset & typography (luxury-tier tracking-widest, uppercase, light font-weight)
          "inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.2em] font-light transition-all duration-300 ease-in-out outline-none select-none",
          
          // Color system: Light beige/gold border, fills to dark charcoal on hover
          "bg-transparent text-[#1A1A1A] border border-[#C5BFB2] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-[#FDFCF7]",
          
          // Focus state: Subtle ring offset
          "focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF7]",
          
          // Disabled/Loading styles
          isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:border-[#C5BFB2] hover:text-[#1A1A1A]",
          
          // Size variants
          {
            "py-2.5 px-5 text-[10px] tracking-[0.18em]": size === "sm",
            "py-3.5 px-8 text-xs": size === "md",
            "py-4.5 px-10 text-sm tracking-[0.22em]": size === "lg",
          },
          
          // Shape variants
          {
            "rounded-none": shape === "square",
            "rounded-md": shape === "rounded",
            "rounded-full": shape === "pill",
          },
          
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-3.5 w-3.5 text-current"
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

        {/* Left Icon (Hidden during loading to prevent clutter) */}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex shrink-0 items-center justify-center text-current">
            {leftIcon}
          </span>
        )}

        {/* Button Content */}
        <span className="relative translate-y-[0.5px]">{children}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex shrink-0 items-center justify-center text-current">
            {rightIcon}
          </span>
        )}
      </Component>
    );
  }
);

(SecondaryButton as any).displayName = "SecondaryButton";

export default SecondaryButton;
export type { PolymorphicSecondaryButtonProps };
