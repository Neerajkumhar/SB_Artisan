import * as React from "react";
import { cn } from "../../lib/utils";

// Define the custom style variants for the luxury container
export interface ContainerProps<T extends React.ElementType = "div"> {
  /**
   * The HTML element or React component to render the container as.
   * Useful for maintaining proper semantic HTML (e.g., 'section', 'header', 'footer', 'main').
   * @default "div"
   */
  as?: T;

  /**
   * The maximum width variant of the container.
   * - 'default': Max-width 1400px (Standard editorial grids, hero sections).
   * - 'narrow': Max-width 880px (Ideal for single column text, editorial stories, form layouts).
   * - 'wide': Max-width 1600px (For extensive gallery grids, large sliders).
   * - 'full': Width 100% with no max-width constraints (Useful for full-bleed section wrappers).
   * @default "default"
   */
  variant?: "default" | "narrow" | "wide" | "full";

  /**
   * The horizontal padding variant (mobile-first, luxurious editorial gutters).
   * - 'default': Large, airy padding that expands generously on desktop.
   * - 'compact': Minimal horizontal padding for space-constrained layouts.
   * - 'none': Completely removes horizontal padding.
   * @default "default"
   */
  padding?: "default" | "compact" | "none";

  /**
   * Whether to horizontally center the container using auto margins.
   * @default true
   */
  centered?: boolean;

  /**
   * Additional CSS classes to merge into the container.
   */
  className?: string;

  /**
   * React children to render within the container.
   */
  children?: React.ReactNode;
}

// A helper type helper that adds the correct HTML attributes of the element type T, excluding props we override.
type PolymorphicContainerProps<T extends React.ElementType> = ContainerProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof ContainerProps<T>>;

/**
 * A premium, highly customizable Container component designed for luxury layouts.
 * Features an editorial-inspired spacing system, fluid responsive scaling, and full polymorphic typing.
 */
const Container = React.forwardRef(
  <T extends React.ElementType = "div">(
    {
      as,
      variant = "default",
      padding = "default",
      centered = true,
      className,
      children,
      ...props
    }: PolymorphicContainerProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          // Width variants
          {
            "max-w-[1400px]": variant === "default",
            "max-w-[880px]": variant === "narrow",
            "max-w-[1600px]": variant === "wide",
            "max-w-none": variant === "full",
          },
          // Spacing system (Luxurious editorial horizontal padding)
          {
            // default: px-6 (24px) -> sm:px-12 (48px) -> md:px-16 (64px) -> lg:px-24 (96px) -> xl:px-32 (128px)
            "px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32": padding === "default",
            "px-4 sm:px-6 md:px-8": padding === "compact",
            "px-0": padding === "none",
          },
          // Centering
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Set display name for better debugging in React DevTools
Container.displayName = "Container";

export default Container;
export type { PolymorphicContainerProps };
