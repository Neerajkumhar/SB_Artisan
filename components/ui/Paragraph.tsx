import * as React from "react";
import { cn } from "../../lib/utils";

export interface ParagraphProps<T extends React.ElementType = "p"> {
  /**
   * The HTML element or React component to render the paragraph as.
   * @default "p"
   */
  as?: T;

  /**
   * Size and emphasis variants.
   * - 'lg': Large, high-priority intro copy or editorial summaries.
   * - 'md': Standard body copy, highly optimized for legibility and length.
   * - 'sm': Small captions, footnotes, specs, or metadata.
   * - 'muted': Styled with reduced contrast color for secondary descriptions.
   * @default "md"
   */
  variant?: "lg" | "md" | "sm" | "muted";

  /**
   * Custom CSS styling classes to append.
   */
  className?: string;

  /**
   * Node children to render inside the paragraph.
   */
  children?: React.ReactNode;
}

type PolymorphicParagraphProps<T extends React.ElementType> = ParagraphProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof ParagraphProps<T>>;

/**
 * Editorial body text component optimized for reading comfort.
 * Utilizes a fine-tuned, spacious sans-serif configuration (e.g. Inter) matching luxury aesthetics.
 */
const Paragraph = React.forwardRef(
  <T extends React.ElementType = "p">(
    {
      as,
      variant = "md",
      className,
      children,
      ...props
    }: PolymorphicParagraphProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || "p";

    return (
      <Component
        ref={ref}
        className={cn(
          "font-sans font-light transition-colors duration-300",
          // Variants
          {
            "text-base sm:text-lg md:text-xl text-[#4A4740] leading-relaxed": variant === "lg",
            "text-sm sm:text-base text-[#5A5750] leading-loose": variant === "md",
            "text-xs sm:text-sm text-[#6E6B64] leading-normal": variant === "sm",
            "text-sm text-[#8C887E] leading-normal": variant === "muted",
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

Paragraph.displayName = "Paragraph";

export default Paragraph;
export type { PolymorphicParagraphProps };
