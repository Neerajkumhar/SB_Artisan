import * as React from "react";
import { cn } from "../../lib/utils";

export interface SubHeadingProps<T extends React.ElementType = "h3"> {
  /**
   * The HTML element or React component to render the subheading as.
   * @default "h3"
   */
  as?: T;

  /**
   * Design variants reflecting luxury layouts.
   * - 'default': Sans-serif, slight tracking, clean and modern.
   * - 'editorial': Serif, italicized, and flowing.
   * - 'caps': Uppercase, wide spacing, excellent for micro-headers and descriptions.
   * @default "default"
   */
  variant?: "default" | "editorial" | "caps";

  /**
   * Responsive sizes.
   * - 'lg': Larger subtitle or quote introduction.
   * - 'md': Mid-range standard subheading.
   * - 'sm': Small card metadata or group labels.
   * @default "md"
   */
  size?: "lg" | "md" | "sm";

  /**
   * Custom CSS styling classes to append.
   */
  className?: string;

  /**
   * Node children to render inside the subheading.
   */
  children?: React.ReactNode;
}

type PolymorphicSubHeadingProps<T extends React.ElementType> = SubHeadingProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof SubHeadingProps<T>>;

/**
 * Premium SubHeading component designed to complement primary titles.
 * Offers clean typographic variety between italicized editorial elements and tracked-out utility caps.
 */
const SubHeading = React.forwardRef(
  <T extends React.ElementType = "h3">(
    {
      as,
      variant = "default",
      size = "md",
      className,
      children,
      ...props
    }: PolymorphicSubHeadingProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || "h3";

    return (
      <Component
        ref={ref}
        className={cn(
          "text-[#5A5750] transition-colors duration-300",
          // Style variants
          {
            "font-sans tracking-wide font-light": variant === "default",
            "font-serif italic font-light tracking-wide text-[#6E6B64]": variant === "editorial",
            "font-sans uppercase tracking-[0.25em] font-light text-[#8C887E]": variant === "caps",
          },
          // Sizes
          {
            "text-lg sm:text-xl md:text-2xl leading-relaxed": size === "lg",
            "text-base sm:text-lg md:text-xl leading-relaxed": size === "md",
            "text-sm sm:text-base leading-normal": size === "sm",
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

SubHeading.displayName = "SubHeading";

export default SubHeading;
export type { PolymorphicSubHeadingProps };
