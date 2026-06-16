import * as React from "react";
import { cn } from "../../lib/utils";

export interface HeadingProps<T extends React.ElementType = "h1"> {
  /**
   * The HTML element or React component to render the heading as.
   * Defaults dynamically depending on the variant if not specified.
   */
  as?: T;

  /**
   * Size variants optimized for editorial spacing and proportions.
   * - 'hero': Large-scale typography for primary page headers (e.g., 90px+).
   * - 'display': Premium size for section banners or landing heroes.
   * - 'xl': Section headers or prominent call-to-actions.
   * - 'lg': Subsection headings.
   * - 'md': Card headings or mid-level blocks.
   * - 'sm': Small titles or list item groups.
   */
  variant?: "hero" | "display" | "xl" | "lg" | "md" | "sm";

  /**
   * Font weight options. Luxury serif typography shines in light or normal weights.
   * @default "light"
   */
  weight?: "light" | "normal" | "medium" | "semibold";

  /**
   * Custom CSS styling classes to append.
   */
  className?: string;

  /**
   * Node children to render inside the heading.
   */
  children?: React.ReactNode;
}

type PolymorphicHeadingProps<T extends React.ElementType> = HeadingProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof HeadingProps<T>>;

// Helper to determine the standard semantic HTML element based on size variant
const getSemanticElement = (variant: string): React.ElementType => {
  switch (variant) {
    case "hero":
    case "display":
      return "h1";
    case "xl":
    case "lg":
      return "h2";
    case "md":
    case "sm":
    default:
      return "h3";
  }
};

/**
 * Premium typography Heading component inspired by high-end serif layouts (e.g. Playfair Display, Bodoni).
 * Features sharp visual hierarchies, tight display tracking, and customizable weights.
 */
const Heading = React.forwardRef(
  <T extends React.ElementType = "h1">(
    {
      as,
      variant = "xl",
      weight = "light",
      className,
      children,
      ...props
    }: PolymorphicHeadingProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || getSemanticElement(variant);

    return (
      <Component
        ref={ref}
        className={cn(
          "font-serif tracking-tight text-[#1A1A1A] transition-colors duration-300",
          // Font sizes (Responsive Scaling)
          {
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]": variant === "hero",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]": variant === "display",
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15]": variant === "xl",
            "text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.2]": variant === "lg",
            "text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.25]": variant === "md",
            "text-base sm:text-lg md:text-xl leading-[1.3]": variant === "sm",
          },
          // Font weights
          {
            "font-light": weight === "light",
            "font-normal": weight === "normal",
            "font-medium": weight === "medium",
            "font-semibold": weight === "semibold",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
export type { PolymorphicHeadingProps };
