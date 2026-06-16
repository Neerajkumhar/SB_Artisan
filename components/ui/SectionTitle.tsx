import * as React from "react";
import { cn } from "../../lib/utils";
import Heading, { HeadingProps } from "./Heading";
import Paragraph, { ParagraphProps } from "./Paragraph";

export interface SectionTitleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Optional micro-header text positioned above the main title. Renders in wide-tracked caps.
   */
  eyebrow?: React.ReactNode;

  /**
   * The primary title text or element.
   */
  title: React.ReactNode;

  /**
   * Optional description text positioned below the main title.
   */
  description?: React.ReactNode;

  /**
   * Centers the heading block, eyebrow, and description when set to true.
   * @default false
   */
  centered?: boolean;

  /**
   * Vertical spacing configuration between the eyebrow, title, and description.
   * - 'compact': Minimal gaps, tighter blocks.
   * - 'default': Balanced editorial gaps.
   * - 'generous': Expanded luxury spaces.
   * @default "default"
   */
  spacing?: "compact" | "default" | "generous";

  /**
   * Props forwarded directly to the internal Heading component.
   */
  titleProps?: Omit<HeadingProps<any>, "children">;

  /**
   * Props forwarded directly to the internal description Paragraph component.
   */
  descriptionProps?: Omit<ParagraphProps<any>, "children">;
}

/**
 * A composite SectionTitle layout designed for framing sections with luxury editorial margins.
 * Perfectly balances spacing ratios between eyebrow labels, large display headers, and paragraph intros.
 */
const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  (
    {
      eyebrow,
      title,
      description,
      centered = false,
      spacing = "default",
      titleProps,
      descriptionProps,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col w-full",
          {
            "text-center items-center": centered,
            "text-left items-start": !centered,
          },
          // Spacing below the entire block to separate it from following content
          {
            "mb-8 md:mb-12": spacing === "compact",
            "mb-12 md:mb-16": spacing === "default",
            "mb-16 md:mb-24": spacing === "generous",
          },
          className
        )}
        {...props}
      >
        {/* Eyebrow (Wide-spaced Caps Label) */}
        {eyebrow && (
          <span
            className={cn(
              "font-sans text-xs uppercase tracking-[0.3em] text-[#8C887E] block mb-3 md:mb-4 select-none"
            )}
          >
            {eyebrow}
          </span>
        )}

        {/* Heading */}
        <Heading
          variant="xl"
          weight="light"
          {...titleProps}
          className={cn("text-balance", titleProps?.className)}
        >
          {title}
        </Heading>

        {/* Optional Elegant Line Divider for Luxury Framing */}
        {spacing === "generous" && (
          <div
            className={cn("w-12 h-[1px] bg-[#C5BFB2] my-6 md:my-8", {
              "mx-auto": centered,
            })}
          />
        )}

        {/* Description */}
        {description && (
          <Paragraph
            variant="md"
            {...descriptionProps}
            className={cn(
              "text-pretty font-light",
              {
                "mt-4 md:mt-6": spacing !== "generous",
                "max-w-xl": centered,
                "max-w-2xl": !centered,
              },
              descriptionProps?.className
            )}
          >
            {description}
          </Paragraph>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
